<script setup lang="ts">
import { ref } from 'vue'

const options2 = [
  { text: '全部课程', value: null },
  { text: '付费课程', value: 0 },
  { text: '免费课程', value: 1 }
]
const courseValue = ref(null)
</script>

<template>
  <div class="tow-page">
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item v-model="courseValue" :options="options2" />
    </van-dropdown-menu>
  </div>
</template>

<style lang="scss" scoped></style>
