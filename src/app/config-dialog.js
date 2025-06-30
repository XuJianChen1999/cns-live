import ConfirmDialog from '@/components/dialog/confirm-dialog'

export default function showConfirmDialog(options) {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const state = reactive({
      modelValue: true,
      ...options,
    })

    const app = createApp({
      render() {
        return h(ConfirmDialog, {
          ...state,
          'onUpdate:modelValue': (val) => {
            state.modelValue = val
          },
          onConfirm: () => {
            state.modelValue = false
            delayCleanup().then(resolve('confirm'))
          },
          onCancel: () => {
            state.modelValue = false
            delayCleanup().then(resolve('cancel'))
          },
          onClose: () => {
            state.modelValue = false
            delayCleanup().then(() => resolve('cancel'))
          },
        })
      },
    })

    function delayCleanup(delay = 300) {
      return new Promise((done) => {
        setTimeout(() => {
          app.unmount()
          container.remove()
          done()
        }, delay)
      })
    }

    app.mount(container)
  })
}
