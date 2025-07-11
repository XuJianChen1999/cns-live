<template>
  <div class="slide horizontal">
    <div class="indicator-bullets" v-if="indicator && state.wrapper.childrenLength">
      <div
        class="bullet"
        :class="{ active: state.localIndex === item - 1 }"
        :key="i"
        v-for="(item, i) in state.wrapper.childrenLength"
      />
    </div>

    <div
      class="slide-list"
      ref="slideListRef"
      @pointerdown.prevent="touchStart"
      @pointermove.prevent="touchMove"
      @pointerup.prevent="touchEnd"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { SlideType } from '@/const'
import { _css } from '@/utils/dom'
import {
  getSlideOffset,
  slideInit,
  slideReset,
  slideTouchEnd,
  slideTouchMove,
  slideTouchStart,
} from '@/utils/slide'

const props = defineProps({
  index: {
    type: Number,
    default: () => 0,
  },
  name: {
    type: String,
    default: () => '',
  },
  autoplay: {
    type: Boolean,
    default: () => false,
  },
  indicator: {
    type: Boolean,
    default: () => false,
  },
  //改变index，是否使用动画
  changeActiveIndexUseAnim: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['update:index', 'change'])

const slideListRef = ref(null)
let ob = null

const state = reactive({
  judgeValue: 20, // 一个用于判断滑动朝向的固定值
  type: SlideType.HORIZONTAL, // 组件类型
  name: props.name,
  localIndex: props.index, // 当前下标
  needCheck: true, // 是否需要检测，每次按下都需要检测，up事件会重置为true
  next: false, // 是否能否滑动
  isDown: false, // 是否按下，用于move事件判断
  start: { x: 0, y: 0, time: 0 }, // 按下时的起点坐标
  move: { x: 0, y: 0 }, // 移动时的坐标
  // 子元素宽度和数量
  wrapper: {
    width: 0,
    height: 0,
    // childrenLength用于canNext方法判断当前页是否是最后一页，是则不能滑动，不捕获事件
    childrenLength: 0,
  },
})

watch(
  () => props.index,
  (newVal) => {
    if (state.localIndex !== newVal) {
      const slideListEl = slideListRef.value
      state.localIndex = newVal
      if (props.changeActiveIndexUseAnim) {
        _css(slideListEl, 'transition-duration', `300ms`)
      }
      _css(slideListEl, 'transform', `translate3d(${getSlideOffset(state, slideListEl)}px, 0, 0)`)
    }
  },
)

onMounted(() => {
  slideInit(slideListRef.value, state)

  if (props.autoplay) {
    setInterval(() => {
      if (state.localIndex === state.wrapper.childrenLength - 1) {
        emits('update:index', 0)
      } else {
        emits('update:index', state.localIndex + 1)
      }
    }, 3000)
  }

  // 观察子元素数量变动，获取最新数量
  // childrenLength用于canNext方法判断当前页是否是最后一页，是则不能滑动，不捕获事件
  ob = new MutationObserver(() => {
    state.wrapper.childrenLength = slideListRef.value.children.length
  })
  ob.observe(slideListRef.value, { childList: true })
})

onUnmounted(() => {
  ob.disconnect()
})

function touchStart(e) {
  slideTouchStart(e, slideListRef.value, state)
}

function touchMove(e) {
  slideTouchMove(e, slideListRef.value, state)
}

function touchEnd(e) {
  slideTouchEnd(e, state)
  slideReset(e, slideListRef.value, state, emits)
}
</script>

<style scoped lang="scss">
.indicator-bullets {
  position: absolute;
  bottom: 10rem;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 7px;

  .bullet {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgb(58, 58, 70);

    &.active {
      background: white;
    }
  }
}
</style>
