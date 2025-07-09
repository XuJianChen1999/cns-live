<!--
 * @Author: Xujianchen
 * @Date: 2025-06-20 10:40:20
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-07-09 10:52:40
 * @Description: 礼物弹窗组件
-->
<template>
  <popup
    :model-value="modelValue"
    page-id="app"
    border-radius="0"
    mask-mode="light"
    height="auto"
    tag="span"
    :show-line="false"
    @close="close"
  >
    <div class="gift">
      <div class="gift-header flex-center">
        <div class="gift-header-title">礼物</div>
        <div class="gift-header-right flex-center">
          <svg-icon name="gift-diamond" />
          <span>100</span>
          <div class="recharge-btn flex-center red" @click="isShowRecharge = true">
            充值<span></span>
          </div>
        </div>
      </div>
      <!-- 等级 -->
      <div class="gift-grade flex-center">
        <div class="gift-grade-level flex-center">
          <span>LV2</span>
          <van-progress
            :percentage="75"
            pivot-text="●"
            stroke-width="2px"
            pivot-color="#FF6736FF"
            color="linear-gradient(270deg, #ff6a32ff 0%, #e51283ff 111.79%)"
            style="width: 195px; margin: 0 6px"
          />
          <span>LV3</span>
        </div>
        <span class="gift-grade-text">需8888金币升级</span>
      </div>
      <!-- 礼物列表 -->
      <div class="gift-list">
        <van-swipe :loop="false" indicator-color="white">
          <van-swipe-item v-for="(chunk, chunkIndex) in giftList" :key="chunkIndex">
            <div v-longpress:3000="handleLongPress" class="gift-swipe flex-center">
              <div
                v-for="(item, index) in chunk"
                :key="index"
                class="gift-swipe-item flex-center"
                @click.stop="selectGift(item, chunkIndex, index)"
              >
                <div
                  class="gift-swipe-item-content"
                  :style="{
                    border:
                      currentIndex === `${chunkIndex}-${index}` ? '1px solid #ffffff1a' : 'none',
                  }"
                >
                  <img :src="item.img" :class="{ 'zoomed-img': item.animate }" />
                  <span v-if="currentIndex !== `${chunkIndex}-${index}`">{{ item.name }}</span>
                  <div class="price">{{ item.price }}钻</div>
                </div>

                <div v-if="currentIndex === `${chunkIndex}-${index}`" class="send-btn">赠送</div>
                <!-- 涟漪效果 -->
                <div
                  v-for="ripple in activeEffects[`${chunkIndex}-${index}`]?.ripples || []"
                  :key="'ripple-' + ripple.id"
                  class="ripple"
                  :style="{
                    left: ripple.x + '%',
                    top: ripple.y + '%',
                    width: ripple.size + 'px',
                    height: ripple.size + 'px',
                    marginLeft: -ripple.size / 2 + 'px',
                    marginTop: -ripple.size / 2 + 'px',
                  }"
                />

                <!-- 粒子效果 -->
                <div
                  v-for="particle in activeEffects[`${chunkIndex}-${index}`]?.particles || []"
                  :key="'particle-' + particle.id"
                  class="particle"
                  :style="{
                    left: particle.x + '%',
                    top: particle.y + '%',
                    width: particle.size + 'px',
                    height: particle.size + 'px',
                    backgroundColor: particle.color,
                    '--tx': particle.tx + 'px',
                    '--ty': particle.ty + 'px',
                  }"
                />

                <!-- 连击效果 -->
                <!-- <div
                  v-if="item.combo > 3"
                  class="combo"
                  :style="{
                    animation: 'combo-fade 1s forwards',
                  }"
                >
                  {{ item.combo }}连击
                </div> -->
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 底部操作部分 -->
      <!-- <div class="gift-bottom flex-center">
        <div class="gift-bottom-left flex-center">
          <svg-icon name="gift-diamond" />
          <span>100</span>
          <div class="gift-bottom-btn flex-center red" @click="isShowRecharge = true">
            充值<span></span>
          </div>
        </div>
        <div class="gift-bottom-right" @click="sendGift">发送</div>
      </div> -->
    </div>
  </popup>

  <recharge-modal v-model="isShowRecharge" @click-protocol="emits('click-protocol')" />
</template>

<script setup>
import { isEmptyObject } from '@/utils'
import toast from '@/app/toast'
import Popup from '@/components/dialog/from-bottom'
import RechargeModal from '@/views/live/components/recharge-modal'
import chunkArray from './gifts'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close', 'select', 'click-protocol'])

const currentIndex = ref(null)
const selected = ref(null)
const isShowRecharge = ref(false)
const giftList = ref(chunkArray())
const activeEffects = ref({})
const MAX_TOTAL_PARTICLES = 50 // 全局最大粒子数量
const MAX_PARTICLES_PER_CLICK = 10 // 每次点击最大粒子数
const RIPPLE_LIFETIME = 600 // 波纹动画持续时间(ms)
const PARTICLE_LIFETIME = 1000 // 粒子动画持续时间(ms)
const CLICK_INTERVAL = 300 // 连续点击间隔(ms)

async function selectGift(item, chunkIndex, index) {
  const now = Date.now()
  const gift = giftList.value[chunkIndex][index]

  await nextTick()
  // 计算连击
  if (now - gift.lastClickTime < CLICK_INTERVAL) {
    gift.combo++
    triggerEffects(`${chunkIndex}-${index}`)
  } else {
    gift.combo = 1
    currentIndex.value = `${chunkIndex}-${index}`
  }
  gift.lastClickTime = now
  if (!gift.animate) {
    gift.animate = true
  }

  // 重置2秒计时器
  clearTimeout(gift.pulseTimer)
  gift.pulseTimer = setTimeout(() => (gift.animate = false), 300)
  selected.value = gift

  handleSend()
}

function handleLongPress() {
  // toast('长按了一下')
}

// 触发效果
function triggerEffects(id) {
  // 初始化或获取现有效果状态
  if (!activeEffects.value[id]) {
    activeEffects.value[id] = {
      particles: [],
      ripples: [],
      particleCount: 0,
    }
  }

  const now = Date.now()
  const effectId = now.toString()
  const colors = ['#ff0055', '#ff6600', '#ffcc00', '#ffffff', '#00ffaa', '#0099ff']

  // 添加波纹效果 (不受数量限制)
  activeEffects.value[id].ripples.push({
    id: effectId,
    x: 50,
    y: 50,
    size: 100,
    createdAt: now,
  })

  // 添加粒子效果 (受数量限制)
  const availableSlots = MAX_TOTAL_PARTICLES - activeEffects.value[id].particleCount
  const particlesToAdd = Math.min(MAX_PARTICLES_PER_CLICK, availableSlots)

  for (let i = 0; i < particlesToAdd; i++) {
    activeEffects.value[id].particles.push({
      id: `${effectId}-${i}`,
      x: 50,
      y: 50,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      tx: (Math.random() - 0.5) * 150,
      ty: (Math.random() - 0.5) * 150,
      createdAt: now,
    })
    activeEffects.value[id].particleCount++
  }

  // 清理过期效果
  cleanupExpiredEffects(id)
}

// 清理过期效果
function cleanupExpiredEffects(id) {
  const now = Date.now()
  if (isEmptyObject(activeEffects.value)) return

  // 清理过期波纹
  activeEffects.value[id].ripples = activeEffects.value[id].ripples.filter(
    (ripple) => now - ripple.createdAt < RIPPLE_LIFETIME,
  )

  // 清理过期粒子并更新计数
  const remainingParticles = activeEffects.value[id].particles.filter(
    (particle) => now - particle.createdAt < PARTICLE_LIFETIME,
  )
  activeEffects.value[id].particleCount = remainingParticles.length
  activeEffects.value[id].particles = remainingParticles

  // 如果还有效果存在，继续清理
  if (activeEffects.value[id].ripples.length > 0 || activeEffects.value[id].particles.length > 0) {
    requestAnimationFrame(() => cleanupExpiredEffects(id))
  }
}

function handleSend() {
  if (!currentIndex.value) {
    return toast('请选择一个礼物')
  }
  emits('select', selected.value)
  // close()
}

function close() {
  modelValue.value = false
  currentIndex.value = null
  selected.value = null
  emits('close')
}
</script>

<style scoped lang="scss">
@use './animation.css';
@use './index.scss';

:deep(.van-process) {
  background-color: #ffffff1b !important;
}

:deep(.van-progress__pivot) {
  background-color: transparent !important;
  color: rgb(255, 103, 54) !important;
  left: calc(75% + 5px) !important;
  font-size: 8px !important;
  top: calc(50% + 0.5px) !important;
}
</style>
