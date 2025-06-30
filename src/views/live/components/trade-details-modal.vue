<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 17:27:41
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-30 11:29:20
 * @Description: 钻石明细
-->
<template>
  <popup :model-value="modelValue" round position="bottom" @close="emits('close')">
    <div class="trade">
      <div class="trade-header">
        <modal-header
          title="钻石明细"
          :show-back="!isShowCheckbox"
          :left-text="isShowCheckbox ? '取消' : null"
          :right-text="selectedCount"
          :right-text-style="{
            color: isShowCheckbox ? '#3751FF' : '#22252d',
          }"
          @click-right="handleClickRight"
          @click-left="handleClickLeft"
        />
      </div>
      <div class="trade-type flex" @click="isShowSelect = true">
        {{ type }} <img src="@/assets/svg/triggle.svg" alt="" />
      </div>
      <div class="trade-list">
        <div v-for="(item, index) in list" :key="index" class="trade-list-item">
          <div class="trade-list-item-total flex">
            <div class="flex">2025年6月 <img src="@/assets/svg/triggle.svg" alt="" /></div>
            <div class="flex">
              <span style="margin-right: 12px">收入 91钻石</span>
              <span>转出 0钻石</span>
            </div>
          </div>
          <div class="trade-list-item-box">
            <div
              class="trade-list-item-checkbox"
              :style="{ 'margin-right': isShowCheckbox ? '16px' : 0 }"
            >
              <van-checkbox
                v-if="isShowCheckbox"
                :model-value="item.selected"
                checked-color="#3751FF"
                icon-size="22"
                @click="() => handleSelect(item, index)"
              />
            </div>
            <!-- 充值 -->
            <div v-if="index % 2 === 0" class="trade-list-item-fees">
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
                <div class="flex" @click.stop="isShowDetail = true">
                  查看详情 <img src="@/assets/svg/arrow-right.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </popup>

  <select-trade-type
    v-model="isShowSelect"
    :current-type="tradeTypeIdx"
    @select="handleSelectType"
  />
  <trade-detail-info v-model="isShowDetail" @close="isShowDetail = false" />
</template>

<script setup>
import { showToast } from 'vant'
import showConfirmDialog from '@/app/config-dialog'
import popup from '@/components/dialog/popup'
import SelectTradeType from './select-trade-type'
import TradeDetailInfo from './trade-detail-info'
import ModalHeader from './modal-header'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

const isShowSelect = ref(false)
const isShowDetail = ref(false)
const isShowCheckbox = ref(false)
const list = ref(
  [
    { type: '充值', time: '2025-06-26 10:23', num: 200 },
    { type: '送礼', time: '2025-06-26 10:23', num: 200 },
    { type: '充值', time: '2025-06-26 10:23', num: 200 },
    { type: '充值', time: '2025-06-26 10:23', num: 200 },
    { type: '送礼', time: '2025-06-26 10:23', num: 200 },
    { type: '充值', time: '2025-06-26 10:23', num: 200 },
    { type: '充值', time: '2025-06-26 10:23', num: 200 },
    { type: '充值', time: '2025-06-26 10:23', num: 200 },
    { type: '送礼', time: '2025-06-26 10:23', num: 200 },
  ].map((item) => ({ ...item, selected: false })),
)
const tradeTypeIdx = ref(0)

const type = computed(() => ['全部交易类型', '充值', '送礼'][tradeTypeIdx.value])
const len = computed(() => list.value.filter((item) => item.selected).length)
const selectedCount = computed(() =>
  len.value && isShowCheckbox.value ? `删除(${len.value})` : '删除',
)

// 选择删除
function handleSelect(item, index) {
  list.value[index] = {
    ...item,
    selected: !item.selected,
  }
}

// 选择交易类型
function handleSelectType(val) {
  tradeTypeIdx.value = val.index
  isShowSelect.value = false
}

// 确认删除
function handleConfirm() {
  showToast('删除成功，一共' + len.value + '条')
  isShowCheckbox.value = false
  const tList = [...list.value]
  tList.forEach((item) => (item.selected = false))
  list.value = tList
}

async function handleClickRight() {
  if (!isShowCheckbox.value) {
    isShowCheckbox.value = true
    return
  }

  if (!len.value) return showToast('请选择要删除的交易记录')
  const res = await showConfirmDialog({
    type: 'warning',
    content: '删除记录后将无法恢复，您将不能再查看该记录',
  })
  console.log(res)

  res === 'confirm' && handleConfirm()
}

function handleClickLeft() {
  if (!isShowCheckbox.value) {
    modelValue.value = false
    emits('close')
    return
  }
  isShowCheckbox.value = false
  const tList = [...list.value]
  tList.forEach((item) => (item.selected = false))
  list.value = tList
}
</script>

<style scoped lang="scss">
.trade {
  background-color: #fff;
  &-header {
    padding: 16px;
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
    height: 500px;
    overflow-y: scroll;
    &-item {
      &-total {
        justify-content: space-between;
        color: #6d7385ff;
        font-size: 14px;
        background-color: #f5f6f8ff;
        padding: 8px 16px;
      }
      &-box {
        // padding: 0 16px;
        display: flex;
        align-items: center;
      }
      &-checkbox {
        margin-left: 16px;
      }
      // 充值
      &-fees {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 12px 0;
        border-bottom: 1px solid #e3ebf1ff;
        width: calc(100% - 32px);
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
        padding: 16px 16px 12px 0;
        width: calc(100% - 32px);
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
