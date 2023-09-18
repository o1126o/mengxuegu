<template>
  <div class="article-page">
    <div class="head">
      <!-- 搜索框 -->
      <van-search
        shape="round"
        placeholder="搜索你想要的内容"
        input-align="center"
        background="#345dc2"
      />
      <van-tabs v-model:active="active" @click-tab="tabHandle" title-active-color="#007bff">
        <van-tab title="推荐"></van-tab>
        <van-tab :title="item.name" v-for="item in list" :key="item.id"></van-tab>
      </van-tabs>
    </div>
    <div class="tabbox">
      <div class="listbox">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="itembox"
            v-for="ele in articlelist"
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
        </van-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getArticle, labelHomeList } from '@/services/home'
import type { ArticleType, labelHomes } from '@/types/home'
import { onMounted, ref } from 'vue'
const active = ref(0)
const list = ref<labelHomes[]>([])
const articlelist = ref<ArticleType[]>([])
// 总数
const total = ref(0)
const txt = ref({
  categoryId: active.value,
  current: 1,
  size: 10
})
const queryArtice = async () => {
  const articleRes = await getArticle(txt.value)
  articlelist.value.push(...articleRes.data.records)
  total.value = articleRes.data.total
}
const tabHandle = async () => {
  articlelist.value = []
  queryArtice()
}
onMounted(async () => {
  const listres = await labelHomeList()
  list.value = listres.data
  queryArtice()
})

// 上拉刷新
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  queryArtice()
  if (articlelist.value.length >= total.value) {
    finished.value = true
  } else {
    txt.value.current++
  }
  loading.value = false
}

// 跳转到文章详情页
const router = useRouter()
const handleArtivleDetail = (id: number | string) => {
  console.log(id)
  router.push(`/article/details/${id}`)
}
</script>
<style lang="scss" scoped>
.article-page {
  width: 100%;
  min-height: 100vh;
  padding-top: 90px;
}

::v-deep() {
  .van-tab {
    font-size: 15px;
    border-bottom: 1px solid var(--cp-line);
    width: 70px;
  }

  .van-tabs__line {
    bottom: 20px;
    width: 30px;
  }

  .van-tab--active {
    font-weight: normal;
  }

  .van-search {
    padding: 7px 5px;
    height: 45px;
  }
}

.itembox {
  width: 375.2px;
  height: 121.6px;
  padding: 15px;
  box-sizing: border-box;

  .infobox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l {
      min-width: 233.2px;

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
      width: 110px;
      height: 70px;
      border-radius: 10px;
    }
  }
}

.listbox {
  min-height: calc(100vh - 154px);
  overflow-y: auto;
  margin-bottom: 60px;
}

.head {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
