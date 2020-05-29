<template>
  <div class="homeNavW">
    <div class="navContent">
      <div class="nav">
        <nav>
          <div class="navLeft">
            <span class="navAll">全部资源分类</span>
            <div class="navAll_list">
              <div class="navLeft_hotSale">
                <h2>
                  <img src="../../assets/img/huo.png" alt /> 当季热卖媒体
                </h2>
                <div class="hotSale_top">
                  <ul v-if="hotMedia.hot_brand.length>0">
                    <span>热门品牌</span>
                    <li>
                      <div v-for="(itemM,index) in hotMedia.hot_brand" :key="index">
                        <nuxt-link
                          :to=" `/brand/${itemM.code}?page=1`"
                          target="_blank"
                          :title="itemM&&itemM.name"
                        >
                          <img :src="envVars.IMG_HOST+itemM.logo" :alt="itemM&&itemM.name" />
                        </nuxt-link>
                      </div>
                    </li>
                  </ul>
                  <ul class="ulTow" v-if="hotMedia.hot_media.length>0">
                    <span>热门媒体</span>
                    <div class="hotSale_box">
                      <div v-for="(itemM,index)  in hotMedia.hot_media" :key="index">
                        <nuxt-link
                          :to="'service/'+itemM.id+'?id='+itemM.store_id
                          "
                          :title="itemM&&itemM.name"
                          target="_blank"
                        >
                          <i v-if="itemM.new_status == 1">新</i>
                          <div class="new_hotSale_img">
                            <img
                              v-lazy="itemM.img+'?x-oss-process=image/resize,m_fill,h_114,w_190'"
                              src="~/assets/img/img_bg.png"
                              :alt="itemM&&itemM.name"
                            />
                          </div>
                          <p>{{itemM&&itemM.name}}</p>
                        </nuxt-link>
                      </div>
                    </div>
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
                  <div>
                    <div class="navIcon">
                      <span :class="`icon iconfont icon-${itemO.cate_code}`"></span>
                    </div>
                    <nuxt-link
                  
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
                        <ul>
                          <li v-for="(itemM,index) in itemO.itemList" :key="index">
                            <nuxt-link
                              :title="itemM.name&&itemM.name"
                              :to="`/category/${itemM.cate_code}?page=1`"
                              target="_blank"
                              @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'左侧分类',class:'3'}})"
                            >{{itemM.cate_name}}</nuxt-link>
                            <span class="iconfont icon-you"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="nav_b" v-for="(itemM,index) in itemO.child" :key="index">
                      <nuxt-link
                        :title="itemM.name&&itemM.name"
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
                          :key="index"
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                          :class="{'red': (itemM.inh== 1 )}"
                          @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'左侧分类',class:'3'}})"
                        >{{itemM.cate_name}}</nuxt-link>
                      </div>
                    </div>
                  </div>

                  <div class="nav_img" v-if="itemO.brand">
                    <div class="navImg_s">
                      <div v-for="(itemM,index) in itemO.brand" :key="index">
                        <nuxt-link
                          :title="itemM.name"
                          :to="`/brand/${itemM.code}?cate_code=${itemO.cate_code}&page=1`"
                          target="_blank"
                        >
                          <img
                            src="~/assets/img/img_bg.png"
                            v-lazy="itemM.logo+'?x-oss-process=image/resize,m_fill,h_40,w_90'"
                            :alt="itemM.name&&itemM.name"
                          />
                        </nuxt-link>
                      </div>
                    </div>
                    <div class="navImg_b" v-if="itemO.ad">
                      <div v-for="(itemM,index) in itemO.ad" :key="index">
                        <nuxt-link
                          :title="itemM.name&&itemM.name"
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                        >
                          <img
                            v-lazy="itemM.ad_img+'?x-oss-process=image/resize,m_fill,h_142,w_182'"
                            :alt="itemM.name&&itemM.name"
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
              <a href="/shop/list" target="_blank" rel="noopener noreferrer">店铺街</a>
            </nuxt-link>
            <div>
              <li
                v-for="(itemM,index) in cateRight"
                :key="index"
                class="shopHome"
                @mousemove="navMouser(index)"
              >
                <div class="showLi">
                  <nuxt-link
                    :title="itemM&&itemM.name&&itemM.name"
                    :to="`/category/${itemM.cate_code}?page=1`"
                    class="nav_top"
                    target="_blank"
                    @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'右侧分类',class:'1'}})"
                  >
                    <p>{{itemM.cate_name}}</p>
                    <span class="iconfont icon-xiangxia"></span>
                  </nuxt-link>
                  <!-- <div class="navRigtran"> -->
                  <!-- <div class="navRightList">
                    <div class="showL">
                      <div class="navCenter">
                        <div class="navCenterS" v-for="(itemM,index) in itemM.child" :key="index">
                          <nuxt-link
                            class="navCenterFirst"
                            :title="itemM&&itemM.name"
                            :to="`/category/${itemM.cate_code}?page=1`"
                            target="_blank"
                            @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'右侧分类',class:'2'}})"
                          >
                            <svg class="icon svg-icon" aria-hidden="true">
                              <use :xlink:href="`#icon-${itemM.cate_code}`" />
                            </svg>
                            <p>{{itemM.cate_name}}</p>
                            <span class="iconfont icon-xiangyoudianji jiantou"></span>
                          </nuxt-link>
                          <div>
                            <nuxt-link
                              :title="itemM&&itemM.name"
                              :to="`/category/${itemM.cate_code}?page=1`"
                              v-for="(itemM, index) in itemM.child"
                              :key="index"
                              target="_blank"
                              @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'右侧分类',class:'3'}})"
                            >
                              <p :class="{'red': (itemM.inh== 1 )}">{{itemM.cate_name}}</p>
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                      <div class="navImg">
                        <div>
                          <div v-for="(itemM,index) in itemM.ad" :key="index">
                            <nuxt-link :to="`/category/${itemM.cate_code}?page=1`" target="_blank">
                              <img
                                src="~/assets/img/img_bg.png"
                                v-lazy="itemM.ad_img+'?x-oss-process=image/resize,m_fill,h_140,w_208'"
                                :title="itemM&&itemM.name"
                                :alt="itemM&&itemM.name"
                              />
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>-->
                  <!-- </div> -->
                </div>
              </li>
              <div class="nav_box_li">
                <div class="navRightList">
                  <div class="showL">
                    <div class="navCenter" :class="{activeTre:indexTre == 2}">
                      <div class="navCenterS" v-for="(itemM,index) in navLeftChild" :key="index">
                        <nuxt-link
                          class="navCenterFirst"
                          :title="itemM&&itemM.name"
                          :to="`/category/${itemM.cate_code}?page=1`"
                          target="_blank"
                          @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'右侧分类',class:'2'}})"
                        >
                          <svg class="icon svg-icon" aria-hidden="true">
                            <use :xlink:href="`#icon-${itemM.cate_code}`" />
                          </svg>
                          <p>{{itemM.cate_name}}</p>
                          <span class="iconfont icon-xiangyoudianji jiantou"></span>
                        </nuxt-link>
                        <div>
                          <nuxt-link
                            :title="itemM&&itemM.name"
                            :to="`/category/${itemM.cate_code}?page=1`"
                            v-for="(itemM, index) in itemM.child"
                            :key="index"
                            target="_blank"
                            @click.native="cateEventTrack({event_type: 'click', kv: {router:`/category/${itemM.cate_code}?page=1`,cate_id: itemM.cate_code,rname:'右侧分类',class:'3'}})"
                          >
                            <p :class="{'red': (itemM.inh== 1 )}">{{itemM.cate_name}}</p>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                    <div class="navImg">
                      <div>
                        <div
                          v-for="(itemM,index) in navLeftAD"
                          :key="index"
                          :class="{'navIMG':index==1}"
                        >
                          <nuxt-link :to="`/category/${itemM.cate_code}?page=1`" target="_blank">
                            <img
                              src="~/assets/img/img_bg.png"
                              v-lazy="itemM.ad_img+'?x-oss-process=image/resize,m_fill,h_140,w_208'"
                              :title="itemM&&itemM.name"
                              :alt="itemM&&itemM.name"
                            />
                          </nuxt-link>
                        </div>
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

          <!-- <span class="shopHome shopZHTM">
            置换特卖
            <p>此功能暂未开放，敬请期待</p>
          </span>-->
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
  inject: ["cateleft", "cateRight", "hotMedia"],
  data() {
    return {
      navLeftMadio: [],
      id: "",
      flag: false,
      timer: null,
      time: 1,
      navLeftChild: [],
      navLeftAD: [],
      indexTre: ""
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  created() {
    this.navLeftAll();
  },
  mounted() {},
  methods: {
    navMouser(index) {
      for (var i = 0; i < this.cateRight.length; i++) {
        this.indexTre = index;
        this.navLeftChild = this.cateRight[index].child;
        this.navLeftAD = this.cateRight[index].ad;
      }
    },
    navLeftAll() {
      this.navLeftMadio = this.cateleft;
      for (var i = 0; i < this.navLeftMadio.length; i++) {
        var a = this.navLeftMadio[i].child;
        var itemList = [];
        this.navLeftMadio[i] = { ...this.navLeftMadio[i], itemList };
        if (a) {
          for (var j = 0; j < a.length; j++) {
            for (var k = 0; k < a[j].child.length; k++) {
              if (a[j].child[k].inr == 1 && a[j].child[k].pid == a[j].id) {
                this.navLeftMadio[i].itemList.push(a[j].child[k]);
              }
            }
          }
        }
      }
    },

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
@import "../../assets/css/ltzmIndex/homeNavScode.less";
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
