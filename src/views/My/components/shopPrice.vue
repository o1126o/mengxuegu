<script setup lang="ts">
defineProps<{
  oldPrice: number | undefined
  newPrice: number | undefined
}>()
</script>

<template>
  <div class="price-page">
    <div>
      <p>商品金额</p>
      <p>￥{{ oldPrice }}</p>
    </div>
    <div>
      <p>优惠价</p>
      <p>￥{{ newPrice }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.price-page {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 0 0 3px 1px #eee;
  border-radius: 10px;
  margin-top: 20px;
  div {
    height: 35px;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
}
</style>
