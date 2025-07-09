<!--
 * @Author: Xujianchen
 * @Date: 2025-07-01 21:01:58
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-09 14:07:19
 * @Description: 已加入用户详情
-->
<template>
  <popup
    :model-value="modelValue"
    round
    class="joined-user-detail"
    position="bottom"
    @close="close"
  >
    <div class="user flex-center">
      <img class="user-avatar" src="@/assets/images/avatar1.png" alt="" />
      <div class="user-info flex-center">
        <span>用户昵称</span>
        <user-level :level="level" />
        <img src="@/assets/svg/user-admin.svg" style="margin-left: 4px" />
      </div>
      <div class="user-did flex-center">
        <span>DID: 123457</span>
        <div>IP:美国</div>
      </div>
      <div class="user-fans flex-center">
        <div class="user-fans-info">
          <span>54</span>
          <span>关注</span>
        </div>
        <div class="user-fans-info">
          <span>3.7K</span>
          <span>粉丝</span>
        </div>
        <div class="user-fans-info">
          <span>1.2K</span>
          <span>获赞</span>
        </div>
      </div>
      <div class="user-level">
        <div class="text">级别</div>
        <div class="progress flex-center">
          <img src="@/assets/svg/level-start.svg" alt="" />
          <!-- <div class="progress-bar"></div> -->
          <progress-bar
            :percentage="70"
            :show-pivot="false"
            stroke-width="10"
            track-color="#E3EBF1"
            color="linear-gradient(90deg, #3751ff 0%, #912eef 100%)"
            round="0"
            style="margin: 0 4px"
          />
          <img src="@/assets/images/level-end.png" style="width: 16px; height: 16px" />
        </div>
        <div class="next-level">888钻</div>
      </div>
      <div class="user-follow-btn flex-center">
        <div class="follow-btn">+ 关注</div>
        <div class="right-btn">@</div>
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/popup'
import ProgressBar from '@/components/progress'
import UserLevel from '@/components/user-level'

const modelValue = defineModel({ type: Boolean, default: false })
defineProps({
  level: Number,
})
const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style lang="scss">
:deep(.joined-user-detail) {
  &.van-popup {
    overflow: auto !important;
  }
}
</style>

<style scoped lang="scss">
.user {
  position: relative;
  justify-content: center;
  flex-direction: column;
  // 头像
  &-avatar {
    position: absolute;
    top: -41px;
    left: 50%;
    transform: translateX(-50%);
    width: 82px;
    height: 82px;
    border-radius: 50%;
    background-color: red;
  }
  // 信息
  &-info {
    margin-top: 46px;
    margin-bottom: 10px;
    span {
      color: #22252d;
      font-weight: 600;
      font-size: 20px;
      margin-right: 11px;
    }
  }
  // did + ip
  &-did {
    margin-bottom: 26.5px;
    span {
      color: #a6b0c3;
      font-size: 12px;
      font-weight: 500;
      margin-right: 12px;
    }
    div {
      padding: 2px 4px;
      background-color: #f5f6f8;
      color: #a6b0c3;
      font-size: 10px;
      border-radius: 10px;
    }
  }
  // 粉丝、获赞
  &-fans {
    width: 300px;
    justify-content: space-between;
    margin-bottom: 24px;
    &-info {
      display: flex;
      align-items: center;
      span:first-child {
        color: #22252d;
        font-weight: 500;
        font-size: 16px;
        margin-right: 4px;
      }
      span:last-child {
        color: #a6b0c3;
        font-size: 12px;
      }
    }
  }
  // 等级
  &-level {
    margin: 0 22px;
    padding: 8px 12px 4px;
    width: calc(100% - 24px - 44px);
    background-color: #f5f6f8;
    border-radius: 10px;
    .text {
      width: 100%;
      text-align: left;
      color: #58667e;
      font-size: 12px;
    }
    .progress {
      margin-bottom: 8px;
      margin-top: 7px;
    }
    .progress-bar {
      margin: 0 6px;
      width: 100%;
      height: 10px;
      background-color: #e3ebf1;
      border-radius: 10px;
    }
    .next-level {
      color: #ff5c87;
      font-size: 8px;
      text-align: center;
      &::after {
        content: '升级到下一级';
        color: #686872;
      }
    }
  }
  // 底部关注按钮
  &-follow-btn {
    width: calc(100% - 32px);
    padding: 11px 16px;
    border-top: 1px solid #e3e3ec;
    justify-content: space-between;
    margin-top: 23.5px;
    .follow-btn {
      width: 291px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background-color: #3751ff;
      color: #fff;
      border-radius: 6px;
    }
    .right-btn {
      width: 40px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #000;
      font-size: 20px;
      font-weight: 600;
      border: 1px solid #e3ebf1;
      border-radius: 6px;
    }
  }
}
</style>
