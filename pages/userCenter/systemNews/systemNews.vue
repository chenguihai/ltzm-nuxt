<template>
  <!-- 系统消息 -->
  <div class="systemNewsbox body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right">
        <div class="systemNews">
          <div class="systemNews_top">
            <span>
              有
              <p>{{countNum}}</p>条系统通知未读
            </span>
            <span @click="readAll" v-if="countNum==0" style="color:#f3262d;">
            </span>
            <span class="read" @click="readAll" v-else>
              <span class="iconfont icon-xiansuo-gou"></span>全部设为已读
            </span>
          </div>
          <div class="systemNews_cont" v-if="coachExplainList !=null">
            <ul v-if="coachExplainList.length >=1">
              <li v-for="(item , index) in coachExplainList" :key="index" class="systemNews_li">
                <div class="readN" v-if="item.status == 'N'">未读</div>
                <div class="systemNews_left" @click="updata(item , item.status)">
                  <div class="dot" :class="{'newsColor':item.status == 'Y'}">
                    <p v-if="item.status == 'Y'"></p>
                    <i v-if="item.status == 'N'"></i>
                    {{item.title}}
                    <span>{{item.created_at}}</span>
                  </div>

                  <a
                    :class="{'newsColor':item.status == 'Y'}"
                    class="coach-explain-wrap tradeNews_left"
                    v-if="item.pc_link!=null && item.pc_link!= ''"
                    :href="item.pc_link"
                    target="_blank"
                  >
                    {{item | explainLen}}
                    <p>
                      查看详情
                      <span class="iconfont icon-xiangyoudianji"></span>
                    </p>
                  </a>
                  <a
                    :class="{'newsColor':item.status == 'Y'}"
                    class="coach-explain-wrap tradeNews_left"
                    v-else
                  >{{item | explainLen}}</a>
                  <a
                    class="btn-pick-up"
                    v-show="item.content.length >= 200"
                    @click.stop="togglePickUp(item,$event)"
                  >{{item.isExpand?'收起':'展开'}}</a>
                </div>

                <div class="systemNews_right">
                  <span class="submit">
                    <el-button type="text" @click="submint(item , item.id)" class="www">删除</el-button>
                  </span>
                  <span
                    @click="updata(item , item.status)"
                    v-if="item.status == 'N'"
                    class="updata"
                  >标记为已读</span>
                  <span v-else>
                    <span class="iconfont icon-xiansuo-gou"></span>已读
                  </span>
                </div>
              </li>
            </ul>
            <ul class="none" v-else>
              <img src="../../../assets/img/pintouge.png" alt />
              <p>暂无数据</p>
            </ul>
          </div>
          <div class="block" id="block" style="padding:0 20px;" v-if="flag">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              background
              :page-size="10"
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
    <div class="pop-up" v-if="flagNwes">
      <div class="popUpBox">
        <div class="header">
          <span>温馨提示</span>
          <span @click="iconGuanbi()" class="iconfont icon-guanbi"></span>
        </div>
        <div class="content">
          <span>您确定要删除消息吗？</span>
          <div>
            <span @click="deletClick">确定</span>
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
import {
  newsListS,
  msgcountS,
  msgupdateS,
  deleteNews,
  updateOne
} from "@/api/list";

export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      countNum: "",
      currentPage3: 1,
      total: 0,
      coachExplainList: null,
      flag: false,
      flagNwes: false,
      item: ""
    };
  },
  mounted() {
    this.init();
    this.count();
  },

  methods: {
    // 系统消息
    init() {
      var currentPage3 = this.currentPage3;
      newsListS(currentPage3)
        .then(res => {
          var a = res.data.data.data;
          var b = [];
          for (var i = 0; i < a.length; i++) {
            a[i] = { ...a[i], isExpand: false };
            b.push(a[i]);
          }
          this.coachExplainList = b || [];
          this.total = res.data.data.total;
          if (this.total >= 11) {
            this.flag = true;
          } else {
            this.flag = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 系统消息-未读总数
    count() {
      msgcountS()
        .then(res => {
          if (res.data.code == 200) {
            var data = res.data;
            this.countNum = data.data.count;
            window.localStorage.setItem(
                  "countNumS",
                  JSON.stringify(this.countNum)
                );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 系统消息-全部设为已读
    readAll() {
      msgupdateS()
        .then(res => {
          if (res.data.code == 200) {
            this.flag = false;
            this.coachExplainList = null;
            this.count();
            this.init();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTest() {},
    // 删除一条信息
    deletClick() {
      var id = this.item.id;

      deleteNews(id)
        .then(res => {
          if (res.data.code == 200) {
            this.coachExplainList = [];
            this.init();
            this.count();
            this.flagNwes = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 设置一条已读
    updata(item) {
      var id = item.id;
      if (item.status == "N") {
        updateOne(id)
          .then(res => {
            if (res.data.code == 200) {
              this.coachExplainList = [];
              this.init();
              this.count();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    // 分页
    handleCurrentChange(val) {
      var currentPage3 = val;
      this.coachExplainList = [];
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
    togglePickUp(item, e) {
      let target = e.target.parentNode; //点击后获取当前评论
      item.isExpand = !item.isExpand; //切换状态
      if (item.isExpand) {
        //true
        //当下全文状态
        target.style = "min-height:128px ";
      } else {
        //false
        // 当下收起状态
        target.style.height = "120px"; //收起状态的容器高度
        //收起状态的高度
      }
    },
    iconGuanbi() {
      this.flagNwes = false;
    },
    submint(item) {
      this.item = item;
      this.flagNwes = true;
    }
  },
  filters: {
    explainLen(item) {
      if (!item.content) return;
      if (item.isExpand) {
        //当下全文状态

        return item.content.substr(0, item.content.length - 1); //字符串截取
      } else {
        // 当下收起状态
        return item.content.substr(0, 200); //字符串截取100个字
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "systemNewsScode.less";
</style>
<style lang="less">
@import "systemNews.less";
</style>
<style lang="less">
@import "../index.less";
</style>
