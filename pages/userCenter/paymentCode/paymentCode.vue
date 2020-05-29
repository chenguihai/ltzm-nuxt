<template>
  <!-- 修改绑定手机 -->
  <div class="paymentCode body">
    <comHeader />
    <div class="center">
      <LTnav :textT="textT" v-if="textT!=''" />
      <div class="user_cen_right">
        <div class="retrieve-password">
          <span class="my_order">{{title1}}</span>
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
                <span class="light-tips-item" style="margin-left:9px">验证身份</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: 70px;"
                  v-if="showSuccess != 'succ'"
                >设置成功</span>
                <span class="gray-tips-item success-tips" style="margin-right: 68px;" v-else>完成</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: 235px;"
                  v-if="showSuccess == 'show'"
                >{{title2}}</span>
                <span
                  class="gray-tips-item success-tips"
                  style="margin-right: 235px;"
                  v-else
                >{{title2}}</span>
              </p>
            </div>
            <div class="retrieve-input" v-if="showSuccess == 'show'">
              <!-- 设置 忘记密码 1 -->
              <div class="form" v-if="typePass == '2' || typePass == '1' || typePass == '4'">
                <div class="item">
                  <span class="span">已绑定手机号：{{userpo}}</span>
                </div>
                <div class="item code">
                  <label for="code">手机验证码</label>
                  <input
                    v-model="codeNumInfoOne"
                    class="item-inp"
                    type="text"
                    id="code"
                    placeholder="请输入验证码"
                    @keyup="codeNumInfoOne=codeNumInfoOne.replace(/\s+/g,'')"
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
              <!-- 修改密码 1-->
              <div class="succes_pass am_payPwd" id="ids" v-else-if="typePass == '3'">
                <span class="passSpan">支付密码</span>
                <input
                  clearable
                  :type="inputType"
                   autocomplete="off"
                  name="comfirmPassword"
                  maxlength="1"
                  @input="changeInput"
                  @click="changePwd"
                  @keyup="keyUp($event)"
                  @keydown="oldPwdList = pwdList.length"
                  class="shortInput"
                  v-model="pwdList[i]"
                  v-for="(v, i) in 6"
                  :key="i"
                  @focus="handleFocus(i)"
                  @blur="handleblur()"
                />

                <div>
                  <span class="flagPass" v-if="flagPass">
                    <img src="../../../assets/img/warn.png" alt /> 密码为6位数字
                  </span>
                  <span class="flagPass" v-if="flagLiu">
                    <img src="../../../assets/img/warn.png" alt />密码为6位数字
                  </span>
                </div>
              </div>
              <span v-if="typePass == '3'" class="forgetPass" @click="forgetClick">忘记支付密码</span>
            </div>
            <div class="item" v-if="showSuccess =='show' && typePass == '3' ">
              <div style="margin-left: -277px;" class="next-step submitamen" @click="submitYZ">下一步</div>
            </div>
            <!-- 设置 忘记密码 2 -->
            <div
              v-if="showSuccess =='pass' &&  (typePass == '1' || typePass == '4' )"
              class="succes_pass am_payPwd"
              id="ids"
            >
              <span class="passSpan">设置新支付密码</span>
              <input
                clearable
                :type="inputType"
               autocomplete="off"
                name="comfirmPassword"
                maxlength="1"
                @input="changeInput"
                @click="changePwd"
                @keyup="keyUp($event)"
                @keydown="oldPwdList = pwdList.length"
                class="shortInput"
                v-model="pwdList[i]"
                v-for="(v, i) in 6"
                :key="i"
                @focus="handleFocus(i)"
                @blur="handleblur()"
              />
              <div>
                <span class="flagPass" v-if="flagPass">
                  <img src="../../../assets/img/warn.png" alt /> 密码为6位数字
                </span>
                <span class="flagPass" v-if="flagLiu">
                  <img src="../../../assets/img/warn.png" alt />密码为6位数字
                </span>
              </div>
            </div>
            <div
              v-if="showSuccess =='pass' &&  typePass == '3' "
              class="succes_pass am_payPwd"
              id="idsW"
            >
              <span class="passSpan">设置新支付密码</span>
              <input
                clearable
                :type="inputType"
            autocomplete="off"
                name="comfirmPassword"
                maxlength="1"
                @input="changeInputW"
                @click="changePwdW"
                @keyup="keyUpW($event)"
                @keydown="oldPwdListW = pwdListW.length"
                class="shortInput"
                v-model="pwdListW[i]"
                v-for="(v, i) in 6"
                :key="i"
                @focus="handleFocusW(i)"
                @blur="handleblurW()"
              />
              <div>
                <span class="flagPass" v-if="flagPass">
                  <img src="../../../assets/img/warn.png" alt /> 密码为6位数字
                </span>
                <span class="flagPass" v-if="flagLiu">
                  <img src="../../../assets/img/warn.png" alt />密码为6位数字
                </span>
              </div>
            </div>
            <span
              class="textPass"
              v-if="showSuccess =='pass' && (typePass == '1' || typePass == '4'|| typePass == '3' )"
            >新密码为6位数字，不要使用连续或相同的数字</span>

            <div v-if="showSuccess =='pass' " class="succes_pass am_payPwd" id="idsT">
              <span class="passSpan">确认支付密码</span>
              <input
                clearable
                :type="inputType"
                autocomplete="off"
                name="comfirmPasswordT"
                maxlength="1"
                @input="changeInputT"
                @click="changePwdT"
                @keyup="keyUpT($event)"
                @keydown="oldPwdListT = pwdListT.length"
                class="shortInput"
                v-model="pwdListT[i]"
                v-for="(v, i) in 6"
                :key="i"
                @focus="handleFocusT(i)"
                @blur="handleblurT()"
              />
              <div>
                <span class="flagPass" v-if="flagPassT">
                  <img src="../../../assets/img/warn.png" alt /> 密码为6位数字
                </span>
                <span class="flagPass" v-if="flagLiuT">
                  <img src="../../../assets/img/warn.png" alt />密码为6位数字
                </span>
                <span class="flagPass" v-if="flagPasst">
                  <img src="../../../assets/img/warn.png" alt />两次输入密码不一致
                </span>
                <span class="flagPass" v-if="flagPassO">
                  <img src="../../../assets/img/warn.png" alt />新密码不能与旧密码一致
                </span>
              </div>
            </div>
            <div class="item" v-if="showSuccess =='pass' ">
              <div class="next-step submitPsdf" @click="submitPsd">下一步</div>
            </div>
            <div v-if="showSuccess =='succ' " class="success-fo">
              <p class="success-info">
                <img src="@/assets/img/success.png" alt />
                <span>您的支付密码已设置成功</span>
              </p>
              <span class="span">{{text}}s后会自动跳转到修改支付密码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="payBox" v-if="flagBox">
      <div class="payBox_index">
        <div>
          <span>提示信息</span>
          <span @click="flagBoxClick" class="iconfont icon-guanbi"></span>
        </div>
        <div>
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-baocunshibai" class="ccccc" />
            </svg>支付密码不正确，请重新输入
          </span>
          <span @click="flagBoxClick">确定</span>
        </div>
      </div>
    </div>
    <comFooter />
    <div class="accBox" v-if="flagACC">
      <div>
        <div>
          <span>温馨提示</span>
          <span class="iconfont icon-guanbi" @click="accBoxClick"></span>
        </div>
        <div>
          <span>为了保障您的账户资金安全，需要您先进行实名认证</span>
          <span @click="accPageClick">
            去实名认证
            <span class="iconfont icon-xiangyoudianji"></span>
          </span>
        </div>
      </div>
    </div>
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
  payInsert,
  paySms,
  payCheck,
  signAccount,
  userCheckPay,
  forgetPayPassword,
  checkPassword,
  modifyPassword
} from "@/api/list";
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (value == this.userp) {
        return callback(new Error("手机号不能为原号码"));
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
      // 定时时间
      codeNum: 60,
      codeNumInfoOne: "",
      // 定时器
      timerCode: null,
      errPhoneInNum: false,
      // 显示已经修改成功
      showSuccess: "show",
      userp: "",
      // 获取
      userpo: "",
      key: "",
      keys: "",
      pwdList: [],
      oldPwdList: [],
      pwdListT: [],
      oldPwdListT: [],
      pwdListW: [],
      oldPwdListW: [],
      isDelete: false,
      ipt: "",
      iptT: "",
      idsW: "",
      inputType: "text",
      passWord: "",
      oldPassWord: "",
      newPassWord: "",
      flagPass: false,
      flagLiu: false,
      flagPassT: false,
      flagLiuT: false,
      flagPasst: false,
      flagPassO: false,
      text: 3,
      typePass: "",
      typeCuss: "1",
      textT: "设置支付密码",
      title1: "",
      title2: "",
      flagBox: false,
      flagACC: false
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
      this.userp = this.userInfo.original.mobile;
      var regp = /^(\d{3})\d+(\d{4})$/;
      var pho = this.userp.replace(regp, "$1****$2");
      this.userpo = pho;
      this.errPhoneInNum = false;
      // 是否实名认证
      signAccount()
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.signstatus == 3) {
              this.flagACC = false;
              userCheckPay() // 是否设置了支付密码
                .then(res => {
                  if (res.data.code == 201) {
                    this.typePass = "3"; // 已设置密码转到修改页面
                    this.textT = "修改支付密码";
                    this.title1 = "修改支付密码";
                    this.title2 = "修改支付密码";
                  } else {
                    this.textT = "设置支付密码";
                    this.title1 = "设置支付密码";
                    this.title2 = "设置支付密码";
                    this.typePass = "1"; // 未设置密码
                    this.typeCuss = "1"; // 未设置密码转第三步跳转
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              // 没有实名认证
              this.title2 = "设置支付密码";
              this.typePass = "2";
              this.flagACC = true;
            }
          } else {
            // 没有实名认证
            this.title2 = "设置支付密码";
            this.typePass = "2";
            this.flagACC = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 第一步获取验证码
    getCode() {
      if (this.typePass == "2") {
        this.$message.error("您还未实名认证，请先实名认证");
      } else {
        this.isGetCode = true;
        //此处发送请求
        var data = { mobile: this.userp };
        paySms(data)
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
              if (this.typePass == "4") {
                this.keys = a.key;
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //验证手机号 下一步
    submitPsdStep() {
      if (this.typePass == "2") {
        this.$message.error("您还未实名认证，请先实名认证");
      } else {
        if (this.key != "") {
          var keyA = "";
          if (this.typePass == "4") {
            keyA = this.keys;
          } else {
            keyA = this.key;
          }

          if (this.codeNumInfoOne) {
            var data = {
              verification_key: keyA,
              mobile: this.userp,
              verification_code: this.codeNumInfoOne
            };
            payCheck(data)
              .then(res => {
                if (res.data.code == 200) {
                  this.codeInfo = "获取验证码";
                  this.showSuccess = "pass";
                } else {
                  this.showSuccess = "show";
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {});
          } else {
            this.$message.error("请输入验证码");
          }
        } else {
          this.$message.error("请先获取验证码");
        }
      }
    },
    // 第二步 点击下一步
    submitPsd() {
      if (this.typePass == "1") {
        if (this.flagPass == false && this.flagPassT == false) {
          if (this.passWord === this.newPassWord) {
            let dataT = {
              mobile: this.userp,
              password: this.newPassWord,
              verification_code: this.codeNumInfoOne,
              verification_key: this.key
            };
            payInsert(dataT)
              .then(res => {
                if (res.data.code == 200) {
                  this.showSuccess = "succ";
                  this.countTime();
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.flagPasst = true;
          }
        }
      } else if (this.typePass == "3") {
        if (this.newPassWord != "" && this.pwdListT.length > 5) {
          if (
            this.passWord === this.newPassWord &&
            this.passWord === this.oldPassWord
          ) {
            this.flagPassO = true;
            this.newPassWord = "";
            this.oldPassWord = "";
            this.pwdListT = [];
            this.pwdListW = [];
            return;
          }
          if (this.oldPassWord !== this.newPassWord) {
            this.flagPasst = true;
            this.newPassWord = "";
            this.oldPassWord = "";
            this.pwdListT = [];
            this.pwdListW = [];
            return;
          }
          let dataT = {
            password: this.passWord,
            newpassword: this.newPassWord
          };
          modifyPassword(dataT)
            .then(res => {
              if (res.data.code == 200) {
                this.showSuccess = "succ";
                this.countTime();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.flagPassT = true;
        }
      } else if ((this.typePass = "4")) {
        if (this.flagPass == false && this.flagPassT == false) {
          if (this.passWord === this.newPassWord) {
            let dataT = {
              mobile: this.userp,
              password: this.newPassWord,
              verification_code: this.codeNumInfoOne,
              verification_key: this.keys
            };
            forgetPayPassword(dataT)
              .then(res => {
                if (res.data.code == 200) {
                  this.showSuccess = "succ";
                  this.countTime();
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.flagPasst = true;
          }
        }
      }
    },
    //验证手机号 下一步
    submitYZ() {
      if (this.passWord != "" && this.pwdList.length > 5) {
        var data = {
          password: this.passWord
        };
        checkPassword(data)
          .then(res => {
            if (res.data.code == 200) {
              this.showSuccess = "pass";
              this.pwdList = [];
            } else {
              this.showSuccess = "show";
              this.flagBox = true;
              this.passWord = "";
              this.pwdList = [];
            }
          })
          .catch(err => {
            this.$message.error(err.data.errors.password[0]);
          });
      } else {
        this.flagPass = true;
      }
    },
    // 关闭弹窗
    flagBoxClick() {
      this.flagBox = false;
    },
    // 忘记密码
    forgetClick() {
      this.showSuccess = "show";
      this.typePass = "4";
      this.textT = "找回支付密码";
      this.title1 = "找回支付密码";
      this.title2 = "找回支付密码";
      this.ipt = [];
      this.iptT = [];
      this.iptW = [];
      this.pwdList = [];
      this.pwdListT = [];
      this.pwdListW = [];
      this.oldPassWord = "";
      this.newPassWord = "";
      this.passWord = "";
    },
    handleFocus(i) {
      this.inputType = "password";
      this.flagPass = false;
      this.flagPasst = false;
      this.flagPassO = false;
      this.ipt = document.querySelectorAll(`#ids .shortInput`);
    },
    handleblur() {
      if (this.pwdList.length < 6) {
        this.flagPass = true;
      } else {
        this.flagPass = false;
      }
    },
    handleFocusT(i) {
      this.inputType = "password";
      this.flagPassT = false;
      this.flagPasst = false;
      this.flagPassO = false;
      this.iptT = document.querySelectorAll(`#idsT .shortInput`);
    },
    handleblurT() {
      if (this.pwdListT.length < 6) {
        this.flagPassT = true;
      } else {
        this.flagPassT = false;
      }
    },
    handleFocusW(i) {
      this.inputType = "password";
      this.flagPassT = false;
      this.flagPasst = false;
      this.flagPassO = false;
      this.iptW = document.querySelectorAll(`#idsW .shortInput`);
    },
    handleblurW() {
      if (this.pwdListW.length < 6) {
        this.flagPassT = true;
      } else {
        this.flagPassT = false;
      }
    },
    // 按键事件
    keyUp(ev) {
      let index = this.pwdList.length;
      if (!index) return;
      if (ev.keyCode === 8) {
        this.isDelete = true;
        if (this.oldPwdList === this.pwdList.length) {
          if (index === this.pwdList.length) {
            this.pwdList.pop();
          }
          index--;
        } else {
          index > 0 && index--;
        }
        this.ipt[index].focus();
      } else if (
        this.isDelete &&
        index === this.pwdList.length &&
        /^\d$/.test(ev.key)
      ) {
        this.isDelete = false;
        this.pwdList.pop();
        this.pwdList.push(ev.key);
        this.ipt[this.pwdList.length] && this.ipt[this.pwdList.length].focus();
      }

      var a = "";
      a = JSON.stringify(this.pwdList);
      a = a.replace(/\[|]/g, "");
      a = a.replace(/\"|",/g, "");
      this.passWord = a.replace(/\,/g, "");
    },
    changePwd() {
      let index = this.pwdList.length;
      index === 6 && index--;
      this.ipt[index].focus();
    },
    // 输入的值变化了就会触发input
    changeInput() {
      let index = this.pwdList.length;
      let val = this.pwdList[index - 1];
      if (!/[0-9]/.test(val)) {
        this.pwdList.pop();
        return;
      }
      if (!val) {
        this.pwdList.pop();
        index--;
        if (index > 0) this.ipt[index - 1].focus();
      } else {
        if (index < 6) this.ipt[index].focus();
      }
    },
    // 按键事件
    keyUpT(ev) {
      let index = this.pwdListT.length;
      if (!index) return;
      if (ev.keyCode === 8) {
        this.isDelete = true;
        if (this.oldPwdListT === this.pwdListT.length) {
          if (index === this.pwdListT.length) {
            this.pwdListT.pop();
          }
          index--;
        } else {
          index > 0 && index--;
        }
        this.iptT[index].focus();
      } else if (
        this.isDelete &&
        index === this.pwdListT.length &&
        /^\d$/.test(ev.key)
      ) {
        this.isDelete = false;
        this.pwdListT.pop();
        this.pwdListT.push(ev.key);
        this.iptT[this.pwdListT.length] &&
          this.iptT[this.pwdListT.length].focus();
      }

      var a = "";
      a = JSON.stringify(this.pwdListT);
      a = a.replace(/\[|]/g, "");
      a = a.replace(/\"|",/g, "");
      this.newPassWord = a.replace(/\,/g, "");

    },
    changePwdT() {
      let index = this.pwdListT.length;
      index === 6 && index--;
      this.iptT[index].focus();
    },
    // 输入的值变化了就会触发input
    changeInputT() {
      let index = this.pwdListT.length;
      let val = this.pwdListT[index - 1];
      if (!/[0-9]/.test(val)) {
        this.pwdListT.pop();
        return;
      }
      if (!val) {
        this.pwdListT.pop();
        index--;
        if (index > 0) this.iptT[index - 1].focus();
      } else {
        if (index < 6) this.iptT[index].focus();
      }
    },
    // 按键事件
    keyUpW(ev) {
      let index = this.pwdListW.length;
      if (!index) return;
      if (ev.keyCode === 8) {
        this.isDelete = true;
        if (this.oldPwdListW === this.pwdListW.length) {
          if (index === this.pwdListW.length) {
            this.pwdListW.pop();
          }
          index--;
        } else {
          index > 0 && index--;
        }
        this.iptW[index].focus();
      } else if (
        this.isDelete &&
        index === this.pwdListW.length &&
        /^\d$/.test(ev.key)
      ) {
        this.isDelete = false;
        this.pwdListW.pop();
        this.pwdListW.push(ev.key);
        this.iptW[this.pwdListW.length] &&
          this.iptW[this.pwdListW.length].focus();
      }

      var a = "";
      a = JSON.stringify(this.pwdListW);
      a = a.replace(/\[|]/g, "");
      a = a.replace(/\"|",/g, "");
      this.oldPassWord = a.replace(/\,/g, "");

    },
    changePwdW() {
      let index = this.pwdListW.length;
      index === 6 && index--;
      this.iptW[index].focus();
    },
    // 输入的值变化了就会触发input
    changeInputW() {
      let index = this.pwdListW.length;
      let val = this.pwdListW[index - 1];
      if (!/[0-9]/.test(val)) {
        this.pwdListW.pop();
        return;
      }
      if (!val) {
        this.pwdListW.pop();
        index--;
        if (index > 0) this.iptW[index - 1].focus();
      } else {
        if (index < 6) this.iptW[index].focus();
      }
    },
    // 三秒倒计时
    countTime() {
      clearInterval(this.timer);
      let _times = 3;
      let _t = this.text;
      this.timer = setInterval(() => {
        _times--;
        this.text = `${_times}`;
        if (_times <= 0) {
          if ((this.typeCuss = "1")) {
            window.location.reload();
          }
        }
      }, 1000);
    },
    accBoxClick() {
      this.flagACC = false;
    },
    accPageClick() {
      this.$router.push({ path: "/userCenter/realName/realName" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "paymentCodeScode.less";
</style>
<style lang="less">
// @import "paymentCode.less";
</style>
<style lang="less">
@import "../index.less";
.accBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  & > div {
    width: 476px;
    height: 233px;
    background: #fff;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -166px 0 0 -238px;
    & > div:nth-child(1) {
      width: 476px;
      height: 45px;
      background: #f4f6f8;
      font-size: 16px;
      color: #333;
      position: relative;
      line-height: 45px;
      text-align: center;
      & > span:nth-child(2) {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 12px;
        cursor: pointer;
      }
      & > span:nth-child(2):hover {
        color: #f3262d;
      }
    }
    & > div:nth-child(2) {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666;
      & > span:nth-child(2) {
        cursor: pointer;
        margin-top: 55px;
        width: 106px;
        height: 30px;
        background: rgba(243, 38, 45, 1);
        border-radius: 2px;
        color: #fff;
        line-height: 30px;
        text-align: center;
        & > span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>

