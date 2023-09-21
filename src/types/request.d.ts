export type Data<T> = {
  code: number
  message: string
  data: T
}

// 头部切换列表
export type tabNavType = 'hot' | 'new' | 'wait'

// 分页
export type tabNavQuery = {
  current: number
  size: number
}

// 头部切换列表
export type tabNavLists = {
  id: number
  value: string
  type: string
}

// 数据列表
export type questListItem = {
  id: number
  userId: number
  nickName: string
  userImage: string
  title: string
  viewCount: number
  thumhup: number
  reply: number
  status: number
  createDate: string
  updateDate: string
}
export type questListType = {
  total: number
  records: questListItem[]
}

// 回答问题
export type ReplyType = {
  htmlContent: string
  mdContent: string
  questionId: string | string[]
}

// 发布评论
export type ComType = {
  content: string
  articleId: string | string[]
}
