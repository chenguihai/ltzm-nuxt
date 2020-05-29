import request from '@/plugins/service'


let urlArr = {
    /*-----------店铺---------- */
    GetInfo: '/shop/getShopInfo',
    AddBaseInfo: '/shop/add',
    EditBaseInfo: '/shop/edit',
    NaturesList: '/shop/natures',
    ScalesList: '/shop/scales',
    /*-----------工作---------- */
    jobList: '/experience/list',
    jobAdd: '/experience/add',
    jobDel: `/experience/delete`,
    /*-----------自传资质---------- */
    AddSelfUpload: '/selfhonor/add',
    DelSelfUpload: '/selfhonor/delete',
    ListSelfUpload: '/shop/honortype',
    CurlistSelfUpload: '/selfhonor/list',
    /*-----------删除上传---------- */
    delFile: '/admin/removeFile',
    /*-----------媒介资质---------- */
    AddMedia: '/media/add',
    DelMedia: '/media/delete/',
    ListMedia: '/media/list',
    /*-----------隶属媒体公司---------- */
    AddBelong: '/media/company/add',
    DelBelong: '/media/company/delete/',
    ListBelong: '/media/company/list',
    /*-----------类目入驻---------- */
    AddCategory: '/skill/add',
    DelCategory: '/skill/deletecate',
    SearchCategory: '/skill/getcats',
    EditCategory: '/skill/adept',
    ListCatregoryReal: '/skill/getRealm',
    ListCatregory: '/skill/getCategory',
    /*-----------类目入驻---------- */
    AuthResult: '/store/sign/status',
    AuthPerSubmit: '/store/sign/useradd',
    /*-----------缴纳保证金---------- */
    securityNoPay: '/skill/list',
    securityList: '/skill/getMargin',
    sceurityPay: '/skill/payment',
    /*-----------企业认证-----------*/
    submitStep1: '/store/sign/checkcompany',
    submitStep2: '/store/sign/checkshareholder',
    submitStep3: '/store/sign/topay',
    submitStep4: '/store/sign/payAuth',
    searchAddr: '/store/sign/getbranch',


}

/*--------获取店铺信息方法----------*/
export const get_store_info = () => {
    return request({
        url: urlArr.GetInfo,
        method: 'get'
    })
}
/*--------获取公司性质列表----------*/
export const get_NaturesList = () => {
    return request({
        url: urlArr.NaturesList,
        method: 'get'
    })
}
/*--------获取公司规模----------*/
export const get_ScalesList = () => {
    return request({
        url: urlArr.ScalesList,
        method: 'get'
    })
}
/*--------保存店鋪基本信息----------*/
export const add_store_base_info = (data) => {
    return request({
        url: urlArr.AddBaseInfo,
        method: 'post',
        data
    })
}


/*--------保存店鋪工作信息----------*/
export const add_store_job_info = (data) => {
    return request({
        url: urlArr.jobAdd,
        method: 'post',
        data
    })
}
/*--------获取店铺工作方法----------*/
export const get_store_job_info = () => {
    return request({
        url: urlArr.jobList,
        method: 'get'
    })
}
/*--------删除店铺工作方法----------*/
export const del_store_job_info = (id) => {
    return request({
        url: `${urlArr.jobDel}/${id}`,
        method: 'get',
    })
}


/*--------新增店铺自传资质方法----------*/
export const add_store_upload_self = (data) => {
    return request({
        url: urlArr.AddSelfUpload,
        method: 'post',
        data
    })
}
/*--------删除店铺自传资质方法----------*/
export const del_store_upload_self = (id) => {
    return request({
        url: `${urlArr.DelSelfUpload}/${id}`,
        method: 'get',
    })
}

/*--------获取店铺自传资质列表方法----------*/
export const get_store_upload_self_list = () => {
    return request({
        url: urlArr.ListSelfUpload,
        method: 'get'
    })
}
/*--------获取店铺自传资质列表方法-用户----------*/
export const get_store_upload_self_user = () => {
    return request({
        url: urlArr.CurlistSelfUpload,
        method: 'get'
    })
}
/*--------媒介资质----------*/

export const medias = {
    addFn: (data) => {
        return request({
            url: urlArr.AddMedia,
            method: 'post',
            data
        })
    },
    delFn: (id) => {
        return request({
            url: urlArr.DelMedia + id,
            method: 'get',
        })
    },
    listFn: () => {
        return request({
            url: urlArr.ListMedia,
            method: 'get',
        })
    }
}

/*--------隶属媒体公司----------*/

export const mediaBelong = {
    addFn: (data) => {
        return request({
            url: urlArr.AddBelong,
            method: 'post',
            data
        })
    },
    delFn: (id) => {
        return request({
            url: urlArr.DelBelong + id,
            method: 'get',
        })
    },
    listFn: () => {
        return request({
            url: urlArr.ListBelong,
            method: 'get',
        })
    }
}


// 获取验证码-验证码登录
export const fast_login_code = (phone) => {
    return request({
        url: '/member/retrievepassword',
        method: 'post',
        data: phone
    })
}

export const fast_login_new = (phone) => {
    return request({
        url: '/member/registered/sms',
        method: 'post',
        data: phone
    })
}
/*--------类目入驻----------*/

export const categorys = {

    listReal: (data) => {
        return request({
            url: urlArr.ListCatregoryReal,
            method: 'get',
            data
        })
    },
    listCatregory: (data) => {
        return request({
            url: urlArr.ListCatregory,
            method: 'get',
            data
        })
    },
    addFn: (data) => {
        return request({
            url: urlArr.AddCategory,
            method: 'post',
            data
        })
    },
    delFn: (data) => {
        return request({
            url: urlArr.DelCategory,
            method: 'post',
            data
        })
    },
    editFn: (data) => {
        return request({
            url: urlArr.EditCategory,
            method: 'post',
            data
        })
    },
    searchFn: (data) => {
        return request({
            url: urlArr.SearchCategory,
            method: 'post',
            data
        })
    }
}

/*--------认证----------*/

export const Auth = {
    getResult: (data) => {
        return request({
            url: urlArr.AuthResult,
            method: 'post',
            data
        })
    },
    personVerify: (data) => {
        return request({
            url: urlArr.AuthPerSubmit,
            method: 'post',
            data
        })
    }
}
/*---------企业认证---------*/
export const AuthCompany = {
    submit1: (data) => {
        return request({url: urlArr.submitStep1, method: 'post', data})
    },
    submit2: (data) => {
        return request({url: urlArr.submitStep2, method: 'post', data})
    },
    submit3: (data) => {
        return request({url: urlArr.submitStep3, method: 'post', data})
    },
    submit4: (data) => {
        return request({url: urlArr.submitStep4, method: 'post', data})
    },
    search: (data) => {
        return request({url: urlArr.searchAddr, method: 'post', data})
    },
}
/*--------保证金----------*/

export const sceurity = {
    noPayList: (data) => {
        return request({
            url: urlArr.securityNoPay,
            method: 'get',
            data
        })
    },
    historyList: (data) => {
        return request({
            url: urlArr.securityList,
            method: 'post',
            data
        })
    },
    payMent: (data) => {
        return request({
            url: urlArr.sceurityPay,
            method: 'post',
            data
        })
    }
}

export function scalesList() { //获取公司规模列表
    return request({
        url: '/shop/scales',
        method: 'get',
    })
}

export function naturesList() { //获取公司性质列表
    return request({
        url: '/shop/natures',
        method: 'get',
    })
}

export function experienceEdit(id, data) { //编辑工作经历
    return request({
        url: '/experience/edit/' + id,
        method: 'post',
        data
    })
}
export function selfhonorEdit(id, data) { //编辑自传资质
    return request({
        url: '/selfhonor/edit/' + id,
        method: 'post',
        data
    })
}
export function mediaEdit(id, data) { //编辑媒介资质
    return request({
        url: '/media/edit/' + id,
        method: 'post',
        data
    })
}
export function companyEdit(id, data) { //编辑隶属媒体公司
    return request({
        url: '/media/company/edit/' + id,
        method: 'post',
        data
    })
}
export function downFile(id) { //案例传记购买后下载
    return request({
        url: '/casebiog/downFile?id='+id ,
        method: 'get',
    })
}
