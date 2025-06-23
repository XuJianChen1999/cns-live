<template>
  <svg aria-hidden="true" class="svg-icon" :style="customStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
defineOptions({ name: 'SvgIcon' })
const props = defineProps({
  prefix: {
    type: String,
    default: 'svg-icon',
  },
  name: {
    type: [Object, Function, String],
    required: true,
  },
  size: {
    type: [Number, String],
    default: 18,
  },
  style: Object,
})

const symbolId = computed(() => {
  const p = props
  return `#${p.prefix}-${p.name}`
})
const customStyle = computed(() => {
  const p = props
  return {
    width: `${+p.size}px`,
    height: `${+p.size}px`,
    ...p.style,
  }
})
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
</style>
