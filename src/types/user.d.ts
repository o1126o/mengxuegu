// 登录
export type Logins = {
  mobile: string
  code: string
}
// 用户信息
export type UserInfos = {
  uid: string
  username: string
  mobile: string
  sex: number
  nickName: string
  imageUrl: string
}
export type AuthUserLogin = {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: string
  scope: string
  jti: string
  userInfo: UserInfos
}

// 我的订单
import { PackageItem } from '@/types/coures'
export type creaderOrder = {
  id: number
  orderId: string
  userId: number
  pricePayable: number
  priceDiscount: number
  status: number
  updateDate: string
  createDate: string
  courseList: PackageItem[]
}

// 文章详情内容
export type Label = {
  id: number
  name: string
}
export type ArticleDataList = {
  id: number
  userId: number
  nickName: string
  userImage: string | null
  title: string
  summary: string
  viewCount: number
  thumhup: number
  createDate: string
  updateDate: string
  ispublic: number
  labelIds: number[]
  labelList: Label[]
  imageUrl: string | null
  mdContent: string
  htmlContent: string
}

// 文章评论
export type ArticleCommons = {
  id: number
  parentId: string
  userId: number
  nickName: string
  userImage: string
  articleId: string
  content: string
  createDate: string
}

// 问答详情
export type QuestionDataList = {
  id: string
  userId: string
  nickName: string
  userImage: string
  title: string
  viewCount: number
  reply: number
  star: number
  status: number
  createDate: string
  updateDate: string
  labelIds: number[]
  labelList: Label[]
  mdContent: string
  htmlContent: string
}

// 问答评论
export type QuestionReply = {
  id: number
  parentId: string
  userId: number
  nickName: string
  userImage: string
  questionId: string
  mdContent: string
  htmlContent: string
  createDate: string
}

// 我的学习
export type CourseStudy = {
  id: number
  title: string
  mainImage: string
  percent: number
}
