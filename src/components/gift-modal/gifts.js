const giftList = [
  {
    img: new URL('@/assets/images/gift-momoda.png', import.meta.url).href,
    name: '么么哒',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-ganbei.png', import.meta.url).href,
    name: '干杯',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-bangbangtang.png', import.meta.url).href,
    name: '棒棒糖',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-flower.png', import.meta.url).href,
    name: '花花',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-kele.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-qiqiu.png', import.meta.url).href,
    name: '气球',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-feiji.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-laba.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
].map((item) => ({
  ...item,
  clickCount: 0,
  lastClickTime: 0,
  combo: 0,
  animate: false,
}))

export default function chunkArray(arr = giftList, size = 8) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  )
}
