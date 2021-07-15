import axios, { AxiosError } from 'axios'
import { Loading, Message } from 'element-ui';
import { getToken } from '../../utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) { // 携带token
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { code, message } = response.data
  if (code !== 0) { // 错误提示
    Message.error({message:message})
    return Promise.reject(message)
  }
  return response.data
}, (error) => {
  const res = error?.response
  if (res && res.status === 401) { // 未登录 token失效
    store.dispatch('user/resetToken').then(() => {
      window.location.reload()
    })
  }
  Message.error({message:error.message})
  return Promise.reject(error)
})

export default service