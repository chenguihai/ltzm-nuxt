import request from '@/plugins/service'

// 获取验证码
export const getVerifyCode = () => {
  return request({
    url: '/user/getVerifyCode',
    method: 'get'
  })
}

// 登录
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getUser (params) {
  return request({
    url: '/user/getUser',
    method: 'get',
    params: params
  })
}