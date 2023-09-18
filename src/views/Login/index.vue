<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { loginApi } from '@/services/user'
import type { Logins, AuthUserLogin } from '@/types/user'
import { showToast } from 'vant'

const login = ref<Logins>({
  mobile: '',
  code: ''
})

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
const onSubmit = async () => {
  // 校验手机号
  const mobileRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (!mobileRegex.test(login.value.mobile)) {
    showToast('手机号码格式不正确')
    return false // 如果手机号码格式不正确，停止后续操作并报错
  }
  // 校验验证码
  if (login.value.code !== '123456') {
    showToast('验证码不正确')
    return false // 如果验证码不正确，停止后续操作并报错
  }
  // 校验协议通知
  if (checked.value !== true) {
    showToast('请认真阅读并同意用户服务协议和隐私权政策')
    return false // 如果验证码不正确，停止后续操作并报错
  }
  // 执行登录操作
  const loginRef = await loginApi(login.value)
  localStorage.setItem('userInfo', JSON.stringify(loginRef.data.userInfo))
  localStorage.setItem('token', loginRef.data.access_token)
  router.push('/my')
}
</script>

<template>
  <div class="login-page">
    <van-icon name="cross" class="cross" @click="onClickLeft" />
    <h1>LOGIN</h1>
    <h2>欢迎回来！</h2>
    <div class="login-page-form">
      <van-cell-group inset>
        <van-field
          label="手机号码"
          placeholder="请输入手机号码"
          label-align="top"
          v-model="login.mobile"
        />
        <van-field
          label="验证码"
          placeholder="请输入手机验证码"
          label-align="top"
          v-model="login.code"
        >
          <template #button>
            <van-button size="small" type="primary">获取验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-button type="primary" block @click="onSubmit">登录</van-button>
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
    font-size: 18px;
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
    margin-left: 30px;

    .van-checkbox {
      margin-right: 10px;
    }

    span {
      color: var(--cp-text1);
    }
  }
}
</style>
