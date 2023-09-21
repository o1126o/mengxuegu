<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
import { MyOrder, orderCancel, orderDel } from '@/services/user'
import type { creaderOrder } from '@/types/user'
import { onMounted, ref } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
const list = ref<creaderOrder[]>([])
const aueryList = async () => {
  const res = await MyOrder()
  list.value = res.data
}
onMounted(() => {
  aueryList()
})

// 跳转详情
const handleDetail = (id: number) => {
  router.push(`/course/details/${id}`)
}

// 取消订单
const handleCancelOrder = (orderId: number | string) => {
  showConfirmDialog({
    message: '确定取消该订单记录'
  })
    .then(() => {
      // on confirm
      orderCancel(orderId)
      showToast('取消成功')
      aueryList()
    })
    .catch(() => {
      // on cancel
    })
}
// 取消订单
const handleDelOrder = (orderId: number | string) => {
  showConfirmDialog({
    message: '确定删除该订单记录'
  })
    .then(() => {
      orderDel(orderId)
      showToast('删除成功')
      aueryList()
    })
    .catch(() => {
      // on cancel
    })
}

// 立即支付
const handlePay = (id: number | string, price: string | number) => {
  router.push({
    path: '/order/order',
    query: { id, price }
  })
}
</script>

<template>
  <div class="my-list-page">
    <van-nav-bar title="我的订单" left-arrow @click-left="router.back()" />
    <div class="box" v-for="item in list" :key="item.id">
      <p class="time">
        <span>{{ item.createDate }}</span>
        <span>订单号：{{ item.orderId }}</span>
      </p>
      <div class="item" v-for="i in item.courseList" :key="i.id" @click="handleDetail(i.id)">
        <div class="img">
          <img
            :src="
              i.mainImage.includes('http') ? i.mainImage : 'http://m.mengxuegu.com' + i.mainImage
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
              <span class="price">
                <van-icon name="balance-o" v-if="i.isFree === 0" />{{
                  i.isFree === 0 ? i.priceDiscount : '免费'
                }}
              </span>
              <span class="view"><van-icon name="play-circle-o" />{{ i.studyTotal }}人在学</span>
            </p>
          </div>
        </div>
      </div>
      <p class="prices">
        实付：<span>￥{{ item.priceDiscount }}</span>
      </p>
      <div class="pay" v-if="item.status === 1">
        <p class="red">待支付</p>
        <p>
          <van-button size="small" class="btn" @click="handleCancelOrder(item.orderId)"
            >取消订单</van-button
          >
          <van-button size="small" type="danger" @click="handlePay(item.orderId, item.pricePayable)"
            >立即支付</van-button
          >
        </p>
      </div>
      <div class="pay" v-if="item.status === 2">
        <p class="grey">交易成功</p>
      </div>
      <div class="pay" v-if="item.status === 3">
        <p class="grey">交易关闭</p>
        <p>
          <van-button size="small" class="btn" @click="handleDelOrder(item.orderId)"
            >删除订单</van-button
          >
        </p>
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
}

.my-list-page {
  box-sizing: border-box;

  .box {
    border-bottom: 1px solid var(--cp-plain);
    padding: 10px;

    .time {
      font-size: 12px;
      color: var(--cp-text4);

      span {
        margin-right: 5px;
      }
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
      justify-content: flex-end;
      align-items: center;
      height: 40px;

      span {
        color: var(--cp-price);
        font-size: 18px;
      }
    }

    .pay {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .red {
        color: var(--cp-price);
      }

      .grey {
        color: var(--cp-text4);
      }

      .btn {
        background-color: var(--cp-plain);
        margin-right: 10px;
      }
    }
  }
}
</style>
