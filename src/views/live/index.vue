<template>
  <div ref="page" class="LivePage" id="live-page">
    <div class="live-wrapper">
      <!-- <live-room role="audience" /> -->
      <video
        ref="videoEl"
        src="@/assets/example.mp4"
        poster="https://dy.ttentau.top/images/jwWCPZVTIA4IKM-8WipLF.png"
        :muted="false"
        loop
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
        webkit-playsinline="true"
        x5-playsinline="true"
        playsinline="true"
        fullscreen="true"
        autoplay
      >
        <p>您的浏览器不支持 video 标签。</p>
      </video>
    </div>
    <div class="float">
      <div ref="topEl" class="top">
        <!-- 信息 -->
        <div class="left">
          <div class="liver">
            <img class="avatar" src="@/assets/images/host-avatar.png" alt="" />
            <div class="desc">
              <div class="desc-wrapper">
                <div class="name">西伯利亚</div>
                <div class="count"><svg-icon name="hot-icon" /> 2.5W</div>
              </div>
              <div class="follow-btn">+</div>
            </div>
          </div>
        </div>
        <!-- 直播间人数列表 -->
        <div class="right">
          <div class="follower">
            <img
              src="@/assets/images/avatar1.png"
              alt=""
              class="round"
              @click="isShowUserDetail = true"
            />
            <img
              src="@/assets/images/avatar2.png"
              alt=""
              class="round"
              @click="isShowUserDetail = true"
            />
            <img
              src="@/assets/images/avatar3.png"
              alt=""
              class="round"
              @click="isShowUserDetail = true"
            />
            <div class="count-number" @click="isShowLiveNumber = true">107</div>
            <svg-icon name="close-icon" size="24" @click="$router.go(-1)" />
          </div>
        </div>
      </div>
      <div ref="bottomEl" class="bottom">
        <div class="left">
          <!-- 实时评论 -->
          <div class="comments" ref="comments">
            <div class="comments-wrapper" ref="commentsWrapper">
              <div class="comment notice">
                <span class="text notice-tip"
                  >我们提倡绿色直播，封面和直播内容含吸烟、低俗、引诱暴力等都将会被封停账号，同时禁止直播公众闹市、集会，网警24小时巡查哦</span
                >
              </div>
              <div class="comment" :key="j" v-for="(i, j) in list">
                <div class="level-wrap">
                  <user-level :level="8" style="margin-right: 8px" />
                </div>
                <span class="name">{{ i.name }}：</span>
                <span class="text">{{ i.text }}</span>
              </div>
            </div>
          </div>
          <!-- 底部操作栏 -->
          <div class="options">
            <div class="input">
              <input
                v-model="inputText"
                enterkeyhint="send"
                placeholder="来说一句吧..."
                @keydown.enter="handleSend"
              />
              <svg-icon name="smiley-face-icon" size="24" />
            </div>

            <div class="options-action">
              <svg-icon name="share-icon" size="40" style="margin-right: 8px" />
              <svg-icon
                name="gift-icon"
                size="40"
                style="margin-right: 8px"
                @click="isShowGiftModal = true"
              />
              <svg-icon name="bar-icon" size="40" @click="isShowMoreAction = true" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <gift-modal
      v-model="isShowGiftModal"
      @close="isShowGiftModal = false"
      @select="handleSelectGift"
      @click-protocol="isShowProtocol = true"
    />
    <recharge-protocol-modal v-model="isShowProtocol" @close="isShowProtocol = false" />
    <live-number-modal v-model="isShowLiveNumber" @close="isShowLiveNumber = false" />
    <more-action v-model="isShowMoreAction" @close="isShowMoreAction = false" />
    <joined-user-detail v-model="isShowUserDetail" :level="10" @close="isShowUserDetail = false" />
  </div>
</template>
<script setup>
import { sleep } from '@/utils'
import GiftModal from '@/components/gift-modal'
import UserLevel from '@/components/user-level'
import LiveRoom from '@/components/live-room'
import GiftComp from './components/gift'
import RechargeProtocolModal from './components/recharge-protocol-modal'
import JoinedLiveComp from './components/joined-live'
import LiveNumberModal from './components/live-number-modal'
import BarrageComp from './components/barrage'
import MoreAction from './components/more-action'
import JoinedUserDetail from './components/joined-user-detail.vue'
import LoveIcon from '@/assets/images/love.webp'
import UserAvatar from '@/assets/images/avatar.png'
import HostAvatar from '@/assets/images/host-avatar.png'

const page = ref(null)
const videoEl = ref(null)
const topEl = ref(null)
const bottomEl = ref(null)
const comments = ref(null)
const commentsWrapper = ref(null)
const isShowGiftModal = ref(false)
const isShowProtocol = ref(false)
const isShowLiveNumber = ref(false)
const isShowMoreAction = ref(false)
const isShowUserDetail = ref(false)
const inputText = ref('')
const list = ref([])

const activeGiftTops = []
const activeBarrages = []
const activeGiftMap = new Map()
const CLICK_INTERVAL = 2500 // 送礼点击间隔时间

onMounted(() => {
  runUserJoinLive()
  runSendComment()
  videoEl.value?.play()
})

function handleSelectGift(item) {
  sendGift({
    sender: '用户A',
    receiver: '主播B',
    avatar: HostAvatar,
    giftIcon: item.img,
    count: item.count,
    giftId: item.giftId,
  })
}

async function runUserJoinLive() {
  const joinedUsers = [
    { name: '币圈刘亦菲', level: 30 },
    { name: '币圈吴彦祖', level: 25 },
    { name: '伞菇凉', level: 20 },
    { name: '币圈大佬', level: 15 },
    { name: '币圈刘德华', level: 10 },
    { name: '币圈周星驰', level: 5 },
    { name: '币圈军师', level: 1 },
    { name: '比特币专家', level: 50 },
    { name: 'sol超人', level: 40 },
    { name: '捞的人', level: 35 },
    { name: '币圈张学友', level: 30 },
    { name: '币圈周杰伦', level: 25 },
    { name: '小芯芯', level: 20 },
    { name: '币圈小核心', level: 15 },
    { name: '币圈刘翔', level: 10 },
    { name: '币圈林丹', level: 5 },
    { name: 'CNS第一人', level: 1 },
    { name: 'Coineux', level: 50 },
    { name: '币圈张智霖', level: 40 },
    { name: '币圈成龙', level: 35 },
    { name: '币圈带你飞', level: 30 },
    // { name: '币圈刘亦菲', level: 25 },
    // { name: '币圈刘亦菲', level: 20 },
    // { name: '币圈刘亦菲', level: 15 },
    // { name: '币圈刘亦菲', level: 10 },
    // { name: '币圈刘亦菲', level: 5 },
  ]

  for (let i = 0; i < joinedUsers.length; i++) {
    const user = joinedUsers[i]
    joinLive(user.name, user.level)
    await sleep(500)
  }
}

async function runSendComment() {
  const userComments = [
    '强子讲的太棒了',
    '大家好，我是新来的！',
    '喜欢这个直播间！',
    '京东还是很不错的',
    '今天的直播真精彩！',
    '有没有人和我一样喜欢这个主播？',
    '什么时候再来讲一场其他的内容',
    '主播，你的声音真好听！',
    '大家都来支持一下主播吧！',
  ]
  for (let i = 0; i < userComments.length; i++) {
    const comment = userComments[i]
    sendComment({
      name: `用户${i + 1}`,
      text: comment,
    })
    await sleep(700)
  }
}

function handleSend() {
  sendComment({
    name: '测试用户',
    text: inputText.value,
  })

  inputText.value = ''
}

// 送礼物
function sendGift({
  sender = '用户A',
  receiver = '主播B',
  avatar = UserAvatar,
  giftIcon = LoveIcon,
  giftId = 'defaultId',
  count = 1,
} = {}) {
  if (activeGiftMap.has(giftId)) {
    const giftInstance = activeGiftMap.get(giftId)
    giftInstance.count += count

    giftInstance.update(giftInstance.count)

    clearTimeout(giftInstance.timeout)
    giftInstance.timeout = setTimeout(() => {
      giftInstance.app.unmount()
      giftInstance.container.remove()
      const index = activeGiftTops.indexOf(giftInstance.top)
      if (index !== -1) activeGiftTops.splice(index, 1)
      activeGiftMap.delete(giftId)
    }, CLICK_INTERVAL)
    return
  }

  const container = document.createElement('div')
  document.body.appendChild(container)
  // const baseTop = window.innerHeight  * 0.6
  const baseTop =
    (window.innerHeight - bottomEl.value.offsetHeight - topEl.value.offsetHeight) * 0.6
  const offset = 70
  let top = baseTop
  if (activeGiftTops.length > 0) {
    const lastTop = activeGiftTops[activeGiftTops.length - 1]
    top = lastTop - offset
    if (top < 100) top = baseTop
  }
  activeGiftTops.push(top)

  let currentCount = count
  let updateCount

  const app = createApp({
    setup() {
      const countRef = ref(currentCount)
      updateCount = (newCount) => {
        countRef.value = newCount
      }

      return () =>
        h(GiftComp, {
          sender,
          receiver,
          avatar,
          giftIcon,
          count: countRef.value,
          top,
          onRemove: () => {
            app.unmount()
            container.remove()
            const index = activeGiftTops.indexOf(top)
            if (index !== -1) activeGiftTops.splice(index, 1)
            activeGiftMap.delete(giftId)
          },
        })
    },
  })

  app.mount(container)

  const timeout = setTimeout(() => {
    app.unmount()
    container.remove()
    const index = activeGiftTops.indexOf(top)
    if (index !== -1) activeGiftTops.splice(index, 1)
    activeGiftMap.delete(giftId)
  }, CLICK_INTERVAL)

  activeGiftMap.set(giftId, {
    count,
    top,
    app,
    update: updateCount,
    timeout, // 存储定时器
    container, // 存储容器
  })
}

// 用户进入直播间
function joinLive(name = '用户昵称', level = 30) {
  const container = document.createElement('div')
  const pageEl = page.value
  const app = createApp({
    render() {
      return h(JoinedLiveComp, {
        name,
        level,
        icon: LoveIcon,
        onEnd: () => {
          app.unmount()
          container.remove()
        },
      })
    },
  })
  app.mount(container)
  pageEl?.appendChild(container)
}

// 发送评论
async function sendComment({ name, text }) {
  list.value.push({ name, text })
  await nextTick()
  comments.value?.scrollTo({
    top: comments.value.scrollHeight - comments.value.clientHeight,
    behavior: 'smooth',
  })
}

// 发送弹幕
function sendBarrage({ name = 'name11', text = '随便一段话' } = {}) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  // 弹幕 top 起始位置
  const baseTop = window.innerHeight * 0.35
  const maxTop = window.innerHeight * 0.5
  const offset = 20

  let top = baseTop
  if (activeBarrages.length > 0) {
    const lastTop = activeBarrages[activeBarrages.length - 1]
    top = lastTop + offset
    if (top > maxTop) top = baseTop
  }
  activeBarrages.push(top)

  const app = createApp({
    render() {
      return h(BarrageComp, {
        name,
        text,
        top,
        onRemove: () => {
          app.unmount()
          container.remove()
          const i = activeBarrages.indexOf(top)
          if (i !== -1) activeBarrages.splice(i, 1)
        },
      })
    },
  })

  app.mount(container)
}
</script>

<style lang="scss">
@import '@/assets/styles/index.css';
@import './global.css';

:deep(.van-popup) {
  background-color: transparent !important;
}
</style>

<style scoped>
@import '@/assets/styles/index.css';
@import './live-page.scss';

:deep(.van-popup) {
  overflow-y: inherit !important;
}
</style>
