<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const serList = ref<string[]>(JSON.parse(localStorage.getItem('searchList') || '[]'))
// 搜索框
const value = ref('')
const onSearch = () => {
  console.log(value.value)
  let res = serList.value.find((item) => item === value.value)
  console.log(res)
  if (!res && value.value !== '') {
    serList.value.unshift(value.value)
    localStorage.setItem('searchList', JSON.stringify(serList.value))
  }
  router.push({
    path: '/search',
    query: { value: value.value }
  })
  value.value = ''
}

const hotSer = ['Java', 'Python', 'Vue.js', 'React', 'SpringBoot', 'SpringCloud']

// 清空历史记录
const handleClear = () => {
  localStorage.removeItem('searchList')
  serList.value = []
}

// 搜索、
const handleSer = (value: string) => {
  console.log(value)
  let res = serList.value.find((item) => item === value)
  console.log(res)
  if (!res) {
    serList.value.unshift(value)
    localStorage.setItem('searchList', JSON.stringify(serList.value))
  }
  router.push({
    path: '/search',
    query: { value }
  })
}
</script>

<template>
  <div class="inp-page">
    <!-- 搜索框 -->
    <div class="top">
      <van-icon name="arrow-left" @click="router.back()" />
      <van-search
        v-model="value"
        show-action
        placeholder="搜索你想要的内容"
        @search="onSearch"
        shape="round"
      />
    </div>
    <!-- 热门搜索 -->
    <div class="hot">
      <div class="hear">
        <p>热门搜索</p>
      </div>
      <div class="ul">
        <p v-for="(item, index) in hotSer" :key="index" class="li" @click="handleSer(item)">
          {{ item }}
        </p>
      </div>
    </div>
    <!-- 历史搜索 -->
    <div class="hist">
      <div class="hear">
        <p>历史搜索</p>
        <p @click="handleClear">清空</p>
      </div>
      <div class="ul">
        <p v-for="(item, index) in serList" :key="index" class="li" @click="handleSer(item)">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-search__content {
    width: 270px;
  }
}

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

.hist,
.hot {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .hear {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    p:nth-child(2) {
      color: var(--cp-text4);
    }
  }
  .ul {
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    .li {
      border: 1px solid var(--cp-text4);
      color: var(--cp-text4);
      margin-right: 10px;
      border-radius: 3px;
      padding: 3px;
      margin-top: 10px;
    }
  }
}
</style>
