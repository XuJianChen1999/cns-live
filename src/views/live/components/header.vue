<template>
  <div class="header flex">
    <img
      v-show="showBack"
      class="header-back"
      src="@/assets/svg/arrow-left.svg"
      @click="emits('back')"
    />
    <span>{{ title }}</span>
    <img
      v-show="showClose"
      class="header-close"
      src="@/assets/svg/close-icon-black.svg"
      @click="emits('close')"
    />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  showBack: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['back', 'close'])
</script>

<style scoped lang="scss">
.header {
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: #212121ff;
  font-weight: 600;
  font-size: 16px;
  img {
    position: absolute;
    top: 16px;
    z-index: 19;
  }
  &-back {
    left: 0;
  }
  &-close {
    right: 0;
  }
}
</style>
