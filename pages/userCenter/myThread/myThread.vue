<!-- 我发布的线索 -->
<template>
  <div class="orderPage body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right myThread">
        <div class="mayOrder">
          <span class="my_order">我发布的线索</span>
          <div class="myDeposit_bot">
            <el-form :inline="true" :model="formInline" class="demo-form-inline time_user">
              <el-form-item class="submit">
                <el-button @click="onSubmit" :loading="isLoading">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo" class="ccccc" />
                  </svg>
                </el-button>
              </el-form-item>
              <el-form-item class="user_bot formInline_user">
                <el-input v-model="formInline.keyword" placeholder="线索标题"></el-input>
              </el-form-item>
            </el-form>
            <table cellspacing cellpadding class="table" v-if="orderList !=null">
              <thead class="thead">
                <tr>
                  <th>标题/编号</th>
                  <th>线索价格</th>
                  <th>客户类型</th>
                  <th>浏览数</th>
                  <th>购买人数</th>
                  <th>线索状态</th>
                  <th>审核状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody v-if="orderList.length < 1" class="tbodyNone">
                <tr>
                  <td>
                    <img
                      width="90"
                      height="115"
                      class="noneImg"
                      src="../../../assets/img/pintouge.png"
                      alt
                    />
                    <p>暂无数据</p>
                  </td>
                </tr>
              </tbody>
              <tbody class="tbody" v-else v-for="itemList in orderList" :key="itemList.id">
                <tr>
                  <td>
                    <span>
                      线索编号：
                      <p>{{itemList.id}}</p>
                    </span>
                    <span style="width:200px">发布时间：{{itemList.created_at}}</span>
                  </td>
                  <td>
                    <div>
                      <ul>
                        <li @click="clueData(itemList)">
                          <p>{{itemList.title}}</p>
                        </li>
                      </ul>
                    </div>
                    <div>￥{{itemList.budget_money}}</div>
                    <div>{{itemList.customer_type}}</div>
                    <div>{{itemList.number}}</div>
                    <div>{{itemList.pay_number}}</div>
                    <div v-if="itemList.clue_status=='N'">已关闭</div>
                    <div v-if="itemList.clue_status=='Y'">未关闭</div>
                    <div v-if="itemList.status=='N'">
                      <p>待审核</p>
                    </div>
                    <div v-else-if="itemList.status=='Y'">
                      <p>未通过</p>
                      <p :title="itemList.reason">({{itemList.reason}})</p>
                    </div>
                    <div v-else-if="itemList.status=='S'">
                      <p>已通过</p>
                    </div>
                    <div class="checkI">
                      <p @click="checkClue(itemList , itemList.id)">查看</p>
                      <!-- <p
                                                v-if="itemList.status=='Y'"
                                                @click="redactClue(itemList , itemList.id)"
                      >编辑</p>-->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="block" id="block" v-if="flag">
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
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { myClue, myClueSearch, getUserInfo } from "@/api/list";

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
      title: "",
      flag: false,
      formInline: {
        keyword: ""
      },
      orderList: null,
      isLoading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      myClue(this.page)
        .then(res => {
          if (res.data.code == 200) {
            const { data = [], per_page = 0, total = 0 } = res.data.data;
            this.orderList = data;
            this.total = total;
            this.pageSize = per_page;
            this.flag = this.total > 10;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    initSeaarch() {
      if (this.isLoading) {
        return;
      }
      var title = String(this.formInline.keyword);
      this.isLoading = true;
      myClueSearch(title, this.page)
        .then(res => {
          if (res.data.code == 200) {
            const { data = [], per_page = 0, total = 0 } = res.data.data;
            this.orderList = data;
            this.total = total;
            this.pageSize = per_page;
            this.flag = this.total > 5;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    onSubmit() {
      this.page = 1;
      if (this.formInline.keyword != "") {
        this.initSeaarch();
      } else {
        this.init();
      }
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
    clueData(itemList) {
      var { href } = this.$router.resolve({
        path: "/clues/" + itemList.id
      });
      window.open(href, "_blank");
    },
    // 跳转线索详情页
    checkClue(itemList, id) {
      var token = localStorage.getItem("access_token");
      getUserInfo(token)
        .then(rsp => {
          var { code, data, message } = rsp.data;
          if (code == 200) {
            var { href } = this.$router.resolve({
              path: "/clues/" + itemList.id
            });
            window.open(href, "_blank");
          } else {
            return this.$loginp(0, () => {
              this.isFreely = 1;
            });
          }
        })
        .catch(err => this.$message.error(err));
    },
    redactClue(itemList, id) {
      var { href } = this.$router.resolve({
        path: "/clues/release",
        query: { id: itemList.id }
      });
      window.open(href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
@import "myThreadScode.less";
</style>

<style lang="less">
@import "../index.less";
</style>

<style lang="less">
@import "myThread.less";
</style>






