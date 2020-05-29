<template>
  <div class="invoiceTitle">
    <comHeader />
    <div class="invoiceCom">
      <LTnav />
      <div class="invoiceCom_right">
        <div class="invoiceCom_head">
          <span>发票抬头管理</span>
          <span @click="Invoice()">新增发票抬头</span>
        </div>
        <div class="invoiceCom_com">
          <div class="comHead">
            <span>发票抬头</span>
            <span>开票方式</span>
            <span>发票类型</span>
            <span>操作</span>
          </div>
          <div class="comText" v-if="invoiceList != undefined && invoiceList.length >0">
            <ul>
              <li v-for="(item , index) in invoiceList" :key="index">
                <span>{{item.name}}</span>
                <span v-if="item.type==1 ">个人</span>
                <span v-else>企业</span>
                <span v-if="item.types==1 ">增值税普通发票</span>
                <span v-else>增值税专用发票</span>
                <span>
                  <p @click="amendInvoClick(item , index)">修改</p>
                  <p @click="invoiceDelete(item , index)">删除</p>
                </span>
              </li>
            </ul>
          </div>
          <div class="none" v-else>
            <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
            <p>暂无数据</p>
          </div>
        </div>
        <!-- 申请发票 -->
        <el-dialog
          v-if="ticketFlag"
          class="InvoiceApplication_box"
          title="填写发票信息"
          :visible.sync="InvoiceApplication"
        >
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="开票方式">
              <el-radio-group v-model="form.radio" @change="radioChange" v-if="addFlag=='1'">
                <el-radio v-model="form.radio" label="2">企业</el-radio>
                <el-radio v-model="form.radio" label="1">个人</el-radio>
              </el-radio-group>
              <el-radio-group v-model="form.radio" @change="radioChange" v-if="addFlag =='2'">
                <el-radio v-model="form.radio" :label="2">企业</el-radio>
                <el-radio v-model="form.radio" :label="1">个人</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="发票类型" prop="regionI">
              <el-select
                v-model="form.regionI"
                placeholder="请选择发票类型"
                @change="regionChange"
                v-if="form.radio==2"
              >
                <el-option label="增值税专用发票" value="2" v-if="addFlag=='1'"></el-option>
                <el-option label="增值税普通发票" value="1" v-if="addFlag=='1'"></el-option>
                <el-option label="增值税专用发票" :value="2" v-if="addFlag =='2'"></el-option>
                <el-option label="增值税普通发票" :value="1" v-if="addFlag =='2'"></el-option>
              </el-select>
              <el-select
                v-model="form.regionI"
                placeholder="请选择发票类型"
                disabled
                @change="regionChange"
                v-else
              >
                <el-option label="增值税普通发票" :value="1" v-if="chaFlag =='1'">增值税普通发票</el-option>
                <el-option label="增值税普通发票" value="1" v-if="chaFlag =='2'">增值税普通发票</el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发票抬头" prop="invoiceHeader">
              <el-input v-model="form.invoiceHeader" :placeholder="placeholder"></el-input>
            </el-form-item>
            <div class="radio" v-if="show">
              <el-form-item type="number" label="纳税人识别号" prop="invoiceNumber">
                <el-input v-model="form.invoiceNumber" placeholder="请填写税务登记证上的纳税人识别号"></el-input>
              </el-form-item>
              <div class="number_1" v-if="flag">
                <el-form-item type="number" label="注册电话" prop="invoicePhone">
                  <el-input v-model="form.invoicePhone" placeholder="请填写注册电话"></el-input>
                </el-form-item>
                <el-form-item type="text" label="注册地址" prop="invoiceAddress">
                  <el-input v-model="form.invoiceAddress" placeholder="请填写注册地址"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" prop="invoiceBank">
                  <el-input v-model="form.invoiceBank" placeholder="开户银行"></el-input>
                </el-form-item>
                <el-form-item type="number" label="银行卡号" prop="invoiceBankNum">
                  <el-input v-model="form.invoiceBankNum" placeholder="请填写银行卡号"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer invoicNext">
            <el-button type="primary" @click="InvoiceAppli('form')">保存</el-button>
          </div>
        </el-dialog>
        <div class="block" id="block" v-if="flagB">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            background
            :page-size="pageSize"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="total"
          ></el-pagination>
          <div class="custom">
            <span>
              共{{num}}页 , 到
              <el-input v-model="input1"></el-input>页
              <a href="javascript:;" @click="pageSizeClick">确定</a>
            </span>
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
  invoiceList,
  invoiceAdd,
  invoiceModify,
  invoiceDelete
} from "@/api/list";

export default {
  components: { LTnav, comHeader, comFooter, sideBar },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("号码格式不正确或者位数不正确"));
      } else {
        const reg = /^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("号码格式不正确或者位数不正确"));
        }
      }
    };
    var validateNumber = (rule, value, callback) => {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{15,20}$/.test(value)) {
        callback(new Error("数字+字母15-20"));
      } else {
        callback();
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
    return {
      invoiceList: [],
      flagB: false,
      addFlag: "",
      pageSize: 10,
      page: 1,
      total: 0, //总条目数
      input1: 1,
      InvoiceApplication: false,
      flag: true,
      show: true,
      showG: true,
      ticketFlag: true,
      flagT: false,
      ddd: false,
      payNum: 1,
      placeholder: "请输入公司名称",
      // 搜索
      formInline: {
        user: "",
        region: "",
        time: ""
      },
      // 发票
      prosDatas: {
        value: "id",
        label: "name",
        children: "child"
      },
      form: {
        radio: "2",
        regionI: "",
        invoiceHeader: "",
        invoiceNumber: "",
        invoicePhone: "",
        invoiceAddress: "",
        invoiceBank: "",
        invoiceBankNum: ""
      },
      ruleForm: {
        sPhone: "",
        selectArea: [],
        city: "",
        district: "",
        address: "",
        invoicePhonef: "",
        invoicecall: ""
      },
      rules: {
        invoiceBank: [
          {
            required: true,
            min: 6,
            max: 50,
            message: "开户银行最少6个字",
            trigger: "change"
          }
        ],
        invoiceHeader: [
          { required: true, message: "发票抬头为2-50个字", trigger: "change" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "change"
          }
        ],
        regionI: [
          { required: true, message: "请选择发票类型", trigger: "change" }
        ],
        invoiceNumber: [
          {
            required: true,
            min: 15,
            max: 20,
            message: "数字+字母15-20",
            trigger: ["blue", "change"]
          },
          { validator: validateNumber, trigger: "change" }
        ],
        invoicePhone: [
          { required: true, validator: checkPhone, trigger: "change" }
        ],
        invoiceAddress: [
          { required: true, message: "请填写注册地址", trigger: "change" }
        ],
        invoiceBankNum: [
          { required: true, validator: checkbank, trigger: "change" },
          {
            min: 12,
            max: 21,
            message: "长度在 12 到 21 个字符",
            trigger: "change"
          }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        district: [
          { required: true, message: "请选择地区", trigger: "change" }
        ],
        invoicecall: [
          { required: true, message: "发票抬头为2-10个字", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        invoicePhonef: [
          { required: true, validator: checkPhone, trigger: "change" }
        ],
        address: [
          { required: true, message: "请填详细地址", trigger: "change" }
        ]
      },
      status: "1",
      id: "",
      itemData: "",
      typeGQ: "",
      chaFlag: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      var page = this.page;
      var number = "";
      invoiceList(page, number)
        .then(res => {
          if (res.data.code == 200) {
            this.invoiceList = res.data.data.data;
            this.pageSize = res.data.data.per_page;
            this.total = res.data.data.total;
            this.page = res.data.data.current_page;
            this.num = Math.ceil(this.total / this.pageSize);
            if (this.total < 11) {
              this.flagB = false;
            } else {
              this.flagB = true;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页器
    pageSizeClick() {
      this.page = this.input1;
      this.init();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.input1 = this.page;
      this.init();
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 0;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    // 新增发票抬头
    Invoice() {
      this.addFlag = "1";
      this.ticketFlag = true;
      this.typeGQ = 1;
      this.show = true;
      this.showG = true;
      this.ddd = false;
      this.flag = true;
      this.placeholder = "请输入公司名称";
      this.form.radio = "2";
      this.form.regionI = "2";
      this.status = "1";
      this.InvoiceApplication = true;
    },
    amendInvoClick(item, index) {
      // 修改发票
      this.form.regionI = "";
      this.addFlag = "2";
      this.ticketFlag = true;
      this.typeGQ = 2;
      this.id = item.id;
      this.itemData = item;
      this.status = "2";
      this.form.radio = item.type;
      this.form.regionI = item.types;
      if (item.type == 1) {
        this.ddd = true;
        this.show = false;
        this.showG = false;
        this.form.regionI = "";
        this.placeholder = "请填写名字";
        this.form.regionI = item.types;
        this.form.invoiceHeader = item.name;
        this.chaFlag = 1;
      } else if (item.type == 2) {
        this.placeholder = "请输入公司名称";
        this.show = true;
        this.showG = true;
        this.ddd = false;
        if (item.types == 1) {
          this.flag = false;
          this.form.radio = item.type;
          this.form.regionI = item.types;
          this.form.invoiceHeader = item.name;
          this.form.invoiceNumber = item.number;
        } else {
          this.flag = true;
          this.form.radio = item.type;
          this.form.regionI = item.types;
          this.form.invoiceHeader = item.name;
          this.form.invoiceNumber = item.number;
          this.form.invoicePhone = item.mobile;
          this.form.invoiceAddress = item.address;
          this.form.invoiceBank = item.bank;
          this.form.invoiceBankNum = item.banknumber;
        }
      }
      this.InvoiceApplication = true;
    },
    // 发票删除
    invoiceDelete(item, index) {
      var id = item.id;
      invoiceDelete(id)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("删除成功");
            this.init();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 发票类型
    regionChange() {
      if (this.form.regionI == 2) {
        this.flag = true;
        this.form.invoiceHeader = this.itemData.name;
        this.form.invoiceNumber = this.itemData.number;
        this.form.invoicePhone = this.itemData.mobile;
        this.form.invoiceAddress = this.itemData.address;
        this.form.invoiceBank = this.itemData.bank;
        this.form.invoiceBankNum = this.itemData.banknumber;
      } else {
        this.flag = false;
      }
    },
    // 开票方式
    radioChange() {
      if (this.form.radio == 2) {
        this.show = true;
        this.showG = true;
        this.placeholder = "请输入公司名称";
        if (this.typeGQ == 2) {
          this.form.regionI = this.itemData.types;
        } else {
          this.form.regionI = "2";
        }

        if (this.form.regionI == 2) {
          this.flag = true;
          if (this.typeGQ == 2) {
            this.form.invoiceHeader = this.itemData.name;
            this.form.invoiceNumber = this.itemData.number;
            this.form.invoicePhone = this.itemData.mobile;
            this.form.invoiceAddress = this.itemData.address;
            this.form.invoiceBank = this.itemData.bank;
            this.form.invoiceBankNum = this.itemData.banknumber;
          } else {
          }
        } else {
          this.flag = false;
          if (this.form.typeGQ == 2) {
            this.form.invoiceHeader = this.itemData.name;
            this.form.invoiceNumber = this.itemData.number;
          } else {
          }
        }
      } else {
        this.show = false;
        this.showG = false;
        this.chaFlag = 2;
      }
      if (this.form.radio == 1) {
        this.chaFlag = 2;
        this.ddd = true;
        this.form.regionI = "1";
        this.placeholder = "请填写名字";
        if (this.form.typeGQ == 2) {
          this.form.invoiceHeader = this.itemData.name;
        } else {
        }
      } else {
        this.ddd = false;
      }
    },
    InvoiceAppli(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.radio == 1) {
            this.form.invoiceNumber = "";
            this.form.invoicePhone = "";
            this.form.invoiceAddress = "";
            this.form.invoiceBank = "";
            this.form.invoiceBankNum = "";
          } else {
            if (this.form.regionI == 1) {
              this.form.invoicePhone = "";
              this.form.invoiceAddress = "";
              this.form.invoiceBank = "";
              this.form.invoiceBankNum = "";
            }
          }
          var data = {
            type: this.form.radio,
            types: this.form.regionI,
            name: this.form.invoiceHeader,
            number: this.form.invoiceNumber,
            mobile: this.form.invoicePhone,
            address: this.form.invoiceAddress,
            bank: this.form.invoiceBank,
            banknumber: this.form.invoiceBankNum
          };
          if (this.status == "1") {
            invoiceAdd(data)
              .then(res => {
                if (res.data.code == 200) {
                  this.ticketFlag = false;
                  this.InvoiceApplication = false;

                  this.init();
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else if (this.status == "2") {
            var id = this.id;
            invoiceModify(id, data)
              .then(res => {
                if (res.data.code == 200) {
                  this.ticketFlag = false;
                  this.InvoiceApplication = false;
                  this.init();
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    InvoiceApplication(val, oldVal) {
      if (val == false) {
        this.form.invoiceHeader = "";
        this.form.invoiceNumber = "";
        this.form.invoicePhone = "";
        this.form.invoiceAddress = "";
        this.form.invoiceBank = "";
        this.form.invoiceBankNum = "";
        this.flag = false;
        this.show = false;
        this.showG = false;
        this.ticketFlag = false;
        this.flagT = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "./invoiceTitleScode";
</style>
<style lang="less">
@import "../index.less";
</style>
<style lang="less">
.InvoiceApplication_box {
  .el-dialog {
    width: 560px;
    // min-height: 458px;
    .el-dialog__header {
      & > .el-dialog__headerbtn {
        font-size: 21px;
        top: 13px;
      }
    }
    .el-dialog__body {
      padding: 20px 63px !important;

      .el-form {
        .el-form-item__label {
          width: 104px;
        }

        .el-form-item:nth-child(2) {
          .el-form-item__content {
            .el-input {
              .el-input__inner {
                // float: right;
                margin-right: -4px;
              }
            }
          }
        }

        .el-form-item {
          // margin-bottom: 16px;

          .el-input {
            width: 100%;
            float: left;
          }

          .el-input__inner {
            width: 330px;
            height: 36px;
            border-radius: 0;
          }
        }

        .el-form-item__content {
          display: flex;
          flex-wrap: wrap;
        }

        & > .el-form-item:first-child {
          .el-form-item__content {
            display: flex;
            flex-wrap: wrap;

            .el-select {
              width: 106px;
              height: 36px;
              float: left;
              margin-right: 6px;
              margin-bottom: 10px;

              .el-input__inner {
                width: 106px;
                height: 36px;
              }

              .el-input__suffix {
                right: -29px;
              }
            }

            .addressX {
              width: 116%;
            }
          }
        }
      }
    }

    .el-dialog__footer {
      padding: 0 20px 40px;
      .invoicsub {
        margin-bottom: 40px;

        .el-button {
          padding: 12px 56px;
        }
      }
    }
  }
}

.InvoiceApplication_box,
.invoiceaddress {
  .el-dialog__footer {
    text-align: center;

    .el-button {
      padding: 12px 48px;
    }

    .el-button--primary {
      color: #fff;
      background: #f3262d;
      border: 0;
    }
  }
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
  color: #f3262d;
}
</style>
