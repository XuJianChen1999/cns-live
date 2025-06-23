<!--
 * @Author: Xujianchen
 * @Date: 2025-06-21 15:10:55
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-21 17:36:44
 * @Description:
-->
<template>
  <from-bottom-dialog
    page-id="video"
    :model-value="modelValue"
    @close="close"
    :show-line="false"
    mask-mode="light"
    tag="comment"
    mode="white"
  >
    <template #header>
      <span>122条评论</span>
      <button @click="close">关闭</button>
    </template>
  </from-bottom-dialog>
</template>

<script setup>
import FromBottomDialog from '@/components/dialog/from-bottom'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped lang="scss"></style>
