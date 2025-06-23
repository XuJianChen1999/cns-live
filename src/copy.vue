<template>
  <div class="example">
    <div class="video-box">
      <div v-show="role === 'host'" class="video-box-item">
        <div class="video-box-item-header">本地流</div>
        <div class="video-box-item-body">
          <div ref="videoRef" class="video"></div>
        </div>
      </div>
      <div v-show="role === 'audience'" class="video-box-item">
        <div class="video-box-item-header">远程流</div>
        <div class="video-box-item-body">
          <div ref="remoteVideoRef" class="video"></div>
        </div>
      </div>
    </div>

    <div v-if="role === 'host'" class="form">
      <div class="form-item">
        <label>频道号</label>
        <input v-model="formData.channel" type="text" class="input" />
      </div>
      <div class="form-item">
        <label>uid</label>
        <input v-model="formData.uid" type="text" class="input" />
      </div>
      <div class="form-item">
        <label>token</label>
        <input v-model="formData.token" type="text" class="input" />
      </div>
      <div class="form-item">
        <label>麦克风</label>
        <select v-model="formData.microphone" class="form-select">
          <option v-for="mic in devices.mics" :key="mic.deviceId" :value="mic.deviceId">
            {{ mic.label }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <label>摄像头</label>
        <select v-model="formData.camera" class="form-select">
          <option v-for="camera in devices.cameras" :key="camera.deviceId" :value="camera.deviceId">
            {{ camera.label }}
          </option>
        </select>
      </div>
      <div class="form-item">
        <label>启用麦克风</label>
        <input
          class="form-checkbox"
          type="checkbox"
          v-model="formData.enableAudio"
          @change="toggleEnabled('audio', formData.enableAudio)"
        />
      </div>
      <div class="form-item">
        <label>启用摄像头</label>
        <input
          class="form-checkbox"
          type="checkbox"
          v-model="formData.enableVideo"
          @change="toggleEnabled('video', formData.enableVideo)"
        />
      </div>

      <div class="form-btn-box">
        <button
          :class="['form-btn', { 'form-btn-disabled': isLive }]"
          :disabled="isLive"
          @click="startLive"
        >
          开始直播
        </button>
        <button
          :class="['form-btn', { 'form-btn-disabled': !isLive }]"
          :disabled="!isLive"
          @click="endLive"
        >
          结束直播
        </button>
        <button :class="['form-btn', { 'form-btn-disabled': !isLive }]" @click="toggleScreenShare">
          {{ isSharingScreen ? '停止共享' : '共享屏幕' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { APP_ID, TOKEN, CHANNEL } from '@/const'
import AgoraRTC from 'agora-rtc-sdk-ng'

const props = defineProps({
  role: {
    type: String,
    default: null,
  },
})

const formData = ref({
  microphone: '',
  camera: '',
  enableAudio: true,
  enableVideo: true,
})
const client = ref(null)
// const audioTrack = ref(null) // 音频轨道
// const videoTrack = ref(null) // 视频轨道
const screenTrack = ref(null) // 屏幕共享轨道
const videoRef = ref(null)
const remoteVideoRef = ref(null)
const isLive = ref(false) // 是否正在直播
const isSharingScreen = ref(false) // 是否正在共享屏幕
const isJoined = ref(false) // 是否已经加入频道
const resolution = ref('640x480')
const remoteUsers = ref({})
const devices = ref({
  cameras: [],
  mics: [],
})

const localTracks = {
  video: null,
  audio: null,
}

onMounted(async () => {
  client.value = await AgoraRTC.createClient({
    mode: 'live',
    codec: 'vp8',
    // role: props.role,
    // // 启用多轨道发布
    // enableMultipleVideoTracks: true,
  })
  await initDevices()
  await joinChannel()
})

async function setupLocalTracks() {
  const [width, height] = resolution.value.split('x').map(Number)
  localTracks.video = await AgoraRTC.createCameraVideoTrack({ encoderConfig: { width, height } })
  localTracks.audio = await AgoraRTC.createMicrophoneAudioTrack()
}

// 初始化设备
async function initDevices() {
  const cameras = await AgoraRTC.getCameras()
  const mics = await AgoraRTC.getMicrophones()

  devices.value = {
    cameras,
    mics,
  }
  formData.value.camera = cameras[0].deviceId
  formData.value.microphone = mics[0].deviceId
}

// 加入频道
async function joinChannel() {
  if (props.role === 'host') {
    client.value.setClientRole('host')
  }
  await client.value.join(APP_ID, CHANNEL, TOKEN, String(Math.floor(Math.random() * 1000000)))
  isJoined.value = true

  if (props.role === 'audience') {
    // 监听用户加入频道
    client.value.on('user-joined', (user) => {
      console.log('用户加入频道:', user)
    })

    // 监听用户离开频道
    client.value.on('user-left', (user) => {
      console.log('用户离开频道:', user)
      delete remoteUsers.value[user.uid]
    })

    client.value.on('user-published', async (user, mediaType) => {
      console.log('用户发布流:', user, mediaType)
      // 确保用户已经在频道中
      if (!client.value.remoteUsers[user.uid]) {
        console.warn('用户还未加入频道，等待加入...')
        return
      }

      await client.value.subscribe(user, mediaType)
      if (mediaType === 'video') {
        user.videoTrack?.play(remoteVideoRef.value)
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play()
      }
      remoteUsers.value[user.uid] = user
    })
  }
}

// 开始直播
async function startLive() {
  if (isLive.value || props.role === 'audience') return

  if (!isJoined.value) {
    alert('还没有 join 成功，不能 startLive')
    return
  }

  // const tracks = await Promise.all([
  //   AgoraRTC.createMicrophoneAudioTrack(),
  //   AgoraRTC.createCameraVideoTrack(),
  // ])
  // audioTrack.value = tracks[0]
  // videoTrack.value = tracks[1]
  await setupLocalTracks()
  console.log('✅✅✅✅✅✅✅✅✅✅✅', localTracks)
  await client.value.publish([localTracks.audio, localTracks.video])

  await localTracks.video?.play(videoRef.value)
  await localTracks.audio?.play()

  isLive.value = true
  // handleAutoConnection()
}

// 结束直播
async function endLive() {
  if (!isLive.value) return

  await localTracks.audio.stop()
  await localTracks.audio.close()

  await localTracks.video.stop()
  await localTracks.video.close()

  localTracks.audio = null
  localTracks.video = null

  remoteUsers.value = {}

  await client.value.leave()
  isLive.value = false
}

// 切换音频/视频开启、关闭
async function toggleEnabled(type, state) {
  try {
    if (type === 'audio') {
      await localTracks.audio.setEnabled(state)
      // localTrackState.audioTrackEnabled = state;
    } else if (type == 'video') {
      await localTracks.video.setEnabled(state)
      // localTrackState.videoTrackEnabled = state;
    }
  } catch (err) {
    console.error(err)
  }
}

// 共享屏幕开启/关闭
async function toggleScreenShare() {
  if (!isLive.value) return

  try {
    if (!isSharingScreen.value) {
      // 开启屏幕共享前，先停止摄像头视频
      if (localTracks.video) {
        await localTracks.video.stop()
        await client.value.unpublish(localTracks.video)
      }

      // 开启屏幕共享
      screenTrack.value = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: {
          width: 1920,
          height: 1080,
          frameRate: 15,
          bitrateMin: 1000,
          bitrateMax: 3000,
        },
      })

      // 发布屏幕共享轨道
      await client.value.publish(screenTrack.value)

      // 在本地预览
      await screenTrack.value.play(videoRef.value)

      isSharingScreen.value = true
    } else {
      // 关闭屏幕共享
      if (screenTrack.value) {
        await screenTrack.value.stop()
        await screenTrack.value.close()
        await client.value.unpublish(screenTrack.value)
        screenTrack.value = null
      }

      // 恢复摄像头视频
      if (localTracks.video) {
        await client.value.publish(localTracks.video)
        await localTracks.video.play(videoRef.value)
      }

      isSharingScreen.value = false
    }
  } catch (error) {
    console.error('屏幕共享操作失败:', error)
    // 发生错误时重置状态
    isSharingScreen.value = false
    if (screenTrack.value) {
      screenTrack.value = null
    }
    // 确保摄像头视频恢复
    if (localTracks.video) {
      await client.value.publish(localTracks.video)
      await localTracks.video.play(videoRef.value)
    }
  }
}
</script>

<style scoped lang="scss">
@use '../../App.scss';
</style>
