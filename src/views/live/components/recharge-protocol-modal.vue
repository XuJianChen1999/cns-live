<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 15:30:20
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-27 15:40:41
 * @Description: 充值协议弹窗
-->
<template>
  <popup
    :model-value="modelValue"
    :show-line="false"
    page-id="app"
    border-radius="16.4"
    mode="light"
    height="auto"
    tag="p"
    @close="close"
  >
    <div class="protocol">
      <div class="protocol-header">
        <span>Coinexus充值服务协议</span>
        <img src="@/assets/svg/close-icon.svg" class="close-icon" />
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/from-bottom'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped lang="scss">
.protocol {
  padding: 16px;
  background-color: #fff;
  height: calc(487px - 16px * 2);
  &-header {
    position: relative;
    color: #212121ff;
    font-weight: 600;
    font-size: 16px;
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>
