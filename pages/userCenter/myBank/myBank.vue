<template>
  <!-- 银行卡管理 -->
  <div class="myBankbox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="bank_box">
          <div class="myBank" v-show="showb">
            <div class="myBank_top">个人银行卡</div>
            <div class="bankNull" v-if="allBank!=null">
              <div class="myBank_cont" v-if="flag=='cont'" :class="{'noborder':flaseNo}">
                <!-- 没有绑定银行卡状态 -->
                <div class="myBank_none" v-if="ruleFormE.length ==0">
                  <div class="imgs">
                    <img src="@/assets/img/ban.png" alt="img" />
                    <span class="text">您还未绑定个人银行卡哦</span>
                  </div>

                  <el-button class="ban_but" @click="cont_addE()">
                    <template>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianjia" class="ccccc" />
                      </svg>添加个人银行卡
                    </template>
                  </el-button>
                </div>
                <!-- 有绑定银行卡状态 -->
                <div class="myBank_none myBank_q" v-else>
                  <div class="myBank_none_box">
                    <li
                      class="myBank_true"
                      v-for="item in ruleFormE"
                      :key="item.id"
                      @click="selectItemActionE(item.id)"
                      :class="{active: item.id==selectIndex}"
                    >
                      <div class="myBank_d">
                        <span @click="deleteInfoActionE(item.id)">删除</span>
                      </div>
                      <div class="myBank_name">{{item.bank_name}}</div>
                      <div class="myBank_num">{{item.banknumber}}</div>
                      <div class="myBank_user">{{item.name}}</div>
                    </li>
                    <el-button class="ban_but" @click="cont_addE()">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianjia" class="ccccc" />
                      </svg>添加个人银行卡
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- 添加银行卡 -->
              <div class="myBank_add" v-else-if="flag=='add'">
                <el-form
                  :model="ruleFormE2"
                  ref="ruleFormE2"
                  label-width="100px"
                  class="demo-ruleFormE"
                >
                  <el-form-item label="开户行名称：">
                    <svg class="icon icon_myBank" aria-hidden="true">
                      <use xlink:href="#icon-shouyejiantou" />
                    </svg>
                    <el-select
                      v-model="ruleFormE2.region"
                      placeholder="请选择"
                      class="region_1"
                      popper-class="region"
                      @blur="regionBlur"
                      @change="regionChange"
                    >
                      <el-option
                        v-for="itenB  in nameBank"
                        :key="itenB.id"
                        :label="itenB.bank_name"
                        :value="itenB.id"
                        class="bank"
                      >{{itenB.bank_name}}</el-option>
                    </el-select>
                    <span class="errorSpan" v-if="flag1">
                      <img src="../../../assets/img/icon-error.png" alt /> 请选择开户行名称
                    </span>
                  </el-form-item>
                  <el-form-item label="银行卡账号：">
                    <el-input
                      @blur="bankNumBlur"
                      @change="bankNumChange"
                      v-model="ruleFormE2.bankNum"
                      maxlength="25"
                    ></el-input>
                    <span class="errorSpan" v-if="flag2">
                      <img src="../../../assets/img/icon-error.png" alt /> 请输入正确的银行卡账户
                    </span>

                    <template class="take_bankM">
                      <span class="take_bankM">请绑定储蓄卡，否则不能提现</span>
                    </template>
                  </el-form-item>
                  <el-form-item label="开户户名：">
                    <el-input
                      @blur="accounBlur"
                      @change="accounChange"
                      v-model="ruleFormE2.accountname"
                    ></el-input>
                    <span class="errorSpan" v-if="flag3">
                      <img src="../../../assets/img/icon-error.png" alt /> 请输入2-15个字符的开户户名
                    </span>
                  </el-form-item>
                  <el-form-item label="开户支行名称：">
                    <el-input
                      @blur="bankBlur"
                      @change="bankChange"
                      v-model.number="ruleFormE2.accountBank"
                    ></el-input>
                    <span class="errorSpan" v-if="flag4">
                      <img src="../../../assets/img/icon-error.png" alt /> 请输入开户支行名称
                    </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="ruleFormE2.type" @change="clickitem(1)">
                      <span>
                        <span>我已阅读并同意</span>
                        <nuxt-link
                          tag="a"
                          :to="{path:'/aboutUs/regulation/regulation',query :{type:'3'}}"
                          target="_blank"
                        >银行卡服务协议</nuxt-link>
                      </span>
                      <span class="errorSpan errorSpan2" v-if="flag5">
                        <img src="../../../assets/img/icon-error.png" alt /> 您还没阅读并同意银行卡服务协议
                      </span>
                    </el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      style="font-weight:600"
                      type="primary"
                      :loading="showLoadi"
                      @click="submitFormE('ruleFormE2')"
                    >确定绑定</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="myBank myBankE" v-show="showe" v-if="flagAc">
            <div class="myBank_top" :class="{'myBankG':flagAc == false}">对公银行卡</div>
            <div class="bankNull" v-if="allBank!=null">
              <div class="myBank_cont" v-if="flage=='cont'">
                <!-- 没有绑定对公银行卡状态 -->
                <div class="myBank_none" v-if="ruleForm.length ==0">
                  <div class="imgs">
                    <img src="@/assets/img/ban.png" alt="img" />
                    <span class="text">您还未绑定对公银行卡哦</span>
                  </div>
                  <el-button class="ban_but" @click="cont_add()">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-tianjia" class="ccccc" />
                    </svg>添加对公银行卡
                  </el-button>
                </div>
                <!-- 有绑定对公银行卡状态 -->
                <div class="myBank_none myBank_q" v-else>
                  <div class="myBank_none_box">
                    <li
                      class="myBank_true"
                      v-for="itemT in ruleForm"
                      :key="itemT.id"
                      @click="selectItemAction(itemT.id)"
                      :class="{active: itemT.id==selectIndex}"
                    >
                      <div class="myBank_d">
                        <span @click="deleteInfoAction(itemT.id)">删除</span>
                      </div>
                      <div class="myBank_name">{{itemT.bank_name}}</div>
                      <div class="myBank_num">{{itemT.banknumber}}</div>
                      <div class="myBank_user">{{itemT.name}}</div>
                    </li>
                    <el-button class="ban_but" :disabled="disabled" @click="cont_add()">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianjia" class="ccccc" />
                      </svg>添加对公银行卡
                    </el-button>
                  </div>
                </div>
              </div>

              <!-- 添加对公银行卡 -->
              <div class="myBank_add" v-else-if="flage=='add'">
                <el-form
                  :model="ruleForm2"
                  ref="ruleForm2"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="对公开户行名称：">
                    <svg class="icon icon_myBank" aria-hidden="true">
                      <use xlink:href="#icon-shouyejiantou" />
                    </svg>
                    <el-select
                      @blur="regionBlur"
                      @change="regionChange"
                      v-model="ruleForm2.region"
                      placeholder="请选择"
                      popper-class="region"
                    >
                      <el-option
                        v-for="itenB  in nameBank"
                        :key="itenB.id"
                        :label="itenB.bank_name"
                        :value="itenB.id"
                        class="bank"
                      >{{itenB.bank_name}}</el-option>
                    </el-select>
                    <span class="errorSpan" v-if="flag11">
                      <img src="../../../assets/img/icon-error.png" alt /> 请选择开户行名称
                    </span>
                  </el-form-item>
                  <el-form-item label="对公银行卡账号：">
                    <el-input
                      @blur="bankNumBlur"
                      @change="bankNumChange"
                      v-model="ruleForm2.bankNum"
                    ></el-input>
                    <span class="errorSpan" v-if="flag22">
                      <img src="../../../assets/img/icon-error.png" alt /> 请输入正确的银行卡账户
                    </span>

                    <template class="take_bankM">
                      <span class="take_bankM">请绑定储蓄卡，否则不能提现</span>
                    </template>
                  </el-form-item>
                  <el-form-item label="对公开户户名：">
                    <el-input
                      @blur="accounBlur"
                      @change="accounChange"
                      v-model="ruleForm2.accountname2"
                    ></el-input>
                    <span class="errorSpan" v-if="flag33">
                      <img src="../../../assets/img/icon-error.png" alt /> 请输入2-50个字符的开户户名
                    </span>
                  </el-form-item>
                  <el-form-item label="对公开户支行名称：">
                    <el-input
                      @blur="bankBlur"
                      @change="bankChange"
                      v-model.number="ruleForm2.accountBank"
                    ></el-input>
                    <span class="errorSpan" v-if="flag44">
                      <img src="../../../assets/img/icon-error.png" alt /> 请输入开户支行名称
                    </span>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="ruleForm2.type" @change="clickitem(1)">
                      <span>
                        <span>我已阅读并同意</span>
                        <nuxt-link
                          tag="a"
                          :to="{path:'/aboutUs/regulation/regulation',query:{type:'3'}}"
                          target="_blank"
                        >银行卡服务协议</nuxt-link>
                      </span>
                      <span class="errorSpan errorSpan2" v-if="flag55">
                        <img src="../../../assets/img/icon-error.png" alt /> 您还没阅读并同意银行卡服务协议
                      </span>
                    </el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      style="font-weight:600"
                      type="primary"
                      :loading="showLoadi"
                      @click="submitForm('ruleForm2')"
                    >确定绑定</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="realName" v-if="flagR">
      <div class="reminder">
        <div class="header_t">
          <span>温馨提示</span>
          <span @click="deletClick" class="iconfont icon-guanbi"></span>
        </div>
        <div class="content">
          <span>你还未实名认证，请先认证后添加</span>
          <span @click="routerClick">
            去认证
            <span class="iconfont icon-xiangyoudianji-xuanzhong"></span>
          </span>
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

import { mapMutations } from "vuex";
import {
  queryBank,
  bankCount,
  bankAdd,
  bankDelete,
  signAccount
} from "@/api/list";
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      flagR: false,
      disabled: false,
      userBank: "",
      userB: "",
      banknum: "",
      // banknumId: "",
      allBank: null,
      // 个人银行卡
      flag: "cont",
      showb: true,
      flaseNo: false,
      nameBank: [],
      ruleFormE2: {
        region: "",
        bankNum: "",
        accountname: "",
        accountBank: "",
        type: false,
        status: "1"
      },
      // 展示银行卡
      ruleFormE: [],
      ruleFormE3: {},
      ruleFormEindex: -1,
      // 对公银行卡
      showe: true,
      flage: "cont",
      ruleForm2: {
        region: "",
        bankNum: "",
        accountname2: "",
        accountBank: "",
        status: "2",
        type: false
      },
      ruleForm: [],
      ruleForm3: {},
      selectIndex: -1,
      ruleFormindex: -1,
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      flag11: false,
      flag22: false,
      flag33: false,
      flag44: false,
      flag55: false,
      flagAc: false,
      showLoadi:false
    };
  },
  mounted() {
    this.init();
    this.initBank();
  },
  methods: {
    // 查询用户银行卡
    init() {
      signAccount()
        .then(res => {
          if (res.data.code == 200 && res.data.data.signstatus == 3) {
            this.flagR = false;
            this.disabled = false;
            if (res.data.data.status == 1) {
              this.flagAc = false;
              this.flaseNo = true;
            } else {
              this.flagAc = true;
            }
          } else {
            this.flagR = true;
            this.disabled = true;
          }
        })
        .catch(err => {
          console.log(err);
        });

      queryBank()
        .then(res => {
          this.allBank = res.data.data || [];
           var a = [];
            var b = [];
          for (var i = 0; i < this.allBank.length; i++) {
            this.banknum = this.allBank[i].banknumber;
            var reg = /^(\d{4})\d+(\d{4})$/;
            var str = this.banknum.replace(reg, "$1**** ****$2");

            if (this.allBank[i].status == 1) {
              a.push(this.allBank[i]);
            }
            this.ruleFormE = a ;

            if (this.allBank[i].status == 2) {
              b.push(this.allBank[i]);
            }
            this.ruleForm = b ;

            this.allBank[i].banknumber = str;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initBank() {
      bankCount()
        .then(res => {
          if (res.data.code == 200) {
            this.nameBank = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转添加个人银行卡
    cont_addE() {
      if (this.disabled == true) {
        this.flagR = true;
      } else {
        this.flag = "add";
        this.showe = false;
      }
    },
    // 添加个人银行卡
   async submitFormE(formName) {
      if (this.ruleFormE2.region == "") {
        this.flag1 = true;
        return;
      }
      var reg = /^[0-9]{12,21}$/;
      if (this.ruleFormE2.bankNum == "" || !reg.test(this.ruleFormE2.bankNum)) {
        this.flag2 = true;
        return;
      }
      var regV = /^[A-Za-z0-9\u4e00-\u9fa5]{2,15}$/;
      if (
        this.ruleFormE2.accountname == "" ||
        !regV.test(this.ruleFormE2.accountname)
      ) {
        this.flag3 = true;
        return;
      }
      var reA = /^.{4,25}$/;
      if (
        this.ruleFormE2.accountBank == "" ||
        !reA.test(this.ruleFormE2.accountBank)
      ) {
        this.flag4 = true;
        return;
      }
      if (this.ruleFormE2.type == false) {
        this.flag5 = true;
        return;
      }
      this.showLoadi = true
      var info = {
        bid: this.ruleFormE2.region,
        banknumber: this.ruleFormE2.bankNum,
        name: this.ruleFormE2.accountname,
        branch: this.ruleFormE2.accountBank,
        status: "1"
      };
     let res = await bankAdd(info)
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            window.location.reload();
          } else {
            this.$message.error(res.data.message);
          }
          this.showLoadi = false
    },
    selectItemActionE(index) {
      if (this.selectIndex === index) {
        this.selectIndex = -1;
      } else {
        this.selectIndex = index;
      }
    },
    // 删除个人银行卡
    deleteInfoActionE(id) {
      bankDelete(id)
        .then(res => {
          if (res.data.code == 200) {
            window.location.reload();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 跳转新增对公银行卡
    cont_add() {
      if (this.disabled == true) {
        this.flagR = true;
      } else {
        this.flage = "add";
        this.showb = false;
      }
    },
    // 新增对公银行卡
   async submitForm(formName) {
      if (this.ruleForm2.region == "") {
        this.flag11 = true;
        return;
      }
      var reg = /^[0-9]{12,21}$/;
      if (this.ruleForm2.bankNum == "" && !reg.test(this.ruleForm2.bankNum)) {
        this.flag22 = true;
        return;
      }
      var regV = /^[A-Za-z0-9\u4e00-\u9fa5]{2,15}$/;
      if (
        this.ruleForm2.accountname2 == "" &&
        !regV.test(this.ruleForm2.accountname2)
      ) {
        this.flag33 = true;
        return;
      }
      var reA = /^.{4,25}$/;
      if (
        this.ruleForm2.accountBank == "" &&
        !reA.test(this.ruleForm2.accountBank)
      ) {
        this.flag44 = true;
        return;
      }
      if (this.ruleForm2.type == false) {
        this.flag55 = true;
        return;
      } else {
        this.flag55 = false;
      }
      this.showLoadi = true
      var info = {
        bid: this.ruleForm2.region,
        banknumber: this.ruleForm2.bankNum,
        name: this.ruleForm2.accountname2,
        branch: this.ruleForm2.accountBank,
        status: "2"
      };
      let res = await bankAdd(info) 
          if (res.data.code == 200) {
             this.$message.success("添加成功");
            window.location.reload();
          } else {
            this.$message.error(res.data.message);
          }

        this.showLoadi = false
    },
    // 清空数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectItemAction(index) {
      if (this.selectIndex === index) {
        this.selectIndex = -1;
      } else {
        this.selectIndex = index;
      }
    },
    // 删除对公数据
    deleteInfoAction(id) {
      bankDelete(id)
        .then(res => {
          if (res.data.code == 200) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    clickitem(e) {
      if (this.ruleForm2.type == false) {
        this.flag55 = true;
      } else {
        this.flag55 = false;
      }
      if (this.ruleFormE2.type == false) {
        this.flag5 = true;
      } else {
        this.flag5 = false;
      }
      if (
        (this.ruleFormE2.type == false && e == 1) ||
        (this.ruleForm2.type == false && e == 2)
      ) {
        this.flag5 = true;
      } else {
        this.flag5 = false;
      }
    },
    // 关闭弹窗
    deletClick() {
      this.flagR = false;
    },
    // 跳转验证
    routerClick() {
      this.$router.push({ path: "/userCenter/realName/realName" });
    },
    regionBlur() {
      if (this.ruleFormE2.region == "") {
        this.flag1 = true;
      } else {
        this.flag1 = false;
      }
      if (this.ruleForm2.region == "") {
        this.flag11 = true;
      } else {
        this.flag11 = false;
      }
    },
    regionChange() {
      if (this.ruleFormE2.region == "") {
        this.flag1 = true;
      } else {
        this.flag1 = false;
      }
      if (this.ruleForm2.region == "") {
        this.flag11 = true;
      } else {
        this.flag11 = false;
      }
    },
    bankNumBlur() {
      var reg = /^[0-9]{12,21}$/;
      if (this.ruleFormE2.bankNum == "" || !reg.test(this.ruleFormE2.bankNum)) {
        this.flag2 = true;
      } else {
        this.flag2 = false;
      }
      if (this.ruleForm2.bankNum == "" || !reg.test(this.ruleForm2.bankNum)) {
        this.flag22 = true;
      } else {
        this.flag22 = false;
      }
    },
    bankNumChange() {
      var reg = /^[0-9]{12,21}$/;
      if (this.ruleFormE2.bankNum == "" || !reg.test(this.ruleFormE2.bankNum)) {
        this.flag2 = true;
      } else {
        this.flag2 = false;
      }
      if (this.ruleForm2.bankNum == "" || !reg.test(this.ruleForm2.bankNum)) {
        this.flag22 = true;
      } else {
        this.flag22 = false;
      }
    },
    accounBlur() {
      var regV = /^[A-Za-z0-9\u4e00-\u9fa5]{2,15}$/;
      if (
        this.ruleFormE2.accountname == "" ||
        !regV.test(this.ruleFormE2.accountname)
      ) {
        this.flag3 = true;
      } else {
        this.flag3 = false;
      }
      if (
        this.ruleForm2.accountname == "" ||
        !regV.test(this.ruleForm2.accountname)
      ) {
        this.flag33 = true;
      } else {
        this.flag33 = false;
      }
    },
    accounChange() {
      var regV = /^[A-Za-z0-9\u4e00-\u9fa5]{2,15}$/;
      if (
        this.ruleFormE2.accountname == "" ||
        !regV.test(this.ruleFormE2.accountname)
      ) {
        this.flag3 = true;
      } else {
        this.flag3 = false;
      }
      if (
        this.ruleForm2.accountname2 == "" ||
        !regV.test(this.ruleForm2.accountname2)
      ) {
        this.flag33 = true;
      } else {
        this.flag33 = false;
      }
    },
    bankBlur() {
      var reA = /^.{4,25}$/;
      if (
        this.ruleFormE2.accountBank == "" ||
        !reA.test(this.ruleFormE2.accountBank)
      ) {
        this.flag4 = true;
      } else {
        this.flag4 = false;
      }
      if (
        this.ruleForm2.accountBank == "" ||
        !reA.test(this.ruleForm2.accountBank)
      ) {
        this.flag44 = true;
      } else {
        this.flag44 = false;
      }
    },
    bankChange() {
      var reA = /^.{4,25}$/;
      if (
        this.ruleFormE2.accountBank == "" ||
        !reA.test(this.ruleFormE2.accountBank)
      ) {
        this.flag4 = true;
      } else {
        this.flag4 = false;
      }
      if (
        this.ruleForm2.accountBank == "" ||
        !reA.test(this.ruleForm2.accountBank)
      ) {
        this.flag44 = true;
      } else {
        this.flag44 = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "myBankScode.less";
</style>
<style lang="less">
@import "myBank.less";
</style>
<style lang="less">
@import "../index.less";
</style>
