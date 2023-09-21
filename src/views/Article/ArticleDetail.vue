<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { ArticleDataList, ArticleCommons } from '@/types/user'
import { articleApi, articleComment } from '@/services/user'
import { articleCom } from '@/services/question'
import { showSuccessToast } from 'vant'
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

const artDetails = ref<ArticleDataList>()
const artComment = ref<ArticleCommons[]>()
const queryArticleDet = async () => {
  const ArticleDetailRef = await articleApi(route.params.id)
  artDetails.value = ArticleDetailRef.data
  const ArticleCommentRef = await articleComment(route.params.id)
  artComment.value = ArticleCommentRef.data
}
const queryArticleDets = async () => {
  const ArticleCommentRef = await articleComment(route.params.id)
  artComment.value = ArticleCommentRef.data
}

onMounted(() => {
  queryArticleDet()
  queryArticleDets()
})

const token = ref(localStorage.getItem('userInfo'))
// 评论
const input = ref<string>('')
// 提交
const handleCOM = () => {
  if (!token.value) {
    router.push('/login')
  } else {
    if (input.value !== '') {
      articleCom({ content: input.value, articleId: route.params.id })
      queryArticleDets()
      input.value = ''
      showSuccessToast('评论成功')
    }
  }
}
</script>

<template>
  <div class="article-detail-page">
    <!-- 标题 -->
    <div class="top">
      <van-icon name="arrow-left" @click="hanleBach" />
      <p>{{ artDetails?.title }}</p>
    </div>
    <!-- 文章内容 -->
    <div class="articles">
      <!-- 文章标签 -->
      <div class="tag">
        <p v-for="i in artDetails?.labelList" :key="i.id">{{ i.name }}</p>
      </div>
      <h2>{{ artDetails?.title }}</h2>
      <div class="user">
        <img :src="artDetails.imageUrl" alt="" v-if="artDetails?.imageUrl" />
        <img src="@/icon/menu.png" alt="" v-else />
        <p class="name">{{ artDetails?.nickName }}</p>
        <p class="update">· {{ artDetails?.updateDate }}</p>
        <p class="update">· {{ artDetails?.viewCount }}人阅读</p>
      </div>
      <div class="htmls">
        <p v-html="artDetails?.htmlContent"></p>
      </div>
    </div>
    <div class="drak"></div>
    <!-- 热门评论 -->
    <div class="hotpl">
      <div class="com">
        <p></p>
        <h3>热门评论</h3>
      </div>
      <div class="item" v-for="item in artComment" :key="item.id">
        <img :src="item.userImage" alt="" v-if="item?.userImage" />
        <img src="@/icon/menu.png" alt="" v-else />
        <div class="mid">
          <p>
            <span>{{ item.nickName }}</span>
            <span>{{ item.createDate }}</span>
          </p>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <!-- 提交评论 -->
    <div class="fot">
      <input type="text" placeholder="有何高见,展开讲讲......" v-model="input" />
      <van-button size="mini" @click="handleCOM">提交</van-button>
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

  p {
    font-weight: bold;
    font-size: 16px;
    width: 230px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  }
}

.drak {
  width: 100%;
  height: 10px;
  background-color: var(--cp-text3);
}

.fot {
  box-sizing: border-box;
  background-color: #fff;
  height: 60px;
  border-top: 1px solid var(--cp-line);
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 8888;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;

  input {
    background-color: var(--cp-text3);
    border: 0;
    border-radius: 20px;
    padding: 7px;
    box-sizing: border-box;
    width: 85%;
    height: 37px;
  }

  .van-button {
    width: 13%;
    height: 30px;
    background-color: var(--cp-text3);
    color: var(--cp-tip);
  }
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
    align-items: center;
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
      p:nth-child(2) {
        font-size: 15px;
      }
    }
  }
}
</style>
