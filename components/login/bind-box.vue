<template>
  <div class="login-box">
    <div class="head">
      <a href="javascript:;" @click="hoverHandle('first')" :class="{active:index===1}" ref="first" v-model="index">账号密码</a>
      <a href="javascript:;" @click="hoverHandle('second')" :class="{active:index===2}" ref="second" v-model="index">手机验证码</a>
    </div>
    <div class="content">
      <div class="box" :style="{'left':boxLeft+'px'}">
        <div class="first">
          <account-login :isBind="true"/>
        </div>
        <div class="second">
          <CodeLogin :isBind="true"></CodeLogin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountLogin from './account-login'
import CodeLogin from './code-login'
import RegForm from '../register/reg-form'
export default {
  components: {
    AccountLogin, CodeLogin,RegForm
  },
  data () {
    return {
      index: 1,
      boxLeft: 0,
      timer: null
    }
  },
  methods: {
    hoverHandle (index) {
      if (index === 'first') {
        this.index = 1
        this.clearTimer()
        this.timer = setInterval(() => {
          this.boxLeft += 10
          if (this.boxLeft >= 0) {
            this.boxLeft = 0
            this.clearTimer()
          }
        }, 10)
      } else if (index === 'second') {
        this.index = 2;
        this.clearTimer()
        this.timer = setInterval(() => {
          this.boxLeft -= 10
          if (this.boxLeft <= -290) {
            this.boxLeft = -290
            this.clearTimer()
          }
        }, 10)
      }
    },
    clearTimer () {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style scoped lang="less">
.login-box {
  padding: 26px;
  height:400px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 40px;
    border-bottom: 2px solid #ccc;

    a {
      display: block;
      width: 146px;
      text-decoration-line: none;
      text-align: center;
      line-height: 40px;
      color: #999999;
      font-size: 16px;
      position: relative;
      top: 2px;

      &.active {
        border-bottom: 2px solid #f3262d;
        font-weight: bold;
        color: #333;
      }
    }
  }
  .content {
    position: relative;
    width: 290px;
    overflow: hidden;
    height:270px;
    .box {
      position: absolute;
      width: 580px;
      left: 290px;
      display: flex;
      top: 40px;
      .first {
        width: 290px;
      }
      .second {
        width: 290px;
      }
    }
  }
}
</style>
