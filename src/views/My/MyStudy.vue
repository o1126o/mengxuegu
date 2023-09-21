<script setup lang="ts">
import { MyStudy } from '@/services/user'
import type { CourseStudy } from '@/types/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const studyList = ref<CourseStudy[]>([])
const queryStudy = async () => {
  const res = await MyStudy()
  console.log(res)
  studyList.value = res.data
}
queryStudy()

// 跳转到视频详情页
const handleVideo = (id: number) => {
  router.push(`/course/course-play/${id}`)
}
</script>

<template>
  <div class="study-page">
    <div class="study-page-head">
      <van-nav-bar title="我的学习" left-arrow @click-left="router.back()" />
    </div>
    <div class="study-page-list">
      <div class="item" v-for="item in studyList" :key="item.id" @click="handleVideo(item.id)">
        <div class="item-left">
          <p class="title">{{ item.title }}</p>
          <div class="pross">
            <p>已学{{ item.percent }}%</p>
            <van-progress :percentage="item.percent" stroke-width="2" pivot-text="" />
          </div>
        </div>
        <div class="item-right">
          <img
            :src="
              item.mainImage.includes('http')
                ? item.mainImage
                : 'http://m.mengxuegu.com' + item.mainImage
            "
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-icon {
    color: var(--cp-text2);
  }

  .van-nav-bar__arrow {
    font-size: 22px;
  }

  .van-progress__portion {
    background-color: var(--cp-bg);
  }
}

.study-page {
  box-sizing: border-box;
  &-head {
    position: fixed;
    top: 0;
    width: 100%;
  }
  &-list {
    box-sizing: border-box;
    padding-top: 50px;
    height: 80px;
    .item {
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      &-left {
        width: 65%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-weight: 700;
        }
        .pross {
          box-sizing: border-box;
          p {
            color: var(--cp-text4);
            margin-bottom: 3px;
          }
        }
      }
      &-right {
        width: 35%;
        margin-left: 5px;
        img {
          width: 100%;
          height: 80px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
