<template>
  <!-- 修改绑定手机 -->
  <div class="revisionPhonebox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="retrieve-password">
          <span class="my_order">修改绑定手机</span>
          <div class="retrieve-container">
            <!-- 进度条 -->
            <div class="progress">
              <!-- 高亮圆圈 -->
              <div class="progress-circle">1</div>
              <!-- 高亮线条 -->
              <div class="light-line"></div>
              <!-- 正在修改的页面 -->
              <template v-if="showSuccess == 'show'">
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
                <div class="gray-circle">2</div>
                <div class="gray-line"></div>
                <span class="progress-arrow">>></span>
                <div class="gray-line"></div>
              </template>
              <!-- 已经完成修改了 -->
              <template v-else>
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
                <div class="progress-circle success-circle">2</div>
                <div class="light-line"></div>
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
              </template>
              <template v-if="showSuccess != 'succ'">
                <div class="gray-circle">3</div>
              </template>
              <template v-else>
                <div class="progress-circle success-circle">3</div>
              </template>

              <p class="progress-tips">
                <span class="light-tips-item" style="margin-left:0px">验证原手机</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: 70px;"
                  v-if="showSuccess != 'succ'"
                >绑定成功</span>
                <span class="gray-tips-item success-tips" style="margin-right: 82px;" v-else>完成</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: 243px;"
                  v-if="showSuccess == 'show'"
                >绑定新手机</span>
                <span class="gray-tips-item success-tips" style="margin-right: 243px;" v-else>绑定新手机</span>
              </p>
            </div>
            <div class="retrieve-input" v-if="showSuccess == 'show'">
              <div class="form">
                <div class="item">
                  <span class="span">
                    已绑定手机号：
                    <p>{{userpo}}</p>
                  </span>
                </div>
                <div class="item code">
                  <label for="code">手机验证码</label>
                  <input
                    v-model="codeNumInfoOne"
                    class="item-inp"
                    type="text"
                    id="code"
                    @keyup="codeNumInfoOne=codeNumInfoOne.replace(/\s+/g,'')"
                    placeholder="请输入验证码"
                  />
                  <div class="get-code" v-if="!isGetCode" @click="getCode">{{codeInfo}}</div>
                  <div v-else class="get-code getting-code">重新获取({{codeNum}})</div>
                  <span class="warning-tips" v-if="errPhoneInNum">
                    <span class="warning-icon">!</span>
                    <span class="warning-info">验证码不能为空</span>
                  </span>
                </div>
                <div class="item">
                  <label></label>
                  <div class="next-step" @click="submitPsdStep">下一步</div>
                </div>
              </div>
            </div>
            <div v-if="showSuccess =='pass' " class="succes_pass">
              <el-form ref="form" :model="ruleForm" class="account-box" :rules="rules">
                <el-form-item class="account-inner" prop="phone" label="新手机号">
                  <el-input maxlength="11" v-model="ruleForm.phone" placeholder="请输入新手机号码"></el-input>
                </el-form-item>
              </el-form>
              <div class="item phone">
                <label for="code">验证码</label>
                <input
                  v-model="codeNumInfo"
                  class="item-pho"
                  type="text"
                  id="code"
                  placeholder="请输入验证码"
                  @keyup="codeNumInfo=codeNumInfo.replace(/\s+/g,'')"
                />
                <div class="get-code" v-if="!isGetCode1" @click="getCodePhone()">{{codeInfo}}</div>
                <div v-else class="get-code getting-code">重新获取({{codeNum1}})</div>
              </div>

              <div class="item">
                <div class="next-step submitPsd" @click="submitPsd">下一步</div>
              </div>
            </div>
            <div v-if="showSuccess =='succ' " class="success-retrieve">
              <p class="success-info">
                <img src="@/assets/img/success.png" alt />
                <span>新手机绑定成功</span>
              </p>
              <span class="span">用户手机号：{{this.mobilep}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="explain" v-if="showSuccess=='show'||showSuccess =='pass'">
        <h3>常见问题</h3>
        <ol>
          <li>
            <h4>1、无法获取短信验证码怎么办</h4>
            <span>短信到达需要1-2分钟，若您长时间未收到确认短信，建议您重发验证码</span>
          </li>
          <li>
            <h4>2、手机卡号遗失，无法使用手机接收短信验证码怎么办？</h4>
            <span>如果原手机号码已经停用或者丢失，请联系客服（客服QQ:
              <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">
                800884838
              </a>
              ） 客服电话：400-688-6662</span>
          </li>
        </ol>
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
import { getCookie } from "../../../utils";
import { mapMutations, mapState } from "vuex";
import {
  changMobile,
  changMobileP,
  retrievePassword,
  newmobile,
  getUserInfo
} from "@/api/list";
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg =/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      codeInfo: "获取验证码",
      // 是否正在获取验证码
      isGetCode: false,
      isGetCode1: false,
      // 定时时间
      codeNum: 60,
      codeNum1: 60,
      codeNumInfo: "",
      codeNumInfoOne: "",
      // 定时器
      timerCode1: null,
      timerCode: null,
      // 用户手机号
      userPhone: "",
      errPhoneInfotip: false,
      errPhoneInNum: false,
      errPsdInfoShowempty: false,
      errPsdInfoShowemp: false,
      // 用户密码
      userPsd: "",
      // password_tow: "",
      // 错误手机号显示
      errPhoneInfoShowT: false,
      // 显示短信发送成功的提示
      messageTips: false,
      //提示信息
      messageTitle: "",
      // 密码错误
      errPsdInfoShow: false,
      errPsdInfoShowq: false,
      // 显示已经修改成功
      showSuccess: "show",
      re_data: "",
      // 获取
      userp: "",
      userpo: "",
      mobilep: "",
      key: "",
      keyTow: "",
      ruleForm: {
        // 数据
        phone: ""
      },
      rules: {
        // 校验
        phone: [{ validator: checkPhone, trigger: "blur" }]
      },
      isLoading:false
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    ...mapMutations(["CHANGE_USER_INFO"]),
    init() {
      // 用户获取手机号码
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if(!this.userInfo) return this.$loginp(0, () => {});
      this.userp = this.userInfo.original.mobile;
      var regp = /^(\d{3})\d+(\d{4})$/;
      var pho = this.userp.replace(regp, "$1****$2");
      this.userpo = pho;
      this.errPhoneInNum = false;
    },
    // 第一步获取验证码
    getCode() {
      this.isGetCode = true;
      //此处发送请求
      var data = { mobile: this.userp };
      changMobile(data)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("验证码已发送");
            this.timerCode = setInterval(() => {
              this.codeNum -= 1;
              if (this.codeNum <= 0) {
                this.codeNum = 60;
                this.isGetCode = false;
                this.codeInfo = "重新获取";
                clearInterval(this.timerCode);
                this.timerCode = null;
              }
            }, 1000);
            var a = res.data.data;
            this.key = a.key;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //验证手机号 下一步
    submitPsdStep() {
      if (this.key != "") {
        if (this.codeNumInfoOne) {
          let data = {
            verification_key: this.key,
            mobile: this.userp,
            verification_code: this.codeNumInfoOne
          };
          retrievePassword(data)
            .then(res => {
              if (res.data.code == 200) {
                this.codeInfo = "获取验证码";
                this.showSuccess = "pass";
              } else {
                this.showSuccess = "show";
                this.$message.error({
                  message: res.data.message
                });
              }
            })
            .catch(err => {});
        } else {
          this.$message.error("请输入验证码");
        }
      } else {
        this.$message.error("请先获取验证码");
      }
    },

    // 失去焦点验证
    // 第二步 更换手机验证码
    getCodePhone() {
      var phone = this.ruleForm.phone;
      if (/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/.test(phone)) {
        if (this.ruleForm.phone != this.userp) {
          var data = { mobile: this.ruleForm.phone };
          changMobileP(data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("验证码已发送");
                this.timerCode1 = setInterval(() => {
                  this.codeNum1 -= 1;
                  if (this.codeNum1 <= 0) {
                    this.codeNum1 = 60;
                    this.isGetCode1 = false;
                    this.codeInfo = "重新获取";
                    clearInterval(this.timerCode1);
                    this.timerCode1 = null;
                  }
                }, 1000);
                this.isGetCode1 = true;
                var a = res.data.data;
                this.keyTow = a.key;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              this.$message.error(err.data.message);
            });
        } else {
          this.$message.error("手机号码已注册");
        }
      } else {
        this.isGetCode1 = false;
      }
    },
    // 第二步 点击下一步
    submitPsd() {
      if (this.codeNumInfo != "" && this.ruleForm.phone != ""&&this.keyTow!="") {
        this.errPhoneInNum = false;

        var regp = /^(\d{3})\d+(\d{4})$/;
        var pho = this.ruleForm.phone.replace(regp, "$1****$2");
        this.mobilep = pho;
        let dataT = {
          oldmobile: this.userp,
          mobile: this.ruleForm.phone,
          newmobile: this.ruleForm.phone,
          verification_code: this.codeNumInfo,
          verification_key: this.keyTow
        };
        newmobile(dataT)
          .then(res => {
            let { code, message, data } = res.data;

            if (code == 200) {
              let access_token = data.access_token;
              getUserInfo(data.access_token).then(rsd => {
                let { code, data, message } = rsd.data;
                if (code == 200) {
                  this.CHANGE_USER_INFO(data);
                  this.showSuccess = "succ";
                } else {
                  this.$message.error(res.data.message);
                }
              });
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // this.errPhoneInNum = true;
        if (this.ruleForm.phone == "") {
         return this.$message.error("请输入手机号码");
        } else if (this.ruleForm.phone == this.userp) {
          return  this.$message.error("手机号不能为原号码");
        } else if(this.keyTow==""){
           return this.$message.error("请先获取验证码");
        } if (this.codeNumInfo == "") {
           return this.$message.error("请输入验证码");
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "revisionPhoneScode.less";
</style>
<style lang="less">
@import "revisionPhone.less";
</style>
<style lang="less">
@import "../index.less";
</style>

