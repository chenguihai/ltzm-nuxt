<template>
  <!-- 确认验收付款 -->
  <div class="supplement-box" @click.self="close">
    <div class="supplement _apply_invoice_">
      <div class="top">
        <p class="title">{{next ? '填写收票信息' : '填写发票信息'}}</p>
        <i class="iconfont icon-guanbi close" @click="close"></i>
      </div>
 <!-- :rules="rules" -->
      <el-form class="form" ref="form" :model="form" label-width="100px">
        <template v-if="!next">
          <el-form-item label="开票方式">
            <el-radio-group v-model="form.type" @change="radioChange">
              <el-radio
                v-for="item in openWays"
                :key="item.value"
                :label="item.value"
              >{{ item.label }}</el-radio>
              <template>
                <nuxt-link to="/userCenter/invoiceTitle/invoiceTitle" class="inList">管理发票抬头</nuxt-link>
              </template>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发票类型">
            <el-select
              v-model="form.invoice_type"
              placeholder="请选择"
              @change="typeChange"
              :disabled="typeDisabled"
            >
              <el-option
                v-for="item in ticketTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发票抬头">
            <el-select
              v-if="invoiceFilter.length > 0"
              v-model="form.company_name"
              placeholder="请选择"
              @change="companyName"
            >
              <el-option
                v-for="item in invoiceFilter"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
            <el-input v-else v-model="form.company_name" placeholder="发票抬头"></el-input>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item label="收票地址">
            <div class="address-sel-box">
              <el-select
                class="address-sel"
                v-model="form.province"
                placeholder="请选择省"
                @change="form.city = form.district = ''"
              >
                <el-option
                  v-for="(item, idx) in cityJSON"
                  :key="item.id"
                  :label="item.name"
                  :value="`${item.id};${idx}`"
                ></el-option>
              </el-select>
              <el-select
                class="address-sel"
                v-model="form.city"
                placeholder="请选择市"
                @change="form.district = ''"
              >
                <el-option
                  v-for="(item, idx) in cityArr"
                  :key="item.id"
                  :label="item.name"
                  :value="`${item.id};${idx}`"
                ></el-option>
              </el-select>
              <el-select class="address-sel" v-model="form.district" placeholder="请选择区">
                <el-option
                  v-for="item in countyArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <el-input v-model="form.address" placeholder="详细地址"></el-input>
          </el-form-item>
          <el-form-item label="收票人">
            <el-input v-model="form.name" placeholder="请填写收票人姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" maxlength="11" placeholder="请填写联系电话"></el-input>
          </el-form-item>
        </template>

        <transition name="form">
          <div v-if="form.type === 2 && !next">
            <el-form-item label="纳税人识别号">
              <el-input
                v-model="form.taxpayer_id"
                maxlength="18"
                placeholder="请填写税务登记证上的15-18位纳税人识别号"
              ></el-input>
            </el-form-item>
            <template v-if="form.invoice_type === 2">
              <el-form-item label="注册电话">
                <el-input v-model="form.registration_phone" placeholder="请填写营业执照上注册电话"></el-input>
              </el-form-item>
              <el-form-item label="注册地址">
                <el-input v-model="form.registration_address" placeholder="请填写营业执照上地址"></el-input>
              </el-form-item>
              <el-form-item label="开户支行名称">
                <el-input v-model="form.deposit_bank" placeholder="请填写开户支行名称"></el-input>
              </el-form-item>
              <el-form-item label="银行卡号">
                <el-input v-model="form.bank_account" @input="formatBank"></el-input>
              </el-form-item>
            </template>
          </div>
        </transition>
      </el-form>
      <div class="btn-box">
        <div class="btn" @click="nextGo">{{btnText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { applyInvoice } from "~/api/order";
import { dialogMixin } from "~/utils/common-mixins";
import { checkEmptyValue, regDaqo } from "~/utils/tool";
import cityJSON from "~/utils/city.json";
import { invoiceList } from "@/api/list";
const companyRules = [
  "company_name",
  "taxpayer_id",
  "registration_address",
  {
    name: "registration_phone",
    test: regDaqo.phone
  },
  "deposit_bank",
  "bank_account"
];
const companyEasyRules = [
  {
    name: "company_name",
    test: regDaqo.companyName
  },
  "taxpayer_id"
];
const addressRules = ["name", "province", "city", "district", "address"];
const errorMsgList = new Map([["registration_phone", "请输入正确的联系电话"]]);
export default {
  name: "applyInvoice",
  mixins: [dialogMixin()],
  data() {
    function checkTaxId(taxId) {
      var regArr = [
        /^[\da-z]{10,15}$/i,
        /^\d{6}[\da-z]{10,12}$/i,
        /^[a-z]\d{6}[\da-z]{9,11}$/i,
        /^[a-z]{2}\d{6}[\da-z]{8,10}$/i,
        /^\d{14}[\dx][\da-z]{4,5}$/i,
        /^\d{17}[\dx][\da-z]{1,2}$/i,
        /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i,
        /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i,
        /^[\d]{6}[\da-z]{13,14}$/i
      ];
      var i;
      var j = regArr.length;
      for (var i = 0; i < j; i++) {
        if (regArr[i].test(taxId)) {
          return true;
        }
      }
    }
    var validateRise = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,50}$/.test(value)) {
        callback(new Error("发票抬头2-50"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      if (!checkTaxId(value)) {
        callback(new Error("字母+数字 15-20"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/.test(value)) {
        callback(new Error("手机号码格式不对"));
      } else {
        callback();
      }
    };
    var validateAddress = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9-]{4,25}$/.test(value)) {
        callback(new Error("注册地址4-25个字"));
      } else {
        callback();
      }
    };
    var validateBank = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5]{4,25}$/.test(value)) {
        callback(new Error("开户银行名称4-25个字"));
      } else {
        callback();
      }
    };
    var validateCard = (rule, value, callback) => {
      if (!/^\d{13,21}$/.test(value)) {
        callback(new Error("银行卡号13-21个字"));
      } else {
        callback();
      }
    };
    return {
      /*
                参数名	必填	类型	说明
          order_sn	否	string	12019092156979910086
          user_type	是	integer	用户类型1服务商 2雇主（此处传2）
          company_name	是	string	抬头：公司名称公司名称公司名称公司名称
          taxpayer_id	否	string	纳税人识别号：1111111111111111111
          registration_address	否	string	详细地址：广东省深圳市宝安区新安街道大宝路1号xx楼1110
          registration_phone	否	string	联系电话：0755-1011111111
          deposit_bank	否	string	开户银行：建设银行xxx支行
          bank_account	否	string	银行卡号：53356666666666666
          name	否	string	收票人：陈先生
          phone	否	string	188888888888
          province	否	string	省编码110105
          city	否	string	市编码110105
          district	否	string	县编码110105
          address	否	string	完整的收票地址,要带上省市地区：广东省深圳市宝安区大宝路1号
                */
      form: {
        type: 2, //是	integer	发票抬头类型1个人 2企业
        invoice_type: 1, //是	integer	发票类型1普通 2增值税专用
        company_name: "", // 抬头
        taxpayer_id: "",
        registration_address: "",
        registration_phone: "",
        deposit_bank: "",
        bank_account: "",
        name: "",
        phone: "",

        province: "",
        city: "",
        district: "",
        address: ""
      },
      loadConfig: {
        sendCodeLoading: false
      },
      next: false,
      cityJSON: JSON.parse(JSON.stringify(cityJSON)),
      oldBank: "",
      typeDisabled: false,
      openWays: [
        { value: 2, label: "企业" },
        { value: 1, label: "个人" }
      ],
      ticketTypes: [
        { value: 2, label: "增值税专用发票" },
        { value: 1, label: "增值税普通发票" }
      ],
      invoiceData: [],
      invoiceFilter: [],
      rules: {
        //     message: "请输入15-18位的纳税人识别号",
        phone: [
          { required: true, message: "联系电话不能为空", trigger: "change" },
          { validator: validatePhone, trigger: "change" }
        ],
        address: [
          { required: true, message: "详情地址不能为空", trigger: "change" }
        ],
        district: [
          { required: true, message: "省市区不能为空", trigger: "change" }
        ],
        name: [
          { required: true, message: "收票人不能为空", trigger: "change" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" }
        ],
        type: [
          { required: true, message: "开票方式不能为空", trigger: "change" }
        ],
        invoice_type: [
          { required: true, message: "发票类型不能为空", trigger: "change" }
        ],
        company_name: [
          { required: true, message: "发票抬头不能为空", trigger: "change" }
        ],
        taxpayer_id: [
          {
            required: true,
            message: "纳税人识别号不能为空",
            trigger: "change"
          },
          { validator: validateNumber, trigger: "change" }
        ],
        registration_phone: [
          { required: true, message: "注册电话不能为空", trigger: "change" },
          { validator: validatePhone, trigger: "change" }
        ],
        registration_address: [
          { required: true, message: "注册地址不能为空", trigger: "change" },
          { validator: validateAddress, trigger: "change" }
        ],
        deposit_bank: [
          { required: true, message: "开户银行不能为空", trigger: "change" },
          { validator: validateBank, trigger: "change" }
        ],
        bank_account: [
          { required: true, message: "银行卡号不能为空", trigger: "change" },
          { validator: validateCard, trigger: "change" }
        ]
      }
    };
  },
  computed: {
    btnText() {
      return this.next ? "确定" : "下一步";
    },
    cityArr() {
      const { province } = this.form;
      return this.citySelParse(province, this.cityJSON);
    },
    countyArr() {
      const { city } = this.form;
      return this.citySelParse(city, this.cityArr);
    }
  },
  inject: ["orderInfo", "identity"],
  created() {
    for (var i = 0; i < this.cityJSON.length; i++) {
      if (this.cityJSON[i].name === "全国") {
        this.cityJSON.splice(i, 1);
      }
    }
    this.init();
  },
  methods: {
    async init() {
      let res = await invoiceList(1);
      const {
        code,
        data: { data = [] }
      } = res.data;
      if (code == 200) {
        this.invoiceData = data;
        this.invoiceFilter = data.filter(
          item => item.type === 2 && item.types === 1
        ); //type 企业类型
        //申请发票初始数据
        if (this.invoiceData.length > 0) {
          if (this.invoiceData[0].type == 1) {
            this.form.type = 1;
            this.form.company_name = this.invoiceData[0].name;
          } else {
            this.form.company_name = this.invoiceData[0].name;
            this.form.type = 2;
            this.form.invoice_type = this.invoiceData[0].types;
            if (this.invoiceData[0].types == 1) {
              this.form.taxpayer_id = this.invoiceData[0].number;
            } else {
              this.form.taxpayer_id = this.invoiceData[0].number;
              this.form.registration_phone = this.invoiceData[0].mobile;
              this.form.registration_address = this.invoiceData[0].address;
              this.form.deposit_bank = this.invoiceData[0].bank;
              this.form.bank_account = this.invoiceData[0].banknumber;
            }
          }
        }
      }
    },
    companyName(val) {
      let data = this.invoiceFilter;
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === val) {
          const {
            number = "",
            mobile = "",
            address = "",
            bank = "",
            banknumber = ""
          } = data[i];
          this.form.taxpayer_id = number;
          this.form.registration_phone = mobile;
          this.form.registration_address = address;
          this.form.deposit_bank = bank;
          this.form.bank_account = banknumber;
          break;
        }
      }
    },
    // 切换个人企业
    radioChange(val) {
      if (this.invoiceData.length > 0) {
        if (val === 1) {
          this.invoiceFilter = this.invoiceData.filter(
            item => item.type === val && item.types
          ); //type 企业类型
          this.form.invoice_type = 1;
          this.typeDisabled = true;
          if (this.invoiceFilter.length > 0) {
            this.form.company_name = this.invoiceFilter[0].name;
          } else {
            this.form.company_name = "";
          }
          this.form.taxpayer_id = "";
          this.form.registration_phone = "";
          this.form.registration_address = "";
          this.form.deposit_bank = "";
          this.form.bank_account = "";
        } else {
          this.invoiceFilter = this.invoiceData.filter(
            item => item.type === val && item.types === this.form.invoice_type
          ); //type 企业类型
          this.typeDisabled = false;
          if (this.invoiceFilter.length > 0) {
            this.form.company_name = this.invoiceFilter[0].name;
            this.form.invoice_type = this.invoiceFilter[0].types;
            if (this.invoiceFilter[0].types == 1) {
              this.form.taxpayer_id = this.invoiceFilter[0].number;
              this.form.registration_phone = "";
              this.form.registration_address = "";
              this.form.deposit_bank = "";
              this.form.bank_account = "";
            } else {
              this.form.taxpayer_id = this.invoiceFilter[0].number;
              this.form.registration_phone = this.invoiceFilter[0].mobile;
              this.form.registration_address = this.invoiceFilter[0].address;
              this.form.deposit_bank = this.invoiceFilter[0].bank;
              this.form.bank_account = this.invoiceFilter[0].banknumber;
            }
          } else {
            this.form.company_name = "";
          }
        }
      } else {
        if (val === 1) {
          this.form.invoice_type = 1;
          this.typeDisabled = true;
        } else {
          this.typeDisabled = false;
        }
        this.form.taxpayer_id = "";
        this.form.company_name = "";
      }
    },
    typeChange(val) {
      this.form.company_name = "";
      this.form.taxpayer_id = "";
      this.form.registration_phone = "";
      this.form.registration_address = "";
      this.form.deposit_bank = "";
      this.form.bank_account = "";
      if (this.invoiceData.length > 0) {
        this.invoiceFilter = this.invoiceData.filter(
          item => item.type === this.form.type && item.types === val
        ); //type 企业类型
        if (val === 1) {
          if (this.invoiceFilter.length > 0) {
            this.form.company_name = this.invoiceFilter[0].name;
            this.form.invoice_type = this.invoiceFilter[0].types;
            this.form.taxpayer_id = this.invoiceFilter[0].number;
            this.form.registration_phone = "";
            this.form.registration_address = "";
            this.form.deposit_bank = "";
            this.form.bank_account = "";
          } else {
            this.form.company_name = "";
            this.form.taxpayer_id = "";
          }
        } else {
          if (this.invoiceFilter.length > 0) {
            this.form.company_name = this.invoiceFilter[0].name;
            this.form.invoice_type = this.invoiceFilter[0].types;
            this.form.taxpayer_id = this.invoiceFilter[0].number;
            this.form.registration_phone = this.invoiceFilter[0].mobile;
            this.form.registration_address = this.invoiceFilter[0].address;
            this.form.deposit_bank = this.invoiceFilter[0].bank;
            this.form.bank_account = this.invoiceFilter[0].banknumber;
          } else {
            this.form.company_name = "";
            this.form.taxpayer_id = "";
          }
        }
      } else {
        this.form.company_name = "";
        this.form.taxpayer_id = "";
      }
    },
    nextGo() {
      if (this.next === false) {
        if (
          this.form.type === 2 &&
          this.form.invoice_type === 2 &&
          !this.formValidation(companyRules)
        ) {
          // 公司 增值税专用发票
          this.$message.error("请正确填写公司信息");
          return;
        } else if (
          this.form.type == 2 &&
          this.form.invoice_type == 1 &&
          !this.formValidation(companyEasyRules)
        ) {
          // 公司 增值税普通发票
          this.$message.error("请正确填写公司信息");
          return;
        }
      }
      if (this.form.company_name == "") {
        return this.$message.error("请填写发票抬头");
      }
      // 基本信息通过验证
      if (!this.next) return (this.next = true);
      // 验证地址信息
      if (!this.formValidation(addressRules))
        return this.$message.error("请正确填写收票信息");
      this.submit();
    },
    async submit() {
      const params = Object.assign({}, this.form);
      params.order_sn = this.orderInfo.order_sn;
      params.bank_account = this.form.bank_account.replace(/\s/g, "");

      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log({ ...params }, valid);
        } else {
          return false;
        }
      });
      const res = await applyInvoice(params).catch(e =>
        this.$message.error("申请失败")
      );
      const { code, data, message } = res.data;
      if (code === 422) {
        this.$message.error(message);
        return;
      }
      // 发起申请成功
      this.close(1);
      this.$message.success("您已经成功申请开票");
    },
    citySelParse(s, data) {
      if (s) {
        let idx = s.split(";")[1];
        return data[idx].child;
      } else {
        return [];
      }
    },
    formValidation(rules) {
      return rules.every(rule => {
        const check = checkEmptyValue(rule, this.form);
        if (!check && errorMsgList.get(rule.name || rule)) {
          this.$message.error(errorMsgList.get(rule.name || rule));
        }
        return check;
      });
    },
    formatBank(value) {
      if (value === this.oldBank) {
        return;
      } else {
        this.oldValue = value;
      }
      let bank = value;
      if (!bank) return "";
      let account = new String(bank);
      account = account.substring(0, 22); /*帐号的总数, 包括空格在内 */
      if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
        /* 对照格式 */
        if (
          account.match(
            ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
              ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
              ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
              ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}"
          ) == null
        ) {
          let accountNumeric = "",
            accountChar = "",
            i;
          for (i = 0; i < account.length; i++) {
            accountChar = account.substr(i, 1);
            if (!isNaN(accountChar) && accountChar != " ")
              accountNumeric = accountNumeric + accountChar;
          }
          account = "";
          for (i = 0; i < accountNumeric.length; i++) {
            /* 可将以下空格改为-,效果也不错 */
            if (i == 4 || i == 8 || i == 12)
              account = account + " "; /* 帐号第n位数后加空格 */
            account = account + accountNumeric.substr(i, 1);
          }
        }
      } else {
        account =
          " " +
          account.substring(1, 5) +
          " " +
          account.substring(6, 10) +
          " " +
          account.substring(14, 18) +
          " " +
          account.substring(18, 25);
      }
      this.form.bank_account = account;
    }
  }
};
</script>

<style scoped lang="less">
@import "./dialog.less";

.supplement-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  .inList {
    color: #0066cc;
    font-size: 14px;
    margin-left: 20px;
    cursor: pointer;
  }

  .supplement {
    width: 560px;
    background: #fff;
    padding-bottom: 36px;
    overflow: auto;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 25px;
      background: #f5f5f5;
      text-align: center;

      .title {
        font-size: 16px;
        font-weight: 400;
        color: #333;
      }
    }

    .btn {
      padding: 10px 20px;
      background: rgba(243, 38, 45, 1);
      border-radius: 2px;
      font-size: 14px;
      margin: auto;
      cursor: pointer;
      margin-top: 30px;
      color: #fff;
      text-align: center;
      display: inline-block;

      &.dis {
        background: #e3e3e3;
        color: #999;
        cursor: not-allowed;
      }
    }
  }

  .btn-box {
    margin-top: 27px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      margin: 0;
      margin-right: 12px;
    }

    .cancel {
      background: rgba(244, 244, 244, 1);
      border: 1px solid rgba(223, 223, 223, 1);
      color: #666;
    }
  }

  .form {
    width: 420px;
    margin: auto;
    margin-top: 47px;
  }
}

.address-sel-box {
  display: flex;
  align-items: center;
  margin-bottom: 9px;

  .address-sel {
    flex: 1;
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.form-enter-active,
.form-leave-active {
  transition: max-height 0.5s;
  max-height: 288px;
  overflow: hidden;
}

.form-enter,
.form-leave-to {
  max-height: 0;
}
</style>
<style lang="less">
.address-sel {
  & > .el-input {
    & > .el-input__inner {
      width: 102px;
      padding-right: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
