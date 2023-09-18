<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  options1: Array
  sortValue: null | string
}>()
</script>

<template>
  <div class="one-page">
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item :modelValue="sortValue" :options="options1" />
    </van-dropdown-menu>
  </div>
</template>

<style lang="scss" scoped></style>
