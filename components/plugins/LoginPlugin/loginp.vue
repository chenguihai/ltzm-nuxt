<template>
  <div class="login-box loginPlugin" v-if="visible" @keyup.enter="submit">
    <div :class="['login-con ', showLogin?'popupLogin':'']" v-loading="loading" :style="loginType==0&&errorNum>=3?'height:400px':''" v-if="!isWx">
      <i class="iconfont icon-guanbi close" @click="closeSelf(1)"></i>
      <ul class="login-tap-box">
        <li
          class="tap"
          :class="{'active':loginType === 0 || loginType === 2}"
          @click="changeType(0,-1)"
        >登录</li>
        <li class="tap" :class="{'active':loginType === 1}" @click="changeType(1)">注册</li>
      </ul>

      <div class="login" v-if="loginType === 0">
        <input
          type="text"
          class="login-inp"
          placeholder="手机号码"
          autocomplete="off"
          v-model="loginForm.username"
        />
        <input
          type="password"
          class="login-inp"
          placeholder="密码"
          autocomplete="off"
          maxlength="32"
          v-model="loginForm.password"
        />
        <div class="img-code-box" v-show="errorNum>=3">
          <div class="img-input"><input type="text" v-model="loginForm.verification_captcha_code"></div>
          <div class="code-img" @click="getCode">
              <img :src="codeData.captcha_image_content&&codeData.captcha_image_content||''" alt="">
          </div>
        </div>
        <p class="forget" @click="goForget">忘记密码？</p>
        <div class="submit" @click="submit">立即登录</div>
      </div>

      <div class="regsiter" v-if="loginType === 1">
        <input
          type="text"
          class="login-inp"
          placeholder="手机号码"
          autocomplete="off"
          v-model="regsForm.username"
        />
        <input
          type="password"
          class="login-inp"
          placeholder="请输入密码"
          maxlength="32"
          autocomplete="off"
          v-model="regsForm.password"
        />
        <div class="code-box">
          <input
            type="text"
            class="login-inp inp-code"
            placeholder="验证码"
            autocomplete="off"
            v-model="regsForm.code"
            maxlength="4"
            @keyup="regsForm.code=regsForm.code.replace(/\s+/g,'')"
          />
          <div class="send-btn" @click="send" v-loading="codeLoading">{{sendText}}</div>
        </div>
        <div class="user">
          <el-checkbox v-model="regsForm.check">
            <span class="span">我已看过并接受
           <a class="protocol-enter" href="/aboutUs/regulation/regulation?type=1" target="_blank">《服务协议》</a>
           <a class="protocol-enter" href="/aboutUs/regulation/regulation?type=2" target="_blank">《隐私保护政策》</a>
              </span>

          </el-checkbox>
        </div>
        <div class="submit" @click="submit">立即注册</div>
      </div>

      <div class="phone-box" v-if="loginType === 2">
        <input
          type="text"
          class="login-inp"
          placeholder="手机号码"
          autocomplete="off"
          v-model="phoneForm.username"
        />
        <div class="code-box">
          <input
            type="text"
            class="login-inp inp-code"
            placeholder="请输入验证码"
            autocomplete="off"
            v-model="phoneForm.code"
            maxLength="6"
          />
          <div class="send-btn" @click="send" v-loading="codeLoading">{{sendText}}</div>
        </div>
        <p class="forget" style="font-size:12px">注：未注册的手机将自动创建为凌天众媒账号！</p>
        <div class="submit" @click="submit">立即登录</div>
      </div>

      <div class="reg" v-if="loginType !== 1">
        <div class="reg-top">
          <p>使用合作方账号登录</p>
          <p class="phone-login" @click="changeType(2)" v-if="loginType === 0">手机验证码登录></p>
          <p class="phone-login" @click="changeType(0)" v-if="loginType === 2">账号密码登录></p>
        </div>
        <div class="bot">
          <div class="outh-box">
            <div class="outh" @click="outhQQ">
              <img class="outh-icon" src="@/assets/img/QQ-2.png" />
              <span>QQ</span>
            </div>
            <div class="outh" @click="showWx">
              <img class="outh-icon" src="@/assets/img/weixin.png" />
              <span>微信</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wx-login" v-else>
      <wxBox @close="isWx = false"></wxBox>
    </div>
  </div>
</template>

<script>
import {
  login as loginReq,
  sendRegCode,
  quickMobCode,
  register,
  changMobile,
  loginCode,
  getUserInfo,
  getErr,getImgCode
} from "~/api/list";
import { tokenDoing, checkEmptyValue, regDaqo } from "@/utils/tool";
import { Loading } from "element-ui";
import { mapState } from "vuex";
import { indexDataInit } from "@/api/require-base";
import { indexInitMixin } from "@/utils/common-mixins";
import wxBox from "@/components/login/wx-login";
import {newDeviceCode} from "@/utils";
import dataEventTrack from '@/utils/dataEventTrack';
import passwordEncryption from '@/utils/passwordEncryption'

const _user_phone = {
  name: "username",
  test: regDaqo.phone
};
const subFnNameList = new Map([
  [0, "login"],
  [1, "regsiter"],
  [2, "phoneLogin"]
]);
const rulesFormList = new Map([
  ["login", { name: "loginForm", rules: [_user_phone, "password"] }],
  [
    "regsiter",
    {
      name: "regsForm",
      rules: [_user_phone, "password", "code", { name: "check", test: true }]
    }
  ],
  ["phoneLogin", { name: "phoneForm", rules: [_user_phone, "code"] }]
]);
const errorMsgList = new Map([
  ["username", "请输入正确的手机号"],
  ["password", "密码只能由6-16位字母、数字或者符号组成"],
  ["code", "验证码错误"],
  ["check", "请先阅读并接受相关协议"]
]);
export default {
  name: "loginPlugin",
  mixins: [indexInitMixin()],
  components: { wxBox },
  data() {
    return {
      isWx: false,
      visible: false,
      // 0 登录 1注册 2手机登录
      loginType: 0,
      loginForm: {
        username: "",
        password: "",
        verification_captcha_code:''
      },
      regsForm: {
        username: "",
        password: "",
        code: "",
        check: false,
        vkey: ""
      },
      phoneForm: {
        username: "",
        code: "",
        vkey: ""
      },
      sendTime: 0,
      timer: null,
      loading: false,
      codeLoading: false,
      showLogin:false,
      isLoading:false,
      isCode:false,
      codeData:{},
      errorNum:0,
      pathnames:''
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    sendText() {
      return this.sendTime ? `(${this.sendTime})重新获取` : "获取验证码";
    }
  },
  mounted(){
    // 根据浏览器自动生成用户唯一标识码
    newDeviceCode();
    this.loginForm.username = sessionStorage.getItem('uAccount')||'';
    this.pathnames = location.href.split('.com')[1]
    if(this.loginForm.username){
    this.getErrFn()
    }
    setTimeout(()=>{
      this.showLogin = true
        dataEventTrack({
      referer: document.referrer,
      event_type: 'popup_show',
      kv: {
        router: this.pathnames,
      }
    })  
    },30)

  },
  destroyed(){
    this.showLogin = false
  },
  methods: {
   async getCode(){
       let res = await getImgCode({mobile:this.loginForm.username})
       if(res.data.code==200){
           this.codeData = res.data.data
            this.loginForm.verification_captcha_key = this.codeData.captcha_key

       }
   },
    async getErrFn(){
        let res = await getErr({mobile:this.loginForm.username})
        if(res.data.code==200){
           this.errorNum = res.data.data&&res.data.data.number
          //  this.$emit('getErrorNum', this.errorNum)
           if(this.errorNum>=3){
               this.getCode()
           }
        }
    },
    goForget() {
      window.open("/forget");
    },
    showWx() {
      this.isWx = true;
         dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
            router: this.pathnames,
            rname:'微信图标',
          }
        })  
    },
    outhQQ() {
       dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
            router: this.pathnames,
            rname:'QQ图标',
          }
        })
      window.open(`${this.envVars.API_ROOT_URL}/qq/login`);
    },
    changeType(type,addtag) {
      if(this.loginType==2&&addtag){
        return
      }else{
      this.loginType = type;
      }
    },
    submit() {
      if(this.isLoading) return;
      // 在此处已经全部验证
      if (this.loginType == 0) {
        var reN = /^[a-z0-9A-Z]{6,32}$/;
        if (this.loginForm.username == "") {
          this.$message.error("请输入手机号");
          return;
        }
        if (this.loginForm.password == "") {
          this.$message.error("请输入密码");
          return;
        }
        sessionStorage.setItem('uAccount',this.loginForm.username)
        this.getErrFn()
        if (this.loginForm.password.length<6||this.loginForm.password.length>32) {
          this.$message.error("请输入正确的密码");
          return;
        }
        if(this.errorNum>=3&&this.loginForm.verification_captcha_code==''){
           this.$message.error("请输入图形验证码");
          return;
        }
      }
      if (this.loginType == 1) {
        var passReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,32}$/
          if (this.regsForm.username == "") {
            this.$message.error("请输入手机号");
            return;
          }
        if (this.regsForm.password == "") {
          this.$message.error("请输入密码");
          return false;
        }else  if (this.regsForm.password.length<8||this.regsForm.password.length>32) {
          this.$message.error('密码长度为8个到32个字符');
          return false
        } else if(!passReg.test(this.regsForm.password)){
          this.$message.error('密码包含字母、数字、特殊符号任意两种');
          return false
        }

        var data = {
          verification_key: this.regsForm.vkey ,
          mobile:this.regsForm.username,
          password: passwordEncryption(this.regsForm.username, this.regsForm.password), //this.regsForm.password ,
          verification_code:  this.regsForm.code
        };
        if (this.regsForm.vkey == "") {
          this.$message.error("请先获取验证码");
          return;
        }
         if (this.regsForm.code == "") {
          this.$message.error("请输入验证码");
          return;
        }
        if(this.regsForm.check == false){
           this.$message.error("请先阅读并接受相关协议");
           return;
        }
      }
      if(this.loginType == 2){
        if (this.phoneForm.username == "") {
            this.$message.error("请输入手机号");
            return;
          }
        if(this.phoneForm.vkey==''){
           this.$message.error("请先获取验证码");
          return;
        }
        if(this.phoneForm.code==""){
          this.$message.error("请输入验证码");
            return;
        }
      }
      const { type, name, rules, oblig } = this._getFormInfo();
      rules.every(rule => {
        const check = checkEmptyValue(rule, oblig);
        if (!check) {
          this.loading = false;
          this.$message.error(errorMsgList.get(rule.name || rule));
        }
        return check;
      }) && this[type]();

    },
    async login() {
      // 普通登录
      this.isLoading = true;
   
      const res = await loginReq({ 
        username: this.loginForm.username, 
        password: passwordEncryption(this.loginForm.username, this.loginForm.password), // this.loginForm.password,  
        verification_captcha_code: this.loginForm.verification_captcha_code
      });
        dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
            router: this.pathnames,
            rname:'账号密码登录'
          }
        })  
      this.finalFn(res);
    },
    async regsiter() {
      this.isLoading = true;
      // 注册
      const {
        vkey: verification_key,
        username: mobile,
        password,
        code: verification_code
      } = this.regsForm;
      const res = await register({
        verification_key,
        mobile,
        password: passwordEncryption(mobile, password),
        verification_code
      });
        dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
              router: this.pathnames,
              rname:'短信验证码快速注册',
          }
        })
      this.finalFn(res);
    },
    async phoneLogin() {
      // 手机登录
      const {
        vkey: verification_key,
        username: mobile,
        code: verification_code
      } = this.phoneForm;
      this.isLoading = true;
      const res = await loginCode({
        verification_key,
        mobile,
        verification_code
      });
      dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
              router: this.pathnames,
              rname:'短信验证码登陆',
          }
        })
      this.finalFn(res);
    },
    finalFn(res) {
      if (this.reqError(res)) {
        this.loading = false;
        this.isLoading = false;
        return;
      }
      const token = res.data.data.access_token;
      this.success(token);
      this.isLoading = false;
    },
    reqError(response) {
      // 请求检测
      if (!response) {
        this.$message.error("操作失败");
        return true;
      } else if (response.data.code !== 200) {
        this.$message.error(response.data.message);
        return true;
      } else {
        return false;
      }
    },
    async success(token) {
      // 所有操作成功
      /* 设置token 和 用户信息 */
      tokenDoing(token);
      // 首页兼容
      await this.indexInit();
      let s = "";
      switch (this.loginType) {
        case 0:
        case 2:
          s = "登录成功";
        case 1:
          s = "注册成功已经自动登录";
        default:
          s = "操作成功";
      }
      this.$message.success(s);
      this.loading = false;
      this.closeSelf();
    },
    async send() {
      if(this.isCode)return ;
      // 发送验证码
      if (this.sendTime > 0) return;
      const {
        oblig,
        rules: [rule],
        name
      } = this._getFormInfo();

      if (checkEmptyValue(rule, oblig)) {
        this.isCode = true;
        const fn = this.loginType === 2 ? quickMobCode : sendRegCode;
        const res = await fn({ mobile: oblig.username });
        this.isCode = false;
        this.codeLoading = false;
        if (this.reqError(res)) return;
        oblig.vkey = res.data.data.key;
        this.$message.success("验证码已发送");
        this._timeInit();
      } else {
        this.codeLoading = false;
        this.$message.error(errorMsgList.get(rule.name || rule));
      }
    },
    _getFormInfo() {
      // 获取表单信息
      const type = subFnNameList.get(this.loginType);
      const { name, rules } = rulesFormList.get(type);
      const oblig = this[name];
      return { type, name, rules, oblig };
    },
    _timeInit() {
      this.sendTime = 60;
      this._timeGo();
    },
    _timeGo() {
      this.timer = setTimeout(() => {
        this.sendTime--;
        this.sendTime <= 0 ? clearTimeout(this.timer) : this._timeGo();
      }, 1000);
    },
    closeSelf(self) {
      !self && this._resfn && this._resfn();
      this.visible = false;
      setTimeout(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      }, 200);
    },
    regCclick(){
 const {href} = this.$router.resolve({
        path: '/aboutUs/regulation/regulation',
        query: {
          type:'1'
        }
      })
      window.open(href, '_blank')    }
  }
};
</script>

<style scoped lang="less">
@pred: #f3262d;
.img-code-box{
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  .img-input{
     input{
      width: 148px;
      height: 40px;
      border: 1px solid #d1d1d1;
      padding: 14px;
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
.reg {
  padding: 10px 38px;
  box-sizing: border-box;
  height: 60px;
  background: #f3f3f3;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  .reg-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 12px !important;
      margin-top: 0 !important;
      line-height: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999;
    }
  }
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 9px;
  }
  .outh-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .outh {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &:first-child {
        span {
          border-right: 1px solid #bdbdbd;
        }
      }
      &:last-child {
        margin-left: 14px;
      }
      .outh-icon {
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }
      span {
        margin-left: 24px;
        margin-top: 3px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding-right: 14px;
        line-height: 12px;
        &:hover {
          color: #f3262d;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      img{
        position: absolute;
        top: 0;
        left: 0;
      }
      &:hover {
        img{
          animation: fly 0.8s 1 ease-in-out;
          -moz-animation: fly 0.8s 1 ease-in-out; /* Firefox */
          -webkit-animation: fly 0.8s 1 ease-in-out; /* Safari and Chrome */
          -o-animation: fly 0.8s 1 ease-in-out; /* Opera */
        }
      }
      @keyframes fly {
        0% {
          top: 0px;
        }
        50% {
          top: -5px;
        }
        100% {
          top: 0px;
        }
      }
    }
  }
}
.b-hover {
  cursor: pointer;
  &.active,
  &:hover,
  &:active {
    color: @pred;
  }
}
.t-hover {
  .b-hover;
  text-decoration: underline;
}
.login-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2008;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  .login-con {
    background: #fff;
    width: 350px;
    height: 350px;
    padding: 20px 40px;
    box-sizing: border-box;
    position: relative;
    visibility: hidden;
    transition: transform 0.3s;
    transform: scale(0.4);
    .close {
      position: absolute;
      right: 14px;
      top: 14px;
      font-size: 16px;
      width: 14px;
      height: 14px;
      .b-hover;
    }
    .login-tap-box {
      width: 270px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 12px;
      margin: auto;
      .tap {
        flex: 1;
        line-height: 31px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        position: relative;
        .b-hover;
        &:first-child {
          position: relative;
          &::after{
           position: absolute;
            top: 0;
            content: '';
            width: 1px;
            height: 31px;
            right: 0;
            z-index: 999;
            background: #e8e8e8;
          }

        }
      }
       .active::before{
             position: absolute;
            bottom: -13px;
            content: '';
            width: 134.5px;
            height: 2px;
            right: 0;
            z-index: 999;
            background: #f3262d;
          }
    }

    .login-inp {
      width: 270px;
      margin: auto;
      height: 40px;
      margin-top: 16px;
      border: 1px solid #d1d1d1;
      outline: none;
      color: #666666;
      font-size: 14px;
      padding: 14px;
      background: #fff;
    }
    .forget,
    .phone-login {
      font-size: 14px;
      font-weight: 400;
      margin-top: 14px;
      color: #666;
      .b-hover;
    }
  .forget{
    text-align: right
  }
    .submit {
      background: @pred;
      width: 272px;
      height: 44px;
      color: #fff;
      line-height: 44px;
      text-align: center;
      margin: auto;
      margin-top: 13px;
      cursor: pointer;
      background-image: linear-gradient(#ff4c0d, #ff0000);
    }
    .phone-login {
      color: @pred;
      text-align: left;
      margin-top: 7px;
      &:hover {
        text-decoration: underline;
      }
    }

    .code-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      .inp-code {
        width: 147px;
        margin: 0;
        margin-right: 11px;
      }
      .send-btn {
        .submit;
        flex: 1;
        margin: 0;
        height: 40px;
        line-height: 40px;
      }
    }

    .user {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .check {
        width: 14px;
        height: 14px;
        border: 1px solid #999;
        border-radius: 4px;
        margin-right: 4px;
      }
      span {
        font-size: 12px;
        font-weight: 400;
        &:hover{
          color: unset;
        }

      }
    }

    .regsiter {
      .submit {
        margin-top: 2px;
      }
      .protocol-enter{
        color: #067BE7;
      }
    }

    .tip-txt {
      font-size: 12px;
      font-weight: 400;
      color: #999;
      margin-top: 56px;
    }
  }
  .popupLogin{
    visibility: visible;
    transform: scale(1);
    &>.close{
      color: #999999!important;
      font-size: 14px;
    }
    &>.close:hover{
      color: #f3262d!important;
    }
  }
  .wx-login {
    padding: 0;
    background: #fff;
    width: 350px;
    height: 350px;
  }
}

</style>
<style lang="less">
// 覆盖样式
.el-message--error{
    z-index: 99999999;
  }
.regsiter{

  .el-checkbox__label{
    .span{
      &:hover{
        color: unset;
      }
    }
  }
  .is-checked{
    .el-checkbox__label{
     color:#666666;
    }
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #606266;
  }
  }
</style>
