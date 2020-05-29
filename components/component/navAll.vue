<template>
  <div class="homeNavW">
    <div v-if="navList!=null" id="navContentId" class="navContent" :style="'width:'+navWidth+'px'">
      <div class="nav">
        <nav>
          <div class="navLeft">
            <span class="navAll">全部资源分类</span>
            <div class="navBox">
              <div class="navAll_list">
                <div class="navLeft_hotSale">
                  <h2>
                    <img src="../../assets/img/huo.png" alt /> 当季热卖媒体
                  </h2>
                  <div class="hotSale_top">
                    <ul>
                      <span>热门品牌</span>
                      <li>
                        <nuxt-link
                          :to="`/brand/${itemM.code}?page=1`"
                          target="_blank"
                          v-for="(itemM,index) in PopularBrand"
                          :key="index"
                          :title="itemM.name"
                        >
                          <img :src="envVars.IMG_HOST+itemM.logo" alt :title="itemM.name" />
                        </nuxt-link>
                      </li>
                    </ul>
                    <ul class="ulTow">
                      <span>热门媒体</span>
                      <li class="hotSale_box">
                        <nuxt-link
                          :to="`/service/${itemM.id}?id=${itemM.store_id}`"
                          target="_blank"
                          v-for="(itemM,index)  in popularMedia"
                          :key="index"
                        >
                          <i v-if="itemM.new_status == 1">新</i>
                          <div class="new_hotSale_img" :title="itemM.name">
                            <img
                              :src="envVars.IMG_HOST+itemM.img+'?x-oss-process=image/resize,m_fill,h_114,w_190'"
                              :alt="itemM.name"
                            />
                          </div>
                          <p>{{itemM.name}}</p>
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  class="navLeft_M"
                  v-for="(itemO,index) in navLeftMadio"
                  :key="index"
                  @mouseover="marketblurId(itemO)"
                >
                  <div>
                    <div class="nav_icon_box">
                      <div class="navIcon">
                        <span :class="`icon iconfont icon-${itemO.cate_code}`"></span>
                      </div>
                      <nuxt-link
                        class="navList"
                        :title="itemO.name&&itemO.name"
                        :to="`/category/${itemO.cate_code}?page=1`"
                        target="_blank"
                        @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemO.cate_code}?page=1`,cate_id: itemO.cate_code,rname:'左侧分类',class:'1'}})"
                      >{{itemO.cate_name}}</nuxt-link>
                    </div>
                  </div>
                  <div class="navLeft_M_R">
                    <div class="navLeft_text">
                      <div class="nav_t">
                        <div>
                          <div>
                            <nuxt-link
                              v-for="(itemM,index) in itemO.itemList"
                              :key="index"
                              :to="`/category/${itemM.cate_code}?page=1`"
                              target="_blank"
                              @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'左侧分类',class:'3'}})"
                            >
                              {{itemM.cate_name}}
                              <span class="iconfont icon-you"></span>
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                      <div class="nav_b" v-for="(itemM,index) in itemO.child" :key="index">
                        <nuxt-link
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                          @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'左侧分类',class:'2'}})"
                        >
                          {{itemM.cate_name}}
                          <span class="iconfont icon-you iconS"></span>
                        </nuxt-link>
                        <div class="nav_s">
                          <nuxt-link
                            v-for="(itemM,index) in itemM.child"
                            :to="`/category/${itemM.cate_code}?page=1`"
                            target="_blank"
                            :key="index"
                            :class="{'red': (itemM.inh== 1 )}"
                            @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'左侧分类',class:'3'}})"
                          >{{itemM.cate_name}}</nuxt-link>
                        </div>
                      </div>
                    </div>
                    <div class="nav_img">
                      <div class="navImg_s">
                        <nuxt-link
                          v-for="(itemM,index) in itemO.brand"
                          :to="`/brand/${itemM.code}?cate_code=${itemO.cate_code}&page=1`"
                          target="_blank"
                          class="navImg_b"
                          :key="index"
                        >
                          <img
                            :src="envVars.IMG_HOST+itemM.logo +prefix+'m_fill,h_40,w_90'"
                            :title="itemM.name"
                            :alt="itemM.name"
                          />
                        </nuxt-link>
                      </div>
                      <div target="_blank" class="navImg_b">
                        <nuxt-link
                          v-for="(itemM,index) in itemO.ad"
                          :key="index"
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                        >
                          <img
                            :src="envVars.IMG_HOST+itemM.ad_img+'?x-oss-process=image/resize,m_fill,h_142,w_182'"
                            :title="itemM.name"
                            :alt="itemM.name"
                          />
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div class="navRight">
        <div class="navRight_top">
          <ul>
            <nuxt-link :to="'/shop/list'" tag="li" class="shopHome" target="_blank">
              <a href="/shop/list" target="_blank" rel="noopener noreferrer" class="shop_street">店铺街</a>
            </nuxt-link>
            <div>
              <li
                v-for="(itemM,index) in navList"
                :key="index"
                class="shopHome"
                @mouseover="navMouser(index)"
              >
                <div class="showLi">
                  <nuxt-link
                    :to="`/category/${itemM.cate_code}?page=1`"
                    target="_blank"
                    class="nav_top"
                    @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'右侧分类',class:'1'}})"
                  >
                    <p>{{itemM.cate_name}}</p>
                    <span class="iconfont icon-xiangxia"></span>
                  </nuxt-link>
                  <!-- <div class="navRigtran">
                
                  </div>-->
                </div>
              </li>
              <div class="nav_box_li" :style="'width:'+(Number(navWidth)+20)+'px'">
                <div class="navRightList">
                  <div class="showL">
                    <div class="navCenter" :class="{activeTre:indexTre == 2}">
                      <div class="navCenterS" v-for="(itemM,index) in navLeftChild" :key="index">
                        <nuxt-link
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                          @click.native="cateEventTrack({event_type: 'click', kv: {cate_id: itemM.cate_code,rname:'右侧分类',class:'2'}})"
                        >
                          <svg class="icon svg-icon" aria-hidden="true">
                            <use :xlink:href="`#icon-${itemM.cate_code}`" />
                          </svg>
                          <p>{{itemM.cate_name}}</p>
                          <span class="iconfont icon-xiangyoudianji jiantou"></span>
                        </nuxt-link>
                        <div>
                          <nuxt-link
                            v-for="(itemf , index) in itemM.child"
                            :to="`/category/${itemf.cate_code}?page=1`"
                            target="_blank"
                            :key="index"
                            @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemf.cate_code}?page=1`,cate_id: itemf.cate_code,rname:'右侧分类',class:'3'}})"
                          >
                            <p :class="{'red': (itemf.inh == 1 )}">{{itemf.cate_name}}</p>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                    <div class="navImg">
                      <div>
                        <nuxt-link
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                          v-for="(itemM,index) in navLeftAD"
                          :key="index"
                          :class="{'navIMG':index==1}"
                        >
                          <img
                            :src="envVars.IMG_HOST+itemM.ad_img+'?x-oss-process=image/resize,m_fill,h_140,w_208'"
                            :title="itemM.name"
                            :alt="itemM.name"
                          />
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <nuxt-link tag="li" :to="`/clues?page=1`" class="shopHome shopZHTM" target="_blank">
              <a
                href="/clues?page=1"
                style="color:#f3262d"
                target="_blank"
                rel="noopener noreferrer"
              >广告线索大厅</a>
            </nuxt-link>
            <nuxt-link tag="li" :to="`/post`" class="shopHome shopZHTM" target="_blank">
              <a href="/post" target="_blank" rel="noopener noreferrer">实时上刊大厅</a>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getHeader } from "@/api/common";
import dataEventTrack from "@/utils/dataEventTrack";
export default {
  inject: ["navList", "navLeftMadio", "popularMedia", "PopularBrand"],
  props: {
    navWidth: {
      type: Number,
      default: 1210
    }
  },
  data() {
    return {
      //热门品牌
      // PopularBrand: [],
      //  热门品牌
      // popularMedia: [],
      // 热门媒体
      // navLeftMadio: [],
      // 上边横向导航栏
      // navList: null,
      id: "",
      prefix: "?x-oss-process=image/resize,",
      flag: false,
      timer: null,
      navLeftChild: [],
      navLeftAD: [],
      indexTre: ""
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  mounted() {
    // let navList = localStorage.getItem("navList"),
    //   navLeftMadio = localStorage.getItem("navLeftMadio"),
    //   popularMedia = localStorage.getItem("popularMedia"),
    //   PopularBrand = localStorage.getItem("PopularBrand");
    // if (navList && navLeftMadio && popularMedia && PopularBrand) {
    //   this.navList = JSON.parse(navList);
    //   this.navLeftMadio = JSON.parse(navLeftMadio);
    //   this.popularMedia = JSON.parse(popularMedia);
    //   this.PopularBrand = JSON.parse(PopularBrand);
    // } else {
    //   this.navInit();
    // }
  },
  methods: {
    navMouser(index) {
      this.indexTre = index;
      for (var i = 0; i < this.navList.length; i++) {
        this.navLeftChild = { ...this.navList[index].child };
        this.navLeftAD = this.navList[index].ad;
      }
    },
    navOut(index) {
      this.tabindex = "";
    },
    navLiMou() {
      // this.flagN = true
    },
    navLiOut() {
      //  this.flagN = false
    },
    // async navInit() {
    //   let navData = await getHeader();
    //   const { code, message, data } = navData.data;
    //   if (code != 200) return this.$message.error(message);
    //   this.navLeftMadio = data.cate_left;
    //   this.navList = data.cate_right || [];
    //   this.PopularBrand = data.hot_media && data.hot_media.hot_brand;
    //   this.popularMedia = data.hot_media && data.hot_media.hot_media;
    //   for (var i = 0; i < this.navLeftMadio.length; i++) {
    //     var a = this.navLeftMadio[i].child;
    //     var itemList = [];
    //     this.navLeftMadio[i] = { ...this.navLeftMadio[i], itemList };
    //     if (a) {
    //       for (var j = 0; j < a.length; j++) {
    //         for (var k = 0; k < a[j].child.length; k++) {
    //           if (a[j].child[k].inh == 1 && a[j].child[k].pid == a[j].id) {
    //             this.navLeftMadio[i].itemList.push(a[j].child[k]);
    //           }
    //         }
    //       }
    //     }
    //   }
    //   localStorage.setItem("navLeftMadio", JSON.stringify(this.navLeftMadio));
    //   localStorage.setItem("popularMedia", JSON.stringify(this.popularMedia));
    //   localStorage.setItem("navList", JSON.stringify(this.navList));
    //   localStorage.setItem("PopularBrand", JSON.stringify(this.PopularBrand));
    // },
    marketblurId(itemM) {
      this.id = itemM.id;
    },
    cateEventTrack(data) {
      dataEventTrack(data);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/component/navAllScode.less";
</style>
<style lang="less">
.homeNavW {
  a:hover {
    text-decoration: unset;
  }
  a {
    color: #333;
  }
}
</style>
