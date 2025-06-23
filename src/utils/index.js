// 延迟执行
export function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

// 随机数
export function random(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // 包含最小值和最大值
}

// 阻止默认事件
export function stopPropagation(e) {
  e.stopImmediatePropagation()
  e.stopPropagation()
  e.preventDefault()
}

// 是是否空对象
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
