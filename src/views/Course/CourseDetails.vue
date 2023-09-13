<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { couresApi, couresVideo, couresComment, couresGroup } from '@/services/coures'
import { useRouter } from 'vue-router'
import type { CouresIn, VideoData, CommentData, PackageInfo } from '@/types/coures'
const router = useRouter()
// 课程内容
const couser = ref<CouresIn>()
// 课程视频
const videoList = ref<VideoData>()
// 课程评论
const commentList = ref<CommentData>()
// 课程套餐
const groupList = ref<PackageInfo[]>()
onMounted(async () => {
  const res = await couresApi()
  couser.value = res.data
  window.addEventListener('scroll', handleScroll)
  // window.addEventListener('scroll', handleScrolls)
  const videoRef = await couresVideo()
  videoList.value = videoRef.data
  const commentRef = await couresComment()
  commentList.value = commentRef.data
  const groupRef = await couresGroup()
  groupList.value = groupRef.data
})

// 卸载前清除
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  // window.removeEventListener('scroll', handleScrolls)
})

// const isShow = ref<boolean>(false)

// 滚动事件
const isHeaderVisible = ref<boolean>(false)
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  // 判断滚动距离是否超过一定值
  if (scrollTop > 50) {
    isHeaderVisible.value = true
    // 假设超过100px显示头部列表
    // 显示头部列表的逻辑
  } else {
    isHeaderVisible.value = false
    // 隐藏头部列表的逻辑
  }
}
// const handleScrolls = () =>
//   const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
//   // 判断滚动距离是否超过一定值
//   if (scrollTop > 345) {
//     isShow.value = true
//     // 假设超过100px显示头部列表
//     // 显示头部列表的逻辑
//   } else {
//     isShow.value = false
//     // 隐藏头部列表的逻辑
//   }
// }

// 返回
const hanleBach = () => {
  // 判断历史记录中是否有回退
  if (history.state?.back) {
    console.log(history.state?.back)
    router.back()
  } else {
    router.push('/')
  }
}
// bar
const active = ref<string>('计算')

// 跳转详情
const handleDetail = (id: number) => {
  console.log(id)
}
</script>

<template>
  <div class="course-detail-page">
    <!-- 标题 -->
    <div class="title" v-if="isHeaderVisible">
      <van-icon name="arrow-left" @click="hanleBach" />
      <p>{{ couser?.title }}</p>
    </div>
    <div class="head">
      <div class="img">
        <img :src="couser?.mainImage" alt="" />
        <span><van-icon name="arrow-left" @click="hanleBach" /></span>
      </div>
      <div class="con">
        <div class="info">
          <div class="price-info">
            <span>￥{{ couser?.priceDiscount }}</span>
            <span>￥{{ couser?.priceOriginal }}</span>
            <span>优惠价</span>
          </div>
          <div class="title-info">
            {{ couser?.title }}
          </div>
          <div class="count-info">
            <span><van-icon name="good-job" />{{ couser?.goodRate }}好评</span>
            <span><van-icon name="manager" />{{ couser?.studyTotal }}人在学</span>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <!-- <div class="tab-bars" v-if="isShow">
        <van-tabs v-model:active="active" title-active-color="#007bff">
          <van-tab title="计算" name="计算"></van-tab>
          <van-tab title="章节" name="章节"></van-tab>
          <van-tab title="评论" name="评论"></van-tab>
          <van-tab title="套餐" name="套餐"></van-tab>
        </van-tabs>
      </div> -->
      <div class="tab-bar">
        <van-tabs v-model:active="active" title-active-color="#007bff">
          <van-tab title="计算" name="计算">
            <img :src="couser?.detailUrls[0]" class="imgs" />
          </van-tab>
          <van-tab title="章节" name="章节">
            <div class="view-content">
              <div class="videos" v-for="(item, index) in videoList" :key="item.id">
                <div class="chapters">第{{ index + 1 }}章 {{ item.name }}</div>
                <div class="sections" v-for="i in item.sectionList" :key="i.id">
                  <div class="iconfont"><van-icon name="arrow" /></div>
                  <div class="row">{{ `${index + 1}-${i.id}` }} {{ i.name }}</div>
                  <div class="see">{{ i.isFree === 0 ? '试看' : '' }}</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="评论" name="评论">
            <div class="view-comment">
              <div class="comments" v-for="item in commentList" :key="item.id">
                <div class="top">
                  <div class="img">
                    <img :src="item.userImage" alt="" v-if="item.userImage" />
                    <img src="@/assets/book.svg" alt="" v-else />
                  </div>
                  <div class="user">
                    <p>{{ item.nickName }}</p>
                    <p>{{ item.createDate }}</p>
                  </div>
                  <van-icon
                    name="like"
                    :class="{
                      active: item.isGood === 1
                    }"
                  />
                </div>
                <div class="cons">
                  {{ item.content }}
                </div>
                <div class="child" v-if="item.children">
                  {{ item.children?.nickName }}回复：{{ item.children?.content }}
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="套餐" name="套餐">
            <div class="view-group">
              <div class="groups" v-for="item in groupList" :key="item.id">
                <p class="texts">{{ item.title }}</p>
                <div class="item" v-for="i in item.list" :key="i.id" @click="handleDetail(i.id)">
                  <div class="img">
                    <img
                      :src="
                        i.mainImage.includes('http')
                          ? i.mainImage
                          : 'http://m.mengxuegu.com' + i.mainImage
                      "
                    />
                    <div class="time">
                      {{ i.totalTime }}
                    </div>
                  </div>
                  <div class="text">
                    <h4>{{ i.title }}</h4>
                    <div class="fot">
                      <p class="icon"><van-icon name="manager" />{{ i.nickName }}</p>
                      <p>
                        <span class="price"
                          ><van-icon name="balance-o" v-if="i.isFree === 0" />{{
                            i.isFree === 0 ? i.priceDiscount : '免费'
                          }}</span
                        >
                        <span class="view"
                          ><van-icon name="play-circle-o" />{{ i.studyTotal }}人在学</span
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <div class="prices">
                  <p>
                    <span>￥{{ item.totalPrice }}</span>
                    <span>￥{{ item.groupPrice }}</span>
                  </p>
                  <p>购买套餐</p>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 立即购买 -->
    <div class="fots">
      <van-button type="primary" round block>立即购买</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.course-detail-page {
  box-sizing: border-box;
  padding-bottom: 100px;
}

.title {
  width: 100%;
  background-color: var(--cp-bg);
  height: 50px;
  color: #fff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  position: fixed;
  top: 0;
  z-index: 999;

  .van-icon {
    width: 60px;
    font-size: 24px;
  }

  p {
    font-weight: bold;
    font-size: 16px;
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.head {
  height: 345px;
  width: 100%;
  position: relative;
  box-sizing: border-box;

  .img {
    height: 210px;

    img {
      width: 100%;
      height: 100%;
    }

    span {
      color: #fff;
      position: absolute;
      top: 5px;
      left: 5px;
      font-size: 22px;
      display: inline;
      width: 32px;
      height: 32px;
      line-height: 35px;
      background-color: #00000091;
      border-radius: 100%;
      text-align: center;
    }
  }

  .con {
    height: 135px;
    background-color: var(--cp-plain);
    padding: 12px 0;
    box-sizing: border-box;

    .info {
      background-color: #fff;
      height: 111px;
      padding: 12px;
      box-sizing: border-box;

      .price-info {
        box-sizing: border-box;

        span:nth-child(1) {
          color: var(--cp-price);
          font-size: 23px;
          font-weight: 700;
          margin-right: 10px;
        }

        span:nth-child(2) {
          color: var(--cp-tip);
          font-size: 15px;
          text-decoration-line: line-through;
          margin-right: 10px;
        }

        span:nth-child(3) {
          color: var(--cp-price);
          font-size: 12px;
          display: inline-block;
          padding: 1px;
          border-radius: 5px;
          border: 1px solid var(--cp-price);
        }
      }

      .title-info {
        font-size: 17px;
        font-weight: 700;
        padding-left: 4px;
      }

      .count-info {
        box-sizing: border-box;
        padding: 7px 0;

        span {
          display: inline-block;
          font-size: 12px;
          background-color: var(--cp-plain);
          padding: 7px;
          margin-right: 10px;
          border-radius: 15px;
          color: var(--cp-text4);
        }
      }
    }
  }
}

.fots {
  background-color: #fff;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  padding-left: 12px;
  padding-top: 5px;
  box-sizing: border-box;

  .van-button {
    background-color: var(--cp-bg);
    height: 40px;
    width: 350px;
    font-size: 17px;
  }
}

:deep() {
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
}

.tab-bars {
  position: fixed;
  top: 50px;
  width: 100%;

  .imgs {
    width: 100%;
  }
}

.center {
  box-sizing: border-box;

  .tab-bar {
    .imgs {
      width: 100%;
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

          .see {
            flex-shrink: 1;
            font-size: 12px;
            color: var(--cp-text1);
            margin-left: 10px;
          }
        }
      }
    }

    .view-comment {
      box-sizing: border-box;
      padding: 10px 20px;

      .comments {
        border-bottom: 1px solid var(--cp-line);
        padding: 15px 0;

        .top {
          display: flex;
          box-sizing: border-box;
          align-items: center;

          .img {
            width: 35px;
            height: 35px;
            background-color: var(--cp-plain);
            border-radius: 100%;
            margin-right: 10px;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .user {
            flex: 1;

            p:nth-child(1) {
              font-weight: 700;
              font-size: 15px;
              color: var(--cp-text2);
            }

            p:nth-child(2) {
              font-size: 13px;
              color: var(--cp-text4);
            }
          }
        }

        .cons {
          font-size: 16px;
          margin: 10px 0;
        }

        .child {
          background-color: var(--cp-plain);
          padding: 7px;
          border-radius: 5px;
          font-size: 15px;
          color: var(--cp-text4);
        }
      }
    }

    .view-group {
      box-sizing: border-box;
      padding: 15px;

      .groups {
        border-radius: 5px;
        box-shadow: 0 0 5px 0 #ccc;
        box-sizing: border-box;
        padding: 5px;
        margin-bottom: 20px;

        .texts {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .item {
          height: 100px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--cp-line);

          .img {
            position: relative;

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
              right: 3px;
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
            margin-left: 10px;
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

              .price {
                color: var(--cp-price);
                display: inline-block;
                width: 70px;
              }

              .view {
                font-size: 13px;
              }
            }
          }
        }

        .prices {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          align-items: center;

          p:nth-child(1) {
            span:nth-child(1) {
              color: var(--cp-price);
              font-size: 18px;
              font-weight: 700;
              margin-right: 5px;
            }
            span:nth-child(2) {
              color: var(--cp-text4);
              font-size: 15px;
              text-decoration-line: line-through;
            }
          }
          p:nth-child(2) {
            color: var(--cp-price);
            font-weight: 700;
            font-size: 15px;
          }
        }
      }
    }
  }
}

.active {
  color: var(--cp-price);
}
</style>
