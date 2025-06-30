<!--
 * @Author: Xujianchen
 * @Date: 2025-06-27 15:30:20
 * @LastEditors: Xujianchen
 * @LastEditTime: 2025-06-30 11:28:02
 * @Description: 充值协议弹窗
-->
<template>
  <popup :model-value="modelValue" round position="bottom" @close="close">
    <div class="protocol">
      <modal-header title="Coinexus充值服务协议" :show-back="false" @click-right="close" />
      <div class="protocol-content">
        <span>更新时间：2025年6月27日</span>
        <span style="margin: 24px 0">生效时间：2025年6月28日</span>
        <span style="margin-top: 16px">特别提示：</span>

        <span style="margin: 16px 0"
          >《Coinexus充值服务协议》（以下简称为“本协议”）由Coinexus科技有限公司（以下简称为“Coinexus”）代表Coinexus公司与使用钻石的Coinexus用户（以下或称“您”）共同缔结。</span
        >
        <span style="margin: 16px 0"
          >您在使用钻石之前，应仔细阅读并充分理解本协议的内容。如您有使用钻石的行为（包括但不限于点击充值、支付行为等），即视为您完全同意并接受本协议的全部条款。本协议一经同意并接受，即形成您与Coinexus间具有法律效力的电子协议。</span
        >
        <span
          >Coinexus禁止未成年人使用本协议项下的钻石服务，如果您正在阅读本协议且未满18周岁，请立即停止使用钻石服务。如果您是未成年人的监护人，您应对您监护的未成年人承担监护职责，监督和指导未成年人正确使用相关产品及服务，妥善保管钱包账户及支付密码等信息，共同营造未成年人健康成长的良好环境。</span
        >
      </div>
    </div>
  </popup>
</template>

<script setup>
import popup from '@/components/dialog/popup'
import ModalHeader from './modal-header'

const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['close'])

function close() {
  modelValue.value = false
  emits('close')
  console.log(11)
}
</script>

<style scoped lang="scss">
.protocol {
  padding: 16px;
  background-color: #fff;
  height: calc(487px - 16px * 2);
  &-header {
    position: relative;
    color: #212121ff;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 19;
    }
  }
  &-content {
    display: flex;
    flex-direction: column;
    color: #22252dff;
    font-size: 12px;
    margin-top: 42.5px;
  }
}
</style>
