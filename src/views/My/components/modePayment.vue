<script setup lang="ts"></script>

<template>
  <div class="mode-page">
    <p class="pay">支付方式</p>
    <div>
      <p><img src="../../../assets/alipay.png" alt="" /> 支付宝</p>
      <van-radio></van-radio>
    </div>
    <div>
      <p><img src="../../../assets/wxpay.png" alt="" /> 微信</p>
      <van-radio></van-radio>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mode-page {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0 0 3px 1px #eee;
  border-radius: 10px;
  .pay {
    height: 30px;
    border-bottom: 1px solid var(--cp-plain);
  }
  div {
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    p {
      align-items: center;
      display: flex;
      img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
    }
  }
}
</style>
