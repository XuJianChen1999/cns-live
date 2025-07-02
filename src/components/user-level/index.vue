<!--
 * @Author: Xujianchen
 * @Date: 2025-07-02 10:06:20
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-02 16:53:28
 * @Description: 用户等级
-->
<template>
  <div class="level">
    <div class="level-icon flex-center" :style="{ background: getLevelStyle(level).iconBgColor }">
      <img :src="getLevelStyle(level).iconURL" alt="" />
    </div>
    <div :style="{ background: getLevelStyle(level).bgColor }" class="level-number">10</div>
  </div>
</template>

<script setup>
defineProps({
  level: Number,
})

const levelBgMap = {
  10: {
    bgColor: 'linear-gradient(119.98deg, #b819a9 40.37%, #821ced 100.21%)',
    iconBgColor: '#821CED',
    iconURL: new URL('@/assets/svg/level-crown.svg', import.meta.url).href,
  },
  9: {
    bgColor: '#821CED',
    iconBgColor: '#821CED',
    iconURL: new URL('@/assets/svg/level-diamond.svg', import.meta.url).href,
  },
  8: {
    bgColor: '#951BD3',
    iconBgColor: '#951BD3',
    iconURL: new URL('@/assets/svg/level-diamond.svg', import.meta.url).href,
  },
  7: {
    bgColor: '#B819A9',
    iconBgColor: '#B819A9',
    iconURL: new URL('@/assets/svg/level-diamond.svg', import.meta.url).href,
  },
  6: {
    bgColor: '#E7166B',
    iconBgColor: '#E7166B',
    iconURL: new URL('@/assets/svg/level-star.svg', import.meta.url).href,
  },
  5: {
    bgColor: '#F15A4E',
    iconBgColor: '#F15A4E',
    iconURL: new URL('@/assets/svg/level-star.svg', import.meta.url).href,
  },
  4: {
    bgColor: '#F77D3E',
    iconBgColor: '#F77D3E',
    iconURL: new URL('@/assets/svg/level-star.svg', import.meta.url).href,
  },
  3: {
    bgColor: '#FEAD2A',
    iconBgColor: '#FEAD2A',
    iconURL: new URL('@/assets/svg/level-star.svg', import.meta.url).href,
  },
  2: {
    bgColor: '#8CB760',
    iconBgColor: '#8CB760',
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
</script>

<style scoped lang="scss">
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
}
</style>
