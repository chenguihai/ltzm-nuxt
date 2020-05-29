import request from '@/plugins/service'

/**
 * 数据埋点
 *
 * @param {string} user_cookie 用户当前的cookie
 * @param {string} referer 网页是从哪个页面链接过来，前端用路由来作为这个标识
 * @param {string} platform pc/h5
 * @param {number} channel 推广渠道，预留字段
 * @param {string} event_type 事件类型：page_show 页面曝光，list_show 列表曝光，popup_show 弹窗曝光，click 点击事件
 * @param {object} kv 必备字段：router(行为发生的页面标识) 重要字段：id 详情页如服务、线索等的id rname 资源位名称
 * @param {string} ts_fe 事件发生的时间戳，精确到ms
 */

export default (data) => {
    const eventTrack = data;

    eventTrack.user_cookie = localStorage.getItem('deviceCode')
    eventTrack.platform = 'pc'
    eventTrack.channel = '' // 预留字段
    eventTrack.ts_fe = new Date().getTime(); // 当前事件发生的时间戳

    request({
        url: '/burialPoint',
        method: 'post',
        data: eventTrack
    }).then(res => {
        let {code, message, data} = res.data
        if (code === 200) {
        } else {
            this.$message.error({title: '错误提示', message: message});
        }
    }).catch(err => {
        console.log(err)
    })
}

/**
 * 使用示例
 * 
 * import dataEventTrack from '@/utils/dataEventTrack'
 * 
 * dataEventTrack({
 *  referer: 'http://lingtianzhongmei.com',
 *  event_type: 'list_show',
 *  kv: {
 *    router: 'shop/shop-list',
 *    category: '全部',
 *    district: '全部',
 *    tab: '综合',
 *    ids: '101,103,8,102,34,53'
 *  }
 * })
 * 
 * 事件文档：https://www.tapd.cn/54952420/documents/show/1154952420001000120?file_type=excel&file_ext=xls
 * 
 */