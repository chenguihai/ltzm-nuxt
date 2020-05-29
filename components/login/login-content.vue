<template>
  <div class="content">
    <div class="img">
      <img :src="envVars.IMG_HOST+ad_img" alt/>
    </div>
    <div class="login-wrap">
      <div class="login-box _out-box">
        <div class="imgS" v-if="flag">
          <span>扫一扫登录安全便捷</span>
          <img @click="changeTo(2,'qrcode')" src="../../assets/img/order/erweima.png" alt />
        </div>
        <component :is="nowLogin" @close="loginType = 0"></component>
        <div class="reg" v-show="loginType === 0">
          <div class="bot-top">
            <p>使用合作方账号登录</p>
            <nuxt-link to="/register" style="font-size:12px;">注册新账号></nuxt-link>
          </div>

          <div class="bot">
            <div class="outh-box">
              <div class="outh" @click="outhQQ">
                <img class="outh-icon" src="@/assets/img/QQ-2.png" @mouseenter="outhAnimate" />
                <span>QQ</span>
              </div>
              <div class="outh" @click="changeTo(2)">
                <img class="outh-icon" src="@/assets/img/weixin.png" />
                <span>微信</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginBox from "./login-box";
import WxLogin from "./wx-login";
import { mapState } from "vuex";
import { homeimage } from "@/api/list";
import dataEventTrack from '@/utils/dataEventTrack';

export default {
  data() {
    return {
      ad_img: "",
      loginType: 0,
      flag: true,
      loginMapList: new Map([
        [0, LoginBox],
        [1, LoginBox],
        [2, WxLogin]
      ])
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    nowLogin() {
      return this.loginMapList.get(this.loginType);
    }
  },
  mounted() {
    this.init();
      // 登陆页曝光事件埋点
  dataEventTrack({
       referer: document.referrer,
       event_type: 'page_show',
       kv: {
         router: '/login',
       }
     })
  },
  methods: {
    init() {
      var type = "16";
      homeimage(type)
        .then(res => {
          if (res.data.code == 200) {
            this.ad_img = res.data.data.ad_img;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeTo(type,ranme) {
      this.loginType = type;
      if (this.loginType === 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
         dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
            router: '/login',
            rname:ranme=='qrcode'?'微信扫一扫':'微信图标',
          }
        })
    },
    outhQQ() {
         dataEventTrack({
          referer: document.referrer,
          event_type: 'click',
          kv: {
            router: this.$route.fullPath,
            rname:'QQ图标',
          }
        })
      let win = window.open(`${this.envVars.API_ROOT_URL}/qq/login`);

    },
    outhAnimate(e) {
      let el = e.target;
    },

  },
  watch: {
    loginType(newVal) {
      if (this.loginType === 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "./out.less";
@keyframes fly {
  0% {
    top: 0px;
  }
  50% {
    top: -8px;
  }
  100% {
    top: 0px;
  }
}
.login-wrap {
  & > div {
    position: relative;
    & > .imgS {
      position: absolute;
      right: 4px;
      top: 4px;
      display: flex;
      & > span {
        width: 140px;
        height: 22px;
        font-size: 12px;
        color: #f3262d;
        background: url("../../assets/img/order/redKuang.png") no-repeat;
        background-size: 140px 22px;
        text-align: center;
        line-height: 22px;
      }
      & > img {
        width: 52px;
        height: 52px;
        cursor: pointer;
      }
    }
  }
}
.reg {
  padding: 10px 30px 16px;
  box-sizing: border-box;
  height: 75px;
  background: #f3f3f3;
  p {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
  }
  a {
    color: #f3262d;
  }
  .bot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .bot-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
  }
  .outh-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .outh {
      position: relative;
      height: 24px;
      width: 64px;
      cursor: pointer;
      &:first-child {
        span {
          border-right: 1px solid #bdbdbd;
        }
      }
      .outh-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        &:hover {
          animation: fly 0.8s 1 ease-in-out;
          -moz-animation: fly 0.8s 1 ease-in-out; /* Firefox */
          -webkit-animation: fly 0.8s 1 ease-in-out; /* Safari and Chrome */
          -o-animation: fly 0.8s 1 ease-in-out; /* Opera */
        }
      }
      span {
        margin-left: 5px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding-right: 14px;
        line-height: 24px;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        &:hover {
          color: #f3262d;
          text-decoration: unset;
        }
      }
      &:last-child {
        margin-left: 14px;
        span {
          padding-right: 9px;
        }
      }
    }
  }
}
.content {
  height: 610px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  // background: linear-gradient(to right,#c31b1d,#e87055);
       background: url('../../assets/img/novicClick/banner_login.png') no-repeat;
  background-size: 100% 100%;
  .img {
    width: 1270px;
    margin: 0 auto;
    position: relative;
    img {
      width: 1920px;
      height: 610px;
      display: block;
      position: absolute;
      left: 50%;
      margin-left: -960px;
    }
  }

  .login-wrap {
    width: 1200px;
    margin: 0 auto;
    height: 610px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .login-box {
      background: white;
    }
  }
}
</style>