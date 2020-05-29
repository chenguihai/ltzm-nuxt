<template>
  <div class="invitation-box loginPlugin" @keyup.enter="submit">
    <div class="login-con popupLogin" v-loading="loading">
      <h4 class="login_title">
        登录
        <i class="iconfont icon-guanbi close" @click="closeSelf()"></i>
      </h4>
      <div class="phone-box">
        <input
          type="text"
          class="login-inp"
          placeholder="手机号码"
          autocomplete="off"
          maxlength="11"
          v-model="phoneForm.username"
        />
        <div class="code-box">
          <input
            type="text"
            class="login-inp inp-code"
            placeholder="请输入验证码"
            autocomplete="off"
            v-model="phoneForm.code"
            maxlength="4"
          />
          <div class="send-btn" @click="send" v-loading="codeLoading">{{sendText}}</div>
        </div>
        <p class="forget" style="font-size:12px">注：未注册的手机将自动创建为凌天众媒账号！</p>
        <div class="submit submit_active" @click="submit">立即登录</div>
      </div>
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
  getErr,
  getImgCode
} from "~/api/list";
import { fast_login_new } from "@/api/store-flow";
import { tokenDoing, checkEmptyValue, regDaqo } from "@/utils/tool";
import { Loading } from "element-ui";
import { mapState } from "vuex";
import { indexDataInit } from "@/api/require-base";
// import { indexInitMixin } from "@/utils/common-mixins";

const _user_phone = {
  name: "username",
  test: regDaqo.phone
};
const subFnNameList = new Map([
  [0, "login"],
  [2, "phoneLogin"]
]);
const rulesFormList = new Map([
  ["login", { name: "loginForm", rules: [_user_phone, "password"] }],
  ["phoneLogin", { name: "phoneForm", rules: [_user_phone, "code"] }]
]);
const errorMsgList = new Map([
  ["username", "请输入正确的手机号"],
  ["password", "密码只能由6-16位字母、数字或者符号组成"],
  ["code", "验证码错误"],
  ["check", "请先阅读并接受相关协议"]
]);
export default {
  name: "inviteLogin",
  //   mixins: [indexInitMixin()],
  data() {
    return {
      visible: false,
      // 0 登录 1注册 2手机登录
      loginType: 2,
      loginForm: {
        username: "",
        password: "",
        verification_captcha_code: ""
      },
      phoneForm: {
        username: "",
        code: "",
        vkey: "",
        inviteUserId: this.$route.query.inviteUserId
      },
      sendTime: 0,
      timer: null,
      loading: false,
      codeLoading: false,
      isLoading: false,
      isCode: false,
      codeData: {},
      errorNum: 0,
      pathnames: ""
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    sendText() {
      return this.sendTime ? `(${this.sendTime})重新获取` : "获取验证码";
    }
  },
  mounted() {
    // this.loginForm.username = sessionStorage.getItem("uAccount") || "";
    // this.pathnames = location.href.split(".com")[1];
    // if (this.loginForm.username) {
    //   this.getErrFn();
    // }
  },
  methods: {
    // async getCode() {
    //   let res = await getImgCode({ mobile: this.loginForm.username });
    //   if (res.data.code == 200) {
    //     this.codeData = res.data.data;
    //     this.loginForm.verification_captcha_key = this.codeData.captcha_key;
    //   }
    // },
    // async getErrFn() {
    //   let res = await getErr({ mobile: this.loginForm.username });
    //   if (res.data.code == 200) {
    //     this.errorNum = res.data.data && res.data.data.number;
    //     //  this.$emit('getErrorNum', this.errorNum)
    //     if (this.errorNum >= 3) {
    //       this.getCode();
    //     }
    //   }
    // },
    submit() {
      if (this.isLoading) return;
      if (this.loginType == 2) {
        if (this.phoneForm.username == "") {
          this.$message.error("请输入手机号");
          return;
        }
        if (this.phoneForm.vkey == "") {
          this.$message.error("请先获取验证码");
          return;
        }
        if (this.phoneForm.code == "") {
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

      const res = await loginReq(this.loginForm);
      this.finalFn(res);
    },
    async phoneLogin() {
      // 手机登录
      const {
        vkey: verification_key,
        username: mobile,
        code: verification_code,
        inviteUserId: inviteUserId
      } = this.phoneForm;
      this.isLoading = true;
      const res = await loginCode({
        verification_key,
        mobile,
        verification_code,
        inviteUserId
      });
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
    },
    getUserInfoFun(token) {
      getUserInfo(token)
        .then(rsp => {
          var { code, data, message } = rsp.data;
          if (code == 200) {
            window.localStorage.setItem("userInfo", JSON.stringify(data));
            this.closeSelf();
            var { href } = this.$router.resolve({
              path: "/store",
              query: { storeIndex: "index" }
            });
            window.open(href, "_self");
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => this.$message.error(err));
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
      // await this.indexInit();
      // let s = "";
      // switch (this.loginType) {
      //   case 0:
      //   case 2:
      //     s = "登录成功";
      //   case 1:
      //     s = "注册成功已经自动登录";
      //   default:
      //     s = "操作成功";
      // }
      // this.$message.success(s);
      this.loading = false;
      if (!localStorage.getItem("userInfo")) {
        await this.getUserInfoFun(token);
      } else {
        this.closeSelf();
        var { href } = this.$router.resolve({
          path: "/store",
          query: { storeIndex: "index" }
        });
        window.open(href, "_self");
      }
      // this.$router.push("/store?storeIndex=index");
    },
    async send() {
      if (this.isCode) return;
      // 发送验证码
      if (this.sendTime > 0) return;
      const {
        oblig,
        rules: [rule],
        name
      } = this._getFormInfo();

      if (checkEmptyValue(rule, oblig)) {
        this.isCode = true;
        // const fn = sendRegCode;
        const fn = fast_login_new;
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
    closeSelf() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="less">
@pred: #f3262d;
.b-hover {
  cursor: pointer;
  &.active,
  &:hover,
  &:active {
    color: @pred;
  }
}
.invitation-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
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
    padding: 0px 40px 60px;
    box-sizing: border-box;
    visibility: hidden;
    transition: transform 0.3s;
    transform: scale(0.4);
    .login_title {
      text-align: center;
      height: 46px;
      line-height: 46px;
      margin: 0 -40px;
      background: #f4f6f8;
      font-size: 16px;
      color: #333;
      position: relative;
    }
    .phone-box {
      padding-top: 18px;
    }
    .close {
      position: absolute;
      right: 14px;
      top: 0;
      font-size: 12px;
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
          // border-right: 1px solid #e8e8e8;
          position: relative;
          &::after {
            position: absolute;
            top: 0;
            content: "";
            width: 1px;
            height: 31px;
            right: 0;
            z-index: 999;
            background: #e8e8e8;
          }
        }
      }
      .active::before {
        position: absolute;
        bottom: -13px;
        content: "";
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
    .forget{
      font-size: 14px;
      font-weight: 400;
      margin-top: 14px;
      color: #666;
    }
    .submit {
      background: @pred;
      height: 44px;
      color: #fff;
      line-height: 44px;
      text-align: center;
      margin: auto;
      margin-top: 13px;
      cursor: pointer;
      background:linear-gradient(90deg,rgba(243,38,45,1) 0%,rgba(253,95,73,1) 100%);
      &.submit_active{
        font-size: 16px;
        margin-top: 30px;
      }
      &:hover{
        background: #FD5F49;
      }
    }
    .code-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      .inp-code {
        width: 160px;
        margin: 0;
        margin-right: 10px;
      }
      .send-btn {
        .submit;
        flex: 1;
        margin: 0;
        height: 40px;
        line-height: 40px;
      }
    }
  }
  .popupLogin {
    visibility: visible;
    transform: scale(1);
    & > .close {
      color: #999999 !important;
      font-size: 14px;
    }
    & > .close:hover {
      color: #f3262d !important;
    }
  }
}
</style>
<style lang="less">
// 覆盖样式
.el-message--error {
  z-index: 99999999;
}
</style>
