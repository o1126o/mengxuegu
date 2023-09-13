import request from '@/utils/request'
import type {
  bannerHomes,
  labelHomes,
  searchHomesLists,
  searchHomes,
  Articleres,
  Articlereq
} from '@/types/home'

// 轮播图
export const bannerHomeList = () => {
  return request<bannerHomes[]>('/article/api/advert/show/1')
}

// 分类名称列表
export const labelHomeList = () => {
  return request<labelHomes[]>('/article/api/category/label/list')
}

// 列表
export const searchHomeList = (data: searchHomes) => {
  return request<searchHomesLists>('/course/api/course/search', 'POST', data)
}

//阅读
export const getArticle = (data: Articlereq) => {
  return request<Articleres>('article/api/article/search', 'POST', data)
}
