<script setup lang="ts">
import { ref } from 'vue'
import { labelHomeList } from '@/services/home'
import type { labelHomes, labels } from '@/types/home'
const active = ref(0)
// 分类名称列表
const lablelists = ref<labelHomes[]>()
const queryLabel = async () => {
  let labelRes = await labelHomeList()
  lablelists.value = labelRes.data
}
queryLabel()

import { useRouter } from 'vue-router'
const router = useRouter()

// 跳转到搜索列表页
const handleSearch = (i: labels) => {
  router.push({
    path: '/search',
    query: { labelId: i.id, name: i.name }
  })
}
</script>

<template>
  <div class="category-page">
    <van-nav-bar title="分类">
      <template #right>
        <van-icon name="search" size="20" @click="router.push('/search/input')" />
      </template>
    </van-nav-bar>
    <div class="cate">
      <van-sidebar v-model="active">
        <van-sidebar-item :title="item.name" v-for="item in lablelists" :key="item.id" />
      </van-sidebar>
      <div class="right" v-if="lablelists">
        <p v-for="i in lablelists[active]?.labelList" :key="i.id" @click="handleSearch(i)">
          {{ i.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-page {
  padding: 45px 0;
}

.cate {
  width: 100%;
  display: flex;

  .right {
    padding: 20px 10px;
    display: flex;
    width: 68%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;

    p {
      width: 80px;
      height: 36px;
      border: 1px solid var(--cp-tip);
      line-height: 36px;
      border-radius: 18px;
      text-align: center;
      margin-bottom: 15px;
    }
  }
}

::v-deep() {
  .van-nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    background-color: var(--cp-bg);
  }

  .van-nav-bar__title,
  .van-icon {
    color: #fff;
    font-weight: 700;
  }

  // 左侧边栏
  .van-sidebar {
    width: 100px;

    &-item {
      width: 100%;
      height: 75px;
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      color: var(--cp-text4);
    }
  }

  .van-sidebar-item--select {
    color: var(--cp-bg);
    background-color: #f7f8fa;
  }

  .van-sidebar-item--select:before {
    width: 2.5px;
    height: 25px;
    background-color: var(--cp-bg);
  }
}
</style>
