<template>
  <div class="header">
    <slot name="left">
      <img
        v-if="showBack && !leftText"
        class="header-left"
        src="@/assets/svg/arrow-left.svg"
        @click="emits('click-left')"
      />
      <span v-if="leftText" class="header-left text" @click="emits('click-left')">{{
        leftText
      }}</span>
    </slot>
    <span class="header-title">{{ title }}</span>
    <slot name="right">
      <img
        v-if="showClose && !rightText"
        class="header-right"
        src="@/assets/svg/close-icon-black.svg"
        @click="emits('click-right')"
      />
      <span
        v-else
        class="header-right text"
        :style="rightTextStyle"
        @click="emits('click-right')"
        >{{ rightText }}</span
      >
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  leftText: String,
  rightText: String,
  showBack: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  rightTextStyle: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['click-right', 'click-left'])
</script>

<style scoped lang="scss">
.header {
  position: relative;
  &-left {
    position: absolute;
    top: 0;
    left: 0;
  }
  &-right {
    position: absolute;
    top: 0;
    right: 0;
  }
  &-title {
    display: block;
    width: 100%;
    text-align: center;
    color: #212121;
    font-weight: 600;
    font-size: 16px;
  }
  .text {
    color: #22252d;
    font-size: 14px;
  }
}
</style>
