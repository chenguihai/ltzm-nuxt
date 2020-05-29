<template>
  <div class="recommended">
    <!-- 店铺推荐/猜你喜欢 -->
    <div class="shop">
      <div class="shop_top">
        ———
        <p>店铺推荐</p>———
      </div>
      <div class="shop_center">
        <div class="shop_img">
          <div>
            <img @click="shopClickL()" v-lazy="shopAdList.ad_img" alt />
          </div>
          <div>
            <img
              v-for="itemImg in shopListImg"
              :key="itemImg.id"
              @click="shopClick(itemImg , itemImg.id)"
              v-lazy="itemImg.logo"
              alt
              v-if="itemImg.logo != null"
            />
            <img v-else src="../../assets/img/userDataImg.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="like">
      <div class="shop_top">
        ———
        <p>猜你喜欢</p>———
      </div>
      <div class="lick_center">
        <div v-for="(item ,index) in lickList" :key="index" @click="lickClick(item, item.id)">
          <li>
            <img
              v-if="item.img != null && item.img != ''"
              v-lazy="item.img"
              alt
            />
            <img src="../../assets/img/img_bg.png" alt />
          </li>
          <li>
            <p>{{item.name}}</p>
          </li>
          <li>
            <p>{{item.price}}<span>/{{item.unit}}</span></p>
          </li>
        </div>
      </div>
    </div>
    <div class="botTab">
      <div class="botTab_cen">
        <li>
          <svg class="icon iconA" aria-hidden="true">
            <use xlink:href="#icon-faburenwu" class="ccccc" />
          </svg>
          <p>10秒发布任务</p>
        </li>
        <li>
          <svg class="icon iconB" aria-hidden="true">
            <use xlink:href="#icon-shijian" class="ccccc" />
          </svg>
          <p>15秒电子签约</p>
        </li>
        <li>
          <svg class="icon iconC" aria-hidden="true">
            <use xlink:href="#icon-zhongjianhuanjie" class="ccccc" />
          </svg>
          <p>去除中间环节</p>
        </li>
        <li>
          <svg class="icon iconD" aria-hidden="true">
            <use xlink:href="#icon-gouwuche1" class="ccccc" />
          </svg>
          <p>海量客户采购</p>
        </li>
        <li>
          <svg class="icon iconE" aria-hidden="true">
            <use xlink:href="#icon-meitiliulan" class="ccccc" />
          </svg>
          <p>10000+媒体资源浏览</p>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["shopAd", "shopList", "guessLike"],
  data() {
    return {
      shopAdList: {},
      shopListImg: [],
      lickList: []
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  mounted() {
    this.shopAdList = this.shopAd[0];
    this.shopListImg = this.shopList;
    this.lickList = this.guessLike;
  },
  methods: {
    shopClick(itemImg) {
      // 跳转店铺首页
      this.$router.push({ path: "/shop/" + itemImg.id });
    },
    shopClickL() {
      // 跳转店铺首页
      this.$router.push({ path: "/shop/" + this.shopAdList.id });
    },
    // 跳转服务详情页
    lickClick(item, id) {
      var { href } = this.$router.resolve({
        path: "service/"+ item.id,
        query: {id:item.store_id}
      });
      window.open(href, "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
// @import "../../assets/css/ltzmIndex/recommendedScode.less";
</style>