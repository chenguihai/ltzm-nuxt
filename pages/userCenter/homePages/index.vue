
<template>
  <!-- 雇主中心首页 -->
  <!-- <div class="user_cen_right"> -->
  <div class="first_page body">
    <comHeader />
    <div class="center">
      <LTnav />
      <div class="user_cen_right" style="background：#f4f6f8">
        <div class="fir_data">
          <div class="triangle_down"></div>
          <div class="triangle_up"></div>
          <div class="user_data">
            <div class="user_data_top">
              <img
                class="user_img"
                @click="userDataCheck"
                v-if="original.avatar != null&&original.avatar != ''"
                :src="(original.avatar).indexOf('http')>-1?original.avatar:envVars.IMG_HOST+original.avatar"
                
                alt
              />
              <img @click="userDataCheck" class="user_img" v-else src="@/assets/img/icon_sign_mobile.jpg" alt />
              <div class="user_name">
               <span class="checkName" @click="userDataCheck">{{original.nick_name}}
                  <img class="user_img" src="@/assets/img/xiugai.png" alt="修改资料" />
                </span>
                <div class="userImg">
                  <span  v-if="flag ==1">个人</span>
                  <span v-else-if="flag ==2" style="background:#9eadfe;">企业</span>
                  <div>
                    <img class="smIcon" title="已实名认证" v-if="flagS" src="@/assets/img/icon/smr1.png" alt="已实名认证">
                    <img class="smIcon"  title="未实名认证" v-else src="@/assets/img/icon/smb1.png" alt="未实名认证">
                  </div>
                  <div>
                      <img class="pIcon" v-if="original.mobile != null || original.mobile != ''" title="已手机认证" src="@/assets/img/icon/sjr1.png" alt="已手机认证">
                  </div>
                    <div v-if="this.code == 200">
                    <img class="bIcon"  title="已银行卡认证" src="@/assets/img/icon/yhk1.png" alt="已绑定银行卡">
                  </div>
                </div>
              </div>
              <div class="chang">
                <!-- <span>修改资料</span> -->
              </div>
            </div>
            <div class="user_data_bottom">
              <p class="user_news">
                未读站内信
                <i>(&nbsp;{{countNumS+countNum}}&nbsp;)</i>
              </p>
              <span class="user_news_in">
                <router-link to="/userCenter/tradeNews/tradeNews">
                  进入消息中心
                  <i style="font-family:simsun;margin-top:1px;">></i>
                </router-link>
              </span>
            </div>
          </div>
          <div class="user_money">
            <div class="balance" @click="tomyDeposit">
              <span class="balance_one">{{userMoney}}</span>
              <span class="balance_two">
                <a>账户余额</a>
              </span>
            </div>
            <div class="tack_maney">
               <span @click="verifyId">提现</span>
            </div>
          </div>
          <a class="user_banner userBanner" v-if="ad_img != '' && ad_img != null" :href="ad_img_link" target="_blank">
            <img width="471" height="215" :src="envVars.IMG_HOST+ad_img" alt />
          </a>
          <div class="user_banner" v-else>
            <img width="90" height="115" src="@/assets/img/pintouge.png" alt />
            暂无数据
          </div>
        </div>
        <div class="homeCome">
          <div class="fir_order_car">
            <div class="fir_order">
              <div class="fir_order_head">
                <span style="margin-left:19px;">交易订单</span>
                <router-link tag="a"  class="more sun" to="/userCenter/myOrder/myOrder" target="_blank" >
                  查看全部
                  <i class="arrows">></i>
                </router-link>
              </div>
              <ul v-if="orderList.length==0" class="shop_none order_none">
                <img src="@/assets/img/pintouge.png" alt="暂无数据" />
                <span>您还没有交易订单哦</span>
                <nuxt-link to="/" class="shop_but" target="_blank">去逛逛</nuxt-link>
              </ul>
              <ul v-else>
                <li v-for="(item , index) in orderList.filter((item,index)=>index<4)" :key="index">
                  <nuxt-link class="order_name" :to="`/service/${item.sid}?id=${item.store_id}`" target="_blank">
                    <img :src="envVars.IMG_HOST+item.get_order_goods.img+preFix+'m_fill,h_94,w_157'" alt />
                    <div>
                      <span >{{item.get_order_goods.name}}</span>
                      <span>￥{{item.amount}}</span>
                    </div>
                  </nuxt-link>
                  <nuxt-link class="order_data" :to="`/contract/contranct-index?order_sn=${item.get_order_goods.order_sn}&cert=1`" target="_blank">订单详情</nuxt-link>
                </li>
              </ul>
            </div>
            <div class="my_clue">
              <div class="my_task_head">
                <span>我发布的线索</span>
                <nuxt-link
                  tag="a"
                  class="sun"
                  target="_blank"
                  style="cursor: pointer;"
                  to="/userCenter/myThread/myThread"
                >
                  查看全部
                  <i class="arrows">></i>
                </nuxt-link>
              </div>
              <div class="my_task_content shop_none" v-if="tastItem.length==0">
                <img src="@/assets/img/pintouge.png" alt="暂无数据" />
                <span>您还没发过线索哦</span>
                <nuxt-link class="shop_but" to="/clues/release" target="_blank">去发布线索</nuxt-link>
              </div>
              <div class="my_task_content" v-else>
                <ul>
                  <li v-for="(tast_item,index) in tastItem.filter((item,index)=>index <5)" :key="index">
                    <div class="my_task_name">
                      <div>
                        <span>
                          <p>￥{{tast_item.budget_money}}</p>
                          <a :href="`/clues/${tast_item.id }`" target="_blank">{{tast_item.title}}</a>
                        </span>
                      </div>
                      <div>
                        <span>
                          <p>{{tast_item.number}}</p>人浏览
                        </span>
                        <span>
                          <p>{{tast_item.pay_number}}</p>人已购买
                        </span>
                      </div>
                    </div>
                    <div class="classify">
                      <span>{{tast_item.customer_type}}</span>
                      <span>发布时间：{{tast_item.created_at}}</span>
                    </div>
                    <a class="task_details"  :href="`/clues/${tast_item.id }`" target="_blank">线索详情</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="home_Car">
            <div class="my_collect">
              <div class="my_collect_head">
                <span>我的收藏</span>
              </div>
              <div class="my_collect_con">
                <ul>
                  <li class="my_collect_List">
                    <span>{{collCount.service}}</span>
                    <span class="my_span">服务收藏</span>
                  </li>
                  <li class="my_collect_List">
                    <span>{{collCount.clue}}</span>
                    <span class="my_span">线索收藏</span>
                  </li>
                  <li class="my_collect_List">
                    <span>{{collCount.shop}}</span>
                    <span class="my_span">店铺收藏</span>
                  </li>
                  <li class="my_collect_List">
                    <span>{{collCount.case}}</span>
                    <span class="my_span">案例收藏</span>
                  </li>
                  <li class="my_collect_List">
                    <span>{{collCount.biography}}</span>
                    <span class="my_span">传记收藏</span>
                  </li>
                  <li class="my_collect_List">
                    <span>{{collCount.journa}}</span>
                    <span class="my_span">上刊画面</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="my_car">
              <div class="shop_car">
                <span>我的购物车</span>
                <nuxt-link class="sun" to="/shoppingCart" target="_blank">查看全部<i class="arrows">></i></nuxt-link>
              </div>
              <div class="shop_data" v-if="userCartList!= undefined&&userCartList.length>0">
                <ul>
                  <a class="shop_li" v-for="(shop_item ,index) in userCartList.filter((item,index)=>index <3)" :key="index" 
                   :href="shop_item.type==1?`service/${shop_item.goods_id}?id=${shop_item.store_id}`:`/case-biog/${shop_item.goods_id}?id=${shop_item.store_id}`" target="_blank"
                  >
                    <img
                    class="shop_img"
                      v-if="shop_item.lose_img != '' && shop_item.lose_img != null && shop_item.lose_img != undefined"
                      :src="envVars.IMG_HOST+shop_item.lose_img +preFix+'m_fill,h_54,w_90'"
                      alt
                    />
                    <img
                      width="90"
                      height="54"
                      v-else
                      src="@/assets/img/userDataImg.png"
                      alt="h商品"
                      class="shop_img"
                    />
                    <span class="shop_name">{{shop_item.lose_name}}</span>
                    <span class="shop_money">￥{{shop_item.price}}</span>
                  </a>
                </ul>
              </div>
              <div class="shop_data shop_none" v-else>
                <img width="90" height="115" src="@/assets/img/pintouge.png" alt="暂无数据" />
                <span>您还没有服务加入购物车哦</span>
                 <nuxt-link to="/" class="shop_but" target="_blank">去逛逛</nuxt-link>
              </div>
              <el-button
              @click="carList()"
                class="shop_but shop_butCar"
                v-if="userCartList!= undefined&&userCartList.length>0"
              >去购物车<span class="iconfont icon-you"></span></el-button>
            </div>
            <div class="my_footprint">
              <div class="my_footprint_head">
                <span>我的足迹</span>
                <nuxt-link class="suno" to="/userCenter/footprint/footprint" target="_blank">
                  查看全部<i class="arrows">></i>
                </nuxt-link>
              </div>
              <div class="my_footprint_com">
                <ul v-if="trailList!=undefined && trailList.length > 0">
                  <a
                    class="my_footprint_list"
                    v-for="(item , index) in trailList"
                    :key="index"
                    :href="`/service/${item.sid}?id=${item.store_id}`"
                    target="_blank"
                  >
                    <img
                      class="imgF"
                      v-if="item.img != null && item.img != ''"
                      :src="envVars.IMG_HOST+item.img+preFix+'m_fill,h_60,w_100'"
                      alt
                    />
                    <span class="textF">{{item.name}}</span>
                    <span class="moneyF">￥{{item.price}}</span>
                  </a>
                </ul>
                <div class="shop_none" v-else>
                <img width="90" height="115" src="@/assets/img/pintouge.png" alt="暂无数据" />
                <span>您还没有足迹哦</span>
                 <nuxt-link to="/" class="shop_but" target="_blank">去逛逛</nuxt-link>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dataList">
          <div class="dataTab">
            <ul>
              <li
                class="tabList"
                v-for="(item , index) in tabList"
                :key="index"
                :class="{tabActive: tabIndex == index}"
                @click="tabClick(index)"
              >{{item}}</li>
            </ul>
            <nuxt-link class="sun allData" to="/userCenter/collect/collect">
              <span>
                查看全部<i class="arrows">></i>
              </span>
            </nuxt-link>
          </div>
          <div class="serveList" v-if="tabIndex == 0">
            <ul v-if="collecSer != undefined && collecSer.length > 0">
              <a
                class="serveData"
                v-for="(item , index) in collecSer.filter((item,index)=>index <5)"
                :key="index"
               :href="item.get_service_one.length >0 && item.get_service_one[0].shelf_status!= 0 ? `/service/${item.collect_id}?id=${item.store_id}`:`/closeData/closeData?type=1`" target="_blank"
              >
                <div class="imgS">
                  <img
                    v-if="item.lose_img != ''"
                    :src="envVars.IMG_HOST+item.lose_img+preFix+'m_fill,h_109,w_182'"
                    alt
                  />
                  <img v-else src="@/assets/img/userDataImg.png" alt />
                  <div v-if="item.get_service_one ==undefined && item.get_service_one.length ==0"></div>
                </div>
                <span class="spanS">{{item.lose_name}}</span>
                <span class="moneyS" v-if="item.get_service_one !=undefined && item.get_service_one.length >0 &&item.get_service_one[0].shelf_status!= 0" >
                  ￥{{item.get_service_one[0].price}}
                </span>
                <span class="moneyS moneySNone " v-else-if="item.get_service_one !=undefined && item.get_service_one.length >0 &&item.get_service_one[0].shelf_status== 0">
                  <span>
                    <img src="@/assets/img/shangxin.png" />服务已下架
                  </span>
                </span> <span class="moneyS moneySNone " v-else>
                  <span>
                    <img src="@/assets/img/shangxin.png" />服务已失效
                  </span>
                </span>
              </a>
            </ul>
            <div class="shop_none no_collect" v-else>
                <img width="90" height="115" src="@/assets/img/pintouge.png" alt="暂无数据" />
                <span>您还没收藏服务呢</span>
                 <nuxt-link to="/" class="shop_but" target="_blank">去逛逛</nuxt-link>
              </div>
          </div>
          <div class="serveList" v-else>
            <ul v-if="collecShop != undefined && collecShop.length > 0">
              <a
                class="serveData collecShop"
                v-for="(item , index) in collecShop.filter((item,index)=>index <5)"
                :key="index"
:href="item.get_shop.length >0 && item.get_shop[0].status > 0 ? `/shop/${item.store_id}`:`/closeData/closeData?type=2`" target="_blank"

              >
                <div class="imgS">
                  <img
                    v-if="item.lose_img != '' && item.lose_img != null"
                    :src="envVars.IMG_HOST+item.lose_img"
                    @click="shopClick(item , index)"
                    alt
                  />
                  <img @click="shopClick(item , index)" v-else src="@/assets/img/userDataImg.png" alt />
                  <span v-if=" item.get_shop==undefined && item.get_shop.length ==0 && item.get_shop[0].status ==0">店铺已关闭</span>
                </div>
                <span class="spanS">{{item.lose_name}}</span>
                <div class="leave" v-if=" item.get_shop!=undefined && item.get_shop.length >0 && item.get_shop[0].status >0">
                  <span class="leaveD">
                    <i>{{item.get_shop[0].valueName.bl_name}}</i>
                    <img :src="envVars.IMG_HOST+item.get_shop[0].valueName.icon" alt />
                  </span>
                  <span class="attestation" v-if="item.get_shop[0].status == 1">个人</span>
                  <span class="attestation com" v-else>企业</span>
                  <span class="shopData" @click="shopClick(item , index)">进入店铺</span>
                </div>
                <div class="closeShop" v-else>
                  <img src="@/assets/img/shangxin.png" />
                  <span class="shopData">店铺已关闭</span>
                </div>
              </a>
            </ul>
            <div class="shop_none no_collect" v-else>
                <img width="90" height="115" src="@/assets/img/pintouge.png" alt="暂无数据" />
                <span>您还没收藏店铺呢</span>
                  <nuxt-link to="/shop/list" class="shop_but" target="_blank">去逛逛</nuxt-link>
              </div>
          </div>
        </div>
      </div>
    </div>
      <div v-if="flagB" class="verifyFlag">
      <div class="verify" >
        <span class="iconfont icon-guanbi delet" @click="delet"></span>
        <span class="header">温馨提示</span>
        <span class="title" v-if="code == 202">您还未实名认证，请先完成实名认证</span>
        <span class="title" v-else-if="code == 201">您还未绑定银行卡，请先完成绑定银行卡</span>
        <nuxt-link
          tag="span"
          v-if="code == 202"
          class="skipURL"
          to="/userCenter/realName/realName"
        >去实名认证</nuxt-link>
        <nuxt-link
          tag="span"
          v-else-if="code == 201"
          class="skipURL"
          to="/userCenter/myBank/myBank"
        >去绑定银行卡</nuxt-link>
        <div class="clear"></div>
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
  accountMoney,
  myClue,
  msgcount,
  msgcountS,
  userOrder,
  signAccount,
  homeimage,
  userIndex,
  trailList,
  collectCount,
  collectService,
  collectStores,
  userCartList,
  accountExp
} from "@/api/list";
import { mapState } from "vuex";
export default {
  name:'homepages',
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      userMoney: "",
      moneyFrozen: "",
      balanceMoney: "",
      // 交易订单数据
      orderList: [],
      shopItem: [],
      tastItem: [],
      userInfo: "",
      original: [],
      countNumS: 0,
      countNum: 0,
      flag: "",
      flagS: false,
            flagB:false,

      ad_img: "",
      ad_img_link:'',
      tabList: ["服务收藏", "店铺收藏"],
      tabIndex: 0,
      trailList: [],
      collCount: [],
      collecSer: [],
      collecShop: [],
      userCartList: [],
      typeRZ:'',
      code:'',
      res:'',
      preFix:'?x-oss-process=image/resize,'
    };
  },
  mounted() {
    this.init();
    this.count();
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.original = this.userInfo.original;
    this.initOrder();
    this.trailListData();
    this.exp()
  },
  methods: {
    init() {
      accountMoney()
        .then(res => {
          const {money,money_frozen} = res.data.data
          this.userMoney = money;
          this.moneyFrozen = money_frozen;
        })
        .catch(err => {
          console.log(err);
        });
      var page = 1;
      myClue(page)
        .then(res => {
          if (res.data.code == 200) {
            this.tastItem = res.data.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      //实名认证
      signAccount()
        .then(res => {
          if (res.data.code == 200) {
            this.flagS = true;
            if (res.data.data.status == 1) {
              this.flag = "1";
              this.typeRZ='1'
            } else {
              this.flag = "2";
               this.typeRZ='2'
            }
            this.dataList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      var type = "15";
      homeimage(type)
        .then(res => {
          if (res.data.code == 200) {
            this.ad_img = res.data.data.ad_img;
            this.ad_img_link = res.data.data.ad_img_link
          }
        })
        .catch(err => {
          console.log(err);
        });
      collectCount()
        .then(res => {
          if (res.data.code == 200) {
            this.collCount = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      // 服务收藏
      var page = 1;
      var name = "";
      collectService(page, name)
        .then(res => {
          if (res.data.code == 200) {
            this.collecSer = res.data.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      // 店铺收藏
      collectStores(page, name)
        .then(res => {
          if (res.data.code == 200) {
            this.collecShop = res.data.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
      userCartList()
        .then(res => {
          if (res.data.code == 200) {
            this.userCartList = res.data.data;
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
            this.countNumS = data.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
      msgcount()
        .then(res => {
          if (res.data.code == 200) {
            var data = res.data;
            this.countNum = data.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提现校验
    verifyId() {
       this.flagB = false;
     if (this.code == 200) {
            this.$router.push({ path: "/userCenter/takeMoney/takeMoney",query:{typerz:this.typeRZ} });
          } else if (this.code == 201) {
            this.flagB = true;
          } else if (this.code == 202) {
            this.flagB = true;
          } else {
            this.flagB = false;
          }
    },
    exp(){
       accountExp()
        .then(res => {
         this.res = res.data.message
          this.code = res.data.code;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 关闭弹窗
    delet() {
      this.flagB = false;
    },
    //获取订单列表
    initOrder() {
      var created = "";
      var type = "";
      var title = "";
      var page = 1;

      userOrder(created, title, type, page)
        .then(res => {
          if (res.data.code == 200) {
            this.orderList = res.data.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 我的足迹
    trailListData() {
      var page = "1";
      trailList(page)
        .then(res => {
          if (res.data.code == 200) {
            for (var i = 0; i < res.data.data.data.length; i++) {
              if (i < 6) {
                this.trailList.push(res.data.data.data[i]);
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tomyDeposit() {
      if(this.typeRZ){
       this.$router.push({ path: "/userCenter/myDeposit/myDeposit",query:{typerz:this.typeRZ} });
       }
    },
    // 点击服务 店铺收藏
    tabClick(index) {
      this.tabIndex = index;
    },
    // 跳转店铺
    shopClick(item, index) {
      if(item.get_shop!=undefined && item.get_shop.length >0 && item.get_shop[0].status >0){
         var {href} =this.$router.resolve({path: "/shop/"+item.store_id});
             window.open(href, '_blank')
      }else{
         var {href} =this.$router.resolve({
        path: "/closeData/closeData",
     query:{type:2}
      });
             window.open(href, '_blank')
      }

    },
     // 购物车
   carList(){
        var {href}=this.$router.resolve({
        path: "/shoppingCart",
      });
        window.open(href, '_blank')
    },
    userDataCheck(){
        var {href} =this.$router.resolve({
        path: "/userCenter/myData/myData",
      });
       window.open(href, '_blank')
    }
  }
};
</script>
<style lang="less" scoped>
@import "homePagesScode.less";
.user_cen_right {
  background: #f4f6f8 !important;
}
</style>
<style lang="less" >
@import "homePages.less";
</style>
<style lang="less" scoped>
@import "../index.less";
</style>
