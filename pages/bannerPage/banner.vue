<template>
  <div class="redPage">
    <comHeader />
    <div class="red_img">
      <img src="@/assets/img/redPage/ban_01.jpg" alt />
      <img src="@/assets/img/redPage/ban_02.jpg" alt />
      <div class="imgBut">
        <img src="@/assets/img/redPage/ban_03.jpg" alt />
        <a @click="routerJump()"></a>
      </div>
      <img src="@/assets/img/redPage/ban_04.jpg" alt />
      <div class="more_ser">
        <img src="@/assets/img/redPage/ban_05.jpg" alt />
        <a href="/clues?page=1">更多需求等你来接单>></a>
      </div>
      <img src="@/assets/img/redPage/ban_06.png" alt />
      <div class="join_mf">
        <img src="@/assets/img/redPage/ban_07.jpg" alt />
        <a @click="routerJump()">立即免费入驻</a>
      </div>

      <div class="join_box">
        <span>保证金劲爆价 最低¥199起</span>
        <a @click="routerJump()">立即免费入驻</a>
        <span>活动时间：5月11日 - 6月30日</span>
      </div>

    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { changMobileP } from "@/api/list";
    import { Loginp } from '@/components/plugins/LoginPlugin'
export default {
  components: {
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      phone: "",
      codeNumInfo: "",
      isGetCode1: false,
      codeNum1: 60,
      codeInfo: "获取验证码",
      timerCode1: null
    };
  },
  methods: {
    getCodePhone() {
      var phone = this.phone;
      if (/^((13[0-9]|14[1|5-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8})$/.test(phone)) {
        if (this.ruleForm.phone != this.userp) {
          var data = { mobile: this.phone };
          changMobileP(data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("验证码已发送");
                this.timerCode1 = setInterval(() => {
                  this.codeNum1 -= 1;
                  if (this.codeNum1 <= 0) {
                    this.codeNum1 = 60;
                    this.isGetCode1 = false;
                    this.codeInfo = "重新获取";
                    clearInterval(this.timerCode1);
                    this.timerCode1 = null;
                  }
                }, 1000);
                this.isGetCode1 = true;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              this.$message.error(err.data.message);
            });
        } else {
          this.$message.error("手机号码已注册");
        }
      } else {
        this.isGetCode1 = false;
      }
    },
      routerJump() {
                let token = localStorage.getItem('access_token');
                if(token){
                    this.$router.push('/store?storeIndex=index');
                }else{
                    Loginp(0, () => window.location.reload(true))
                }
            }
  }
};
</script>
<style lang="less" scoped>
/deep/ .comHeader {
  /deep/ & > .head {
    display: none;
  }
}
.redPage {
  width: 1920px;
  margin: 0 auto;
  .red_img {
    width: 1920px;
    position: relative;
    font-family: Alibaba PuHuiTi;
    img {
      display: block;
    }
    .imgBut {
      position: relative;
      & > a {
        position: absolute;
        bottom: 66px;
        left: 50%;
        margin-left: -187px;
        width: 374px;
        height: 99px;
        background: url("../../assets/img/redPage/ban_07.png") no-repeat;
        cursor: pointer;
      }
      & > a:hover {
        background: url("../../assets/img/redPage/ban_08.png") no-repeat;
      }
    }
    .more_ser {
      position: relative;
      & > a {
        position: absolute;
        bottom: 142px;
        right: 468px;
        font-size: 16px;
        line-height: 16px;
        color: #f3262d;
        font-weight: bold;
        cursor: pointer;
        font-family: simsun;
      }
       & > a:hover{
           opacity: 0.9;
       }
    }
    .join_box {
      position: absolute;
      top: 535px;
      left: 50%;
      margin-left: -340px;
      width: 680px;
      height: 218px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 18px 0px rgba(229, 45, 30, 0.21);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & > :nth-child(1) {
        color: #f93223;
        font-size: 32px;
        font-weight: bold;
        margin-top: 30px;
        line-height: 32px;
      }
      & > :nth-child(2) {
        width: 350px;
        height: 78px;
        margin-top: 24px;
        background: linear-gradient(
          270deg,
          rgba(250, 58, 43, 1) 0%,
          rgba(255, 134, 125, 1) 100%,
          rgba(255, 255, 255, 1) 100%,
          rgba(255, 131, 122, 1) 100%
        );
        border-radius: 39px;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        line-height: 78px;
        color: #fff;
        cursor: pointer;
      }
      & >a:hover {
        opacity: 0.9;
      }
      & > :nth-child(3) {
        font-size: 20px;
        color: #666;
        line-height: 20px;
        margin-top: 13px;
      }
    }
    .join_mf {
      position: relative;
      & > a {
        position: absolute;
        left: 50%;
        margin-left: -180px;
        top: 50%;
        margin-top: 39px;
        width: 360px;
        height: 78px;
        background: #ffe63c;
        border-radius: 39px;
        text-align: center;
        line-height: 78px;
        font-size: 40px;
        color: #915800;
        cursor: pointer;
      }
       & > a:hover{
           opacity: 0.9;
       }
    }
    
  }
}
</style>
