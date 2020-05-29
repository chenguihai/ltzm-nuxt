<template>
  <el-dialog
    title="填写发票信息"
    :visible.sync="showFlag"
    width="560px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="invoice_pop"
  >
    <el-form class="ticket_form" ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="开票方式" prop="type">
        <el-col :span="16">
          <el-radio-group v-model="form.type" @change="radioChange">
            <el-radio
              v-for="item in openWays"
              :key="item.value"
              :label="item.value"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="7">
          <template>
            <nuxt-link class="blue" to="/userCenter/invoiceTitle/invoiceTitle">管理发票抬头</nuxt-link>
          </template>
        </el-col>
      </el-form-item>
      <el-form-item label="发票类型" prop="invoice_type">
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
      <el-form-item label="发票抬头" prop="company_name">
        <el-select
          v-if="invoiceFilter.length > 0"
          v-model="form.company_name"
          placeholder="请选择"
          filterable
          @change="companyName"
        >
          <el-option
            v-for="item in invoiceFilter"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-input v-else v-model="form.company_name" placeholder="发票抬头" />
      </el-form-item>
      <el-form-item v-if="form.type === 2" label="纳税人识别号" prop="taxpayer_id">
        <el-input v-model="form.taxpayer_id" placeholder="请填写税务登记证上的15位纳税人识别号" />
      </el-form-item>
      <template v-if="form.invoice_type === 2 && form.type === 2">
        <el-form-item label="注册电话" prop="registration_phone">
          <el-input v-model="form.registration_phone" placeholder="请填写营业执照上注册电话" />
        </el-form-item>
        <el-form-item label="注册地址" prop="registration_address">
          <el-input v-model="form.registration_address" placeholder="请填写营业执照上地址" />
        </el-form-item>
        <el-form-item label="开户银行" prop="deposit_bank">
          <el-input v-model="form.deposit_bank" placeholder="请填写开户支行名称" />
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_account">
          <el-input v-model="form.bank_account" placeholder="请填写银行卡号" />
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="submitForm('form')">下一步</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { checkTaxId } from "@/utils/common.js";
import { invoiceList } from "@/api/list";
export default {
  name: "TicketInfo",
  data() {
    var validateRise = (rule, value, callback) => {
      if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,50}$/.test(value)) {
        callback(new Error("发票抬头2-50"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{15,20}$/.test(value)) {
        callback(new Error("数字+字母15-20"));
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
      showFlag: true,
      companyList: [],
      invoiceFilter: [],
      typeDisabled: false,
      openWays: [
        { value: 2, label: "企业" },
        { value: 1, label: "个人" }
      ],
      ticketTypes: [
        { value: 2, label: "增值税专用发票" },
        { value: 1, label: "增值税普通发票" }
      ],
      form: {
        user_type: 2,
        type: 2,
        invoice_type: 2,
        company_name: "",
        taxpayer_id: "",
        registration_phone: "",
        registration_address: "",
        deposit_bank: "",
        bank_account: ""
      },
      rules: {
        type: [
          { required: true, message: "开票方式不能为空", trigger: "change" }
        ],
        invoice_type: [
          { required: true, message: "发票类型不能为空", trigger: "change" }
        ],
        company_name: [
          { required: true, message: "发票抬头不能为空", trigger: "change" },
           { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'change' }
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
  created() {
    this.serviceInvoiceFun();
  },
  methods: {
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
    radioChange(val) {
      if (val === 1) {
        this.form.invoice_type = 1;
        this.typeDisabled = true;
      } else {
        this.typeDisabled = false;
      }
      this.form.taxpayer_id = "";
      this.invoiceFilter = this.invoiceFilterFun();
    },
    typeChange(val) {
      this.form.taxpayer_id = "";
      this.invoiceFilter = this.invoiceFilterFun();
    },
    submitForm(formName) {
      // 修改 订单
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("emitTicketInfo", this.form);
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$emit("emitCloseDialog");
    },
    serviceInvoiceFun() {
      //   const { type = 1, invoice_type = 1 } = this.form
      //   const param = {
      //     type, //	是	int	开票方式：1 个人，2 企业
      //     types: invoice_type//	否	int	发票类型：1 普通发票，2 增值发票
      //   }
      invoiceList(1)
        .then(res => {
          const {
            code,
            message,
            data: { data = [] }
          } = res.data;
          if (code === 200) {
            this.companyList = data;
            this.invoiceFilter = this.invoiceFilterFun();
          } else {
            this.companyList = [];
            this.invoiceFilter = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    invoiceFilterFun() {
      const { type = 1, invoice_type = 1 } = this.form;
      let data = this.companyList.filter(
        item => item.type === type && item.types === invoice_type
      ); //type 企业类型
      this.form.company_name = data.length ? data[0].name : "";
      return data;
    }
  }
};
</script>

<style lang="scss">
.blue {
  color: #06c;
}
.ticket_form {
  width: 420px;
  margin: 0 auto;
  .el-select {
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  & > .el-button {
    padding: 11px 45px !important;
    background: #f3262d;
    border-radius: 2px;
    color: #fff;
    padding: 0;
    border: 1px solid #f3262d;
    cursor: pointer;
  }
}
</style>
