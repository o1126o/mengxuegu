<script setup lang="ts">
import { showConfirmDialog } from 'vant'
const user = JSON.parse(localStorage.getItem('userInfo')!)
const token = localStorage.getItem('token')!
console.log(token)
import { useRouter } from 'vue-router'
const router = useRouter()
import { louOutApi } from '@/services/user'
// 退出登录
const loyout = () => {
  showConfirmDialog({
    title: '确定退出登录？',
    message: '退出后不会删除任何历史数据。'
  })
    .then(() => {
      // on confirm
      louOutApi(token)
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      router.push('/my')
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<template>
  <div class="user-page">
    <van-nav-bar title="个人资料" left-arrow @click-left="router.back()" />
    <div class="box">
      <div class="img">
        <p>头像</p>
        <p><img :src="user.imageUrl" alt="" /><van-icon name="arrow" /></p>
      </div>
      <van-cell title="用户名" is-link :value="user.username" />
      <van-cell title="手机号" is-link :value="user.mobile" />
    </div>
    <div class="box">
      <van-cell title="昵称" is-link :value="user.nickName" />
      <van-cell title="性别" is-link :value="user.sex === 0 ? '女' : '男'" />
    </div>
    <div class="box">
      <van-button block @click="loyout">退出登录</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  box-sizing: border-box;
  height: 100vh;
  background-color: var(--cp-plain);
}

:deep() {
  .van-icon {
    color: var(--cp-text2);
  }

  .van-nav-bar__arrow {
    font-size: 22px;
  }

  .van-button {
    border: 0;
  }
}

.box {
  margin: 10px 0;

  .img {
    display: flex;
    background-color: #fff;
    width: 100%;
    justify-content: space-between;
    padding: 15px;
    align-items: center;
    box-sizing: border-box;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    p:nth-child(2) {
      display: flex;
      align-items: center;

      .van-icon {
        font-size: 16px;
      }
    }
  }
}
</style>
