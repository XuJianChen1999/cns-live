<!--
 * @Author: Xujianchen
 * @Date: 2025-06-30 14:46:23
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-09 11:25:17
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
        <img src="@/assets/svg/close-icon-black.svg" alt="" @click="close" />
      </div>
      <div class="joined-list">
        <div v-for="(item, index) in list" :key="index" class="joined-list-item flex-center">
          <div class="left flex-center">
            <span class="rank">{{ index + 1 }}</span>
            <img class="avatar" :src="item.avatar" @click="openDetail(item)" />
            <div class="level-box">
              <span>{{ item.name }}</span>
              <user-level :level="item.level" />
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
          <img class="avatar" src="@/assets/images/avatar1.png" alt="" />
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

  <joined-user-detail
    v-model="isShowDetail"
    :level="currentUser.level"
    @close="isShowDetail = false"
  />
</template>

<script setup>
import popup from '@/components/dialog/popup'
import UserLevel from '@/components/user-level'
import JoinedUserDetail from './joined-user-detail'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

const isShowDetail = ref(false)
const currentUser = ref({})
const list = [
  {
    name: '玛丽特·里奥',
    level: 10,
    diamond: 2000,
    avatar: new URL('@/assets/images/avatar1.png', import.meta.url).href,
  },
  {
    name: '吕子鑫',
    level: 10,
    diamond: 2000,
    avatar: new URL('@/assets/images/avatar2.png', import.meta.url).href,
  },
  {
    name: '龙恩林',
    level: 10,
    diamond: 2000,
    avatar: new URL('@/assets/images/avatar3.png', import.meta.url).href,
  },
  {
    name: '陈力星',
    level: 7,
    diamond: 2000,
    avatar: new URL('@/assets/images/avatar4.png', import.meta.url).href,
  },
  {
    name: '刘宇',
    level: 3,
    diamond: 2000,
    avatar: new URL('@/assets/images/avatar5.png', import.meta.url).href,
  },
]

function openDetail(item) {
  isShowDetail.value = true
  currentUser.value = item
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
