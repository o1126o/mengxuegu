import request from '@/utils/request'
import type {
  bannerHomes,
  labelHomes,
  searchHomesLists,
  searchHomes,
  Articleres
} from '@/types/home'
import type { questListType } from '@/types/request'

// 轮播图
export const bannerHomeList = () => {
  return request<bannerHomes[]>('/article/api/advert/show/1')
}

// 分类名称列表
export const labelHomeList = () => {
  return request<labelHomes[]>('/article/api/category/label/list')
}

// 列表 | 搜索
export const searchHomeList = (data: searchHomes) => {
  return request<searchHomesLists>('/course/api/course/search', 'POST', data)
}

//阅读 | 搜索
export const getArticle = (data: searchHomes) => {
  return request<Articleres>('/article/api/article/search', 'POST', data)
}

// 问答搜索
export const queryQuest = (data: searchHomes) => {
  return request<questListType>('/question/api/question/search', 'POST', data)
}
