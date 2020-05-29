<!-- 我的退款 -->
<template>
  <div class="myRefundbox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="myRefund">
          <span class="my_order">我的退款</span>
          <div class="myDeposit_bot">
            <el-form :inline="true" :model="formInline" class="demo-form-inline time_bot">
              <el-form-item class="submit">
                <el-button type="primary" @click="onSubmit" :loading="isLoading">确定</el-button>
              </el-form-item>

              <el-form-item class="user_bot">
                <el-input v-model="formInline.title" placeholder="请输入订单号"></el-input>
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
            </el-form>
            <table cellspacing cellpadding class="table" v-if="orderList != null">
              <thead class="thead">
                <tr>
                  <th>项目名称</th>
                  <th>申请原因</th>
                  <th>问题描述</th>
                  <th>应退金额</th>
                  <th>审核状态</th>
                  <th>操作</th>
                </tr>
              </thead>
             <tbody class="none"  v-if="orderList.length ==0">
                <tr>
                  <td>
                    <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
                    <p>暂无数据</p>
                  </td>
                </tr>
              </tbody>
              <tbody
                v-else
                class="tbody"
                v-for="(itemList ,index) in orderList"
                :key="index"
              >
                <tr class="tr_top">
                  <td>
                    <span>{{itemList.created_at}}</span>
                    <span>
                      订单号：
                      <p>{{itemList.order_sn}}</p>
                    </span>
                    <span
                      v-if="itemList.get_customer_services!=undefined && itemList.get_customer_services.length>0"
                    >
                      <nuxt-link
                        :to="'/shop/'+itemList.store_id"
                        target="_blank"
                      >{{itemList.get_shop.store_name}}</nuxt-link>
                      <a
                        class="callMy"
                        :href="`tencent://message/?uin=${itemList.get_customer_services&&itemList.get_customer_services[0].kf_account}&Site=none&Menu=yes`"
                        target="_blank"
                      >
                        <span
                          class="iconfont icon-lianxiwo services"
                          v-if="itemList.get_customer_services!=undefined && itemList.get_customer_services.length>0"
                        ></span>
                      </a>
                    </span>
                    <span v-else>
                      <nuxt-link
                        :to="'/shop/'+itemList.store_id"
                        target="_blank"
                      >{{itemList.get_shop.store_name}}</nuxt-link>
                      <span title="该店铺尚未设置客服" class="iconfont icon-lianxiwo"></span>
                    </span>
                  </td>
                  <td>
                    <div>
                      <ul>
                        <li @click.stop="shopLisRightContClick(itemList )">
                          <p
                            v-if="itemList.get_order_goods != null"
                          >{{itemList.get_order_goods.name}}</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li v-if="itemList.reason != null">{{itemList.reason.reason}}</li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li>{{itemList.content}}</li>
                        <li v-if="itemList.url !== ''">
                          <p v-for="(item , index) in itemList.url" :key="index">
                            <a
                              :href="envVars.IMG_HOST+item"
                              download="logo1.png"
                            >附件{{index+1}}.png</a>
                          </p>
                        </li>
                        <li v-else></li>
                      </ul>
                    </div>
                    <div>￥{{itemList.amount}}</div>

                    <div v-if="itemList.status ==1">
                      <p>已退款</p>
                    </div>
                    <div v-else-if="itemList.status ==0">
                      <p>待处理</p>
                    </div>
                    <div v-else-if="itemList.status ==3">
                      <p>已取消</p>
                    </div>
                    <div v-else class="stateS">
                      <ul>
                        <li>
                          <p>已拒绝</p>
                        </li>
                        <li :title="itemList.refuse_reason">{{itemList.refuse_reason}}</li>
                      </ul>
                    </div>
                    <div v-if="itemList.status ==1 || itemList.status ==3">
                      <p></p>
                    </div>
                    <div v-if="itemList.status ==0">
                      <p>
                        <el-button type="text" @click="open2(itemList,index)">取消退款</el-button>
                      </p>
                    </div>
                    <div v-if="itemList.status ==2">
                      <p></p>
                    </div>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
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
    <side-bar ref="sideBar"></side-bar>
    <comFooter />
  </div>
</template>
<script>
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { verificationCodes, refundsuccess } from "@/api/list";
import { mapState } from "vuex";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      statusList: [
        { id: 0, type_name: "待处理" },
        { id: 1, type_name: "已退款" },
        { id: 2, type_name: "已拒绝" },
        { id: 3, type_name: "已取消" }
      ],

      total: 0,
      pageSize: 0,
      page: 1,
      flagB: false,
      show: false,
      flag: false,
      block: false,
      formInline: {
        title: "",
        type: ""
      },
      orderList:null,
      filtUrl: "",
      isLoading:false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if(this.isLoading){return}
      const {title = '', type = ''} = this.formInline;
      this.isLoading = true;
      verificationCodes(title, type, this.page).then(res => {
          if (res.data.code == 200) {
            const {data = [], per_page = 0, total = 0, current_page = 1} = res.data.data;
            this.orderList = data;
            for (var i = 0; i < this.orderList.length; i++) {
              if (this.orderList[i].url != "") {
                var url = this.orderList[i].url;
                this.filtUrl = url.split(",");
                for (var j = 0; j < this.filtUrl.length; j++) {
                  this.filtUrl[j] =this.filtUrl[j];
                }
                this.orderList[i].url = this.filtUrl;
              }
            }
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.flagB = !(this.total < 11);
          }
      }).catch(err => {
          console.log(err);
      }).finally(()=>this.isLoading = false);
    },
    onSubmit(formName) {
      if (this.formInline.type == 10) {
        this.formInline ={
          title:"",
          type:"",
        };
      }
      this.page = 1;
      this.init();
    },
    handleCurrentChange(val) {
      this.page = val;
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
    //订单详情页
    shopLisRightContClick(itemList) {
      var order_sn = itemList.order_sn;
      var { href } = this.$router.resolve({
        path: "/contract/contranct-index",
        query: { order_sn: order_sn ,cert:1}
      });
      window.open(href, "_blank");
    },
    open2(itemList, index) {
      this.$alert("确定取消吗?", "温馨提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        customClass:'reOpen',
      }).then(() => {
          var ordersn = itemList.order_sn;
          var sid = itemList.get_order_goods.sid;
          refundsuccess(ordersn,sid).then(res => {
              if (res.data.code == 200) {
                this.init();
                this.$message({
                  type: "success",
                  message: "取消成功!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }).catch(() => {});
    }
  }
};
</script>
<style lang="less" scoped>
@import "myRefundScode.less";
</style>
<style lang="less">
@import "myRefund.less";
</style>
<style lang="less">
@import "../index.less";
</style>
