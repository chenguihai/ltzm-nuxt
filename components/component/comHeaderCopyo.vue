<template>
  <div class="comHeader">
    <div class="header_top">
      <div class="login_header" :style="'width:'+headerWid+'px'">
        <ul class="login_header_left">
          <template v-if="!Token">
            <li>
              <router-link to="/">欢迎来到凌天众媒网</router-link>
            </li>
            <li class="second_li">
              <router-link to="/login" rel="nofollow">请登录</router-link>
            </li>
            <li>
              <router-link to="/register">免费注册</router-link>
            </li>
          </template>
          <template v-else-if="Token && userInfoData && !isToken">
            <li>
              <router-link to="/">欢迎来到凌天众媒网</router-link>
            </li>
            <li class="second_li">
              <router-link to="/userCenter/homePages">{{userInfoData.original.nick_name}}</router-link>
            </li>
            <li>
              <span @click="logOut">退出</span>
            </li>
          </template>
          <template v-else-if="isToken && userIStoken">
            <li>
              <router-link to="/">欢迎来到凌天众媒网</router-link>
            </li>
            <li class="second_li">
              <router-link to="/userCenter/homePages">{{userIStoken.original.nick_name}}</router-link>
            </li>
            <li>
              <span @click="logOut">退出</span>
            </li>
          </template>
        </ul>
        <ul class="login_header_right">
          <li>
            <span @click="loginNONE('/userCenter/myOrder/myOrder')">我的订单</span>
          </li>
          <li>
            <span @click="loginNONE('/userCenter/homePages')" rel="nofollow">我的凌天众媒</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
            <div class="xl_nav">
              <span @click="loginNONE('/userCenter/myOrder/myOrder')">我的订单</span>
              <span @click="loginNONE('/userCenter/myThread/myThread')">我发布的线索</span>
            </div>
          </li>
          <li>
            <span @click="loginNONE('/userCenter/tradeNews/tradeNews')">我的消息</span>
            <p>({{countNumS+countNum}})</p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
            <div class="xl_nav message_text">
              <span @click="loginNONE('/userCenter/tradeNews/tradeNews')">
                交易消息 (
                <span>{{countNum}}</span>)
              </span>
              <span @click="loginNONE('/userCenter/systemNews/systemNews')">
                系统消息 (
                <span>{{countNumS}}</span>)
              </span>
            </div>
          </li>
          <li v-if="status ===2">
            <router-link to="/store?storeIndex=index">我是服务商&nbsp;</router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
            <div class="xl_nav">
              <a :href="'/shopadmin/dashboard' |originUrlF" rel="nofollow">店铺管理中心</a>
              <router-link :to="{path:'/shop/'+storeInfo.id}">我的店铺</router-link>
              <router-link to="/tollMarket/marketShop/marketShop?id=1">店铺会员</router-link>
              <a :href="'/shopadmin/order_manage/my_transaction'| originUrlF">服务订单</a>
            </div>
          </li>
          <li class="carousel_wrap" v-else-if="status ==1||status ==0">
            <router-link to="/business" class="enter_text" target="_blank">
              <span>立即入驻</span>
            </router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
            <div class="carousel">
              <el-carousel height="240px">
                <el-carousel-item v-for="item in entryNow" :key="item.id">
                  <a class="ad_link" target="_blank" :href="item.ad_img_link">
                    <img
                      class="carousel_img"
                      src="~/assets/img/img_bg.png"
                      v-lazy="item.ad_img"
                      :alt="item.ad_name"
                    />
                  </a>
                </el-carousel-item>
              </el-carousel>
              <div class="carousel_btn">
                <router-link :to="{path:Token?'/store?storeIndex=index':'/login'}">
                  <el-button size="small" type="danger">立即入驻</el-button>
                </router-link>
              </div>
            </div>
            <span class="enter_icon">入驻免拥</span>
          </li>
          <li @click="loginNONE('/shoppingCart')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouyegouwuche" class="ccccc" />
            </svg>
            <span>购物车</span>
          </li>
          <li>
            <router-link to="/help">帮助中心</router-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <div class="head">
      <div class="header_center" id="boxFixed" :class="{'is_fixed' : isFixed}">
        <div class="header_center_logo" :style="'width:'+headerWid+'px'">
          <router-link to="/" class="header_logo">
            <img src="../../assets/img/logo.png" alt />
            <h1>
              一站式全媒界
              <br />大型媒体电商平台
            </h1>
          </router-link>
          <div class="header_ser">
            <div class="ser_left">
              <div style="margin-top: 29px;">
                <el-input
                  placeholder="请输入内容"
                  autocomplete="off"
                  v-model="searchInp"
                  maxlength="30"
                  class="input-with-select sel_input"
                  @keyup.enter.native="searchGo()"
                >
                  <el-select
                    :popper-append-to-body="false"
                    v-model="searchSel"
                    @change="getHotword"
                    slot="prepend"
                    placeholder="请选择"
                    class="sel_name"
                    style="text-align: center"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id"
                      class="sel_labels"
                    ></el-option>
                  </el-select>
                  <el-button slot="append" class="se_search" @click="searchGo()">搜索</el-button>
                </el-input>
                <div class="searchList" v-if="flagSea">
                  <ul>
                    <li
                      v-for="(item , index) in searchData"
                      :key="index"
                      @click="searchClick(item , index)"
                    >
                      <div>
                        <span>{{item.text}}</span>
                        <!-- <span>删除</span> -->
                      </div>
                    </li>
                  </ul>
                  <div class="closeSea" @click="closeClick" v-if="searchData.length > 0">
                    <span>关闭</span>
                  </div>
                </div>
              </div>
              <div class="header_nav">
                <span
                  v-for="(item,i) in hotWorkData"
                  :key="i"
                  @click="jumHand(item)"
                  style="cursor: pointer; padding-left:0"
                >{{item.keyword}}</span>
              </div>
            </div>
            <div class="text_span">或</div>
            <div class="ser_right">
              <router-link to="/clues/release" target="_blank">
                <button>发布线索需求</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { delCookie, newDeviceCode } from "../../utils";
import {
  msgcount,
  msgcountS,
  hotWordList,
  getUserInfo,
  searchSuggest
} from "@/api/list";
import { commonTop, getHeader } from "@/api/common";
import { _checkStringVal } from "~/utils/tool";
import { mapMutations, mapState } from "vuex";
import { indexInitMixin } from "@/utils/common-mixins";
import { get_store_info } from "../../api/store-flow";
import dataEventTrack from "@/utils/dataEventTrack";
const searchPath = new Map([
  ["1", "/category"],
  ["2", "/clues"],
  ["3", "/shop/list"]
]);
export default {
  props: {
    headerWid: {
      type: Number,
      default: 1210
    },
    searce: {
      type: String,
      default: ""
    }
  },
  mixins: [indexInitMixin()],
  data() {
    const { keywords = "", _sel = "1" } = this.$route.query;
    return {
      showHeader: false, //是否显示头部
      searchInp: keywords, // 搜索值
      searchSel: _sel,
      options: [
        { id: "1", label: "服务" },
        { id: "2", label: "线索" },
        { id: "3", label: "店铺" }
      ],
      name: "",
      datasearce: "",
      countNumS: 0,
      countNum: 0,
      entryNow: [],
      status: -1, //-1刷新瞬间 0:未登录 1：已登录，店铺未开通或者审核不成功 2：店铺开通成功
      isFixed: false,
      offsetTop: 0,
      hotWorkData: [],
      userInfo: "",
      isToken: this.$route.query.token,
      userIStoken: "",
      searchData: [],
      flagSea: false,
      type: "service",
      storeInfo: ""
    };
  },
  async mounted() {
    let userInfo = localStorage.getItem("userInfo");
    var storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
    if (!this.storeInfo.id && !storeInfo) {
      this.Token && this.getStoreInfoHttp();
    } else {
      this.storeInfo = storeInfo;
    }
    let _this = this;
    if (userInfo) {
      let data = JSON.parse(userInfo);
      this.$store.commit("CHANGE_USER_INFO", data);
    } else {
      if (this.Token && userInfo) {
        this.Token && (await this.setUser(this.Token));
      }
    }
    // }
    var tok = this.$route.query.token;
    if (tok) {
      getUserInfo(tok)
        .then(rsp => {
          var { code, data, message } = rsp.data;
          if (code == 200) {
            this.userIStoken = rsp.data.data;
            this.userInfo = rsp.data.data;
            window.localStorage.setItem(
              "userInfo",
              JSON.stringify(this.userInfo)
            );
            this.CHANGE_USER_INFO(data);
          } else {
            this.$message.error(message);
          }
        })
        .catch(err => this.$message.error(err));
    }
    let searce = localStorage.getItem("searce");
    this.datasearce = searce ? searce : "";
    this.getHotword();
    if (
      !localStorage.getItem("countNum") &&
      !localStorage.getItem("countNum")
    ) {
      if (this.Token || this.isToken) {
        this.countS();
      } else {
        this.countNum = 0;
        this.countNumS = 0;
      }
    } else {
      this.countNum = Number(localStorage.getItem("countNum")) || 0;
      this.countNumS = Number(localStorage.getItem("countNumS")) || 0;
    }
    let topData = sessionStorage.getItem("topData");
    if (topData) {
      const { entryNow = [], status = 0 } = JSON.parse(topData);
      this.entryNow = entryNow;
      this.status = status;
    } else {
      this.commonTopHttp();
    }
    // 根据浏览器自动生成用户唯一标识码
    newDeviceCode();
  },
  destroyed() {
    //清除
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    ...mapState({
      //   storeInfo: "storeInfo",
      envVars: "envVariables",
      userInfoData: "userInfo",
      Token: "access_token"
    })
  },
  filters: {
    originUrlF: url => {
      // 拼接前缀跳转到商品商城
      const { protocol, hostname } = location;
      return protocol + "//" + hostname + url;
    }
  },
  methods: {
    ...mapMutations(["CHANGE_STORE_INFO"]),
    async getHotword() {
      //搜索热词列表
      this.searchData = [];
      if (this.searchSel == 1) {
        this.type = "service";
      } else if (this.searchSel == 2) {
        this.type = "clue";
      } else {
        this.type = "store";
      }
      let res = await hotWordList(this.searchSel);
      if (res.data.code == 200) {
        this.showHeader = true;
        this.hotWorkData = res.data.data;
      } else {
        return;
      }
    },
    jumHand(row) {
      if (row.is_show == 1) {
        const path = searchPath.get(this.searchSel);
        let routeUrl = this.$router.resolve({
          path,
          query: { keywords: row.keyword, _sel: this.searchSel, page: 1 }
        });
        window.open(routeUrl.href, "_blank");
      } else if (row.is_show == 0 && row.link) {
        window.open(row.link);
      }
    },
    getStoreInfoHttp() {
      if (this.Token) {
        get_store_info()
          .then(res => {
            let { code, data = {}, message } = res.data;
            window.localStorage.setItem("storeInfo", JSON.stringify(data));
            this.storeInfo = data;
            this.CHANGE_STORE_INFO(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    initHeight() {
      if (this.$route.query.name == "case-biog-cid") {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        this.isFixed = scrollTop > this.offsetTop ? true : false;
      }
    },
    countS() {
      msgcountS()
        .then(res => {
          if (res.data.code == 200) {
            var data = res.data;
            this.countNumS = data.data.count;
            window.localStorage.setItem(
              "countNumS",
              JSON.stringify(this.countNumS)
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
      msgcount()
        .then(res => {
          // 系统消息-未读总数
          if (res.data.code == 200) {
            var data = res.data;
            this.countNum = data.data.count;
            window.localStorage.setItem(
              "countNum",
              JSON.stringify(this.countNum)
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loginNONE(routers) {
      let userInfo = localStorage.getItem("userInfo");
      if (this.Token && userInfo && this.userInfoData) {
        var { href } = this.$router.resolve({
          path: !this.Token ? "/login" : routers
        });
        window.open(href, "_blank");
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    commonTopHttp() {
      commonTop()
        .then(res => {
          //0:未登录 1：已登录，店铺未开通或者审核不成功 2：店铺开通成功
          const {
            code,
            data: { entryNow = [], status }
          } = res.data;
          if (code === 200) {
            this.entryNow = entryNow;
            this.status = status;
            sessionStorage.setItem("topData", JSON.stringify(res.data.data));
          } else {
            this.entryNow = [];
            this.status = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    logOut() {
      // 退出登录
      delCookie("userInfo");
      delCookie("access_token");
      localStorage.removeItem("storeInfo");
      localStorage.removeItem("countNum");
      localStorage.removeItem("countNumS");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_start_time");
      localStorage.removeItem("userInfo");
      this.$store.commit("CHANGE_USER_INFO", null);
      this.$store.commit("SAVE_TOKEN", null);
      this.$router.push("/login");
    },
    searchGo(word) {
      //搜索
      if (this.searchInp == "") {
        this.$message.error("请输入搜索内容");
        return;
      }
      const path = searchPath.get(this.searchSel);
      var routeIndex = "";
      if (this.$route.fullPath == "/") {
        routeIndex = "/index";
      } else {
        routeIndex = this.$route.fullPath;
      }
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: routeIndex,
          rname: "搜索框",
          keyword: this.searchInp,
          type: this.searchSel
        }
      });
      this.flagSea = false;
      let routeUrl = this.$router.resolve({
        path,
        query: { keywords: this.searchInp, _sel: this.searchSel, page: "1" }
      });
      window.open(routeUrl.href, "_blank");
    },
    // 输入框搜索查询
    async changeList() {
      var type = this.type;
      var keyword = this.searchInp;
      var num = 10;
      if (keyword != "") {
        this.flagSea = true;
        let dataSea = await searchSuggest(type, keyword, num);
        if (dataSea.data.code != 200) return this.$message.error(data.message);
        this.searchData = dataSea.data.data.data;
      }
    },
    searchClick(item, index) {
      this.searchInp = item.text;
      this.searchGo();
      this.flagSea = false;
    },
    closeClick() {
      this.flagSea = false;
    },
    seaOut() {
      this.flagSea = false;
    }
  },
  updated: function() {
    this.$nextTick(() => {
      var a = document.querySelector("#boxFixed");
      if (a && a != null) {
        this.offsetTop = a.offsetTop;
        if (this.offsetTop > 0) {
          window.addEventListener("scroll", this.initHeight);
        }
      }
    });
  },
  watch: {
    Token(newVal) {
      if (!newVal) {
        this.countNumS = 0;
        this.countNum = 0;
      }
    },
    searchInp(newVal) {
      if (newVal) {
        this.changeList();
      } else {
        this.flagSea = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/component/comHeaderScode.less";
</style>

<style lang="scss" scoped>
@import "../../assets/css/component/comHeader.less";
</style>
<style lang="scss">
.ser_left {
  .el-select-dropdown {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    top: 20px !important;
    left: 0 !important;
    position: absolute !important;
    .popper__arrow {
      display: none;
    }
  }
}
.sel_name {
  background: #ffffff;
  height: 29px;
  .el-input--suffix .el-input__inner {
    padding-right: 20px;
    height: 30px;
    color: #666 !important;
    vertical-align: middle;
    line-height: 32px;
    user-select: none;
  }

  input {
    text-align: center !important;
  }

  .el-input__suffix {
    right: 0px;
    height: 100%;
    height: 26px;
    line-height: 30px;
    margin: 1px 0;
    border-right: 1px solid #cccccc;

    .el-input__suffix-inner {
      padding-right: 8px;
    }
  }
}

.sel_labels {
  text-align: center;

  &:hover {
    color: #f3262d;
  }
}

.sel_labels.selected {
  color: #f3262d;
}

.header_ser {
  .sel_input .el-input__icon {
    line-height: 27px !important;
  }
  .sel_name {
    margin: 0px -20px !important;
  }
}
</style>



