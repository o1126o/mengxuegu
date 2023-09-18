<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import type { QueryZh } from '@/types/user'
const route = useRoute()
const router = useRouter()

// 搜索
const value = ref('')
const onSearch = (val: string) => showToast(val)
console.log(route.params.id)

const query = ref<QueryZh>({
  categoryId: route.params.categoryId || null,
  content: route.params.content || null,
  isFree: route.params.isFree || null,
  labelId: route.params.labelId || null,
  sort: route.params.sort || null,
  current: 1,
  size: 10
})
</script>

<template>
  <div class="search-page">
    <header>
      <!-- 搜索框 -->
      <div class="top">
        <van-icon name="arrow-left" />
        <van-search
          v-model="value"
          show-action
          placeholder="搜索你想要的内容"
          @search="onSearch"
          shape="round"
        />
      </div>
    </header>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-search__content {
    width: 270px;
  }
}

.search-page {
  box-sizing: border-box;
  padding-top: 100px;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;

    .top {
      width: 100%;
      display: flex;
      align-items: center;
      height: 44px;
      padding-left: 10px;
      .van-icon {
        font-size: 20px;
      }
    }
  }
}
</style>
