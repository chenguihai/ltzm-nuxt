<template>
  <div class="canvasBox" :class="{'bg-white':isSign}" ref="canvasHW">
    <div class="title">
      <span @click="close" id="close">×</span>
      <p>手绘个人签名</p>
      <span id="data" @click="commit">提交</span>
    </div>
    <div v-if="isSign">
      <div class="success-box">
        <img width="106" src="../../assets/img/icon_sign_mobile.jpg" alt />
        手绘签名完成，请在PC上查看
      </div>
    </div>
    <div v-else>
      <div class="bg_img">
        <img src="../../assets/img/bg_sign.png" alt />
      </div>
      <canvas
        class="canvas-obj"
        v-if="!isSign"
        ref="canvasF"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></canvas>
      <img class="imgCanvas" :src="imgUrl" />
      <ul>
        <li>
          <!--                     <span class="text">颜色:</span>-->
          <!--                     <span class="color select" style="background-color: black;"></span>-->
        </li>
        <li style="text-align: right;">
          <span id="clear" @click="overwrite">
            <span class="iconfont icon-shanchu"></span>清除
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getCookie, setCookie } from "../../utils";
import { eSignUser } from "../../api/contract";
export default {
  middleware: ["auth"],
  head() {
    return {
      title: "凌天众媒",
      meta: [
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "x5-fullscreen", content: "true" },
        { name: "screen-orientation", content: "portrait" },
        { name: "x5-orientation", content: "portrait" },
        { name: "fullscreen", content: "yes" }
      ]
    };
  },
  data() {
    return {
      isEmpty: true,
      isSign: false,
      ordersn: null,
      imgUrl: "",
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess
    };
  },
  created() {
    let order_sn = this.$route.query.sn;
    this.ordersn = order_sn;
  },
  beforeMount() {
    let access_token = this.$route.query.token;
    setCookie("access_token", access_token);
    let storage = window.localStorage;
    storage.setItem("access_token", access_token);
  },
  mounted() {
    let _this = this;
    let canvas = _this.$refs.canvasF;
    canvas.height = _this.$refs.canvasHW.offsetHeight;
    canvas.width = _this.$refs.canvasHW.offsetWidth - 5;
    _this.canvasTxt = canvas.getContext("2d");
    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(
      evt,
      function() {
        setTimeout(function() {
          canvas.height = _this.$refs.canvasHW.offsetHeight;
          canvas.width = _this.$refs.canvasHW.offsetWidth - 5;
          _this.canvasTxt = canvas.getContext("2d");
        }, 50);
      },
      false
    );
  },
  methods: {
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    CloseWebPage() {
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
          window.opener = null;
          window.close();
        } else {
          window.open("", "_top");
          window.top.close();
        }
      } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = "about:blank ";
      } else {
        window.opener = null;
        window.open("", "_self", "");
        window.location.href = "about:blank";
        window.close();
      }
    },
    close() {
      if (this.isWeiXin()) {
        WeixinJSBridge.call("closeWindow");
      } else {
        this.CloseWebPage();
      }
    },
    //mobile
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      this.isEmpty = false;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y: ev.targetTouches[0].clientY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //pc
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
      }
    },
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    mouseUp(ev) {
      ev = ev || event;
      this.isEmpty = false; //（疑似签合同问题问题）
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.isEmpty = true;
      this.points = [];
    },
    //提交签名
    commit() {
      let _this = this;
      this.imgUrl = this.$refs.canvasF.toDataURL();
      let data = {
        base: this.imgUrl.split(",")[1],
        ordersn: this.ordersn
      };
      if (!this.isEmpty) {
        eSignUser(data)
          .then(res => {
            if (res.data.code == 200) {
              _this.isSign = true;
            }
          })
          .catch(err => {
            _this.$message.error(err.message);
          });
      } else {
        this.$message.error("您还未签名，请先完成签名后再提交。");
      }
    }
  }
};
</script>

<style scoped>
.title {
  width: 50px !important;
  right: 0px;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #000;
  z-index: 40;
}

.title p,
.title #data {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
}
.title span {
  position: absolute;
  right: 0px;
  cursor: pointer;
  width: 50px;
  text-align: center;
  color: #fff;
  display: block;
  margin: 0 auto;
}
.title #close {
  top: 20px;
}
.title #data {
  bottom: 20px;
}
.iconfont {
  margin-right: 8px;
}
@media screen and (orientation: portrait) {
  .canvasBox {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .bg-white {
    background: #fff !important;
  }
  .bg_img {
    position: absolute;
    width: 363px;
    height: 72px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -181px;
    margin-top: -36px;
    z-index: 20;
  }
  .bg_img img {
    width: 100%;
    height: 100%;
  }
  .success-box {
    position: absolute;
    width: 200px;
    height: 141px;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -70px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    text-align: left;
  }
  .success-box img {
    display: block;
    margin: 0 auto;
    width: 130px;
    height: 141px;
  }
  .title p {
    text-align: center;
    width: 300px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -200px;
    color: #fff;
    line-height: 50px;
    height: 50px;
    display: inline-block;
    transform-origin: left bottom;
  }
  .canvasBox {
    box-sizing: border-box;
    flex: 1;
  }
  .canvas-obj {
    position: relative;
    z-index: 30;
  }
  .canvasBox ul {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 50px;
    height: 96%;
    padding: 2% 0;
    text-align: center;
    z-index: 60;
    color: #999;
  }
  .canvasBox ul li {
    height: 50%;
  }
  .canvasBox ul li span {
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
    transform-origin: left bottom;
  }
  .canvasBox ul li span.text {
    display: block;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #999;
  }
  .canvasBox ul span.select {
    line-height: normal;
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    width: 15px;
    height: 15px;
    border-radius: 50px;
    border: 1px solid #dcdcdc;
  }
  #clear {
    position: absolute;
    left: 0px;
    bottom: 40px;
    display: block;
    height: 50px;
    line-height: 50px;
  }
}

@media screen and (orientation: landscape) {
  .canvasBox {
    -webkit-transform: rotate(90);
    -moz-transform: rotate(90);
    -ms-transform: rotate(90);
    transform: rotate(90);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .canvas-obj {
    position: relative;
    z-index: 30;
  }
  .bg_img {
    position: absolute;
    width: 363px;
    height: 72px;
    left: 50%;
    top: 50%;
    margin-left: -181px;
    margin-top: -36px;
    z-index: 20;
  }
  .bg_img img {
    width: 100%;
    height: 100%;
  }
  .success-box {
    position: absolute;
    width: 200px;
    height: 141px;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -70px;
    text-align: center;
  }
  .success-box img {
    display: block;
    margin: 0 auto;
    width: 130px;
    height: 141px;
  }
  .title {
    left: 0;
    top: 0;
    right: 0;
    height: 50px;
    width: 100% !important;
    z-index: 40;
  }
  .title p,
  .title #data {
    transform: rotate(0);
    -ms-transform: rotate(0);
    -moz-transform: rotate(0);
    -webkit-transform: rotate(0);
    -o-transform: rotate(0);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
  }
  .title p {
    text-align: center;
    width: 300px;
    position: absolute;
    left: 50%;
    top: 0;
    line-height: 50px;
    height: 50px;
    display: inline-block;
    margin-left: -150px;
    color: #fff;
  }
  .title #close {
    top: 15px;
    left: 10px;
    width: 50px;
    right: auto;
  }
  .canvasBox ul {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 50px;
    width: 96%;
    padding: 2% 0;
    text-align: center;
    z-index: 60;
    color: #999;
  }
  .canvasBox ul li {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .canvasBox ul li span {
  }
  .canvasBox ul li span.text {
    cursor: pointer;
    color: #999;
  }
  .canvasBox ul span.select {
    line-height: normal;
    width: 15px;
    height: 15px;
    margin-left: 20px;
    border-radius: 50px;
    border: 1px solid #dcdcdc;
  }
  #clear {
    position: absolute;
    bottom: 0px;
    right: 40px;
    display: block;
    height: 50px;
    line-height: 50px;
  }
}
</style>
