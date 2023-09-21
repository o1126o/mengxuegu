import type { CommentData, CoureStar, CouresIn, PackageInfo, VideoData } from '@/types/coures'
import request from '@/utils/request'

// 课程内容
export const couresApi = () => {
  return request<CouresIn>('/course/api/course/null')
}
// 课程视频
export const couresVideo = () => {
  return request<VideoData>('/course/api/chapter/section/list/null')
}
// 评论
export const couresComment = () => {
  return request<CommentData>('/course/api/comment/list/null')
}
// 套餐
export const couresGroup = () => {
  return request<PackageInfo[]>('/course/api/group/list/null')
}

// 课程具体内容
export const couresDetailApi = (id: number | string | string[]) => {
  return request<CouresIn>(`/course/api/course/${id}`)
}

// 课程具体视频
export const couresVideoApi = (id: number | string | string[]) => {
  return request<VideoData>(`/course/course/buy/list/${id}`)
}

// 课程评价
export const couresStarApi = (data: CoureStar) => {
  return request('/course/comment', 'POST', data)
}

// 是否已购买
export const isBuyApi = () => {
  return request<any>('/course/course/is-buy/null')
}
