import request from '@/plugins/service';

// 实时上刊动态列表
export function getTurnList(data) {
    // return comReq(get({ url: '/journal/newest/list', data }))
    return request({
        url: '/journal/newest/list',
        method: 'get',
        params: data
    });
}
// 侧边热门列表
export function getAsideList(data) {
    // return comReq(get({ url: '/journal/hot/list', data }))
    return request({
        url: '/journal/hot/list',
        method: 'get',
        params: data
    });
}

// 列表搜索
export function searchTurnTime(data) {
    // return comReq(get({ url: '/journal/list/search', data }))
    return request({
        url: '/journal/list/search',
        method: 'get',
        params: data
    });
}

// 详情页接口
// export function turnTimeDetail(data) {
// 	return comReq(get({ url: '/journal/details/page', data }))
// }



// 收藏接口
export function collect(data) {
    // return comReq(post({ url: '/common/collect', data }))
    return request({
        url: '/common/collect',
        method: 'post',
        data
    });
}


// 评论提交接口
export function comment(data) {
    return request({
        url: '/journal/details/comment',
        method: 'post',
        data: data,
    });
}

// 评论子级提交接口
export function subComment(data) {
    // return comReq(post({ url: `/journal/details/comment/${data.pid}`, data }))
    return request({
        url: `/journal/details/comment/${data.pid}`,
        method: 'post',
        data
    });
}
// 评论列表接口
export const commentList = data => {
    return request({
        url: '/journal/details/comment',
        method: 'get',
        params: data,
    });
};
// 评论子列表接口
export function commentSubList(data) {
    // return comReq(get({ url: `/journal/details/comment/${data.pid}`, data }))
    return request({
        url: `/journal/details/comment/${data.pid}`,
        method: 'post',
        data
    });
}
// 操作类型计数接口
export function increment(data) {
    // return comReq(post({ url: `/journal/action/increment`, data }))
    return request({
        url: '/journal/action/increment',
        method: 'post',
        data,
    });
}

// 实时上刊创建订单
export const journalCreateOrders = data => {
    return request({
        url: '/journal/pay/orders',
        method: 'post',
        data: data,
    });
};


// 实时上刊计数
export const journalIncrement = data => {
    return request({
        url: '/journal/action/increment',
        method: 'post',
        data: data,
    });
};

// 点赞和踩接口
export const likeOrDislike = data => {
    return request({
        url: '/common/link-unlike',
        method: 'post',
        data: data,
    });
}

// 店铺上传列表
export function journalShopList(data) {
    // return comReq(get({ url: `/journal/shop/list`, data }))
    return request({
        url: '/journal/shop/list',
        method: 'get',
        params: data,
    });
}

// 店铺上传信息
export function journalShopAll(data) {
    // return comReq(get({ url: `/journal/shop/all`, data }))
    return request({
        url: '/journal/shop/all',
        method: 'get',
        params: data,
    });
}