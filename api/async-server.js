import request from '~/plugins/service'
import { isObject } from '~/utils/tool'
import { Message } from 'element-ui'


// const _req = (app, args, extrajudicial) => {
//     let token = ''
//     if (app && app.store && app.store.state) {
//         token = app.store.state.access_token
//     }
//     const opts = Object.assign({}, args, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//     return {
//         req: service(opts),
//         app,
//         extrajudicial
//     }
// }

/**
 * @Description: 统一请求状态处理
 * @param {
 *  req 请求主体
 *  app 服务端渲染实例主体
 *  extrajudicial 额外规则
 * }
 * @return:
 * @Date: 2019-11-11 19:43:00
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
// export const reqStatus = async opts => {
//     const {
//         req,
//         app,
//         extrajudicial
//     } = opts
//     if (!req) return false
//     const resSync = await req.catch(e => {
//         if (e.data.code === 500 && !process.server) Message.error(e.data.message)
//         if (!app) return e
//         e.data && e.data.code === 401 && app.redirect('/login')
//     })

//     if (!resSync) return false
//     const {
//         data
//     } = resSync
//     if (data && extrajudicial && extrajudicial.code == 900) {
//         return data
//     } else if (data && (extrajudicial ? data.code === extrajudicial.code : data.code === 200)) {
//         return extrajudicial ? true : data.data
//     } else {
//         if (!process.server && Message) Message.error(data.message)
//         Promise.reject(resSync)
//         return false
//     }
// }



/* 获取店铺信息 */
export const _getStoreInfo = (app, store_id) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/store/storeInfo/${store_id}`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/store/storeInfo/${store_id}`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
    });

/**
 * @Description: 店铺信息初始化
 * @param {id | Number,store | Vue.Store}
 * @return:
 * @Date: 2019-10-26 14:36:23
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const storeInfoInit = async(app, id) => {
    const dataRes = await _getStoreInfo(app, id)
    const { data } = dataRes.data;
    data && app.store && app.store.commit('CHANGE_STORE_INFO', data)
    return data
}

/* 获取用户信息 */
export const _getUserInfo = app =>
    // reqStatus(
    //     _req(app, {
    //         url: `/user`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/user`,
        method: 'get'
    });

/**
 * @Description: 用户信息初始化
 * @param {id | Number,store | Vue.Store}
 * @return:
 * @Date: 2019-10-26 14:36:23
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
// export const userInfoInit = async app => {
//     const data = await _getUserInfo(app)
//     data && app.store && app.store.commit('CHANGE_USER_INFO', data)
//     return data
// }
/* 获取店铺首页 */
export const _getStoreIndex = (app, store_id) =>
    // reqStatus(_req(app, {
    //     url: `/store/storeIndex/${store_id}`,
    //     method: 'get'
    // }))
    request({
        url: `/store/storeIndex/${store_id}`,
        method: 'get'
    });

/**
 * @Description: 店铺首页初始化
 * @param {id | Number}
 * @return: Promise
 * @Date: 2019-10-26 14:38:10
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const storeIndexInit = async(app, id) => {
    const dataRes = await _getStoreIndex(app, id)
    const data = dataRes ? dataRes.data : ''
    return data
}

/* 获取店铺评价 */
export const _getStoreComments = (app, store_id, evaluate = 'good', page = 1, isIndex = true) => {
    const req_url = `/store/store${isIndex ? 'Index' : ''}Comments/${store_id}`
        // return reqStatus(
        //     _req(app, {
        //         url: req_url,
        //         method: 'post',
        //         data: {
        //             page,
        //             evaluate
        //         }
        //     })
        // )
    return request({
        url: req_url,
        method: 'post',
        data: {
            page,
            evaluate
        }
    });
}

/**
 * @Description: 店铺评价初始化
 * @param {id | Number}
 * @return: Promise
 * @Date: 2019-10-26 14:38:10
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const storeCommentInit = async(app, id, evaluate, page, isIndex) => {
    const dataRes = await _getStoreComments(app, id, evaluate, page, isIndex)
    const data = dataRes ? dataRes.data.data : ''
    return data
}

/**
 * @Description: 获取服务列表
 * @param {type}
 * 参数：
 参数名    必填    类型    说明
 store_id    是    int    店铺id
 store_class    否    int    店铺分类筛选id
 orderby    否    string    服务排序字段（’sales’,’comments’,’price’,’new’）
 sort    否    string    服务排序降序或者升序（’desc’,’asc’）
 * @return: Promise
 * @Date: 2019-10-26 16:46:11
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const getServiceList = (app, {
        store_id,
        store_class,
        order,
        sort,
        page
    }) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/store/serviceList`,
    //         method: 'post',
    //         data: {
    //             store_id,
    //             store_class,
    //             order,
    //             sort,
    //             page
    //         }
    //     })
    // )
    request({
        url: `/store/serviceList`,
        method: 'post',
        data: {
            store_id,
            store_class,
            order,
            sort,
            page
        }
    });

//获取销量排行
export const getTopSales = (app, {
        store_id,
    }) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/store/topSales`,
    //         method: 'post',
    //         data: {
    //             store_id
    //         }
    //     })
    // )
    request({
        url: `/store/topSales`,
        method: 'post',
        data: {
            store_id,
        }
    });

/**
 * @Description: 获取店铺档案
 * @param {store_id | Number}
 * @return:
 * @Date: 2019-10-28 11:06:07
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const getStoreArchives = (app, store_id) =>
    // reqStatus(_req(app, {
    //     url: `/store/archive/${store_id}`,
    //     method: 'get'
    // }))
    request({
        url: `/store/archive/${store_id}`,
        method: 'get',
    });

/**
 * @Description: 大部分店铺情况的asyncData封装
 * @param {
 * reqArr | Array<!arg>, (字符串为必查，对象则按规则走val属性传))
 * query | req.query,
 * fn | Function}
 * @return: Boolean | Array<res>
 * @Date: 2019-10-28 11:10:07
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const defaultAsync = async(app, reqArr, ...args) => {
    const {
        params
    } = app
    const agree = reqArr.every(prop => isObject(prop) || params.hasOwnProperty(prop))
    if (!agree || args.length === 0) return false
    const reqs = reqArr.map(prop => (isObject(prop) ? prop.val : params[prop]))
    return args.length > 1 ? Promise.all(args.map(fn => fn(app, ...reqs))) : args[0](app, ...reqs)
}

export const contAsync = async(app, reqArr, ...args) => {
    const {
        query
    } = app
    const agree = reqArr.every(prop => isObject(prop) || query.hasOwnProperty(prop))
    if (!agree || args.length === 0) return false
    const reqs = reqArr.map(prop => (isObject(prop) ? prop.val : query[prop]))
    return args.length > 1 ? Promise.all(args.map(fn => fn(app, ...reqs))) : args[0](app, ...reqs)
}

/**
 * @Description: 获取店铺客户合作示例
 * @param {id | Number}
 * @return:
 * @Date: 2019-10-28 15:54:46
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const getCaseList = (app, store_id, page = 1) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/case/list/${store_id}`,
    //         method: 'get',
    //         params: {
    //             page
    //         }
    //     })
    // )
    request({
        url: `/case/list/${store_id}`,
        method: 'get',
        params: {
            page
        }
    });

/**
 * @Description: 获取合作示例详情
 * @param {type}
 * @return:
 * @Date: 2019-10-30 14:49:19
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const getCaseDetail = (app, case_id) =>
    // reqStatus(_req(app, {
    //     url: `/case/getCaseInfo/${case_id}`,
    //     method: 'get'
    // }))
    request({
        url: `/case/getCaseInfo/${case_id}`,
        method: 'get',
    });

/**
 * @Description: 获取订单/服务 详情
 * @param {order_sn|String}
 * @return:
 * @Date: 2019-10-30 15:45:44
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const getOrderDetail = async(app, order_sn) => {
    // return reqStatus(
    //     _req(app, {
    //         url: `/service/orderInfo`,
    //         method: 'post',
    //         data: {
    //             order_sn
    //         }
    //     })
    // )
    const res = await request({
        url: `/service/orderInfo`,
        method: 'post',
        data: {
            order_sn
        }
    });

    return res ? res.data.data : ''
}

// 获取资金结算阶段
export const getPhase = async(app, order_sn) => {
    // return reqStatus(
    //     _req(app, {
    //         url: `/service/fundSettlementInfo`,
    //         method: 'post',
    //         data: {
    //             order_sn
    //         }
    //     })
    // )
    const res = await request({
        url: `/service/fundSettlementInfo`,
        method: 'post',
        data: {
            order_sn
        }
    });

    return res ? res.data.data : ''
}

// 获取合同详情
export const getContractDetail = async(app, order_sn) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/contract/contract/${order_sn}`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/contract/contract/${order_sn}`,
        method: 'get',
        
    });

// 购物车清单
export const getSpCartList = async app =>
    // reqStatus(
    //     _req(app, {
    //         url: `/shoppingCart/cartList`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/shoppingCart/cartList`,
        method: 'get',
    });

// 购物车底部广告
export const getSpCartAdv = app =>
    // reqStatus(
    //     _req(app, {
    //         url: `/shoppingCart/serviceRecommend`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/shoppingCart/serviceRecommend`,
        method: 'get',
    });

// 实时上刊主页
export const getTurnTimeData = app =>
    // reqStatus(
    //     _req(app, {
    //         url: `/journal/newest/all`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/journal/newest/all`,
        method: 'get',
    });

// 实时上刊列表页
export const getTurnTimeList = (app, type) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/journal/list/all`,
    //         method: 'get',
    //         data: {
    //             type
    //         }
    //     })
    // )
    request({
        url: `/journal/list/all`,
        method: 'get',
        data: {
            type
        }
    });

// 实时上刊详情页
export const getTurnTimeDetail = (app, publish_id, sign) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/journal/details/page?publish_id=${publish_id}`,
    //         method: 'get'
    //     })
    // )
    request({
        url: `/journal/details/page?publish_id=${publish_id}&sign=${encodeURIComponent(sign)}`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
    });

// 店铺上传信息
export const journalShopAll = (app, uid) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/journal/shop/all`,
    //         method: 'get',
    //         data: {
    //             uid
    //         }
    //     })
    // )
    request({
        url: `/journal/shop/all`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
        data: {
            uid
        }
    });

// 线索详情
export const clueShopShow = (app, id,sign) => {
    // return reqStatus(
    //     _req(app, {
    //         url: `/user/clue/shopshow/${id}`,
    //         method: 'get',
    //     }, {
    //         code: 900
    //     })
    // ).catch(e => console.error(e))
    return request({
        url: `/user/clue/shopshow/${id}?sign=${encodeURIComponent(sign)}`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
    });
}

// 线索列表-头部
export const clueShowhead = (app) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/user/clue/showhead`,
    //         method: 'get',
    //     })
    // )
    request({
        url: `/user/clue/showhead`,
        method: 'get',
    });

// 线索列表-主线（线索分页）
export const clueShowlist = (app, page) =>
    // reqStatus(
    //     _req(app, {
    //         url: `/user/clue/showlist?page=${page}`,
    //         method: 'get',
    //     })
    // )
    request({
        url: `/user/clue/showlist?page=${page}`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
    });


// 线索列表-支线（筛选）
export const clueInquire = (app,money,classd,time,type,dataS, title, page) => {
        let urlTitle = encodeURIComponent(title)
        console.log(title)
            // return reqStatus(
            //     _req(app, {
            //         url: `/user/clue/inquire?title=${urlTitle}&page=${page}`,
            //         method: 'get',
            //     })
            // )
        return request({
            url: `/user/clue/inquire?money=${money}&class=${classd}&time=${time}&type=${type}&data=${dataS}&title=${urlTitle}&page=${page}`,
            method: 'get',
            headers: { Authorization: `Bearer ${app.store.state.access_token}` },
        });
    }
    // export const clueShowhead = data => {
    //     return request ({
    //       url: '/user/clue/showhead',
    //       method: 'get',
    //       data: data,
    //     });
    //   };
    // export const clueShowhead = (app) => {
    //     return reqStatus(
    //         _req(app, {
    //             url: `/user/clue/showhead`,
    //             method: 'get',
    //         })
    //     )
    // }
    // indexData
export const indexDataSsr = (app) => {
    // return reqStatus(
    //     _req(app, {
    //         url: `/index`,
    //         method: 'post',
    //     })
    // )
    return request({
        url: `/index`,
        method: 'post',
    });
}

// 首页导航
export const getHeader = (app) => {
    // return reqStatus(
    //     _req(app, {
    //         url: `/header`,
    //         method: 'get',
    //     })
    // )
    return request({
        url: `/header`,
        method: 'get',
    });
}

export const storeListAsync = (app, {
    page,
    keywords
}) => { //店铺列表
    // return reqStatus(
    //     _req(app, {
    //         url: `/storeList`,
    //         method: 'post',
    //         data: {
    //             page,
    //             keywords
    //         }
    //     })
    // )
    return request({
        url: `/storeList`,
        method: 'post',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
        data: {
            page,
            keywords
        }
    });
}

export const serviceAsync = (app, params) => { // 服务列表
    // return reqStatus(
    //     _req(app, {
    //         url: `/service/serviceList`,
    //         method: 'post',
    //         params,
    //     })
    // )
    return request({
        url: `/service/serviceList`,
        method: 'post',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
        params
    });
}

export const serDataAsync = (app, sid,sign = '') => { // 服务详情
    // return reqStatus(
    //     _req(app, {
    //         url: `/service/details/${sid}`,
    //         method: 'get',
    //     })
    // )
    return request({
        url: `/service/details/${sid}?sign=${encodeURIComponent(sign)}`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
    });
}

export const filtDataAsync = (app, data) => { //筛选属性列表
    // return reqStatus(
    //     _req(app, {
    //         url: `/service/filtrateList`,
    //         method: 'post',
    //         data,
    //     })
    // )
    return request({
        url: `/service/filtrateList`,
        method: 'post',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
        data,
    });
}

export const recoAsync = (app, dataList) => { //服务列表其他推荐 热门服务接口
    // return reqStatus(
    //     _req(app, {
    //         url: `/service/serviceRecommend`,
    //         method: 'post',
    //         dataList: dataList
    //     })
    // )
    return request({
        url: `/service/serviceRecommend`,
        method: 'post',
        dataList: dataList
    });
}

export const casebiogDetails = (app, sid, sign) => {
    // return reqStatus(
    //     _req(app, {
    //         url: `/casebiog/info/${sid}`,
    //         method: 'get',
    //     })
    // )
    return request({
        url: `/casebiog/info/${sid}?sign=${encodeURIComponent(sign)}`,
        method: 'get',
        headers: { Authorization: `Bearer ${app.store.state.access_token}` },
    });
};



// {
//     console.log(222,title,page)
//     return reqStatus(
// 		_req(app, {
//             url: `/user/clue/inquire?title=${title}&page=${page}`,
//             method: 'get',
//         },
//         {
//             code:900
//         }
//         )
// 	).catch(e => console.error(e))
// }