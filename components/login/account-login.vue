<template>
    <div>
        <el-form ref="form" :model="ruleForm" class="account-box" :rules="rules" @validate="validateChange">
            <el-form-item class="account-inner account" prop="account" :show-message="false">
                <div class="sd-tip" v-show="showSdTip.includes(true)">
                    <i class="el-icon-remove"></i>
                    {{sdTipTxt}}
                </div>
                <el-input class="inp" maxlength="11" v-model="ruleForm.account" placeholder="手机号码">
                    <img class="inp-icon" :class="{'bd-icon': usrNowI === 1}" slot="prefix"
                         :src="usrIcon[usrNowI]" />
                </el-input>
            </el-form-item>
            <el-form-item prop="password" :show-message="false">
                <div class="account-inner">
                    <el-input class="inp" maxlength="32" type="password" v-model="ruleForm.password"
                              @keyup.enter.native="loginHandle('form')" placeholder="密码">
                        <img class="inp-icon" :class="{'bd-icon': pwdNowI === 1}" slot="prefix"
                             :src="pwdIcon[pwdNowI]" />
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item prop="codes" :show-message="false" v-show="errorNum>=3&&!isBind" style="margin-bottom: 10px;">
                <div class="account-code">
                    <el-input class="inp"  type="text" v-model="ruleForm.codes"
                              @keyup.enter.native="loginHandle('form')" placeholder="">
                    </el-input>
                    <div class="code-img" @click="getCode">
                        <img :src="codeData.captcha_image_content" alt="">
                    </div>
                </div>
            </el-form-item>
            <div class="text-inner" v-if="!isBind">
                <!-- <el-checkbox label="两周内免登录"></el-checkbox> -->
                <nuxt-link to="/forget">忘记密码</nuxt-link>
            </div>
            <div class="login-btn user_select" @click="loginHandle" v-if="!isBind">登录</div>
            <div class="login-btn user_select" @click="bindLogin" v-else>确认绑定</div>
        </el-form>

    </div>

</template>

<script>
    import {login, getUserInfo,getErr,getImgCode} from '@/api/list'
    import {bindUser} from '@/api/order'
    import {delCookie, getCookie, setCookie,newDeviceCode} from "@/utils";
    import {mapMutations} from 'vuex'
    import {tokenDoing} from '@/utils/tool'
    import {loginInp} from '@/utils/common-mixins'
    import passwordEncryption from '@/utils/passwordEncryption'
    import dataEventTrack from '@/utils/dataEventTrack';


    export default {
        props: {
            isBind: {
                type: Boolean,
                default: false
            }
        },
        mixins: [loginInp()],
        data() {
            const {wechat, qq, avatar, name, unionid} = this.$route.query;
            return {
                wechatid: wechat,
                qqid: qq,
                avatar: avatar,
                othname: name,
                unionid: unionid,
                ruleForm: {
                    account: '',
                    password: '',
                    codes:''
                },
                isLoading: false,
                errorNum:0,
                codeData:{}
            }
        },
        mounted(){
            // 根据浏览器自动生成用户唯一标识码
            newDeviceCode();
            this.ruleForm.account = sessionStorage.getItem('uAccount')||''
            // this.$emit('getErrorNum', this.errorNum)
            this.getErrFn()
        },
        methods: {
            ...mapMutations(['CHANGE_USER_INFO', 'SAVE_TOKEN']),
            async getCode(){
                let res = await getImgCode({mobile:this.ruleForm.account})
                if(res.data.code==200){
                    this.codeData = res.data.data
                }
            },
            async getErrFn(){
                let res = await getErr({mobile:this.ruleForm.account})
                if(res.data.code==200){
                   this.errorNum = res.data.data&&res.data.data.number
                   this.$emit('getErrorNum', this.errorNum)
                   if(this.errorNum>=3){
                       this.getCode()
                   }
                }
            },
             loginHandle() {
                if (this.isLoading) return
                this.$refs.form.validate((valid, obj) => {
                    if (!valid) {
                        return
                    }
                    // var reN = /^[a-z0-9A-Z]{6,32}$/;
                    // if (this.ruleForm.password == "" || !reN.test(this.ruleForm.password)) {
                    //     this.$message.error("请输入6-32位密码");
                    //     return
                    // }
                    // 密码加密
                    const password = passwordEncryption(this.ruleForm.account, this.ruleForm.password);

                    let data = {username: this.ruleForm.account, password,verification_captcha_code:this.ruleForm.codes,verification_captcha_key:this.codeData.captcha_key||null}
                       dataEventTrack({
                        referer: document.referrer,
                        event_type: 'click',
                        kv: {
                            router: this.$route.fullPath,
                            rname:'账号密码登录',
                        }
                        })
                    this.isLoading = true;
                    login(data).then(res => {
                        sessionStorage.setItem('uAccount',this.ruleForm.account)
                        this.getErrFn()
                        let {code, data, message} = res.data
                        if (!data) {
                            this.isLoading = false;
                            return this.$message.error(message || '请求错误')
                        }
                        let access_token = data.access_token
                        this.loginDoed(access_token)
                    }).catch(err => {
                        // this.$message.error(err)
                        this.isLoading = false;
                    })
                })

            },
            bindLogin() {
                if (this.isLoading) return
                this.$refs.form.validate(async valid => {
                    if (!valid) return
                    const opts = {
                        username: this.ruleForm.account,
                        password: passwordEncryption(this.ruleForm.account, this.ruleForm.password), // this.ruleForm.password,
                        wechatid: this.wechatid,
                        qqid: this.qqid,
                        name: this.othname,
                        unionid: this.unionid
                    }
                    this.isLoading = true;
                    
                    const data = await bindUser(opts)
                      dataEventTrack({
                        referer: document.referrer,
                        event_type: 'click',
                        kv: {
                            router: this.$route.fullPath,
                            rname:'账号密码绑定',
                        }
                        })  
                    if (!data) {
                        this.isLoading = false;
                        return;
                    }
                    if(data.data.code!=200){
                       this.isLoading = false;
                        return this.$message.error(data.data.message); 
                    }
                    this.loginDoed(data.data.data.access_token)
                })
            },
            loginDoed(token) {
                tokenDoing(token)
                this.SAVE_TOKEN(token)
                getUserInfo(token).then(rsp => {
                    let {code, data, message} = rsp.data
                    if (code == '200') {
                        this.CHANGE_USER_INFO(data)
                        this.$router.push('/')
                    } else {
                        this.$message.error(message)
                    }
                }).catch((err) => {
                    this.$message.error(err)
                }).finally(()=> this.isLoading = false)
            }
        }
    }
</script>

<style scoped lang="less">
    .account-box {
        margin: auto;
        width: 285px;

        /deep/ .text-inner {
            display: flex;
            justify-content: flex-end;

            .el-checkbox {
                display: flex;
                align-items: center;

            }

            .el-checkbox__original,
            .el-checkbox__label {
                color: #666;
            }

            .el-checkbox__label {
                font-size: 12px;
                line-height: 1;
                padding-left: 5px;
            }

            .el-checkbox__input {
                line-height: 12px;
                height: 12px;
            }

            .el-checkbox__inner {
                width: 12px;
                height: 12px;
                border: 1px solid #999;

                &::after {
                    left: 3px;
                    top: 0;
                }
            }

            a {
                color: #666;
                font-size: 12px;

                &:hover {
                    color: #f3262d;
                }
            }
        }

        .login-btn {
            cursor: pointer;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            color: #fff;
            margin-top: 18px;
            width: 285px;
            background-color: #f3262d;
            background-image: linear-gradient(#ff4c0d, #ff0000);
        }

        .account-inner {
            box-sizing: border-box;
        }
          
   
    }

    @import "./inp.less";
</style>
<style lang="less">
      .account-code{
            display: flex;
            justify-content: space-around;
               .inp{
                width: 163px !important;
                margin: 0;
                margin-left: -4px;
                text-align: center;
                input{
                    padding-left:12px !important;
                }
                }
            .code-img{
                width: 110px;
                height: 40px;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        } 
</style>
