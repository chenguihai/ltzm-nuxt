import { setCookie, setLocalStorage } from './index'
/* Array every polyfill */
if (!Array.prototype.every) {
    Array.prototype.every = function(callbackfn, thisArg) {
        'use strict'
        var T, k

        if (this == null) {
            throw new TypeError('this is null or not defined')
        }

        // 1. Let O be the result of calling ToObject passing the this
        //    value as the argument.
        var O = Object(this)

        // 2. Let lenValue be the result of calling the Get internal method
        //    of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0

        // 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
        if (typeof callbackfn !== 'function') {
            throw new TypeError()
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg
        }

        // 6. Let k be 0.
        k = 0

        // 7. Repeat, while k < len
        while (k < len) {
            var kValue

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal
            //    method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {
                // i. Let kValue be the result of calling the Get internal method
                //    of O with argument Pk.
                kValue = O[k]

                // ii. Let testResult be the result of calling the Call internal method
                //     of callbackfn with T as the this value and argument list
                //     containing kValue, k, and O.
                var testResult = callbackfn.call(T, kValue, k, O)

                // iii. If ToBoolean(testResult) is false, return false.
                if (!testResult) {
                    return false
                }
            }
            k++
        }
        return true
    }
}

// 高度无缝动画方法
export const funTransitionHeight = function(element, time) {
    // time, 数值，可缺省
    if (typeof window.getComputedStyle == 'undefined') return
    let height = window.getComputedStyle(element).height
    element.style.transition = 'none'
    element.style.height = 'auto'
    let targetHeight = window.getComputedStyle(element).height
    element.style.height = height
        // element.offsetWidth = element.offsetWidth
    element.offsetWidth
    if (time) element.style.transition = 'height ' + time + 'ms'
    element.style.height = targetHeight
}

export const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
export const isObject = isType('Object')
export const isNumber = isType('Number')
export const isString = isType('String')
export const isRegExp = isType('RegExp')
export const isBoolean = isType('Boolean')

export const regDaqo = {
    // 手机号  最底部有号段说明
    phone: /^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/,
    orderCanRead: /\.(png|jpg|gif|jpeg|xlsx|pdf|mp4|bmp|wma|wmi|3gp|rmvb|flv)$/,
    companyName: /^[-\u4e00-\u9fa5\(\)（）\da-zA-Z&]{2,50}$/gi,
    taxpayerId: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
}

export const checkEmptyValue = (rule, oblig, errFn) => {
    /**
     * @Description: 参数空检测
     * @param {
     * rule|String|Object,
     * rule => obj => {
     * name:String,
     * test:String|Boolean|RegExp,
     * custom: Function 定制检测函数 参数为val值
     * }
     * oblig | Object
     * errFn | Function 单独的错误函数
     * }
     * @return: Boolean
     * @Date: 2019-10-29 13:14:39
     * @LastEditors: Eve
     * @LastEditTime: Do not edit
     */
    let res = true,
        val
    if (!_checkStringVal(rule)) return !res
    if (isString(rule)) {
        // 直接检测属性值是否为空
        val = oblig[rule]
        res = _checkStringVal(val)
    } else if (isObject(rule)) {
        // 如果是对象则取规则验证
        const { test, name, custom } = rule
        val = oblig[name]
        res = _checkStringVal(val)
        if (custom) {
            res = custom(val)
        } else {
            // test是字符串或布尔值则验证是否与值相等
            if (res && (isString(test) || isBoolean(test))) {
                res = val === test
            } else if (res && isRegExp(test)) {
                // 正则则匹配比较
                res = test.test(val)
            }
        }
    }!res && errFn && errFn(rule.name || rule)
        // 其他情况则视为可空  直接返回
    return res
}

/**
 * @Description: 字符串空检测
 * @param {s String}
 * @return: Boolean 空 false
 * @Date: 2019-11-11 19:56:02
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export function _checkStringVal(s) {
    return !!(s !== '' && s !== undefined && s !== null)
}
/*
中国电信号段
133、149、153、173、177、180、181、189、199
中国联通号段
130、131、132、145、155、156、166、171、175、176、185、186、166
中国移动号段
134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、172、178、182、183、184、187、188、198
其他号段
14号段以前为上网卡专属号段，如中国联通的是145，中国移动的是147等等。
虚拟运营商
电信：1700、1701、1702
移动：1703、1705、1706
联通：1704、1707、1708、1709、171
卫星通信：1349
第一位： 1
第二位： 3～9
第三到第十一位只要是数字就行
*/

const LOGIN_TOKEN_COOKIE_NAME = 'access_token'
export const tokenDoing = token => {
    if (!_checkStringVal(token)) return
    setCookie(LOGIN_TOKEN_COOKIE_NAME, token)
    try {
        setLocalStorage(LOGIN_TOKEN_COOKIE_NAME, token)
        // 记录token的有效开始时间
        setLocalStorage('token_start_time', new Date().getTime())
    } catch (err) {}
}

/*
事件侦听兼容IE
*/
export const EventUtil = {
    addHandler: function(element, type, handler, pop = false) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, pop)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler, pop)
        } else {
            element['on' + type] = handler
        }
    },
    removeHandler: function(element, type, handler, pop = false) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, pop)
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler, pop)
        } else {
            element['on' + type] = null
        }
    },
    scrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    }
}

// canvas转dataURL：canvas对象、转换格式、图像品质

export function canvasToDataURL(canvas, format, quality) {
    return canvas.toDataURL(format || 'image/jpeg', quality || 1.0)
}

// DataURL转canvas

export function dataURLToCanvas(dataurl, cb) {
    var canvas = document.createElement('CANVAS')
    var ctx = canvas.getContext('2d')
    var img = new Image()
    img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        cb(canvas)
    }
    img.src = dataurl
}

// image转canvas：图片地址

export function imageToCanvas(src, cb) {
    var canvas = document.createElement('CANVAS')
    var ctx = canvas.getContext('2d')
    var img = new Image()
    img.setAttribute('crossOrigin', 'Anonymous')
    img.src = src
    img.onload = function() {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        cb(canvas)
    }
}

// canvas转image

export function canvasToImage(canvas) {
    var img = new Image()
    img.src = canvas.toDataURL('image/jpeg', 1.0)
    return img
}

// File/Blob对象转DataURL

export function fileOrBlobToDataURL(obj, cb) {
    var a = new FileReader()
    a.readAsDataURL(obj)
    a.onload = function(e) {
        cb(e.target.result)
    }
}

// DataURL转Blob对象

export function dataURLToBlob(dataurl) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

// Blob转image

export function blobToImage(blob, cb) {
    fileOrBlobToDataURL(blob, function(dataurl) {
        var img = new Image()
        img.src = dataurl
        cb(img)
    })
}

// image转Blob

export function imageToBlob(src, cb) {
    imageToCanvas(src, function(canvas) {
        cb(dataURLToBlob(canvasToDataURL(canvas)))
    })
}

// Blob转canvas

export function BlobToCanvas(blob, cb) {
    fileOrBlobToDataURL(blob, function(dataurl) {
        dataURLToCanvas(dataurl, cb)
    })
}

// canvas转Blob

export function canvasToBlob(canvas, cb) {
    cb(dataURLToBlob(canvasToDataURL(canvas)))
}

// image转dataURL

export function imageToDataURL(src, cb) {
    imageToCanvas(src, function(canvas) {
        cb(canvasToDataURL(canvas))
    })
}

// dataURL转image，这个不需要转，直接给了src就能用

export function dataURLToImage(dataurl) {
    var img = new Image()
    img.src = d
    return img
}

// 函数前摇
export function beforeRun(fn, ...checks) {
    return function(...args) {
        if (checks.every(check => check.bind(this)())) {
            return fn.bind(this)(...args)
        }
    }
}

// Proxy
export function createProxy(origin, whiteList) {
    return new Proxy(origin, {
        get(target, property) {
            return whiteList.includes(property) ?
                target[property] :
                beforeRun(target[property], ...whiteList.map(fn => target[fn]))
        }
    })
}

// 挂载到Vue
export function mount(general) {
    const res = {}
    for (let [key, val] of Object.entries(general)) {
        res[key] = function(...args) {
            val.bind(this)(...args)
        }
    }
    return res
}

// 检测是否全路径内部白名单
export function isCertWhite(path, cert, map) {
    const certs = map.get(path)
    return !!(certs && certs.cert == cert)
}

export let browser = null

if (!process.server) {
    browser = {
        versions: (function() {
            let u = navigator.userAgent,
                app = navigator.appVersion
            return {
                trident: u.indexOf('Trident') > -1, // IE内核
                presto: u.indexOf('Presto') > -1, // opera内核
                webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                isWeChat: /MicroMessenger/i.test(u) // 是否微信
            }
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    Object.freeze(browser)
}

// 防抖
export function debounce(fun, wait) {
    let time = null
    return function() {
        const args = Array.prototype.slice.call(arguments)
        time && clearTimeout(time)
        time = setTimeout(() => fun.apply(this, args), wait)
    }
}

import { createNamespacedHelpers } from 'vuex'
/**
 * @Description: 购物车对外部模块接口
 * @Date: 2019-11-13 17:32:18
 * 示例:cartTools.countChange.call(this)
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const cartTools = (() => {
    const { mapActions } = createNamespacedHelpers('moduleCart')
    return {...mapActions(['countChange']) }
})()

import area from "@/assets/js/area"
// 根据code 获取城市名称正则
export function getCityName(num) {
    let areaString = JSON.stringify(area)
    var re = new RegExp('("' + num + '":").*?(?=",)')
    let cityName = areaString.match(re)
        // let strName = cityName[0].slice(10)
        // return strName
}