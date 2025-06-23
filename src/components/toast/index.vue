<!-- src/components/Toast.vue -->
<template>
  <transition name="fade">
    <div v-if="modelValue" class="toast" :class="[type, position]" @click="handleClick">
      <div class="toast-content">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'info',
    validator: (val) => ['info', 'success', 'error', 'warning'].includes(val),
  },
  position: {
    type: String,
    default: 'top-center', // 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right'
    validator: (val) => ['top-center', 'top-right', 'bottom-center', 'bottom-right'].includes(val),
  },
  duration: {
    type: Number,
    default: 3000,
  },
  clickClose: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['update:modelValue', 'close', 'click'])

let timer = null

// 自动关闭逻辑
watch(
  () => props.modelValue,
  (show) => {
    console.log(show)
    if (show) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        close()
      }, props.duration)
    }
  },
)

const close = () => {
  emits('update:modelValue', false)
  emits('close')
}

const handleClick = () => {
  emits('click')
  if (props.clickClose) {
    close()
  }
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 9999;
  padding: 8px 14px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(226, 75, 75, 0.15);
  background: #fff;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  max-width: 80%;
  word-break: break-word;
}

.toast.success {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.toast.error {
  background: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
}

.toast.warning {
  background: #fffbe6;
  border: 1px solid #ffe58f;
  color: #faad14;
}

.toast.info {
  background: #fff;
  color: rgba(0, 0, 0, 0.85);
}

.toast.top-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.toast.top-right {
  top: 20px;
  right: 20px;
}

.toast.bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.toast.bottom-right {
  bottom: 20px;
  right: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
