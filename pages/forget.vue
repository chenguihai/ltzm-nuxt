<template>
  <div class="forget-container">
    <!--头部-->
    <nav>
      <forget-nav />
    </nav>

    <!--中间-->
    <main class="forget-wrap">
      <div class="steps">
        <div class="inner">
          <div :class="['item',{'active':showbox===1 || showbox!==1}]">
            <span class="num">1</span>
            <span class="line">
              <span class="icons">
                <i class="iconfont icon-xiangyoudianji-xuanzhong"></i>
                <i class="iconfont icon-xiangyoudianji-xuanzhong"></i>
              </span>
            </span>
            <div class="text">
              <p>验证身份</p>
            </div>
          </div>
          <div :class="['item',{'active':showbox!==1 }]">
            <span class="num">2</span>
            <div class="text">
              <p>设置成功</p>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <!-- 主体 -->
      <div class="forget-con">
        <template v-if="showbox === 1">
          <ForgetInp label="手机号" ref="forgetMobile" placeholder="请输入您注册的手机号码" v-model="ruleForm1.mobile" :rules="rules.mobile" :othProps="{maxlength:11}" :release.sync="release"></ForgetInp>
          <ForgetInp label="验证码" ref="forgetCode" placeholder="请输入验证码" :maxLength="6" v-model="ruleForm1.verifyCode" :rules="rules.verifyCode" :release.sync="release">
            <p class="code-btn" :class="{'dis':!canCountDownDo}" @click="getCodeHandle" slot="btn">{{countDownUIText}}</p>
          </ForgetInp>
          <ForgetInp label="设置新密码" ref="forgetPwd" placeholder="请输入新密码" v-model="ruleForm1.password" :rules="rules.password" :othProps="{type:'password'}" :release.sync="release" maxLength='32'></ForgetInp>
          <ForgetInp label="确认新密码" ref="forgetCPwd" placeholder="请输入确认新密码" v-model="ruleForm1.cpassword" :rules="rules.cpassword" :othProps="{type:'password'}" :release.sync="release"  maxLength='32'></ForgetInp>
          <div class="forget-submit user_select" @click="forgetHandle">下一步</div>
        </template>
        <template v-else>
          <div class="forget-suc-top">
            <img src="@/assets/img/success.png" alt="">
            <p>修改成功，请牢记新的登录密码</p>
          </div>
          <router-link tag="div" to="/login" class="login-btn">
            重新登录
          </router-link>
        </template>
      </div>
      <!-- 主体 -->
    </main>
    <!--底部-->
    <footer>
      <login-footer />
    </footer>
  </div>
</template>

<script>
import ForgetNav from '~/components/login/forget-nav.vue'
import LoginFooter from '~/components/login/login-footer.vue'
import { forgetVerifyFn, forgetCode, forgetConfirm } from "../api/list2";
import { countDownMixin, bodyColor } from '@/utils/common-mixins'
import ForgetInp from '@/components/login/forget-inp'
import { regDaqo } from '@/utils/tool'
import passwordEncryption from '@/utils/passwordEncryption'
export default {
  components: {
    ForgetNav, LoginFooter, ForgetInp
  },
  mixins: [countDownMixin({ countDownBtnText: '获取验证码', UItemplate: '重新获取({time})' }), bodyColor('fff')],
  data () {
    let passReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,32}$/
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不能为空"));
          return false
      }else if (value.length<8||value.length>32) {
        callback(new Error('密码长度为8个到32个字符'));
        return false
      } else if(!passReg.test(value)){
        callback(new Error('密码包含字母、数字、特殊符号任意两种'));
          return false
      }else {
        callback();
      }
    };
    return {
      showbox: 1,
      ruleForm1: {
        mobile: '',
        verifyCode: '',
        password: '',
        cpassword: '',
        key: '',
        isSend:false
      },
      release: false,
      rules: {
        mobile: [{ required: true, message: '手机号不能为空' },
        {
          test: regDaqo.phone,
          message: '请检查手机号是否正确',
        }],
        password: [{ required: true, message: '密码不能为空' },
        { min: 8, max: 32, message: "请输入8~32位密码" },
        {
          test: passReg,
          message: '密码包含字母、数字、特殊符号任意两种',
        }],
        cpassword: [{ required: true, message: '请确认密码' },
        { min: 8, max: 32, message: "请输入8~32位密码" }
        ],
        verifyCode: [{ required: true, message: '验证码不能为空' }, {
          test: /\d{4}/,
          message: '请输入4位数验证码'
        }, { min: 4, max: 4, message: "请输入4位数验证码" }],
      },
      isLoading:false,
      isCode:false,
    }
  },
  methods: {
    async forgetHandle (formName) {
      if(this.isLoading) return;
      for (let v of Object.values(this.$refs)) {
        if (!v.checkInp()) {
          break
        }
      }
      if (!this.release) return

      let datas = {
        mobile: this.ruleForm1.mobile,
        newpassword: passwordEncryption(this.ruleForm1.mobile, this.ruleForm1.password), // this.ruleForm1.password,
        verification_key: this.key,
        verification_code: this.ruleForm1.verifyCode
      }
      if (this.ruleForm1.password !== this.ruleForm1.cpassword) return this.$message.error('两次输入的密码不一致')
      if(!this.isSend) return this.$message.error('请获取验证码')
      this.isLoading = true;
      let _data = await forgetConfirm(datas)
      let { code, message, data } = _data.data
      if (code && code == 200) {
        this.showbox = 2
      } else {
        this.$message.error(message)
      }
     this.isLoading = false;
    },
    async getCodeHandle () {
      if(this.isCode){return}
      if (!this.canCountDownDo) return
      if (!this.$refs.forgetMobile.checkInp()) return
      this.isCode = true;
      let _data = await forgetCode({ mobile: this.ruleForm1.mobile })
      let { code, message, data } = _data.data
      if (code && code == 200) {
        this.isSend = true
        this.key = data.key
        this.$message.success('验证码已发送');
        this.countDownInit()
      } else {
        this.$message.error(message)
      }
      this.isCode = false;
    }
  }
}
</script>

<style lang="less" scoped>
@import "~assets/css/forget.less";
/deep/.is-success .el-input__inner {
  border-color: #dcdfe6 !important;
}
.forget-con {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.code-btn {
  width: 86px;
  height: 38px;
  background: rgba(244, 244, 244, 1);
  border: 1px solid rgba(223, 223, 223, 1);
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  line-height: 38px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background: #fff;
  }
  &.dis {
    background: rgba(244, 244, 244, 1);
    cursor: not-allowed;
    &:hover {
      background: rgba(244, 244, 244, 1);
    }
  }
}
.forget-submit {
  width: 100px;
  height: 36px;
  background: rgba(243, 38, 45, 1);
  border-radius: 2px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  text-align: center;
  margin-top: 41px;
  margin-left: -58px;
  cursor: pointer;
}
.forget-suc-top {
  display: flex;
  align-items: center;
  margin-top: 107px;
  img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
  p {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(38, 165, 113, 1);
  }
}
.login-btn {
  margin-top: 20px;
  width: 100px;
  height: 36px;
  background: rgba(243, 38, 45, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
  cursor: pointer;
  text-align: center;
}
.forget-wrap {
  box-shadow: 0 1px 4px 3px rgba(232, 232, 232, 0.6);
}
</style>
