// 仅示例
import request from '@renderer/utils/request'
export function message() {
  return request({
    url: '/message',
    method: 'get'
  })
}
