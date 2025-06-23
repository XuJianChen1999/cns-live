<!--
 * @Author: Xujianchen
 * @Date: 2025-06-20 10:39:00
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-20 10:48:18
 * @Description:
-->
<template>
  <Teleport to="body">
    <div v-if="modelValue" class="popup-mask" @click.self="close">
      <Transition name="popup-slide">
        <div class="popup-content" v-show="modelValue">
          <Transition name="fade-up">
            <div v-if="modelValue" class="popup-inner">
              <slot />
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup>
const modelValue = defineModel({ type: Boolean, default: false })

const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
}
</script>

<style scoped>
/* 遮罩层 */
.popup-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* 弹窗容器 */
.popup-content {
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
}

/* 插槽内容区域，可以加 padding */
.popup-inner {
  padding: 20px;
}

/* popup 底部滑入 */
.popup-slide-enter-active,
.popup-slide-leave-active {
  transition: transform 0.3s ease;
}
.popup-slide-enter-from,
.popup-slide-leave-to {
  transform: translateY(100%);
}

/* slot 内容渐入 + 上浮 */
.fade-up-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
