<script setup lang="ts">
import { ref } from 'vue'
import { questList } from '@/services/question'
import type { tabNavQuery } from '@/types/request'
import type { questListItem } from '@/types/request'
import type { tabNavType, tabNavLists } from '@/types/request'
// 默认标签
const active = ref<tabNavType>('hot')
const tabNavList = ref<tabNavLists[]>([
  {
    id: 0,
    value: '热门问答',
    type: 'hot'
  },
  {
    id: 1,
    value: '最新问题',
    type: 'new'
  },
  {
    id: 2,
    value: '等待回答',
    type: 'wait'
  }
])
// 分页参数
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const query = ref<tabNavQuery>({
  current: 1,
  size: 10
})
// 请求数据列表
const questionList = ref<questListItem[]>([])
const queryList = async () => {
  const res = await questList(query.value, active.value)
  questionList.value.push(...res.data.records)
  refreshing.value = false
  if (questionList.value.length >= res.data.total) {
    finished.value = true
  }
  loading.value = false
}
queryList()
// 上拉加载
const onLoad = () => {
  query.value.current += 1
  loading.value = true
  if (refreshing.value) {
    questionList.value = []
    finished.value = false
  }
  queryList()
}
// 下拉刷新
const onRefresh = () => {
  query.value.current = 1
  questionList.value = []
  finished.value = false
  loading.value = true
  queryList()
}
// 切换标签
const handleChange = (value: tabNavType) => {
  questionList.value = []
  active.value = value
  queryList()
}

// 跳转到问答详情页
import { useRouter } from 'vue-router'
const router = useRouter()
const handleQuestDet = (id: number | string) => {
  console.log(id)
  router.push(`/question/details/${id}`)
}
</script>

<template>
  <div class="question-page">
    <cpNavBar @handle-change="handleChange" :active="active" :tabNavList="tabNavList"></cpNavBar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="question-page-list"
          v-for="item in questionList"
          :key="item.id"
          @click="handleQuestDet(item.id)"
        >
          <p class="title">
            {{ item.title }}
          </p>
          <div class="fot">
            <p>{{ item.reply }} 回答·{{ item.viewCount }} 浏览</p>
            <p>{{ item.nickName }}· {{ item.createDate }}</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.question-page {
  padding-top: 80px;
  padding-bottom: 50px;
}

.question-page-list {
  box-sizing: border-box;
  padding: 15px;
  border-bottom: 1px solid var(--cp-line);
  .title {
    color: #000;
    font-weight: bold;
    font-size: 16px;
  }
  .fot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: var(--cp-text4);
    margin-top: 5px;
  }
}
</style>
