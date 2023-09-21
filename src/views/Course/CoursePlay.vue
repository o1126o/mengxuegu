<script setup lang="ts">
import { couresDetailApi, couresVideoApi, couresStarApi } from '@/services/coures'
import type { CouresIn, Section, VideoData } from '@/types/coures'
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const playDetail = ref<CouresIn>()
const VideoList = ref<VideoData>()
const videos = ref<string | undefined>('')

onMounted(async () => {
  const res = await couresDetailApi(route.params.id)
  console.log(res)
  playDetail.value = res.data
  const Videores = await couresVideoApi(route.params.id)
  console.log(res)
  VideoList.value = Videores.data
})

// 跳转详情
const handleDetail = (id: number | undefined) => {
  console.log(id)
  router.push(`/course/details/${id}`)
}
const active = ref<number>(1)
// 切换视频
const handleChange = (val: Section) => {
  videos.value = val.videoUrl
  active.value = val.id
}

// 评价
const values = ref<number>(5)
const show = ref<boolean>(false)
const starWord = ref<string>('推荐,课程非常棒')
const handleShow = () => {
  show.value = true
}
const onChange = (values: number) => {
  if (values === 1) {
    starWord.value = '极差,课程很糟糕,我要吐槽'
  } else if (values === 2) {
    starWord.value = '差,我对课程不满意'
  } else if (values === 3) {
    starWord.value = '中评,课程一般'
  } else if (values === 4) {
    starWord.value = '良好,课程还可以'
  } else {
    starWord.value = '推荐,课程非常棒'
  }
}
const inp = ref<string>('')
// 提交评价
const handleUp = async () => {
  const inpRef = await couresStarApi({
    content: inp.value,
    courseId: route.params.id,
    score: values.value
  })
  console.log(inpRef)
  show.value = false
  showToast('评价成功')
}
</script>

<template>
  <div class="course-paly-page">
    <video
      id="video"
      :src="videos"
      controls="true"
      poster="http://m.mengxuegu.com/static/images/banner3.jpg"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="allow"
      style="object-fit: fill"
    ></video>

    <div class="con" @click="handleDetail(playDetail?.id)">
      <h3>{{ playDetail?.title }}</h3>
      <p>详情<van-icon name="arrow" /></p>
    </div>
    <div class="view-content">
      <div class="videos" v-for="(item, index) in VideoList" :key="item.id">
        <div class="chapters">第{{ index + 1 }}章 {{ item.name }}</div>
        <div
          :class="active === i.id ? 'active' : 'sections'"
          v-for="i in item.sectionList"
          :key="i.id"
          @click="handleChange(i)"
        >
          <div class="iconfont"><van-icon name="arrow" /></div>
          <div class="row">{{ `${index + 1}-${i.id}` }} {{ i.name }}</div>
        </div>
      </div>
    </div>

    <div class="fot" @click="handleShow">
      <van-icon name="records" />
      <p>评价</p>
    </div>

    <van-dialog v-model:show="show" :showConfirmButton="false">
      <div class="top">
        <van-rate v-model="values" color="#007aff" @change="onChange" />
        <p>{{ starWord }}</p>
      </div>
      <div class="inp">
        <input type="text" v-model="inp" placeholder="请输入评价内容......" />
        <p @click="handleUp">提交</p>
      </div>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
video {
  width: 100%;
  height: 211px;
}

.top {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid var(--cp-line);
  p {
    margin-top: 5px;
    font-size: 17px;
  }
}
.inp {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  input {
    border: none;
    width: 80%;
    background-color: var(--cp-text3);
    height: 100%;
  }
  p {
    width: 20%;
    text-align: center;
    color: var(--cp-text1);
  }
}
.fot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--cp-line);
  justify-content: center;
  color: var(--cp-text4);
  .van-icon {
    font-size: 20px;
  }
}
.con {
  width: 100%;
  height: 61px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 0 15px;

  p {
    font-weight: 700;
  }
}

.view-content {
  padding: 18px;
  box-sizing: border-box;

  .videos {
    margin-bottom: 20px;

    .chapters {
      height: 23px;
      font-weight: 700;
      font-size: 17px;
    }

    .sections {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid var(--cp-line);
      height: 40px;
      align-items: center;
      box-sizing: border-box;

      .iconfont {
        font-size: 12px;
        color: #fff;
        border-radius: 50%;
        background-color: var(--cp-text2);
        width: 15px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        margin-right: 10px;
      }

      .row {
        font-size: 15px;
        width: 270px;
      }
    }
  }
}

.active {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--cp-line);
  height: 40px;
  align-items: center;
  box-sizing: border-box;

  .iconfont {
    font-size: 12px;
    color: #fff;
    border-radius: 50%;
    background-color: var(--cp-text1);
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    margin-right: 10px;
  }

  .row {
    font-size: 15px;
    width: 270px;
    color: var(--cp-text1);
  }
}
</style>
