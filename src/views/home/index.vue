<!--
 * @Author: Xujianchen
 * @Date: 2025-06-18 10:00:58
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-19 09:46:12
 * @Description: 首页
-->
<template>
  <div class="studio">
    <div class="studio-living-list">
      <div v-for="item in 6" :key="item" class="studio-living-list-item" @click="goLive">
        <div class="studio-living-list-item-header">
          <div class="studio-living-list-item-header-people">
            <span>👁️</span>
            <div>12K+</div>
          </div>
          <div class="studio-living-list-item-header-status">Live</div>
        </div>
        <div class="studio-living-list-item-bottom">
          <img src="@/assets/images/avatar.png" />
          <span>这里是一个项目名2</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

function goLive() {
  router.push('/live')
}
</script>

<style scoped lang="scss">
.studio {
  padding: 16px;

  &-living-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &-living-list-item {
    position: relative;
    width: 166px;
    height: 185px;
    border-radius: 10px;
    margin-right: 11px;
    margin-bottom: 12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:nth-child(even) {
      margin-right: 0;
      background-image: url('@/assets/images/female-bg.png');
    }
    &:nth-child(odd) {
      background-image: url('@/assets/images/male-bg.png');
    }

    // header
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 8px;

      &-people {
        display: flex;
        align-items: center;
        padding: 4px;
        background-color: #00000099;
        box-shadow: 0px 10px 15px #00000033;
        backdrop-filter: blur(20px);
        border-radius: 100px;
        border: 1px solid #ffffff12;
        span {
          font-size: 12px;
          margin-right: 5px;
        }
        div {
          color: #ffffffff;
          font-family: 'PingFang SC';
          font-weight: 500;
          font-size: 10px;
        }
      }

      &-status {
        padding: 3px 12px;
        border-radius: 100px;
        background: linear-gradient(270deg, #ff5c87ff 0%, #ff6a32ff 100%);
        box-shadow: 0px 10px 15px #00000033;
        backdrop-filter: blur(20px);
        color: #ffffffff;
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 10px;
      }
    }

    // bottom
    &-bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
      display: flex;
      align-items: center;
      height: 37px;
      line-height: 37px;
      border-radius: 0px 0px 10px 10px;
      background-color: #22252d99;
      box-shadow: 0px 10px 15px #00000033;
      backdrop-filter: blur(20px);
      img {
        width: 25px;
        height: 27px;
        margin: 0 8px;
      }
      span {
        color: #f6f6f6ff;
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
}
</style>
