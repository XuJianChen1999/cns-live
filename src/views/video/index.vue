<!--
 * @Author: Xujianchen
 * @Date: 2025-06-21 14:08:24
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-21 16:36:33
 * @Description:
-->
<template>
  <div class="video-wrapper" id="video">
    <!-- <slide-horizontal class="first-horizontal-item" name="second">
      <slide-item> -->
    <div class="video-wrapper">
      <video
        ref="videoRef"
        preload="true"
        src="@/assets/example.mp4"
        loop
        x5-video-player-type="h5-page"
        er-fullscreen="false"
        :webkit-playsinline="true"
        :x5-playsinline="true"
        :playsinline="true"
        :fullscreen="false"
      >
        <p>您的浏览器不支持 video 标签。</p>
      </video>
      <div class="float">
        <div class="normal">
          <button @click="openComment">评论</button>
        </div>
      </div>
    </div>
    <!-- </slide-item>
    </slide-horizontal> -->

    <comments v-model="isShowComment" @close="isShowComment = false" />
  </div>
</template>

<script setup>
import { _css } from '@/utils/dom'
import SlideHorizontal from '@/components/slide/horizontal'
import SlideItem from '@/components/slide/item'
import Comments from './components/comments'

const videoRef = ref(null)
const isShowComment = ref(false)

watch(isShowComment, (val) => {
  const el = videoRef.value
  if (val) {
    _css(el, 'transition-duration', `300ms`)
    _css(el, 'height', 'calc(var(--vh, 1vh) * 30)')
  } else {
    _css(el, 'transition-duration', `300ms`)
    _css(el, 'height', '100%')
  }
})

function openComment() {
  isShowComment.value = true
}
</script>

<style scoped lang="scss">
.video-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: black;
}

.first-horizontal-item {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 56px) !important;
  overflow: hidden;
  border-radius: 10rem;
}

.video-wrapper {
  position: relative;
  font-size: 14rem;
  width: 100%;
  height: 100%;
  text-align: center;

  video {
    max-width: 100%;
    height: 100%;
    transition:
      height,
      margin-top 0.3s;
  }

  .float {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    .normal {
      position: absolute;
      bottom: 0;
      width: 100%;
      transition: all 0.3s;
    }
  }
}
</style>
