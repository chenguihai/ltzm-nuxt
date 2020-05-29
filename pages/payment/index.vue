<template>
  <div class="payment_buy">
    <comHeader />
    <navAll />
    <div class="payment_data">
      <div class="payment_top">
        <div class="payment_total">
          <div>订单提交成功，请尽快支付！</div>
          <div>
            应付金额：
            <span class="num_total">￥{{paymentTotal}}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>订单号</th>
              <th>订单金额</th>
              <th>订单明细</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orderList.length > 0" v-for="(item , index) in orderList" :key="index">
              <td>{{item.order_sn}}</td>
              <td>￥{{item.price}}</td>
              <td>{{item.content}}</td>
            </tr>
            <tr
              v-if="cluesOrderList.length > 0"
              v-for="(item , index) in cluesOrderList"
              :key="index"
            >
              <td>{{item.order_sn}}</td>
              <td>￥{{item.price}}</td>
              <td>{{item.name}}</td>
            </tr>
            <tr
              v-if="skillOrderList.length > 0"
              v-for="(item , index) in skillOrderList"
              :key="index"
            >
              <td>{{item.order_sn}}</td>
              <td>￥{{item.order_amount}}</td>
              <td>{{item.title}}</td>
            </tr>
            <tr
              v-if="serviceOrderList.length > 0"
              v-for="(item , index) in serviceOrderList"
              :key="index"
            >
              <td>{{item.order_sn}}</td>
              <td>￥{{item.amount}}</td>
              <td>{{item.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="payment_bot">
        <span>支付方式</span>
        <el-radio-group v-model="radio2" class="payment">
          <!-- 余额支付隐藏 -->
          <!-- <el-radio border :label="4" class="66666666666666">
                      <img src="../../assets/img/yue.png" alt />
                      <span class="pay">账户余额</span>
                      当前账户可用余额：
                      <span class="pay_color">￥{{userMoney}}</span>
          </el-radio>-->
          <el-radio border :label="1">
            <img src="../../assets/img/sr_zhifubao.png" alt class="imgL" /> 支付宝支付
          </el-radio>
          <el-radio border :label="2">
            <img src="../../assets/img/weixin-2.png" alt class="imgL" />微信支付
          </el-radio>
          <el-radio v-if="payBankShow" border :label="3" class="pay_bank">
            <span>
              <img src="../../assets/img/yinhangka.png" alt class="imgL" />企业或个人银行线下转账支付
            </span>
            <el-button class="pay_list" type="text" @click="dialogTableVi = true">查看线下转账支付银行</el-button>
          </el-radio>
        </el-radio-group>
      </div>
      <el-button class="subm" @click="modePayment">立即支付</el-button>
    </div>
    <el-dialog
      v-if="payNum ==2"
      title="微信支付"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      class="t_money t_zf"
    >
      <div>
        <span class="pay_wx">您正在使用微信支付，请扫以下二维码进行支付</span>
      </div>
      <div class="img_pay">
        <div class="wx_img" v-html="wxQrCode"></div>
      </div>
    </el-dialog>
    <el-dialog
      v-else-if="payNum == 3"
      title="线下银行支付"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      class="bank_money"
    >
      <div class="pay_b">
        <span class="pay_wx">
          您选择了线下转账支付，请牢记
          <p>转账识别码</p>并将此识别码填写在转账备注说明，打款完成之后联系客服提交转账凭证。
        </span>
      </div>
      <div class="img_pay">
        转账识别码：
        <p>{{orderSn}}</p>
      </div>
      <el-button @click.stop="offLineEvent">确定</el-button>
    </el-dialog>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogFormSuce"
      :close-on-click-modal="false"
      :before-close="handleClose"
      class="bank_money"
    >
      <div class="pay_sucess">
        <span class="pay_wx">您已支付，请勿重复支付</span>
      </div>
      <el-button @click.stop="handleClose">确定</el-button>
    </el-dialog>
    <el-dialog
      title="支持转账银行"
      :visible.sync="dialogTableVi"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="banList"
    >
      <div>
        <div class="ban_b">
          <div>
            <img src="../../assets/img/order/szns.png" alt="深圳农村商业银行上合支行" />
          </div>
          <div>
            <span>银行账号：000258691470</span>
            <span>开户名：深圳市凌天众媒科技有限公司</span>
            <span>开户行：深圳农村商业银行上合支行</span>
          </div>
        </div>
        <div class="ban_b">
          <div>
            <img src="../../assets/img/order/szzs.png" alt="深圳市万科云城支行" />
          </div>
          <div>
            <span>银行账号：755949468110806</span>
            <span>开户名：深圳市凌天众媒科技有限公司</span>
            <span>开户行：深圳市万科云城支行</span>
          </div>
        </div>
        <div class="ban_b">
          <div>
            <img src="../../assets/img/order/zggs.png" alt="深圳市西丽支行" />
          </div>
          <div>
            <span>银行账号：6232604000002873282</span>
            <span>开户名：深圳市凌天众媒科技有限公司</span>
            <span>开户行：深圳市西丽支行</span>
          </div>
        </div>
      </div>
      <span @click="handleClose">确定</span>
    </el-dialog>

    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "~/components/component/comHeader";
import comFooter from "~/components/component/comFooter";
import navAll from "~/components/component/navAll";
import sideBar from "@/components/sideBar";
import {
  journalPayOrders,
  journalPayment,
  journalStatus,
  orderInfo,
  skillOrderInfo,
  getServiceOrderList,
  getCaseBiogOrderList,
  accountMoney,
  cluesOrderDetail,
  payServiceClue,
  payshopclue,
  cluePayStatus,
  toolsPay,
  toolsOrderStatus,
  skillPayment,
  paymentService,
  paymentCasebiog,
  skillCheckStatus,
  serviceOrderStatus,
  casebiogOrderStatus
} from "@/api/list";
import dataEventTrack from "@/utils/dataEventTrack";
export default {
  components: {
    comHeader,
    comFooter,
    navAll,
    sideBar
  },
  data() {
    return {
      type: 1,
      getPayStatusNum: 0,
      paymentTotal: 0,
      payBankShow: true,
      htmls: "",
      radio2: 2,
      dialogFormVisible: false,
      dialogTableVi: false,
      dialogFormSuce: false,
      payNum: 0,
      userMoney: "",
      wxQrCode: "",
      orderSn: "",
      cluesOrderList: [],
      skillOrderList: [],
      serviceOrderList: [],
      orderList: [],
      banList: [],
      payLoading: false,
      orderM: [],
      orderno: [],
      orderListMD: "",
      totalAm: ""
    };
  },
  created() {
    this.init();
  },
  mounted() {
    console.log(this.$route);
  },
  beforeDestroy() {
    //清除定时器
    clearInterval(this.timer);
  },
  destroyed() {
    //清除定时器
    clearInterval(this.timer);
  },
  methods: {
    init() {
      let _this = this;
      this.orderSn = this.$route.query.order_sn;
      this.type = this.$route.query.type;
      //当前账户余额
      accountMoney()
        .then(res => {
          this.userMoney = res.data.data.money;
        })
        .catch(err => {
          console.log(err);
        });
      if (this.type == 2 || this.type == 1) {
        var data = {
          order_sn: this.orderSn
        };
        data.type = this.type;
        cluesOrderDetail(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.cluesOrderList = [res.data.data];
              _this.paymentTotal = res.data.data.price;
              this.orderListMD = [res.data.data];
              this.totalAm = res.data.data.totalAmount;
              this.orderListData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.type == 3) {
        var data = {
          order_sn: this.orderSn
        };
        // 订单详情
        orderInfo(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.orderList = res.data.data.list;
              _this.paymentTotal = res.data.data.amount;
              this.orderListMD = res.data.data.list;
              this.totalAm = res.data.data.totalAmount;
              this.orderListData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.type == 4) {
        let data = {
          order_sn: this.orderSn
        };
        skillOrderInfo(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.skillOrderList = [res.data.data];
              _this.paymentTotal = res.data.data.order_amount;
              this.orderListMD = [res.data.data];
              this.totalAm = res.data.data.totalAmount;
              this.orderListData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.type == 5) {
        let data = {
          order_sn: this.orderSn
        };
        getServiceOrderList(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.serviceOrderList = res.data.data.list;
              _this.paymentTotal = res.data.data.totalAmount;
              this.orderListMD = res.data.data.list;
              this.totalAm = res.data.data.totalAmount;
              this.orderListData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.type == 6 || this.type == 8) {
        let data = {
          order_sn: this.orderSn
        };
        getCaseBiogOrderList(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.serviceOrderList = res.data.data.list;
              _this.paymentTotal = res.data.data.totalAmount;
              this.orderListMD = res.data.data.list;
              this.totalAm = res.data.data.totalAmount;
              this.orderListData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.type == 7) {
        let data = {
          order_sn: this.orderSn
        };
        journalPayOrders(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.serviceOrderList = res.data.data.list;
              _this.paymentTotal = res.data.data.list[0].amount;
              this.orderListMD = res.data.data.list;
              this.totalAm = res.data.data.totalAmount;
              this.orderListData();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    orderListData() {
      this.orderListMD.filter(item => {
        this.orderno.push(item.order_sn);
        if (item.amount) {
          this.orderM.push(item.amount);
        } else {
          this.orderM = this.paymentTotal;
        }
      });
      this.orderno = JSON.stringify(this.orderno)
        .replace(/\[|]/g, "")
        .replace(/\"|"/g, "");

      this.orderM = JSON.stringify(this.orderM)
        .replace(/\[|]/g, "")
        .replace(/\"|"/g, "");

      this.dataEvent();
    },
    dataEvent() {
      console.log(this.totalAm);
      if (typeof this.totalAm == "number") {
        this.totalAm = this.totalAm.toFixed(2);
      }
      console.log(this.totalAm);
      dataEventTrack({
        referer: document.referrer,
        event_type: "page_show",
        kv: {
          router: this.$route.fullPath,
          orderno: this.orderno,
          order_type: this.$route.query.type,
          order_money: this.orderM,
          order_total_price: this.totalAm
        }
      });
    },
    getPaymentStatus() {
      let _this = this;
      _this.getPayStatusNum++;
      if (_this.getPayStatusNum >= 100) {
        clearInterval(_this.timer);
        _this.$message.error("支付失败,请重新点击确定按钮去支付");
        setTimeout(function() {
          window.location.reload();
        }, 500);
      }
      if (_this.type == 1 || _this.type == 2) {
        let data = {
          order_sn: _this.orderSn,
          type: _this.type
        };
        cluePayStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = "/clues/" + res.data.data.clue_id;
          }
        });
      } else if (_this.type == 3) {
        let data = {
          order_sn: _this.orderSn,
          type: _this.type
        };
        toolsOrderStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = `/store?storeIndex=index`;
          }
        });
      } else if (_this.type == 4) {
        let data = {
          order_sn: _this.orderSn
        };
        skillCheckStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = `/store?storeIndex=index`;
          }
        });
      } else if (_this.type == 5) {
        let data = {
          order_sn: _this.orderSn
        };
        serviceOrderStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = `/userCenter/myOrder/myOrder`;
          }
        });
      } else if (_this.type == 6) {
        let data = {
          order_sn: _this.orderSn
        };
        casebiogOrderStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = `/userCenter/caseOrder/caseOrder`;
          }
        });
      } else if (_this.type == 8) {
        let data = {
          order_sn: _this.orderSn
        };
        casebiogOrderStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = `/userCenter/biogOrder/biogOrder`;
          }
        });
      } else if (_this.type == 7) {
        let data = {
          order_sn: _this.orderSn
        };
        journalStatus(data).then(res => {
          if (res.data.code == 200) {
            clearInterval(_this.timer);
            window.location.href = `/post/${res.data.data.publish_id}?type=${this.$route.query.turn}`;
          }
        });
      }
    },
    payCallBack(res) {
      let _this = this;
      this.payLoading = false;
      console.log(res);
      if (res.data.code == 422) {
        _this.dialogFormSuce = true;
      } else {
        if (_this.payNum == 2) {
          if (res.status == 200) {
            _this.wxQrCode = res.data;
            _this.dialogFormVisible = true;
            _this.getPayStatusNum = 0;
            _this.timer = window.setInterval(() => {
              setTimeout(_this.getPaymentStatus(), 0);
            }, 3000);
          } else {
            this.$message.error(res.data.message);
          }
        } else if (_this.payNum == 1) {
          if (res.status == 200) {
            let routerData = this.$router.resolve({
              path: "/applyText"
            });
            window.localStorage.setItem("htmls", JSON.stringify(res.data));
            this.htmls = res.data;
            //打开新页面
            window.open(routerData.href, "_blank");
            _this.getPayStatusNum = 0;
            _this.timer = window.setInterval(() => {
              setTimeout(_this.getPaymentStatus(), 0);
            }, 3000);
          } else {
            this.$message.error(res.data.message);
          }
        } else if (_this.payNum == 3) {
          if (res.data.code == 200) {
            this.dialogFormVisible = true;
          } else {
            this.$message.error(res.data.message);
          }
        }
      }
    },
    offLineEvent() {
      this.dialogFormVisible = false;
    },
    modePayment() {
      if (this.payLoading) {
        return;
      }
      let _this = this;
      this.payNum = this.radio2;
      this.payLoading = true;
      if (this.type && this.type == 1) {
        let data = {
          order_sn: this.orderSn,
          pay_type: this.payNum
        };
        payshopclue(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 2) {
        let data = {
          order_sn: this.orderSn,
          pay_type: this.payNum
        };
        payServiceClue(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 3) {
        let data = {
          order_sn: this.orderSn,
          pay_id: this.payNum,
          token: localStorage.getItem("access_token")
        };
        toolsPay(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 4) {
        let data = {
          order_sn: this.orderSn,
          pay_id: this.payNum
        };
        skillPayment(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 5) {
        let data = {
          order_sn: this.orderSn,
          pay_id: this.payNum
        };
        paymentService(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 6) {
        let data = {
          order_sn: this.orderSn,
          pay_id: this.payNum
        };
        paymentCasebiog(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 8) {
        let data = {
          order_sn: this.orderSn,
          pay_id: this.payNum
        };
        paymentCasebiog(data).then(res => {
          _this.payCallBack(res);
        });
      } else if (this.type && this.type == 7) {
        let data = {
          order_sn: this.orderSn,
          pay_id: this.payNum
        };
        journalPayment(data).then(res => {
          _this.payCallBack(res);
        });
      }
      var paynum;
      if (this.payNum == 1) {
        paynum = "支付宝支付";
      } else if (this.payNum == 2) {
        paynum = " 微信支付";
      } else {
        paynum = " 线下银行卡转账";
      }
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: this.$route.fullPath,
          rname: "立即支付",
          order_type: this.$route.query.type,

          pay_type: paynum,
          order_no: this.orderno,
          order_money: this.orderM,
          order_total_price: this.paymentTotal
        }
      });
    },
    modePay() {},
    handleClose() {
      this.dialogFormVisible = false;
      this.dialogTableVi = false;
      this.dialogFormSuce = false;
      clearInterval(this.timer);
    }
  }
};
</script>
<style lang="less" scoped>
@import "paymentScode.less";
.pay_sucess{
        padding-top: 14px!important;
        text-align: center
}
</style>
<style lang="less">
@import "payment.less";
.bank_money {
  & > .el-dialog {
    top: 35% !important;
  }
}
</style>
