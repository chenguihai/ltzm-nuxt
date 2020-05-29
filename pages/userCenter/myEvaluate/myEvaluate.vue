<template>
  <!-- 我的评价 -->
  <div class="myEvaluate body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="evaluate">
          <span class="my_order">我的评价</span>

          <div class="myDeposit_bot">
            <el-tabs type="border-card">
              <el-tab-pane>
                <span class="user_select" slot="label">我评价服务商的</span>
                <table cellspacing cellpadding class="table" v-if="myList != null">
                  <thead class="thead">
                    <tr>
                      <th>订单信息</th>
                      <th>被评价服务商</th>
                      <th>评价内容</th>
                      <th>操作</th>
                    </tr>
                  </thead>

                  <tbody
                    class="tbody"
                    v-for="(itemList ,index) in myList"
                    :key="index"
                    v-if=" itemList.u_content != '' &&  myList.length > 0 "
                  >
                    <tr class="tr_top">
                      <td>
                        <span>下单时间：{{itemList.order_time}}</span>

                        <span>
                          订单号：
                          <p>{{itemList.order_sn}}</p>
                        </span>
                      </td>
                      <td>
                        <div>
                          <ul>
                            <li @click.stop="shopLisRightContClick(itemList)">
                              <p v-if="itemList.name!=null">{{itemList.name}}</p>
                            </li>
                            <li>
                              订单金额：
                              <p v-if="itemList.price!=null">￥{{itemList.price}}</p>
                            </li>
                          </ul>
                        </div>
                        <div v-if="itemList.store_name!=null">{{itemList.store_name}}</div>
                        <div v-else></div>
                        <div>
                          <ul>
                            <li>
                              评价等级：
                              <div v-if="itemList.evaluate==1">
                                <p>好评</p>
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-haoping" />
                                </svg>
                              </div>
                              <div v-else-if="itemList.evaluate==2">
                                <p>中评</p>
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-zhongping" />
                                </svg>
                              </div>
                              <div v-else-if="itemList.evaluate==3">
                                <p>差评</p>
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-chaping" />
                                </svg>
                              </div>
                            </li>
                            <li>
                              <p class="pcData">评分：</p>
                              <p>
                                完成质量
                                <em>{{itemList.quality}}分&#32;&#8194;</em>
                                工作速度
                                <em>{{itemList.speed}} 分&#32;&#8194;</em>
                                服务态度
                                <em>{{itemList.attitude}}分&#32;&#8194;</em>
                              </p>
                            </li>
                            <li>
                              评价内容：
                              <p>{{itemList.u_content}}</p>
                            </li>
                            <li>
                              评价时间：
                              <p>{{itemList.u_time}}</p>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p @click.stop="shopLisRightContClick(itemList)">查看详情</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <div class="tbodyNone" v-if="myList.length < 1">
                    <img class="noneImg" src="../../../assets/img/pintouge.png" alt />
                    <p>暂无数据</p>
                  </div>
                </table>
              </el-tab-pane>
              <el-tab-pane>
                <span class="user_select" slot="label">服务商评价我的</span>
                <table cellspacing cellpadding class="table facilitator" v-if="myList != null">
                  <thead class="thead">
                    <tr>
                      <th>订单信息</th>
                      <th>评价服务商</th>
                      <th>评价内容</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <div v-if="myList.length < 1" class="tbodyNone">
                    <img class="noneImg" src="../../../assets/img/pintouge.png" alt />
                    <p>暂无数据</p>
                  </div>
                  <tbody
                    class="tbody"
                    v-for="(itemList ,index) in myList"
                    :key="index"
                    v-if=" itemList.s_content != ''  && myList.length > 0 "
                  >
                    <tr class="tr_top">
                      <td>
                        <span>下单时间：{{itemList.order_time}}</span>
                        <span>
                          订单号：
                          <p>{{itemList.order_sn}}</p>
                        </span>
                      </td>
                      <td>
                        <div>
                          <ul>
                            <li @click.stop="shopLisRightContClick(itemList)">
                              <p v-if="itemList.name!=null">{{itemList.name}}</p>
                            </li>
                          </ul>
                        </div>
                        <div v-if="itemList.store_name!=null">{{itemList.store_name}}</div>
                        <div v-else></div>
                        <div>
                          <ul>
                            <li>
                              评价等级：
                              <div v-if="itemList.s_evaluate==1">
                                <p>好评</p>
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-haoping" />
                                </svg>
                              </div>
                              <div v-else-if="itemList.s_evaluate==2">
                                <p>中评</p>
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-zhongping" />
                                </svg>
                              </div>
                              <div v-else-if="itemList.s_evaluate==3">
                                <p>差评</p>
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-chaping" />
                                </svg>
                              </div>
                            </li>
                            <li>
                              评价内容：
                              <p class="evaData">{{itemList.s_content}}</p>
                            </li>
                            <li>
                              评价时间：
                              <p>{{itemList.s_time}}</p>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p @click.stop="shopLisRightContClick(itemList)">查看详情</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-tab-pane>
            </el-tabs>
            <div class="block" id="block" v-if="flagB">
              <el-pagination
                @size-change="handleSizeChange"
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
    <side-bar ref="sideBar"></side-bar>
    <comFooter />
  </div>
</template>
<script>
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { evaluate } from "@/api/list";
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      total: 0,
      pageSize: 0,
      page: 1,
      show: false,
      flagB: false,
      flag: false,
      block: false,
      formInline: {
        user: "",
        region: ""
      },
      myList: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var page = this.page;
      evaluate(page)
        .then(res => {
          if (res.data.code == 200) {
            this.myList = res.data.data.data || [];
            this.pageSize = res.data.data.per_page;
            this.total = res.data.data.total;
            this.page = res.data.data.current_page;
            if (this.total < 11) {
              this.flagB = false;
            } else {
              this.flagB = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
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
    //跳转详情页
    shopLisRightContClick(itemList) {
      var order_sn = itemList.order_sn;
      var { href } = this.$router.resolve({
        path: "/contract/contranct-index",
        query: { order_sn: order_sn ,cert:1}
      });
        window.open(href, "_blank");
    },
    getcolor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#e8e8e8;text-align: center;";
      }
    },
    getcenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center;";
    }
  }
};
</script>
<style lang="less" scoped>
@import "myEvaluateScode.less";
</style>
<style lang="less">
@import "myEvaluate.less";
</style>
<style lang="less">
@import "../index.less";
</style>
