<template>
  <div class="footprint">
    <comHeader />
    <div class="footprint_con">
      <LTnav />
      <div class="footprint_right">
        <div class="footprint_head">
          <span>我的足迹</span>
          <span>（以下是您最近半年的浏览记录）</span>
        </div>
        <div class="dataNull" v-if="dataList!=null">
          <div class="footprint_con" v-if="dataList!= undefined && dataList.length >0">
            <div
              class="foot"
              v-for="(item , index) in dataList"
              :key="index"
              @click.stop="footClick(item,index)"
            >
              <div class="footprintTime">
                <span :class="{'footp_time':item.flag == true}">
                  {{item.created_at}}
                  <span></span>
                  <span @click.stop="delDataClickd(item , index)">删除当天</span>
                </span>
                <span>
                  <p></p>
                </span>
              </div>
              <div class="footprintList">
                <div>
                  <img
                    v-if="item.img != null && item.img != ''"
                    :src="envVars.IMG_HOST+item.img+'?x-oss-process=image/resize,m_fill,h_120,w_200'"
                    alt
                  />
                  <img v-else src="../../../assets/img/img_bg.png" alt />
                  <span @click.stop="deletClick(item , index)" class="iconfont icon-shanchu"></span>
                </div>
                <div>
                  <span>{{item.name}}</span>
                </div>
                <div>
                  <span>￥{{item.price}}</span>
                  <span>
                    成交量:
                    <p>{{item.deal_num}}</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="none" v-else>
            <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
            <p>暂无数据</p>
          </div>
          <div class="block" id="block" style="margin: 30px 73px;" v-if="flagB">
            <el-pagination
              @size-change="handleSizeChange"
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
                <a href="javascript:;" @click.stop="pageSizeClick">确定</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop-up" v-if="flag == true">
      <div class="popUpBox">
        <div class="header">
          <span>温馨提示</span>
          <span @click="iconGuanbi()" class="iconfont icon-guanbi"></span>
        </div>
        <div class="content">
          <span>您确定要删除吗？</span>
          <div>
            <span @click="delDataClick">确定</span>
            <span @click="iconGuanbi()">取消</span>
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
import { mapState } from "vuex";
import { trailList, trailDelete, trailDeleteday } from "@/api/list";
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
      dataList: null,
      pageSize: 10,
      page: 1,
      total: 0, //总条目数
      numtal: 0,
      input1: 0,
      flagB: false,
      flag: false,
      num: 0,
      item: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      var page = this.page;
      let traList = await trailList(page);
      const {
        code,
        message,
        data,
        per_page = 0,
        total = 0,
        current_page = 1
      } = traList.data;
      if (code != 200) return this.$message.error(message);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].created_at = data.data[i].created_at
          .replace(/\ /g, " ")
          .split(" ")[0];
      }
      var dataList = data.data;
      this.pageSize = per_page;
      this.total = total;
      this.page = current_page;
      let timeArr = [];
      let newArray = [];
      let newLength = [];
      // 获得天数分组
      dataList.forEach(curArr => {
        const index = timeArr.indexOf(curArr.created_at);
        if (index > -1) {
          newArray[index].push(curArr);
        } else {
          timeArr.push(curArr.created_at);
          const length = newArray.length;
          newArray[length] = [];
          newArray[length].push(curArr);
        }
      });
      var array = [];
      // 每天第一个数据添加判断字段
      for (var j = 0; j < newArray.length; j++) {
        newArray[j][0] = { ...newArray[j][0], flag: true };
        array.push(...newArray[j]);
      }
      this.dataList = array || [];
      //  页数
      this.num = Math.ceil(this.total / this.pageSize);
      if (this.total < 11) {
        this.flagB = false;
      } else {
        this.flagB = true;
      }
    },
    // 删除单个足迹

    async deletClick(item, index) {
      var id = item.id;
      let tarde = await trailDelete(id);
      const { code, message } = tarde.data;
      if (code != 200) return this.$message.error(message);
      this.dataList = [];
      this.init();
      this.$message.success("删除成功");
    },
    //  足迹删除当天
    delDataClickd(item, index) {
      this.flag = true;
      this.item = item;
    },
    async delDataClick() {
      var data = this.item.created_at;
      let tradelData = await trailDeleteday(data);
      const { code, message } = tradelData.data;
      if (code != 200) return this.$message.error(message);
      this.dataList = [];
      this.init();
      this.flag = false;
    },
    iconGuanbi() {
      this.flag = false;
    },
    footClick(item, index) {
      var { href } = this.$router.resolve({
        path: "/service/"+item.sid,
        query: { id:item.store_id}
      });
      window.open(href, "_blank");
    },
    // 分页器
    pageSizeClick() {
      this.page = this.input1;
      this.dataList = [];
      this.init();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    // 切换分页
    handleCurrentChange(val) {
      this.page = val;
      this.input1 = this.page;
      this.dataList = [];
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
@import "./footprintScode.less";
</style>
<style lang="less" >
@import "../index.less";
</style>