import ToastComponent from '@/components/toast'

const defaultConfig = {
  position: 'top-center',
  duration: 3000,
  type: 'info',
  clickClose: true,
}
function createToastContainer() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  return container
}

function showToast(message, config = {}) {
  const container = createToastContainer()
  const visible = ref(true)
  const mergedConfig = { ...defaultConfig, ...config }
  console.log(message)

  // 创建应用实例
  const app = createApp({
    setup() {
      return () =>
        h(ToastComponent, {
          modelValue: visible.value,
          message,
          ...mergedConfig,
          'onUpdate:modelValue': (val) => {
            visible.value = val
          },
          onClose: () => {
            destroyToast()
          },
        })
    },
  })

  // 挂载
  app.mount(container)

  // 销毁方法
  function destroyToast() {
    app.unmount()
    document.body.removeChild(container)
  }

  // 自动销毁
  if (mergedConfig.duration > 0) {
    setTimeout(destroyToast, mergedConfig.duration)
  }

  return destroyToast
}

// 快捷方法
const toast = (message, config = {}) => showToast(message, config)

for (const key in ['success', 'error', 'warning', 'info']) {
  toast[key] = (message, options = {}) => {
    toast(message, { ...options, type: key })
  }
}

export default toast
