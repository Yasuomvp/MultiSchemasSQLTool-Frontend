import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { SqlToolRequestInterceptors, SqlToolRequestConfig } from './type'

class SqlToolRequest {
  // axios 实例
  instance: AxiosInstance
  // 拦截器对象
  interceptorsObj?: SqlToolRequestInterceptors
  // 使用拦截器
  constructor(config: SqlToolRequestConfig) {
    this.instance = axios.create(config)

    // 1. 使用实例拦截器
    this.interceptorsObj = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestIntercetor,
      this.interceptorsObj?.requestIntercetorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptor,
      this.interceptorsObj?.responseInterceptorCatch
    )

    // 2. 全局拦截器(所有实例都有的拦截器)
    this.instance.interceptors.request.use(
      (config: SqlToolRequestConfig) => {
        console.log('全局拦截器: 请求成功拦截')
        return config
      },
      //  请求失败拦截
      (err: any) => err
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('全局拦截器：响应成功拦截')
        return res
      },
      // 响应失败拦截
      (err: any) => err
    )
  }
  // 3. 为单个请求添加拦截器
  request(config: SqlToolRequestConfig): void {
    // 如果我们为单个请求添加拦截器，这里使用单个请求的拦截
    if (config.interceptors?.requestIntercetor) {
      config = config.interceptors.requestIntercetor(config)
    }
    this.instance.request(config).then((res) => {
      // 如果我们为单个响应添加拦截器，这里使用单个响应的拦截
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
}

export default SqlToolRequest

