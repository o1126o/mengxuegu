<script setup lang="ts"></script>

<template>
  <div class="my-page">
    <div class="my-page-head">
      <p class="title">我的</p>
      <div class="box">
        <img src="@/icon/menu.png" alt="" />
        <h3>请登录</h3>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="my-page-line"></div>
    <div class="my-page-con">
      <van-cell title="我的订单" icon="@/assets/book.svg" is-link />
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
      }

      h3 {
        flex: 1;
        font-size: 18px;
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
