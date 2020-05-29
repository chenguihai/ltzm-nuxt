<template>
  <el-form
    ref="form"
    :model="ruleForm"
    class="account-box"
    :rules="rules"
    @validate="validateChange"
  >
    <el-form-item class="account-inner account" prop="account" :show-message="false">
      <div class="sd-tip" v-if="showSdTip.includes(true)">
        <i class="el-icon-remove"></i>
        {{sdTipTxt}}
      </div>
      <el-input class="inp" maxlength="11" v-model="ruleForm.account" placeholder="手机号码">
        <img
          class="inp-icon"
          :class="{'bd-icon': usrNowI === 1}"
          slot="prefix"
          :src="usrIcon[usrNowI]"
        />
      </el-input>
    </el-form-item>

    <el-form-item prop="verifyCode" :show-message="false">
      <div class="account-inner password-inner">
        <el-input
          class="inp"
          maxlength="4"
          v-model="ruleForm.verifyCode"
          @keyup.enter.native="loginHandle('form')"
          placeholder="验证码"
        >
          <img
            class="inp-icon"
            :class="{'bd-icon': pwdNowI === 1}"
            slot="prefix"
            :src="pwdIcon[pwdNowI]"
          />
        </el-input>
        <el-button
          class="code-btn"
          :disabled="!canCountDownDo"
          :class="{'dis':!canCountDownDo}"
          @click="getCodeHandle"
          type="danger"
        >{{countDownUIText}}</el-button>
      </div>
    </el-form-item>
    <div class="text-inner">
      <p>注：未注册的手机将自动创建为凌天众媒的账号</p>
    </div>
    <div
      class="login-btn user_select"
      @click="loginHandle('form')"
      v-if="!isBind"
      style="margin-top:18px"
    >登录</div>
    <div class="login-btn user_select" @click="loginHandle('form')" v-else>确认绑定</div>
  </el-form>
</template>

<script>
import { loginCode, getUserInfo } from "@/api/list";
import { fast_login_code, fast_login_new } from "@/api/store-flow";
import { mapMutations } from "vuex";
import { tokenDoing } from "@/utils/tool";
import { newDeviceCode } from "../../utils";
import { countDownMixin, loginInp } from "../../utils/common-mixins";
import { bindRegUser } from "@/api/order";
import dataEventTrack from "@/utils/dataEventTrack";

export default {
  mixins: [
    countDownMixin({
      countDownBtnText: "获取验证码",
      UItemplate: "重新获取({time})"
    }),
    loginInp()
  ],
  props: {
    isBind: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const { wechat, qq, avatar, name, unionid } = this.$route.query;
    return {
      wechatid: wechat,
      qqid: qq,
      avatar: avatar,
      othname: name,
      unionid: unionid,
      timer: null, //定时器
      key: "",
      ruleForm: {
        // 数据
        account: "",
        verifyCode: ""
      },
      isLoading: false,
      isCode: false,
    };
  },
  mounted() {
    // 根据浏览器自动生成用户唯一标识码
    newDeviceCode();
  },
  methods: {
    ...mapMutations(["CHANGE_USER_INFO", "SAVE_TOKEN"]),
    /*登录*/
    loginHandle(formName) {
      if (this.isLoading) {
        return;
      }
      if (this.isBind) return this.regBind();
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        if (this.key == "") {
          this.$message.error("请先获取验证码");
          return;
        }
        let data = {
          verification_key: this.key,
          verification_code: this.ruleForm.verifyCode,
          mobile: this.ruleForm.account
        };
        this.isLoading = true;
        loginCode(data)
          .then(res => {
            let { code, message, data } = res.data;
            if (code && code == 200) {
              let access_token = data.access_token;
              this.loginDoed(access_token);
              dataEventTrack({
                referer: document.referrer,
                event_type: 'click',
                kv: {
                    router: this.$route.fullPath,
                    rname:'短信验证码登录',
                }
              })
            } else {
              this.$message.error(message);
              this.isLoading = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
          });
      });
    },
    regBind() {
      if (!this.ruleForm.account) return this.$message.error("请输入手机号");
      if (!this.key) return this.$message.error("请先获取验证码");
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const opts = {
          verification_key: this.key,
          verification_code: this.ruleForm.verifyCode,
          mobile: this.ruleForm.account,
          wechatid: this.wechatid,
          qqid: this.qqid,
          avatar: this.avatar,
          unionid: this.unionid,
          name: this.othname
        };
        this.isLoading = true;
        try {
          const data = await bindRegUser(opts);
          if (data.data && data.data.code === 200) {
            this.loginDoed(data.data.data.access_token);
            dataEventTrack({
              referer: document.referrer,
              event_type: "click",
              kv: {
                router: this.$route.fullPath,
                rname: "短信验证码绑定"
              }
            });
          } else {
            this.$message.error(data.data.message);
          }
        } catch (error) {
          if (error.data) this.$message.error(error.data.message);
        } finally {
          this.isLoading = false;
        }
      });
    },
    /*获取验证码*/
    async getCodeHandle() {
      if (this.isCode) return;
      if (!this.canCountDownDo) return;
      this.$refs.form.validateField("account");
      if (this.usrNowI !== 0) return;
      this.isCode = true;
      const res = await fast_login_new({
        mobile: this.ruleForm.account
      }).catch(err => this.$message.error({ title: "错误提示", err }));
      if (res) {
        let { code, message, data } = res.data;
        if (code && code == 200) {
          this.key = data.key;
          this.$message({
            title: "成功",
            message: "验证码已发送",
            type: "success"
          });
          this.countDownInit();
        } else {
          this.$message.error({ title: "错误提示", message: message });
        }
        this.isCode = false;
      }
    },
    loginDoed(token) {
      tokenDoing(token);
      this.SAVE_TOKEN(token);
      getUserInfo(token)
        .then(rsp => {
          let { code, data, message } = rsp.data;
          if (code == "200") {
            this.CHANGE_USER_INFO(data);
            this.$router.push("/");
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style scoped lang="less">
/deep/.is-success .el-input__inner {
  border-color: #ddd !important;
}
.account-box {
  width: 285px;
  margin: auto;
  .password-inner {
    display: flex;
    button {
      margin-left: 10px;
      min-width: 112px;
      height: 40px;
      border-radius: 0;
      background: #f3262d;
      background-image: linear-gradient(#ff4c0d, #ff0000);
      color: #fff;
      box-sizing: border-box;
      &.dis {
        background: #e3e3e3;
        color: #999999;
        border: none;
      }
    }
  }

  .text-inner {
    font-size: 12px;
    color: #999;
  }

  .login-btn {
    cursor: pointer;
    height: 40px;
    background-color: #f3262d;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
    background-image: linear-gradient(#ff4c0d, #ff0000);
  }

  .reg {
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;

    a {
      color: #f3262d;
    }
  }
}
.account-inner {
  box-sizing: border-box;
}
@import "./inp.less";
.code-btn {
  text-align: center;
  padding: 0;
  height: 40px;
  background-image: linear-gradient(#ff4c0d, #ff0000);
}
</style>
