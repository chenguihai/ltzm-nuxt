<!-- 我的发票 -->
<template>
  <div class="myInvoice body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="evaluate">
          <div class="invoice">
            <span class="my_order">我的发票</span>
            <div class="myDeposit_bot">
              <el-form :inline="true" :model="formInline" class="demo-form-inline time_bot">
                <el-form-item class="submit">
                  <el-button type="primary" @click="onSubmit" :loading="isLoading">确定</el-button>
                </el-form-item>

                <el-form-item class="user_bot">
                  <el-input v-model="formInline.title" placeholder="请输入发票抬头名称"></el-input>
                </el-form-item>
                <el-form-item label="发票类型" class="region_bot">
                  <el-select v-model="formInline.type" placeholder="全部">
                    <el-option label="全部" value="10">全部</el-option>
                    <el-option label="增值税普通发票" value="1"></el-option>
                    <el-option label="增值税专用发票" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <table cellspacing cellpadding class="table" v-if="orderList != null">
                <thead class="thead">
                  <tr>
                    <th>发票抬头</th>
                    <th>发票类型</th>
                    <th>发票金额</th>
                    <th>收票人信息</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody class="none" v-if="orderList.length == 0">
                  <tr>
                    <td>
                      <img
                        style="width:90px ; height:115px"
                        src="../../../assets/img/pintouge.png"
                        alt
                      />
                      <p>暂无数据</p>
                    </td>
                  </tr>
                </tbody>
                <tbody class="tbody" v-else v-for="(itemList ,index) in orderList" :key="index">
                  <tr class="tr_top">
                    <td>
                      <span>申请时间：{{itemList.created_at}}</span>
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
                        <div>
                          <ul>
                            <li
                              v-if="itemList.company_name != null && itemList.company_name != '' && itemList.type == 2"
                            >
                              <p>公司名称：</p>
                              <p>{{itemList.company_name}}</p>
                            </li>
                            <li
                              v-if="itemList.company_name != null && itemList.company_name != '' && itemList.type == 1"
                            >
                              <p>姓名：</p>
                              <p>{{itemList.company_name}}</p>
                            </li>
                            <li v-if="itemList.taxpayer_id != null && itemList.taxpayer_id != ''">
                              <p>
                              纳税人识别号：</p>
                              <p>{{itemList.taxpayer_id}}</p>
                            </li>

                            <li
                              v-if="itemList.registration_address != null && itemList.registration_address != ''"
                            >
                              <p>注册地址：</p>
                              <p>{{itemList.registration_address}}</p>
                            </li>
                            <li
                              v-if="itemList.registration_phone != null && itemList.registration_phone != ''"
                            >
                              <p>注册电话：</p>
                              <p>{{itemList.registration_phone}}</p>
                            </li>
                            <li v-if="itemList.bank_account != null && itemList.bank_account != ''">
                              <p>银行卡号：</p>
                              <p>{{itemList.bank_account}}</p>
                            </li>
                            <li v-if="itemList.deposit_bank != null && itemList.deposit_bank != ''">
                              <p>开户支行名称：</p>
                              <p>{{itemList.deposit_bank}}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div v-if="itemList.invoice_type == 1">增值税普通发票</div>
                      <div v-else>增值税专用发票</div>
                      <div>￥{{itemList.money}}</div>
                      <div>
                        <ul>
                          <li>
                            <p>收票人：</p>
                            <p>{{itemList.name}}</p>
                          </li>
                          <li>
                            <p>收票地址：</p>
                            <p
                              v-if="itemList.province != '北京'&& itemList.province !='天津'"
                            >{{itemList.province}}{{itemList.city}}{{itemList.district}}{{itemList.address}}</p>
                            <p v-else>{{itemList.city}}{{itemList.district}}{{itemList.address}}</p>
                          </li>
                          <li>
                            <p>联系电话：</p>
                            <p>{{itemList.phone}}</p>
                          </li>
                        </ul>
                      </div>
                      <div v-if="itemList.status==0">
                        <p>待开票</p>
                      </div>
                      <div v-else-if="itemList.status==1">
                        <p>已开票</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
import { userInvoice } from "@/api/list";
import area from "@/assets/js/area";
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  data() {
    return {
      total: 0,
      pageSize: 0,
      page: 1,
      flagB: false,
      block: false,
      formInline: {
        title: "",
        type: ""
      },
      orderList:null,
      area:JSON.parse(JSON.stringify(area)),
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
      userInvoice(title, type, this.page).then(res => {
          if (res.data.code == 200) {
            const {data = [], per_page = 0, total = 0, current_page = 1} = res.data.data;
            this.orderList = data;
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            for (var i = 0; i < area.length; i++) {
              var a = area[i].child;
              if (a != undefined) {
                for (var j = 0; j < a.length; j++) {
                  var b = a[j].child;
                  if (b != undefined) {
                    for (var P = 0; P < b.length; P++) {
                      for (var k = 0; k < this.orderList.length; k++) {
                        if (this.orderList[k].province == area[i].id) {
                          this.orderList[k].province = area[i].name;
                        }
                        if (this.orderList[k].city == a[j].id) {
                          this.orderList[k].city = a[j].name;
                        }
                        if (this.orderList[k].district == b[P].id) {
                          this.orderList[k].district = b[P].name;
                        }
                      }
                    }
                  }
                }
              }
            }
            this.flagB = !(this.total < 11);
          }
        }).catch(err => {
          console.log(err);
        }).finally(()=>this.isLoading = false);
    },
    onSubmit() {
      if (this.formInline.type == 10) {
        this.formInline ={
            title :"",
            type :""
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
  }
};
</script>
<style lang="less" scoped>
@import "myInvoiceScode.less";
</style>
<style lang="less">
@import "myInvoice.less";
</style>
<style lang="less">
@import "../index.less";
</style>
