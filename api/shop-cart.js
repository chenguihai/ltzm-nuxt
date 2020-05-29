import request from '@/plugins/service'

// 调整购物车商品数量
// export function changeGoodsNum(cart_id, num) {
// 	return comReq(post({ url: '/shoppingCart/adjustQuantity', data: { cart_id, num } }))
// }
export const changeGoodsNum = (cart_id, num) => {
    return request({
        url: `/shoppingCart/adjustQuantity`,
        method: 'post',
        data: { cart_id, num }
    })
}
// 删除购物车商品
// export function delCartGoods(data) {
// 	return comReq(post({ url: '/shoppingCart/delete', data }))
// }
export const delCartGoods = data => {
    return request({
        url: `/shoppingCart/delete`,
        method: 'post',
        data: data
    })
}
// 选择购物车商品
// export function selCartGoods(data) {
// 	return comReq(post({ url: '/shoppingCart/checked', data }))
// }
export const selCartGoods = data => {
    return request({
        url: `/shoppingCart/checked`,
        method: 'post',
        data: data
    })
}
// 购物车清单
// export function getCartList() {
// 	return comReq(get({ url: '/shoppingCart/cartList' }))
// }
export const getCartList = () => {
    return request({
        url: `/shoppingCart/cartList`,
        method: 'get',
    })
}
// 下单结算
// export function letsPay(data, type) {
// 	return comReq(post({ url: `/shoppingCart/${type}/creatOrders`, data }))
// }
export const letsPay = (data,type) => {
    return request({
        url: `/shoppingCart/${type}/creatOrders`,
        method: 'post',
        data: data
    })
}
// 获取购物车数量
// export function getCartNums() {
// 	return comReq(get({ url: `/shoppingCart/count` }))
// }
export const getCartNums = (data) => {
    return request({
        url: '/shoppingCart/count',
        method: 'get',
        data: data
    })
}
