<!--
 * @Author: Xujianchen
 * @Date: 2025-06-25 16:25:55
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-26 12:03:39
 * @Description: 充值弹窗
-->
<template>
  <popup
    :model-value="modelValue"
    :show-line="false"
    page-id="app"
    border-radius="16.4"
    mode="light"
    height="auto"
    tag="div"
    @close="close"
  >
    <div class="recharge">
      <!-- 头部 -->
      <div class="recharge-header flex-center">
        <div class="recharge-header-left flex-center">
          <span>账户余额</span>
          <div class="flex-center">
            <svg-icon name="gift-diamond" style="margin-right: 9.9px" /> 200
          </div>
        </div>
        <div class="recharge-header-right flex-center">
          充值记录 <img src="@/assets/svg/arrow-right.svg" />
        </div>
      </div>
      <!-- 充值列表 -->
      <div class="recharge-list flex-center">
        <div
          v-for="(item, index) in rechargeList"
          :key="index"
          :class="['recharge-list-item', 'flex-center', { active: index === current?.index }]"
          @click="select(item, index)"
        >
          <div class="recharge-list-item-name">
            <svg-icon name="gift-diamond" />
            {{ item.name }}
          </div>
          <span class="recharge-list-item-price">{{ item.price }} USDT</span>
          <div class="recharge-list-item-gift">{{ index === 0 ? '新手礼包' : '赠2钻' }}</div>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="recharge-payment">
        <span>支付方式</span>
        <div class="recharge-payment-select flex-center">
          <div class="recharge-payment-select-left flex-center">
            <img src="@/assets/svg/payment-select.svg" style="margin-right: 15px" />
            BTC
          </div>
          <div class="recharge-payment-select-right">
            <div>34.8568</div>
            <div>$ 252.82</div>
          </div>
        </div>
        <div class="recharge-payment-agree">《Coinexus充值服务协议》</div>
        <div class="recharge-payment-btn" @click="close">
          立即充值 <span v-if="current?.price">{{ current?.price }} USDT</span>
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/from-bottom'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

const current = ref({})
const rechargeList = [
  { name: 100, price: 1 },
  { name: 200, price: 2 },
  { name: 500, price: 2 },
  { name: 1000, price: 2 },
  { name: 2000, price: 2 },
  { name: 5000, price: 2 },
]

function select(item, index) {
  current.value = { ...item, index }
}

function close() {
  modelValue.value = false
  current.value = {}
  emits('close')
}
</script>

<style scoped lang="scss">
.recharge {
  padding: 32px 15px 24px;
  // 头部
  &-header {
    justify-content: space-between;
    margin-bottom: 23px;
    &-left {
      span {
        color: #323333ff;
        font-size: 16px;
        margin-right: 10px;
      }
      div {
        font-size: 16px;
        color: #323333ff;
      }
    }
    &-right {
      font-size: 16px;
      color: #58667eff;
    }
  }
  // 充值列表
  &-list {
    flex-wrap: wrap;
    &-item {
      position: relative;
      flex-direction: column;
      justify-content: center;
      background: #f5f6f8ff;
      border-radius: 8.2px;
      width: 106px;
      height: 88px;
      margin-right: 10px;
      margin-bottom: 22px;
      border: 1px solid #f5f6f8ff;
      transition:
        background,
        border 0.3s;
      &.active {
        border: 1px solid #3751ffff;
        background: #f045690d;
        .recharge-list-item-name,
        .recharge-list-item-price {
          color: #3751ffff;
        }
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
      &-name {
        color: #22252dff;
        font-size: 24px;
        margin-bottom: 6px;
      }
      &-price {
        font-size: 12px;
        color: #22252dff;
      }
      &-gift {
        position: absolute;
        top: -10.2px;
        left: 0;
        z-index: 9;
        padding: 5.1px 8.2px;
        border-radius: 10.3px 10.3px 10.3px 0px;
        color: #f5f6f8ff;
        font-size: 10px;
        background-color: #3751ffff;
      }
    }
  }
  // 支付方式
  &-payment {
    span {
      color: #323333ff;
      font-size: 16px;
    }
    &-select {
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: 10px;
      border: 1px solid #e3ebf1ff;
      margin-bottom: 24px;
      margin-top: 12px;
      &-left {
        color: #22252dff;
        font-size: 14px;
      }
      &-right {
        div:first-child {
          color: #22252dff;
          font-size: 14px;
        }
        div:last-child {
          color: #a6b0c3ff;
          font-size: 12px;
        }
      }
    }
    &-agree {
      color: #3751ffff;
      font-size: 12px;
      margin-bottom: 16px;
      &::before {
        content: '充值则表示您同意';
        color: #58667eff;
      }
    }
    &-btn {
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      color: #fff;
      border-radius: 29.3px;
      text-align: center;
      background: linear-gradient(90deg, #3751ffff 0%, #912eefff 100%);
      span {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>
