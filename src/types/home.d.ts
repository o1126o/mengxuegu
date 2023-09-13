// 轮播图
export type bannerHomes = {
  id: number
  title: string
  imageUrl: string
  background: string
  advertUrl: string
}
// 分类列表内容
export type labels = {
  id: number | string
  name: string
}
// 分类数据列表
export type labelHomes = {
  id: number | string
  name: string
  labelList: labels[]
}

// 列表
export type searchHomes = {
  currents: number
  size: number
  sort?: string
  isFree?: number
}
export type searchHomesList = {
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
export type searchHomesLists = {
  total: number
  records: searchHomesList[]
}

//阅读请求
export type Articlereq = {
  current: number
  size: number
  categoryId?: string | number
}
//阅读响应
export type Articleres = {
  total: number
  records: ArticleType[]
}
//阅读数据
export type ArticleType = {
  id: string | number
  imageUrl: string
  nickName: string
  summary: string
  thumhup: number
  title: string
  updateDate: string
  userId: string | number
  viewCount: number
}
