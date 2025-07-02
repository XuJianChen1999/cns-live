<!--
 * @Author: Xujianchen
 * @Date: 2025-06-19 11:10:21
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-02 10:57:37
 * @Description: 礼物弹幕特效
-->
<template>
  <div class="send-gift" :style="{ top: top + 'px' }" @animationend="onEnd">
    <div class="left">
      <img :src="avatar" alt="" class="avatar" />
      <div class="desc">
        <div class="name">{{ sender }}</div>
        <div class="sendto">
          <span class="send">送</span>
          <span class="to">{{ receiver }}</span>
        </div>
      </div>
      <div class="gift-wrapper">
        <img :src="giftIcon" alt="" class="gift-icon" />
      </div>
    </div>
    <div class="right">x{{ count }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  sender: String,
  receiver: String,
  avatar: [String, Object],
  giftIcon: [String, Object],
  count: Number,
  top: Number,
  onRemove: Function,
})

function onEnd() {
  props.onRemove?.()
}
</script>

<style scoped>
.right,
.name {
  color: #fff;
}
</style>
