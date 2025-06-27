<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 18:47:10
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-27 19:16:03
 * @Description: 交易详情信息
-->
<template>
  <popup :model-value="modelValue" round position="bottom" @close="close">
    <common-header title="交易详情" show-back :show-close="false" />
    <div class="detail-info-header">
      <span class="title">给主播送礼</span>
      <span class="price">-200</span>
      <div class="detail-info-header-base">
        <img src="@/assets/images/avatar.png" alt="" />
        <span class="name">比特币交流群</span>
        <img src="@/assets/svg/arrow-right.svg" alt="" />
      </div>
    </div>
    <div class="detail-info-list">
      <div class="title">送礼记录 （共2笔）</div>
      <div class="list">
        <div class="list-item">
          <div class="left">
            <span>1个么么哒</span>
            <span>2025-06-27 19:00:00</span>
          </div>
          <div class="right">-200</div>
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/popup'
import CommonHeader from './header'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped lang="scss">
.detail-info {
  &-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e3ebf1ff;
    padding-bottom: 28px;
    margin: 32px 16px 16px;
    .title {
      color: #22252dff;
      font-size: 14px;
    }
    .price {
      color: #22252dff;
      font-weight: 500;
      font-size: 24px;
      margin-top: 16px;
      margin-bottom: 20px;
    }
    &-base {
      display: flex;
      align-items: center;

      img:first-child {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      .name {
        color: #58667eff;
        font-size: 12px !important;
      }
    }
  }
  &-list {
    .title {
      margin-bottom: 16px;
      color: #6d7385ff;
      font-size: 14px;
      margin-left: 16px;
    }
    .list {
      margin: 0 16px;
    }
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid #e3ebf1ff;
      .left {
        display: flex;
        flex-direction: column;
        span:first-child {
          color: #171717ff;
          font-size: 14px;
        }
        span:last-child {
          font-size: 12px;
          color: #58667eff;
          margin-top: 8px;
        }
      }
      .right {
        font-size: 14px;
        color: #22252dff;
        font-weight: 500;
      }
    }
  }
}
</style>
