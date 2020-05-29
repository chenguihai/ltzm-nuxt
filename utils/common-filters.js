import { isNumber } from 'util'

/**
 * @Description: 根据type返回是店铺的类型属于企业或个人
 * @param {type | Number} 店铺信息的 type_id
 * @return: String
 * @Date: 2019-10-26 13:09:55
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
const STORE_TYPE_MAP = new Map([
    [1, '个人'],
    [2, '企业']
])
export const storeType = type => STORE_TYPE_MAP.get(type)

/**
 * @Description: 小数位截断
 * @param {
 * num | (String || Number)
 * digits | Number 位数 (max20)
 * type | Boolean(true 四舍五入 false 截断 )
 * }
 * @return: String
 * @Date: 2019-10-26 13:15:46
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const sliceNumber = (num, digits = 2, type = true) => {
    if (num === undefined || digits === undefined || isNaN(num)) return '0.00'
    num = type ? (+num).toFixed(digits) : splitNum(num, digits)
    return num.toString()
}

function splitNum(s, digits) {
    const arr = s.toString().split('.')
    let integer = arr[0],
        fractions = arr[1]
    return `${integer}.${
        fractions
            ? fractions.substr(0, digits)
            : Array.from({length: digits}).map((item, index) => 0).join('')
                // .fill('0').join('')
    }`
}

/**
 * @Description: 同类服务比较文字
 * @param {scroe | Number}
 * @return: String
 * @Date: 2019-10-26 13:50:24
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const serviceDiffText = score => {
    return score < 0 ? '低于' : score === 0 ? '持平' : '高于'
}
export const serviceDiffIcon = score => {
        return score < 0 ? 'icon-pingfenxiangxia' : score === 0 ? 'fair_icon' : 'icon-pingfenxiangshang'
    }
    /**
     * @Description: 绝对值
     * @param {num | Number}
     * @return: Number
     * @Date: 2019-10-26 13:56:05
     * @LastEditors: Eve
     * @LastEditTime: Do not edit
     */
export const abs = num => Math.abs(num).toFixed(2)

/**
 * @Description: 评价等级
 * @param {type}
 * @return:
 * @Date: 2019-10-26 15:39:59
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
const COMMENTS_LEVEL = new Map([
    [1, '好评'],
    [2, '中评'],
    [3, '差评']
])
export const commentLevel = evaluate => COMMENTS_LEVEL.get(evaluate)

/**
 * @Description: 媒介代理等级
 * @param {type}
 * @return:
 * @Date: 2019-10-28 14:27:54
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

const MEDIA_LEVEL = new Map([
    [0, '直营媒体'],
    [1, '一级代理'],
    [2, '二级代理'],
    [3, '其他']
])
export const mediaLevel = type => MEDIA_LEVEL.get(type)

// export const imgUrl = "http://ltzm6.oss-cn-zhangjiakou.aliyuncs.com/";



export const numUnitFormat = num => `${num}`.length >= 5 ? `${(num/10000).toFixed(1)}万` : num