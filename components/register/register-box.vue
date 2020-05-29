<template>
  <div class="register-box">
    <div class="head">
      <a href="javascript:;" class="active">手机注册</a>
    </div>
    <div class="content">
      <regCon></regCon>
    </div>
    <div class="register-button">
      <nuxt-link to="/login" tag="p"><span>已有账户</span>立即登录</nuxt-link>
    </div>
  </div>
</template>

<script>
import regCon from './reg-form'

export default {
  components: { regCon }
}
</script>

<style scoped lang="less">
.register-box {
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-bottom: 2px solid #f3262d;
    margin: 26px 26px 0 26px;
    box-sizing: border-box;
    a {
      text-decoration-line: none;
      line-height: 40px;
      color: #333333;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .content {
    width: 336px;
    padding: 26px;
    padding-bottom: 0;
    padding-top: 40px;
  }
  .register-button {
    text-align: center;
    background: #f3f3f3;
    margin-top: 10px;
    padding: 15px;

    p {
      text-decoration-line: none;
      color:#f3262d;
      cursor:pointer;
    }

    span {
      color: #666;
      margin-right: 10px;
    }
  }
}
</style>
