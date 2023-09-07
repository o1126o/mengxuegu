<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 是否同意登录协议
const checked = ref(false)

// 返回
const onClickLeft = () => {
  // 判断历史记录中是否有回退
  if (history.state?.back) {
    console.log(history.state?.back)
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-page">
    <van-icon name="cross" class="cross" @click="onClickLeft" />
    <h1>LOGIN</h1>
    <h2>欢迎回来！</h2>
    <div class="login-page-form">
      <van-cell-group inset>
        <van-field label="手机号码" placeholder="请输入手机号码" label-align="top" />
        <van-field label="验证码" placeholder="请输入手机验证码" label-align="top">
          <template #button>
            <van-button size="small" type="primary">获取验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-button type="primary" block>登录</van-button>
    </div>
    <div class="login-page-fot">
      <van-checkbox v-model="checked" icon-size="17px"></van-checkbox>请认真阅读并同意
      <span> 《用户服务协议》 </span>
      <span> 《隐私权政策》 </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  box-sizing: border-box;

  .cross {
    position: fixed;
    top: 20px;
    left: 20px;
  }

  h1 {
    font-size: 55px;
    color: var(--cp-text3);
    position: fixed;
    left: 5px;
    top: 100px;
  }

  h2 {
    color: var(--cp-text2);
    position: fixed;
    left: 40px;
    top: 135px;
  }

  &-form {
    padding: 0 20px;
    width: 100%;
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;

    .van-cell {
      background-color: var(--cp-plain);
      margin-bottom: 10px;

      .van-cell-group--inset {
        margin: 0;
      }
    }

    .van-button {
      background-color: var(--cp-primary);
      width: 92%;
      margin-left: 15px;
    }
  }

  &-fot {
    font-size: 12px;
    display: flex;
    position: fixed;
    bottom: 20px;
    color: var(--cp-text4);

    .van-checkbox {
      margin-right: 10px;
    }

    span {
      color: var(--cp-text1);
    }
  }
}
</style>
