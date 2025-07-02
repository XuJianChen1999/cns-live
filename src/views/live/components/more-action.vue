<!--
 * @Author: Xujianchen
 * @Date: 2025-07-02 16:07:39
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-02 16:17:26
 * @Description: more action
-->
<template>
  <popup :model-value="modelValue" position="bottom" round @close="close">
    <div class="more-action">
      <img src="@/assets/svg/share.svg" />
      <img src="@/assets/svg/forward.svg" />
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
  img {
    margin-right: 24px;
  }
}
</style>
