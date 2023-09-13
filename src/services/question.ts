import request from '@/utils/request'
import type { tabNavQuery, questListType } from '@/types/request'
import type { bannerHomes } from '@/types/home'

// 问答列表
export const questList = (data: tabNavQuery, questType: string) => {
  return request<questListType>(`/question/api/question/${questType}`, 'POST', data)
}
export const bannerHomeList = () => {
  return request<bannerHomes>('/article/api/advert/show')
}
