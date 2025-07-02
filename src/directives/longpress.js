/*
 * @Author: Xujianchen
 * @Date: 2025-07-02 17:22:29
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-02 17:30:12
 * @Description: 长按指令
 */
// 简单判断
function isFunc(func) {
  return typeof func === 'function'
}

export default {
  mounted(el, binding) {
    if (!isFunc(binding.value)) {
      throw new Error('binding.value must be a function, like: v-longpress="handleLongPress"')
    }

    // 默认两秒后执行
    const longPressDuration = binding.arg || 2000
    let pressTimer = null

    function start(e) {
      if (e.button) {
        if (e.type === 'click' && e.button !== 0) {
          return
        }
      }
      if (!pressTimer) {
        pressTimer = setTimeout(() => {
          handler(e)
        }, longPressDuration)
      }
    }

    function cancel() {
      if (pressTimer) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    function handler(e) {
      binding.value(e)
    }

    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)

    el.addEventListener('click', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
    el.addEventListener('mouseout', cancel)
  },
}
