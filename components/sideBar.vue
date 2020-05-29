
<template>
  <div class="side-bar" :class="{'side-free': isFreely}" @click.stop>
    <div :class="['nav-main',styles=='white'?'side-bar-white':'']">
    <div class="nav">
      <div></div>
      <ul class="nav-btn-box">
        <li :class="['nav-btn']" v-show="showStoreKF" >
          <div class="btn-tip kefub-boxs">
            <p class="kefub-tx">客服</p>
            <div class="contacts">
                <p class="conta-nub">
                  <span class="icon iconfont icon-dianhua1"></span>
                  <span>400-688-6662</span>
                </p>
                <p class="conta-date">周一至周日 9:00-20:00</p>
                <div class="consult-ent">

                  <div>
                   <a href="https://url.cn/5fa6j74?_type=wpa&qidian=true" target="_blank" rel="noopener noreferrer">
                      <span class="icon iconfont icon-duihua"></span>
                      <p>网页咨询</p>
                    </a>
                  </div>
                  <div @click="openQQ">
                    <span class="icon iconfont icon-QQ"></span>
                    <p>QQ咨询</p>
                  </div>
                </div>
            </div>
            <div class="qrcode-boxs">
              <div class="qrcodes"><img src="../assets/img/novicClick/ltzm.jpg" alt="凌天众媒公众号" /></div>
              <div class="code-text">
                <p>关注众媒平头哥公众号</p>
                <p>离开平台网站后，可以通过公众号接收更多广告行业咨询，随时随地的接单赚钱。</p>
              </div>
            </div>
          </div>
          <div>
            <span class="icon iconfont icon-kefub"></span>
            <p class="bott-text">客服</p>
          </div>
        </li>
        <li class="nav-btn add_line" :class="{active:isFreely === 1}" @click.stop="changeFreely(1,'/userCenter/homePages')">
          <p class="btn-tip">雇主中心</p>
          <div>
          <span class="icon iconfont icon-geren"></span>
          <p class="bott-text">中心</p>
          </div>
        </li>
        <li class="nav-btn add_line" :class="{active:isFreely === 2}" v-if="styles!='white'" @click.stop="changeFreely(2)">
          <p class="btn-tip">我的购物车</p>
          <div>
            <span class="icon iconfont icon-gouwuche"></span>
            <i class="nav-dot">{{carDot | cut}}</i>
            <p class="bott-text">购物车</p>
          </div>
        
        </li>
        <li class="nav-btn add_line"  @click.stop="changeFreely(1,'/userCenter/tradeNews/tradeNews')">
          <p class="btn-tip">我的消息</p>
          <div>
            <span class="icon iconfont icon-xinxi"></span>
            <p class="bott-text">消息</p>
          </div>
        </li>
        <li @click.stop="changeFreely(1,'/userCenter/collect/collect')" :class="['nav-btn add_line']" class="">
          <p class="btn-tip">我的收藏</p>
          <div>
            <span class="icon iconfont icon-shoucang"></span>
            <p class="bott-text">收藏</p>
          </div>
          
        </li>
      </ul>
      <ul class="nav-btn-box">
        <li :class="['nav-btn official', styles=='white'?'add_line':'']">
          <div class="btn-tip qr-tip">
            <img src="../assets/img/novicClick/ltzm.jpg" alt="凌天众媒公众号" />
          </div>
          <div>
          <span class="icon iconfont icon-saoyisao"></span>
          <p class="bott-text">公众号</p>
          </div>
        </li>
        <transition name="fade">
          <li class="nav-btn official-2 add_line" @click="backTop" v-if="showBackTop">
            <div>
              <span class="icon iconfont icon-zhiding"></span>
              <p class="bott-text">置顶</p>
            </div>
                      
          </li>
        </transition>
      </ul>
    </div>
    </div>
    <transition name="slide-right">
      <div class="side-con" v-if="isFreely">
        <div class="side-header">
          <div class="side-header-l">
            <span v-if="isFreely === 2" class="icon iconfont icon-gouwuche"></span>
            <span class="side-title">{{nowFreely.name}}</span>
          </div>
          <i class="el-icon-close" @click="isFreely = false"></i>
        </div>
        <template v-if="isFreely === 2">
          <ul class="side-con-r" v-loading="cartLoading">
            <li class="side-no-data" v-if="cartData.length <= 0">
              <emptyData text="购物车空空的，去挑选您需要的服务吧"></emptyData>
            </li>
            <li class="con-box" v-for="store in cartData" :key="store.store_id">
              <div class="con-title">
                <p>{{store.store_name}}</p>
                <p class="amount">￥{{store.goodsList | buildAmount}}</p>
              </div>
              <div class="con" v-for="goods in store.goodsList" :key="goods.id">
                    <img v-if="goods.img!=null || goods.img!='' "  v-lazy="goods.img+'?x-oss-process=image/resize,m_fill,h_40,w_40'" :alt="goods.name">
                    <img v-else src="~/assets/img/img_bg.png"/>
                <div class="con-r">
                  <p>{{goods.name}}</p>
                  <p>{{goods.spec}}</p>
                  <p class="price-box">
                    <span class="amount">￥{{goods.price}}</span>
                    <span class="num">X{{goods.num}}</span>
                    <span class="del-btn-place"></span>
                    <span class="del-btn" @click="del(goods.id)">删除</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="res-box" v-if="cartData.length > 0">
            <div class="res-l">
              <p>
                数量
                <span>{{sum}}</span>件
              </p>
              <p>
                共计
                <span class="amount">￥{{totalAmount}}</span>
              </p>
            </div>
            <router-link tag="div" to="/shoppingCart" class="res-r">去购物车结算</router-link>
          </div>
        </template>
        <!-- <template v-if="isFreely === 1">
          <div class="side-con-r side-user">
            <div class="side-user-header">
              <img
                v-if="!userInfo || !userInfo.original.avatar"
                src="@/assets/img/icon_sign_mobile.jpg"
                alt="头像"
              />
              <img
                v-else
                :src="envVars.IMG_HOST+userInfo.original.avatar"
                :alt="userInfo.original.avatar"
              />
              <p>{{userInfo ? userInfo.original.real_name : '未登录'}}</p>
            </div>
            <div class="side-user-btn-box">
              <div class="side-user-btn" @click="goto('/userCenter/myOrder/myOrder')">交易管理</div>
              <div class="side-user-btn normal" @click="goto('/userCenter/homePages')">个人资料</div>
            </div>
          </div>
        </template> -->
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import emptyData from "@/components/shop/emptyData";
import { upBackMixin, shopCartMixin } from "@/utils/common-mixins";

export default {
  name: "sideBar",
  components: { emptyData },
  mixins: [upBackMixin(), shopCartMixin()],
  props: {styles:{
    type:String,
    default:'white'//黑暗风格：darkness
  }},
  filters: {
    cut(num) {
      return num <= 99 ? num : "99+";
    }
  },

  data() {
    return {
      isFreely: false //是否展开 1雇主中心 2购物车
    };
  },
  created() {
    this.countChange();
   
  },
  mounted(){
     
  },
  computed: {
       ...mapState({
      envVars: "envVariables",
    }),
    showPlatFormKF() {
      return this.$route.path === "/category";
    },
    showStoreKF() {
      return true//(this.$route.path ==="/serviceDetails/ServGetDetailsPage/ServGetDetailsPage");
    },
    nowFreely() {
      switch (this.isFreely) {
        case 1:
          return { name: "雇主中心", icon: "&#xe652;" };
        case 2:
          return { name: "购物车", icon: "&#xe658;" };
        default:
          return {};
      }
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    token() {
      return this.$store.state.access_token;
    },
    storeInfo() {
      return this.$store.state.storeInfo;
    }
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    changeFreely(type,path) {
      if (!this.token){ 
        this.$loginp(0)
      }else{;//this.$router.push('/login')//
          if (type === 2){ 
            this.updateCartData();
          this.isFreely = type;
          }
          if(type==1){
            this.$router.push(path);
          }
      }
    },
    async del(cart_id) {
      (await this.delGoods({ cart_id: [cart_id] })) &&
        this.$message.success("删除成功,正在更新购物车");
    },
    openQQ() {
        window.open(`https://url.cn/59IhwSe?_type=wpa&qidian=true`);

    }
  }
};
</script>

<style scoped lang="less">
.side-bar {
  width:unset !important;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  z-index: 1000;
.nav-main{
  position: relative;
  background: #333333;
  .add_line:before,.add_bom_line:after{
     position: absolute;
     top: 0;
     left: 0;
     content: '';
     width: 100%;
      height: 1px;
      background: #333333 url('~assets/img/grey_line.png') no-repeat center center;
      background-size: 32px 100%;
    }
    .add_bom_line:after{
      bottom: 0;
      top: unset;
    }
  .nav {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0px, -50%);
    width: 40px;
    height: 100%;
    background: #333333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: -1;
    .nav-btn-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
        background: #333333;
      .active div .bott-text,.active div .icon {
        color: #ffffff;
      }
      .nav-btn {
        cursor: pointer;
        width: 40px;
        height: 52px;
        position: relative;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 7px;
        background:#333333;
        &:hover{
          &:nth-child(1):after{
            border-left: 6px solid #ffffff !important;
          }
        &::after {
            content: " ";
            position: absolute;
            right: 34px;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 0;
            height: 0;
            background: unset;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 6px solid #ffffff;
            border-right: 0 solid transparent;
          }
        }
       
        div{
          height: 100%;
        }
        &.fade-enter-active,
        &.fade-leave-active {
          transition: opacity 0.5s;
        }

        &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
          opacity: 0;
        }

        .icon {
          font-size: 19px;
          width: 20px;
          height: 20px;
        }
        .icon-geren,.icon-gouwuche {
          width: 20px;
          height: 24px;
        }
        & > img {
        }

        .icon-erweima {
          height: 25px !important;
        }

        .btn-tip {
          width: 90px;
          min-height: 100%;
          background: #ffffff;
          box-shadow: 0px 0px 5px 0px rgba(6, 1, 0, 0.35);
          line-height: 50px;
          text-align: center;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          position: absolute;
          right: 40px;
          top: 0;
          position: absolute;
          top: 0;
          right: -260px;
          z-index: -1;
          transition: all 0.3s;
          &.qr-tip {
            background: #fff;
            width: 100px;
            height: 100px;
            bottom: 0;
            top: unset;

            img {
              width: 100%;
              height: 100%;
            }
            &::after {
              border-left-color: #fff;
              top: unset;
              bottom: 12px;
            }
          }
        }
        .kefub-boxs{
          width: 260px;
          height: 258px;
          background: #ffffff;
          cursor: auto;
          &:after{
            top: -208px;
            border-left: 6px solid #ffffff !important;
          }
          p{
            height: 13px;
            line-height: 13px;
            color:rgba(102,102,102,1);
          }
         
          .kefub-tx,.contacts{
            width: 220px;
            margin: 0 auto;
          }
          .kefub-tx{
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            border-bottom: 1px solid #DDDDDD;
         
          }
          .contacts{
            padding: 11px 20px 15px;
            display: flex;
            flex-direction: column;
            height: 140px;
            .conta-nub{
              span:nth-child(2){
              font-weight:bold;
              color:rgba(51,51,51,1);
              font-size: 16px;
              margin-left: 5px;
              line-height: 14px;
              vertical-align: text-bottom;
            }
            .icon{
                color: #666666;
              }
            } 
            .consult-ent{
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              margin-top: 19px;
              height: 58px;
              a{
                display: block;
                width: 100%;
                height: 100%;
              }
              div{
                width: 80px;
                background:rgba(244,246,248,1);
                text-align: center;
                line-height: 38px;
                cursor: pointer;
                 &:hover{
                  box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.15);
                  p{
                    color: #ff0027;
                  }
              }
              }
              .icon{
                color: #F3262D;
                font-size: 23px;
              }
             
            }
            .conta-date{
              margin-top: 10px;
            }
          }
          .qrcode-boxs{
            background:rgba(244,246,248,1);
            display: flex;
            justify-content: space-between;
            padding: 10px 23px 10px 19px;
            height: 84px;
            .qrcodes{
              width: 64px;
              height: 64px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .code-text{
              width: 144px;
              p:nth-child(1){
                color:#F3262D;
                margin-bottom: 5px;
                text-align: left;
                font-weight:bold;
              }
              p:nth-child(2){
                color:rgba(153,153,153,1);
                line-height: 15px;
              }
            }
          }
        }
        .nav-dot {
          display: block;
          position: absolute;
          min-width: 17px;
          max-width: 28px;
          height: 17px;
          padding: 0 4px;
          text-align: center;
          line-height: 17px;
          border-radius: 17px;
          background: #f3262d;
          color: #fff;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          right: 2px;
          top: -6px;
          overflow: hidden;
        }
        .bott-text{
          margin-top: 2px;
        }
        &:hover,
        &:active {
          background: #f3262d;
          div{
            color: #ffffff !important;
          }

          .btn-tip {
            right: 40px;
            
          }

          .nav-dot {
            background: #fff;
            color: #f3262d;
          }
          
          .bott-text,.icon{
            color: #ffffff;
          }
        }
        
        &.active {
          background: #f3262d;

          .nav-dot {
            background: #fff;
            color: #f3262d;
          }
        }
      }
      .official{
        .btn-tip{
          display: none;
        }
        &:hover{
        .btn-tip{
          display: block;
          transition: unset;
        }
      }
        }
      
      .official-2{
        &::after{
            border: none !important;
          }
      }
    }
  }
}
.side-bar-white{
   .add_line:before{
     position: absolute;
     top: 0;
     left: 0;
     content: '';
     width: 100%;
      height: 1px;
      background: #ffffff url('~assets/img/jianbian.png') no-repeat center center;
      background-size:32px 100%;
    }
  .nav{
    display: block;
    height: auto !important;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 9px 0px rgba(0, 0, 0, 0.15);
    .nav-btn-box{
      color: #666666; 
      background: #ffffff;
      .official{
        .btn-tip{
          display: block;
          transition: all 0.3s !important;
        }
      }
      .nav-btn{
        background: #ffffff;
        .icon{
          color: #f3262d;
        }
        .bott-text{
          color: #333333;
        }
         &:after{
            border-left: 6px solid #ffffff !important;
            
        }
       }
    .btn-tip{
      background:rgba(255,255,255,1) !important;
      box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.15) !important;
      color: #666666 !important;
     
    }
    }
  }
 
}

  .side-con {
    width: 270px;
    background: #f4f6f8;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-direction: column;

    .amount {
      font-size: 16px;
      color: rgba(255, 0, 39, 1);
    }

    &.slide-right-enter-active,
    &.slide-right-leave-active {
      transition: width 0.5s;
    }

    &.slide-right-enter, &.slide-right-leave-to /* .fade-leave-active below version 2.1.8 */ {
      width: 0;
    }

    /* 右侧 头部*/

    .side-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      background: #eeeeee;
      padding: 10px 12px;
      min-width: 120px;
      width: inherit;
      color: #666666;

      .side-header-l {
        display: flex;
        align-items: center;

        .icon {
          text-align: center;
          line-height: 20px;
          width: 20px;
          height: 20px;
        }

        .side-title {
          margin-left: 9px;
        }
      }

      .el-icon-close {
        width: 10px;
        height: 10px;
        cursor: pointer;

        &:hover {
          color: #ff0027;
        }
      }
    }

    /* 右侧 主体*/

    .side-con-r {
      flex: 1;
      width: inherit;
      overflow-x: hidden;
      overflow-y: auto;
      min-width: 270px;
      /* 雇主中心 */

      &.side-user {
        background: #fff;

        .side-user-header {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 30px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);

          img {
            width: 55px;
            height: 55px;
            margin-right: 10px;
            border-radius: 50%;
          }
        }

        .side-user-btn-box {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .side-user-btn {
            padding: 9px 12px;
            background: rgba(243, 38, 45, 1);
            border-radius: 2px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 1;
            cursor: pointer;

            &.normal {
              background: rgba(244, 244, 244, 1);
              border: 1px solid rgba(223, 223, 223, 1);
              color: rgba(102, 102, 102, 1);
              margin-left: 20px;
            }
          }
        }
      }

      /* 雇主中心 */

      .side-no-data {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }

      .con-box {
        padding-top: 12px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);

        .con-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 8px;
        }

        .con {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          cursor: pointer;
          background: #fff;
          margin-top: 9px;
          padding: 15px 8px;

          img {
            width: 70px;
            height: 52.5px;
            margin-right: 8px;
          }

          .con-r {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            flex: 1;
            overflow: hidden;

            p {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 12px;
              color: rgba(102, 102, 102, 1);

              &:nth-child(2) {
                color: #999;
              }
            }

            .price-box {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .num {
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
              }

              .del-btn,
              .del-btn-place {
                width: 24px;
              }

              .del-btn {
                color: #0066cc;
                display: none;

                &:hover {
                  color: #f3262d;
                }
              }
            }
          }

          &:hover {
            .con-r > p:first-child {
              color: #f3262d;
            }

            .del-btn {
              display: block !important;
            }

            .del-btn-place {
              display: none;
            }
          }
        }
      }
    }

    /* 右侧底部按钮 */

    .res-box {
      width: inherit;
      min-width: 270px;
      padding: 18px 10px 18px 16px;
      height: 77px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 0px 1px 0px rgba(6, 0, 1, 0.2);

      .res-l {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        span {
          color: #f3262d;
        }

        .amount {
          margin-left: 14px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
      }

      .res-r {
        width: 100px;
        height: 36px;
        background: rgba(243, 38, 45, 1);
        border-radius: 2px;
        text-align: center;
        line-height: 36px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background: #f43c42;
        }
      }
    }
  }
}

</style>
