import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface SqlToolRequestInterceptors {
  requestIntercetor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestIntercetorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface SqlToolRequestConfig extends AxiosRequestConfig {
  interceptors?: SqlToolRequestInterceptors
}
