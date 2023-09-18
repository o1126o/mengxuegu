<script setup lang="ts">
const tabBarList = [
  {
    name: '首页',
    default: '../../../src/icon/index.png',
    active: '../../../src/icon/index-active.png',
    path: '/home'
  },
  {
    name: '分类',
    default: '../../../src/icon/category.png',
    active: '../../../src/icon/category-active.png',
    path: '/category'
  },
  {
    name: '阅读',
    default: '../../../src/icon/article.png',
    active: '../../../src/icon/article-active.png',
    path: '/article'
  },
  {
    name: '问答',
    default: '../../../src/icon/question.png',
    active: '../../../src/icon/question-active.png',
    path: '/question'
  },
  {
    name: '我的',
    default: '../../../src/icon/my.png',
    active: '../../../src/icon/my-active.png',
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
