<!--
 * @Author: Xujianchen
 * @Date: 2025-06-30 14:46:23
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-01 18:59:48
 * @Description: 直播间人数弹窗
-->
<template>
  <popup
    :model-value="modelValue"
    position="bottom"
    :overlay-style="{ background: '#00000066' }"
    round
    @close="close"
  >
    <div class="joined">
      <div class="joined-header flex-center">
        <span>在线（184）</span>
        <img src="@/assets/svg/close-icon-black.svg" alt="" />
      </div>
      <div class="joined-list">
        <div v-for="(item, index) in list" :key="index" class="joined-list-item flex-center">
          <div class="left flex-center">
            <span class="rank">{{ index + 1 }}</span>
            <img class="avatar" src="" alt="" />
            <div class="level-box">
              <span>{{ item.name }}</span>
              <div class="level">
                <div
                  class="level-icon flex-center"
                  :style="{ background: getLevelStyle(item.level).iconBgColor }"
                >
                  <img :src="getLevelStyle(item.level).iconURL" alt="" />
                </div>
                <div
                  :style="{ background: getLevelStyle(item.level).bgColor }"
                  class="level-number"
                >
                  10
                </div>
              </div>
            </div>
          </div>
          <div class="right flex-center">
            <img src="@/assets/svg/gift-diamond.svg" alt="" />
            <span>2000</span>
          </div>
        </div>
      </div>
      <div class="joined-bottom flex-center">
        <div class="left flex-center">
          <img class="avatar" src="" alt="" />
          <div class="name">
            <span>詹姆斯</span>
            <div class="flex-center"><img src="@/assets/svg/gift-diamond.svg" alt="" /> 0</div>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/svg/joined-bottom-gift.svg" alt="" />
        </div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/popup'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

const list = [
  {
    name: '玛丽特·里奥',
    level: 10,
    diamond: 2000,
  },
  {
    name: '吕子鑫',
    level: 10,
    diamond: 2000,
  },
  {
    name: '龙恩林',
    level: 10,
    diamond: 2000,
  },
  {
    name: '陈力星',
    level: 7,
    diamond: 2000,
  },
  {
    name: '刘宇',
    level: 3,
    diamond: 2000,
  },
  {
    name: '杨江',
    level: 1,
    diamond: 2000,
  },
]

const levelBgMap = {
  10: {
    bgColor: 'linear-gradient(119.98deg, #b819a9 40.37%, #821ced 100.21%)',
    iconBgColor: '#821CED',
    iconURL: new URL('@/assets/svg/level-crown.svg', import.meta.url).href,
  },
  7: {
    bgColor: '#B819A9',
    iconBgColor: '#B819A9',
    iconURL: new URL('@/assets/svg/level-diamond.svg', import.meta.url).href,
  },
  3: {
    bgColor: '#FEAD2A',
    iconBgColor: '#FEAD2A',
    iconURL: new URL('@/assets/svg/level-star.svg', import.meta.url).href,
  },
  1: {
    bgColor: '#1DC194',
    iconBgColor: '#36D8AB',
    iconURL: new URL('@/assets/svg/level-star.svg', import.meta.url).href,
  },
}
// 降序排列 key（10, 7, 3, 1）
const levelThresholds = Object.keys(levelBgMap)
  .map(Number)
  .sort((a, b) => b - a)

function getLevelStyle(level) {
  const matched = levelThresholds.find((l) => level >= l)
  return levelBgMap[matched]
}

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped lang="scss">
.joined {
  position: relative;
  background-color: #fff;
  &-header {
    justify-content: space-between;
    color: #212121;
    height: 56px;
    line-height: 56px;
    padding: 0 16px;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid #e3ebf1;
  }
  &-list {
    height: 268px;
    overflow-y: scroll;
    padding: 16px;
    &-item {
      justify-content: space-between;
      margin-bottom: 22px;
      .rank {
        display: block;
        width: 32px;
        height: 22px;
        color: #a6b0c3;
        text-align: center;
      }
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
        background-color: #3751ff;
      }
      .level-box {
        display: flex;
        flex-direction: column;
        .level {
          position: relative;
          width: fit-content;
        }
        .level-icon {
          position: absolute;
          left: 0;
          top: -1px;
          z-index: 9;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: #821ced;
          border-radius: 50%;
        }
        .level-number {
          height: 14px;
          line-height: 14px;
          padding-right: 4px;
          padding-left: 16px;
          margin-left: 3px;
          color: #ffffff;
          font-weight: 500;
          font-size: 10px;
          text-align: right;
          border-radius: 12px;
          background: linear-gradient(119.98deg, #b819a9 40.37%, #821ced 100.21%);
        }
        span {
          color: #22252d;
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
      .right {
        color: #3751ff;
        font-size: 10px;
        img {
          width: 12px;
          height: 12px;
          margin-right: 4px;
        }
      }
    }
  }
  &-bottom {
    padding: 16px 16px 29px 56px;
    background-color: #f5f6f8;
    justify-content: space-between;
    .left {
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 16px;
      }
      .name {
        color: #22252d;
        font-weight: 500;
        font-size: 16px;
        div {
          color: #3751ff;
          img {
            width: 12px;
            height: 12px;
            margin-right: 4px;
          }
        }
      }
    }
    .right {
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
