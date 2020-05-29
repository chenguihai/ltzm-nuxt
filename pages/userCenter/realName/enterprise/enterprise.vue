<template>
  <!-- 企业实名 -->
  <div class="enterprise body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="enterprise">
          <span class="perso">企业实名</span>

          <div class="schedule">
            <div class="progress">
              <!-- 高亮圆圈 -->
              <div class="progress-circle">1</div>
              <!-- 高亮线条 -->
              <div class="light-line"></div>
              <!-- 上传企业信息-->
              <template v-if="showSuccess == 'show'">
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
                <div class="gray-circle">2</div>
                <div class="gray-line"></div>
                <span class="progress-arrow">>></span>
                <div class="gray-line"></div>
              </template>
              <!-- 上传法人信息 -->
              <template v-else>
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
                <div class="progress-circle success-circle">2</div>
                <div class="light-line"></div>
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
              </template>
              <template v-if="showSuccess == 'legal'|| showSuccess == 'show' ">
                <div class="gray-circle">3</div>
                <div class="gray-line"></div>
                <span class="progress-arrow">>></span>
                <div class="gray-line"></div>
              </template>
              <!-- 对公账户信息及打款回填 -->
              <template v-else-if="showSuccess == 'remit' || showSuccess == 'ente'">
                <div class="progress-circle success-circle">3</div>
                <div class="light-line"></div>
                <span class="progress-arrow lighe-arrow">>></span>
                <div class="light-line"></div>
              </template>
              <template v-if="showSuccess != 'ente'">
                <div class="gray-circle">4</div>
              </template>
              <template v-else>
                <div class="progress-circle success-circle">4</div>
              </template>

              <p class="progress-tips">
                <span class="light-tips-item" style="margin-left:-5px">上传企业信息</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: -14px;"
                  v-if="showSuccess != 'ente'"
                >认证结果</span>
                <span class="gray-tips-item success-tips" style="margin-right: -14px;" v-else>认证结果</span>

                <span
                  class="gray-tips-item"
                  style="margin-right: 105px;"
                  v-if="showSuccess == 'legal'|| showSuccess == 'show' "
                >对公账户信息及打款回填</span>
                <span
                  class="gray-tips-item success-tips"
                  style="margin-right: 105px;"
                  v-else-if="showSuccess == 'remit' || showSuccess == 'ente'"
                >对公账户信息及打款回填</span>
                <span
                  class="gray-tips-item"
                  style="margin-right: 92px;"
                  v-if="showSuccess == 'show'"
                >上传法人信息</span>
                <span class="gray-tips-item success-tips" style="margin-right: 92px;" v-else>上传法人信息</span>
              </p>
            </div>
          </div>
          <div class="notice" v-if="showSuccess=='show'">
            <span>这是一项身份识别服务，请注意以下几点：</span>
            <span>请确保您具有法人资格的商户，您需要提供可证明您依法设立、依法经营，开展社会活动的执照、证件等（如营业执照副本）证件有效期在3个月内的商户，请找工商部门更新资料后在行提交</span>
          </div>
        </div>
        <div class="enterprise_data" v-if="showSuccess == 'show'">
          <span>填写企业信息</span>
          <div class="enterprise_user">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="138px"
              class="demo-ruleForm"
            >
              <el-form-item label="企业名称：" prop="real_name" class="real_name">
                <el-input v-model="ruleForm.real_name" maxlength="50" placeholder="填写与营业执照上一致的名称"></el-input>
              </el-form-item>
              <el-form-item label="统一社会信用代码：" prop="id" class="id">
                <el-input v-model="ruleForm.id" maxlength="25" placeholder="填写统一社会信用代码"></el-input>
              </el-form-item>
              <el-form-item label="企业法人:" prop="name" class="phone">
                <el-input v-model="ruleForm.name" maxlength="6" placeholder="填写企业法人"></el-input>
                <template>
                  <span class="span">为保障您的资金安全，实名认证姓名和身份证号须和您提现的银行卡的户名保持一致</span>
                </template>
              </el-form-item>
              <el-form-item class="sun_btn">
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="enterprise_succ" v-else-if="showSuccess == 'legal'">
          <span>填写法人信息</span>
          <div class="enterprise_cg">
            <el-form
              :model="enterpriseForm"
              :rules="rules"
              ref="enterpriseForm"
              label-width="138px"
              class="demo-enterpriseForm"
            >
              <el-form-item label="真实姓名：" prop="enterpriseForm_name" class="real_name">
                <el-input v-model="ruleForm.name" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="身份证号码：" prop="enterpriseForm_id" class="id enterpriseForm_id">
                <el-input v-model="enterpriseForm.enterpriseForm_id" maxlength="25"></el-input>
                <template>
                  <span class="span">身份证号码前后不能有空格，年龄不足18岁，不能认证</span>
                </template>
              </el-form-item>
              <el-form-item label="手机号码:" prop="enterpriseForm_phone" class="phone">
                <el-input v-model="enterpriseForm.enterpriseForm_phone" maxlength="25"></el-input>
              </el-form-item>
              <el-form-item class="sun_btn">
                <el-button type="primary" @click="submitEnte('enterpriseForm')">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="enterprise_remit" v-else-if="showSuccess == 'remit'">
          <div class="remit" v-if="remitNo">
            <span>对公账户信息</span>
            <div class="enterprise_cg">
              <el-form
                :model="remitForm"
                :rules="rules"
                ref="remitForm"
                label-width="138px"
                class="demo-remitForm"
              >
                <el-form-item
                  label="	对公账户户名："
                  prop="remit_name"
                  class="real_name"
                  popper-class="real_name"
                >
                  <el-input v-model="ruleForm.real_name" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="企业对公银行账号：" prop="remit_bank" class="id">
                  <el-input v-model="remitForm.remit_bank" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="开户行名称：" prop="bank_name" class="phone">
                  <el-input v-model="remitForm.bank_name" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="开户行支行全称：" prop="bank_user" class="phone">
                  <el-input v-model="remitForm.bank_user" @blur="addressAll($event)" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="开户行所在地：" class="province">
                  <el-select v-model="remitForm.bank_province" placeholder="请选择">
                    <el-option
                      v-for="(item , index) in provinceAll"
                      :key="index"
                      label
                      :value="item"
                    ></el-option>
                  </el-select>
                  <el-select v-model="remitForm.bank_city " placeholder="请选择">
                    <el-option v-for="(itemC , index) in cityAll" :key="index" label :value="itemC"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="sun_btn">
                  <el-button type="primary" @click="submitRemit('remitForm')">下一步</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="enterprise_remittance" v-if="remittance ">
            <span>对公打款</span>
            <div class="remittance">
              <img src="../../../../assets/img/remMoney.png" alt />
              <span>系统即将往您公司的对公账户打一笔1元以下的款项，打款将在两小时内完成，请收到款项后再次点击实名认证进入本页面填写打款金额，完成身份认证</span>
              <el-form
                :model="remittanceForm"
                :rules="rules"
                ref="remittanceForm"
                label-width="120px"
                class="demo-remittanceForm"
              >
                <el-form-item
                  label="打款金额："
                  prop="remittance_name"
                  class="real_name"
                  popper-class="remittance_name"
                >
                  <el-input v-model="remittanceForm.remittance_name"></el-input>
                </el-form-item>
              </el-form>
              <span class="hint">
                <p>温馨提示：</p>
                <span>
                  打款到账最多需要等待
                  <i>30分钟</i>，打款金额
                  <i>72小时</i>有效，请及时查看收款记录并提交验证，允许最多错误
                  <i>3次</i>，超过3次请重新申请实名认证。
                </span>
              </span>
              <el-button type="primary" @click="submitRemittance('remittanceForm')">确定</el-button>
            </div>
          </div>
        </div>
        <div class="enterprise_ente" v-else-if="showSuccess == 'ente'">
          <span>管理员审核</span>
          <div class="personage_cg" v-if="personageCg =='1'">
            <div class="personage_left">
              <img src="../../../../assets/img/store/auth_s.png" alt />
            </div>
            <div class="personage_right">
              <span>恭喜快速实名认证成功！</span>
              <span>
                页面将在
                <p class="count-span">{{text}}</p>秒后自动返回
              </span>
              <nuxt-link tag="span" to="/">返回首页</nuxt-link>
            </div>
          </div>
          <div class="personage_cg" v-else-if="personageCg =='2'">
            <div class="personage_left">
              <img src="../../../../assets/img/store/auth_f.png" alt />
            </div>
            <div class="personage_right err">
              <span>您的实名认证申请审核未通过</span>
              <span>失败原因：企业对公账户打款回填有误。</span>
              <nuxt-link class="err" tag="span" to="/userCenter/realName/realName">重新申请</nuxt-link>
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
import {
  checkcompany,
  checkCompanyUser,
  checkTopay,
  getBranch,
  payAuth,
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
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写社会统一信任代码"));
      } else {
        const reg = /[0-9A-Z]{18}/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("社会统一信任代码错误"));
        }
      }
    };
    var checkq = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写企业名称"));
      } else {
        callback();
      }
    };
    var checkf = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写法人姓名"));
      } else {
        callback();
      }
    };
    var checkid = (rule, value, callback) => {
      if (value) {
        const reg = /[0-9X]{18}/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("身份证长度为18个字符"));
        }
      }else {
          return callback(new Error("请填写身份证"));
        }
    };
    var checkPhone = (rule, value, callback) => {
      if (value) {
        const reg =/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/ ;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }else{
         return callback(new Error("手机号不能为空"));
      }
    };
    var checkbank = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("银行卡不能为空"));
      } else {
        const reg = /^[+]{0,1}(\d+)$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的银行卡"));
        }
      }
    };
    var checkBankremit = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写企业对公银行账号"));
      } else {
        callback();
      }
    };
    var checkBankName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写开户行名称"));
      } else {
        callback();
      }
    };
    var checkBankuser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写开户行支行全称"));
      } else {
        callback();
      }
    };
    var checkaddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择地址"));
      } else {
        callback();
      }
    };
    var checM = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("金额不能为空"));
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
      showSuccess: "",
      remittance: false,
      remitNo: true,
      personageCg: "1",
      text: 3,
      // 企业认证第一步
      ruleForm: {
        real_name: "",
        id: "",
        name: ""
      },
      // 企业认证第二步
      enterpriseForm: {
        enterpriseForm_id: "",
        enterpriseForm_phone: ""
      },
      // 企业认证第三步
      remitForm: {
        remit_bank: "",
        bank_name: "",
        bank_user: "",
        bank_province: "",
        bank_city: ""
      },
      serviceid: "",
      provinceAll: [],
      cityAll: [],
      remittanceForm: {
        remittance_name: ""
      },
      rules: {
        real_name: [
          { validator: checkq, trigger: ["blur", "change"] },
          {
            message: "请填写企业名称",
            min: 2,
            max: 50,
            trigger: ["blur", "change"]
          }
        ],
        id: [
          { validator: checkName, trigger: ["blur", "change"] },
          {
            min: 18,
            max: 18,
            message: "长度 18 个字符",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          { validator: checkf, trigger: ["blur", "change"] },
          {
            min: 2,
            max: 6,
            message: "企业法人不能大于6个字符",
            trigger: ["blur", "change"]
          }
        ],
        enterpriseForm_id: [
          { validator: checkid, trigger: ["blur", "change"] },
        ],
        enterpriseForm_phone: [
          { validator: checkPhone, trigger: ["blur", "change"] },
        ],
        remit_bank: [
          { validator: checkBankremit, trigger: ["blur", "change"] }
        ],
        bank_name: [{ validator: checkBankName, trigger: ["blur", "change"] }],
        bank_user: [{ validator: checkBankuser, trigger: ["blur", "change"] }],
        bank_province: [
          { validator: checkaddress, trigger: ["blur", "change"] }
        ],
        bank_city: [{ validator: checkaddress, trigger: ["blur", "change"] }],
        remittance_name: [{ validator: checM, trigger: ["blur", "change"] }]
      },
         flag: "",
      dataList: {}
    };
  },
  created() {
    if (this.$route.query.serviceId) {
      this.showSuccess = "remit";
      this.remitNo = false;
      this.remittance = true;
      this.serviceid = this.$route.query.serviceId
    }else{
       this.showSuccess = "show";
    }
    this.init();
  },
  methods: {
    init() {
      signAccount()
        .then(res => {
          if (res.data.code == 201) {
            this.flag = "1";
          } else if (res.data.code == 200 && res.data.data.signstatus == 3) {
            this.dataList = res.data.data;
            var regN = /(?<=.)./g;
            this.dataList.name = this.dataList.name.replace(regN, "*");
            if (res.data.data.status == 1) {
              this.flag = "2";
              var reg = /(.{4}).*(.{4})/;
              var str = this.dataList.idno.replace(reg, "$1********$2");
              this.dataList.idno = str;
              var regp = /^(\d{3})\d+(\d{4})$/;
              var pho = this.dataList.mobile.replace(regp, "$1****$2");
              this.dataList.mobile = pho;
            } else {
              this.flag = "3";
              var reg = /(.{4}).*(.{4})/;
              var str = this.dataList.idno.replace(reg, "$1********$2");
              this.dataList.idno = str;
              var regp = /^(\d{3})\d+(\d{4})$/;
              var pho = this.dataList.mobile.replace(regp, "$1****$2");
              this.dataList.mobile = pho;
              var rege = /(.{4}).*(.{4})/;
              var com = this.dataList.company_codeusc.replace(
                rege,
                "$1********$2"
              );
              this.dataList.company_codeusc = com;
            }
          } else if (
            res.data.code == 200 &&
            res.data.data.signstatus != 3 &&
            res.data.data.step == 4 &&
            res.data.data.signService != null
          ) {
            if (res.data.data.signService.number < 3) {
            this.showSuccess = "remit";
            this.remitNo = false;
            this.remittance = true;
            this.serviceid = res.data.data.service_id
            } else {
              this.flag = "1";
            }
          } else {
            this.flag = "1";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 企业认证第一步
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let data = {
            name: this.ruleForm.real_name,
            codeUSC: this.ruleForm.id,
            legalName: this.ruleForm.name
          };
          checkcompany(data)
            .then(res => {
              if (res.data.code == 200) {
                this.showSuccess = "legal";
                this.serviceid = res.data.data.service_id;
              } else {
                this.$message.error(res.data.message);
              }
            })
          
            .catch(err => {
              // console.log(err);
            });
        }
      });
    },

    // 企业认证第二步
    submitEnte(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let dataT = {
            name: this.ruleForm.name,
            idno: this.enterpriseForm.enterpriseForm_id,
            mobile: this.enterpriseForm.enterpriseForm_phone
          };
          checkCompanyUser(dataT)
            .then(res => {
              if (res.data.code == 200) {
                this.showSuccess = "remit";
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    addressAll(e) {
      let dataA = { keyword: this.remitForm.bank_user };
      getBranch(dataA)
        .then(res => {
          if (res.data.code == 200) {
            var data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              this.provinceAll.push(data[i].province);
              this.cityAll.push(data[i].city);
              this.provinceAll = [...new Set(this.provinceAll)];
              this.cityAll = [...new Set(this.cityAll)];
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 企业认证第三步
    submitRemit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let dataT = {
            bank: this.remitForm.bank_name,
            cardno: this.remitForm.remit_bank,
            provice: this.remitForm.bank_province,
            city: this.remitForm.bank_city,
            name: this.ruleForm.real_name,
            service_id: this.serviceid,
            subbranch: this.remitForm.bank_user
          };
          checkTopay(dataT)
            .then(res => {
              if (res.data.code == 200) {
                this.remitNo = false;
                this.remittance = true;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              // console.log(err);
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
    },
    submitRemittance(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          let dataM = {
            cash: this.remittanceForm.remittance_name,
            serviceId: this.serviceid
          };
          payAuth(dataM)
            .then(res => {
              if (res.data.code == 200) {
                this.showSuccess = "ente";
                this.personageCg = 1;
                this.countTime();
              } else {
                var a = 3 - Number(res.data.data.failure);
                if (a == 0) {
                  this.showSuccess = "ente";
                  this.personageCg = 2;
                } else {
                  this.$message.error("输入打款金额有误，剩余" + a + "次机会");
                }
              }
            })
            .catch(err => {
              // console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "enterpriseScode.less";
</style>

<style lang="less" scoped>
@import "../../index.less";
</style>

<style lang="less">
@import "enterprise.less";
</style>


