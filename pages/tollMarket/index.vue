<template>
  <div class="tollMarket">
    <comHeader />
    <navAll />
    <div class="toll_market">
      <div class="banner">
        <img :src="(envVars.IMG_HOST+'/'+bannerImg)" alt />
      </div>
      <div class="dynamicState" v-if="scrollListMoney!=null">
        <p>购买动态：</p>
        <div class="dealScroll">
          <ul :class="{animateadMoney}">
            <li v-for="item in scrollListMoney" :key="item.id">
              <p>{{item.store_name}}</p>
              <p>在{{item.updated_at}}购买了</p>
              <p>{{item.type_name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="market_list" v-if="marketList!=null">
        <a v-for="item in marketList" :key="item.id" :href="`/tollMarket/marketShop/marketShop?id=${item.id}`">
          <div>
            <img :src="(envVars.IMG_HOST+'/'+item.tool_img)" alt />
          </div>
          <div>
            <span>{{item.tool_name}}</span>
            <span>
              ￥
              <p>{{item.price}}</p>起
            </span>
          </div>
          <div>
            <div>
              支持平台：
              <svg class="icon icon_dn" aria-hidden="true" v-if="item.support_platform!=2">
                <use xlink:href="#icon-gongjushichang-diannao" class="aaaaa" />
              </svg>
              <svg class="icon icon_sj" aria-hidden="true" v-if="item.support_platform!=1">
                <use xlink:href="#icon-gongjushichang-shouji" class="ccccc" />
              </svg>
            </div>
            <div>
              购买人数
              <p>{{item.deal_num}}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "~/components/component/comHeader";
import comFooter from "~/components/component/comFooter";
import navAll from "~/components/component/navAll";
import sideBar from "@/components/sideBar";
import { toolsList } from "@/api/list";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      envVars: "envVariables",
    }),
  },
  components: {
    comHeader,
    comFooter,
    navAll,
    sideBar
  },
  data() {
    return {
      bannerImg: "",
      scrollListMoney: null,
      flag: false,
      flaga: false,
      animateadMoney: false,
      marketList: null
    };
  },
  created() {
    this.init();
    setInterval(this.showMoney, 2000);
  },
  beforeDestroy() {
    clearInterval(this.showMoney); // 清除定时器
  },
  methods: {
    // 工具市场列表
    async init() {
      let toolData = await toolsList()
      const {code , message , data} = toolData.data
      if(code != 200) return this.$message.error(message)
        this.marketList = data.data || [];
            this.bannerImg = data.ad;
            this.scrollListMoney = data.dynamic || [];
    },
    showMoney() {
      this.animateadMoney = true;
      if (this.scrollListMoney != null) {
        setTimeout(() => {
          this.scrollListMoney.push(this.scrollListMoney[0]);
          this.scrollListMoney.shift();
          this.animateadMoney = false;
        }, 1000);
      }
    },
  }
};
</script>
<style lang="less" scoped>
@import "tollMarketScode.less";
</style>
