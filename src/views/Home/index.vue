<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { bannerHomes, labelHomes, searchHomes, searchHomesList } from '@/types/home'
import { bannerHomeList, labelHomeList, searchHomeList } from '@/services/home'
import TJlist from '@/components/TJlist.vue'
// 轮播图
const bannerlist = ref<bannerHomes[]>()
const queryBanner = async () => {
  let bannerres = await bannerHomeList()
  bannerlist.value = bannerres.data
}
// 分类名称列表
const lablelist = ref<labelHomes[]>()
const queryLabel = async () => {
  let labelRes = await labelHomeList()
  lablelist.value = labelRes.data
}

// 列表
const query = ref<searchHomes>({
  current: 1,
  size: 8,
  sort: '',
  isFree: 0
})
// 总数
const total = ref(0)
const hotList = ref<searchHomesList[]>()
const newList = ref<searchHomesList[]>()
const freeList = ref<searchHomesList[]>()
const isfreeList = ref<searchHomesList[]>()
const querySearch = async () => {
  // 最热
  query.value.sort = 'hot'
  const HotRef = await searchHomeList(query.value)
  hotList.value = HotRef.data.records
  // 最新
  query.value.sort = 'new'
  const NewRef = await searchHomeList(query.value)
  newList.value = NewRef.data.records
  // 免费
  query.value.isFree = 1
  query.value.size = 10
  const FreeRef = await searchHomeList(query.value)
  freeList.value = FreeRef.data.records
}
onMounted(() => {
  queryBanner()
  queryLabel()
  querySearch()
})
const swiperIndex = ref<number>(0) //轮播图索引
// 背景色
const bgColor = ref([
  'linear-gradient(to bottom, #006c00 50%,#fff)',
  'linear-gradient(to bottom, #45328c 50%,#fff)',
  'linear-gradient(to bottom, #0072b7 50%,#fff)'
])
const bgInpColor = ref(['#006c00', '#45328c', '#0072b7'])
// 初始
const searchBoxColor = ref<string>('#006c00')
const handleBgChange = (e: any) => {
  swiperIndex.value = e
  searchBoxColor.value = bgInpColor.value[swiperIndex.value]
}
// 监听页面滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
// 处理页面滚动事件
const handleScroll = () => {
  // 设置滑动固定颜色的位置，假设为 200px
  // 根据滚动位置来更新搜索框颜色变量
  if (window.scrollY > 60) {
    searchBoxColor.value = '#345dc2'
  } else {
    return false
  }
}

// 上拉加载
const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  // 加载更多
  // 收费
  query.value.isFree = 0
  query.value.size = 10
  const isFreeRef = await searchHomeList(query.value)
  total.value = isFreeRef.data.total
  isfreeList.value = isfreeList.value || [] // 先初始化为空数组
  isfreeList.value = [...isFreeRef.data.records, ...isfreeList.value] as searchHomesList[] // 添加类型断言
  if (isfreeList.value && isfreeList.value.length >= total.value) {
    finished.value = true
  } else {
    query.value.current++
  }
  loading.value = false
}

import { useRouter } from 'vue-router'
const router = useRouter()
// 跳转到详情页
const handleDetail = (id: number) => {
  console.log(id)
  router.push(`/course/details/${id}`)
}

// 跳转到搜索
const handleCate = (id: number | string | null) => {
  console.log(id)
  router.push(`/search/${id}`)
}
</script>

<template>
  <div class="home-page">
    <div class="home-page-head" :style="{ background: bgColor[swiperIndex] }">
      <!-- 搜索框 -->
      <van-search
        shape="round"
        placeholder="搜索你想要的内容"
        input-align="center"
        :background="searchBoxColor"
      />
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white" @change="handleBgChange">
        <van-swipe-item v-for="item in bannerlist" :key="item.id">
          <img
            :src="'http://m.mengxuegu.com/' + item.imageUrl"
            class="img-responsive"
            alt=""
            @click="handleDetail(item.id)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="home-page-cate">
      <div
        class="box"
        v-for="item in lablelist?.slice(0, 7)"
        :key="item.id"
        @click="handleCate(item.id)"
      >
        {{ item.name }}
      </div>
      <div class="box" @click="handleCate(null)">全部分类</div>
    </div>
    <!-- 回到顶部 -->
    <van-back-top right="2vw" bottom="15vh" />
    <!-- 热门推荐 -->
    <div class="home-page-hot-free">
      <div class="top">
        <div class="top-left">
          <p class="title">热门推荐</p>
          <span class="tag">HOT</span>
        </div>
        <p class="top-right">全部<van-icon name="arrow" /></p>
      </div>
      <div class="con">
        <van-swipe :loop="false" :width="330" :show-indicators="false">
          <van-swipe-item>
            <TJlist
              v-for="item in hotList?.slice(0, 5)"
              :key="item.id"
              :item="item"
              @handleDetail="handleDetail"
            ></TJlist>
          </van-swipe-item>
          <van-swipe-item>
            <TJlist
              v-for="item in hotList?.slice(5, 10)"
              :key="item.id"
              :item="item"
              @handleDetail="handleDetail"
            ></TJlist>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 近期上新 -->
    <div class="home-page-new">
      <div class="top">
        <div class="top-left">
          <p class="title">近期上新</p>
          <span class="tag">NEW</span>
        </div>
        <p class="top-right">全部<van-icon name="arrow" /></p>
      </div>
      <div class="con">
        <div class="con-box" v-for="item in newList" :key="item.id" @click="handleDetail(item.id)">
          <div class="img">
            <img
              :src="
                item.mainImage.includes('http')
                  ? item.mainImage
                  : 'http://m.mengxuegu.com' + item.mainImage
              "
              alt=""
            />
            <div class="time">
              {{ item.totalTime }}
            </div>
          </div>
          <div class="text">
            <h4>{{ item.title }}</h4>
            <div class="fot">
              <p class="icon"><van-icon name="manager" />{{ item.nickName }}</p>
              <p class="prew">
                <span class="price"
                  ><van-icon name="balance-o" v-if="item.isFree === 0" />{{
                    item.isFree === 0 ? item.priceDiscount : '免费'
                  }}</span
                >
                <span class="view"
                  ><van-icon name="play-circle-o" />{{ item.studyTotal }}人在学</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 免费精选 -->
    <div class="home-page-hot-free">
      <div class="top">
        <div class="top-left">
          <p class="title">免费精选</p>
          <span class="tag">FREE</span>
        </div>
        <p class="top-right">全部<van-icon name="arrow" /></p>
      </div>
      <div class="con">
        <van-swipe :loop="false" :width="330" :show-indicators="false">
          <van-swipe-item>
            <TJlist
              v-for="item in freeList?.slice(0, 5)"
              :key="item.id"
              :item="item"
              @handleDetail="handleDetail"
            ></TJlist>
          </van-swipe-item>
          <van-swipe-item>
            <TJlist
              v-for="item in freeList?.slice(5, 10)"
              :key="item.id"
              :item="item"
              @handleDetail="handleDetail"
            ></TJlist>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 付费精品 -->
    <div class="home-page-isfree">
      <div class="top">
        <div class="top-left">
          <p class="title">付费精品</p>
          <span class="tag">NICE</span>
        </div>
        <p class="top-right">全部<van-icon name="arrow" /></p>
      </div>
      <div class="con">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="-- 我是有底线的 --"
          @load="onLoad"
        >
          <TJlist
            v-for="item in isfreeList"
            :key="item.id"
            :item="item"
            @handleDetail="handleDetail"
          ></TJlist>
        </van-list>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-search {
    padding: 7px 5px;
    height: 45px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
  }

  .van-swipe__indicator {
    width: 8px;
    height: 8px;
  }

  .van-list__loading,
  .van-list__finished-text,
  .van-list__error-text {
    padding-bottom: 70px;
  }
}

.home-page {
  box-sizing: border-box;

  &-head {
    height: 170px;
    padding-top: 65px;

    .van-swipe {
      width: 93%;
      margin: auto;
      border-radius: 10px;
      height: 170px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  &-cate {
    width: 100%;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    .box {
      width: 70px;
      background-color: var(--cp-plain);
      text-align: center;
      height: 35px;
      line-height: 35px;
      border-radius: 7px;
      margin: 5px 0;
    }
  }

  &-hot-free {
    box-sizing: border-box;
    padding: 10px 15px;
    width: 100%;

    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .top-left {
        position: relative;

        .title {
          font-size: 18px;
        }

        .tag {
          position: absolute;
          display: inline-block;
          background-color: var(--cp-price);
          color: #fff;
          top: 3px;
          left: 75px;
          width: 35px;
          text-align: center;
          height: 17px;
          line-height: 17px;
          border-radius: 7px 7px 7px 0;
          font-size: 12px;
        }
      }

      .top-right {
        color: var(--cp-text4);
      }
    }

    .con {
      height: 500px;
      width: 100%;
    }
  }

  &-new {
    box-sizing: border-box;
    padding: 10px 15px;
    width: 100%;

    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .top-left {
        position: relative;

        .title {
          font-size: 18px;
        }

        .tag {
          position: absolute;
          display: inline-block;
          background-color: var(--cp-price);
          color: #fff;
          top: 3px;
          left: 75px;
          width: 35px;
          text-align: center;
          height: 17px;
          line-height: 17px;
          border-radius: 7px 7px 7px 0;
          font-size: 12px;
        }
      }

      .top-right {
        color: var(--cp-text4);
      }
    }

    .con {
      margin: 10px 0 15px 0;
      display: flex;
      box-sizing: border-box;
      overflow-x: auto;

      &-box {
        margin-right: 12px;
        margin-bottom: 10px;
        width: 170px;
        border-radius: 7px;
        height: 180px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 7px 5px;

        .img {
          position: relative;
          text-align: center;

          .time {
            position: absolute;
            bottom: 8px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            background-color: #00000038;
            box-sizing: border-box;
            padding: 2px 4px;
            border-radius: 10px;
            right: 2px;
          }

          img {
            width: 140px;
            height: 80px;
            border-radius: 5px;
          }
        }

        .text {
          display: flex;
          flex-direction: column;
          height: 80px;
          justify-content: space-between;

          h4 {
            color: #000;
          }

          .fot {
            .icon {
              color: var(--cp-text4);
              font-size: 13px;
            }

            .prew {
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: space-between;

              .price {
                color: var(--cp-price);
                display: inline-block;
              }

              .view {
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .con::-webkit-scrollbar {
      display: none;
    }
  }

  &-isfree {
    box-sizing: border-box;
    padding: 10px 15px;
    width: 100%;

    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .top-left {
        position: relative;

        .title {
          font-size: 18px;
        }

        .tag {
          position: absolute;
          display: inline-block;
          background-color: var(--cp-price);
          color: #fff;
          top: 3px;
          left: 75px;
          width: 35px;
          text-align: center;
          height: 17px;
          line-height: 17px;
          border-radius: 7px 7px 7px 0;
          font-size: 12px;
        }
      }

      .top-right {
        color: var(--cp-text4);
      }
    }

    .con {
      height: 500px;
      width: 100%;
    }
  }
}
</style>
