<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 18:11:50
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-30 11:10:31
 * @Description: 选择交易类型
-->
<template>
  <popup :model-value="modelValue" position="bottom" round @close="close">
    <div class="trade-type">
      <div class="trade-type-header">
        <span>选择交易交易类型</span>
        <img src="@/assets/svg/close-icon-black.svg" alt="" @click="close" />
      </div>
      <div class="trade-type-list flex">
        <div
          v-for="(item, index) in ['全部', '充值', '交易']"
          :key="item"
          :class="['trade-type-list-item', { active: current === index }]"
          @click="select(item, index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/popup'

const modelValue = defineModel({ type: Boolean, default: false })
const props = defineProps({ currentType: Number })
const emits = defineEmits(['close', 'select'])

const current = computed(() => props.currentType || 0)

function select(item, index) {
  current.value = item
  emits('select', { item, index })
}

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped lang="scss">
.trade-type {
  padding: 16px;
  &-header {
    position: relative;
    color: #212121ff;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 34px;
    text-align: center;
    img {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 19;
    }
  }
  &-list {
    justify-content: space-between;
    &-item {
      width: 108px;
      height: 72px;
      line-height: 72px;
      text-align: center;
      background-color: #f5f6f8ff;
      border: 1px solid #f5f6f8ff;
      color: #58667eff;
      font-size: 16px;
      border-radius: 8.2px;
      &.active {
        color: #3751ffff;
        border: 1px solid #3751ffff;
        font-weight: bold;
      }
    }
  }
}
</style>
