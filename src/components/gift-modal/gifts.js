const giftList = [
  {
    img: new URL('@/assets/images/gift-lipao.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-momoda.png', import.meta.url).href,
    name: '么么哒',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-bixin.png', import.meta.url).href,
    name: '笔芯',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-koushao.png', import.meta.url).href,
    name: '爱的口哨',
    price: 2000,
  },
  { img: new URL('@/assets/images/gift-xin.png', import.meta.url).href, name: '礼炮', price: 2000 },
  {
    img: new URL('@/assets/images/gift-youlun.png', import.meta.url).href,
    name: '烂漫邮轮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-youleyuan.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-lipao.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-lipao.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-momoda.png', import.meta.url).href,
    name: '么么哒',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-bixin.png', import.meta.url).href,
    name: '笔芯',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-koushao.png', import.meta.url).href,
    name: '爱的口哨',
    price: 2000,
  },
  { img: new URL('@/assets/images/gift-xin.png', import.meta.url).href, name: '礼炮', price: 2000 },
  {
    img: new URL('@/assets/images/gift-youlun.png', import.meta.url).href,
    name: '烂漫邮轮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-youleyuan.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-lipao.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-lipao.png', import.meta.url).href,
    name: '礼炮',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-momoda.png', import.meta.url).href,
    name: '么么哒',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-bixin.png', import.meta.url).href,
    name: '笔芯',
    price: 2000,
  },
  {
    img: new URL('@/assets/images/gift-koushao.png', import.meta.url).href,
    name: '爱的口哨',
    price: 2000,
  },
  { img: new URL('@/assets/images/gift-xin.png', import.meta.url).href, name: '礼炮', price: 2000 },
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
