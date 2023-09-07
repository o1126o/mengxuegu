<script setup lang="ts">
const tabBarList = [
  {
    name: '首页',
    default: '@/icon/index.png',
    active: '@/icon/index-active.png',
    path: '/home'
  },
  {
    name: '分类',
    default: '@/icon/category.png',
    active: '@/icon/category-active.png',
    path: '/category'
  },
  {
    name: '阅读',
    default: '@/icon/article.png',
    active: '@/icon/article-active.png',
    path: '/article'
  },
  {
    name: '问答',
    default: '@/icon/question.png',
    active: '@/icon/question-active.png',
    path: '/question'
  },
  {
    name: '我的',
    default: '@/icon/my.png',
    active: '@/icon/my-active.png',
    path: '/my'
  }
]
</script>

<template>
  <div class="layout-page">
    <van-tabbar route active-color="#345dc2" inactive-color="#dbdbdb">
      <van-tabbar-item v-for="(item, index) in tabBarList" :key="index" :to="item.path">
        {{ item.name }}
        <template #icon="{ active }">
          <img :src="active ? item.active : item.default" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  ::v-deep() {
    .van-tabbar {
      background-color: var(--cp-text3);
    }

    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }

      &__text {
        font-size: 11px;
      }

      &--active {
        background-color: var(--cp-text3);
      }
    }
  }
}
</style>
