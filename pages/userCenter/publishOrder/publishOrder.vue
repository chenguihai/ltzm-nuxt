<!-- 上刊画面订单 -->
<template>
  <div class="publishOrder body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right" v-if="journalFlag == '1'">
        <div class="mayOrder">
          <span class="my_order">上刊画面订单</span>
          <div class="myDeposit_bot">
            <el-form :inline="true" :model="formInline" class="demo-form-inline time_bot">
              <el-form-item label="下单时间">
                <el-date-picker
                  v-model="formInline.time"
                  type="daterange"
                  popper-class="timeAll"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="timeData"
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
                <el-input v-model="formInline.keyword" placeholder="请输入订单号"></el-input>
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" @click="onSubmit" :loading="isLoading">确定</el-button>
              </el-form-item>
            </el-form>
            <table cellspacing cellpadding class="table" v-if="orderList!= null">
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
                <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
                <p>暂无数据</p>
              </tbody>
              <tbody v-else class="tbody" v-for="(item ,index) in orderList" :key="index">
                <tr class="tr_top">
                  <td>
                    <span>{{ item.created_at}}</span>
                    <span>
                      订单号：
                      <p>{{item.order_sn}}</p>
                    </span>
                    <span class="s_name">
                      <span v-if="item.store_customer!=null">
                        <nuxt-link
                          class="shopN"
                          :to="'/shop/'+item.store_id"
                          target="_blank"
                        >{{item.shop.store_name}}</nuxt-link>
                        <a
                          class="callMy"
                          :href="`tencent://message/?uin=${item.store_customer&&item.store_customer.kf_account}&Site=none&Menu=yes`"
                          target="_blank"
                        >
                          <span
                            class="iconfont icon-lianxiwo services"
                            v-if="item.store_customer!=null"
                          ></span>
                        </a>
                      </span>
                      <span v-else>
                        <nuxt-link
                          class="shopC"
                          :to="'/shop/'+item.store_id"
                          target="_blank"
                        >{{item.shop.store_name}}</nuxt-link>
                        <span title="该店铺尚未设置客服" class="iconfont icon-lianxiwo"></span>
                      </span>
                    </span>
                  </td>
                  <td>
                    <a :href="item.publish.deleted_at == null && item.publish.on_sale != 0 ? `/post/${item.publish_id}` : `/closeData/closeData`" target="_blank">
                      <li>
                        <img
                          v-if="item.publish != null && item.publish != ''"
                          :src="envVars.IMG_HOST+item.publish.image_l+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                          alt
                        />
                        <img v-else src="../../../assets/img/userDataImg.png" alt />
                      </li>
                      <li>{{item.goods_name}}</li>
                    </a>
                    <span>￥{{item.amount}}</span>
                    <span>{{item.number}}</span>
                    <span>￥{{item.amount}}</span>
                    <span v-if="item.status=='0'">
                      <p style="color:#FF6C00;">待付款</p>
                      <p @click.stop="journalClick(item )">查看详情</p>
                    </span>
                    <span v-else-if="item.status=='1'">
                      <p>已完成</p>
                      <p @click.stop="journalClick(item )">查看详情</p>
                    </span>

                    <span v-else-if="item.status=='2'">
                      <p style="color:#FF6C00;">已关闭</p>
                      <p @click.stop="journalClick(item )">查看详情</p>
                    </span>
                    <span v-if="item.status=='0'">
                      <p>
                        <el-button type="text" @click="moneyClick(item)">付款</el-button>
                      </p>
                      <p class="user_select" @click="canOrder(item)">取消订单</p>
                    </span>
                    <span v-if="item.status=='2'"></span>
                    <span v-else-if="item.status=='1'">
                      <span
                        v-if="item.flag== false"
                        class="check"
                        @click="DownLoadImg(envVars.IMG_HOST +item.publish.source_file)"
                      >下载文件</span>
                      <span
                        v-else
                        class="check"
                        @click="download(item.publish.source_file,item.goods_name)"
                      >下载文件</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      <div class="user_cen_right journalData" v-else-if="journalFlag == '2'">
        <div class="journal">
          <div class="journal_head">
            <span>订单详情</span>
            <div>
              <div class="journal_left">
                <span>订单号：{{journalDa.order_sn}}</span>
                <span>下单时间：{{journalDa.created_at}}</span>
                <span class="pay_service_L" v-if="journalDa.status == '2'">已关闭</span>
                <span class="pay_service_Y" v-else-if="journalDa.status == '1'">已完成</span>
                <span class="pay_service_N" v-else-if="journalDa.status == '0'">等待付款</span>
                <span class="payment" @click="paymentClick()" v-if="journalDa.status == '0'">付款</span>
                <span class="cancelOrder" v-if="journalDa.status == '0'" @click="dataOrder()">取消订单</span>
              </div>
              <div class="journal_right">
                <div class="img_L" v-if="journalDa.status == '2'">
                  <div>
                    <img src="../../../assets/img/order/guanbi1.png" alt />
                    <span>提交订单</span>
                  </div>
                  <span>—————————</span>
                  <div>
                    <img src="../../../assets/img/order/guanbi2.png" alt />
                    <span>取消处理</span>
                  </div>
                  <span>—————————</span>
                  <div>
                    <img src="../../../assets/img/order/guanbi3.png" alt />
                    <span>完成</span>
                  </div>
                </div>
                <div class="img_L img_Y" v-if="journalDa.status == '1'">
                  <div>
                    <img src="../../../assets/img/order/wancheng1.png" alt />
                    <span>提交订单</span>
                    <span class="timeS">{{journalDa.created_at}}</span>
                  </div>
                  <span>—————————</span>
                  <div>
                    <img class="wancheng" src="../../../assets/img/order/wancheng2.png" alt />
                    <span>付款成功</span>
                    <span class="timeS">{{journalDa.pay_time}}</span>
                  </div>
                  <span>—————————</span>
                  <div>
                    <img src="../../../assets/img/order/wancheng3.png" alt />
                    <span>完成</span>
                    <span class="timeS">{{journalDa.pay_time}}</span>
                  </div>
                </div>
                <div class="img_L img_Y img_N" v-if="journalDa.status == '0'">
                  <div>
                    <img src="../../../assets/img/order/wancheng1.png" alt />
                    <span>提交订单</span>
                    <span class="timeS">{{journalDa.created_at}}</span>
                  </div>

                  <span>
                    —————————
                    <p>等待付款</p>
                  </span>
                  <div>
                    <img class="wancheng" src="../../../assets/img/order/wancheng4.png" alt />
                    <span>付款成功</span>
                    <span class="timeS"></span>
                  </div>
                  <span>—————————</span>
                  <div>
                    <img src="../../../assets/img/order/wancheng5.png" alt />
                    <span>完成</span>
                    <span class="timeS"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="journal_Data" v-if="journalDa.status == '1'">
            <span>付款信息</span>
            <div>
              <span v-if="journalDa.pay_id ==1">付款方式：&#8194;支付宝</span>
              <span v-else-if="journalDa.pay_id ==2">付款方式：&#8194;微信</span>
              <span v-else-if="journalDa.pay_id ==3">付款方式：&#8194;线下银行转账</span>
              <span v-else>付款方式：&#8194;余额</span>
              <span>支付金额：&#8194;¥{{journalDa.amount}}</span>
              <span>支付时间：&#8194;{{journalDa.pay_time}}</span>
              <span
                v-if="journalDa.out_trade_no!='' && journalDa.out_trade_no!=null"
              >支付流水号：&#8194;{{journalDa.out_trade_no}}</span>
            </div>
          </div>
          <div class="journal_list">
            <span>{{sName}}</span>
            <div class="tHead">
              <span>名称</span>
              <span>单价</span>
              <span>数量</span>
              <span>总价</span>
            </div>
            <div class="tBody">
              <div>
                <img
                  v-if="journalDa.publish != null && journalDa.publish != ''"
                  :src="envVars.IMG_HOST+journalDa.publish.image_l+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                  alt
                />
                <img v-else src="../../../assets/img/userDataImg.png" alt />
                <span>{{journalDa.goods_name}}</span>
              </div>
              <div>
                <span>￥{{journalDa.amount}}</span>
              </div>
              <div>
                <span>{{journalDa.number}}</span>
              </div>
              <div>
                <span>￥{{journalDa.amount}}</span>
              </div>
            </div>
          </div>
          <div class="journal_price">
            <span>
              <i>商品总金额：</i>
              <p>￥{{journalDa.amount}}</p>
            </span>
            <span>
              <i>应付总额：</i>
              <p>￥{{journalDa.amount}}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="canOrder" v-if="canOrderFlag">
      <div class="canOrder_con">
        <div class="canOrderheader">
          <span>取消订单</span>
          <span class="iconfont icon-guanbi" @click="closeOrder"></span>
        </div>
        <div class="canOrderCom">
          <el-form
            :inline="true"
            :model="formdata"
            :rules="rules"
            ref="formdata"
            class="demo-form-inline canOrder_bot"
          >
            <el-form-item label="取消原因 :" prop="reason" class="type_bot">
              <el-select v-model="formdata.reason" placeholder="全部">
                <el-option
                  v-for="itenS  in typeList"
                  :key="itenS.id"
                  :label="itenS.reason"
                  :value="itenS.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="user_bot">
              <el-input
                v-if="formdata.reason == 31"
                v-model="formdata.order"
                placeholder="请输入其他原因"
                @focus="orderFocus"
              ></el-input>
              <span v-if="orderFlag">
                <img src="../../../assets/img/icon-error.png" alt /> 请输入其他原因
              </span>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('formdata')">确定</el-button>
              <el-button type="primary" @click="closeOrder">取消</el-button>
            </el-form-item>
          </el-form>
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
  journalOrders,
  journalData,
  refundReason,
  journalClose
} from "@/api/list";
import { mapState } from "vuex";
import { downloadMixin } from "~/utils/common-mixins";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  mixins: [downloadMixin()],
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      statusList: [
        { id: "0", type_name: "待付款" },
        { id: "1", type_name: "已完成" },
        { id: "2", type_name: "已关闭" }
      ],
      pageSize: 0, //每页显示条数
      page: 1,
      total: 0, //总条目数
      // 搜索
      formInline: {
        keyword: "",
        type: "",
        time: ""
      },
      flagB: false,
      orderList: null,
      journalFlag: "",
      journalDa: "",
      formdata: {
        order: "",
        reason: ""
      },
      typeList: [],
      canOrderFlag: false,
      orderFlag: false,
      order_sn: "",
      rules: {
        reason: [
          {
            required: true,
            message: "请选择取消原因",
            trigger: ["blur", "change"]
          }
        ]
      },
      atime: "",
      sName: "",
      imgUrl: [],
      isLoading: false
    };
  },
  mounted() {
    if (this.$route.query.type == 1) {
      this.journalFlag = "2";
      var order_sn = this.$route.query.order_sn;
      journalData(order_sn)
        .then(res => {
          if (res.data.code == 200) {
            this.journalDa = res.data.data;
            this.sName = this.journalDa.shop.store_name;
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.initOrder();
      this.journalFlag = "1";
    }
  },
  methods: {
    //获取订单列表
    initOrder() {
      if (this.isLoading) {
        return;
      }
      let created = "";
      const { keyword = "", type = "" } = this.formInline;
      if (this.atime != "") {
        var atime = JSON.parse(JSON.stringify(this.atime));
        created = `${atime[0]} 00:00:00,${atime[1]} 23:59:59`;
      }
      this.isLoading = true;
      journalOrders(type, this.page, keyword, created)
        .then(res => {
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

            for (var i = 0; i < this.orderList.length; i++) {
              var img = this.orderList[i].publish.source_file;
              this.imgUrl = img.split(".");
              for (var j = 0; j < this.imgUrl.length; j++) {
                if (this.imgUrl[j] == "mp4") {
                  this.orderList[i] = { ...this.orderList[i], flag: true };
                } else {
                  this.orderList[i] = { ...this.orderList[i], flag: false };
                }
              }
            }
            this.flagB = !(this.total < 11);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
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
        this.formInline.keyword = "";
        this.formInline.type = "";
      }
      this.page = 1;
      this.initOrder();
    },
    orderFocus() {
      this.orderFlag = false;
    },
    closeOrder() {
      this.canOrderFlag = false;
      this.formdata.reason = "";
      this.formdata.order = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var reason = "";
          if (this.formdata.reason == 31) {
            if (this.formdata.order == "") {
              this.orderFlag = true;
            } else {
              reason = this.formdata.order;
            }
          } else if (this.formdata.reason == 32) {
            for (var i = 0; i < this.typeList.length; i++) {
              if (this.typeList[i].id != 32) {
                if (i < this.typeList.length - 2) {
                  reason += ` ${this.typeList[i].reason},`;
                } else {
                  reason += ` ${this.typeList[i].reason}`;
                }
              }
            }
          } else {
            for (var i = 0; i < this.typeList.length; i++) {
              if (this.typeList[i].id == this.formdata.reason) {
                reason = this.typeList[i].reason;
              }
            }
          }

          var order_sn = this.order_sn;
          journalClose(order_sn, reason)
            .then(res => {
              if (res.data.code == 200) {
                this.canOrderFlag = false;
                this.journalFlag = "1";
                this.formdata.reason = "";
                this.formdata.order = "";
                this.initOrder();
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

    moneyClick(item) {
      var order_sn = item.order_sn;
      this.$router.push({
        path: "/payment",
        query: { order_sn: order_sn, type: 7 }
      });
    },
    paymentClick() {
      this.$router.push({
        path: "/payment",
        query: { order_sn: this.journalDa.order_sn, type: 7 }
      });
    },
    // 取消订单
    canOrder(item) {
      this.order_sn = item.order_sn;
      var type = "4";
      refundReason(type)
        .then(res => {
          if (res.data.code == 200) {
            this.canOrderFlag = true;
            this.typeList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dataOrder() {
      this.order_sn = this.journalDa.order_sn;
      var type = "4";
      refundReason(type)
        .then(res => {
          if (res.data.code == 200) {
            this.canOrderFlag = true;
            this.typeList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    journalClick(item) {
      var { href } = this.$router.resolve({
        path: "/userCenter/publishOrder/publishOrder",
        query: {
          type: 1,
          order_sn: item.order_sn
        }
      });
      window.open(href, "_blank");
    },
    DownLoadImg(url) {
      window.open(url, "top");
    }
  }
};
</script>
<style lang="less" scoped>
@import "publishOrderScode.less";
</style>

<style lang="less">
@import "../index.less";
@import "publishOrder.less";
</style>







