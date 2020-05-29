<template>
  <div class="findMedia">
    <div class="findMedia_boot">
      <div class="findMedia_bottom findMedia_one">
        <div class="red_flashTop">
          <span>{{article[0].name}}</span>
          <ul class="tabs user_select">
            <li
              class="tab"
              :class="{active:index==selectIndex}"
              v-for="(item,index) in article[0].child"
              :key="index"
              v-on:mouseover="mouseoverActive($event,item,index)"
              v-on:mouseout="removeActive($event,item,index)"
            >
              <span>{{item.name}}</span>
              <div class="List">
                <ul>
                  <li v-for="(itemL , index)  in item.list" :key="index">
                    <div class="indexOne" v-if="index == 0">
                      <nuxt-link :to="'/news/'+itemL.id" target="_blank">
                        <img
                          src="~/assets/img/img_bg.png"
                          v-lazy="itemL.cover+'?x-oss-process=image/resize,m_fill,h_80,w_120'"
                          alt
                        />
                      </nuxt-link>
                      <div class="contant">
                        <p>
                          <nuxt-link :to="'/news/'+itemL.id" target="_blank">{{itemL.title}}</nuxt-link>
                        </p>
                        <p>{{itemL.date}}</p>
                      </div>
                    </div>
                    <div class="indexElse" v-else>
                      <p>·</p>
                      <nuxt-link :to="'/news/'+itemL.id" target="_blank">{{itemL.title}}</nuxt-link>
                    </div>
                  </li>
                </ul>
                <nuxt-link tag="a" to="/news" target="_blank">
                  MORE
                  <span class="iconfont icon-you"></span>
                  <span class="iconfont icon-you"></span>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="findMedia_bottom findMedia_two">
        <div class="red_flashTop">
          <span>{{article[1].name}}</span>
          <ul class="tabs user_select">
            <li
              class="tab"
              :class="{active:index==twoIndex}"
              v-for="(itemT,index) in article[1].child"
              :key="index"
              v-on:mouseover="mouseoverTowActive($event,itemT,index)"
              v-on:mouseout="removeTowActive($event,itemT,index)"
            >
              <span>{{itemT.name}}</span>
              <div class="List">
                <ul>
                  <li v-for="(itemL , index)  in itemT.list" :key="index">
                    <div class="indexOne" v-if="index == 0">
                      <nuxt-link :to="'/news/'+itemL.id" :title="itemL.title" target="_blank">
                        <img
                          src="~/assets/img/img_bg.png"
                          v-lazy="itemL.cover+'?x-oss-process=image/resize,m_fill,h_80,w_120'"
                          alt
                        />
                      </nuxt-link>
                      <div class="contant">
                        <p>
                          <nuxt-link :to="'/news/'+itemL.id" target="_blank">{{itemL.title}}</nuxt-link>
                        </p>
                        <p>{{itemL.date}}</p>
                      </div>
                    </div>
                    <div class="indexElse" v-else>
                      <p>·</p>
                      <nuxt-link
                        :to="'/news/'+itemL.id"
                        :title="itemL.title"
                        target="_blank"
                      >{{itemL.title}}</nuxt-link>
                    </div>
                  </li>
                </ul>
                <nuxt-link tag="a" to="/news" target="_blank">
                  MORE
                  <span class="iconfont icon-you"></span>
                  <span class="iconfont icon-you"></span>
                </nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="findMedia_bottom findMedia_thr">
        <div class="red_flashTop">
          <div>
            <span>加入VIP</span>
            <span>订单速配，成交量翻倍！</span>
          </div>
          <router-link
            :to="{ path: '/tollMarket/marketShop/marketShop', query: { id: 1 }}"
            target="_blank"
          >
            <button>马上开通VIP会员</button>
          </router-link>
        </div>
        <div class="red_flashBot animat">
          <div>今日雇佣任务看板</div>
          <div class="scoll">
            <ul :class="{animateadMediathr}" v-if="serviceBuyList.length >0">
              <li v-for="(item , index) in serviceBuyList" :key="index">
                <i>{{item.nick_name}}</i> 雇佣了
                <nuxt-link :to="{ path: '/shop/'+item.store_id}" target="_blank" class="show_color">
                  <i>{{item.store_name}}</i>
                </nuxt-link>
                <i>￥{{parseInt(item.amount)}}</i>
                <nuxt-link
                  :to="{path: '/service/'+item.sid,
                                query: {id:item.store_id}}"
                  target="_blank"
                  class="show_color"
                >
                  <i>{{item.service_name}}</i>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  inject: ["dealAmount", "orderUser", "notice", "article", "serviceBuyList"],

  data() {
    return {
      animateadTop: false,
      animateadMoney: false,
      animateadPep: false,
      animateadMediathr: false,
      selectIndex: 0,
      twoIndex: 0,
      findMediathr: [],
      mediTime:null
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  methods: {
    showMediathr() {
      this.animateadMediathr = true;
      setTimeout(() => {
        if (this.findMediathr.length > 0) {
          this.findMediathr.push(this.findMediathr[0]);
          this.findMediathr.shift();
        }
        this.animateadMediathr = false;
      }, 1000);
    },
    mouseoverActive($event, item, index) {
      this.selectIndex = index;
    },
    removeActive($event, item, index) {
      this.selectIndex = index;
    },
    mouseoverTowActive($event, itemT, index) {
      this.twoIndex = index;
    },
    removeTowActive($event, itemT, index) {
      this.twoIndex = index;
    },
    // 跳转新闻资讯详情页
    newsAction(itemL, id) {
      this.$router.push({
        path: "/news/" + id
      });
    },
    buttonVip() {
      var id = 1;
      this.$router.push({
        path: "/tollMarket/marketShop/marketShop",
        query: { id: id }
      });
    },
    shopIndex(item) {
      this.$router.push({ path: "/shop/" + item.store_id });
    },
    serIndex(item) {
      this.$router.push({
        path: "/service/"+item.sid,
        query: { id: item.store_id }
      });
    }
  },
  mounted() {
    // 滚动
    this.findMediathr = this.serviceBuyList;
    if (this.findMediathr.length >= 8) {
      this.mediTime =  setInterval(this.showMediathr, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.showMediathr);
    clearInterval(this.mediTime);
  }
};
</script>
<style lang="less">
@import "../../assets/css/ltzmIndex/findMediaScode.less";
</style>
