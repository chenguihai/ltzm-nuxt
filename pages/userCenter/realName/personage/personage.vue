<template>
  <!-- 个人实名 -->
  <div class="personage body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <!--个人实名-->
        <div class="personage">
          <span class="perso">个人实名</span>
          <div class="schedule">
            <div class="progress">
              <!-- 高亮圆圈 -->
              <div class="progress-circle">1</div>
              <!-- 高亮线条 -->
              <div class="light-line"></div>
              <!-- 正在修改的页面 -->
              <template v-if="showSuccess == 'show'">
                <span class="progress-arrow">>></span>
                <div class="gray-line"></div>
                <div class="gray-circle">2</div>
              </template>
              <!-- 已经完成修改了 -->
              <template v-else>
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
                <div class="progress-circle success-circle">2</div>
              </template>
              <p class="progress-tips">
                <span class="light-tips-item" style="margin-left:-5px">填写本人信息</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: -17px;"
                  v-if="showSuccess != 'pass'"
                >认证结果</span>
                <span class="gray-tips-item success-tips" style="margin-right: -17px;" v-else>认证结果</span>
              </p>
            </div>
          </div>
        </div>
        <!--填写本人信息-->
        <div class="personage_data" v-if="showSuccess == 'show'">
          <span>填写本人信息</span>
          <div class="personage_user">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="真实姓名：" prop="real_name" class="real_name">
                <el-input v-model="ruleForm.real_name"></el-input>
                <template>
                  <span class="span">为保障您的资金安全，实名认证姓名和身份证号须和您提现的银行卡的户名保持一致</span>
                </template>
              </el-form-item>
              <el-form-item label="身份证号码：" prop="id" class="id">
                <el-input v-model="ruleForm.id" maxlength="18"></el-input>
                <template>
                  <span class="span">身份证号码前后不能有空格，年龄不足18岁，不能认证</span>
                </template>
              </el-form-item>
              <el-form-item label="手机号码：">
                <el-input v-model="userp" :disabled="true" maxlength="25"></el-input>
                <template>
                  <span class="span">
                    需要修改，请
                    <nuxt-link tag="p" to="/userCenter/revisionPhone/revisionPhone">点击此处</nuxt-link>
                  </span>
                </template>
              </el-form-item>
              <el-form-item class="sun_btn">
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!--管理员审核-->
        <div class="personage_succ" v-else-if="showSuccess == 'pass'">
          <span>管理员审核</span>
          <div class="personage_cg">
            <div class="personage_left">
              <img src="../../../../assets/img/store/auth_s.png" alt />
            </div>
            <div class="personage_right">
              <span>恭喜快速实名认证成功！</span>
              <span>
                页面将在
                <p class="count-span">{{text}}</p>秒后自动返回
              </span>
              <span>返回首页</span>
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
import { perUseradd } from "@/api/list";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入身份证"));
      } else {
        const reg = /[0-9X]{18}/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的身份证"));
        }
      }
    };
    var Name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入姓名"));
      } else {
        if (/^[\u4e00-\u9fa5]+$/gi.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的姓名"));
        }
      }
    };

    return {
      showSuccess: "show",
      userp: "",
      text: 3,
      userInfo: [],
      ruleForm: {
        real_name: "",
        id: ""
      },
      rules: {
        real_name: [
          { validator: Name, trigger: ["blur", "change"] },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: ["blur", "change"]
          }
        ],
        id: [
          { validator: checkName, trigger: ["blur", "change"] },
          {
            message: "身份证不能为空",
            trigger: "change",
            min: 18,
            max: 18
          }
        ]
      }
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.userp = this.userInfo.original.mobile;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            name: this.ruleForm.real_name,
            mobile: this.userp,
            idno: this.ruleForm.id
          };
          perUseradd(data)
            .then(res => {
              if (res.data.code == 200) {
                this.showSuccess = "pass";
                this.countTime();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 三秒倒计时
    countTime() {
      clearInterval(this.timer);
      let _times = 3;
      let _t = this.text;
      this.timer = setInterval(() => {
        _times--;
        this.text = `${_times}`;
        if (_times < 1) {
            _times = 0
            this.text = 0
          window.location.href = "/userCenter/realName/realName";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@import "personageScode.less";
</style>

<style lang="less" scoped>
@import "../../index.less";
</style>

<style lang="less">
@import "personage.less";
</style>


