<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 17:27:41
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-27 18:56:06
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
        <div v-for="item in 13" :key="item" class="trade-list-item">
          <div class="trade-list-item-total flex">
            <div class="flex">2025年6月 <img src="@/assets/svg/triggle.svg" alt="" /></div>
            <div class="flex">
              <span style="margin-right: 12px">收入 91钻石</span>
              <span>转出 0钻石</span>
            </div>
          </div>
          <!-- 充值 -->
          <div v-if="item % 2 === 0" class="trade-list-item-fees">
            <div class="left">
              <span>充值</span>
              <span>06月26日 10:23</span>
            </div>
            <span class="right">+200</span>
          </div>
          <!-- 送礼 -->
          <div v-else class="trade-list-item-gift flex">
            <div class="left">
              <span class="title">给主播送礼</span>
              <div class="name flex">
                <img src="@/assets/images/avatar.png" alt="" />
                <span>比特币交流群</span>
              </div>
              <span class="time">06月26日 10:23</span>
            </div>
            <div class="right">
              <span>-200</span>
              <div class="flex" @click="isShowDetail = true">
                查看详情 <img src="@/assets/svg/arrow-right.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </popup>

  <select-trade-type v-model="isShowSelect" @select="handleSelectType" />
  <trade-detail-info v-model="isShowDetail" @close="isShowDetail = false" />
</template>

<script setup>
import popup from '@/components/dialog/popup'
import SelectTradeType from './select-trade-type'
import TradeDetailInfo from './trade-detail-info'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

const isShowSelect = ref(false)
const isShowDetail = ref(false)
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
      // 充值
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
      // 送礼
      &-gift {
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
          .title {
            color: #171717ff;
            font-weight: 500;
            font-size: 14px;
          }
          .name {
            color: #58667eff;
            font-size: 12px;
            margin: 8px 0;
            img {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              margin-right: 4px;
            }
          }
          .time {
            color: #58667eff;
            font-size: 12px;
          }
        }
        .right {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
          span {
            color: #3751ffff;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
          }
          div {
            color: #58667eff;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
