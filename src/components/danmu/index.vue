<template>
  <div class="danmu-container" ref="container">
    <transition-group name="danmu" tag="div">
      <div
        v-for="(item, index) in danmuList"
        :key="index"
        class="danmu-item"
        :style="{
          top: `${item.top}px`,
          color: item.color,
          transform: `translateX(${item.translateX}px)`,
          fontSize: `${item.size}px`,
          fontWeight: item.weight,
        }"
      >
        {{ item.text }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => [
      '1111111',
      '2222222',
      '3333333',
      '4444444',
      '5555555',
      '6666666',
      '7777777',
      '8888888',
      '9999999',
      '0000000',
    ],
  },
  speed: {
    type: Number,
    default: 5,
  },
  fontSizeRange: {
    type: Array,
    default: () => [16, 24],
  },
  colors: {
    type: Array,
    default: () => ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'],
  },
})

const container = ref(null)
const danmuList = ref([])
const containerWidth = ref(0)
const containerHeight = ref(0)

// 随机颜色
const getRandomColor = () => {
  return props.colors[Math.floor(Math.random() * props.colors.length)]
}

// 随机字体大小
const getRandomSize = () => {
  const [min, max] = props.fontSizeRange
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 随机字体粗细
const getRandomWeight = () => {
  const weights = ['normal', 'bold']
  return weights[Math.floor(Math.random() * weights.length)]
}

// 随机位置（垂直方向）
const getRandomTop = () => {
  if (!containerHeight.value) return 0
  // -10到容器高度-20的随机位置，留出边距
  return Math.floor(Math.random() * (containerHeight.value - 10))
}

// 添加新弹幕
const addDanmu = (text) => {
  if (!text || !containerWidth.value) return

  const newDanmu = {
    text,

    color: getRandomColor(),

    size: getRandomSize(),

    weight: getRandomWeight(),

    top: getRandomTop(),

    translateX: containerWidth.value,

    id: Date.now() + Math.random().toString(36).substr(2, 9),
  }

  danmuList.value.push(newDanmu)

  //移动弹幕

  moveDanmu(newDanmu.id)
}

//移动弹幕函数

const moveDanmu = (id) => {
  let intervalId = setInterval(() => {
    if (!containerWidth.value) return

    const index = danmuList.value.findIndex((item) => item.id === id)

    if (index === -1) {
      clearInterval(intervalId)

      return
    }

    danmuList.value[index].translateX -= props.speed

    //当弹幕完全离开屏幕时移除它

    if (danmuList.value[index].translateX < -200) {
      danmuList.value.splice(index, 1)

      clearInterval(intervalId)
    }
  }, 16) //约60fps
}

onMounted(() => {
  updateContainerSize()
  window.addEventListener('resize', updateContainerSize)

  props.messages.forEach((msg, i) => {
    setTimeout(() => addDanmu(msg), i * 1000) //每条消息间隔1秒
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateContainerSize)
})

function updateContainerSize() {
  if (container.value) {
    containerWidth.value = container.value.clientWidth
    containerHeight.value = container.value.clientHeight
  }
}

defineExpose({
  addDanmu,
})
</script>

<style scoped>
.danmu-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}
.danmu-item {
  position: absolute;
  white-space: nowrap;
  left: 0;
  will-change: transform; /*优化性能*/
  user-select: none; /*防止用户选中文字*/
  text-shadow: #0000001px01px2px; /*文字描边效果*/
}
.dan-mu-enter-active,
.dan-mu-leave-active {
  transition: none; /*禁用默认的过渡效果，因为我们自己控制移动*/
}
</style>
