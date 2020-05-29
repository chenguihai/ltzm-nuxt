<template>
  <!-- 我是凌客，接单赚钱 -->
  <div class="orderReceiving">
    <div class="orderReceiving_top">
      <span>我是凌客，接单赚钱</span>
      <ul>
        <li class="hint_li">温馨小贴士：</li>
        <li @click="helpClick()">凌客新手帮助</li>
        <li @click="lkpdClick()">凌客频道</li>
        <li @click="buttonVip()">VIP特权频道</li>
      </ul>
    </div>
    <div class="orderReceiving_cen">
      <div>
        <div class="zzcBox">
          <span>需求大厅</span>
        </div>
        <div
          class="swiper-container"
          style="height:122px;overflow: hidden;"
          v-swiper:swiper="swiperOption"
        >
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="itemI in adDealHall" :key="itemI.id">
              <img :src="envVars.IMG_HOST+itemI.ad_img" alt />
            </div>
          </div>
        </div>
        <div class="demanda_con">
          <div class="demanda" v-for="(item , index) in clueList" :key="index">
            <div class="demand">
              <span>{{item.cate_name}}的需求</span>
              <div class="solid"></div>
              <div class="demandList">
                <ul class="demandUl">
                  <a
                    class="demanLi"
                    v-for="itemL in item.list"
                    :key="itemL.id"
                    :href="'/clues/'+itemL.id"
                    target="_blank"
                  >
                    <p>
                      ￥{{parseInt(itemL.money)}}
                      <i>{{itemL.title}}</i>
                    </p>
                    <p>{{itemL.deal_num}}人购买线索</p>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a tag="div" class="red_left" href="/clues?page=1">需 求 大 厅</a>
      </div>
      <div>
        <el-carousel height="122px" arrow="never" indicator-position="none">
          <el-carousel-item v-for="item in adDealRight" :key="item.id">
            <img v-lazy="item.ad_img" alt />
          </el-carousel-item>
        </el-carousel>
        <div class="dealHome">
          <ul>
            <li v-for="(item , index) in clueBuyList" :key="index">
              <a :href="'/shop/' + (item ? item.shop_id :'')" target="_blank">
                <img
                  v-if="item.logo"
                  data-resize="m_fill,h_50,w_50"
                  :src="envVars.IMG_HOST+item.logo"
                />
                <img v-else src="@/assets/img/userDataImg.png" />
              </a>

              <div>
                <div class="dealHome_top">
                  <img class="imgIcon" v-if="item.icon != ''" v-lazy="item.icon" alt />
                  <a
                    class="shopClick"
                    :href="'/shop/' + (item ? item.shop_id :'')"
                    target="_blank"
                    v-bind:title="item.store_name"
                  >{{item.store_name}}</a>
                  <p class="buyShop">购买了</p>
                </div>
                <div class="dealHome_bott">
                  <p>￥{{parseInt(item.budget_money)}}</p>
                  <a
                    :href="`/clues/${item.clue_id}`"
                    v-bind:title="item.buy_name"
                    target="_blank"
                  >{{item.buy_name}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <a class="dealBot" :href="'/tollMarket/marketShop/marketShop?id=1'" target="_blank">
          <img v-lazy="adDealSmall[0].ad_img" alt />
        </a>
        <a tag="div" class="red_right" href="/clues?page=1">前往交易大厅</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import Swiper from "swiper";
export default {
  inject: [
    "adDealHall",
    "adDealRight",
    "adDealSmall",
    "clueBuyList",
    "clueList",
    "hotRank"
  ],
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      flag: false,
      adDealHallImg: [],
      adDealRightImg: [],
      adDealSmallImg: {},
      demandName: [],
      dealHome: [],
      selectIndex: 0,
      tabArr: ["热销排行", " 热门推荐", "平台精选", "新品上市"],
      navListHot: [],
      navListHotRank: [],
      navListNew: [],
      navListQua: [],
      swiperOption: {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        //设置固定宽度，隐藏时初始化swiper
        width: 800,
        //设置宽度为全屏
        height: 125
      }
    };
  },
  methods: {
    mouseoverTowActive($event, item, index) {
      this.selectIndex = index;
    },
    removeTowActive($event, item, index) {
      this.selectIndex = index;
    },
    // 跳转线索详情页
    threadClick(itemL) {
      var { href } = this.$router.resolve({
        path: "/clues/" + itemL.id
      });
      window.open(href, "_blank");
    },
    helpClick() {
      var { href } = this.$router.resolve({
        path: "/help",
        query: { id: 32 }
      });
      window.open(href, "_blank");
    },
    lkpdClick() {
      var { href } = this.$router.resolve({ path: "/shop/list" });
      window.open(href, "_blank");
    },
    buttonVip() {
      var id = 1;
      var { href } = this.$router.resolve({
        path: "/tollMarket/marketShop/marketShop",
        query: { id: id }
      });
      window.open(href, "_blank");
    }
  },
  mounted() {
    this.adDealHallImg = this.adDealHall;
    this.adDealRightImg = this.adDealRight;
    this.adDealSmallImg = { ...this.adDealSmall[0] };
    this.navListHot = [...this.hotRank.hot];
    this.navListHotRank = [...this.hotRank.hot_rank];
    this.navListNew = [...this.hotRank.new];
    this.navListQua = [...this.hotRank.qua];
    this.demandName = this.clueList;
    this.dealHome = this.clueBuyList;
    // var mySwiper = new Swiper(".swiper-container-1", {
    //   autoplay: true, //可选选项，自动滑动
    //   loop: true,
    //   //设置固定宽度，隐藏时初始化swiper
    //   width: 800,
    //   //设置宽度为全屏
    //   height: 125
    // });
  }
};
</script>
<style lang="less">
@import "../../assets/css/ltzmIndex/orderReceivingScode.less";
</style>
<style lang="less">
.orderReceiving {
  .orderReceiving_cen {
    & > div:nth-child(1) {
      .el-carousel {
        margin-bottom: 15px;

        .el-carousel__container {
          .el-carousel__item {
            img {
              height: 122px;
              margin: 0 auto;
            }
          }
        }
      }
    }

    & > div:nth-child(2) {
      .el-carousel {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>