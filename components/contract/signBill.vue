<template>
  <!-- identity 1 服务商视角 -->
  <div class="sign-bill">
    <span class="r-t-t" :class="{red:(orderInfo.order_status >= 1 && ![8,9].includes(orderInfo.order_status))}">签单</span>
    <div class="right">
      <!-- <div class="qd-item" v-if="orderInfo.order_status <= 2 && orderInfo.confirm_status !== 1">
        <span>正在等待{{identity === 1 ? '服务商' : '您'}}接单</span>
      </div> -->
       <div class="qd-item">
        <span>您已与{{identity === 1 ? '服务商' : '雇主'}}</span>
        <img class="avatar" v-if="avatar" :src="avatar.indexOf('http')>-1?avatar:envVars.IMG_HOST +avatar"/>
        <img class="avatar" v-else src="~assets/img/userDataImg.png"/>
        <span class="oth-name">
          {{storeName}}
        </span>
        <span>完成签单啦</span>
        <div class="kf-box" @click="concat" v-if="showKf">
          <img class="qq" src="~assets/img/shop/counseling_style_52.png">
        </div>
      </div>
      <p class="no-default" v-for="item in logArr" :key="item.id">
        <span v-if="userInfo">
          {{userInfo.original.id === item.user_id ? '您' : identity === 1 ? '服务商' : '雇主'}}
        </span>
        <span v-html="item.operate"></span>
        <span class="log-time">{{item.created_at}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'signBill',
  inject: ['identity', 'orderInfo'],
  data () {
    return {
      userInfo: false
    }
  },
  mounted () {
    if (!process.server) {
      let userInfo = localStorage.getItem('userInfo')
      userInfo = userInfo ? JSON.parse(userInfo) : false
      this.userInfo = userInfo
    }
  },
  computed: {
    storeName () {
      return this.identity === 1
        ? this.orderInfo.employee.store_name
        : this.orderInfo.employer.nick_name
    },
    avatar () {
      return this.identity === 1
        ? this.orderInfo.employee.logo
        : this.orderInfo.employer.avatar
    },
    showKf () {
      return this.identity === 1
    },
    logArr () {
      return this.orderInfo ? this.orderInfo.operateLog.filter(log => log.step === 1) : []
    },
    ...mapState({
      envVars: "envVariables",
    })
  },
  methods: {
    concat () {
      if (this.orderInfo.employee.kf_account) {
        window.open(`tencent://message/?uin=${this.orderInfo.employee.kf_account}`)
      } else {
        this.$message.error('该服务商暂无客服')
      }
    }
  }
};
</script>

<style scoped lang="less">
.sign-bill {
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  .r-t-t {
    color: #333;
    font-size: 14px;
    position: relative;
    display: inline-block;
    padding-left: 12px;
    padding-top: 6px;
    &::before {
      display: block;
      content: "";
      position: absolute;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: #cccccc;
      left: 0;
      top: 3px;
      bottom: 0;
      margin: auto;
      z-index: 2;
    }
    &.red::before {
      background: #f3262d;
    }
  }

  .right {
    margin-left: 18px;
    .qd-item {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #666;
      }
      .oth-name {
        color: #f3262d;
      }

      .avatar {
        margin-left: 6px;
        margin-right: 6px;
        height: 32px;
        width: 32px;
        border:1px solid #e3e3e3;
        border-radius: 50%;
      }
      .kf-box {
        cursor: pointer;
        img{
          margin-top:6px;
        }
      }
      .qq {
        width: 77px;
        height: 22px;
        margin-left: 6px;
      }
    }

    .no-default {
      width: 880px;
      font-size: 0;
      height: 30px;
      background: #fff8f8;
      margin: 10px 0;
      padding: 0 10px;
      color: #666;
      /deep/ span {
        font-size: 12px;
        line-height: 30px;
        display: inline-block;
      }
      .log-time {
        display: inline-block;
        margin-left: 16px;
      }
      .money {
        color: #f3262d;
      }
    }
  }
}
</style>
