<template>
  <div class="example">
    <div class="video-box">
      <div v-if="role === 'host'" class="video-box-item">
        <div class="video-box-item-header">本地流</div>
        <div class="video-box-item-body">
          <div ref="videoRef" class="video"></div>
        </div>
      </div>
      <div v-else class="video-box-item">
        <div class="video-box-item-header">远程流</div>
        <div class="video-box-item-body">
          <div ref="remoteVideoRef" class="video"></div>
        </div>
      </div>
    </div>

    <!-- 主播操作 -->
    <div v-if="role === 'host'" class="form">
      <div class="form-item">
        <label>频道号</label>
        <input v-model="formData.CHANNEL" type="text" class="input" />
      </div>
      <div class="form-item">
        <label>uid</label>
        <input v-model="formData.uid" type="text" class="input" />
      </div>
      <div class="form-item">
        <label>token</label>
        <input v-model="formData.TOKEN" type="text" class="input" />
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
        <label>分辨率</label>
        <select v-model="resolution" class="form-select" @change="changeResolution">
          <option value="640x480">640x480</option>
          <option value="1280x720">1280x720</option>
          <option value="1920x1080">1920x1080</option>
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
    <!-- 观众操作 -->
    <div v-if="role === 'audience'" class="form">
      <div class="form-btn-box">
        <button
          :class="['form-btn', { 'form-btn-disabled': !isJoined || !isLive }]"
          :disabled="!isJoined"
          @click="leaveLiveRoom"
        >
          退出直播间
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
  APP_ID,
  CHANNEL,
  TOKEN,
  microphone: '',
  camera: '',
  enableAudio: true,
  enableVideo: true,
})
const videoRef = ref(null)
const remoteVideoRef = ref(null)
const isLive = ref(false) // 是否正在直播
const isSharingScreen = ref(false) // 是否正在共享屏幕
const isJoined = ref(false) // 是否已加入频道
const resolution = ref('640x480')

const remoteUsers = ref({})
const devices = ref({
  cameras: [],
  mics: [],
})

const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' })

const localTracks = {
  video: null,
  audio: null,
  screen: null,
}

onMounted(async () => {
  await joinChannel()
  await initDevices()
})

// 发布本地轨道
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
  // if (props.role === 'host') {
  //   client.setClientRole('host')
  // }
  await client.setClientRole(props.role)
  await client.join(APP_ID, CHANNEL, TOKEN, null)
  isJoined.value = true

  if (props.role === 'audience') {
    client.on('user-published', handleUserPublished)
    client.on('user-unpublished', handleUserUnpublished)
  }
}

// 开始直播
async function startLive() {
  if (isLive.value || props.role === 'audience') return

  // FIXME: 结束直播后再次开启需要再次加入
  if (!isJoined.value) {
    await joinChannel()
  }

  await setupLocalTracks()
  await client.publish([localTracks.video, localTracks.audio])
  localTracks.video?.play(videoRef.value)
  isLive.value = true
}

// 结束直播
async function endLive() {
  if (!isLive.value) return

  const trackKeys = ['audio', 'video', 'screen']
  for (const key of trackKeys) {
    const track = localTracks[key]
    if (track) {
      try {
        await client.unpublish(track)
      } catch (e) {
        console.warn(`unpublish ${key} failed`, e)
      }
      try {
        await track.stop()
        await track.close()
      } catch (e) {
        console.warn(`stop/close ${key} failed`, e)
      }
      localTracks[key] = null
    }
  }

  // localTracks.audio = null
  // localTracks.video = null
  // localTracks.screen = null

  remoteUsers.value = {}

  await client.leave()
  isJoined.value = false
  isLive.value = false
}

// 切换音频/视频开启、关闭
async function toggleEnabled(type, state) {
  try {
    await localTracks[type].setEnabled(state)
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
        await client.unpublish(localTracks.videoTrack)
      }

      // 开启屏幕共享
      localTracks.screen = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: {
          width: 1920,
          height: 1080,
          frameRate: 15,
          bitrateMin: 1000,
          bitrateMax: 3000,
        },
      })

      // 发布屏幕共享轨道
      await client.publish(localTracks.screen)

      // 在本地预览
      await localTracks.screen.play(videoRef.value)

      isSharingScreen.value = true
    } else {
      // 关闭屏幕共享
      if (localTracks.screen) {
        await localTracks.screen.stop()
        await localTracks.screen.close()
        await client.unpublish(localTracks.screen)
        localTracks.screen = null
      }

      // 恢复摄像头视频
      if (localTracks.video) {
        await client.publish(localTracks.video)
        await localTracks.video.play(videoRef.value)
      }

      isSharingScreen.value = false
    }
  } catch (error) {
    console.error('屏幕共享操作失败:', error)
    // 发生错误时重置状态
    isSharingScreen.value = false
    if (localTracks.screen) {
      localTracks.screen = null
    }
    // 确保摄像头视频恢复
    if (localTracks.video) {
      await client.publish(localTracks.video)
      await localTracks.video.play(videoRef.value)
    }
  }
}

// 切换分辨率
async function changeResolution(event) {
  resolution.value = event.target.value
  const [width, height] = event.target.value.split('x').map(Number)

  // 如果未直播，只是设置下一个分辨率
  if (!isLive.value) return

  // 正在直播中，动态切换 video track
  const oldVideoTrack = localTracks.video

  // 创建新的 video track
  const newVideoTrack = await AgoraRTC.createCameraVideoTrack({
    encoderConfig: { width, height },
  })

  // 替换推流
  await client.unpublish(oldVideoTrack)
  await oldVideoTrack.stop()
  await oldVideoTrack.close()

  await client.publish(newVideoTrack)
  newVideoTrack.play(videoRef.value)

  localTracks.video = newVideoTrack
}

async function leaveLiveRoom() {
  if (!isJoined.value || !isLive.value) return

  // 停止远程用户播放
  for (const uid in remoteUsers.value) {
    const user = remoteUsers.value[uid]
    user.videoTrack?.stop()
    user.audioTrack?.stop()
  }
  remoteUsers.value = {}

  // 移除事件监听
  client.off('user-published', handleUserPublished)
  client.off('user-unpublished', handleUserUnpublished)

  await client.leave()
  isJoined.value = false
}

// 处理远程流发布
async function handleUserPublished(user, mediaType) {
  await client.subscribe(user, mediaType)

  if (mediaType === 'video') {
    user.videoTrack?.play(remoteVideoRef.value)
  }
  if (mediaType === 'audio') {
    user.audioTrack?.play()
  }

  remoteUsers.value[user.uid] = user
}

// 处理远程流取消发布
async function handleUserUnpublished(user) {
  delete remoteUsers.value[user.uid]
}
</script>

<style scoped lang="scss">
@use '../../App.scss';
</style>
