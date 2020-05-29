<template>
  <div class="wx-box">
    <i class="iconfont icon-guanbi close" @click="$emit('close')"></i>
    <div class="head">
      <a href="javascript:;" class="active">微信登录</a>
    </div>
    <div class="tip">
      <img src="@/assets/img/sys.png">
      <div>
        <p>用微信<span>扫一扫</span></p>
        <p>方便快捷登录</p>
      </div>
    </div>
    <div class="qr-box" v-loading="loading">
      <img :src="codeData.qr_code" alt="">
      <div v-if="secondsNum<=1" class="lose_fficacy">
        <div class="text">二维码已失效</div>
        <div class="get_btn" @click="refreshHand">点击刷新</div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, get_verify_code, getUserInfo ,getURCode,getCodeRes} from '@/api/list'
import { mapMutations, mapState } from 'vuex'
import { tokenDoing } from '@/utils/tool'
const apiDomain = (() => {
  switch (process.env.NODE_ENV) {
    case 'test1':
      return 'https://api.lingtianzhongmei.com/'
    case 'dev':
      return 'http://dev.api.zhongmei66.com/'
    case 'online':
      			return 'https://zhongmei66.com'

    default:
      return 'https://api.zhongmei66.com/'
  }
})()
export default {
  name: 'WxLogin',
  data () {
    return {
      callbackUrl: `${apiDomain}api/wechat/callback`,
      appid: 'wx222d7d5a83eb47ab',
      loading: true,
      apiUrl: `${apiDomain}/api/proxy/wx/qr-code`,
      qrcode:'',
      codeData:{},
      secondsNum:140,//2秒一次，二维码300秒后失效
      timer:''
    }
  },
  mounted () {
    this.getCode()
             console.log('111111',this.userInfo)

  },
  methods: {
    refreshHand(){
      this.secondsNum = 140
      this.getCode() 
    },
    getCode(){
      getURCode().then((res)=>{
        if(res.data.code==200){
          this.loading = false
          this.codeData = res.data.data
          console.log( this.codeData)
           this.timer = setInterval(()=>{
            this.secondsNum-=1
            this.scanCodeRes()
            if(this.secondsNum==1){
              clearInterval(this.timer)
            }
          },2000)
        }
      })
    },
    scanCodeRes(){
      getCodeRes({scene_id:this.codeData.scene_id}).then((res)=>{
        if(res.data.code==200&&res.data.data.Location){
         location.href = res.data.data.Location
        //  console.log(res.data.data.Location)
         
        }
      })
    }
  },
  destroyed(){
    clearInterval(this.timer)
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="less">
.b-hover {
  cursor: pointer;
  &.active,
  &:hover,
  &:active {
    color: #f02a35;
  }
}
.wx-box {
  min-width: 345px;
  width:100%;
  position: relative;
  padding-top:1px;
  .close {
    position: absolute;
    right: 13px;
    top: 13px;
    font-size: 16px;
    width: 14px;
    height: 14px;
    .b-hover;
  }
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
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
    margin-top: 18px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
    span {
      color: #f3262d;
    }
  }
  .qr-box {
    margin: 26px auto 96px auto;
    width: 184px;
    height: 175px;
    background: #ccc;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .lose_fficacy{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      z-index: 9999;
      text-align: center;
      .text{
        margin-top: 54px;
        color: #333333;
      }
      .get_btn{
        width: 120px;
        height: 36px;
        line-height: 36px;
        border-radius: 3px;
        background: #f3262d;
        margin: 10px auto 0;
        color: #ffffff;
        cursor: pointer;
        &:hover{
          background: #f43c42;
        }
      }
    }
  }
}
</style>
