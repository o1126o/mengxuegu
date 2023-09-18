import request from '@/utils/request'
import type {
  Logins,
  AuthUserLogin,
  ArticleDataList,
  ArticleCommons,
  QuestionReply,
  QuestionDataList,
  creaderOrder,
  QueryZh
} from '@/types/user'
import type { searchHomesLists } from '@/types/home'

// 登录
export const loginApi = (data: Logins) => {
  return request<AuthUserLogin>('/auth/login', 'POST', { data })
}

// 退出登录
export const louOutApi = (token: string) => {
  return request(`/auth/logout/accessToken=${token}`)
}

// 我的订单
export const MyOrder = () => {
  return request<creaderOrder[]>('/pay/order/user/list', 'GET')
}
// 取消订单
export const orderCancel = (orderId: number | string) => {
  return request(`/pay/order/cancel/${orderId}`, 'PUT')
}
// 删除订单
export const orderDel = (orderId: number | string) => {
  return request(`/pay/order/${orderId}`, 'DELETE')
}

// 文章内容
export const articleApi = (id: string | string[]) => {
  return request<ArticleDataList>(`/article/api/article/${id}`)
}

// 文章评论
export const articleComment = (id: string | string[]) => {
  return request<ArticleCommons[]>(`/article/api/comment/list/${id}`)
}

// 问答文章
export const questionApi = (id: string | string[]) => {
  return request<QuestionDataList>(`/question/api/question/${id}`)
}

// 问答评论
export const questionReply = (id: string | string[]) => {
  return request<QuestionReply[]>(`/question/api/reply/list/${id}`)
}

// 搜索
export const searchApi = (data: QueryZh) => {
  return request<searchHomesLists>('/course/api/course/search', 'POST', { data })
}
