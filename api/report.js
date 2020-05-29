import request from '@/plugins/service'
let apiUrl = '/api'
let urlArr = {
    commonTipOffs:`/common/tipOffs`,
    commonAddTipOffs:`/common/addTipOffs`,
    captcha:`/common/captcha`,
}
export const report = {
    tipOffs:(data) => {
        return request({
            url: urlArr.commonTipOffs,
            method: 'POST',
            data:data
        })
    },
    addTipOffs:(data) => {
        return request({
            url: urlArr.commonAddTipOffs,
            method: 'POST',
            data:data
        })
    },
    captcha:() => {
        return request({
            url: urlArr.captcha,
            method: 'get',
        })
    }
}

