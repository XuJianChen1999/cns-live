<!--
 * @Author: Xujianchen
 * @Date: 2025-07-02 09:53:43
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-02 10:24:27
 * @Description: 进度条
-->
<template>
  <div class="progress">
    <!-- 外层轨道 -->
    <div class="progress-track" :style="trackStyle">
      <!-- 进度条 -->
      <div
        class="progress-bar"
        :style="barStyle"
        :class="{
          'progress-bar--striped': striped,
          'progress-bar--animated': animated,
        }"
      ></div>
    </div>

    <!-- 文字提示 -->
    <div v-if="showPivot" class="progress-pivot" :style="pivotStyle">{{ percentage }}%</div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 当前进度百分比
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
    default: 0,
  },
  // 进度条颜色
  color: {
    type: String,
    default: '#1989fa',
  },
  // 轨道颜色
  trackColor: {
    type: String,
    default: '#e5e5e5',
  },
  // 进度条高度
  strokeWidth: {
    type: [Number, String],
    default: 4,
  },
  // 是否显示文字提示
  showPivot: {
    type: Boolean,
    default: true,
  },
  // 文字背景色
  pivotColor: {
    type: String,
    default: 'inherit', // 默认使用进度条颜色
  },
  customPivotStyle: {
    type: Object,
    default: () => ({}),
  },
  // 文字颜色
  pivotTextColor: {
    type: String,
    default: '#fff',
  },
  // 是否显示条纹
  striped: {
    type: Boolean,
    default: false,
  },
  // 条纹是否有动画
  animated: {
    type: Boolean,
    default: false,
  },
  // 是否显示圆角
  round: {
    type: [Boolean, String],
    default: true,
  },
})

// 轨道样式
const trackStyle = computed(() => {
  return {
    height: `${props.strokeWidth}px`,
    backgroundColor: props.trackColor,
    borderRadius: props.round ? `${props.strokeWidth}px` : '0',
  }
})
// 进度条样式
const barStyle = computed(() => {
  const isBoolean = typeof props.round === 'boolean'
  const borderRadius = isBoolean ? `${props.strokeWidth}px` : props.round
  return {
    width: `${props.percentage}%`,
    background: props.color,
    borderRadius: borderRadius,
  }
})
// 文字提示样式
const pivotStyle = computed(() => {
  return {
    left: `${props.percentage}%`,
    transform: `translate(-${props.percentage}%, -50%)`,
    background: props.pivotColor === 'inherit' ? props.color : props.pivotColor,
    color: props.pivotTextColor,
    borderRadius: '10px',
    ...props.customPivotStyle,
  }
})
</script>

<style scoped lang="scss">
.progress {
  position: relative;
  width: 100%;
}

.progress-track {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.progress-bar--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1.25rem 1.25rem;
}

.progress-bar--animated {
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from {
    background-position: 1.25rem 0;
  }
  to {
    background-position: 0 0;
  }
}

.progress-pivot {
  position: absolute;
  top: 50%;
  padding: 0 5px;
  font-size: 12px;
  line-height: 1.6;
  white-space: nowrap;
}
</style>
