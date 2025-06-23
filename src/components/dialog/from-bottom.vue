<!--
 * @Author: Xujianchen
 * @Date: 2025-06-20 10:52:20
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-23 15:07:23
 * @Description: 底部弹出弹窗
-->
<template>
  <Transition name="from-bottom">
    <div
      ref="dialogRef"
      v-if="modelValue"
      :class="['from-bottom-dialog', mode, showLine ? '' : 'no-line']"
      :style="{ borderRadius }"
      @touchstart="onStart"
      @touchmove="onMove"
      @touchend="onEnd"
    >
      <slot name="header"></slot>
      <div
        v-if="showLine"
        :class="['line', mode]"
        :style="{ background: !showLine ? lineBg : 'transparent' }"
      >
        <div class="content" :style="{ color: lineBarColor }"></div>
      </div>
      <div class="wrapper" ref="wrapperRef">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { stopPropagation } from '@/utils'
import Bus, { EVENT_KEY } from '@/utils/bus'
import Dom, { _css } from '@/utils/dom'

const modelValue = defineModel({ type: Boolean, default: false })
const props = defineProps({
  // 弹窗内容模式，默认传入 'dark'、'light'
  mode: {
    type: String,
    default: 'dark',
  },
  // 遮罩层模式，默认传入 'dark'、'light'
  maskMode: {
    type: String,
    default: 'dark',
  },
  // 弹窗高度
  height: {
    type: String,
    default: 'calc(var(--vh, 1vh) * 70)',
  },
  // 是否显示顶部线条
  showLine: {
    type: Boolean,
    default: true,
  },
  // 顶部线条背景颜色
  lineBg: {
    type: String,
    default: '#000000bb',
  },
  // 弹窗顶部线条颜色
  lineBarColor: {
    type: String,
    default: 'rgb(58, 58, 70)',
  },
  // 弹窗内容圆角
  borderRadius: {
    type: String,
    default: '15px 15px 0 0',
  },
  // 弹窗标识，用于区分不同弹窗
  tag: {
    type: String,
    default: '',
  },
  // 页面 ID（挂载到哪个元素），用于定位到对应的页面元素
  pageId: String,
})
const emits = defineEmits(['close'])

const dialogRef = ref(null)
const wrapperRef = ref(null)
const pagePosition = ref(null)
const scroll = ref(0)
const startY = ref(0)
const moveY = ref(0)
const startTime = ref(0)

watch(
  () => modelValue.value,
  (newVal) => {
    const page = document.getElementById(props.pageId)
    if (!page) return

    if (newVal) {
      pagePosition.value = _css(page, 'position')
      page.style.position = 'absolute'
      scroll.value = document.documentElement.scrollTop
      document.body.style.position = 'fixed'
      document.body.style.top = -scroll.value + 'px'

      const maskTemplate = `<div class="Mask fade-in ${props.maskMode}"></div>`
      const mask = new Dom().create(maskTemplate)
      setTimeout(() => {
        mask.on('click', (event) => {
          stopPropagation(event)
          close()
        })
      }, 200)
      page.appendChild(mask.els[0])
    } else {
      page.style.position = pagePosition.value || 'fixed'
      document.body.style.position = 'static'
      document.documentElement.scrollTop = scroll.value

      const mask = new Dom('.Mask').replaceClass('fade-in', 'fade-out')
      setTimeout(() => mask.remove(), 250)
    }
  },
)

function onStart(e) {
  if (wrapperRef.value?.scrollTop !== 0) return

  startY.value = e.touches[0].clientY
  startTime.value = Date.now()
  _css(dialogRef.value, 'transition-duration', '0ms')
}

function onMove(e) {
  if (wrapperRef.value?.scrollTop !== 0) return

  const moveYValue = e.touches[0].pageY - startY.value
  moveY.value = moveYValue
  if (moveYValue > 0) {
    Bus.emit(EVENT_KEY.DIALOG_MOVE, {
      tag: props.tag,
      e: moveYValue,
    })
    _css(dialogRef.value, 'transform', `translate3d(0, ${moveYValue}px, 0)`)
  }
}

function onEnd() {
  const dialogEl = dialogRef.value
  // FIXME: 如果是外部改变 modelValue 值的话，这里会没有 ref
  if (!dialogEl) return

  const tag = props.tag
  const moveYValue = moveY.value
  if (Date.now() - startTime.value < 150 && Math.abs(moveYValue) < 30) return

  const clientHeight = dialogEl?.clientHeight
  _css(dialogEl, 'transition-duration', `250ms`)
  if (Math.abs(moveYValue) > clientHeight / 2) {
    _css(dialogEl, 'transform', `translate3d(0,100%,0)`)
    Bus.emit(EVENT_KEY.DIALOG_END, { tag, isClose: true })
    setTimeout(close, 250)
  } else {
    _css(dialogEl, 'transform', `translate3d(0,0,0)`)
    Bus.emit(EVENT_KEY.DIALOG_END, { tag, isClose: false })
  }
}

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style lang="scss">
.Mask {
  z-index: 3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;

  &.dark {
    background: #000000bb;
  }

  &.light {
    background: transparent;
  }

  &.lightgray {
    background: rgba(0, 0, 0, 0.25);
  }

  &.white {
    background: transparent;
  }
}
</style>

<style scoped lang="scss">
@import '@/assets/styles/index.css';

.from-bottom-enter-active,
.from-bottom-leave-active {
  transition-duration: 250ms !important;
}

.from-bottom-enter-from,
.from-bottom-leave-to {
  transform: translate3d(0, 101%, 0) !important;
}

.from-bottom-dialog {
  z-index: 9;
  position: fixed;
  width: 100%;
  padding-top: 24px;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 15px 15px 0 0;
  transform: translate3d(0, 0, 0);
  overflow: hidden;
  display: flex;
  height: v-bind(height);
  max-height: v-bind(height);
  flex-direction: column;

  &.dark {
    background: #000000bb;
  }

  &.light {
    background: whitesmoke;
  }

  &.white {
    background: white;
  }

  &.no-line {
    padding-top: 0;
  }

  .line {
    border-radius: 15px 15px 0 0;
    z-index: 3;
    width: 100%;
    position: fixed;
    height: 30px;
    display: flex;
    transform: translateY(-24px);
    justify-content: center;
    align-items: center;
    touch-action: pan-y;

    &.dark {
      background: #000000bb;

      .content {
        background: rgb(58, 58, 70);
      }
    }

    &.light {
      background: whitesmoke;

      .content {
        background: darkgray;
      }
    }

    &.white {
      background: white;

      .content {
        background: darkgray;
      }
    }

    .content {
      border-radius: 2px;
      height: 4px;
      width: 30px;
    }
  }

  .wrapper {
    flex: 1;
    overflow: auto;
  }
}
</style>
