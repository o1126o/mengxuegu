<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { showToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import type { ArticleType, searchHomes, searchHomesList } from '@/types/home'
import { getArticle, queryQuest, searchHomeList } from '@/services/home'
import type { questListItem } from '@/types/request'
import TJlist from '@/components/TJlist.vue'
const route = useRoute()
const router = useRouter()
import downMenuTow from './components/downMenuTow.vue'
import downMenuThree from './components/downMenuThree.vue'
console.log(route.params.id)

// 请求参数
const query = ref<searchHomes>({
  categoryId: route.params.categoryId || null,
  content: route.params.content || null,
  isFree: route.params.isFree || null,
  labelId: route.params.labelId || null,
  sort: route.params.sort || null,
  current: 1,
  size: 10
})

// 课程
const weekList = ref<searchHomesList[]>([])
const queryWeek = async () => {
  const res = await searchHomeList(query.value)
  console.log(res)
  weekList.value.push(...res.data.records)
  refreshing1.value = false
  if (weekList.value.length >= res.data.total) {
    finished1.value = true
  }
  loading1.value = false
}

// 文章
const articleList = ref<ArticleType[]>([])
const queryArticle = async () => {
  const res = await getArticle(query.value)
  articleList.value.push(...res.data.records)
  refreshing2.value = false
  if (articleList.value.length >= res.data.total) {
    finished2.value = true
  }
  loading2.value = false
}

// 问答
const quesList = ref<questListItem[]>([])
const queryQuestion = async () => {
  const res = await queryQuest(query.value)
  quesList.value.push(...res.data.records)
  refreshing3.value = false
  if (quesList.value.length >= res.data.total) {
    finished3.value = true
  }
  loading3.value = false
}

onMounted(() => {
  queryWeek()
})
// 默认标签
const activeName = ref('week')
const handleChange = () => {
  console.log(activeName.value)
  if (activeName.value === 'article') {
    queryArticle()
  } else if (activeName.value === 'question') {
    queryQuestion()
  } else {
    queryWeek()
  }
}

// 搜索
const value = ref('')
const onSearch = (val: string) => {
  showToast(val)
  query.value.content = val
  if (activeName.value === 'article') {
    articleList.value = []
    queryArticle()
  } else if (activeName.value === 'question') {
    quesList.value = []
    queryQuestion()
  } else {
    weekList.value = []
    queryWeek()
  }
}

// 跳转到文章详情页
const handleArtivleDetail = (id: number | string) => {
  console.log(id)
  router.push(`/article/details/${id}`)
}

// 跳转到问答详情页
const handleQuestDet = (id: number | string) => {
  console.log(id)
  router.push(`/question/details/${id}`)
}

// 分页
const loading1 = ref(false)
const finished1 = ref(false)
const refreshing1 = ref(false)
const loading2 = ref(false)
const finished2 = ref(false)
const refreshing2 = ref(false)
const loading3 = ref(false)
const finished3 = ref(false)
const refreshing3 = ref(false)
// 上拉加载1
const onLoad1 = () => {
  query.value.current += 1
  loading1.value = true
  if (refreshing1.value) {
    weekList.value = []
    finished1.value = false
  }
  queryWeek()
}
// 下拉刷新1
const onRefresh1 = () => {
  query.value.current = 1
  weekList.value = []
  finished1.value = false
  loading1.value = true
  queryWeek()
}
// 上拉加载2
const onLoad2 = () => {
  query.value.current += 1
  loading2.value = true
  if (refreshing2.value) {
    articleList.value = []
    finished2.value = false
  }
  queryArticle()
}
// 下拉刷新2
const onRefresh2 = () => {
  query.value.current = 1
  articleList.value = []
  finished2.value = false
  loading2.value = true
  queryArticle()
}
// 上拉加载3
const onLoad3 = () => {
  query.value.current += 1
  loading3.value = true
  if (refreshing3.value) {
    quesList.value = []
    finished3.value = false
  }
  queryQuestion()
}
// 下拉刷新3
const onRefresh3 = () => {
  query.value.current = 1
  quesList.value = []
  finished3.value = false
  loading3.value = true
  queryQuestion()
}
</script>

<template>
  <div class="search-page">
    <header>
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
    </header>
    <!-- 列表切换 -->
    <van-tabs v-model:active="activeName" title-active-color="#007bff" @click-tab="handleChange">
      <van-tab title="课程" name="week">
        <div class="downs"></div>
        <van-pull-refresh v-model="refreshing1" @refresh="onRefresh1">
          <van-list
            v-model:loading="loading1"
            :finished="finished1"
            finished-text="没有更多了"
            @load="onLoad1"
          >
            <div class="list">
              <TJlist v-for="item in weekList" :key="item.id" :item="item"></TJlist>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="文章" name="article">
        <van-pull-refresh v-model="refreshing2" @refresh="onRefresh2">
          <van-list
            v-model:loading="loading2"
            :finished="finished2"
            finished-text="没有更多了"
            @load="onLoad2"
          >
            <div class="list">
              <div class="list">
                <div
                  class="itembox"
                  v-for="ele in articleList"
                  :key="ele.id"
                  @click="handleArtivleDetail(ele.id)"
                >
                  <div class="infobox">
                    <div class="l">
                      <h3>{{ ele.title }}</h3>
                      <p>{{ ele.summary }}</p>
                    </div>
                    <img
                      v-if="ele.imageUrl"
                      :src="
                        ele.imageUrl?.includes('http')
                          ? ele.imageUrl
                          : `http://m.mengxuegu.com${ele.imageUrl}`
                      "
                    />
                  </div>
                  <span style="color: #222; font-size: 13px">{{ ele.nickName }}</span>
                  <span style="color: #999; font-size: 13px">
                    · {{ ele.updateDate }} · {{ ele.viewCount }}赞</span
                  >
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="问答" name="question">
        <van-pull-refresh v-model="refreshing3" @refresh="onRefresh3">
          <van-list
            v-model:loading="loading3"
            :finished="finished3"
            finished-text="没有更多了"
            @load="onLoad3"
          >
            <div class="list">
              <div
                class="question-page-list"
                v-for="item in quesList"
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
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-search__content {
    width: 270px;
  }

  .van-tab {
    font-size: 15px;
    border-bottom: 1px solid var(--cp-line);
  }

  .van-tabs__line {
    bottom: 20px;
    width: 30px;
  }

  .van-tab--active {
    font-weight: normal;
  }

  .van-dropdown-menu__bar {
    box-shadow: none;
  }
}

.search-page {
  box-sizing: border-box;
  padding-top: 40px;

  header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    height: 50px;
    background-color: #fff;

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
  }

  .list {
    box-sizing: border-box;
    padding: 0 15px;

    .itembox {
      width: 100%;
      box-sizing: border-box;
      padding: 15px 0;

      .infobox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        .l {
          min-width: 70%;
          margin-bottom: 20px;

          h3 {
            font-size: 17px;
            color: #000;
          }

          > p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 13px;
            color: #999;
          }
        }

        img {
          width: 110px !important;
          height: 75px;
          border-radius: 5px;
        }
      }
    }

    .question-page-list {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 0;
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
  }
}

.downs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
