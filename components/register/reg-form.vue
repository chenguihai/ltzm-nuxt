<template>
  <el-form ref="form" :model="ruleForm" :rules="rules" @validate="validateChange">
    <el-form-item prop="account" class="account-inner account" :show-message="false">
      <div class="sd-tip" v-if="showSdTip.includes(true)">
        <i class="el-icon-remove"></i>
        {{sdTipTxt}}
      </div>
       <div class="sd-tip" v-if="messageTI != ''">
        <i class="el-icon-remove"></i>
        {{messageTI}}
      </div>
      <el-input class="inp" maxlength="11" v-model="ruleForm.account"  @change="clearText()" placeholder="手机号码">
        <img class="inp-icon" :class="{'bd-icon': usrNowI === 1}" slot="prefix" :src="usrIcon[usrNowI]"></img>
      </el-input>
    </el-form-item>
    <el-form-item prop="password" class="account-inner" :show-message="false">
      <el-input type="password" class="inp" v-model="ruleForm.password" maxlength="32" placeholder="密码（8-32位字母/数字/特殊符号）">
        <img class="inp-icon" :class="{'bd-icon': pwdNowI === 1}" slot="prefix" :src="pwdIcon[pwdNowI]"></img>
      </el-input>
    </el-form-item>
    <el-form-item prop="verifyCode2" :show-message="false">
      <div class="code-box account-inner" @keyup="ruleForm.verifyCode2=ruleForm.verifyCode2.replace(/\s+/g,'')">
        <el-input class="inp" maxlength="4" v-model="ruleForm.verifyCode2" @keyup.enter.native="loginHandle('form')" placeholder="验证码">
          <img class="inp-icon" :class="{'bd-icon': codeNowI === 1}" slot="prefix" :src="codeIcon[codeNowI]"/>
        </el-input>
        <el-button class="code-btn" :disabled="!canCountDownDo" :class="{'dis':!canCountDownDo}" @click="getCodeHandle" type="danger">{{countDownUIText}}</el-button>
      </div>
    </el-form-item>
    <div class="register-btn user_select" @click="registerHandle('form')">立即注册</div>
    <div class="register-text" v-if="!isBind">
      <el-checkbox v-model="checked"></el-checkbox>
      <p>我已阅读并同意</p>
           <nuxt-link :to="{path:'/aboutUs/regulation/regulation',query :{type:'1'}}" tag="a" target="_blank">《服务协议》</nuxt-link>
           <nuxt-link :to="{path:'/aboutUs/regulation/regulation',query :{type:'2'}}" tag="a" target="_blank">《隐私保护政策》</nuxt-link>
    </div>
  </el-form>
</template>

<script>
import { register, get_verify_code, getUserInfo } from '@/api/list'
import { mapMutations, mapState } from 'vuex'
import { tokenDoing } from '@/utils/tool'
import { countDownMixin, loginInp } from '@/utils/common-mixins'
import { bindRegUser } from '@/api/order'
import dataEventTrack from '@/utils/dataEventTrack';
import passwordEncryption from '@/utils/passwordEncryption'

export default {
  name: 'regCon',
  mixins: [countDownMixin({ countDownBtnText: '获取验证码', UItemplate: '重新获取({time})' }), loginInp(true)],
  props: {
    isBind: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const {wechat, qq, avatar, name, unionid} = this.$route.query;
    return {
      wechatid: wechat,
      qqid: qq,
      avatar: avatar,
      othname: name,
      unionid: unionid,
      checked: true,
      messageTI:'',
      key: '',
      ruleForm: {
        account: '',
        password: '',
        verifyCode2: '',
      },
      isLoading:false,
      isCode:false
    }
  },
  mounted(){
    dataEventTrack({
          referer: document.referrer,
          event_type: 'page_show',
          kv: {
            router: this.$route.fullPath,
          }
        })  
  },
  methods: {
    ...mapMutations(['CHANGE_USER_INFO', 'SAVE_TOKEN']),
    clearText(){
      this.messageTI = ""
    },
    registerHandle () {
      if(this.isLoading){return }
      if (this.isBind) return this.regBind()

      this.$refs.form.validate((valid) => {
        if (!valid) return
        if (!this.key) return this.$message.error('请先获取验证码')
        if (!this.checked) return this.$message.error({ title: '错误提示', message: '请阅读并勾选相关协议' })

        let data = {
          verification_key: this.key,
          verification_code: this.ruleForm.verifyCode2,
          mobile: this.ruleForm.account,
          password: passwordEncryption(this.ruleForm.account, this.ruleForm.password), // this.ruleForm.password
        }
        this.isLoading = true;
        register(data).then(res => {
          let { code, message, data } = res.data
          //注册页面数据埋点
            dataEventTrack({
            referer: document.referrer,
            event_type: 'click',
            kv: {
              router: this.$route.fullPath,
              rname:"注册"
            }
          })  
          if (code && code == 200) {
            this.loginDoed(data.access_token)
          } else {
            this.isLoading = false;
            this.$message.error(message)
          }
        }).catch(err => {
          this.isLoading = false;
          err && err.data && this.$message.error(err.data.message)
        })
      })
    },
    regBind () {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const opts = {
          verification_key: this.key,
          verification_code: this.ruleForm.verifyCode2,
          mobile: this.ruleForm.account,
          password: passwordEncryption(this.ruleForm.account, this.ruleForm.password), //this.ruleForm.password,
          wechatid: this.wechatid,
          qqid: this.qqid,
          avatar: this.avatar,
          unionid: this.unionid,
          name: this.othname
        }
        const datas = await bindRegUser(opts)
         let {code,data,message} = datas.data
        if (code!=200){
          this.isLoading = false;
          this.$message.error(message)
          return
        }else{
          this.loginDoed(data.access_token)
        }
      })
    },
    loginDoed (token) {
      tokenDoing(token)
      this.SAVE_TOKEN(token)
      getUserInfo(token).then(rsp => {
        let { code, data, message } = rsp.data
        if (code == '200') {
          this.CHANGE_USER_INFO(data)
          this.$router.push('/store/first')
        } else {
          this.$message.error(message)
        }
      }).catch(err => {}).finally(()=>this.isLoading = false)
    },
    /*获取验证码*/
    async getCodeHandle () {
      if(this.isCode) {return }
      if (!this.canCountDownDo) return
      this.$refs.form.validateField('account')
      if (this.usrNowI !== 0) return
      this.isCode = true;
      const res = await get_verify_code({ mobile: this.ruleForm.account }).catch(err => {
        err && err.data && this.$message.error(err.data.message)
        this.isCode = false;
      })
      if (res && res.data) {
        let { code, message, data } = res.data
        if (code && code == 200) {
          this.key = data.key
          this.$message({ title: '成功', message: '验证码已发送', type: 'success' });
          this.countDownInit()
        } else {
          this.messageTI = res.data.message
          
        }
        this.isCode = false;
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
};
</script>

<style scoped lang="less">
/deep/.is-success .el-input__inner {
  border-color: #dcdfe6 !important;
}
.code-box {
  display: flex;
  button {
    margin-left: 10px;
    min-width: 112px;
    height: 38px;
    border-radius: 0;
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

.register-btn {
  height: 40px;
  background-image: linear-gradient(#ff4c0d, #ff0000);
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}

.register-text {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  /deep/ .el-checkbox {
    margin-right: 0;
    .el-checkbox__inner {
      width: 12px;
      height: 12px;
      &::after {
        left: 3px;
        top: 0;
      }
    }
  }
  p {
    margin-left: 5px;
    white-space: nowrap;
  }
  &>a {
    color: #067be7;
     cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
  }
}
.account-inner {
  box-sizing: border-box;
}
@import "../login/inp.less";
.code-btn {
  text-align: center;
  padding: 0;
}
</style>
