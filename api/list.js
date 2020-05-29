/**
 * 此文件放api列表
 */

import request from '@/plugins/service';

// 获取验证码
export const get_verify_code = phone => {
    return request({
        url: '/member/verificationCodes',
        method: 'post',
        data: phone,
    });
};
// 图形验证码
export const getImgCode = data => {
    return request({
        url: '/captcha/users',
        method: 'post',
        data: data,
    });
};
// 登错查询次数
export const getErr = data => {
    return request({
        url: '/member/authorizations/number',
        method: 'post',
        data: data,
    });
};
// 登录--账号密码
export const login = data => {
    return request({
        url: '/member/authorizations',
        method: 'post',
        data: data,
    });
};

// 登录--验证码
export const loginCode = data => {
    return request({
        url: '/member/mobile/authorizations',
        method: 'post',
        data: data,
    });
};

/**
 * 注册接口
 * @param data phone / code / password
 */
export const register = data => {
    return request({
        url: '/member/users',
        method: 'post',
        data,
    });
};
/**
 * 发送注册短信
 * @param data mobile
 */
export const sendRegCode = data => {
    return request({
        url: '/member/verificationCodes',
        method: 'post',
        data,
    });
};
/**
 * 发送手机登录短信
 * @param data mobile
 */
export const sendMobCode = data => {
    return request({
        url: '/member/login/verificationCodes',
        method: 'post',
        data,
    });
};

/**
 * 根据token获取用户信息
 * @param data
 */
export const getUserInfo = data => {
    return request({
        url: '/user',
        method: 'get',
        params: {
            token: data,
        },
    });
};
export const quickMobCode = data => {
    return request({
        url: '/member/quick-login',
        method: 'post',
        data,
    });
};
// 扫码登陆获得二维码
export const getURCode = data => {
    return request({
        url: '/proxy/wx/qr-code',
        method: 'get',
        params: {
            token: data,
        },
    });
};
//轮询获取扫码结果接口
export const getCodeRes = data => {
    return request({
        url: '/proxy/wx/login-result',
        method: 'get',
        params: data,
    });
};
// 网站首页信息
export const indexData = data => {
    return request({
        url: '/index',
        method: 'post',
        data: data,
    });
};
export const userIndex = data => {
    return request({ url: '/user/mobile/index', method: 'get', data: data });
};
// 雇主首页购物车数据
export const userCartList = data => {
    return request({
        url: '/shoppingCart/userCartList',
        method: 'get',
        data: data,
    });
};

// 我的订单   `/user/mycluesearch?title=${title}&page=${page}`,
export const userOrder = (created, title, type, page) => {
    return request({
        url: `/user/order?created=${created}&title=${title}&type=${type}&page=${page}`,
        method: 'get',
        created: created,
        title: title,
        type: type,
        page: page,
    });
};
// 申请发票
export const applyInvoice = data => {
    return request({
        url: '/service/applyInvoice',
        method: 'post',
        data: data,
    });
};
// 我的发票
export const userInvoice = (title, type, page) => {
    return request({
        url: `/user/invoice?title=${title}&type=${type}&page=${page}`,
        method: 'get',
        title: title,
        type: type,
        page: page,
    });
};
// 我的退款
export const verificationCodes = (title, type, page) => {
    return request({
        url: `/user/refund?title=${title}&type=${type}&page=${page}`,
        method: 'get',
        title: title,
        type: type,
        page: page,
    });
};
// 我的评价
export const evaluate = page => {
    return request({
        url: `/user/evaluate?page=${page}`,
        method: 'get',
        page: page,
    });
};
// 我的退款（取消退款）
export const refundsuccess = (ordersn, sid) => {
    return request({
        url: `/user/refundsuccess?ordersn=${ordersn}&sid=${sid}`,
        method: 'get',
        ordersn: ordersn,
    });
};
// 上刊订单
export const journalOrders = (type, page, keyword, created) => {
    return request({
        url: `/journal/user/orders?type=${type}&page=${page}&keyword=${keyword}&created=${created}`,
        method: 'get',
        type: type,
        page: page,
        keyword: keyword,
        created: created
    });
};
// 上刊订单详情
export const journalData = order_sn => {
    return request({
        url: `/journal/user/orders/details?order_sn=${order_sn}`,
        method: 'get',
        order_sn: order_sn,
    });
};
// 订单操作原因列表
export const refundReason = type => {
    return request({
        url: `/common/refund-reason?type=${type}`,
        method: 'get',
        type: type,
    });
};
// 上刊订单取消
export const journalClose = (order_sn, reason) => {
    return request({
        url: `/journal/user/orders/close?order_sn=${order_sn}&reason=${reason}`,
        method: 'post',
        order_sn: order_sn,
        reason: reason,
    });
};
// 案例、传记订单列表
export const caseBiog = (type, page, keyword, created, order_type) => {
    return request({
        url: `/case-biog/user/orders?type=${type}&page=${page}&keyword=${keyword}&created=${created}&order_type=${order_type}`,
        method: 'get',
        type: type,
        page: page,
        keyword: keyword,
        created: created,
        order_type: order_type
    });
};
// 案例、传记订单取消
export const caseClose = (order_sn, reason) => {
    return request({
        url: `/case-biog/user/order/close?order_sn=${order_sn}&reason=${reason}`,
        method: 'post',
        order_sn: order_sn,
        reason: reason,
    });
};
// 案例、传记订单详情
export const caseData = order_sn => {
    return request({
        url: `/case-biog/user/orders/details?order_sn=${order_sn}`,
        method: 'get',
        order_sn: order_sn,
    });
};

// 足迹列表
export const trailList = page => {
    return request({
        url: `/user/trail/list?page=${page}`,
        method: 'post',
        page: page,
    });
};
//  足迹删除
export const trailDelete = id => {
    return request({
        url: `/user/trail/delete?id=${id}`,
        method: 'post',
        id: id,
    });
};
//  足迹删除当天
export const trailDeleteday = day => {
    return request({
        url: `/user/trail/delete/day?day=${day}`,
        method: 'post',
        day: day,
    });
};

// 修改登录密码
export const changPass = data => {
    return request({
        url: '/user/password',
        method: 'post',
        data: data,
    });
};
// 修改绑定手机：验证码
export const changMobile = data => {
    return request({
        url: '/member/retrievepassword',
        method: 'post',
        data: data,
    });
};
// 修改绑定手机号码第一步：下一步
export const retrievePassword = data => {
    return request({
        url: '/user/mobile/edit',
        method: 'post',
        data: data,
    });
};
// 修改绑定手机号码第二步：获取验证码

export const changMobileP = data => {
    return request({
        url: '/member/verificationCodes',
        method: 'post',
        data: data,
    });
};
// 修改绑定手机号码第二步：下一步
export const newmobile = data => {
    return request({
        url: '/user/mobile/updata',
        method: 'post',
        data: data,
    });
};
// 检查用户是否设置密码
export const userCheckPay = data => {
    return request({
        url: '/user/pay/userCheckPay',
        method: 'get',
        data: data,
    });
}

// 创建支付密码 短信验证
export const paySms = data => {
        return request({
            url: '/user/pay/sms',
            method: 'get',
            data: data,
        });
    }
    // 验证短信
export const payCheck = data => {
    return request({
        url: '/user/pay/check',
        method: 'POST',
        data: data,
    });
}

// 创建支付密码
export const payInsert = data => {
        return request({
            url: '/user/pay/insert',
            method: 'post',
            data: data,
        });
    }
    // 修改密码-验证身份
export const checkPassword = data => {
    return request({
        url: '/user/pay/checkpassword',
        method: 'post',
        data: data,
    });
}

// 支付密码修改
export const modifyPassword = data => {
        return request({
            url: '/user/pay/modifyPassword',
            method: 'post',
            data: data,
        });
    }
    // 支付密码-忘记密码
export const forgetPayPassword = data => {
    return request({
        url: '/user/pay/forgetPayPassword',
        method: 'post',
        data: data,
    });
}

// 用户银行卡查询
export const queryBank = data => {
    return request({
        url: '/user/bank',
        method: 'get',
        data: data,
    });
};
// 银行查询
export const bankCount = data => {
    return request({
        url: '/user/bankcount',
        method: 'get',
        data: data,
    });
};
// 添加银行卡
export const bankAdd = data => {
    return request({
        url: '/user/bank/add',
        method: 'post',
        data: data,
    });
};
// 删除银行卡
export const bankDelete = id => {
    return request({
        url: `/user/bank/delete/${id}`,
        method: 'DELETE',
        id: id,
    });
};
//实名认证 — 查看E签宝账户
export const signAccount = data => {
    return request({
        url: '/user/sign/account',
        method: 'get',
        data: data,
    });
};

// 个人实名认证
export const perUseradd = data => {
    return request({
        url: '/user/sign/useradd',
        method: 'post',
        data: data,
    });
};
// 企业实名认证 第二步
export const checkCompanyUser = data => {
    return request({
        url: '/user/sign/checkCompanyUser',
        method: 'post',
        data: data,
    });
};

// 企业实名认证 第一步
export const checkcompany = data => {
    return request({
        url: '/user/sign/checkcompany',
        method: 'post',
        data: data,
    });
};
// 企业实名认证 第三步
export const checkTopay = data => {
    return request({
        url: '/user/sign/topay',
        method: 'post',
        data: data,
    });
};
// 支行查询省市
export const getBranch = data => {
    return request({
        url: '/user/sign/getbranch',
        method: 'post',
        data: data,
    });
};
// 企业实名认证 第四步
export const payAuth = data => {
    return request({
        url: '/user/sign/payAuth',
        method: 'post',
        data: data,
    });
};
// 修改用户头像
export const upAvatar = data => {
    return request({
        url: '/user/upavatar',
        method: 'post',
        data: data,
    });
};

// 交易消息
export const newsList = currentPage3 => {
    return request({
        url: `/user/msg/${currentPage3}?type=T`,
        method: 'get',
        currentPage3: currentPage3,
    });
};
// 交易消息-未读总数
export const msgcount = data => {
    return request({
        url: '/user/msgcount?type=T',
        method: 'get',
        data: data,
    });
};
// 交易消息-全部设为已读
export const msgupdate = data => {
    return request({
        url: '/user/msgupdatepc?type=T',
        method: 'get',
        data: data,
    });
};
// 交易消息-删除
export const deleteNews = id => {
    return request({
        url: `/user/msg/delete/${id}`,
        method: 'get',
        id: id,
    });
};
// 交易消息-设置单个已读
export const updateOne = id => {
    return request({
        url: `/user/msg/update/${id}`,
        method: 'get',
        id: id,
    });
};
// 系统消息
export const newsListS = currentPage3 => {
    return request({
        url: `/user/msg/${currentPage3}?type=S`,
        method: 'get',
        currentPage3: currentPage3,
    });
};
// 交易消息-未读总数
export const msgcountS = data => {
    return request({
        url: '/user/msgcount?type=S',
        method: 'get',
        data: data,
    });
};
// 交易消息-全部设为已读
export const msgupdateS = data => {
    return request({
        url: '/user/msgupdatepc?type=S',
        method: 'get',
        data: data,
    });
};
// 提现页面
export const takeShow = data => {
    return request({
        url: '/user/take/show',
        method: 'get',
        data: data,
    });
};
// 提现
export const takeMoney = data => {
    return request({
        url: '/user/take/money',
        method: 'post',
        data: data,
    });
};
// 账户余额明细
export const accountList = data => {
    return request({
        url: '/user/account/list',
        method: 'post',
        data: data,
    });
};
// 账户余额明细类型
export const accountType = data => {
    return request({
        url: '/user/account/type',
        method: 'get',
        data: data,
    });
};

// 提现列表记录（包括查询）
export const takeList = data => {
    return request({
        url: '/user/take/list',
        method: 'post',
        data: data,
    });
};
// 账户资金查询
export const accountMoney = data => {
    return request({
        url: '/user/account',
        method: 'get',
        data: data,
    });
};
// 验证银行E签宝
export const accountExp = data => {
    return request({
        url: '/user/account/exp',
        method: 'get',
        data: data,
    });
};
// 线索列表
export const myClue = page => {
    return request({
        url: `/user/myclue/${page}`,
        method: 'get',
        page: page,
    });
};
// 线索搜索  /user/mycluesearch?title=测试&page=2
export const myClueSearch = (title, page) => {
    return request({
        url: `/user/mycluesearch?title=${title}&page=${page}`,
        method: 'get',
        title: title,
        page: page,
    });
};
// 我的举报
export const userTip = (type, page) => {
    return request({
        url: `/user/tip?type=${type}&page=${page}`,
        method: 'post',
        type: type,
        page: page
    });
};
// 发票列表
export const invoiceList = (page) => {
    return request({
        url: `/user/invoice/list?page=${page}`,
        method: 'post',
        // page:page
    });
};
// 添加发票
export const invoiceAdd = data => {
    return request({
        url: '/user/invoice/add',
        method: 'post',
        data: data,
    });
};
// 发票修改
export const invoiceModify = (id, data) => {
    return request({
        url: `/user/invoice/modify?id=${id}`,
        method: 'post',
        data: data,
        id: id
    });
};
// 发票删除
export const invoiceDelete = (id) => {
    return request({
        url: `/user/invoice/delete?id=${id}`,
        method: 'post',
        id: id
    });
};

// 店铺收藏
export const collectStores = (page, name) => {
    return request({
        url: `/user/collect/stores?page=${page}&name=${name}`,
        method: 'post',
        page: page,
        name: name,
    });
};
// 服务收藏
export const collectService = (page, name) => {
    return request({
        url: `/user/collect/service?page=${page}&name=${name}`,
        method: 'post',
        page: page,
        name: name,
    });
};
// 收藏案例/传记
export const collectCase = (page, name, type) => {
    return request({
        url: `/user/collect/case?page=${page}&name=${name}&type=${type}`,
        method: 'post',
        page: page,
        name: name,
        type: type,
    });
};
// 线索收藏
export const collectCluee = (page, name) => {
    return request({
        url: `/user/collect/clue?page=${page}&name=${name}`,
        method: 'post',
        page: page,
        name: name,
    });
};
// 收藏统计
export const collectCount = data => {
        return request({
            url: '/user/collect/count',
            method: 'get',
            data: data,
        });
    }
    // 上刊收藏
export const collectJournal = (page, name) => {
    return request({
        url: `/user/collect/journal?page=${page}&name=${name}`,
        method: 'post',
        page: page,
        name: name,
    });
};
// 工具市场列表
export const toolsList = data => {
    return request({
        url: '/tools/list',
        method: 'post',
        data: data,
    });
};
// 工具市场详情
export const toolsInfo = data => {
    return request({
        url: '/tools/info',
        method: 'post',
        data: data,
    });
};
// 修改个人资料以及头像
export const upInfodataData = data => {
    return request({
        url: '/user/upinfodata',
        method: 'post',
        data: data,
    });
};
//工具市场下单
export const toolsOrder = data => {
    return request({
        url: '/tools/order',
        method: 'post',
        data: data,
    });
};
//工具市场支付
export const toolsPay = data => {
    return request({
        url: `/tools/pay?pay_id=${data.pay_id}&order_sn=${data.order_sn}&token=${data.token}`,
        method: 'GET',
    });
};
//线索购买支付
export const payshopclue = data => {
    return request({
        url: `/user/clue/payshopclue?pay_type=${data.pay_type}&order_sn=${data.order_sn}`,
        method: 'GET',
    });
};

// 工具市场定单详情(支付页)
export const orderInfo = data => {
    return request({
        url: '/tools/order/info',
        method: 'post',
        data: data,
    });
};
// 保证金定单详情(支付页)
export const skillOrderInfo = data => {
    return request({
        url: '/skill/orderInfo',
        method: 'post',
        data: data,
    });
};
// 服务定单详情(支付页)
export const serviceOrderInfo = data => {
    return request({
        url: '/service/orderInfo',
        method: 'post',
        data: data,
    });
};
// 服务定单详情(支付页)
export const getServiceOrderList = data => {
    return request({
        url: '/service/getOrderInfo',
        method: 'post',
        data: data,
    });
};
// 案例传记定单详情(支付页)
export const getCaseBiogOrderList = data => {
    return request({
        url: '/caseBiog/getOrderInfo',
        method: 'post',
        data: data,
    });
};
// 加入购物车
export const addCart = params => {
    return request({
        url: '/shoppingCart/addCart',
        method: 'post',
        data: params,
    });
};
// 服务案例传记打包加入购物车
export const addCartPackage = params => {
    return request({
        url: '/shoppingCart/addCartPackage',
        method: 'post',
        data: params,
    });
};

// 实时上刊订单信息
export const journalPayOrders = data => {
    return request({
        url: `/journal/pay/orders?order_sn=${data.order_sn}`,
        method: 'get',
    });
};

// 实时上刊支付二维码
export const journalPayment = data => {
    return request({
        url: `/journal/pay/payment?order_sn=${data.order_sn}&pay_id=${data.pay_id}`,
        method: 'get',
    });
};
// 实时上刊支付状态查询
export const journalStatus = data => {
    return request({
        url: `/journal/pay/status?order_sn=${data.order_sn}`,
        method: 'get',
    });
};
// 线索发布(支付页)
export const cluesOrderDetail = data => {
    return request({
        url: `/user/cluesn`,
        method: 'POST',
        data,
    });
};
// 线索支付(支付页)
export const payServiceClue = data => {
    return request({
        url: `/user/clue/payserviceclue?order_sn=${data.order_sn}&pay_type=${data.pay_type}`,
        method: 'GET',
    });
};
// 缴纳保证金支付(支付页)
export const skillPayment = data => {
    return request({
        url: `/skill/payment?order_sn=${data.order_sn}&pay_id=${data.pay_id}`,
        method: 'GET',
    });
};
// 缴纳保证金支付(支付页)
export const skillCheckStatus = data => {
    return request({
        url: `/skill/checkStatus`,
        method: 'POST',
        data,
    });
};

// 服务订单支付(支付页)
export const paymentService = data => {
    return request({
        url: `/service/payment?order_sn=${data.order_sn}&pay_id=${data.pay_id}`,
        method: 'GET',
    });
};

// 案例传记订单支付(支付页)
export const paymentCasebiog = data => {
    return request({
        url: `/casebiog/payment?order_sn=${data.order_sn}&pay_id=${data.pay_id}`,
        method: 'GET',
    });
};
// 查询支付状态
export const cluePayStatus = data => {
    return request({
        url: `/user/cluepay`,
        method: 'POST',
        data,
    });
};
// 查询工具支付状态
export const toolsOrderStatus = data => {
    return request({
        url: `/tools/order/status`,
        method: 'POST',
        data,
    });
};
// 查询服务支付状态
export const serviceOrderStatus = data => {
    return request({
        url: `/service/checkStatus`,
        method: 'POST',
        data,
    });
};

// 查询案例传记支付状态
export const casebiogOrderStatus = data => {
    return request({
        url: `/casebiog/checkStatus`,
        method: 'POST',
        data,
    });
};
// 服务列表接口
export const serviceList = params => {
    return request({
        url: '/service/serviceList',
        method: 'post',
        data: params,
    });
};
// 服务列表其他推荐 热门服务接口
export const serviceRecommend = params => {
    return request({
        url: '/service/serviceRecommend',
        method: 'post',
        data: params,
    });
};
// 筛选属性列表
export const filtrateList = params => {
    return request({
        url: '/service/filtrateList',
        method: 'post',
        data: params,
    });
};
// 服务对比
export const serviceCompare = data => {
    return request({
        url: '/service/compare',
        method: 'post',
        data: data,
    });
};
// 服务详情
export const serviceDetails = (sid, sign = '') => {
    return request({
        url: `/service/details/${sid}?sign=${encodeURIComponent(sign)}`,
        method: 'get',
        // sid: sid,
    });
};
// 传记案例详情
export const casebiogDetails = sid => {
    return request({
        url: `/casebiog/info/${sid}`,
        method: 'get',
        sid: sid,
    });
};
// 服务详情评价
export const serviceComments = data => {
    return request({
        url: '/service/serviceComments',
        method: 'post',
        data: data,
    });
};
// 服务下单
export const creatOrders = data => {
    return request({
        url: '/service/creatOrders',
        method: 'post',
        data: data,
    });
};

// 案例传记下单
export const createCaseBiogOrder = data => {
    return request({
        url: '/caseBiog/creatOrder',
        method: 'post',
        data: data,
    });
};
// 店铺基本信息
export const serviceStoreInfo = store_id => {
    return request({
        url: `/store/storeInfo/${store_id}`,
        method: 'get',
        store_id: store_id,
    });
};
// 文章中心 - 关于我们首页
export const adminAboutUs = data => {
    return request({
        url: '/aboutUs',
        method: 'get',
        data: data,
    });
};
// 文章中心 - 关于我们 - 右侧详情

export const aboutUsDetail = id => {
    return request({
        url: `/aboutUsDetail/${id}`,
        method: 'get',
        id: id,
    });
};
// 文章中心 - 规则中心首页
export const ruleCentre = data => {
    return request({
        url: '/ruleCentre',
        method: 'get',
        data: data,
    });
};
// 文章中心 - 规则中心列表  title=${title}&page=${page}`
export const ruleCentreList = (id, page, title) => {
    return request({
        url: `/ruleCentreList/${id}?page=${page}&title=${title}`,
        method: 'get',
        id: id,
        page: page,
        title: title,
    });
};
// 文章中心 - 规则中心详情
export const ruleCentreDetail = id => {
    return request({
        url: `/ruleCentreDetail/${id}`,
        method: 'get',
        id: id,
    });
};
// 文章中心 - 帮助中心首页
export const helpCentre = data => {
    return request({
        url: '/helpCentre',
        method: 'get',
        data: data,
    });
};
// 文章中心 - 帮助中心列表
export const helpCentreList = (id, page, title) => {
    return request({
        url: `/helpCentreList/${id}?page=${page}&title=${title}`,
        method: 'get',
        id: id,
        page: page,
        title: title,
    });
};
// 文章中心 - 帮助中心 - 详情
export const helpCentreDetail = id => {
    return request({
        url: `/helpCentreDetail/${id}`,
        method: 'get',
        id: id,
    });
};
// 文章中心 - 新闻资讯首页
export const newsCentre = data => {
    return request({
        url: '/newsCentre',
        method: 'get',
        data: data,
    });
};
// 文章中心 - 新闻资讯列表
export const newsCentreList = (id, page) => {
    return request({
        url: `/newsCentreList/${id}?page=${page}`,
        method: 'get',
        id: id,
        page: page,
    });
};
// 新闻资讯 - 详情
export const newsCentreDetail = id => {
    return request({
        url: `/newsCentreDetail/${id}`,
        method: 'get',
        id: id,
    });
};
// 线索列表-支线（筛选列表）
export const clueShowhead = data => {
    return request({
        url: '/user/clue/showhead',
        method: 'get',
        data: data,
    });
};
// 线索列表-主线（线索分页）
export const clueShowlist = page => {
    return request({
        url: `/user/clue/showlist?page=${page}`,
        method: 'get',
        page: page,
    });
};
// 线索列表-支线（旁边内容）
export const clueList = data => {
    return request({
        url: '/user/clue/list',
        method: 'get',
        data: data,
    });
};
// 线索列表-支线（筛选）    /user/clue/inquire?money=0,1000&class=2&time=2019-09-18,2019-09-27&type=2&data=created_at,desc
export const clueInquire = (money, classd, time, type, dataS, title, page) => {
    return request({
        url: `/user/clue/inquire?money=${money}&class=${classd}&time=${time}&type=${type}&data=${dataS}&title=${title}&page=${page}`,
        method: 'get',
        money: money,
        classd: classd,
        time: time,
        type: type,
        dataS: dataS,
        title: title,
    });
};
// 线索详情
export const clueShopShow = id => {
    return request({
        url: `/user/clue/shopshow/${id}`,
        method: 'get',
        id: id,
    });
};
// 线索补充
export const clueAppend = data => {
    return request({
        url: '/user/clue/append',
        method: 'post',
        data: data,
    });
};

// 商户购买线索下单
export const cluepaysn = data => {
    return request({
        url: '/user/clue/cluepaysn',
        method: 'post',
        data: data,
    });
};
// 增值服务下单
export const servicesn = data => {
    return request({
        url: '/user/clue/servicesn',
        method: 'post',
        data: data,
    });
};
// 图片接口

export const homeimage = type => {
    return request({
        url: `/user/homeimage?type=${type}`,
        method: 'post',
        type: type,
    });
};


//收藏接口
export const commonCollect = data => {
    return request({
        url: `/common/collect`,
        method: 'post',
        data: data,
    });
};
// 案例传记购买后下载
export const downFile = id => {
    return request({
        url: 'api/casebiog/downFile?id=' + id,
        method: 'get',
        id: id,
    });
};
// 举报 /tipOffs/
export const commonTipOffs = data => {
    return request({
        url: `/common/tipOffs`,
        method: 'post',
        data: data
    });
};
//搜索热词1服务，2店铺，3线索，4任务，5其他
export const hotWordList = type => {
    return request({
        url: `/searchKeyword/index?type=` + type,
        method: 'get',
        type: type
    });
};
// 搜索查询
export const searchSuggest= (type,keyword,num) => {
    return request({
        url: `/search/suggest?type=${type}&keyword=${keyword}&num=${num}` ,
        method: 'get',
        type,
        keyword,
        num
    });
};