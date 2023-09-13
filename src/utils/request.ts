import axios, { type Method } from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { showToast } from 'vant'
import type { Data } from '../types/request'

const instance = axios.create({ baseURL: '/dev-api', timeout: 3000 })

// 请求拦截
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    /* // 请求头
    if (store.user?.token) {
      config.headers.Authorization = 'Bearer ' + store.user.token
    } */
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code !== 20000) {
      // 业务码错误
      showToast(response.data.message)
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    // 处理token过期
    // if (error.response.status === 401) {
    //   // 清空信息，并回到登录页
    //   store.delUser()
    //   // currentRoute 属性来获取当前路由对象，并通过 value.fullPath 获取完整路径
    //   router.push(`/login?${router.currentRoute.value.fullPath}`)
    // }
    return Promise.reject(error)
  }
)

const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
