import type { CommentData, CouresIn, PackageInfo, VideoData } from '@/types/coures'
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
