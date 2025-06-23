<!--
 * @Author: Xujianchen
 * @Date: 2025-06-19 11:05:38
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-19 11:45:10
 * @Description: 进入直播间弹幕
-->
<template>
  <div class="user-joined" @animationend="$emit('end')">
    <div class="level">
      <div class="wrapper">
        <img :src="LoveIcon" alt="" />
        <span>{{ level }}</span>
      </div>
    </div>
    <span class="name">{{ name }}</span>
    <span class="text">加入了直播间</span>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  level: Number,
  icon: String,
})

import LoveIcon from '@/assets/images/love.webp'
</script>
