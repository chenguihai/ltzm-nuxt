<template>
  <div class="top">
    <div class="top-left user_select" >
      <img src="~/assets/img/logo.png" alt="凌天众媒LOGO" @click="clickLogin">
      <div class="text">
        找回密码
      </div>
    </div>
    <!-- <div class="top-right">
      <a href="javascript:;" title="" class="wechat"></a>
      <a href="https://weibo.com/" title="关注新浪微博" class="sina"></a>
      <a href="http://e.t.qq.com/" title="http://t.qq.com/" class="tencent"></a>
    </div> -->
  </div>
</template>
<script>
export default {
  methods: {
    clickLogin () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  max-width: 920px;
  padding: 20px 0 15px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .top-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    line-height: 1;

    &>img{
    cursor: pointer;
    height: 58px;
    }
    .text {
      margin-left: 32px;
      height: 44px;
      line-height: 44px;
      font-size: 28px;
      color: #666;
      position: relative;
      &::after {
        display: block;
        content: "";
        height: 44px;
        width: 1px;
        background: #eee;
        position: absolute;
        left: -16px;
        top: 0px;
      }
    }
  }

  .top-right {
    display: flex;
    width: 354px;

    a {
      display: block;
      margin-top: 10px;
    }

    .wechat {
      height: 24px;
      width: 24px;
      background: url("../../assets/img/user-icon.png") no-repeat -53px -60px;
      margin-right: 20px;
    }

    .sina {
      height: 24px;
      width: 24px;
      background: url("../../assets/img/user-icon.png") no-repeat -53px -27px;
      margin-right: 20px;
    }

    .tencent {
      height: 24px;
      width: 24px;
      background: url("../../assets/img/user-icon.png") no-repeat -53px -0px;
    }
  }
}
</style>
