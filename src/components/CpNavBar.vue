<script setup lang="ts">
import type { tabNavType, tabNavLists } from '@/types/request'
const props = defineProps<{
  tabNavList: tabNavLists[]
  active: tabNavType
}>()

const emit = defineEmits<{
  (e: 'handle-change', active: tabNavType): void
}>()
// 切换标签
const handleChange = () => {
  emit('handle-change', props.active)
}
</script>

<template>
  <div class="nav-page">
    <van-search
      shape="round"
      background="#345dc2"
      placeholder="搜索你想要的内容"
      input-align="center"
    />
    <!-- 列表切换 -->
    <van-tabs :active="props.active" title-active-color="#007bff" @click-tab="handleChange">
      <van-tab
        :title="item.value"
        :name="item.type"
        v-for="item in tabNavList"
        :key="item.id"
      ></van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.nav-page {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9990;
}

:deep() {
  .van-tab {
    font-size: 15px;
    border-bottom: 1px solid var(--cp-line);
  }
  .van-tabs__line {
    bottom: 20px;
    width: 30px;
  }
  .van-tab--active {
    font-weight: normal;
  }

  .van-search {
    padding: 7px 5px;
    height: 45px;
  }
}
</style>
