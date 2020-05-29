<template>
  <!-- 修改登录密码 -->
  <div class="revisionPassbox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="revisionPass">
          <div class="revisionPass_top">登录密码修改</div>
          <div class="revisionPass_bot">
            <span>
              <i></i>网站密码用于用户登录，请妥善保管密码，凌天众媒工作人员不会以任何理由向您索取密码
            </span>
            <div class="revisionPass_cont">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="当前密码" prop="pass" :label-width="formLabelWidth">
                  <el-col :span="8">
                    <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password" maxlength="32"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="新密码" prop="newpass" :label-width="formLabelWidth">
                  <el-col :span="8">
                    <el-input v-model="ruleForm.newpass" placeholder="请输入8～32位密码" id="newkey" type="password" maxlength="32"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checknewpass" :label-width="formLabelWidth">
                  <el-col :span="8">
                    <el-input v-model="ruleForm.checknewpass" placeholder="请再次输入新密码" id="newkey1" type="password" maxlength="32"></el-input>
                  </el-col>
                </el-form-item>
              </el-form>
              <div class="grid-content bg-purple">
                <el-button type="primary" :plain="true" @click="submitForm('ruleForm')" :loading="isLoading">确认修改</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>

  </div>
</template>
<script>
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { changPass } from "@/api/list";
import { mapMutations } from "vuex";
import { delCookie, delLocalStorage } from "../../../utils";
import passwordEncryption from '@/utils/passwordEncryption'
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  data() {
    /*****检验两次密码是否一致***/
     var passReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{6,32}$/
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
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
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        newpass: "",
        checknewpass: ""
      }, //修改密码的表单
      formLabelWidth: "150px",

      rules: {
        pass: [
          {
            min: 6,
            max: 32,
            required: true,
            message: "请输入正确的密码",
            trigger: ["blur", "change"]
          }
        ],
        newpass: [
          {
            validator: validatePass,
            trigger: ["blur", "change"]
          },
          {
            min: 8,
            max: 32,
            message: "长度在 6 到 32 个字符",
            trigger: ["blur", "change"]
          }
        ],
        checknewpass: [
          {
            required: true,
            validator: validatePass2,
            trigger: ["blur", "change"]
          }
        ]
      },
      isLoading:false
    };
  },
  mounted(){
   this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(!this.userInfo) return this.$loginp(0, () => {});
  },
  methods: {
    submitForm(ruleForm) {
      if(this.isLoading){return}
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
            const {pass='',newpass='',checknewpass=''} = this.ruleForm;
          let data = {
            password: passwordEncryption('xxx', pass), // pass,
            newpassword: passwordEncryption('xxx', newpass), // newpass,
            newpasswordtwo: passwordEncryption('xxx', checknewpass), // checknewpass
          };
          this.isLoading = true;
          changPass(data).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: "修改成功请重新登录",
                  type: "success"
                });
                delCookie("userInfo");
                delCookie("access_token");
                localStorage.clear();
                this.$router.push("/login");
              } else {
                this.$message.error({
                  message: res.data.message
                });
              }
          }).catch(err => {
              this.$message({
                message: "修改失败",
                type: "err"
              });
            }).finally(()=>this.isLoading = false);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "revisionPassScode.less";
</style>
<style lang="less">
@import "revisionPass.less";
</style>
<style lang="less" scoped>
@import "../index.less";
</style>
