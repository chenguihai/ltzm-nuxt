<template>
  <!-- 提现 -->
  <div class="takeMoneybox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="takeMoney">
          <div class="takeMoney_top">
            <span>账户余额提现</span>
          </div>
          <div class="takeMoney_bot">
            <!-- <span>
              提现手续费说明：
              <p>提现手续费费率为1%</p>
            </span> -->
            <div class="takeMoney_con">
              <div class="text_money">
                <span>可提现金额：</span> 
                <span>{{userMoney.money}}元</span>
              </div>
              <el-form
                :model="takeMoney"
                :rules="rules"
                ref="takeMoney"
                label-width="103px"
                class="demo-takeMoney"
              >
                <el-form-item label="提现金额：" prop="money">
                  <el-input v-model="takeMoney.money">
                    <span>元</span>
                  </el-input>
                  <p>人民币不少于1元</p>
                </el-form-item>
                <el-form-item label="银行卡类型：" prop="radio" class="takeRadio">
                  <el-radio-group
                    v-model="takeMoney.radio"
                    @change="radioChange"
                    v-if="typerz=='1'"
                  >
                    <el-radio v-model="takeMoney.radio" :label="1">个人银行卡</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="takeMoney.radio"
                    @change="radioChange"
                    v-if="typerz=='2'"
                  >
                    <el-radio v-model="takeMoney.radio" :label="1">个人银行卡</el-radio>
                    <el-radio v-model="takeMoney.radio" :label="2">对公银行卡</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="选择银行：" prop="region" class="takeMoney_bank">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shouyejiantou" />
                  </svg>

                  <el-select v-model="takeMoney.region" placeholder="请选择银行" class="user_bank">
                    <el-option
                      v-for="item in bankList"
                      :key="item.id"
                      :label="item.lab"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div>
                   <el-form-item class="submitForm_but">
                  <el-button class="submit" type="primary" @click="submitForm('takeMoney')">确认提现</el-button>
                </el-form-item>
                  <div class="submitForm_but submitForm_sim">
                  <el-button class="submit" type="primary" @click="submitFormsbm('takeMoney')">重置</el-button>
                  </div>
                </div>
                
              </el-form>
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
import { takeShow, takeMoney } from "@/api/list";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  data() {
    var checkmoney = (rule, value, callback) => {
      var a = Number(this.takeMoney.money);
      var b = Number(this.userMoney.money);
      if (!value) {
        return callback(new Error("提现金额不能为空"));
      } else if (a > b) {
        return callback(new Error("超出本次可提现金额"));
      } else if (value < 1) {
        return callback(new Error("提现金额不能小于1元"));
      } else {
        const reg = /^\d+(\.\d{0,2})?$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("金额只能保留两位小数"));
        }
      }
    };
    return {
      userMoney: "",
      bankList: [],
      flag: false,
      takeMoney: {
        region: "",
        money: "",
        radio: ""
      },

      rules: {
        money: [
          {
            validator: checkmoney,
            trigger: ["blur", "change"]
          }
        ],
        region: [
          {
            required: true,
            message: "请选择银行卡",
            trigger: ["blur", "change"]
          }
        ]
      },
      typerz: this.$route.query.typerz
    };
  },
  created() {
    this.init();
    this.takeMoney.radio = 1
  },
  methods: {
    init() {
      takeShow()
        .then(res => {
          if (res.data.code == 200) {
            this.userMoney = res.data.data.money;
            this.bankList = res.data.data.list;
            for (let i = 0; i < this.bankList.length; i++) {
              var lab =
                this.bankList[i].bank_name +
                "(" +
                this.bankList[i].banknumber +
                ")";
              this.bankList[i] = { ...this.bankList[i], lab };
            }
            var a = [];
            if (this.takeMoney.radio == "1") {
              for (let i = 0; i < this.bankList.length; i++) {
                if (this.bankList[i].status == 1) {
                  a.push(this.bankList[i]);
                }
              }
              this.bankList = a;
            } else if (this.takeMoney.radio == "2") {
              for (let i = 0; i < this.bankList.length; i++) {
                if (this.bankList[i].status == 2) {
                  a.push(this.bankList[i]);
                }
              }
              this.bankList = a;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          for (let i = 0; i < this.bankList.length; i++) {
            if (this.bankList[i].id == this.takeMoney.region) {
              var bank_name = this.bankList[i].bank_name;
              var banknumber = this.bankList[i].banknumber;
              var branch = this.bankList[i].branch;
              var name = this.bankList[i].name;
            }
          }
          var data = {
            money: this.takeMoney.money,
            bid: this.takeMoney.region,
            bankname: bank_name,
            banknumber: banknumber,
            branch: branch,
            name: name
          };
          takeMoney(data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success(
                  "提现" + res.data.message + "，请耐心等待管理员审核"
                );
                this.init();
                this.$refs[formName].resetFields();
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
    submitFormsbm(formName) {
      this.$refs[formName].resetFields();
    },
    // 选择个人 企业
    radioChange() {
      this.init();
    }
  }
};
</script>
<style lang="less" scoped>
@import "takeMoneyScode.less";
</style>
<style lang="less">
@import "takeMoney.less";
</style>
<style lang="less" scoped>
@import "../index.less";
</style>