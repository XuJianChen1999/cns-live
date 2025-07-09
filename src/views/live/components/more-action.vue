<!--
 * @Author: Xujianchen
 * @Date: 2025-07-02 16:07:39
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-09 10:50:04
 * @Description: more action
-->
<template>
  <popup :model-value="modelValue" position="bottom" round @close="close">
    <div class="more-action flex-center">
      <div class="more-action-item flex-center">
        <img src="@/assets/svg/share.svg" />
        <span>分享</span>
      </div>
      <div class="more-action-item flex-center">
        <img src="@/assets/svg/forward.svg" />
        <span>转发</span>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/popup'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped lang="scss">
.more-action {
  height: calc(172px - 24px);
  padding-top: 24px;
  padding-left: 24px;
  &-item {
    flex-direction: column;
    justify-content: center;
    margin-right: 24px;
  }
  span {
    color: #58667e;
    font-size: 12px;
    margin-top: 6px;
  }
}
</style>
