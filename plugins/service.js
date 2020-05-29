import axios from 'axios'
import Cookie from 'js-cookie'
import qs from 'qs'
// import { Message, Notification } from 'element-ui' // 这里使用了element-ui的消息提示方法，也可自行定义
import {
    Loginp
} from '@/components/plugins/LoginPlugin'
import CONFIG from '@/config';
import {
    delCookie
} from "../utils";
import {
    getInterval
} from '@/utils/common.js'
import {
    refreshToken
} from '@/api/common.js'
import {
    tokenDoing
} from '@/utils/tool'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8'

const {
    API_ROOT_URL,
    API_ROOT_URL_INTERNAL
} = CONFIG;
const whiteList = ['/api/service/checkStatus', '/api/user/msgcount']
let service = axios.create({
    baseURL: process.server ? API_ROOT_URL_INTERNAL : API_ROOT_URL,
    timeout: 10 * 1000
})
const isBrowser = process.browser;
const BASE_URL = API_ROOT_URL,
    OUT_TIME = 10000
const req = axios.create({
    baseURL: '',
})
class AxiosOpts {
    /**
     * @Description: 请求参数类
     * @param {Object
     * props ⏬
     * method 方法  url 地址 data 参数 baseURL 基础地址 json 是否json forms 是否formData
     * time 超时时间 onUploadProgress 上传钩子
     * }
     * @return: 用于axios请求的参数
     * @Date: 2019-11-11 11:27:06
     * @LastEditors: Eve
     * @LastEditTime: Do not edit
     */

    constructor({
        method,
        url,
        data,
        baseURL = BASE_URL,
        json = true,
        forms,
        time = OUT_TIME,
        onUploadProgress
    }) {
        this.initForm(data, json, forms)
        this.method = method
        this.baseURL = baseURL
        this.url = url
        this.timeout = time
        this.onUploadProgress = onUploadProgress
        // 改变header
        this.headers = {
            'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded; '
        }
    }

    data
    params
    // formData
    form = isBrowser ? new window.FormData() : undefined
    // JSON String
    formString = ''
    baseURL
    url
    headers
    timeout
    method = 'post'
    initForm(data, json, forms) {
        // 初始化data
        if (forms) {
            for (let [key, val] of Object.entries(data)) {
                if (!Array.isArray(val)) {
                    this.form.append(key, val)
                } else {
                    val.forEach(item => this.form.append(`${key}[]`, item))
                }
            }
            this.data = this.form
        } else if (json) {
            this.data = data
        } else {
            this.formString = qs.stringify(data)
            this.data = this.formString
        }
    }
}



// 请求拦截 可在请求头中加入token等
service.interceptors.request.use(
    config => {
        let Token;
        if (typeof localStorage === 'undefined') {
            Token = '' // Cookie.get('access_token');
        } else {
            Token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : '';
        }

        if (Token) {
            config.headers['Content-Type'] = 'application/json'
            config.headers.Authorization = 'Bearer ' + Token
            // token的时效性，30-60分钟之间需要更换令牌
            const tokenTime = getInterval(localStorage.getItem('token_start_time'), new Date().getTime()).minute

            if (tokenTime > 30 && tokenTime < 60) {
                localStorage.setItem('token_start_time', new Date().getTime())
                refreshToken().then((res) => {
                        tokenDoing(res.data.data.access_token)
                        $nuxt.$store.commit("SAVE_TOKEN", res.data.data.access_token);
                    },
                    (err) => {}
                )
            }
        } else {
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截 对响应消息作初步的处理
service.interceptors.response.use(
    resp => {
        return resp
    },
    error => {
        console.log('接口请求发生错误', error)
        if (error.response) {
            if (error.response.status == 401) {
                $nuxt.$store.commit("SAVE_TOKEN", null);
                $nuxt.$store.commit("CHANGE_USER_INFO", null);
                Cookie.remove('access_token')
                Cookie.remove('userInfo')
                delCookie("userInfo");
                delCookie("access_token");
                localStorage.removeItem('storeInfo')
                localStorage.removeItem('countNum')
                localStorage.removeItem('countNumS')
                localStorage.removeItem('access_token')
                localStorage.removeItem('token_start_time')
                localStorage.removeItem('userInfo')
                sessionStorage.clear()
                if (!process.server) {
                    let sampleUrl = error.config.url.split('?')[0];
                    if (whiteList.includes(sampleUrl)) {
                        return
                    }
                    // if (location.pathname === '/') {
                    //     // console.log(`${location.href}login`)
                    //     // window.open(location.href + 'login', "_self")
                    //     // return
                    // } else 
                    if (location.pathname === '/login') {
                        return
                    } else {
                        if (location.pathname !== '/invitation') {
                            Loginp(0, () => window.location.reload(true))
                        }
                        return
                    }
                }
            }
        }
        return Promise.reject(error.response)
    }
)
export const post = ({
    url,
    data,
    baseURL,
    json,
    forms,
    onUploadProgress
}, args) => {
    let opts = new AxiosOpts({
        method: 'post',
        url,
        data,
        baseURL,
        json,
        forms,
        onUploadProgress
    })
    return service(args ? Object.assign({}, args, opts) : opts)
}
export const get = ({
    url,
    data,
    json = false,
    baseURL
}, args) => {
    let opts = new AxiosOpts({
        method: 'get',
        url,
        data,
        json,
        baseURL
    })
    opts.params = data || {}
    return service(args ? Object.assign({}, args, opts) : opts)
}
export default service