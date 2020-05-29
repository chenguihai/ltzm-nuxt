<template>
  <!-- 账户余额 -->
  <div class="myDepositbox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right" style="background:#f4f6f8">
        <div class="myDeposit">
          <div class="myDeposit_top">
            <div class="myDeposit_cont">
              <span>账户余额</span>
              <span>
                <p>￥{{userMoney}}</p>
              </span>
              <span>
                <p>
                  可用资金:
                  <i>￥{{buyMoney}}</i>
                </p>
                <p>
                  冻结资金:
                  <i>￥{{moneyFrozen}}</i>
                </p>
              </span>
              <span @click="verifyId">提现</span>
              <span>
                <router-link to="/userCenter/moneyRecord/moneyRecord">
                  提现记录
                  <i style="font-family:simsun">></i>
                </router-link>
              </span>
            </div>
          </div>
          <div class="myDeposit_bot">
            <el-form :inline="true" :model="formInline" class="demo-form-inline time_bot">
              <el-form-item label="操作时间">
                <el-date-picker
                  v-model="formInline.time"
                  type="daterange"
                  popper-class="timeAll"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="选择日期"
                  end-placeholder="结束日期"
                  @change="timeData"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="类型" class="region_bot">
                <svg class="icon imgs" aria-hidden="true">
                  <use xlink:href="#icon-shouyejiantou" />>
                </svg>
                <el-select v-model="formInline.region" placeholder="全部" class="regionAll">
                  <el-option label="全部" value="15">全部</el-option>
                  <el-option
                    v-for="itenS  in statusList"
                    :key="itenS.id"
                    :label="itenS.type_name"
                    :value="itenS.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" @click="onSubmit">确定</el-button>
              </el-form-item>
            </el-form>
            <div class="dormitoryData">
              <table>
                <thead>
                  <tr>
                    <th>操作时间</th>
                    <th>类型</th>
                    <th>交易金额</th>
                    <th>余额</th>
                    <th>交易说明</th>
                  </tr>
                </thead>
                <tbody v-if="dormitoryList.length > 0">
                  <tr v-for="(item , index) in dormitoryList" :key="index">
                    <td>{{item.created_at}}</td>
                    <td>{{item.typename}}</td>
                    <td>{{item.trade_money}}</td>
                    <td>{{item.account_money}}</td>
                    <td :title="item.trade_note">
                      <span>{{item.trade_note}}</span>
                    </td>
                  </tr>
                </tbody>
                <tbody class="none" v-else>
                <tr>
                    <td>
                      <div>
                      <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
                      <p>暂无数据</p>
                          </div>
                  </td>
                  </tr> 
                </tbody>
              </table>
              <div class="block" id="block" v-if="flag">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage3"
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
    <div v-if="flagB" class="verifyFlag">
      <div class="verify">
        <span class="iconfont icon-guanbi delet" @click="delet"></span>
        <span class="header">温馨提示</span>
        <span class="title" v-if="code == 202">您还未实名认证，请先完成实名认证</span>
        <span class="title" v-else-if="code == 201">您还未绑定银行卡，请先完成绑定银行卡</span>
        <nuxt-link
          tag="span"
          v-if="code == 202"
          class="skipURL"
          to="/userCenter/realName/realName"
        >去实名认证</nuxt-link>
        <nuxt-link
          tag="span"
          v-else-if="code == 201"
          class="skipURL"
          to="/userCenter/myBank/myBank"
        >去绑定银行卡</nuxt-link>
        <div class="clear"></div>
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
import { accountList, accountMoney, accountExp, accountType } from "@/api/list";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
  data() {
    return {
      userMoney: 0.0,
      moneyFrozen: 0.0,
      currentPage3: 1,
      total: 0,
      pageSize: 0,
      page: 1,
      code: "",
      startTime: "",
      flag: false,
      flagB: false,
      endTime: "",
      formInline: {
        user: "",
        region: "",
        time: ""
      },
      statusList: [],
      value: "",
      dormitoryList: [],
      search: "",
      atime: "",
      buyMoney: 0.0
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 获取账户余额明细
    init() {
      if (this.atime != "") {
        this.startTime = this.atime[0] + " " + "00:00:00";
        this.endTime = this.atime[1] + " " + "23:59:59";
      }
      this.page = this.currentPage3;
      var data = {
        startTime: this.startTime,
        endTime: this.endTime,
        status: this.formInline.region,
        page: this.page
      };
      accountList(data)
        .then(res => {
          const { code, data, message, total = 0, per_page = 0 } = res.data;
          if (code == 200) {
            this.dormitoryList = data.data;
            this.total = data.total;
            this.pageSize = data.per_page;
            if (this.total > 10) {
              this.flag = true;
            } else {
              this.flag = false;
            }
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      accountType()
        .then(res => {
          const { code, message, data } = res.data;
          if (code == 200) {
            this.statusList = data;
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      accountMoney()
        .then(res => {
          const { code, message, data } = res.data;
          if (code) {
            this.userMoney = data.money;
            this.moneyFrozen = data.money_frozen;
            this.buyMoney = Number(this.userMoney) - Number(this.moneyFrozen);
            if (this.buyMoney === 0) {
              this.buyMoney = "0.00";
            } else {
              this.buyMoney = this.buyMoney.toFixed(2);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 校验
    async verifyId() {
      let exp = await accountExp();
      const { data } = exp;
      this.flagB = false;
      this.code = data.code;
      if (this.code == 200) {
        this.$router.push({
          path: "/userCenter/takeMoney/takeMoney",
          query: { typerz: this.$route.query.typerz }
        });
      } else if (this.code == 201) {
        this.flagB = true;
      } else if (this.code == 202) {
        this.flagB = true;
      } else {
        this.$message.error(data.message);
        this.flagB = false;
      }
    },
    // 关闭弹窗
    delet() {
      this.flagB = false;
    },
    timeData() {
      this.atime = this.formInline.time;
    },
    onSubmit(formName) {
      this.currentPage3 = 1;
      if (this.formInline.time == null) {
        this.formInline.time = "";
        this.atime = "";
        this.startTime = "";
        this.endTime = "";
      }
      if (this.formInline.region == 15) {
        this.formInline.time = "";
        this.atime = "";
        this.startTime = "";
        this.endTime = "";

        this.formInline.region = "";
        this.page = 1;
        this.init();
      } else {
        this.page = 1;
        this.init();
      }
    },
    getcolor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#e8e8e8;text-align: center;";
      }
    },
    getcenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center;";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    // 分页
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "myDepositScode.less";
</style>
<style lang="less">
@import "myDeposit.less";

.cell {
  width: 281px !important;
  line-height: 16px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-wrap: break-word;
  text-align: left;
  margin: 0 auto;
}
</style>
<style lang="less">
@import "../index.less";
</style>