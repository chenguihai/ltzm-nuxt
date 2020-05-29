<template>
  <div class="store-flow">
    <div class="self">
      <div class="header">
        <div class="item-4 bott">
          <a href="javascript:;" @click="routerJump">立即入驻</a>
        </div>
      </div>
      <div class="center">
        <div class="item-1"></div>
        <div class="item-2"></div>
        <div class="item-3"></div>
        <div class="item-4">
          <a href="javascript:;" @click="routerJump">立即入驻</a>
        </div>
      </div>
    </div>
    <invite-login v-if="loginFlag" @close="handleClose" />
  </div>
</template>
<script>
import InviteLogin from "@/components/component/inviteLogin";
import { requestCode } from "@/api/invitation";
export default {
  name: "business",
  layout: "shop-flow-layout",
  head() {
    return {
      title: "立即入驻 - 商业机会 - 凌天众媒网",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "立即入驻凌天众媒网，获得更多的广告商业机会，广泛的商业合作，优质的商业展示"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "立即入驻，商业机会，商业合作，商业展示，凌天众媒网"
        }
      ]
    };
  },
  data() {
    const { inviteUserId = "" } = this.$route.query;
    return {
      loginFlag: false,
      userId: inviteUserId,
      token: ""
    };
  },
  mounted() {
    this.token = localStorage.getItem("access_token");
    this.token && this.getList();
  },
  components: { InviteLogin },
  methods: {
    routerJump() {
      if (this.token) {
        this.$router.push("/store?storeIndex=index");
      } else {
        this.loginFlag = true;
      }
    },
    handleClose() {
      this.loginFlag = false;
    },
    getList() {
      requestCode(this.userId)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="less">
.store-flow {
  .self {
    .header {
      display: block;
      height: 620px;
      background: url("~assets/img/store/head.jpg") no-repeat center;
      position: relative;
    }

    .center {
      position: relative;
      .item-1 {
        height: 735px;
        background: url("~assets/img/store/2.jpg") no-repeat center;
      }

      .item-2 {
        height: 918px;
        background: url("~assets/img/store/3.jpg") no-repeat center;
      }

      .item-3 {
        height: 750px;
        background: url("~assets/img/store/4.jpg") no-repeat center;
      }
      & > .item-4 {
        position: absolute;
        bottom: 206px;
        left: 50%;
        margin-left: -100px;
      }
    }
  }
  .item-4 {
    display: flex;
    align-items: center;
    justify-content: center;
    // padding-bottom: 100px;

    a {
      text-decoration-line: none;
      color: #fff;
      line-height: 46px;
      text-align: center;
      width: 200px;
      height: 46px;
      background: rgba(243, 38, 45, 1);
    //   box-shadow: 4px 4px 4px 0px rgba(3, 2, 5, 0.29);
      border-radius: 23px;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0px 2px 2px rgba(3, 2, 5, 0.29);
    }
  }
  .bott {
    // position: absolute;
    // bottom: 0;
    // left: 50%;
    // margin-left: 18%;
    // padding-bottom: 138px !important;
    width: 1226px;
    height: 620px;
    margin: 0 auto;
    justify-content: left !important;
    & > a {
      margin-top: 310px;
    }
  }
  .item-4 {
    & > a:hover{
      opacity: 0.8;
    }
  }
}
</style>
