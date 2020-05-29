<template>
  <div class="container">
    <homeNav v-if="cateleft && cateleft.length" />
    <div style="height:551px;position:relative;">
      <lt-carousel :adTopLarge="adTopLarge" v-if="adTopLarge && adTopLarge.length" />
      <div class="user_data" v-if="floorData != undefined && floorData.length > 0 && showData">
        <div class="userData">
          <div class="userData_top">
            <div class="userDataImg">
              <img
                v-if="userInfoData.avatar"
                :src="userInfoData.avatar.indexOf('http')==-1?envVars.IMG_HOST+userInfoData.avatar:userInfoData.avatar"
              />
              <img v-else src="../assets/img/icon_sign_mobile.jpg" />
            </div>
            <div class="user_Data">
              <div>
                <span>Hi~</span>
                <router-link
                  :to="'/userCenter/homePages'"
                  v-if="userInfoData&&userInfoData.nick_name"
                >
                  <span class="nick_names">&nbsp;{{userInfoData&&userInfoData.nick_name}}&nbsp;</span>
                </router-link>
                <span>欢迎来到凌天众媒网</span>
              </div>
              <div class="login_y" v-if="tokenY == 2">
                <p class="dataJ" v-if="shop_info&&shop_info.shop_level  ">
                  <img :src="envVars.IMG_HOST+shop_info.shop_level.icon" alt />
                  <i>{{shop_info.shop_level.bl_name}}</i>
                </p>
                <p
                  v-if="shop_info&&shop_info.type_id !== null && shop_info.type_id ==1"
                  class="typeId"
                >个人</p>
                <p
                  v-if="shop_info&&shop_info.type_id !== null && shop_info.type_id ==2"
                  class="typeIdq"
                >企业</p>
                <img
                  class="icon_z"
                  v-if="shop_info&&shop_info.vip_level"
                  :src="envVars.IMG_HOST+shop_info.vip_level"
                  alt
                />
              </div>
              <div class="login_token" v-else>
                <nuxt-link tag="span" to="/login">登录</nuxt-link>
                <nuxt-link tag="span" to="/register">注册</nuxt-link>
              </div>
            </div>
          </div>
          <div class="userData_center">
            <div @click="tollMarketClick()">
              <div class="gjImg"></div>
              <nuxt-link to="/tollMarket" target="_blank">工具市场</nuxt-link>
              <img src="../assets/img/H.png" alt />
            </div>
            <div @click="tollClick()">
              <div class="kdImg"></div>
              <a>开店必备</a>
            </div>
            <div @click="unopenClick()">
              <div class="yhImg"></div>
              <a>优惠活动</a>
              <span v-if="flag" class="unopen">此功能暂未开放，敬请期待！</span>
            </div>
          </div>
          <div class="userData_bottom">
            <ul class="userDataTab">
              <li
                class="userTab"
                :class="{active:index ==selectIndex}"
                v-for="(item,index) in tabArr"
                :key="index"
                v-on:mouseover="mouseoverActive($event,item,index)"
                v-on:mouseout="removeActive($event,item,index)"
              >{{item}}</li>
            </ul>
            <div class="dataList" v-if="selectIndex==0">
              <nuxt-link
                class="dataL"
                v-for="Item in dataItem"
                :to="{path: '/shop/'+Item.id}"
                :key="Item.id"
                target="_blank"
              >
                <img
                  src="~/assets/img/userDataImg.png"
                  :alt="Item.store_name"
                  v-lazy="Item.logo+'?x-oss-process=image/resize,m_fill,h_40,w_40'"
                />
                <ul>
                  <li>{{Item.store_name}}</li>
                  <li class="moneyLi">￥{{parseInt(Item.amount)}}</li>
                </ul>
              </nuxt-link>
            </div>
            <div class="dataList" v-else-if="selectIndex==1">
              <nuxt-link
                class="dataL"
                v-for="Item in dataItemC"
                :to="{path: '/shop/'+Item.id}"
                :key="Item.id"
                target="_blank"
              >
                <img
                  src="~/assets/img/userDataImg.png"
                  :alt="Item.store_name"
                  v-lazy="Item.logo+'?x-oss-process=image/resize,m_fill,h_40,w_40'"
                />
                <ul>
                  <li>{{Item.store_name}}</li>
                  <li class="moneyLi">
                    <span style="color:#333;font-weight:400">缴纳保证金:</span>
                    ￥{{parseInt(Item.amount)}}
                  </li>
                </ul>
              </nuxt-link>
            </div>
            <div class="dataList" v-else-if="selectIndex==2">
              <nuxt-link
                class="dataL"
                v-for="Item in dataItemB"
                :to="{path: '/shop/'+Item.id}"
                :key="Item.id"
                target="_blank"
              >
                <img
                  src="~/assets/img/userDataImg.png"
                  v-lazy="Item.logo+'?x-oss-process=image/resize,m_fill,h_40,w_40'"
                  :alt="Item.store_name"
                />
                <ul>
                  <li>{{Item.store_name}}</li>
                  <li>
                    <span class="font-c">店铺销量：</span>
                    <b>{{Item.amount}}</b>
                  </li>
                </ul>
              </nuxt-link>
            </div>
            <div class="dataList" v-else-if="selectIndex==3">
              <nuxt-link
                class="dataL"
                v-for="Item in dataItemA"
                :to="{path: '/shop/'+Item.id}"
                :key="Item.id"
                target="_blank"
              >
                <img
                  src="~/assets/img/userDataImg.png"
                  :alt="Item.store_name"
                  v-lazy="Item.logo+'?x-oss-process=image/resize,m_fill,h_40,w_40'"
                />
                <ul>
                  <li>{{Item.store_name}}</li>
                  <li>
                    <span class="good_num">
                      <span class="font-c">好评数：</span>
                      <b>{{Item.amount}}</b>
                    </span>
                    <span>
                      <span class="font-c">好评率：</span>
                      <b>{{Item.rate}}%</b>
                    </span>
                  </li>
                </ul>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--四小块 -->
    <div class="index-wrap">
      <div class="index-box">
        <div class="inner">
          <nuxt-link to="/clues?page=1" class="item" target="_blank">
            <div class="img-box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ad" class="ccccc" />
              </svg>
            </div>
            <div class="text-box">
              <p>
                <span>全国广告线索大厅</span>
                <img src="~assets/img/huo.png" alt />
              </p>
              <p>广告有求必应</p>
            </div>
          </nuxt-link>
        </div>
        <div class="inner">
          <div class="item unopenClick" @click="unopenClickac()">
            <div class="img-box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-renwu" class="ccccc" />
              </svg>
            </div>
            <div class="text-box">
              <p>
                <span>任务需求大厅</span>
              </p>
              <p>免费接单赚钱</p>
            </div>
            <span v-if="flagd" class="unopen unopenGG">此功能暂未开放，敬请期待！</span>
          </div>
        </div>
        <div class="inner">
          <nuxt-link to="/post" class="item unopenClick" target="_blank">
            <div class="img-box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sheying" class="ccccc" />
              </svg>
            </div>
            <div class="text-box">
              <p>
                <span>媒体实时上刊画面</span>
              </p>
              <p>海量画面优选</p>
            </div>
            <span v-if="flaga" class="unopen unopenGG">此功能暂未开放，敬请期待！</span>
          </nuxt-link>
        </div>
        <div class="inner">
          <div @click="unopenClickb()" class="item unopenClick">
            <div class="img-box">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-deng" class="ccccc" />
              </svg>
            </div>
            <div class="text-box">
              <p>
                <span>全球创意广告鉴赏</span>
              </p>
              <p>各类创意绽放色彩</p>
            </div>
            <span v-if="flagb" class="unopen unopenGG">此功能暂未开放，敬请期待！</span>
          </div>
        </div>
      </div>
    </div>
    <div class="findMedia_top">
      <div class="dealScroll">
        <ul :class="{animateadMoney}" v-if="scrollListMoney.length >0">
          <li v-for="item in scrollListMoney" :key="item.id">
            <span>￥{{item.a}}</span>
            <span>询价总额（元）</span>
          </li>
        </ul>
      </div>
      <div class="notice_center">
        <span>找适合的媒体，投专业的广告</span>
        <div class="findMedia_div" v-if="scrollList.length >0">
          <i>———</i>
          <p class="notice">公告：</p>
          <div class="scrolls">
            <ul :class="{animateadTop}" v-if="scrollList.length >0">
              <li v-for="item in scrollList" :key="item.id">
                <nuxt-link tag="a" target="_blank" :to="`/news/${item.id}`">{{item.title}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="notice_ri">
            <span class="iconfont icon-you"></span>
          </div>
          <i>———</i>
        </div>
      </div>
      <div class="notice_rig">
        <ul :class="{animateadPep}" v-if="scrollListPep.length >0">
          <li v-for="item in scrollListPep" :key="item.id">
            <span>{{item.b}}</span>
            <span>人在平台找到广告位</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="orderReceiving_bottom">
      <ul class="tabs user_select">
        <li
          class="tab"
          :class="{active:index==selectIndex_1}"
          v-for="(item, index) in tabArr_2"
          :key="index"
          v-on:mouseover="mouseoverHotActive($event,item,index)"
          v-on:mouseout="removeHotActive($event,item,index)"
        >
          <span>{{item}}</span>
          <img src="~assets/img/jiantou.png" class="arrows" alt />
        </li>
      </ul>
      <div class="nav_flashBot" v-show="selectIndex_1==0">
        <nuxt-link
          class="nav_center"
          v-for="item in hotRank.new"
          :key="item.id"
          :to="{path:'service/'+ item.id,query: {id:item.store_id}}"
          target="_blank"
        >
          <div class="flash_img">
            <img
              :title="item.name"
              :alt="item.name"
              src="~/assets/img/img_bg.png"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_138,w_230'"
            />
          </div>
          <div>
            <p v-bind:title="item.name">{{item.name}}</p>
            <div>
              <div :title="'￥'+item.price+'/'+item.unit" class="priceTitle">
                ￥{{parseInt(item.price)}}
                <span class="unit_text">/{{item.unit}}</span>
              </div>
              <div>￥{{parseInt(item.market_price)}}</div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="nav_flashBot" v-show="selectIndex_1==1">
        <nuxt-link
          v-for="item in hotRank.hot"
          :to="{path:'service/'+item.id,query: {id:item.store_id}}"
          class="nav_center"
          :key="item.id"
          target="_blank"
        >
          <div class="flash_img">
            <img
              :title="item.name"
              :alt="item.name"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_138,w_230'"
            />
          </div>
          <div>
            <p v-bind:title="item.name">{{item.name}}</p>
            <div>
              <div :title="'￥'+item.price+'/'+item.unit" class="priceTitle">
                ￥{{parseInt(item.price)}}
                <span class="unit_text">/{{item.unit}}</span>
              </div>
              <div>￥{{parseInt(item.market_price)}}</div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="nav_flashBot" v-show="selectIndex_1==2">
        <nuxt-link
          class="nav_center"
          v-for="item in hotRank.qua"
          :key="item.id"
          :to="{path:'service/'+ item.id,query: { id:item.store_id}}"
          target="_blank"
        >
          <div class="flash_img">
            <img
              :title="item.name"
              :alt="item.name"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_138,w_230'"
            />
          </div>
          <div>
            <p v-bind:title="item.name">{{item.name}}</p>
            <div>
              <div :title="'￥'+item.price+'/'+item.unit" class="priceTitle">
                ￥{{parseInt(item.price)}}
                <span class="unit_text">/{{item.unit}}</span>
              </div>
              <div>￥{{parseInt(item.market_price)}}</div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="nav_flashBot" v-show="selectIndex_1==3">
        <nuxt-link
          class="nav_center"
          v-for="item in hotRank.hot_rank"
          :key="item.id"
          :to="{path:'service/'+ item.id,query: {id:item.store_id}}"
          target="_blank"
        >
          <div class="flash_img">
            <img
              :title="item.name"
              :alt="item.name"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_138,w_230'"
            />
          </div>
          <div>
            <p v-bind:title="item.name">{{item.name}}</p>
            <div>
              <div :title="'￥'+item.price+'/'+item.unit" class="priceTitle">
                ￥{{parseInt(item.price)}}
                <span class="unit_text">/{{item.unit}}</span>
              </div>
              <div>￥{{parseInt(item.market_price)}}</div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <section v-show="show" class="floor-nav" id="floorNavList" :class="{'floor':show}">
      <ul class="nav-list user_select">
        <li
          class="nav-list-item"
          v-for="(item, index) in floorNav"
          :key="item.id"
          @click="setFloorNavMountClick(index)"
        >
          <div>
            <p>{{item.cate_name}}</p>
          </div>
        </li>
        <li class="top" @click="toTop(step)">
          <span class="iconfont icon-xiangshang"></span>
          <p>置顶</p>
        </li>
      </ul>
    </section>
    <section
      class="advertising floor-item"
      v-for="(item,index1) in floorData"
      :key="index1"
      :class="{'navBlock_Click':Number(index1)%2!=0 ,'orderRe':index1 == (floorData.length-4) || index1 == (floorData.length-3) }"
    >
      <!--一级导航 -->
      <div class="floor-item-box advertising_img" v-if="index1 <= (floorData.length-5)">
        <div class="advertising_cen">
          <div class="advertising_left">
            <div>
              <p>{{item.f}}F</p>
              <p>{{item.cate_name}}</p>
            </div>
            <div class="advertising_ban">
              <el-carousel height="536px" arrow="never">
                <el-carousel-item v-for="item in item.ad_vertical" :key="item.id">
                  <img v-lazy="item.ad_img+'?x-oss-process=image/resize,m_fill,h_536,w_270'" alt />
                </el-carousel-item>
              </el-carousel>
              <div>
                <div>
                  <nuxt-link
                    :to="`/category/${itemT.cate_code}?page=1`"
                    target="_blank"
                    v-for="(itemT , index) in item.three"
                    :key="index"
                  >{{itemT.cate_name}}</nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="advertising_right">
            <div class="tabsList">
              <ul class="tabs user_select">
                <li
                  class="tab"
                  v-for="(itemC, index2) in item.child"
                  :class="{active:tabIndex[item.id] == index2 }"
                  :key="index2"
                  v-on:mouseover="mouseoverTowActive($event,item.id,index2)"
                  v-on:mouseout="removeTowActive($event,item.id,index2)"
                >
                  <span>{{itemC.cate_name}}</span>
                  <ul class="nav_advertising navBlock">
                    <li v-for="nav in itemC.qua" :key="nav.id">
                      <a
                        class="advert_img_box"
                        :href="`/service/${nav.id}?id=${nav.store_id}`"
                        target="_blank"
                      >
                        <img
                          :title="nav.name"
                          :alt="nav.name"
                          src="~/assets/img/img_bg.png"
                          v-lazy="nav.img+'?x-oss-process=image/resize,m_fill,h_138,w_208'"
                        />
                      </a>
                      <div class="shop">
                        <a
                          class="shopName"
                          v-bind:title="nav.name"
                          :href="`/service/${nav.id}?id=${nav.store_id}`"
                          target="_blank"
                        >{{nav.name}}</a>
                        <div class="advertMoney">
                          <p :title="`￥${parseInt(nav.price)}/${nav.unit}`">
                            ￥{{parseInt(nav.price)}}
                            <span class="unit_text">/{{nav.unit}}</span>
                          </p>
                          <p @click.stop="carClick(nav)">
                            <span class="icon iconfont icon-gouwuche"></span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!--线索 -->
      <orderReceiving class="floor-item-box" v-if="index1 == (floorData.length-4)" />
      <!--新闻 -->
      <findMedia class="floor-item-box" v-if="index1 == (floorData.length-3)" />
      <!--店铺 -->
      <div class="floor-item-box shop" v-if="index1 == (floorData.length-2)">
        <div class="shop_top">
          ———
          <p>店铺推荐</p>———
        </div>
        <div class="shop_center">
          <div class="shop_img">
            <div>
              <a :href="shopAdList.ad_img_link || '/'" target="_blank">
                <img v-lazy="shopAdList.ad_img" alt />
              </a>
            </div>
            <div>
              <div v-for="itemImg in shopListImg" :key="itemImg.id" class="store_box">
                <img
                  :title="itemImg.store_name"
                  :alt="itemImg.store_name"
                  src="~/assets/img/userDataImg.png"
                  v-lazy="itemImg.logo"
                />
                <div class="store_hover">
                  <div class="store_btn_list">
                    <nuxt-link tag="div" to="/shop/list" target="_blank">
                      <div>查看更多</div>
                    </nuxt-link>
                    <nuxt-link :to="{  path: '/shop/'+itemImg.id}" target="_blank">
                      <div>点击进入</div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--猜你喜欢 -->
      <div class="floor-item-box like" v-if="index1 == (floorData.length-1)">
        <div class="shop_top">
          ———
          <p>猜你喜欢</p>———
        </div>
        <div class="lick_center">
          <nuxt-link
            tag="a"
            v-for="(item ,index) in lickList"
            :to="{ path: '/service/'+item.id,
           query: { id:item.store_id}}"
            :key="index"
            target="_blank"
          >
            <li>
              <img
                src="~/assets/img/userDataImg.png"
                :title="item.name"
                :alt="item.name"
                v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_138,w_232'"
              />
            </li>
            <li>
              <p>{{item.name}}</p>
            </li>
            <li :title="`￥${parseInt(item.price)}/${item.unit}`">
              <p class="lickTitle">
                ￥{{parseInt(item.price)}}
                <span>/{{item.unit}}</span>
              </p>
            </li>
          </nuxt-link>
        </div>
      </div>
    </section>
    <transition name="hehe">
      <img
        v-if="floorData != undefined && floorData.length > 0 && showList"
        class="scroll_L"
        v-show="flageL"
        @click="scrollClick"
        src="../assets/img/novicClick/ltzmS.png"
        alt
      />
    </transition>
    <transition name="haha">
      <div v-if="showhaha" class="scroll" v-show="flages">
        <div class="scrollBox">
          <div>
            <img src="../assets/img/novicClick/pzl.png" alt />
          </div>
          <div>
            <div>
              <p>5秒</p>发布广告线索，迅速找到合适媒介资源
            </div>
            <div>
              凌天众媒网已经解决了
              <p>{{popSer}}</p>个广告主的需求和实现
              <p>{{popClue}}</p>个媒介资源对接
            </div>
          </div>
          <div>
            <div class="input_p">
              <input type="phone" placeholder="输入联系方式" v-model="dataPhone" maxlength="11" />
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-dianhua" class="ccccc" />
              </svg>
            </div>
            <div class="button">
              <span @click="buttPhone">立即发布</span>
              <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">在线咨询</a>
            </div>
          </div>
          <div>
            <div>
              <img src="../assets/img/novicClick/ltzm.jpg" alt />
            </div>
            <div>
              <p>关注微信</p>
              <p>公众号</p>
              <p>实时获取广告线索</p>
            </div>
          </div>
          <div class="submit" @click="deleClick">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-guanbi" class="ccccc" />
            </svg>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import comHeader from "~/components/component/comHeader";
import homeNav from "~/components/index/homeNav";
import LtCarousel from "~/components/index/lt-carousel";
import findMedia from "~/components/index/findMedia";
import orderReceiving from "~/components/index/orderReceiving";
import recommended from "~/components/index/recommended";
import comFooter from "~/components/component/comFooter";
import { mapMutations, mapState } from "vuex";
import { indexData, getUserInfo, addCart } from "@/api/list";
import { indexInitMixin } from "@/utils/common-mixins";
import { indexDataSsr, getHeader } from "@/api/async-server";
import { tokenDoing } from "@/utils/tool";
import sideBar from "@/components/sideBar";
import { cartTools } from "@/utils/tool";
import dataEventTrack from "@/utils/dataEventTrack";

var TIMER = null;
export default {
  layout: "index-layout",
  name: "homepage",
  mixins: [indexInitMixin(true)],
  components: {
    Logo,
    LtCarousel,
    comHeader,
    findMedia,
    orderReceiving,
    recommended,
    comFooter,
    homeNav,
    sideBar
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.keywords
        }
      ]
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables",
      Token: "access_token"
    })
  },
  props: {
    step: {
      //此数据是控制动画快慢的
      type: Number,
      default: 200
    }
  },
  provide() {
    return {
      popSer: this.popSer,
      popClue: this.popClue,
      cateleft: this.cateleft,
      hotMedia: this.hotMedia,
      cateRight: this.cateRight,
      adTopLarge: this.adTopLarge,
      dealAmount: this.dealAmount,
      orderUser: this.orderUser,
      notice: this.notice,
      shop_info: this.shop_info,
      dataItem: this.dataItem,
      dataItemC: this.dataItemC,
      dataItemB: this.dataItemB,
      dataItemA: this.dataItemA,
      article: this.article,
      serviceBuyList: this.serviceBuyList,
      adDealHall: this.adDealHall,
      adDealRight: this.adDealRight,
      adDealSmall: this.adDealSmall,
      clueList: this.clueList,
      clueBuyList: this.clueBuyList,
      hotRank: this.hotRank,
      floorNav: this.floorNav,
      tabIndex: this.tabIndex,
      shopAd: this.shopAd,
      shopList: this.shopList,
      shopAdList: this.shopAdList,
      shopListImg: this.shopListImg,
      lickList: this.lickList,
      floorData: this.floorData
    };
  },
  async fetch(app) {
    const { token } = app.query;
    if (!token) return;
    app.store.commit("SAVE_TOKEN", token);
  },
  data() {
    return {
      token: this.$route.query.token || "",
      selectIndex: 0,
      tabIndex: {},
      dataPhone: "",
      count: "",
      flag: false,
      flagb: false,
      flaga: false,
      flages: true,
      scroll_L: true,
      flagesL: false,
      showData: true,
      tokenY: "1",
      tabArr: ["赚钱", "诚信", "销售", "好评"],
      tabArr_2: [ "新品上市","热销排行", " 热门推荐", "平台精选"],
      userInfoData: "",
      shop_info: [],
      dataItem: [],
      dataItemA: [],
      dataItemB: [],
      dataItemC: [],
      ad_top_search: "",
      searce: {},
      cateleft: [],
      hot_media: [],
      cateRight: [],
      hotMedia: [],
      dealAmount: "",
      orderUser: "",
      notice: [],
      article: [],
      serviceBuyList: [],
      adDealHall: [],
      adDealRight: [],
      adDealSmall: [],
      clueList: [],
      clueBuyList: [],
      hotRank: [],
      floorData: [],
      shopAd: [],
      shopList: [],
      guessLike: [],
      popSer: "",
      popClue: "",
      floorNav: [
        { id: 1, name: "F1" },
        { id: 2, name: "F2" },
        { id: 3, name: "F3" },
        { id: 4, name: "F4" },
        { id: 5, name: "F5" },
        { id: 6, name: "F6" }
      ],
      floorList: [],
      floorIndex: 0,
      show: false,
      showList: true,
      flageL: true,
      showhaha: false,
      shopAdList: {},
      shopListImg: [],
      lickList: [],
      flagd: false,
      isToken: "",
      con: "",
      scrollList: [],
      scrollListMoney: [],
      scrollListPep: [],
      animateadPep: false,
      Money: "",
      selectIndex_1: 0,
      userId: "",
      textScrlTime: null,
      moneyTime: null,
      title: "",
      description: "",
      keywords: "",
      user_WX_data:'',
    };
  },
  async asyncData(app) {
    let title = "",
      description = "",
      keywords = "";
    let produc = app.env.SERVER_ENV == "prod";
    if (produc) {
      title = "凌天众媒网 - 一站式全媒界大型广告投放和媒体资源交易电商平台";
      description =
        "凌天众媒网是国内领先的第三方广告投放和全媒体资源交易电商平台，专注于地铁、电视、电梯、公交车、户外、机场、社区、网络、移动、校园、影院、展会等领域广告投放。";
      keywords =
        "凌天众媒,媒体电商平台,广告交易平台,广告投放,媒体资源,媒体广告,网络广告,户外广告,移动广告";
    } else {
      title = "请访问正式服 www.zhongmei66.com ";
      description = "请访问正式服 www.zhongmei66.com ";
      keywords = "";
    }
    const res = await indexDataSsr(app);
    const { data } = res.data;
    if (!data) return;
    var a = [];
    var floorData = data.floor;
    var tabIndex = {};
    var isToken = "";
    floorData.forEach(item => {
      a.push({ cate_name: item.cate_name, id: item.id });
      tabIndex[item.id] = 0;
    });
    var c = { shopList: data.shop_list, shopAdList: data.shop_ad };
    var d = data.shop_list;
    var e = { clueList: data.clue_list, clueBuyList: data.clue_buy_list };
    var f = { article: data.article, serviceBuyList: data.service_buy_list };
    floorData.push(c, d, e, f);
    a.push(
      { cate_name: "线索大厅" },
      { cate_name: "新闻资讯" },
      { cate_name: "猜你喜欢" }
    );
    if (app.query.token) {
      isToken = app.query.token;
    }
    const dataNavRes = await getHeader(app);
    const dataNav = dataNavRes ? dataNavRes.data.data : '';
    return {
      popSer: data.pop_ser,
      popClue: data.pop_clue,
      cateleft: dataNav && dataNav.cate_left,
      hotMedia: dataNav && dataNav.hot_media,
      cateRight: dataNav && dataNav.cate_right,
      adTopLarge: data.ad_top_large,
      dealAmount: data.deal_amount,
      orderUser: data.order_user,
      notice: data.notice,
      shop_info: data.shop_info,
      dataItem: data.shop_rank.earn,
      dataItemC: data.shop_rank.trust,
      dataItemB: data.shop_rank.sold,
      dataItemA: data.shop_rank.repu,
      article: data.article,
      serviceBuyList: data.service_buy_list,
      adDealHall: data.ad_deal_hall,
      adDealRight: data.ad_deal_right,
      adDealSmall: data.ad_deal_small,
      clueList: data.clue_list,
      clueBuyList: data.clue_buy_list,
      hotRank: data.hot_rank,
      floorNav: a,
      tabIndex,
      shopAd: [data.shop_ad],
      shopList: data.shop_list,
      shopAdList: data.shop_ad,
      shopListImg: data.shop_list,
      lickList: data.guess_like,
      floorData,
      isToken: isToken,
      title,
      description,
      keywords
    };
  },
  created() {
    if (!!this.token) {
      !process.server && tokenDoing(this.token);
    }
  },
  mounted() {
    this.init();
    let _this = this;
    const throttleFunc = this.throttle(this.floorSrcollAddEventListener, 300);
    window.addEventListener("scroll", () => {
      throttleFunc();
      _this.handleScroll();
    });
    // 滚动
    var a = this.dealAmount;
    var Money = { a };
    this.Money = Money;
    this.scrollListMoney.push(this.Money, this.Money);
    var b = this.orderUser;
    var scrop = { b };
    this.scrollListPep.push(scrop, scrop);
    this.scrollList = this.notice || [];
    this.textScrlTime = setInterval(() => {
      this.showMoney();
    }, 2000);

    // 首页曝光事件埋点
    dataEventTrack({
      referer: document.referrer,
      event_type: "page_show",
      kv: {
        router: "/index"
      }
    });
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
    clearInterval(TIMER);
    clearInterval(this.con);
    clearInterval(this.textScrlTime);
    clearTimeout(this.moneyTime);
  },
  methods: {
    ...mapMutations(["CHANGE_IMG_HOST"]),

    showMoney() {
      this.animateadMoney = true;
      this.animateadPep = true;
      this.moneyTime = setTimeout(() => {
        // 交易金额滚动
        if (this.scrollListMoney.length > 0) {
          this.scrollListMoney.push(this.scrollListMoney[0]);
          this.scrollListMoney.shift();
        }
        this.animateadMoney = false;
        // 人数滚动
        if (this.scrollListPep.length > 0) {
          this.scrollListPep.push(this.scrollListPep[0]);
          this.scrollListPep.shift();
        }
        this.animateadPep = false;
        // 公共滚动
        if (this.scrollList.length > 1) {
          this.animateadTop = true;
          this.scrollList.push(this.scrollList[0]);
          this.scrollList.shift();
          this.animateadTop = false;
        }
      }, 1000);
    },
    //关闭用户信息
    init() {
      // 判断用户是否处在登录状态
      if (this.Token || this.isToken) {
        var userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          this.userInfo = JSON.parse(userInfo);
          this.userInfoData = this.userInfo.original;
        }
        if (this.isToken) {
          getUserInfo(this.isToken)
            .then(rsp => {
              var { code, data, message } = rsp.data;
              if (code == 200) {
                this.userInfoData = rsp.data.data.original;
                window.localStorage.setItem(
                  "userInfo",
                  JSON.stringify(rsp.data.data)
                );
                this.CHANGE_USER_INFO(data);
              } else {
                this.$message.error(message);
              }
            })
            .catch(err => this.$message.error(err));
        }
        this.tokenY = "2";
      }
    },
    mouseoverActive($event, item, index) {
      this.selectIndex = index;
    },
    removeActive($event, item, index) {
      this.selectIndex = index;
    },
    mouseoverHotActive($event, item, index) {
      this.selectIndex_1 = index;
    },
    removeHotActive($event, item, index) {
      this.selectIndex_1 = index;
    },
    // 工具市场跳转
    tollMarketClick() {
      this.$router.push({ path: "/tollMarket" });
    },
    //跳转发布线索  to="/clues/release"
    buttPhone() {
      if (!this.dataPhone) return this.$message.error("请输入联系方式");
      const reg = /^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/;
      if (!reg.test(this.dataPhone))
        return this.$message.error("请输入正确的手机号");
      window.localStorage.setItem("dataPhone", JSON.stringify(this.dataPhone));
      this.$router.push({ path: "/clues/release" });
    },
    // 优惠活动未开放提示
    unopenClick() {
      var that = this;
      that.flag = true;
      var count = 3;
      this.con = setInterval(() => {
        count--;
        if (count == 0) {
          that.flag = false;
          this.clearTimer();
        }
      }, 1000);
    },
    unopenClicka() {
      var that = this;
      that.flaga = true;
      var { href } = this.$router.resolve({ path: "/post" });
      window.open(href, "_blank");
      var count = 3;
      setInterval(function() {
        count--;
        if (count == 0) {
          that.flaga = false;
        }
      }, 1000);
    },
    unopenClickac() {
      var that = this;
      that.flagd = true;
      var count = 2;
      this.con = setInterval(() => {
        count--;
        if (count == 0) {
          that.flagd = false;
          this.clearTimer();
        }
      }, 1000);
    },
    unopenClickb() {
      var that = this;
      that.flagb = true;
      var count = 2;
      this.con = setInterval(() => {
        count--;
        if (count == 0) {
          that.flagb = false;
          this.clearTimer();
        }
      }, 1000);
    },
    tollClick() {
      var { href } = this.$router.resolve({
        path: "/tollMarket/marketShop/marketShop",
        query: { id: 3 }
      });
      window.open(href, "_blank");
    },
    clearTimer() {
      clearInterval(this.con);
      this.con = null;
    },
    handleScroll() {
      // //首先修改相对滚动位置
      let scrollTop = window.pageYOffset || document.body.scrollTop;
      if (scrollTop > 1150) {
        this.show = true;
      } else {
        this.show = false;
      }
      if (this.flageL != false && this.flages != false) {
        if (scrollTop > 1150) {
          this.showList = false;
          this.showhaha = true;
        } else {
          this.showList = true;
          this.showhaha = false;
        }
      }
    },
    /**
     * 设置楼层导航事件驱动方法
     * @params Number index  楼层下标
     */
    setFloorNavMountClick(index) {
      var scr = ''
      if(index == this.floorData.length-2){
          scr = -400
      }else{
          scr = 10
      }     
      var _this = this;
      var floor_item = document.getElementsByClassName("floor-item"),
        floor_offsetTop = floor_item[index].offsetTop - scr,
        window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop,
        timer = {
          step: 300,
          times: 10,
          FLOOR_OFFSETTOP: floor_offsetTop
        };

      if (window_scrollTop > floor_offsetTop) {
        _this.setFloorScrollArrowUp(timer);
      } else if (window_scrollTop == floor_offsetTop) {
        return false;
      } else {
        _this.setFloorScrollArrowDown(timer);
      }
    },
    /**
     * 设置楼层向上滚动
     * @params Object timer 定时器配置
     */
    setFloorScrollArrowUp(timer) {
      var _this = this;
      clearInterval(TIMER);
      TIMER = setInterval(() => {
        var window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
          document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP;
          document.body.scrollTop = timer.FLOOR_OFFSETTOP;
          clearInterval(TIMER);
        } else {
          document.documentElement.scrollTop = window_scrollTop - timer.step;
          document.body.scrollTop = window_scrollTop - timer.step;
        }
      }, timer.times);
    },
    /**
     * 设置楼层向下滚动
     * @params Object timer 定时器配置
     */
    setFloorScrollArrowDown(timer) {
      var _this = this;
      clearInterval(TIMER);
      TIMER = setInterval(() => {
        var window_scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
          document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP;
          document.body.scrollTop = timer.FLOOR_OFFSETTOP;
          clearInterval(TIMER);
        } else {
          document.documentElement.scrollTop = window_scrollTop + timer.step;
          document.body.scrollTop = window_scrollTop + timer.step;
        }
      }, timer.times);
    },
    /**
     * 监听窗口滚动楼层导航动态定位
     */

    floorSrcollAddEventListener() {
      var nav_item = document
          .getElementById("floorNavList")
          .getElementsByClassName("nav-list-item"),
        floor_item = document.getElementsByClassName("floor-item");
      var _this = this;
      var window_scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      for (var i = 0, len = floor_item.length; i < len; i++) {
        var floor_offsetTop = floor_item[i].offsetTop - 50;
        if (window_scrollTop >= floor_offsetTop) {
          for (var n = 0, len = nav_item.length; n < len; n++) {
            nav_item[n].className =
              "nav-list-item " + (i === n ? "activet" : "");
          }
        }
      }
      // };
    },
    initPage() {
      this.floorSrcollAddEventListener();
    },
    //节流
    throttle(fn, interval) {
      let timer = null;
      let firstTime = true;
      return function(...args) {
        if (firstTime) {
          // 第一次加载
          fn.apply(this, args);
          return (firstTime = false);
        }
        if (timer) {
          // 定时器正在执行中，跳过
          return;
        }
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
          fn.apply(this, args);
        }, interval);
      };
    },
    mouseoverTowActive($event, id, index2) {
      this.tabIndex[id] = index2;
    },
    removeTowActive($event, id, index2) {
      this.tabIndex[id] = index2;
    },

    scrollClick() {
      this.flageL = false;
      this.flages = true;
      this.showhaha = true;
    },
    deleClick() {
      this.flages = false;
      this.flageL = true;
      this.showList = true;
    },
    // 返回顶部
    toTop(i) {
      //参数i表示间隔的幅度大小，以此来控制速度
      if (
        document.documentElement.scrollTop > 0 ||
        document.body.scrollTop > 0
      ) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.scrollH =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.toTop(i);
      }
      clearInterval(TIMER);
    },
    // 回到底部
    // toBottom(i) {
    //   var clientHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   var scrollHeight = document.documentElement.scrollHeight;
    //   var height = scrollHeight - clientHeight; //超出窗口上界的值就是底部的scrolTop的值
    //   document.documentElement.scrollTop += i;
    //   if (document.documentElement.scrollTop < height) {
    //     var c = setTimeout(() => this.toBottom(i), 16);
    //   } else {
    //     clearTimeout(c);
    //   }
    // },
    transitionComplete(el) {
      // console, log(el);
    },

    shopClickL() {
      // 跳转店铺首页
      this.$router.push({ path: "/shop/" + this.shopAdList.id });
    },
    serList(nav) {
      var { href } = this.$router.resolve({
        path: "/service/" + nav.id,
        query: { id: nav.store_id }
      });
      window.open(href, "_blank");
    },
    async carClick(nav) {
      if (!this.userInfoData) return this.$router.push({ path: "/login" });
      if(!this.Token) return this.$router.push({ path: "/login" });
      this.userId = this.userInfoData.id;
      if (this.userId == nav.user_id)
        return this.$message.error("您不能购买自己的服务");
      var params = {
        type: "1",
        goods_id: nav.id,
        price: nav.price,
        num: 1,
        list: 1
      };
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: "/index",
          rname: "首页楼层",
          service_id: nav.id,
          service_spec: "1",
          service_price: nav.price
        }
      });

      let car = await addCart(params);
      if (car != undefined) {
        var that = this;
        const { code, message, data } = car.data;
       
        if (code != 200){
               window.open(location.href + 'login', "_self")
        }else{
             that.$message.success("成功加入购物车");
        cartTools.countChange.call(that);
        }
       
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/ltzmIndex/advertisingScode.less";
@import "../assets/css/ltzmIndex/recommendedScode.less";
.orderRe {
  padding-bottom: 0px !important;
}
</style>
<style lang="less">
@import "../assets/css/ltzmIndex/advertising.less";
@import "../assets/css/ltzmIndex/ltzmIndex.less";
</style>




