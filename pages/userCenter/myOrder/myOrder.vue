<!-- 我的订单 -->
<template>
  <div class="orderPage body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="mayOrder">
          <span class="my_order">服务订单</span>
          <div class="myDeposit_bot">
            <el-form :inline="true" :model="formInline" class="demo-form-inline time_bot">
              <el-form-item label="下单时间">
                <el-date-picker
                  v-model="formInline.time"
                  @change="timeData"
                  type="daterange"
                  popper-class="timeAll"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="状态" class="region_bot">
                <el-select v-model="formInline.type" placeholder="全部">
                  <el-option label="全部" value="10">全部</el-option>
                  <el-option
                    v-for="itenS  in statusList"
                    :key="itenS.id"
                    :label="itenS.type_name"
                    :value="itenS.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="user_bot">
                <el-input v-model="formInline.title" placeholder="请输入订单号"></el-input>
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" :loading="isLoading" @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-form>
            <table cellspacing cellpadding class="table" v-if="orderList!=null">
              <thead class="thead">
                <tr>
                  <th>订单信息</th>
                  <th>单价（元）</th>
                  <th>数量</th>
                  <th>订单总金额</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody class="none" v-if="orderList.length == 0">
                <tr>
                  <td>
                    <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
                    <p>暂无数据</p>
                  </td>
                </tr>
              </tbody>
              <tbody class="tbody" v-else v-for="(item ,index) in orderList" :key="index">
                <tr class="tr_top">
                  <td>
                    <span>{{ item.get_order_goods.created_at}}</span>
                    <span>
                      订单号：
                      <p>{{item.order_sn}}</p>
                    </span>
                    <span class="s_name">
                      <span
                        v-if="item.get_customer_services!=undefined && item.get_customer_services.length>0"
                      >
                        <nuxt-link
                          class="shopN"
                          :to="'/shop/'+item.store_id"
                          target="_blank"
                        >{{item.get_shop&&item.get_shop.store_name}}</nuxt-link>
                        <a
                          class="callMy"
                          :href="`tencent://message/?uin=${item.get_customer_services&&item.get_customer_services[0].kf_account}&Site=none&Menu=yes`"
                          target="_blank"
                        >
                          <span
                            class="iconfont icon-lianxiwo services"
                            v-if="item.get_customer_services!=undefined && item.get_customer_services.length>0"
                          ></span>
                        </a>
                      </span>
                      <span v-else>
                        <nuxt-link
                          class="shopC"
                          :to="'/shop/'+item.store_id"
                          target="_blank"
                        >{{item.get_shop&&item.get_shop.store_name}}</nuxt-link>
                        <span title="该店铺尚未设置客服" class="iconfont icon-lianxiwo"></span>
                      </span>
                    </span>
                  </td>
                  <td>
                    <div>
                      <a :href="`/service/${item.sid}?id=${item.store_id}`" target="_blank">
                        <ul>
                          <li>
                            <img
                              v-if="item.get_order_goods.img != null || item.get_order_goods.img != ''"
                              :src="envVars.IMG_HOST+item.get_order_goods.img+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                              alt
                            />
                            <img v-else src="../../../assets/img/userDataImg.png" alt />
                          </li>
                          <li>{{item.get_order_goods.name}}</li>
                          <li :title="item.get_order_goods.spec">{{item.get_order_goods.spec}}</li>
                        </ul>
                      </a>
                    </div>
                    <div>￥{{item.get_order_goods.price}}</div>
                    <div>{{item.number}}</div>
                    <div>￥{{item.amount}}</div>
                    <div>
                      <p v-if="item.order_status==1" :style="yellow">待托管</p>
                      <p v-else-if="item.order_status==2" :style="yellow">待接单</p>
                      <p v-else-if="item.order_status==3" :style="yellow">待签署</p>
                      <p v-else-if="item.order_status==4" :style="yellow">工作中</p>
                      <p v-else-if="item.order_status==5" :style="yellow">待验收</p>
                      <p v-else-if="item.order_status==6" :style="yellow">待评价</p>
                      <p v-else-if="item.order_status==7">已成交</p>
                      <p v-else-if="item.order_status==8">已冻结</p>
                      <p v-else-if="item.order_status==9" :style="yellow">未成交</p>
                      <a
                        :href="`/contract/contranct-index?order_sn=${item.get_order_goods.order_sn}&cert=1`"
                        target="_blank"
                      >查看详情</a>
                    </div>
                    <!--  1：待定-不显示状态 2：权限不足 3:未填充合同-发起合同 5：未有签名-签署合同 6：有签名-查看合同 7：订单不存在-->
                    <div class="btn_box">
                      <p v-if="item.sign===6" @click="checkClick(item)" class="save_btn">查看合同</p>
                      <p v-else-if="item.sign===5" @click="checkClick(item)" class="save_btn">签署合同</p>
                      <p v-else-if="item.sign===3" @click="checkClick(item)" class="save_btn">发起合同</p>

                      <p
                        v-if="item.order_status==1"
                        @click="moneyClick(item)"
                        class="save_btn tgMoney"
                      >托管赏金</p>
                      <div
                        v-else-if="(item.order_status==6 || item.order_status==7) && item.u_invoice_status == 0"
                        class="InvoiceApplication"
                        @click="Invoice(item)"
                      >申请发票</div>
                      <nuxt-link
                        class="save_btn tgMoney check_t"
                        target="_blank"
                        v-else-if="(item.order_status==8 || item.order_status==9) &&item.pay_status == 2"
                        to="/userCenter/myRefund/myRefund"
                      >查看退款</nuxt-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 申请发票-->
          <ticket-info
            v-if="showApplyInvoice"
            @emitCloseDialog="handleClose"
            @emitTicketInfo="ticketInfoHttp"
          ></ticket-info>
          <!--填写收票地址-->
          <ticket-address
            v-if="ticketAddrFlag"
            @emitCloseDialog="handleClose"
            @emitTicketAddress="ticketAddressHttp"
          />
          <!-- 分页器 -->
          <div class="block" id="block" v-if="flagB">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              background
              :page-size="pageSize"
              layout="total,prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            ></el-pagination>
            <div class="sbm">确定</div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import ticketInfo from "@/components/contract/ticketInfo";
import ticketAddress from "@/components/contract/ticketAddress";
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { messageCommon } from "@/utils/common.js";
import { userOrder } from "@/api/list";
import { applyInvoice } from "~/api/order";
import area from "@/assets/js/area";
import { mapState } from "vuex";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar,
    ticketInfo,
    ticketAddress
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    area.shift();
    return {
      statusList: [
        { id: 1, type_name: "待托管" },
        { id: 2, type_name: "待接单" },
        { id: 3, type_name: "待签署" },
        { id: 4, type_name: "工作中" },
        { id: 5, type_name: "待验收" },
        { id: 6, type_name: "待评价" },
        { id: 7, type_name: "已成交" },
        { id: 8, type_name: "已冻结" },
        { id: 9, type_name: "未成交" }
      ],
      pageSize: 0, //每页显示条数
      page: 1,
      total: 0, //总条目数
      // 搜索
      formInline: {
        title: "",
        type: "",
        time: ""
      },
      area: JSON.parse(JSON.stringify(area)),
      flagB: false,
      orderList: null,
      orderData: "",
      atime: "",
      isLoading: false,
      params: {},
      showApplyInvoice: false,
      ticketAddrFlag: false,
      yellow: {
        color: "#FF6C00"
      }
    };
  },
  created() {
    this.initOrder();
  },
  methods: {
    handleClose() {
      this.showApplyInvoice = false;
      this.ticketAddrFlag = false;
    },
    ticketInfoHttp(val) {
      // 填写发票信息
      this.params = val;
      this.handleClose();
      this.ticketAddrFlag = true;
    },
    ticketAddressHttp(val) {
      // 填写收票地址
      const [province, city, district] = val.addr;
      this.params = {
        ...this.params,
        ...val,
        province,
        city,
        district,
        order_sn: this.orderData.order_sn
      };
      delete this.params.addr;
      this.applyInvoiceFun();
    },
    applyInvoiceFun() {
      applyInvoice(this.params)
        .then(res => {
          const { code, data, message } = res.data;
          if (code === 200) {
            this.handleClose();
            messageCommon(this, "操作成功");
            this.initOrder();
          } else {
            messageCommon(this, message, "error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取订单列表
    initOrder() {
      if (this.isLoading) {
        return;
      }
      let created = "";
      const { title = "", type = "" } = this.formInline;
      if (this.atime != "") {
        var atime = JSON.parse(JSON.stringify(this.atime));
        created = `${atime[0]} 00:00:00,${atime[1]} 23:59:59`;
      }
      this.isLoading = true;
      userOrder(created, title, type, this.page).then(res => {
        if (res.data.code == 200) {
          const {
            data = [],
            per_page = 0,
            total = 0,
            current_page = 1
          } = res.data.data;
          this.orderList = data;
          this.pageSize = per_page;
          this.total = total;
          this.page = current_page;
          this.flagB = !(this.total < 11);
        }
        this.isLoading = false;
      });
    },
    timeData() {
      this.atime = this.formInline.time;
    },
    // 搜索
    onSubmit(formName) {
      if (this.formInline.time == null) {
        this.formInline.time = "";
        this.atime = "";
      }
      if (this.formInline.type == 10) {
        this.formInline.time = "";
        this.atime = "";
        this.formInline.title = "";
        this.formInline.type = "";
      }
      this.page = 1;
      this.initOrder();
    },
    moneyClick(item) {
      var order_sn = item.get_order_goods.order_sn;
      var { href } = this.$router.resolve({
        path: "/payment",
        query: { order_sn: order_sn, type: 5 }
      });
      window.open(href, "_blank");
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initOrder();
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 0;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    Invoice(item) {
      this.orderData = item;
      this.showApplyInvoice = true;
    },
    //跳转工作台
    checkClick(item) {
      var order_sn = item.get_order_goods.order_sn;
      var { href } = this.$router.resolve({
        path: "/contract/contranct-index",
        query: { order_sn: order_sn, cert: 1 }
      });
      window.open(href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
@import "myOrderScode.less";
.btn_box .save_btn {
  margin-right: 0;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
}
.save_btn {
  width: 80px !important;
  height: 30px !important;
  line-height: 30px !important;
}
.tgMoney {
  background: #fff;
  color: #f3262d !important;
  border: 1px solid #f3262d;
  width: 80px;
  height: 30px;
  line-height: 28px !important;
  font-size: 12px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background: #f3262d !important;
    color: #fff !important;
  }
}

.check_t {
  background: #f4f4f4;
  color: #666 !important;
  border: 1px solid #eee !important;
  line-height: 28px !important;
  &:hover {
    background: #fff !important;
  }
}

.InvoiceApplication {
  line-height: 16px !important;
  cursor: pointer;
  &:hover {
    color: #f3262d;
  }
}
</style>

<style lang="less">
@import "../index.less";
</style>

<style lang="less">
@import "myOrder.less";
</style>






