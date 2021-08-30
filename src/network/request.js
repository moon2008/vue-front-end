import axios from 'axios'
export function request (config) {
  const instance = axios.create({
    baseURL: 'http://learning.platform.com/',
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 如果有一个接口需要认证才能访问到，在这里统一设置

    // 直接放行
    return config
  }, err => {
    return Promise.reject(err)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res.data)
    return res.data ? res.data : res
  }, err => {
    return Promise.reject(err)
    // 如果有需要授权才可以访问的接口，统一去Login授权
    // 如果有错误，这里会去处理，显示错误信息
  })
  return instance(config)
}
