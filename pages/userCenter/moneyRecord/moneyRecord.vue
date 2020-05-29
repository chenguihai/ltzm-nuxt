<template>
  <!-- 账户余额 -->
  <div class="myDepositbox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="moneyRecord">
          <div class="myDeposit_top myDepositbox">
            <div class="myDeposit_cont">
              <span>提现记录</span>
              <span>
                <p>{{money}}</p>
                <p>累计提现</p>
              </span>
            </div>
          </div>
          <div class="myDeposit_bot">
            <el-form :inline="true" :model="formInline" class="demo-form-inline time_bot">
              <el-form-item label="操作时间">
                <el-date-picker
                  v-model="formInline.time"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="timeData"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="状态" class="region_bot">
                <el-select v-model="formInline.region" placeholder="全部">
                  <el-option label="全部" value="10">全部</el-option>
                  <el-option
                    v-for="itenS  in statusList"
                    :key="itenS.id"
                    :label="itenS.name"
                    :value="itenS.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="submit">
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="dormitoryData">
              <el-table
                ref="dormitoryTable"
                :data="dormitory"
                tooltip-effect="dark"
                border
                filterable
                style="width: 100%"
                :header-cell-style="getcolor"
                :cell-style="getcenter"
              >
                <template slot="empty">
                  <ul class="none">
                    <img width="90" heigth="115" src="../../../assets/img/pintouge.png" alt />
                    <p>暂无数据</p>
                  </ul>
                </template>
                <el-table-column label="申请时间" prop="created_at"></el-table-column>
                <el-table-column label="银行账号" prop="bankna"></el-table-column>
                <el-table-column label="提现金额" prop="money"></el-table-column>
                <el-table-column label="状态" prop="status">
                </el-table-column>
              </el-table>

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
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import LTnav from "@/components/component/LT_nav";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { takeList } from "@/api/list";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      currentPage3: 1,
      total: 0,
      pageSize: 0,
      startTime: "",
      flag: false,
      endTime: "",

      statusList: [
        {
          id: 1,
          name: "待审核"
        },
        {
          id: 2,
          name: "审核失败"
        },
        {
          id: 3,
          name: "打款中"
        },
        {
          id: 4,
          name: "已提现"
        }
      ],
      page: 0,
      formInline: {
        user: "",
        region: "",
        time: ""
      },
      dormitory: [],
      atime: "",
      money:'',
    };
  },
  created() {
    this.init();
  },
  methods: {
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
      takeList(data)
        .then(res => {
          if (res.data.code == 200) {
            this.dormitory = res.data.data.list.data;
            this.money = res.data.data.money
            for (var i = 0; i < this.dormitory.length; i++) {
              if (this.dormitory[i].status == 1) {
                this.dormitory[i].status = "待审核";
              } else if (this.dormitory[i].status == 2) {
                this.dormitory[i].status = "审核失败";
              } else if (this.dormitory[i].status == 3) {
                this.dormitory[i].status = "打款中";
              } else {
                this.dormitory[i].status = "已提现";
              }

              this.dormitory[i] = {
                ...this.dormitory[i],
                bankna:
                  this.dormitory[i].bank_name +
                  "" +
                  this.dormitory[i].bank_number
              };
            }
            this.total = res.data.data.list.total;
            this.pageSize = res.data.data.list.per_page;
            if (this.total < 11) {
              this.flag = false;
            } else {
              this.flag = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    timeData() {
      this.atime = this.formInline.time;
    },
    onSubmit(formName) {
      if (this.formInline.time == null) {
        this.formInline.time = "";
        this.atime = "";
        this.startTime = "";
        this.endTime = "";
      }
      if (this.formInline.region == 10) {
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
    }
  },
  // computed: {
  //   amunt() {
  //     let amunt = 0;
  //     this.dormitory.map(item => {
  //       amunt += item.money - 0;
  //     });

  //     return amunt;
  //   }
  // }
};
</script>
<style lang="less" scoped>
@import "moneyRecordScode.less";
/deep/ .myDeposit_bot {
  .dormitoryData {
    .el-table {
      .el-table__header-wrapper {
        .el-table__header {
          & > .has-gutter {
            & > tr {
              & > th {
                  background: #f5f5f5!important;
                & > div {
                  font-weight: 400;
                  color: #666;
                }
              }
            }
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__body {
          tbody {
            .el-table__row {
              td {
                div {
                  width: 100% !important;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
@import "moneyRecord.less";
</style>
<style lang="less">
@import "../index.less";
</style>