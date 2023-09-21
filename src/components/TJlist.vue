<script setup lang="ts">
import type { searchHomesList } from '@/types/home'
defineProps<{
  item: searchHomesList
}>()
const emit = defineEmits<{
  (e: 'handleDetail', id: number): void
}>()
const handleDetail = (id: number) => {
  emit('handleDetail', id)
}
</script>

<template>
  <div class="div">
    <div class="list-page" @click="handleDetail(item.id)">
      <div class="img">
        <img
          :src="
            item.mainImage.includes('http')
              ? item?.mainImage
              : 'http://m.mengxuegu.com' + item?.mainImage
          "
        />
        <div class="time">
          {{ item.totalTime }}
        </div>
      </div>
      <div class="text">
        <h4>{{ item.title }}</h4>
        <div class="fot">
          <p class="icon"><van-icon name="manager" />{{ item.nickName }}</p>
          <p>
            <span class="price"
              ><van-icon name="balance-o" v-if="item.isFree === 0" />{{
                item.isFree === 0 ? item.priceDiscount : '免费'
              }}</span
            >
            <span class="view"><van-icon name="play-circle-o" />{{ item.studyTotal }}人在学</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-page {
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
</style>
