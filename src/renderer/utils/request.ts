import axios from 'axios'
import { message } from "ant-design-vue";
import { searchInfo } from '@renderer/global'
// 允许携带cookie
// axios.defaults.withCredentials = true

const serves = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true
})

// 设置请求发送之前的拦截器
serves.interceptors.request.use(config => {
  // 设置发送之前数据需要做什么处理
  return config
}, err => Promise.reject(err))

// 设置请求接受拦截器
serves.interceptors.response.use(res => {
  // 设置接受数据之后，做什么处理
  // if (res.data.code === 50000) {
  //   message.error(res.data.data)
  // }
  // console.log(res)
  return res
}, err => {
  searchInfo.state.isChanging = false
  // 判断请求异常信息中是否含有超时timeout字符串
  if (err.message.includes('timeout')) {
    console.log('错误回调', err)
    message.error('网络超时')
  }
  if (err.message.includes('Network Error')) {
    console.log('错误回调', err)
    message.error('服务器异常或网络连接异常')
  }
  return Promise.reject(err)
})

// 将serves抛出去
export default serves
