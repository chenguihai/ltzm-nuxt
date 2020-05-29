<template>
  <div class="myReport">
    <comHeader />
    <div class="myReport_com">
      <LTnav />
      <div class="myReportRight">
        <div class="myReport_head">
          <span>我的举报</span>
        </div>
        <div class="myReportCom">
          <ul class="user_select">
            <li
              v-for="(item , index) in taberList"
              :key="index"
              :class="{tabAcive:tabIndex == index}"
              @click="tabClick(item ,index)"
            >{{item}}</li>
          </ul>
          <div class="tabList" v-if="reportList !=null">
            <div class="box">
              <div class="tabList_head">
                <span>举报项目</span>
                <span>举报类型</span>
                <span v-if="tabIndex==0">被举报人</span>
                <span v-else>举报人</span>
                <span>举报时间</span>
                <span>举报原因描述</span>
                <span>处理状态</span>
              </div>
            </div>
            <div class="box" v-if="reportList!= undefined && reportList.length > 0">
              <div
                class="tabList_head tabList_com"
                v-for=" (item , index) in reportList"
                :key="index"
              >
                <span>
                  <p v-if="item.project_type==1">用户编号{{item.project_id}}</p>
                  <p v-if="item.project_type==2">店铺编号{{item.project_id}}</p>
                  <p v-if="item.project_type==3">线索编号{{item.project_id}}</p>
                  <p v-if="item.project_type==4">服务编号{{item.project_id}}</p>
                  <p v-if="item.project_type==5">客户示例编号{{item.project_id}}</p>
                  <p v-if="item.project_type==6">案例编号{{item.project_id}}</p>
                  <p v-if="item.project_type==7">传记编号{{item.project_id}}</p>
                  <p v-if="item.project_type==8">上刊图片编号{{item.project_id}}</p>
                  <p v-if="item.project_type==9">上刊视频编号{{item.project_id}}</p>
                  <p>{{item.project_name}}</p>
                </span>
                <span>
                  <p>{{item.get_type.type}}</p>
                </span>
                <span v-if="tabIndex==0">
                  <p >{{item.passive_name}}</p>
                 
                </span>
                <span v-else>
                     <p >{{item.get_type_user.nick_name}}</p>
                </span>
                <span>
                  <p>{{item.created_at}}</p>
                </span>
                <span>
                  <p :title="item.description">{{item.description}}</p>
                  <p :class="{'blank':item.proof_imgs.length ==1}">
                    <a
                      v-for="(item , index) in item.proof_imgs"
                      :key="index"
                      :href="envVars.IMG_HOST+item"
                      download="logo1.png"
                    >附件{{index+1}}</a>
                  </p>
                </span>
                <span>
                  <p v-if="item.status == 0">待审核</p>
                  <p v-else-if="item.status == 1">举报成功</p>
                  <p v-else>举报失败</p>
                  <p v-if="item.status == 2">
                    <i>查看失败原因</i>
                  </p>
                  <p v-if="item.status == 2">
                    <i :title="item.reason">{{item.reason}}</i>
                  </p>
                </span>
              </div>
            </div>
            <div class="none" v-else>
              <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
              <p>暂无数据</p>
            </div>
          </div>
        </div>
        <div class="block" id="block" v-if="flagB">
          <el-pagination
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
import { userTip } from "@/api/list";
import { mapState } from "vuex";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,sideBar
  },
    computed: {
    ...mapState({ envVars: "envVariables" }),
    },
  data() {
    return {
      taberList: ["我发起的举报", "我收到的举报"],
      tabIndex: 0,
      pageSize: 10,
      page: 1,
      total: 0, //总条目数
      input1: 0,
      flagB: false,
      type: "1",
      num: 0,
      reportList: null,
      filtUrl: [],
      project_type:'',
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 请求举报列表
    init() {
      var type = this.type;
      var page = this.page;
      userTip(type, page).then(res => {
          if (res.data.code == 200) {
            const {data = [], per_page = 0, total = 0, current_page = 1} = res.data.data;
            this.reportList = data||[];
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            // 操作附件
            for (var i = 0; i < this.reportList.length; i++) {
              var proof_imgs = this.reportList[i].proof_imgs;
              this.filtUrl = proof_imgs.split(",");
              for (var j = 0; j < this.filtUrl.length; j++) {
                this.filtUrl[j] =this.filtUrl[j];
              }
              this.reportList[i].proof_imgs = this.filtUrl;
            }
            //  页数
            this.num = Math.ceil(this.total / this.pageSize);
            this.flagB = !(this.total < 11);
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
    },
    // tab 切换
    tabClick(item, index) {
      this.tabIndex = index;
       this.reportList = []
      if (index == 0) {
        this.type = "1";
      } else {
        this.type = "2";
      }
      this.input1 = 1;
      this.page = 1;
      this.init();
    },
    // 分页器
    pageSizeClick() {
      this.page = this.input1;
      this.init();
    },
    // 切换分页
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "./myReportScode";
</style>
<style lang="less">
@import "../index.less";
</style>
