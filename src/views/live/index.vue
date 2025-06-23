<!--
 * @Author: Xujianchen
 * @Date: 2025-06-18 10:23:44
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-23 15:08:38
 * @Description: 直播间
-->
<template>
  <div class="live">
    <video
      src="https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cj1lq4jc77u0ng6s1gt0&line=0&file_id=bed51c00899b458cbc5d8280147c22a1&sign=7749aec7bd62a3760065f60e40fc1867&is_play_url=1&source=PackSourceEnum_PUBLISH"
      class="live-video"
      poster="https://dy.ttentau.top/images/jwWCPZVTIA4IKM-8WipLF.png"
      preload=""
      loop=""
      muted
      x5-video-player-type="h5-page"
      x5-video-player-fullscreen="false"
      webkit-playsinline="true"
      x5-playsinline="true"
      playsinline="true"
      fullscreen="false"
      autoplay=""
    >
      <!-- <p>您的浏览器不支持 video 标签。</p> -->
    </video>
    <div class="live-header">
      <div class="live-header-host">
        <img src="@/assets/images/host-avatar.png" />
        <div class="live-header-host-info">
          <div class="live-header-host-name">西伯利亚</div>
          <div class="live-header-host-hot">
            <hot-icon />
            <span>2.5W</span>
          </div>
        </div>
        <div class="live-header-host-follow">+</div>
      </div>
      <div class="live-header-audience">
        <div class="live-header-audience-avatars">
          <img src="@/assets/images/host-avatar.png" />
          <img src="@/assets/images/host-avatar.png" />
          <img src="@/assets/images/host-avatar.png" />
        </div>
        <div class="live-header-audience-number">165</div>
        <close-icon />
      </div>
    </div>

    <div class="live-bottom">
      <div class="live-bottom-barrage"></div>
      <div class="live-bottom-action">
        <div class="live-bottom-input">
          <input type="text" placeholder="来说一句吧" />
          <smiley-face-icon class="live-bottom-input-smiley" />
        </div>
        <div class="live-bottom-gift">
          <share-icon class="live-bottom-gift-icon" />
          <gift-icon class="live-bottom-gift-icon" />
          <bar-icon class="live-bottom-gift-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HotIcon from '@/assets/svg/hot-icon'
import CloseIcon from '@/assets/svg/close-icon'
import ShareIcon from '@/assets/svg/share-icon'
import GiftIcon from '@/assets/svg/gift-icon'
import BarIcon from '@/assets/svg/bar-icon'
import SmileyFaceIcon from '@/assets/svg/smiley-face-icon'

// [{ id: 1, text: '欢迎进入直播间！' },
//   { id: 2, text: '主播太美了吧～' },
//   { id: 3, text: '快关注我！' },
//   { id: 4, text: '这是一条测试弹幕' },
//   { id: 5, text: '弹幕真好玩！' },
//   { id: 6, text: '没座' },
//   { id: 7, text: '赶快丢手绢啊' },
//   { id: 8, text: '中分头，背带裤，我是ikun你记住' },
//   { id: 9, text: '手一指，嘴一翘，kun哥承包我的笑' },
//   { id: 10, text: '666666666666' },
//   { id: 11, text: '老铁双击来点赞' },
//   { id: 12, text: '你好啊，我是ikun' },
//   { id: 13, text: '我太难了' }]
</script>

<style scoped lang="scss">
@use './index.scss';

/* 入场动画 */
.barrage-enter-active {
  transition: all 0.3s ease;
}
.barrage-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.barrage-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* 离场动画 */
.barrage-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}
.barrage-leave-from {
  opacity: 1;
}
.barrage-leave-to {
  opacity: 0;
}
</style>
