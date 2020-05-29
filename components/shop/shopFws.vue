<template>
  <!-- 服务商部分 -->
  <aside class="fws_aside">
    <div class="logo" v-if="showLogo">
      <img
        src="~/assets/img/userDataImg.png"
        v-lazy="storeInfo.logo+'?x-oss-process=image/resize,m_fill,h_257,w_257'"
        alt="店铺logo"
      />
    </div>

    <div class="fws_wrap" v-if="showFws">
      <div class="top">
        <img class="bzj-icon" src="~/assets/img/_bzj.png" />
        <div>
          <strong>服务商已缴纳</strong>
          <p class="mg-box">
            <span class="fs_12">保证金：</span>
            <span class="margin-sum">{{fixedMarginSum}}</span>
          </p>
        </div>
      </div>
      <div class="top-info">
        <span>保障雇主权益，出问题</span>
        <span class="margin-sum">&nbsp;保证金赔付</span>
      </div>
    </div>

    <div class="fws_bottom" v-if="showKf">
      <h3 :class="titlebg?'active':''">联系客服</h3>
      <div
        class="fws_text"
        v-if="storeInfo.customer_services && storeInfo.customer_services.length !== 0"
      >
        <div
          @click="openQQ(item.kf_account)"
          v-for="(item, idx) in storeInfo.customer_services"
          :key="idx"
          class="concat"
        >
          <img src="~assets/img/shop/counseling_style_52.png" />
          <span>{{item.kf_name}}</span>
        </div>
      </div>
      <div class="fws_not" v-else>店铺暂时还未添加客服QQ哦</div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "shopFws",
  props: {
    showLogo: {
      type: Boolean,
      default: true
    },
    showFws: {
      type: Boolean,
      default: true
    },
    showKf: {
      type: Boolean,
      default: true
    },
    storeData: Object,
    fwsFixed: {
      type: Number,
      default: 0
    },
    titlebg: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState({ envVars: "envVariables" }),
    storeInfo() {
      return this.storeData || this.$store.state.storeInfo;
    },
    fixedMarginSum() {
      return this.storeInfo
        ? (+this.storeInfo.marginsum).toFixed(this.fwsFixed || 0)
        : 0;
    }
  },
  methods: {
    openQQ(qq) {
      window.open(`tencent://message/?uin=${qq}`);
    }
  }
};
</script>

<style scoped lang="less">
@pred: #ff0027;
.f_size12 {
  font-size: 12px;
}

.fws_aside {
  max-width: 277px;
  width: 100%;

  .logo {
    border: 1px solid #eee;
    padding: 10px;
    background: #fff;

    img {
      width: 257px;
      height: 257px;
    }
  }
}

.fws_wrap {
  margin-top: 16px;
  background: #a1df2a;
  padding: 20px;

  .margin-sum {
    font-size: 12px;
    /*font-weight: bold;*/
    color: @pred;
  }

  .top {
    display: flex;
    align-items: center;

    .mg-box {
      margin-top: 11px;
      font-weight: bold;
    }

    .margin-sum;
    color: #fff;
    font-size: 14px;

    .bzj-icon {
      font-size: 50px;
      text-align: center;
      margin-right: 18px;
    }
  }

  .top-info {
    font-size: 12px;
    margin-top: 17px;
    color: #fff;
    font-weight: bold;
  }
}

.fws_bottom {
  margin-top: 16px;
  border: 1px solid #eee;
  background: #fff;

  h3 {
    color: #666;
    font-size: 16px;
    text-indent: 10px;
    height: 46px;
    line-height: 46px;
    font-weight: 400;
  }

  .active {
    background-color: #e9edee;
    color: #333;
  }
}

.fws_text {
  flex-wrap: wrap;
  padding: 10px;

  .concat {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    margin-bottom: 8px;

    &:hover {
      color: #f3262d;
    }

    img {
      width: 77px;
      height: 22px;
    }

    span {
      flex: 1;
      margin-left: 3px;
    }
  }
}

.fws_not {
  padding: 30px 10px 50px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #666;
}
</style>
