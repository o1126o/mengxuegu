<script setup lang="ts">
import { ref } from 'vue'
import type { UserInfos } from '@/types/user'
import { useRouter } from 'vue-router'
const router = useRouter()
// 读取用户信息
const userInfoString = localStorage.getItem('userInfo')
const userInfo = ref<UserInfos>(userInfoString ? JSON.parse(userInfoString) : null)

const token = localStorage.getItem('token')!
// 用户信息你页面
const handleMy = () => {
  if (!token) {
    router.push('/login')
  } else {
    router.push('/my/user')
  }
}
// 我的订单页面
const handleList = () => {
  if (!token) {
    router.push('/login')
  } else {
    router.push('/my/list')
  }
}
</script>

<template>
  <div class="my-page">
    <div class="my-page-head">
      <p class="title">我的</p>
      <div class="box" v-if="userInfo" @click="handleMy">
        <img :src="userInfo.imageUrl" alt="" />
        <div class="name">
          <h3>{{ userInfo.nickName }}</h3>
          <p>用户名：{{ userInfo.username }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
      <div class="box" v-else @click="handleMy">
        <img src="@/icon/menu.png" alt="" />
        <div class="name">
          <h3>请登录</h3>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="my-page-line"></div>
    <div class="my-page-con">
      <van-cell title="我的订单" icon="@/assets/book.svg" is-link @click="handleList" />
      <van-cell title="我的余额" icon="@/assets/lock.svg" is-link />
      <van-cell title="我的学习" icon="@/assets/beark.svg" is-link />
    </div>
    <div class="my-page-line"></div>
    <div class="my-page-con">
      <van-cell title="设置" icon="@/assets/setting.svg" is-link />
      <van-cell title="意见反馈" icon="@/assets/trumpet.svg" is-link />
    </div>
    <div class="my-page-line"></div>
    <div class="my-page-con">
      <van-cell title="关于我们" icon="@/assets/mean.svg" is-link />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-page {
  box-sizing: border-box;

  .van-icon {
    font-size: 16px;
    color: var(--cp-text4);
  }

  &-head {
    background-color: var(--cp-bg);
    padding-top: 50px;

    .title {
      position: fixed;
      top: 10px;
      font-size: 16px;
      font-weight: bold;
      left: 45%;
      color: #cdd7f0;
    }

    .box {
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      border-radius: 15px 15px 0 0;
      height: 130px;
      display: flex;
      align-items: center;
      padding: 10px;

      img {
        width: 70px;
        height: 70px;
        margin: 0 15px;
        border-radius: 50%;
      }

      .name {
        flex: 1;

        h3 {
          font-size: 19px;
        }

        p {
          font-size: 16px;
          color: var(--cp-dark);
        }
      }
    }
  }

  &-line {
    background-color: var(--cp-plain);
    height: 10px;
  }
}

:deep() {
  .van-cell__title {
    font-size: 16px;
    margin-left: 10px;
  }
}
</style>
