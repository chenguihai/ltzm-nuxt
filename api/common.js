import request from '@/plugins/service'
import axios from 'axios'
import config from "@/config/index";
export const commonTop = () => { //头部公共接口
    return request({
        url: '/common/top',
        method: 'get'
    })
}
export const removeFile = (data) => { //头部公共接口
    const { UPLOAD_IMAGE_URL } = config;
    return axios.post(UPLOAD_IMAGE_URL + '/admin/removeFile', data)
}


export const getHeader = () => {
    return request({
        url: '/header',
        method: 'get'
    })
}

// 刷新Token
export const refreshToken = () => {
    return request({
        url: '/member/authorizations/current',
        method: 'put'
    })
}
export const requestFoot = () => {
    return request({
        url: '/foot',
        method: 'get'
    })
}