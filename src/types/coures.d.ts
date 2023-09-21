// 课程内容
export type CouresIn = {
  id?: number
  userId?: number
  nickName?: string
  userImage?: string
  title?: string
  totalTime?: string
  studyTotal?: number
  goodRate?: string
  mainImage?: string
  isFree?: number
  priceOriginal?: number
  priceDiscount?: number
  detailUrls?: string[]
}

// 视频章节
export type Section = {
  id: number
  name: string
  isFree: number
  videoUrl?: string // videoUrl 是可选的属性
}
export type DataItem = {
  id: number
  name: string
  sectionList?: Section[] // sectionList 是可选的属性
}
export type VideoData = DataItem[] // 定义数据类型为 DataItem 的数组

// 评论
export type Comment = {
  id: number
  parentId: string
  userId: number
  nickName: string
  userImage: string | null
  isGood: number
  content: string
  createDate: string
  children: Comment | null
}
export type CommentData = Comment[] // 定义数据类型为 DataItem 的数组\

// 套餐
export type PackageItem = {
  id: number
  userId: number
  nickName: string
  userImage: string
  title: string
  totalTime: string
  studyTotal: number
  commTotal: number
  mainImage: string
  isFree: number
  priceOriginal: number
  priceDiscount: number
}

export type PackageInfo = {
  id: number
  title: string
  groupPrice: number
  totalPrice: number
  list: PackageItem[]
}

// 课程评价
export type CoureStar = {
  content: string
  courseId: string | string[]
  nickName?: string
  score: number
  userId?: number
  userImage?: string
}
