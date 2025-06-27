<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 17:27:41
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-27 18:27:35
 * @Description: 钻石明细
-->
<template>
  <popup :model-value="modelValue" round position="bottom" @close="emits('close')">
    <div class="trade">
      <div class="trade-header flex">
        <img src="@/assets/svg/arrow-left.svg" alt="" />
        <span>钻石明细</span>
        <span>删除</span>
      </div>
      <div class="trade-type flex" @click="isShowSelect = true">
        {{ type }} <img src="@/assets/svg/triggle.svg" alt="" />
      </div>
      <div class="trade-list">
        <div class="trade-list-item">
          <div class="trade-list-item-total flex">
            <div class="flex">2025年6月 <img src="@/assets/svg/triggle.svg" alt="" /></div>
            <div class="flex">
              <span style="margin-right: 12px">收入 91钻石</span>
              <span>转出 0钻石</span>
            </div>
          </div>
          <div v-for="item in 13" :key="item" class="trade-list-item-fees">
            <div class="left">
              <span>充值</span>
              <span>06月26日 10:23</span>
            </div>
            <span class="right">+200</span>
          </div>
        </div>
      </div>
    </div>
  </popup>

  <select-trade-type v-model="isShowSelect" @select="handleSelectType" />
</template>

<script setup>
import popup from '@/components/dialog/popup'
import SelectTradeType from './select-trade-type'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

const isShowSelect = ref(false)
const type = ref('全部')

function handleSelectType(val) {
  type.value = val
  isShowSelect.value = false
}
</script>

<style scoped lang="scss">
.trade {
  background-color: #fff;
  &-header {
    padding: 18px 16px;
    justify-content: space-between;
    span:nth-child(2) {
      color: #212121ff;
      font-weight: 600;
      font-size: 16px;
    }
    span:last-child {
      color: #22252dff;
      font-size: 14px;
    }
  }
  &-type {
    justify-content: center;
    color: #22252dff;
    margin-bottom: 8px;
    svg {
      margin-left: 4px;
    }
  }
  &-list {
    height: 400px;
    overflow-y: scroll;
    &-item {
      &-total {
        justify-content: space-between;
        color: #6d7385ff;
        font-size: 14px;
        background-color: #f5f6f8ff;
        padding: 8px 16px;
      }
      &-fees {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 12px 16px;
        border-bottom: 1px solid #e3ebf1ff;
        &:last-child {
          border-bottom: none;
        }
        .left {
          display: flex;
          flex-direction: column;
          span:first-child {
            color: #171717ff;
            font-size: 14px;
            font-weight: 500;
          }
          span:last-child {
            color: #58667eff;
            font-size: 12px;
            margin-top: 8px;
          }
        }
        .right {
          color: #3751ffff;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
