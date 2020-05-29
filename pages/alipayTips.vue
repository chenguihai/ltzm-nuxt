<template>
  <div class="newsInformation" v-if="isShow">
    <sHeader />
    <div class="wrap">
      <div class="m-alipay-tips-wrap">
        <div class="m-title">
          <img src="~assets/img/icon-alipay-title.png" alt="">
          <h3>确认结果</h3>
          <p>温馨提示：支付请求已受理，结果确认中，请耐心等待。您也可稍后在订单中查看支付结果，切勿重复支付！</p>
        </div>
        <div class="content">
          <img src="~assets/img/icon-wait.png" alt="" />
          订单号{{orderId}}支付成功，请关闭当前页面
        </div>
      </div>

    </div>

  </div>
</template>
    <script>
import sHeader from "@/components/component/sHeader";
import { mapState } from "vuex";
export default {
  components: {
    sHeader,
  },

  computed: {
   ...mapState({ envVars: "envVariables" }),
  },
  data() {
    return {
      isShow:false,
      seleIndex: 0,
      orderId:null
    };
  },
  created() {

  },
  mounted() {
    let fullPath = this.$route.fullPath
    let queryStr = fullPath.split('?')[1]
    var is_mobile = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    if(is_mobile && queryStr){
      window.location.href = `${this.envVars.API_ROOT_URL}alipay_tips?${queryStr}`
    }
    this.isShow = true;
    let order_id = this.$route.query.out_trade_no
    this.orderId= order_id
  },
  methods: {
    init() {

    }
  }
};
</script>
<style lang="less">
  .wrap{
    background:#F4F4F4;
    min-height:800px;
    padding-top:20px;
  }
.m-alipay-tips-wrap {
  width:720px;
  height:500px;
  background:#fff;
  padding-top:60px;
  padding-right:60px;
  padding-left:91px;
  margin:0 auto;
  border:1px solid #ccc;
  .m-title{
    padding-left:63px;
    position: relative;
    img{
      display: block;
      position: absolute;
      left:0;
      top: 4px;
      width:58px;
      height:62px;
    }
    h3{
      font-size:24px;
      color:#333;
    }
    p{
      font-size:12px;
      color:#999;
    }
  }
  .content{
    padding-top:100px;
    height:32px;
    text-align: center;
    color:#666;
    line-height:32px;
    img{
      margin-right:10px;
      width:32px;
      height:32px;
      vertical-align: middle;
    }
  }
}
</style>
