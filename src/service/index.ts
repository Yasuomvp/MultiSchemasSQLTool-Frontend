import SqlToolRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'

const sqlToolRequest = new SqlToolRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercetor: (config) => {
      // console.log('请求成功拦截')
      return config
    },
    requestIntercetorCatch: (err) => {
      // console.log('请求拦截失败')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default sqlToolRequest
