<template>
  <!-- 雇主中心左边导航 -->
  <div class="user_center">
    <div class="user">
      <div class="user_cen_left">
        <nuxt-link tag="h2" to="/userCenter/homePages" :class="rout=='/userCenter/homePages'?'nuxt-link-active':''">雇主中心</nuxt-link>
        <div class="user_cen_top">
          <h3>交易管理</h3>
          <ul class="nav_center trading_center">
            <li>
              <nuxt-link to="/userCenter/myOrder/myOrder">服务订单</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/caseOrder/caseOrder">案例订单</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/biogOrder/biogOrder">传记订单</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/publishOrder/publishOrder">上刊画面订单</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/myEvaluate/myEvaluate">我的评价</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/myInvoice/myInvoice">我的发票</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/myRefund/myRefund">我的退款</nuxt-link>
            </li>
          </ul>
          <h3>我的关注</h3>
          <ul class="nav_center my_attention">
            <li>
              <nuxt-link to="/userCenter/collect/collect">我的收藏</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/footprint/footprint">我的足迹</nuxt-link>
            </li>
          </ul>
          <h3>个人资料</h3>
          <ul class="nav_center personal_data">
            <li>
              <nuxt-link to="/userCenter/myData/myData">基本资料</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/myBank/myBank">银行卡管理</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/invoiceTitle/invoiceTitle">发票抬头管理</nuxt-link>
            </li>
          </ul>
          <h3>账户管理</h3>
          <ul class="nav_center account management">
            <li>
              <nuxt-link to="/userCenter/realName/realName">实名认证</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/revisionPhone/revisionPhone">修改绑定手机</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/revisionPass/revisionPass">修改登录密码</nuxt-link>
            </li>
            <li>
              <!-- <nuxt-link to="/userCenter/paymentCode/paymentCode">{{title}}</nuxt-link> -->
            </li>
          </ul>
          <h3>我发布的</h3>
          <ul class="nav_center ma_issue">
            <!-- <li>我发布的任务</li> -->
            <li>
              <nuxt-link to="/userCenter/myThread/myThread">我发布的线索</nuxt-link>
            </li>
          </ul>
          <h3>消息中心</h3>
          <ul class="nav_center personal_data">
            <li>
              <nuxt-link to="/userCenter/tradeNews/tradeNews">交易消息</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/userCenter/systemNews/systemNews">系统消息</nuxt-link>
            </li>
          </ul>
          <h3>保障服务</h3>
          <ul class="nav_center personal_data">
            <li>
              <nuxt-link to="/userCenter/myReport/myReport">我的举报</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import { delCookie, delLocalStorage } from "../../utils";
export default {
  name: "userCenter",
  props: {
    textT: {
      default: "设置支付密码",
      type: String
    }
  },
  data() {
    return {
      title: this.textT,
      rout:''
    };
  },
  async mounted() {
    this.rout = $nuxt.$route.path
     let userInfo = localStorage.getItem("userInfo");
    if (this.Token && userInfo) {
    this.Token && (await this.setUser(this.Token));
    }
  },
  methods: {
   
  },
  watch: {
    textT(newVal) {
      this.title = newVal;
     
    }
  }
};
</script>

  <style lang="less" scoped>
.user_center {
  width: 160px;
  text-align: center;
  background: #fff;
  .user {
        padding: 0 10px;
    .user_cen_left {
      background: rgb(163, 157, 157);
      width: 160px;
      height: 100%;
      overflow: hidden;
      padding-bottom: 9999px;
      margin-bottom: -9999px;
      display: inline;
      .nuxt-link-active{
        color: #ff0027
      }
        h2:hover{
          color: #ff0027;
        }
      h2 {
        font-size: 16px;
        color: #333;
        display: block;
        height: 49px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        line-height: 49px;
        padding: 0 0 0 20px;
        text-align: left;
        font-weight: 600;
      }
      .user_cen_top {
        h3 {
          font-size: 16px;
          padding: 0 0 0 20px;
          padding-top: 20px;
          text-align: left;
        }
        .nav_center {
          padding: 0 0 0 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #dfdfdf;
          li {
            color: #666;
            font-size: 14px;
            line-height: 35px;
            text-align: left;
            a {
              text-decoration: none;
              color: #666;
              &:hover {
                color: #ff0027;
              }
            }
            .nuxt-link-active {
              color: #ff0027;
            }
          }
        }
        & > .nav_center:last-child {
          border-bottom: 0;
        }
      }
    }
  }

}
</style>

