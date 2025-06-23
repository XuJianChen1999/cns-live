<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- <router-view /> -->
  <!-- <div>
    <live-room role="host" />
    <live-room role="audience" />
  </div> -->
</template>

<script setup>
import routes from '@/router/routes'

const route = useRoute()

const transitionName = ref('go')

function resetVhAndPx() {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  //document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 + 'px'
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    const noAnimation = ['/', '/home']
    if (noAnimation.indexOf(oldPath) !== -1 && noAnimation.indexOf(newPath) !== -1) {
      return (transitionName.value = '')
    }

    const toDepth = routes.findIndex((v) => v.path === newPath)
    const fromDepth = routes.findIndex((v) => v.path === oldPath)
    transitionName.value = toDepth > fromDepth ? 'go' : 'back'
  },
)

onMounted(() => {
  resetVhAndPx()

  window.addEventListener('resize', () => {
    resetVhAndPx()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', resetVhAndPx)
})
</script>

<style>
/* 路由过渡动画 */
.go-enter-from {
  transform: translate3d(100%, 0, 0);
}

/* 最终状态 */
.back-enter-to,
.back-enter-from,
.go-enter-to,
.go-leave-from {
  transform: translate3d(0, 0, 0);
}

.go-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.go-enter-active,
.go-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.3s;
}

.back-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.back-leave-to {
  transform: translate3d(100%, 0, 0);
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
