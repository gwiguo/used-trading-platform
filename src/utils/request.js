// http.ts
import axios from 'axios'

const service = axios.create({
  // 联调
  //   baseURL: process.env.NODE_ENV === 'production' ? `/` : '/apis',
  //   headers: {
  //     get: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //     },
  //     post: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     }
  //   },
  timeout: 30000,
})

// 请求拦截器
service.interceptors.request.use((config) => {
  return config
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use(async (response) => {
  const status = response.status
  await new Promise(resolve => {
    setTimeout(() => { resolve() }, 500)
  })
  return response.data
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  return Promise.resolve(error)
})

export default service
