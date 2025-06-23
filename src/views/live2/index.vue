<template>
  <div ref="page" class="LivePage">
    <div class="live-wrapper">
      <video
        ref="videoEl"
        src="@/assets/example.mp4"
        poster="https://dy.ttentau.top/images/jwWCPZVTIA4IKM-8WipLF.png"
        muted
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
        <div class="left">
          <div class="liver">
            <img class="avatar" src="@/assets/images/host-avatar.png" alt="" />
            <div class="desc">
              <div class="desc-wrapper">
                <div class="name">这里是主播设置的名字啊</div>
                <div class="count"><hot-icon /> 2.5W</div>
              </div>
              <div class="follow-btn">+</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="follower">
            <img src="@/assets/images/host-avatar.png" alt="" class="round" />
            <img src="@/assets/images/host-avatar.png" alt="" class="round" />
            <img src="@/assets/images/host-avatar.png" alt="" class="round" />
            <div class="count-number">107</div>
            <close-icon @click="$router.go(-1)" />
          </div>
        </div>
      </div>
      <div ref="bottomEl" class="bottom">
        <div class="left">
          <div class="comments" ref="comments">
            <div class="comments-wrapper" ref="commentsWrapper">
              <div class="comment notice">
                <span class="text notice-tip"
                  >我们提倡绿色直播，封面和直播内容含吸烟、低俗、引诱暴力等都将会被封停账号，同时禁止直播公众闹市、集会，网警24小时巡查哦</span
                >
              </div>
              <div class="comment" :key="j" v-for="(i, j) in list">
                <div class="level">
                  <div class="wrapper">
                    <!-- <img src="../../assets/img/icon/home/level.webp" alt="" /> -->
                    <span>30</span>
                  </div>
                </div>
                <span class="name">{{ i.name }}</span>
                <span class="text">{{ i.text }}</span>
              </div>
            </div>
          </div>
          <div class="options">
            <div class="input">
              <input placeholder="来说一句吧..." />
              <face-icon class="face-icon" />
            </div>

            <div class="options-action">
              <share-icon style="margin-right: 8px" />
              <gift-icon style="margin-right: 8px" @click="isShowGiftModal = true" />
              <bar-icon />
            </div>
          </div>
        </div>
        <div class="right"></div>
      </div>
    </div>

    <gift-modal v-model="isShowGiftModal" @select="handleSelectGift" />
  </div>
</template>
<script setup>
import { sleep } from '@/utils'
import GiftModal from '@/components/gift-modal'
import Gift from './components/gift'
import JoinedLive from './components/joined-live'
import Barrage from './components/barrage'
import CloseIcon from '@/assets/svg/close-icon'
import HotIcon from '@/assets/svg/hot-icon'
import GiftIcon from '@/assets/svg/gift-icon'
import FaceIcon from '@/assets/svg/smiley-face-icon'
import ShareIcon from '@/assets/svg/share-icon'
import BarIcon from '@/assets/svg/bar-icon'
import LoveIcon from '@/assets/images/love.webp'
import UserAvatar from '@/assets/images/avatar.png'

const timer1 = ref(-1)
const timer2 = ref(-1)
const timer3 = ref(-1)
const page = ref(null)
const videoEl = ref(null)
const topEl = ref(null)
const bottomEl = ref(null)
const comments = ref(null)
const commentsWrapper = ref(null)
const isShowGiftModal = ref(false)
const list = ref([])

const activeGiftTops = []
const activeBarrages = []

onMounted(() => {
  runUserJoinLive()
  runSendComment()
  // timer1.value = setInterval(async () => {
  //   sendGift()
  //   await sleep(300)
  //   sendGift()
  //   joinLive()
  // }, 1000)
  // timer2.value = setInterval(async () => {
  //   sendBarrage()
  // }, 1500)
  // timer3.value = setInterval(async () => {
  //   sendComment()
  // }, 700)
  videoEl.value.play()
})

onUnmounted(() => {
  clearInterval(timer1.value)
  clearInterval(timer2.value)
  clearInterval(timer3.value)
})

function handleSelectGift(item) {
  sendGift({
    sender: '用户A',
    receiver: '主播B',
    avatar: UserAvatar,
    giftIcon: item.img,
    count: item.count,
  })
}

async function runUserJoinLive() {
  const joinedUsers = [
    { name: '用户A', level: 30 },
    { name: '用户B', level: 25 },
    { name: '用户C', level: 20 },
    { name: '用户D', level: 15 },
    { name: '用户E', level: 10 },
    { name: '用户F', level: 5 },
    { name: '用户G', level: 1 },
    { name: '用户H', level: 50 },
    { name: '用户I', level: 40 },
    { name: '用户J', level: 35 },
    { name: '用户K', level: 30 },
    { name: '用户L', level: 25 },
    { name: '用户M', level: 20 },
    { name: '用户N', level: 15 },
    { name: '用户O', level: 10 },
    { name: '用户P', level: 5 },
    { name: '用户Q', level: 1 },
    { name: '用户R', level: 50 },
    { name: '用户S', level: 40 },
    { name: '用户T', level: 35 },
    { name: '用户U', level: 30 },
    { name: '用户V', level: 25 },
    { name: '用户W', level: 20 },
    { name: '用户X', level: 15 },
    { name: '用户Y', level: 10 },
    { name: '用户Z', level: 5 },
  ]

  for (let i = 0; i < joinedUsers.length; i++) {
    const user = joinedUsers[i]
    joinLive(user.name, user.level)
    await sleep(500) // 大约每500ms加入一个
  }
}

async function runSendComment() {
  const userComments = [
    '这首歌真好听！',
    '主播唱得太棒了！',
    '大家好，我是新来的！',
    '喜欢这个直播间！',
    '主播能不能唱一首《小幸运》？',
    '今天的直播真精彩！',
    '有没有人和我一样喜欢这个主播？',
    '这首歌让我想起了很多回忆。',
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

// 送礼物
function sendGift({
  sender = '用户A',
  receiver = '主播B',
  avatar = UserAvatar,
  giftIcon = GiftIcon,
  count = 1,
} = {}) {
  // let page = new Dom(this.page)
  // let sendGift = new Dom().create(this.sendGiftTemplate())
  // sendGift.on('animationend', () => {
  //   sendGift.remove()
  // })
  // let oldSendGift = new Dom('.send-gift')
  // let top = document.body.clientHeight * 0.6
  // if (oldSendGift.els.length !== 0) {
  //   top = sendGift.removePx(oldSendGift.css('top')) - 70
  // }
  // if (top < 100) {
  //   top = document.body.clientHeight * 0.6
  // }
  // console.log('top', top)
  // sendGift.css('top', top)
  // page.append(sendGift)

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

  const app = createApp({
    render() {
      return h(Gift, {
        sender,
        receiver,
        avatar,
        giftIcon,
        count,
        top,
        onRemove: () => {
          app.unmount()
          container.remove()
          const index = activeGiftTops.indexOf(top)
          if (index !== -1) activeGiftTops.splice(index, 1)
        },
      })
    },
  })

  app.mount(container)
}

// 用户进入直播间
function joinLive(name = '用户昵称', level = 30) {
  const container = document.createElement('div')
  const pageEl = page.value
  const app = createApp({
    render() {
      return h(JoinedLive, {
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
  // let page = new Dom(this.page)
  // let barrage = new Dom().create(this.barrageTemplate())
  // barrage.on('animationend', () => {
  //   barrage.remove()
  // })
  // let oldBarrages = new Dom('.barrage')
  // let top = document.body.clientHeight * 0.35
  // if (oldBarrages.els.length !== 0) {
  //   top = barrage.removePx(oldBarrages.css('top')) + 20
  // }
  // if (top > document.body.clientHeight * 0.5) {
  //   top = document.body.clientHeight * 0.35
  // }
  // barrage.css('top', top)
  // page.append(barrage)

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
      return h(Barrage, {
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

<style>
@import '@/assets/styles/index.css';
@import './global.css';
</style>

<style scoped>
@import '@/assets/styles/index.css';
@import './live-page.scss';
</style>
