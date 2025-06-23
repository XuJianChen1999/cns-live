<template>
  <div class="live-room">
    <div class="video-container">
      <div v-if="props.role === 'host'" ref="localVideoRef" class="video-box"></div>
      <div v-else ref="remoteVideoRef" class="video-box"></div>
    </div>

    <!-- 主播 -->
    <div v-if="props.role === 'host'" class="host-controls">
      <select v-model="resolution" @change="changeResolution">
        <option value="640x480">640x480</option>
        <option value="1280x720">1280x720</option>
        <option value="1920x1080">1920x1080</option>
      </select>

      <button v-if="!isLive" @click="startLive">▶️ 开始直播</button>
      <button v-else @click="endLive" style="color: red; font-weight: bold" :disabled="!isLive">
        结束直播
      </button>
      <button @click="toggleCamera" :disabled="!isLive">
        {{ cameraEnabled ? '关闭摄像头' : '开启摄像头' }}
      </button>
      <button @click="toggleMic" :disabled="!isLive">
        {{ micEnabled ? '关闭麦克风' : '开启麦克风' }}
      </button>
      <button @click="toggleScreenShare" :disabled="!isLive">
        {{ isSharingScreen ? '停止共享屏幕' : '开始共享屏幕' }}
      </button>
    </div>
    <!-- 观众 -->
    <!-- <div class="chat">
      <h4>聊天室</h4>
      <div class="messages">
        <div v-for="(msg, i) in messages" :key="i">
          <strong>{{ msg.user }}:</strong> {{ msg.content }}
        </div>
      </div>
      <input v-model="inputMsg" @keyup.enter="sendMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </div> -->
  </div>
</template>

<script setup>
import { APP_ID, TOKEN, CHANNEL } from '@/const'
import AgoraRTC from 'agora-rtc-sdk-ng'

const props = defineProps({
  role: {
    type: String,
    default: 'host',
  },
})

const localVideoRef = ref(null)
const remoteVideoRef = ref(null)
const connectionState = ref('未连接')
const remoteUsers = ref({})
const screenTrack = ref(null)
const resolution = ref('640x480')
const isLive = ref(false)
const isSharingScreen = ref(false)
const cameraEnabled = ref(true)
const micEnabled = ref(true)
const messages = ref([])
const inputMsg = ref('')

const uid = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6)
const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' })
// const rtmClient = new AgoraRTM.RTM(APP_ID, uid)
const localTracks = {
  video: null,
  audio: null,
}
const MAX_RETRIES = 5 // 最大重连尝试次数
let reconnectAttempts = 0 // 重连尝试次数
let rtmChannel = null

const setupLocalTracks = async () => {
  const [width, height] = resolution.value.split('x').map(Number)
  localTracks.video = await AgoraRTC.createCameraVideoTrack({ encoderConfig: { width, height } })
  localTracks.audio = await AgoraRTC.createMicrophoneAudioTrack()
}

// 加入频道
const joinChannel = async () => {
  if (props.role === 'host') {
    client.setClientRole('host')
  }
  await client.join(APP_ID, CHANNEL, TOKEN, null)

  if (props.role === 'audience') {
    client.on('user-published', async (user, mediaType) => {
      await client.subscribe(user, mediaType)
      if (mediaType === 'video') {
        user.videoTrack?.play(remoteVideoRef.value)
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play()
      }
      remoteUsers.value[user.uid] = user
    })

    client.on('user-unpublished', (user) => {
      delete remoteUsers.value[user.uid]
    })
  }
}

// 开始直播
const startLive = async () => {
  if (isLive.value || props.role !== 'host') return

  // await rtcClient.join(APP_ID, CHANNEL, TOKEN || null, UID);
  await setupLocalTracks()
  await client.publish([localTracks.video, localTracks.audio])
  localTracks.video?.play(localVideoRef.value)
  localStorage.setItem(
    'agora-live',
    JSON.stringify({
      role: 'host',
      channel: CHANNEL,
      appId: APP_ID,
      token: TOKEN,
      live: true,
    }),
  )
  isLive.value = true
  handleAutoConnection()
}

// 切换分辨率
const changeResolution = async () => {
  if (!isLive.value) return
  const [width, height] = resolution.value.split('x').map(Number)
  if (localTracks.video) {
    await client.unpublish(localTracks.video)
    localTracks.video.stop()
    localTracks.video.close()
  }
  const newVideo = await AgoraRTC.createCameraVideoTrack({
    encoderConfig: {
      width,
      height,
      frameRate: 30,
      bitrateMin: 600,
      bitrateMax: 2000,
    },
  })
  localTracks.video = newVideo
  await client.publish(localTracks.video)
  localTracks.video.play(localVideoRef.value)
}

// 切换摄像头
const toggleCamera = () => {
  if (localTracks.video) {
    cameraEnabled.value = !cameraEnabled.value
    localTracks.video.setEnabled(cameraEnabled.value)
  }
}

const toggleMic = () => {
  if (localTracks.audio) {
    micEnabled.value = !micEnabled.value
    localTracks.audio.setEnabled(micEnabled.value)
  }
}

// 切换屏幕共享
const toggleScreenShare = async () => {
  if (!isLive.value) return

  if (isSharingScreen.value) {
    await client.unpublish(screenTrack.value)
    screenTrack.value.stop()
    screenTrack.value.close()
    screenTrack.value = null

    await client.publish(localTracks.video)
    localTracks.video.play(localVideoRef.value)
    isSharingScreen.value = false
  } else {
    const screen = await AgoraRTC.createScreenVideoTrack()
    screenTrack.value = screen

    await client.unpublish(localTracks.video)
    await client.publish(screenTrack.value)
    screenTrack.value.play(localVideoRef.value)
    isSharingScreen.value = true
  }
}

const endLive = async () => {
  if (localTracks.video) {
    await client.unpublish(localTracks.video)
    localTracks.video.stop()
    localTracks.video.close()
  }
  if (localTracks.audio) {
    await client.unpublish(localTracks.audio)
    localTracks.audio.stop()
    localTracks.audio.close()
  }
  if (screenTrack.value) {
    await client.unpublish(screenTrack.value)
    screenTrack.value.stop()
    screenTrack.value.close()
    screenTrack.value = null
  }
  await client.leave()
  isLive.value = false
  localStorage.removeItem('agora-live')
}

// 处理自动连接
const handleAutoConnection = () => {
  client.on('connection-state-change', async (curState) => {
    console.error(curState)
    connectionState.value = curState

    if (curState === 'DISCONNECTED' && reconnectAttempts < MAX_RETRIES) {
      console.warn(`连接断开，尝试重连（第 ${reconnectAttempts + 1} 次）...`)
      reconnectAttempts++
      try {
        await reconnect()
        console.log('重连成功')
      } catch (err) {
        console.error('重连失败:', err)
      }
    }

    if (curState === 'CONNECTED') {
      reconnectAttempts = 0
    }
  })
}

// 重新加入频道并恢复推流
const reconnect = async () => {
  try {
    await client.join(APP_ID, CHANNEL, TOKEN || null)

    if (localTracks.audio && localTracks.video) {
      await client.publish([localTracks.audio, localTracks.video])
      localTracks.video.play(localVideoRef.value)
    }

    connectionState.value = '已重连'
  } catch (error) {
    throw new Error('重连失败', error)
  }
}

onMounted(async () => {
  const liveState = JSON.parse(localStorage.getItem('agora-live') || '{}')
  // 如果本地有缓存，继续直播（临时性方案）
  if (liveState.role === 'host' && liveState.live) {
    await joinChannel()
    await startLive()
  } else {
    await joinChannel() // audience 进入频道
  }
  // await joinRTM()
})

onUnmounted(() => {
  endLive()
})
</script>

<style scoped>
.live-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
.video-container {
  width: 100%;
  height: 100%;
  /* width: 300px;
  height: 300px; */
  /* background-color: #000; */
  /* margin-bottom: 12px; */
}
.video-box {
  width: 100%;
  height: 100%;
}
.host-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
.chat {
  border: 1px solid #ccc;
  padding: 10px;
}
.chat-box {
  height: 150px;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 5px;
  margin-bottom: 5px;
}

button {
  font-size: 10px;
}
</style>
