import request from '@/plugins/service'

export const storeInfo = (store_id) => { //店铺基本信息
    return request({
        url: '/store/storeInfo/' + store_id,
        method: 'post'
    })
}
export const storeList = (params) => { //店铺列表
    return request({
        url: '/storeList',
        method: 'post',
        data: params
    })
}

export const storeIndex = (id) => { //店铺首页
    return request({
        url: '/store/storeIndex/' + id,
        method: 'post',
    })
}
export const storeIndexComments = (id) => { //店铺首页评价
    return request({
        url: '/store/storeIndexComments/' + id,
        method: 'get',
    })
}
export const serviceList = (params) => { //店铺买服务
    return request({
        url: '/store/serviceList',
        method: 'post',
        data: params
    })
}
export const archive = (id) => { //店铺档案
    return request({
        url: '/store/archive/' + id,
        method: 'get',
    })
}
export const storeComments = (id) => { //店铺交易评价
    return request({
        url: '/store/storeComments/' + id,
        method: 'get',
    })
}

export const getCaseList = (id) => { //店铺客户合作示例列表
    return request({
        url: '/case/list/' + id,
        method: 'get',
    })
}
export const getCaseInfo = (id) => { //获取客户合作示例详情
    return request({
        url: '/case/getCaseInfo/' + id,
        method: 'get',
    })
}
export const techRateList = () => { //技术费率详情
    return request({
        url: '/skill/techRateList',
        method: 'get',
    })
}
export const filtrateList = () => { //店铺筛选数据列表
    return request({
        url: '/store/filtrateList',
        method: 'get',
    })
}
export const caseListHttp = (id, page) => { //店铺筛选数据列表
    return request({
        url: `/case/list/${id}?page=${page}`,
        method: 'get',
    })
}


/**
 bankList().then(res => {
                    let {code, message, data} = res.data
                    if (code === 200) {
                        this.bankList = data;
                        this.$message({title: '成功', message: '验证码已发送', type: 'success'});
                    } else {
                        this.$message.error({title: '错误提示', message: message});
                    }
                }).catch(err => {
                    this.$message.error({title: '错误提示', err});
                })
 */