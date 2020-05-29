/**
 * 此文件放api列表
 */

import request from '@/plugins/service'

/**
 * 找回密码最后一步确认
 * @param mobile
 */
export const forgetConfirm = (data) => {
    return request({
        url: '/member/changepassword',
        method: 'post',
        data: data
    })
}

/**
 * 忘记密码，找回密码短信验证
 * @param mobile
 * @param verification_key
 * @param verification_code
 */
export const forgetVerifyFn = (data) => {
    return request({
        url: '/member/checkpasswordsms',
        method: 'post',
        data: data
    })
}
/**
 * 忘记密码短信，更改密码短信
 * @param mobile
 */
export const forgetCode = (mobile) => {
    return request({
        url: '/member/forgetsms',
        method: 'post',
        data: mobile
    })
}


