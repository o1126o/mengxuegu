<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const onClickLeft = () => {
  router.back()
}

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="nav-page">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-icon {
    color: var(--cp-text2);
  }

  .van-nav-bar__arrow {
    font-size: 22px;
  }
  .van-nav-bar {
    background-color: #fff;
    position: fixed;
    top: 0;
    width: 100%;
  }
}
</style>
