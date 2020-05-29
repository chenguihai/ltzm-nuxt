<template>
  <div class="enterprise">
    <div class="banner">
      <div class="bannerBack">
        <div class="animText">
          <div class="animBack animate__animated animate__fadeOut animate__slow-2s"></div>
          <div class="text">
            <div class="textImg">
              <img src="~/assets/img/aboutUs/ltzm.png" alt />
            </div>
            <div class="textImg">
              <img src="~/assets/img/aboutUs/ltzm1.png" alt />
            </div>
            <div class="textImg">
              <img src="~/assets/img/aboutUs/ltzm2.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="entW">
      <div>
        <div class="entConter">
          <div class="box"></div>
          <div class="entcont">
            <div class="entBlock">
              <img
                class="animate__animated animate__fadeInUpBig animate__slow 2s"
                src="~/assets/img/aboutUs/ltzm3.png"
                alt
              />
              <span class="animate__animated animate__zoomIn">{{num}}+</span>
              <span class="animate__animated animate__fadeInUpBig animate__slow 2s">媒体主</span>
            </div>
            <div class="entBlock">
              <img
                class="animate__animated animate__fadeInUpBig animate__slow 2s"
                src="~/assets/img/aboutUs/ltzm4.png"
                alt
              />
              <span class="animate__animated animate__zoomIn">{{num2}}+</span>
              <span class="animate__animated animate__fadeInUpBig animate__slow 2s">广告主</span>
            </div>
            <div class="entBlock">
              <img
                class="animate__animated animate__fadeInUpBig animate__slow 2s"
                src="~/assets/img/aboutUs/ltzm5.png"
                alt
              />
              <span class="animate__animated animate__zoomIn">{{num3}}+</span>
              <span class="animate__animated animate__fadeInUpBig animate__slow 2s">交易量</span>
            </div>
          </div>
          <div class="seriveText" @mouseover="activeAnim()">
            <div class="serTop">
              <span class="spanP">
                服务内容
                <p>Service Content</p>
              </span>
            </div>
            <div class="serCon">
              <div class="serConImg">
                <div
                  v-for="(item , index) in navList"
                  :key="index"
                  :class="{active:actIndex == index}"
                  @mouseover="activeMou(item,index)"
                >
                  <img
                    class="serImgLeft imgLeft"
                    v-if="index == 0"
                    src="~/assets/img/aboutUs/border1.png"
                    alt
                  />
                  <div class="img">
                    <img :src="require(`~/assets/img/aboutUs/${item.img}.png`)" alt />
                  </div>
                  <div class="imgs"></div>
                  <span class="serSpan">{{item.text}}</span>
                  <img
                    class="serImgLeft"
                    v-if="index == 0"
                    src="~/assets/img/aboutUs/border1.png"
                    alt
                  />
                  <img
                    class="serImgLeft"
                    v-else-if="index == 1"
                    src="~/assets/img/aboutUs/border1.png"
                    alt
                  />
                  <img
                    class="serImgRight"
                    v-else-if="index == 2"
                    src="~/assets/img/aboutUs/border1.png"
                    alt
                  />
                  <img class="serImgRight" v-else src="~/assets/img/aboutUs/border1.png" alt />
                </div>
              </div>
              <div class="serConText">
                <span>{{content1}}</span>
                <span>{{content2}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="entSlogan" @mouseover="activeEnt()">
      <div class="leftSlogan"></div>
      <div class="rightSlogan"></div>
      <div class="conSlogan">
        <div>
          <span class="spanEnt spanP">
            品牌口号
            <p>Slogan</p>
          </span>
          <span class="spanText">一站式全媒界大型媒体电商平台。</span>
        </div>
        <div>
          <span class="spanEnt spanP">
            品牌模式
            <p>Brand model</p>
          </span>
          <span
            class="spanText"
          >凌天众媒致力通过互联网技术，打造数字化的广告投放服务交易平台，专注赋能广告主、媒体主、广告公司等行业服务商和从业者，广告行业的互联网升级转型, 同时为合作商提供配套服务。</span>
        </div>
        <div>
          <span class="spanRight spanP">
            品牌服务
            <p>Brand service</p>
          </span>
          <span class="spanText">凌天众媒网是一个提供全媒界广告投放、资源置换等服务的垂直行业电商品牌，赋能传统的媒体公司、广告公司等企业服务资源在线交易。</span>
          <span class="spanText">拥有媒体公司，广告公司，活动策划公司，营销推广公司或以上从业者等供应商。</span>
          <span class="spanText">提供广告服务买卖双方在线沟通、下单、签署电子合同、工作交付、评价。</span>
          <span class="spanText">凌天众媒网采用数据信息保障体系和风险控制管理体系，同时运用实时更新数据库技术智能化管理服务</span>
        </div>
      </div>
    </div>
    <div class="advantage" @mouseover="activeAdv()">
      <div class="advCon">
        <span class="advSpan spanP">
          服务优势
          <p>Brand advantage</p>
        </span>
        <div class="advList">
          <ul>
            <li
              v-for="(item , index) in seaAdv"
              :key="index"
              @mousemove="advMouse(item , index)"
              @mouseout="advOut(item , index)"
              :class="{advActive:advIndex == index}"
              class="advLi"
            >
              <div class="advImg">
                <img :src="require(`~/assets/img/aboutUs/${item.img}.png`)" alt />
              </div>
              <div class="chaImg">
                <img :src="require(`~/assets/img/aboutUs/${item.img2}.png`)" alt />
              </div>
              <div class="advText">
                <span>{{item.text}}</span>
                <p>{{item.content}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="intMap" @mouseover="activeInt()">
      <div class="mapCnet">
        <div class="mapLeft">
          <span class="spanInt spanP">
            凌天众媒全媒体联播网
            <p>All media network</p>
          </span>
          <div class="entAddre">
            <span>公司覆盖范围分布</span>
            <p>凌天众众媒网合作的服务商覆盖全国660个城市，几十万个媒体终端，全网覆盖写字楼、高档住宅、地铁、公交车、户外大牌、高铁，城市地标等等。</p>
            <p>总部在深圳，北京、广州 、上海、成都等城市正在筹备中，敬请期待!</p>
          </div>
          <div class="entCity">
            <ul>
              <li
                class="intList"
                v-for="(item , index) in cityList"
                :key="index"
                :class="{cityActive:index == 0 }"
              >
                <span>{{item.cit}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mapRight">
          <div class="mapCN">
            <div class="aniMap">
              <img src="~/assets/img/aboutUs/zb1.png" alt />
              <span>成都</span>
            </div>
            <div class="aniMap">
              <img src="~/assets/img/aboutUs/zb1.png" alt />
              <span>北京</span>
            </div>
            <div class="aniMap">
              <img src="~/assets/img/aboutUs/zb1.png" alt />
              <span>广州</span>
            </div>
            <div class="aniMap">
              <img src="~/assets/img/aboutUs/zb1.png" alt />
              <span>上海</span>
            </div>
            <div class="aniMap">
              <img src="~/assets/img/aboutUs/zb.gif" alt />
              <span>深圳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "animate.css";
export default {
  layout: "aboutUs-layout",
  name: "business",
  data() {
    return {
      navList: [
        { img: "jy", text: "全媒体在线交易" },
        { img: "jd", text: "全媒体广告投放线索" },
        { img: "yj", text: "广告服务任务对接" },
        { img: "xz", text: "全渠道实时上刊画面" }
      ],
      seaAdv: [
        {
          img: "ser1",
          img2: "black1",
          text: "平台无中间商赚差价",
          content:
            "国内首创全媒体电商模式，广告主和媒体主通过平台直接进行交易，没有中间商赚差价，通过算法推荐到有需求广告主和媒体店铺快速撮合成单。"
        },
        {
          img: "ser2",
          img2: "black2",
          text: "与用户建立粘性联系，增强用户忠诚度",
          content:
            "在全媒体电商平台上媒体主可以和广告主直接通过，拉近和客户之间的距离，与客户建立粘性联系，增强用户忠诚度，为企业口碑做贡献。"
        },
        {
          img: "ser3",
          img2: "black3",
          text: "媒体人开属于自己的店铺",
          content:
            "媒体人可以通过开设店铺快速获得广告主的反馈和解决广告主的问题，进而改善服务质量，提高广告主满意度，挖掘更多的全国潜在客户。"
        },
        {
          img: "ser4",
          img2: "black4",
          text: "媒体主通过平台大数据用户画像获取广告线索",
          content:
            "当广告主急需投放一种资源时，可以进入发布线索发布广告线索，媒主可以进入线索大厅界面购买对应的线索，省去了膜拜，扫楼等传统获取客户效率低的形式。"
        },
        {
          img: "ser5",
          img2: "black5",
          text: "评价体系提高媒体信用背书",
          content:
            " 全媒界电商平台最显著的特点是由算法为媒体店铺做评价信用累计的品牌背书，帮助媒体人快速赢国内企业主市场信任。"
        },
        {
          img: "ser6",
          img2: "black6",
          text: "扩大人脉，增加合作机会",
          content:
            "通过凌天媒体电商平台，除了提高企业客户的数量意外，还能接触更多的企业，未媒体主带来更多的合作机会。"
        },
        {
          img: "ser7",
          img2: "black7",
          text: "独有的众媒电子签约功能",
          content:
            "平台特有电子签名系统，省去繁杂的线下合同模式，签约只需十秒钟，大大提高了双方的工作效率。"
        }
      ],
      cityList: [
        { cit: "深圳" },
        { cit: "北京" },
        { cit: "广州" },
        { cit: "上海" },
        { cit: "成都" },
        { cit: "待续" }
      ],
      actIndex: 0,
      advIndex: null,
      scroll1: false,
      scroll2: false,
      scroll3: false,
      scroll4: false,
      timer: null,
      timer2: null,
      timer3: null,
      num: 1000,
      num2: 1000,
      num3: 1000,
      content1:
        "主要提供移动广告、网络广告等线上媒体，网红、KOL等群体的自媒体广告，线下地铁公交车媒体 、楼宇社区广告、高铁机场",
      content2:
        "广告、户外城市地标、商场购物在线媒体等17个大类、800多个小类媒体等。"
    };
  },
  created() {},
  beforeUpdate(){
      this.showScroll();
  },
  mounted() {
    
    this.number();
    this.number2();
    this.number3();
    if (document.documentElement.scrollTop < 200) {
      this.scroll1 = true;
    }
    if (document.documentElement.scrollTop < 500) {
      this.scroll2 = true;
    }
    if (document.documentElement.scrollTop < 1100) {
      this.scroll3 = true;
    }
    if (document.documentElement.scrollTop < 1900) {
      this.scroll4 = true;
    }
    this.showIcon();
    window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    number() {
      var i = 402;
      this.timer = setInterval(() => {
        i--;
        if (i == 0) {
          clearInterval(this.timer);
        }
        this.num += 54;
      }, 10);
    },
    number2() {
      var i = 501;
      this.timer2 = setInterval(() => {
        i--;
        if (i == 0) {
          clearInterval(this.timer2);
        }
        this.num2 += 143;
      }, 10);
    },
    number3() {
      var i = 412;
      this.timer3 = setInterval(() => {
        i--;
        if (i == 0) {
          clearInterval(this.timer3);
        }
        this.num3 += 133;
      }, 10);
    },
    activeMou(item, index) {
      this.actIndex = index;
      if (this.actIndex == 0) {
        this.content1 =
          "主要提供移动广告、网络广告等线上媒体，网红、KOL等群体的自媒体广告，线下地铁公交车媒体 、楼宇社区广告、高铁机场";
        this.content2 =
          "广告、户外城市地标、商场购物在线媒体等17个大类、800多个小类媒体等。";
      } else if (this.actIndex == 1) {
        this.content1 =
          "全国全媒体广告客户需求发布与对接平台，为广告主提供投放需求及时发布，省事省心。为媒体主锁定潜在广告投放客户资源，";
        this.content2 = "扩展获客渠道。";
      } else if (this.actIndex == 2) {
        this.content1 =
          "全国广告服务需求发布与对接平台，为广告主提供品牌平面设计、影视宣传片、主持模特礼仪等需求及时发布，省事省心。为";
        this.content2 = "服务商提供精准需求推送，在线接单。";
      } else if (this.actIndex == 3) {
        this.content1 =
          "全渠道广告上刊画面视频、图片画面发布及交易，丰富您的广告上刊案例库，增加客户信任。";
        this.content2 = "";
      }
    },
    advMouse(item, index) {
      this.advIndex = index;
    },
    advOut(item, index) {
      this.advIndex = null;
    },
    // 移出动画
    activeAnim() {
      var img = document.querySelectorAll(".img");
      var imgs = document.querySelectorAll(".imgs");
      this.scroll1 = false;
      for (var i = 0; i < img.length; i++) {
        img[i].classList.remove(
          "animate__animated",
          "animate__fadeInUpBig",
          "animate__slow-2s"
        );
      }
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].classList.remove(
          "animate__animated",
          "animate__fadeInUpBig",
          "animate__slow-2s"
        );
      }
    },
    activeEnt() {
      this.scroll2 = false;
    },
    activeAdv() {
      this.scroll3 = false;
    },
    activeInt() {
      this.scroll4 = false;
    },
    showScroll() {
      var entc = document.querySelectorAll(".entBlock");
      //   entcont.classList.add("entNone");
      for (var i = 0; i < entc.length; i++) {
        entc[i].className = "entBlock entNone"
      }
    },
    showIcon() {
      //   第二块
      var textImg = document.querySelectorAll(".textImg");
      var img = document.querySelectorAll(".img");
      //   var entBlock = document.querySelectorAll(".entBlock");
      var imgs = document.querySelectorAll(".imgs");
      var serSpan = document.querySelectorAll(".serSpan");
      var serImgLeft = document.querySelectorAll(".serImgLeft");
      var serImgRight = document.querySelectorAll(".serImgRight");
      var serConText = document.querySelectorAll(".serConText");
      for (var i = 0; i < textImg.length; i++) {
        textImg[i].classList.add(
          "imgBlock",
          "animate__animated",
          "animate__fadeInRight"
        );
      }
      //   for (var i = 0; i < entBlock.length; i++) {
      //     entBlock[i].classList.add("imgBlock");
      //   }
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 70
      ) {
        if (this.scroll1 == true) {
          for (var i = 0; i < img.length; i++) {
            img[i].classList.add(
              "animate__animated",
              "animate__fadeInUpBig",
              "animate__slow-2s"
            );
          }
          for (var i = 0; i < imgs.length; i++) {
            imgs[i].classList.add(
              "animate__animated",
              "animate__fadeInUpBig",
              "animate__slow-2s"
            );
          }
          for (var i = 0; i < serSpan.length; i++) {
            serSpan[i].classList.add(
              "animate__animated",
              "animate__fadeInUpBig",
              "animate__slow-2s"
            );
          }
          for (var i = 0; i < serImgLeft.length; i++) {
            serImgLeft[i].classList.add(
              "animate__animated",
              "animate__fadeInLeftBig",
              "animate__slow-2s"
            );
          }
          for (var i = 0; i < serImgRight.length; i++) {
            serImgRight[i].classList.add(
              "animate__animated",
              "animate__fadeInRightBig",
              "animate__slow-2s"
            );
          }
          for (var i = 0; i < serConText.length; i++) {
            serConText[i].classList.add(
              "animate__animated",
              "animate__fadeInUpBig",
              "animate__slow-2s"
            );
          }
        }
      }
      // 第三块
      var leftSlogan = document.querySelectorAll(".leftSlogan");
      var rightSlogan = document.querySelectorAll(".rightSlogan");
      var spanEnt = document.querySelectorAll(".spanEnt");
      var spanText = document.querySelectorAll(".spanText");
      var spanRight = document.querySelectorAll(".spanRight");
      //   第四块
      var advSpan = document.querySelectorAll(".advSpan");
      var advLi = document.querySelectorAll(".advLi");
      // 第五块
      var spanInt = document.querySelectorAll(".spanInt");
      var entAddre = document.querySelectorAll(".entAddre");
      var intList = document.querySelectorAll(".intList");
      var mapCN = document.querySelectorAll(".mapCN");
      var aniMap = document.querySelectorAll(".aniMap");

      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 500
      ) {
        if (this.scroll2 == true) {
          for (var i = 0; i < leftSlogan.length; i++) {
            leftSlogan[i].classList.add(
              "animate__animated",
              "animate__fadeInLeft"
            );
          }
          for (var i = 0; i < rightSlogan.length; i++) {
            rightSlogan[i].classList.add(
              "animate__animated",
              "animate__fadeInRight"
            );
          }
          for (var i = 0; i < spanEnt.length; i++) {
            spanEnt[i].classList.add(
              "animate__animated",
              "animate__fadeInLeft"
            );
          }
          for (var i = 0; i < spanText.length; i++) {
            spanText[i].classList.add(
              "animate__animated",
              "animate__fadeInUpBig",
              "animate__slow-2s"
            );
          }
          for (var i = 0; i < spanRight.length; i++) {
            spanRight[i].classList.add(
              "animate__animated",
              "animate__fadeInRight"
            );
          }
        }
      }
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 1100
      ) {
        if (this.scroll3 == true) {
          for (var i = 0; i < advSpan.length; i++) {
            advSpan[i].classList.add(
              "animate__animated",
              "animate__fadeInRight"
            );
          }
          for (var i = 0; i < advLi.length; i++) {
            advLi[i].classList.add("animate__animated", "animate__fadeInRight");
          }
        }
      }
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 1900
      ) {
        if (this.scroll4 == true) {
          for (var i = 0; i < spanInt.length; i++) {
            spanInt[i].classList.add(
              "animate__animated",
              "animate__fadeInDown"
            );
          }
          for (var i = 0; i < entAddre.length; i++) {
            entAddre[i].classList.add(
              "animate__animated",
              "animate__fadeInDown"
            );
          }
          for (var i = 0; i < intList.length; i++) {
            intList[i].classList.add(
              "animate__animated",
              "animate__fadeInRight"
            );
          }
          for (var i = 0; i < mapCN.length; i++) {
            mapCN[i].classList.add("animate__animated", "animate__zoomIn");
          }
          for (var i = 0; i < aniMap.length; i++) {
            aniMap[i].classList.add("animate__animated", "animate__fadeInDown");
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@-webkit-keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.enterprise {
  & > .banner {
    width: 100%;
    height: 580px;
    background: #111;
    & > .bannerBack {
      max-width: 1920px;
      min-width: 1300px;
      height: 100%;
      margin: 0 auto;
      background: url("../assets/img/aboutUs/banner1.jpg") no-repeat center;
      position: relative;
      & > .animText {
        max-width: 1920px;
        min-width: 1300px;
        height: 580px;
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.5);
        & > .animBack {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 1);
        }
        & > .text {
          width: 1300px;
          height: 580px;

          padding-top: 126px;
          position: absolute;
          top: 0;
          left: 50%;
          margin-left: -650px;
          & > div {
            display: none;
          }
          & > .imgBlock {
            display: block;
          }
          & > div:nth-child(1) {
            width: 118px;
            height: 29px;
          }
          & > div:nth-child(2) {
            width: 662px;
            height: 43px;
            margin: 41px 0 34px;
            -webkit-animation-delay: 0.1s; //延迟
            animation-delay: 0.1s;
          }
          & > div:nth-child(3) {
            width: 692px;
            height: 20px;
            -webkit-animation-delay: 0.2s; //延迟
            animation-delay: 0.2s;
          }
        }
      }
    }
  }
  & > .entW {
    width: 100%;
    & > div {
      & > .entConter {
        width: 100%;
        margin: 0 auto;
        position: relative;
        & > .box {
          width: 100%;
          height: 320px;
        }
        & > .entcont {
          width: 1300px;
          background: #fff;
          height: 320px;
          position: absolute;
          top: -100px;
          left: 50%;
          margin-left: -650px;
          display: flex;
          box-shadow: 0px 4px 9px 1px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          & > div {
            flex: 1;
            display: none;
            flex-direction: column;
            align-items: center;
            margin-top: 66px;
            & > :nth-child(2) {
              font-size: 32px;
              color: #f3262d;
              line-height: 32px;
              margin-bottom: 30px;
              -webkit-animation-delay: 2s; //延迟
              animation-delay: 2s;
            }
            & > :nth-child(3) {
              font-size: 18px;
              line-height: 18px;
              color: #666;
            }
          }
          & > div:nth-child(1) {
            position: relative;
            &::before {
              content: "";
              position: absolute;
              width: 1px;
              right: 0;
              height: 180px;
              background: #dddddd;
            }
            & > img {
              width: 72px;
              height: 98px;
              margin-bottom: 38px;
            }
            & > :nth-child(3) {
              -webkit-animation-delay: 1s; //延迟
              animation-delay: 1s;
            }
          }
          & > div:nth-child(2) {
            position: relative;

            &::before {
              content: "";
              position: absolute;
              width: 1px;
              right: 0;
              height: 180px;
              background: #dddddd;
            }
            & > img {
              width: 84px;
              height: 98px;
              margin-bottom: 38px;
              -webkit-animation-delay: 0.3s; //延迟
              animation-delay: 0.3s;
            }
            & > :nth-child(2) {
              -webkit-animation-delay: 2.3s; //延迟
              animation-delay: 2.3s;
            }
            & > :nth-child(3) {
              -webkit-animation-delay: 1.3s; //延迟
              animation-delay: 1.3s;
            }
          }
          & > div:nth-child(3) {
            margin-top: 71px;
            & > img {
              width: 85px;
              height: 88px;
              margin-bottom: 43px;
              -webkit-animation-delay: 0.6s; //延迟
              animation-delay: 0.6s;
            }
            & > :nth-child(2) {
              -webkit-animation-delay: 2.6s; //延迟
              animation-delay: 2.6s;
            }
            & > :nth-child(3) {
              -webkit-animation-delay: 1.6s; //延迟
              animation-delay: 1.6s;
            }
          }
        }
        & > .seriveText {
          width: 100%;
          height: 458px;
          margin: 0 auto;
          & > .serTop {
            width: 1300px;
            margin: 0 auto 32px;
          }
          & > .serCon {
            width: 1300px;
            height: 398px;
            margin: 0 auto;
            background: url("../assets/img/aboutUs/ltzm6.jpg") no-repeat;
            padding: 70px 0 0 210px;
            overflow: hidden;
            & > .serConImg {
              width: 878px;
              height: 160px;
              display: flex;
              justify-content: space-between;
              overflow: hidden;
              & > div {
                padding: 0 35px 0 41px;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;

                & > div {
                  height: 56px;
                  margin-bottom: 16px;
                  & > img {
                    width: 100%;
                    height: 100%;
                  }
                }

                & > span {
                  font-size: 16px;
                  line-height: 16px;
                  color: #fff;
                  -webkit-animation-delay: 0.5s; //延迟
                  animation-delay: 0.5s;
                }
                & > img {
                  position: absolute;
                  right: 0;
                  top: 0;
                  display: inline-block;
                }
                & > .imgLeft {
                  left: 0 !important;
                }
              }
              & > div:nth-child(1) {
                & > div {
                  width: 56px;
                }
                & > .imgs {
                  display: none;
                  background: url("../assets/img/aboutUs/jy1.png") no-repeat;
                  background-size: 100%;
                }
                & > .imgs {
                  -webkit-animation-delay: 0.5s; //延迟
                  animation-delay: 0.5s;
                }
                & > span {
                  -webkit-animation-delay: 0.7s; //延迟
                  animation-delay: 0.7s;
                }
              }
              & > div:nth-child(2) {
                & > .img {
                  width: 56px;
                  height: 56px;
                }
                & > .imgs {
                  display: none;
                  width: 54px;
                  background: url("../assets/img/aboutUs/jd1.png") no-repeat;
                  background-size: 100%;
                }
              }
              & > div:nth-child(3) {
                & > div {
                  width: 57px;
                }
                & > .imgs {
                  display: none;
                  width: 57px;
                  background: url("../assets/img/aboutUs/yj1.png") no-repeat;
                  background-size: 100%;
                }
              }
              & > div:nth-child(4) {
                & > div {
                  width: 56px;
                }
                & > .imgs {
                  display: none;
                  width: 56px;
                  background: url("../assets/img/aboutUs/xz1.png") no-repeat;
                  background-size: 100%;
                }

                & > .img {
                  -webkit-animation-delay: 0.5s !important; //延迟
                  animation-delay: 0.5s !important;
                }
                & > span {
                  -webkit-animation-delay: 0.7s; //延迟
                  animation-delay: 0.7s;
                }
              }
              & > .active {
                & > .imgs {
                  display: block !important;
                }
                & > .img {
                  display: none;
                }
                & > span {
                  color: #f3262d;
                }
              }
            }
            & > .serConText {
              display: flex;
              flex-direction: column;
              -webkit-animation-delay: 1s; //延迟
              animation-delay: 1s;
              & > span {
                font-size: 16px;
                color: #fff;
              }
              & > span:nth-child(1) {
                margin-bottom: 6px;
              }
            }
          }
        }
      }
    }
  }
  & > .entSlogan {
    max-width: 1920px;
    min-width: 1300px;
    height: 560px;
    margin: 0 auto;
    display: flex;
    margin-top: 80px;
    position: relative;
    overflow: hidden;

    & > .leftSlogan {
      width: 60%;
      height: 100%;
      background: url("../assets/img/aboutUs/left.jpg");
    }
    & > .rightSlogan {
      width: 40%;
      height: 100%;
      background: url("../assets/img/aboutUs/right.jpg");
    }
    & > .conSlogan {
      width: 1300px;
      height: 560px;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -650px;
      display: flex;
      padding: 83px 0 0 0;

      & > div {
        display: flex;
        flex-direction: column;
        & > span:nth-child(1) {
          color: #fff;
          -webkit-animation-delay: 0.5s; //延迟
          animation-delay: 0.5s;
        }
        & > .spanText {
          width: 366px;
          color: #fff;
          margin-top: 30px;
          font-size: 16px;
          -webkit-animation-delay: 0.3s; //延迟
          animation-delay: 0.3s;
        }
      }
      & > div:nth-child(1),
      & > div:nth-child(2) {
        margin-right: 75px;
      }
      & > div:nth-child(2) {
        & > .spanText {
          -webkit-animation-delay: 0.5s; //延迟
          animation-delay: 0.5s;
        }
      }
      & > div:nth-child(3) {
        & > span:nth-child(1) {
          border-left: 4px solid #333;
          & > p {
            color: #fbb8b9;
          }
        }
      }
      & > div:nth-child(3) {
        & > .spanText {
          -webkit-animation-delay: 0.7s; //延迟
          animation-delay: 0.7s;
        }
      }
    }
  }
  & > .advantage {
    width: 100%;
    background: #fff;
    height: 824px;
    padding-top: 81px;
    overflow: hidden;

    & > .advCon {
      width: 1300px;
      margin: 0 auto;
      & > span {
        width: 261px;
      }
      & > .advList {
        margin-top: 32px;
        & > ul {
          display: flex;
          flex-wrap: wrap;
          & > li {
            display: flex;
            margin-bottom: 60px;
            position: relative;
            & > .chaImg {
              width: 168px;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
              -webkit-animation: hide 0.4s ease-out;
              display: block;
              transition: height 1ms;
              transition-delay: 0.4s;
              overflow: hidden;
            }
            & > .advImg {
              width: 168px;
              height: 102px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            & > .advText {
              z-index: 1;
              display: flex;
              flex-direction: column;
              width: 442px;
              padding-left: 16px;
              position: relative;

              & > span {
                font-size: 16px;
                color: #333;
                line-height: 16px;
                margin-bottom: 5px;
                margin-top: 8px;
                font-weight: bold;
              }
              & > p {
                width: 426px;
                font-size: 14px;
                color: #666;
                line-height: 20px;
              }
            }
            & > .advText:after,
            & > .advText:before {
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              width: 0;
              height: 100%;
              background: #f3262d;
              z-index: -2;
              transition: 0.3s;
            }
          }
          & > li:nth-child(2n) {
            margin-left: 68px;
          }

          & > .advActive {
            .advImg + .chaImg {
              height: 102px;
              opacity: 1;
              display: block;
              -webkit-animation: show 0.4s ease-in;
              transition-delay: 0s;
            }
            & > .advText {
              z-index: 1;
              background: transparent;
              transition: 0.3s;
              & > span,
              & > p {
                color: #fff;
              }
            }
            & > .advText:before {
              background: #f3262d;
              z-index: -1 !important;
              transition: 0.3s;
            }
            & > .advText:after,
            & > .advText:before {
              width: 100%;
              transition: 0.3s;
            }
          }
          & > li:nth-child(2) {
            -webkit-animation-delay: 0.1s; //延迟
            animation-delay: 0.1s;
          }
          & > li:nth-child(3) {
            -webkit-animation-delay: 0.2s; //延迟
            animation-delay: 0.2s;
          }
          & > li:nth-child(4) {
            -webkit-animation-delay: 0.3s; //延迟
            animation-delay: 0.3s;
          }
          & > li:nth-child(5) {
            -webkit-animation-delay: 0.4s; //延迟
            animation-delay: 0.4s;
          }
          & > li:nth-child(6) {
            -webkit-animation-delay: 0.5s; //延迟
            animation-delay: 0.5s;
          }
          & > li:nth-child(7) {
            -webkit-animation-delay: 0.6s; //延迟
            animation-delay: 0.6s;
          }
        }
      }
    }
  }
  & > .intMap {
    width: 100%;
    height: 640px;
    background: #333;
    overflow: hidden;
    & > .mapCnet {
      width: 1300px;
      height: 640px;
      margin: 0 auto;
      display: flex;
      & > .mapLeft {
        padding-top: 61px;
        & > .spanP {
          color: #fff;
          -webkit-animation-delay: 0.5s; //延迟
          animation-delay: 0.5s;
        }
        & > .entAddre {
          margin-top: 96px;
          width: 488px;
          & > span {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
          }
          & > p {
            color: #999;
            font-size: 14px;
          }
          & > :nth-child(2) {
            margin: 10px 0;
          }
        }
        & > .entCity {
          margin-top: 100px;
          & > ul {
            display: flex;
            flex-wrap: wrap;
            width: 448px;
            & > li {
              padding-left: 9px;
              margin: 0 50px 40px 0;
              border-left: 1px solid #999;
              -webkit-animation-delay: 0.4s; //延迟
              animation-delay: 0.4s;
              & > span {
                font-size: 32px;
                color: #9999;
                line-height: 32px;
                display: block;
              }
            }
            & > .cityActive {
              & > span {
                color: #f3262d;
              }
            }
            & > li:nth-child(4) {
              margin: 0 0 40px 0;
            }
            & > li:nth-child(2) {
              -webkit-animation-delay: 0.5s; //延迟
              animation-delay: 0.5s;
            }
            & > li:nth-child(3) {
              -webkit-animation-delay: 0.6s; //延迟
              animation-delay: 0.6s;
            }
            & > li:nth-child(4) {
              -webkit-animation-delay: 0.7s; //延迟
              animation-delay: 0.7s;
            }
            & > li:nth-child(5) {
              -webkit-animation-delay: 0.8s; //延迟
              animation-delay: 0.8s;
            }
            & > li:nth-child(6) {
              -webkit-animation-delay: 0.9s; //延迟
              animation-delay: 0.9s;
            }
          }
        }
      }
      & > .mapRight {
        & > .mapCN {
          width: 690px;
          height: 494px;
          background: url("../assets/img/aboutUs/map.png") no-repeat;
          margin: 56px 0 0 122px;
          position: relative;
          & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100px;
            position: absolute;
            -webkit-animation-delay: 0.5s; //延迟
            animation-delay: 0.5s;
            & > span {
              color: #999;
            }
          }
          & > div:nth-child(1) {
            top: 273px;
            left: 287px;
          }
          & > div:nth-child(2) {
            top: 181px;
            left: 430px;
            -webkit-animation-delay: 0.6s; //延迟
            animation-delay: 0.6s;
          }
          & > div:nth-child(3) {
            top: 395px;
            left: 413px;
            -webkit-animation-delay: 0.7s; //延迟
            animation-delay: 0.7s;
          }
          & > div:nth-child(4) {
            top: 295px;
            left: 495px;
            -webkit-animation-delay: 0.8s; //延迟
            animation-delay: 0.8s;
          }
          & > div:nth-child(5) {
            top: 386px;
            left: 439px;
            -webkit-animation-delay: 0.9s; //延迟
            animation-delay: 0.9s;
            & > span {
              color: #f3262d;
            }
          }
        }
      }
    }
  }
}
.spanP {
  font-size: 24px;
  line-height: 28px;
  color: #333;
  display: flex;
  align-items: flex-end;
  padding-left: 8px;
  font-weight: bold;
  border-left: 4px solid #f3262d;
  & > p {
    font-size: 16px;
    line-height: 16px;
    color: #999;
    font-weight: 400;
    margin-left: 8px;
  }
}
.entNone {
  display: flex !important;
}
</style>