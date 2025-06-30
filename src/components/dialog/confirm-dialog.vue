<template>
  <van-overlay lock-scroll :show="modelValue" :custom-style="customStyle" :z-index="zIndex">
    <div class="confirm-dialog" :class="{ 'zoom-in': modelValue, 'zoom-out': !modelValue }">
      <img :src="type === 'success' ? SuccessIcon : WarningIcon" />
      <div class="confirm-dialog-content">{{ content }}</div>
      <div class="confirm-dialog-footer">
        <button
          v-if="showCancelBtn"
          class="confirm-dialog-button cancel-button"
          @click.stop="cancel"
        >
          {{ cancelBtnText }}
        </button>
        <button class="confirm-dialog-button confirm-button" @click.stop="confirm">
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import SuccessIcon from '@/assets/svg/success.svg'
import WarningIcon from '@/assets/svg/warning.svg'

const modelValue = defineModel({ type: Boolean, default: false })
defineProps({
  type: String, // success / warning
  content: String,
  zIndex: {
    type: [Number, String],
    default: 6666,
  },
  cancelBtnText: {
    type: String,
    default: '取消',
  },
  confirmBtnText: {
    type: String,
    default: '确定',
  },
  showCancelBtn: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: Object,
    default: () => ({ background: '#00000066' }),
  },
})
const emits = defineEmits(['confirm', 'cancel', 'close'])

function confirm() {
  modelValue.value = false
  emits('confirm')
  emits('close')
}

function cancel() {
  modelValue.value = false
  emits('cancel')
}
</script>

<style scoped lang="scss">
.confirm-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 7000;
  transform: translate(-50%, -50%) scale(0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 273px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(80px);
  border-radius: 14px;
  opacity: 0;
  transition: all 0.3s ease-out;
  &.zoom-in {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  &.zoom-out {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  img {
    margin-top: 22px;
  }

  &-content {
    width: 241px;
    font-size: 13px;
    text-align: center;
    color: #000;
    margin: 16px 0;
  }

  &-footer {
    display: flex;
    width: 100%;
    border-top: 0.5px solid #a6b0c3;
  }

  &-button {
    flex: 1;
    height: 44px;
    line-height: 44px;
    border: none;
    background: none;
    font-size: 16px;
  }
}

.cancel-button {
  color: #6d7385;
  border-right: 0.5px solid #a6b0c3;
}

.confirm-button {
  color: #3751ff;
  font-weight: 500;
}
</style>
