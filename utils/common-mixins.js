import Cookie from 'js-cookie'
import {get } from '~/plugins/service'
import { Message } from 'element-ui'
import { regDaqo, createProxy, mount } from '~/utils/tool'
import { viewFiles } from '@/api/order'
import { getUserInfo,msgcount, msgcountS, } from '@/api/list'
import { indexDataInit } from '@/api/require-base'
import { tokenDoing, EventUtil } from '@/utils/tool'
import { getCookie } from '.'
/**
 * @Description: 分页
 * @param {listName | String} 列表字段名
 * @return: Mixin
 * @Date: 2019-11-02 18:56:56
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
/*
 */
export const pageMixin = listName => {
    return {
        data() {
            return {
                nowPage: 1
            }
        },
        computed: {
            total() {
                return this[listName].total
            },
            pageSize() {
                return this[listName].per_page
            },
            totalPage() {
                return Math.floor(this[listName].total / this.pageSize)
            }
        },
        methods: {
            async pageChange(cur) {
                const list = await this.getData(cur)
                this[listName] = list
            }
        }
    }
}

/**
 * @Description: 倒计时
 * @param {countDownStandard | Number} 倒计时标准
 * @return:
 * @Date: 2019-11-02 18:57:39
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const countDownMixin = ({
    countDownStandard = 60,
    countDownBtnText = '发送验证码',
    UItemplate = '重新获取({time})'
} = {}) => {
    return {
        data() {
            return {
                countDownConfig: {
                    countDown: 0,
                    countDownStandard,
                    countDownBtnText,
                    timer: null
                }
            }
        },
        computed: {
            countDownUIText() {
                const { countDown, countDownBtnText } = this.countDownConfig
                return countDown <= 0 ? countDownBtnText : UItemplate.replace('{time}', countDown)
            },
            canCountDownDo() {
                const { countDown } = this.countDownConfig
                return countDown <= 0
            }
        },
        methods: {
            countDownInit() {
                this.countDownConfig.countDown = this.countDownConfig.countDownStandard
                this.countDownFn()
            },
            countDownFn() {
                this.countDownConfig.timer = setTimeout(() => {
                    this.countDownConfig.countDown--
                        if (this.countDownConfig.countDown <= 0) return clearTimeout(this.countDownConfig.timer)
                    this.countDownFn()
                }, 1000)
            }
        },
        beforeDestory() {
            this.countDownConfig.timer && clearTimeout(this.countDownConfig.timer)
        }
    }
}

/**
 * @Description: 弹窗统一关闭
 * @param {type}
 * @return:
 * @Date: 2019-11-02 20:48:28
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const dialogMixin = ({ closeFnName = 'close' } = {}) => {
    return {
        methods: {
            close(data) {
                this.$emit(closeFnName, data)
            }
        }
    }
}

/**
 * @Description: 上传统一
 * @param {type}
 * @return:
 * @Date: 2019-11-03 22:47:03
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const uploadMixin = ({ limit = 5, url, maxSize = 524288000 } = {}) => {
    return {
        data() {
            return {
                fileList: [],
                fileLimit: limit,
                fileHeaders: {},
                maxSize,
            }
        },
        mounted() {
            this.fileHeaders = {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            }
        },
        computed: {
            imgApi() {
                return url || this.$store.state.uploadApi
            }
        },
        methods: {
            fileSuccess(res, file, fileList) {
                this.fileList = fileList
            },
            fileChange(file, fileList) {
                this.fileList = fileList
            },
            fileRemove(file, fileList) {
                this.fileList = fileList
            },
            filePreview(file) {
                console.log(file)
            },
            fileExceed(files, fileList) {
                this.$message.error(
                    `当前限制选择 ${this.fileLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
                    fileList.length} 个文件`
                )
            },
            beforeFileRemove(file, fileList) {
                if (file.size > this.maxSize) return true
                return this.$confirm(`确定移除 ${file.name}？`)
            }
        }
    }
}

/**
 * @Description: 下载
 * @param {type}
 * @return:
 * @Date: 2019-11-06 09:37:30
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const downloadMixin = () => {
    return {
        computed: {
            imgHost() {
                return this.envVars.IMG_HOST
            }
        },
        methods: {
            async download(path, name, id) {
                // 兼容其他模块使用  所以添加id  不删减前面的参数
                // let url = id ? await this.getFileForId(id, 'PUT') : `${this.imgHost}${path}`
                let url = id ? `/service/downFile?id=${id}` : `${this.imgHost}${path}`
                // console.log(url)
                get({
                        url
                    }, {
                        headers: {
                            'response-content-type': 'application/octet-stream',
                            'response-content-disposition': `attachment; filename="${encodeURI(name)}"`

                        },
                        responseType: 'blob'
                    })
                    .then(res => this.createDown(res.data, name))
                    .catch(e => Message.error('下载文件失败'))
            },
            createDown(res, name) {
                let blob = new Blob([res], { type: res.type })
                let downloadElement = document.createElement('a')
                let href = window.URL.createObjectURL(blob) //创建下载的链接
                downloadElement.href = href
                downloadElement.download = name //下载后文件名
                document.body.appendChild(downloadElement)
                downloadElement.click() //点击下载
                document.body.removeChild(downloadElement) //下载完成移除元素
                window.URL.revokeObjectURL(href) //释放blob对象
            },
            async previewFile(path, name, id) {
                // 兼容其他模块使用  所以添加id  不删减前面的参数
                if (id) {
                    const url = await this.getFileForId(id)
                    url && window.open(url)
                } else {
                    // 根据路径和名字
                    if (!name || !path) return this.$message.error('该文件异常')
                    if (regDaqo.orderCanRead.test(name)) {
                        // 图片查看
                        window.open(`${this.imgHost}${path}`)
                    } else {
                        this.$message.error('暂不支持在线查看该文件,您可以下载至本地查看')
                    }
                }
            },
            async getFileForId(id, way) {
                // 根据文件id获取地址 曾经的方法 不知道用不用
                const res = await viewFiles(id, way).catch(e => this.$message.error('获取文件路径失败'))
                if (!res) return
                return res.url
            },
            formatTime(num) {
                let timeNum = parseInt(num);
                let mm = parseInt(timeNum / 60);
                let ss = timeNum % 60;
                if (mm < 10) {
                    mm = '0' + mm
                }
                if (ss < 10) {
                    ss = '0' + ss
                }
                return mm + ':' + ss;
            }
        }
    }
}

/**
 * @Description: 拦截注入
 * @param {
 * origin 需要拦截的主体方法对象
 * checks 需要执行的检测
 * }
 * @return:
 * @Date: 2019-11-06 16:02:11
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const proxyMixin = (origin = {}, checks = []) => {
    const _origin = {
        checkStore() {
            // 检测当前店铺状态
            return this.identity === 1 || !!(this.orderInfo && this.orderInfo.employee.status === 1)
        }
    }
    const methods = createProxy(Object.assign({}, _origin, origin), ['checkStore', ...checks])
    return {
        methods: mount(methods)
    }
}

/**
 * @Description: rate图标
 * @param {type}
 * @return:
 * @Date: 2019-11-07 14:16:00
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const rateMixin = () => {
    return {
        data() {
            return {
                rateColor: ['#F3262D', '#F3262D', '#F3262D'],
                voidRate: 'icon-xingxingmoren iconfont',
                activeRate: [
                    'icon-xingxingbiaohong iconfont',
                    'icon-xingxingbiaohong iconfont',
                    'icon-xingxingbiaohong iconfont'
                ]
            }
        }
    }
}

/**
 * @Description: 需要伪首页初始化
 * @param {isIndex 是否首页}
 * @return:
 * @Date: 2019-11-11 19:37:42
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const indexInitMixin = isIndex => {
    return {
        methods: {
            reloadPage() {
                this.$router ? this.$router.replace('/') : location.reload()
            },
            async indexInit(callback) {
                const token = localStorage.getItem('access_token') || getCookie('access_token')
                const res = await this.getIndexData()
                res && callback && callback(res)
                if (token) {
                    /* 兼容混乱状态 */
                    !isIndex && this.$store && this.$store.commit('SAVE_TOKEN', token);
                    !isIndex && tokenDoing(token);
                    await this.setUser(token)
                } else {
                    !isIndex && this.$loginp(0)
                }
            },
            async setUser(token) {
                // 设置用户信息
                const user = await getUserInfo(token).catch(e => console.warn('获取用户信息失败'))
                if (user && user.data.code === 200) {
                    const data = user.data.data
                    if (this.$store) {
                        this.$store.commit('CHANGE_USER_INFO', data)
                    }
                    // else {
                    // 	localStorage.setItem('userInfo', JSON.stringify(data))
                    // }
                    localStorage.setItem('userInfo', JSON.stringify(data))
                }
                return user
            },
            // async msg_S(token){
            //     const msgS = await msgcountS(token).catch(e => console.warn(''))
            //     if (msgS && msgS.data.code === 200){
            //         console.log('msgS',msgS)
            //         const data = msgS.data.data
            //         if (this.$store) {
            //             this.$store.commit('CHANGE_MSG_S', data)
            //             localStorage.setItem('msgS', JSON.stringify(data))
            //         }
            //     }
            // },
            // async msg_T(token){
            //     const msgT = await msgcount(token).catch(e => console.warn(''))
            //     if (msgT && msgT.data.code === 200){
            //         const data = msgT.data.data
            //         if (this.$store) {
            //             this.$store.commit('CHANGE_MSG_T', data)
            //             localStorage.setItem('msgT', JSON.stringify(data))
            //         }
            //     }
            // },
            async getIndexData() {
                const res = await indexDataInit().catch(e => {
                    this.$message.error('获取首页数据失败,将调整至首页')
                    this.reloadPage()
                })
                if (!res) return false

                try {
                    this.indexDataInited(res)
                } catch (e) {
                    this.$message.error(e)
                    this.reloadPage()
                }
                return res
            },
            indexDataInited(data) {
                const negate = localStorage.getItem('negate')
                if (negate && new Date().getTime() - negate < 3600000) return
                localStorage.setItem('negate', new Date().getTime())
                this && this.$store && this.$store.commit('CHANGE_IMG_HOST', data.img_host + '/')
            }
        }
    }
}

/**
 * @Description: 回到顶部
 * @param {type}
 * @return:
 * @Date: 2019-12-10 16:33:29
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */

export const upBackMixin = () => {
    return {
        data() {
            return {
                screenHeight: !process.server ? window.screen.availHeight : 0,
                scrollTop: 0,
                scrollH:0,
                toTopTime:null
            }
        },
        computed: {
            showBackTop() {
                return this.scrollTop / this.screenHeight >= 1
            }
            
        },
        mounted() {
            !process.server && EventUtil.addHandler(window, 'scroll', this.scrollEvent, true)
            window.addEventListener('scroll',()=>{
                // console.log('11:',this.scrollH,document.documentElement.scrollTop)
              if(this.scrollH<document.documentElement.scrollTop){
                clearTimeout(this.toTopTime);
              }
             })
        },
        beforeDestroy() {
            EventUtil.removeHandler(window, 'scroll', this.scrollEvent, true)
            clearTimeout(this.toTopTime);
        },
        methods: {
            scrollEvent() {
                this.scrollTop = EventUtil.scrollTop()
            },
            backTop() {
                // const speed = Math.floor(-this.scrollTop / 5)
                if (this.scrollTop <= 0){
                    clearTimeout(this.toTopTime);
                }else{
                    this.toTopTime = setTimeout(() => {
                        document.documentElement.scrollTop = document.body.scrollTop =0// this.scrollTop -1500
                        this.scrollH = document.documentElement.scrollTop
                        this.backTop()
                        }, 0.1);
                }
               
                // requestAnimationFrame(() => this.backTop())
               
            }
        }
    }
}

/**
 * @Description: sdloginmixin
 * @param {type}
 * @return:
 * @Date: 2019-12-13 11:33:17
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
const l1 = require('@/assets/img/l1.png')
const l2 = require('@/assets/img/l2.png')
const u1 = require('@/assets/img/u1.png')
const u2 = require('@/assets/img/u2.png')
const p1 = require('@/assets/img/p1.png')
const p2 = require('@/assets/img/p2.png')

export const loginInp = (isReg = false) => {
    return {
        data() {
            var passReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,32}$/
            var  validatePasswd = (rule, value, callback) => {
                // console.log(passReg.test(value),this.ruleForm)
                //是否为登陆页面
                let isLogin =  JSON.stringify(this.ruleForm).indexOf('verifyCode2')==-1;
                // console.log(isLogin)
                if (value === '') {
                  callback(new Error('请输入密码'));
                  return false
                } else if(isLogin&&value.length<6||value.length>32){
                  callback(new Error('请输入正确的密码'));
                  return false
                }else if (!isLogin&&value.length<8||value.length>32) {
                  callback(new Error('密码长度为8个到32个字符'));
                  return false
                }else if(!isLogin&&!passReg.test(value)){
                  callback(new Error('密码包含字母、数字、特殊符号任意两种'));
                  return false
                }else {
                   callback();
                 }
              };
              var validateCode =(rule, value, callback) => {
                //   绑定页面不需要
                //   console.log(this.$route.name=='binding')
                  let isBind = this.$route.name=='binding'
                    if(!isBind&&this.errorNum>=3&&value == ''){
                        callback(new Error('请输入图形验证码'));
                        return false
                    }else {
                    callback();
                  }
              } 
            return {
                rules: {
                    // 校验
                    account: [
                        { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
                        {
                            pattern: regDaqo.phone,
                            message: '手机号格式不正确',
                            trigger: 'blur'
                        }
                    ],
                    verifyCode: [{ required: true, message: '验证码不能为空', trigger: ['blur', 'change'] }],
                    verifyCode2: [{ required: true, message: '验证码不能为空', trigger: ['blur', 'change'] }],
                    password: [
                        { validator: validatePasswd, trigger: ['blur', 'change'] },
                        // { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
                        // isReg && {
                        //     min: 8,
                        //     max: 32,
                        //     message: '密码只能是8-32位字母、数字或符号组成！'
                        // }
                    ],
                    codes:[{ validator:validateCode, trigger: ['blur', 'change'] }]
                },
                pwdIcon: [l1, l2],
                usrIcon: [u1, u2],
                codeIcon: [p1, p2],
                pwdNowI: 0,
                usrNowI: 0,
                codeNowI: 0,
                iconMapList: new Map([
                    ['account', 'usrNowI'],
                    ['verifyCode', 'pwdNowI'],
                    ['password', 'pwdNowI'],
                    ['verifyCode2', 'codeNowI'],
                ]),
                showSdTip: [false, false, false,false],
                usrTip: '',
                codeTip: '',
                pwdTip: '',
                codesTip:''
            }
        },
        computed: {
            sdTipTxt() {
                return this.usrTip || this.pwdTip || this.codeTip||this.codesTip
            }
        },
        methods: {
            validateChange(name, res, msg) {
                if(name=='codes'){
                    this.codesTip = msg || ''
                    this.showSdTip[3] = !res 
                }
                const prop = this.iconMapList.get(name)
                if (!prop) return
                this[prop] = res ? 0 : 1
                if (name === 'account') {
                    this.usrTip = msg || ''
                    this.showSdTip[0] = !res
                }
                if (['verifyCode', 'verifyCode2'].includes(name)) {
                    this.codeTip = msg || ''
                    this.showSdTip[1] = !res
                }
                if (name === 'password') {
                    this.pwdTip = msg || ''
                    this.showSdTip[2] = !res
                }
                
              
            }
        }
    }
}

/**
 * @Description: 更改主题
 * @param {type}
 * @return:
 * @Date: 2019-11-13 17:32:18
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const bodyColor = className => {
    return {
        data() {
            return {
                oldBodyClass: '',
                oldHtmlClass: '',
                bodyInstance: null,
                htmlInstance: null
            }
        },
        mounted() {
            this.bodyInstance = document.getElementsByTagName('body')[0]
            this.htmlInstance = document.getElementsByTagName('html')[0]
            this.oldHtmlClass = this.htmlInstance.className
            this.oldBodyClass = this.bodyInstance.className
            this.bodyInstance.className = `${this.oldBodyClass} ${className}`
            this.htmlInstance.className = `${this.oldHtmlClass} ${className}`
        },
        beforeDestroy() {
            this.bodyInstance.className = this.oldBodyClass
            this.htmlInstance.className = this.oldHtmlClass
        }
    }
}
import { createNamespacedHelpers } from 'vuex'

/**
 * @Description: 购物车
 * @Date: 2019-11-13 17:32:18
 * @LastEditors: Eve
 * @LastEditTime: Do not edit
 */
export const shopCartMixin = () => {
    const { mapState, mapActions } = createNamespacedHelpers('moduleCart')
    return {
        filters: {
            buildAmount(arr) {
                return arr.reduce((pre, cur) => pre + cur.num * cur.price, 0)
            }
        },
        computed: {
            ...mapState({
                carDot: state => state.count,
                cartData: state => state.cartData,
                cartLoading: state => state.cartLoading
            }),
            sum() {
                return this.carDot //this.cartData.reduce((pre, cur) => pre + cur.goodsList.reduce((pre, cur) => pre + cur.num, 0), 0)
            },
            totalAmount() {
                return this.cartData.reduce((pre, cur) => pre + this.$options.filters['buildAmount'](cur.goodsList), 0)
            },
            negate() {
                return this.cartData.map(store => store.goodsList.filter(goods => goods.changed === 1)).flat()
            }
        },
        methods: {
            ...mapActions(['countChange', 'updateCartData', 'delGoods'])
        }
    }
}