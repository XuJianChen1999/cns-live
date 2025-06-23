<template>
  <div class="gift-fly-container">
    <TransitionGroup name="gift" tag="div" class="gift-track">
      <div
        class="gift-item"
        v-for="gift in gifts"
        :key="gift.id"
        :style="{ top: `${gift.top}px`, animationDuration: `${gift.duration}s`, left: '100vw' }"
      >
        <img :src="gift.avatar" class="avatar" />
        <div class="gift-content">
          <span class="username">{{ gift.username }}</span>
          送出
          <img :src="gift.icon" class="gift-icon" />
          <span class="gift-name">{{ gift.name }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
  <button @click="sendGift">点击一下看看</button>
</template>

<script setup>
import { ref } from 'vue'

const gifts = ref([])

function sendGift() {
  addGift({
    username: '币圈吴彦祖',
    avatar: 'https://i.pravatar.cc/50?img=3',
    icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png',
    name: '火箭 🚀',
  })
}

function addGift(giftData) {
  const id = Date.now() + Math.random()
  const top = Math.floor(Math.random() * 100) + 20 // 随机 Y 轴位置
  const duration = 2 // 随机动画时间（4-6 秒）

  gifts.value.push({ ...giftData, id, top, duration })

  // 自动删除
  setTimeout(() => {
    gifts.value = gifts.value.filter((g) => g.id !== id)
  }, duration * 1000)
}

defineExpose({ addGift })
</script>

<style scoped>
.gift-fly-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
}

.gift-track {
  position: relative;
  width: 100%;
  height: 200px;
}

.gift-item {
  position: absolute;
  /* right: -300px; */
  display: flex;
  align-items: center;
  animation: fly-left 0.5s linear forwards;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  padding: 6px 12px;
  color: white;
  font-size: 14px;
  white-space: nowrap;
}

@keyframes fly-left {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(-120vw);
    opacity: 0;
  }
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 8px;
}

.gift-icon {
  width: 24px;
  height: 24px;
  margin: 0 4px;
}

.username {
  color: #ffd700;
  margin-right: 2px;
}

button {
  width: 120px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  font-size: 16px;
}
</style>
