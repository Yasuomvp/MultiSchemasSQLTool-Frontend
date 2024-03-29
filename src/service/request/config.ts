// 根据process.env.NODE_ENV 区分
// 开发环境: development
// 生成环境：production
// 测试环境: test

let BASE_URL = ''

const TIME_OUT = 300000

if (process.env.NODE_ENV === 'development') {
  // 这里BASE_URL 后地址根据实际项目服务器地址填写，这里是示例
  BASE_URL = 'http://localhost:8080'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://workout996.icu/prod'
} else {
  BASE_URL = 'http://workout996.icu/prod'
}

export { BASE_URL, TIME_OUT }
