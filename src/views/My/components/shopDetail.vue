<script setup lang="ts">
import TJlist from '@/components/TJlist.vue'
import type { PackageItem } from '@/types/coures'
defineProps<{
  list: PackageItem[]
}>()
</script>

<template>
  <div class="shop-page">
    <p>商品信息</p>
    <TJlist :item="item" v-for="item in list" :key="item.id" />
  </div>
</template>

<style lang="scss" scoped>
.shop-page {
  box-sizing: border-box;
  padding: 10px;
}
</style>
