<template>
  <div class="top">
    <div class="top-left user_select">
      <img src="~/assets/img/logo.png" alt="凌天众媒LOGO"  @click="clickLogin">

      <div class="text">
        欢迎登录
      </div>
    </div>
    <div class="top-right">
      <img src="../../assets/img/phone.gif" alt="">
      <img src="../../assets/img/sves-time.png" alt="">
    </div>
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
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .top-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  &>img{
    height: 58px;
    cursor: pointer;
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
    flex-wrap: wrap;
    width: 188px;
    p{
    width: 180px;
    color: #999999;
    font-size: 14px;
    padding-left: 4px;
    text-align-last: justify;
    }
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
