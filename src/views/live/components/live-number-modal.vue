<!--
 * @Author: Xujianchen
 * @Date: 2025-06-30 14:46:23
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-30 15:29:04
 * @Description: 直播间人数弹窗
-->
<template>
  <popup page-id="app" tag="ul" mode="light" :show-line="false">
    <div class="joined"></div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/from-bottom'
</script>

<style scoped lang="scss">
.joined {
  height: 400px;
  background-color: #fff;
}
</style>
