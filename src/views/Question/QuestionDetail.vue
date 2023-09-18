<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { QuestionReply, QuestionDataList } from '@/types/user'
import { questionApi, questionReply } from '@/services/user'
const router = useRouter()
const route = useRoute()
// 路由返回
const hanleBach = () => {
  // 判断历史记录中是否有回退
  if (history.state?.back) {
    console.log(history.state?.back)
    router.back()
  } else {
    router.push('/')
  }
}

const queDetails = ref<QuestionDataList>()
const queComment = ref<QuestionReply[]>()
const queryQuestionDet = async () => {
  const QuestionDetailRef = await questionApi(route.params.id)
  queDetails.value = QuestionDetailRef.data
  console.log(QuestionDetailRef)
  const QuestionCommentRef = await questionReply(route.params.id)
  queComment.value = QuestionCommentRef.data
  console.log(QuestionCommentRef)
}

onMounted(() => {
  queryQuestionDet()
})

const token = ref(localStorage.getItem('userInfo'))

// 关注问题
const handleLike = () => {
  if (!token.value) {
    router.push('/login')
  }
}
// 回答问题
const handleLabel = () => {
  if (!token.value) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="question-detail-page">
    <!-- 标题 -->
    <div class="top">
      <van-icon name="arrow-left" @click="hanleBach" />
    </div>
    <!-- 问答内容 -->
    <div class="articles">
      <!-- 问答标签 -->
      <div class="tag">
        <p v-for="i in queDetails?.labelList" :key="i.id">{{ i.name }}</p>
      </div>
      <h2>{{ queDetails?.title }}</h2>
      <div class="user">
        <img :src="queDetails.userImage" alt="" v-if="queDetails?.userImage" />
        <img src="@/icon/menu.png" alt="" v-else />
        <p class="name">{{ queDetails?.nickName }}</p>
        <p class="update">· {{ queDetails?.updateDate }}</p>
        <p class="update">· {{ queDetails?.viewCount }}人阅读</p>
      </div>
      <div class="htmls">
        <p v-html="queDetails?.htmlContent"></p>
      </div>
    </div>
    <div class="drak"></div>
    <!-- 问答评论 -->
    <div class="hotpl">
      <div class="com">
        <p></p>
        <h3>1个回答</h3>
      </div>
      <div class="item" v-for="item in queComment" :key="item.id">
        <img :src="item.userImage" alt="" v-if="item?.userImage" />
        <img src="@/icon/menu.png" alt="" v-else />
        <div class="mid">
          <p>
            <span>{{ item.nickName }}</span>
            <span>{{ item.createDate }}</span>
          </p>
          <div v-if="item.htmlContent.includes('div')" class="htmlContent">
            <div v-html="item.htmlContent"></div>
          </div>
          <p v-else class="htmlContent">
            {{ item.htmlContent }}
          </p>
        </div>
      </div>
    </div>
    <!-- 问题 -->
    <div class="footer">
      <p><van-icon name="like-o" @click="handleLike" />关注问题</p>
      <p><van-icon name="label-o" @click="handleLabel" />回答问题</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-detail-page {
  box-sizing: border-box;
  padding-bottom: 100px;
  padding-top: 50px;
}

.top {
  width: 100%;
  background-color: #fff;
  height: 50px;
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
}

.articles {
  box-sizing: border-box;
  padding: 10px;

  .tag {
    width: 100%;
    display: flex;

    p {
      border-radius: 15px;
      border: 1px solid var(--cp-text1);
      color: var(--cp-text1);
      font-size: 12px;
      padding: 3px 5px;
      margin-right: 10px;
    }
  }

  h2 {
    margin: 10px 0;
  }

  .user {
    display: flex;
    width: 100%;
    align-items: center;

    img {
      width: 21px;
      height: 21px;
      border-radius: 50%;
    }

    .name {
      margin: 0 3px;
      font-size: 15px;
    }

    .update {
      font-size: 13px;
      color: var(--cp-dark);
      margin-top: 2px;
    }
  }

  .htmls {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    margin-top: 15px;
    font-size: 17px;
  }
}

.drak {
  width: 100%;
  height: 10px;
  background-color: var(--cp-text3);
}

.hotpl {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;

  .com {
    display: flex;
    align-items: center;

    p {
      width: 2.5px;
      height: 20px;
      background-color: var(--cp-primary);
      margin-right: 10px;
    }
  }

  .item {
    display: flex;
    align-items: stretch;
    padding: 15px 5px;
    box-sizing: border-box;

    img {
      width: 27px;
      height: 27px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .mid {
      flex: 1;

      p:nth-child(1) {
        color: var(--cp-text4);
        font-size: 13px;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .htmlContent {
        font-size: 15px;
      }
    }
  }
}

.footer {
  box-sizing: border-box;
  background-color: var(--cp-plain);
  height: 40px;
  border-top: 1px solid var(--cp-line);
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 8888;
  display: flex;
  align-items: center;
  padding: 10px;
  p {
    width: 50%;
    text-align: center;
    font-size: 15px;
    color: var(--cp-text1);
    font-weight: 700;
  }
}
</style>
