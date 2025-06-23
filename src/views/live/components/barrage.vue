<template>
  <div class="barrage" :style="{ top: top + 'px' }" @animationend="onEnd">
    <div class="type">{{ name }}</div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  text: String,
  top: Number,
  onRemove: Function,
})

function onEnd() {
  props.onRemove?.()
}
</script>

<style scoped>
.barrage .type {
  padding: 1px 6px;
  border: 1px solid white;
  border-radius: 20px;
  margin-right: 5px;
  color: #fff;
}

.barrage .text {
  color: #fff;
}
</style>
