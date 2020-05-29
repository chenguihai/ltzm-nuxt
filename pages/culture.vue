<template>
  <div class="enterCulture">
    <div class="banner">
      <div class="bannerBack">
        <div class="animText">
          <div class="animBack animate__animated animate__fadeOut animate__slow-2s"></div>
          <div class="text">
            <div class="animate__animated animate__fadeIn">
              <img src="~/assets/img/aboutUs/ltzm8.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="culture">
      <div class="culCent">
        <div class="culContent">
          <span class="animate__animated animate__fadeInDownBig">随着5G技术商用不断推广，一个万物互联的高速移动互联时代来临.</span>
          <span
            class="animate__animated animate__fadeInDownBig"
          >在深刻改变社会行为方式的同时，同时也带来媒体生态的改变，万物皆可被媒体化，意味着“万物皆媒”.</span>
          <span
            class="animate__animated animate__fadeInDownBig"
          >凌天众媒为媒体主与广告主搭建一条媒的通路，提供一站式全媒界媒体在线交易。</span>
        </div>
        <div class="culFour">
          <ul>
            <li
              v-for="(item , index) in culList"
              :key="index"
              class="animate__animated animate__fadeInUp"
            >
              <img :src="require(`~/assets/img/aboutUs/${item.img}.png`)" alt />
              <span>{{item.name}}</span>
              <p>{{item.text}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "animate.css";
export default {
  layout: "aboutUs-layout",
  name:'culture',
  data() {
    return {
      culList: [
        { img: "cul1", name: "SLOGAN", text: "一站式全媒界大型媒体电商平台" },
        { img: "cul2", name: "使命", text: "让天下没有难投的广告和难卖的服务" },
        { img: "cul3", name: "愿景", text: "只要是企业就一定会用凌天众媒" },
        { img: "cul4", name: "价值观", text: "诚信、激情、协作、共赢" }
      ]
    };
  }
};
</script><style lang="less" scoped>
@keyframes opac {
  /*设置内容由显示变为隐藏*/

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
.enterCulture {
  margin-bottom: 193px;
  & > .banner {
    width: 100%;
    height: 580px;
    background: #111;
    & > .bannerBack {
      max-width: 1920px;
      min-width: 1300px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      background: url("../assets/img/aboutUs/banner3.jpg") no-repeat;
      position: relative;
      & > .animText {
        width: 100%;
        height: 580px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        & > .animBack {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 1);
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 1);
        }
        & > .text {
          width: 1300px;
          height: 580px;
          //   position: absolute;
          //   left: 50%;
          //   top: 0;
          //   margin-left: -650px;
          & > div {
            width: 612px;
            height: 305px;
            margin-top: 110px;
            float: right;
            -webkit-animation-delay: 0.4s; //延迟
            animation-delay: 0.4s;
          }
        }
      }
    }
  }
  & > .culture {
    width: 1400px;
    height: 480px;
    background: url("../assets/img/aboutUs/back1.jpg") no-repeat;
    margin: 0 auto;
    & > .culCent {
      width: 1300px;
      height: 100%;
      margin: 80px auto 0;
      position: relative;
      & > .culContent {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 185px;
        overflow: hidden;
        & > span {
          font-size: 16px;
          color: #fff;
        }

        & > span:nth-child(2) {
          margin: 10px 0;
          -webkit-animation-delay: 0.1s; //延迟
          animation-delay: 0.1s;
        }
        & > span:nth-child(3) {
          -webkit-animation-delay: 0.2s; //延迟
          animation-delay: 0.2s;
        }
      }
      & > .culFour {
        position: absolute;
        bottom: -113px;
        left: 0;
        & > ul {
          display: flex;
          justify-content: space-between;
          & > li {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 300px;
            background: #fff;
            margin-right: 33px;
            box-shadow: 0px 4px 9px 1px rgba(0, 0, 0, 0.05);
            -webkit-animation-delay: 0.9s; //延迟
            animation-delay: 0.9s;
            & > span {
              margin-bottom: 22px;
              font-size: 24px;
              color: #333;
              line-height: 24px;
              font-weight: bold;
            }
            & > p {
              font-size: 16px;
              color: #666;
              line-height: 16px;
              margin-bottom: 55px;
              font-weight: bold;
            }
          }
          & > li:nth-child(1) {
            -webkit-animation-delay: 1s; //延迟
            animation-delay: 1s;
            & > img {
              width: 87px;
              height: 89px;
              margin: 58px 0 56px;
            }
          }
          & > li:nth-child(2) {
            margin-right: 34px;
            -webkit-animation-delay: 1.1s; //延迟
            animation-delay: 1.1s;
            & > img {
              width: 93px;
              height: 93px;
              margin: 56px 0 52px;
            }
          }
          & > li:nth-child(3) {
            -webkit-animation-delay: 1.2s; //延迟
            animation-delay: 1.2s;
            & > img {
              width: 88px;
              height: 88px;
              margin: 58px 0 56px;
            }
          }
          & > li:nth-child(4) {
            -webkit-animation-delay: 1.3s; //延迟
            animation-delay: 1.3s;
            margin-right: 0;
            & > img {
              width: 83px;
              height: 83px;
              margin: 61px 0 57px;
            }
          }
        }
      }
    }
  }
}
</style>