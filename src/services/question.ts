import request from '@/utils/request'
import type { tabNavQuery, questListType, ReplyType, ComType } from '@/types/request'
import type { bannerHomes } from '@/types/home'

// 问答列表
export const questList = (data: tabNavQuery, questType: string) => {
  return request<questListType>(`/question/api/question/${questType}`, 'POST', data)
}
export const bannerHomeList = () => {
  return request<bannerHomes>('/article/api/advert/show')
}

// 是否关注问题
export const questStar = (id: string | number | string[]) => {
  return request(`/question/question/star/${id}`, 'PUT')
}

// 回答问题
export const questContent = (data: ReplyType) => {
  return request('/question/reply', 'POST', data)
}

// 发布文章评论
export const articleCom = (data: ComType) => {
  return request('/article/comment', 'POST', data)
}
