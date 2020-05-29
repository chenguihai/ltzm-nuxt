<template>
  <div class="contact_us">
    <div class="banBack">
      <div class="cu_banner">
        <div class="cu_bg">
          <div class="animBack animate__animated animate__fadeOut animate__slow-2s"></div>
          <div class="cu_ban_text">
            <img
              class="cu_ban animate__animated animate__fadeInDown"
              src="~/assets/img/aboutUs/ltzm11.png"
              alt
            />
            <img
              class="cu_ban animate__animated animate__fadeInDown"
              src="~/assets/img/aboutUs/ltzm12.png"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <div class="cu_wraper">
      <div class="cu_item">
        <h5 class="cu_title">
          <span class="spanP animate__animated animate__fadeInUp">
            客服服务
            <p>Customer service</p>
          </span>
        </h5>
        <div class="cu_content animate__animated animate__fadeInUp">
          <div class="cu_top">
            <i class="cu_customer"></i>
            <span class="cu_name">官方客服</span>
            <span>400-688-6662</span>
          </div>
          <div class="cu_bottom">
            <i class="cu_online"></i>
            <span class="cu_name">在线客服</span>
            <a
              href="https://url.cn/5fa6j74?_type=wpa&qidian=true"
              target="_blank"
              rel="noopener noreferrer"
              class="cu_contact mr10"
            >
              <i class="cu_icon_webpage"></i>网页咨询
            </a>
            <span class="cu_contact" @click="openQQ">
              <i class="cu_icon_qq"></i>QQ咨询
            </span>
          </div>
        </div>
      </div>
      <div class="cu_item">
        <h5 class="cu_title">
          <span class="spanP animate__animated animate__fadeInUp">
            商务合作
            <p>Business cooperation</p>
          </span>
        </h5>
        <div class="cu_content animate__animated animate__fadeInUp">
          <div class="cu_top">
            <i class="cu_icon_phone"></i>
            <span class="cu_name">联系电话</span>
            <span>0755-23281242</span>
          </div>
          <div class="cu_top">
            <i class="cu_icon_email"></i>
            <span class="cu_name">联系邮箱</span>
            <span>service@zhongmei66.com</span>
          </div>
        </div>
      </div>
      <div class="cu_item mb_80">
        <h5 class="cu_title">
          <span class="spanP animate__animated animate__fadeInUp">
            联系地址
            <p>Contact address</p>
          </span>
        </h5>
        <div class="cu_content animate__animated animate__fadeInUp">
          <div class="cu_top">
            <i class="cu_icon_address"></i>
            <span class="cu_name">广东省深圳市大宝路49号荣成达科创慧谷产业园310</span>
          </div>
          <div class="cu_map">
            <baidu-map
              class="map"
              :dragging="dragging"
              :center="center"
              :zoom="zoom"
              style="height:835px"
              :scroll-wheel-zoom="scroll"
            >
              <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                <!-- <bm-label
                  content="深圳市凌天众媒科技有限公司"
                  :labelStyle="{color: 'red', fontSize : '14px'}"
                  :offset="{width: -35, height: 30}"
                />-->
              </bm-marker>
            </baidu-map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "animate.css";
export default {
  name: "contact",
  layout: "aboutUs-layout",
  data() {
    return {
      // 113.918934,22.584888
      center: { lng: 113.918934, lat: 22.584888 },
      zoom: 15, //缩放级别
      show: true, //显示标签
      scroll: true, //地图缩放
      dragging: true //地图拖拽
    };
  },
  mounted() {
    this.showIcon();
  },
  methods: {
    openQQ() {
      window.open(`https://url.cn/59IhwSe?_type=wpa&qidian=true`);
    },
    showIcon() {
      var cu_ban = document.querySelectorAll(".cu_ban");
      var cu_item = document.querySelectorAll(".cu_item");
      //   var cu_ban = document.querySelectorAll(".cu_ban");
      for (var i = 0; i < cu_ban.length; i++) {
        cu_ban[i].classList.add(
          "imgBlock",
          "animate__animated",
          "animate__fadeInDown"
        );
      }
      for (var i = 0; i < cu_item.length; i++) {
        cu_item[i].classList.add(
          "imgBlock",
          "animate__animated",
          "animate__fadeInDown"
        );
      }
    }
  }
};
</script><style lang="less" scoped>
.mb_80 {
  margin-bottom: 80px;
}
.map {
  width: 1190px;
  height: 835px;
}
.banBack {
  width: 100%;
  height: 580px;
  background: #111;
}
.cu_banner {
  width: 100%;
  max-width: 1920px;
  min-width: 1300px;
  height: 580px;
  margin: 0 auto;
  object-fit: cover;
  background: url("~assets/img/aboutUs/banner4.jpg") no-repeat center;
  position: relative;
  .cu_bg {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    & > .animBack {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 1);
    }
  }
}
.cu_ban_text {
  position: absolute;
  top: 50%;
  margin-top: -51px;
  left: 50%;
  margin-left: -402px;
  z-index: 10;
  text-align: center;
  width: 804px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
    display: none;
  }

  & > img:nth-child(1) {
    margin-bottom: 10px;
    -webkit-animation-delay: 0.2s; //延迟
    animation-delay: 0.2s;
  }
  & > img:nth-child(2) {
      width: 179px;}
}
.cu_wraper {
  width: 1300px;
  min-height: 1000px;
  margin: 0 auto;
  .cu_item {
    padding-top: 80px;
    display: none;
  }
  .cu_title {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    line-height: 28px;
    margin-bottom: 28px;
  }
}
.cu_content {
  background: #fff;
  font-size: 16px;
  padding: 46px 54px 30px;
  -webkit-animation-delay: 0.7s; //延迟
  animation-delay: 0.7s;
  .cu_name {
    margin: 0 22px 0 14px;
  }
}
.cu_top {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  height: 26px;
  .cu_customer {
    background-image: url("~assets/img/aboutUs/kefub.png");
  }
}
.cu_map {
  height: auto;
}
.cu_customer,
.cu_online {
  width: 29px;
  height: 26px;
  background: no-repeat center;
}
.cu_bottom {
  display: flex;
  align-items: center;
  height: 36px;
  .cu_online {
    background-image: url("~assets/img/aboutUs/xinxi.png");
  }
}
.cu_contact {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 15px;
  color: #fff;
  background: #333;
  border: 1px solid #333;
  cursor: pointer;
  .cu_icon_webpage,
  .cu_icon_qq {
    margin-right: 8px;
    background: no-repeat center;
  }
  .cu_icon_webpage {
    width: 20px;
    height: 18px;
    background-image: url("~assets/img/aboutUs/webpage.png");
  }
  .cu_icon_qq {
    width: 18px;
    height: 20px;
    background-image: url("~assets/img/aboutUs/QQ.png");
  }
}
.cu_contact:hover {
  background: #fff;
  color: #333;
  border: 1px solid #ddd;
}
.cu_icon_phone,
.cu_icon_email,
.cu_icon_address {
  width: 28px;
  background: no-repeat center;
}
.cu_icon_phone {
  height: 28px;
  background-image: url("~assets/img/aboutUs/phone.png");
}
.cu_icon_email {
  height: 20px;
  background-image: url("~assets/img/aboutUs/email.png");
}
.cu_icon_address {
  height: 28px;
  background-image: url("~assets/img/aboutUs/address.png");
}
.spanP {
  font-size: 24px !important;
  line-height: 28px;
  color: #333 !important;
  display: flex !important;
  align-items: flex-end;
  padding-left: 8px;
  font-weight: bold;
  border-left: 4px solid #f3262d;
    -webkit-animation-delay: 0.4s; //延迟
  animation-delay: 0.4s;

  & > p {
    font-size: 16px;
    line-height: 16px;
    color: #999;
    font-weight: 400;
    margin-left: 8px;
  }
}
.imgBlock {
  display: block !important;
}
</style>
