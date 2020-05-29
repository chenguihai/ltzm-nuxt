import request from '@/plugins/service'

export const checkReturnMargin = () => { //退还保证金状态检测
    return request({
        url: '/skill/checkReturnMargin',
        method: 'get',
    })
}
export const payment = (params) => { //缴纳保证金
    return request({
        url: '/skill/payment',
        method: 'post',
        data: params
    })
}
export const getMargin = (params) => { //当前保证金缴纳记录列表
    return request({
        url: '/skill/getMargin',
        method: 'post',
        data: params
    })
}
export const unpaidList = () => { //未缴纳保证金列表
    return request({
        url: '/skill/list',
        method: 'get'
    })
}
export const bankList = () => { //退还保证金 银行卡列表
    return request({
        url: '/skill/bankList',
        method: 'get'
    })
}
export const returnMargin = (params) => { //退还保证金
    return request({
        url: '/skill/returnMargin',
        method: 'post',
        data: params
    })
}
export const marginOrder = (params) => { //保证金下单
    return request({
        url: '/skill/marginOrder',
        method: 'post',
        data: params
    })
}
export const applyOpen = () => { //申请开通店铺
    return request({
        url: '/shop/applyOpen',
        method: 'get',
    })
}
export const getData = () => { //服务商首页交易动态
    return request({
        url: '/shop/getData',
        method: 'get',
    })
}

