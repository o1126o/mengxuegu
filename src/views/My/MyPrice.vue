<script setup lang="ts">
import navTop from './components/navTop.vue'
import modePayment from './components/modePayment.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { ref } from 'vue'

const prices = ref(route.query.price)
</script>

<template>
  <div class="price-page">
    <navTop title="订单支付" />
    <div class="box">
      <modePayment></modePayment>
      <div class="priceAll">
        <p>实付金额</p>
        <p class="red">￥{{ prices }}</p>
      </div>
      <van-button type="primary" block round>立即支付</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  box-sizing: border-box;
  padding: 60px 10px;

  .priceAll {
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    box-shadow: 0 0 3px 1px #eee;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    .red {
      font-size: 16px;
      color: var(--cp-price);
    }
  }

  .van-button {
    margin-top: 20px;
    background-color: var(--cp-bg);
    color: #fff;
  }
}
</style>
