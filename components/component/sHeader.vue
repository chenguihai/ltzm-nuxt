<template>
  <div class="comHeader">
    <div class="header_top">
      <div class="login_header">
        <!-- 未登录状态 -->
        <ul v-if="!Token" class="login_header_left">
          <li>
            <router-link tag="span" to="/">欢迎来到凌天众媒网</router-link>
          </li>
          <li class="second_li">
            <span>
              <nuxt-link to="/login">请登录</nuxt-link>
            </span>
          </li>
          <li>
            <span>
              <nuxt-link to="/register">免费注册</nuxt-link>
            </span>
          </li>
        </ul>
        <!-- 登录状态 -->
        <ul v-else-if="Token && userInfoData" class="login_header_left">
          <li>
            <router-link tag="span" to="/">欢迎来到凌天众媒网</router-link>
          </li>
          <li class="second_li">
            <span>
              <nuxt-link to="/userCenter/homePages">{{userInfoData.original.real_name}}</nuxt-link>
            </span>
          </li>
          <li>
            <span>
              <span @click="logOut">退出</span>
            </span>
          </li>
        </ul>
        <ul class="login_header_right">
          <li>
            <nuxt-link @click="loginNONE" to="/userCenter/myOrder/myOrder">我的订单</nuxt-link>
          </li>
          <li>
            <nuxt-link @click="loginNONE" to="/userCenter/homePages">我是雇主</nuxt-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
            <div class="xl_nav">
              <nuxt-link @click="loginNONE" tag="span" to="/userCenter/myOrder/myOrder">我的订单</nuxt-link>
              <nuxt-link @click="loginNONE" tag="span" to="/userCenter/myThread/myThread">我发布的线索</nuxt-link>
            </div>
          </li>
          <li>
            <nuxt-link @click="loginNONE" to="/userCenter/tradeNews/tradeNews">我的消息</nuxt-link>
            <p>（{{countNumS+countNum}}）</p>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
            <div class="xl_nav">
              <nuxt-link
                @click="loginNONE"
                tag="span"
                to="/userCenter/tradeNews/tradeNews"
              >交易消息({{countNum}})</nuxt-link>
              <nuxt-link
                @click="loginNONE"
                tag="span"
                to="/userCenter/systemNews/systemNews"
              >系统消息({{countNumS}})</nuxt-link>
            </div>
          </li>
          <!--我是服务商-->
          <li v-if="status ===2">
            <nuxt-link to="/business">
              我是服务商
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangxia" class="ccccc" />
              </svg>
            </nuxt-link>
            <div class="xl_nav">
              <a :href="'/shopadmin/dashboard' |originUrlF">店铺管理中心</a>
              <nuxt-link tag="span" :to="{path:'/shop/'+storeInfo.id}">我的店铺</nuxt-link>
              <nuxt-link tag="span" to="/tollMarket/marketShop/marketShop?id=1">店铺会员</nuxt-link>
              <nuxt-link tag="span" to="/shopadmin/order_manage/my_transaction">服务订单</nuxt-link>
            </div>
          </li>
          <!--立即入驻-->
          <li class="carousel_wrap" v-else>
            <nuxt-link to="/business" target="_blank">
              立即入驻
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangxia" class="ccccc" />
              </svg>
            </nuxt-link>
            <div class="carousel">
              <el-carousel height="240px">
                <el-carousel-item v-for="item in entryNow" :key="item.id">
                  <img class="carousel_img" :src="envVars.IMG_HOST+item.ad_img" :alt="item.ad_name" />
                </el-carousel-item>
              </el-carousel>
              <div class="carousel_btn">
                <nuxt-link to="/business">
                  <el-button size="small" type="danger">立即入驻</el-button>
                </nuxt-link>
              </div>
            </div>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouyegouwuche" class="ccccc" />
            </svg>
            购物车
          </li>
          <li>
            <nuxt-link @click="loginNONE" to="/help">帮助中心</nuxt-link>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" class="ccccc" />
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <div class="head">
      <div class="header_center">
        <div class="header_center_logo">
          <nuxt-link to="/" class="header_logo">
            <img src="../../assets/img/logo.png" alt />
          </nuxt-link>
          <span class="m-header-title"></span>
          <img class="icon-pay" src="~assets/img/icon-pay.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { delCookie, delLocalStorage } from "../../utils";
import { msgcount, msgcountS } from "@/api/list";
import { commonTop } from "@/api/common";
import { _checkStringVal } from "~/utils/tool";
import { mapMutations, mapState } from "vuex";
import { indexInitMixin } from "@/utils/common-mixins";
import { getHeader } from "@/api/common";
const searchPath = new Map([
  ["1", "/category"],
  ["2", "/clues"],
  ["3", "/shop/list"]
]);
export default {
  props: ["searce"],
  mixins: [indexInitMixin()],
  data() {
    return {
      searchInp: "", // 搜索值
      searchSel: "1",
      options: [
        {
          id: "1",
          label: "服务"
        },
        {
          id: "2",
          label: "线索"
        },
        {
          id: "3",
          label: "店铺"
        }
      ],
      name: "",
      datasearce: "",
      countNumS: 0,
      countNum: 0,
      entryNow: [],
      status: 0 //0:未登录 1：已登录，店铺未开通或者审核不成功 2：店铺开通成功
    };
  },
  async mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (this.Token && userInfo) {
      this.Token && (await this.setUser(this.Token));
      this.datasearce = localStorage.getItem("searce")
        ? localStorage.getItem("searce")
        : "";
    }
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
  },
  computed: {
    ...mapState({
      storeInfo: "storeInfo",
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
      // 系统消息-未读总数
      msgcount()
        .then(res => {
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
    novicClick() {
      this.$router.push({ path: "/novicClick/novicClick" });
    },
    loginNONE() {
      if (!this.Token) {
        this.$$router.push({ path: "/login" });
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
    // 退出登录
    logOut() {
      delCookie("userInfo");
      delCookie("access_token");
      localStorage.removeItem("storeInfo");
      localStorage.removeItem("countNum");
      localStorage.removeItem("countNumS");
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_start_time");
      localStorage.removeItem("userInfo");
      this.$router.push("/login");
    }
  },
  watch: {
    Token(newVal) {
      if (!newVal) {
        this.countNumS = 0;
        this.countNum = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/component/comHeaderScode.less";
</style>

<style lang="scss">
@import "../../assets/css/component/comHeader.less";
</style>



