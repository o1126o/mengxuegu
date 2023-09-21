<script setup lang="ts">
import { ref } from 'vue'
import navTop from './components/navTop.vue'
import shopDetail from './components/shopDetail.vue'
import modePayment from './components/modePayment.vue'
import shopPrice from './components/shopPrice.vue'
import { useRoute } from 'vue-router'
import type { CouresIn, PackageInfo } from '@/types/coures'
const route = useRoute()

const detailPay = ref<PackageInfo>()
const detailPays = ref<CouresIn>()
if (route.query.list) {
  detailPay.value = JSON.parse(route.query.list as string)
  console.log(detailPay.value, '111')
} else {
  detailPays.value = route.query
  console.log(detailPays.value, '222')
}
</script>

<template>
  <div class="count-page">
    <navTop title="确认购买" />
    <div v-if="detailPay" class="divs">
      <shopDetail :list="detailPay.list"></shopDetail>
      <modePayment></modePayment>
      <shopPrice :oldPrice="detailPay.totalPrice" :newPrice="detailPay.groupPrice"></shopPrice>
    </div>
    <div v-if="detailPays" class="divs">
      <div class="shop-page">
        <p>商品信息</p>
        <TJlist :item="detailPays" />
      </div>
      <modePayment></modePayment>
      <shopPrice
        :oldPrice="detailPays?.priceOriginal"
        :newPrice="detailPays?.priceDiscount"
      ></shopPrice>
    </div>
    <div class="fot">
      <p v-if="detailPay">
        实付金额: <span class="red">{{ detailPay.groupPrice }}</span>
      </p>
      <p v-else>
        实付金额: <span class="red">{{ detailPays?.priceDiscount }}</span>
      </p>
      <van-button round>立即支付</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.count-page {
  box-sizing: border-box;
  padding-bottom: 80px;
}

.divs {
  box-sizing: border-box;
  padding-top: 50px;
}
.shop-page {
  box-sizing: border-box;
  padding: 10px;
}
.fot {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 50px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  z-index: 999;
  border-top: 1px solid var(--cp-line);

  .red {
    color: var(--cp-price);
    font-size: 18px;
  }

  .van-button {
    background-color: var(--cp-bg);
    color: #fff;
  }
}
</style>
