<template>
  <div class="aboutUs">
    <div class="banner">
      <div class="bannerBack">
        <div class="animText">
          <div class="animBack animate__animated animate__fadeOut animate__slow-2s"></div>
          <div class="text">
            <div>
              <img
                class="animate__animated animate__fadeInDown"
                src="~/assets/img/aboutUs/ltzm7.png"
                alt
              />
              <img
                class="animate__animated animate__fadeInDown"
                src="~/assets/img/aboutUs/ltzm10.png"
                alt
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aboutLT">
      <div class="imgLT about animate__animated animate__zoomIn">
        <img src="~/assets/img/aboutUs/ltzmLogo.jpg" alt />
      </div>
      <div class="usLtzm about">
        <span class="spanP animate__animated animate__fadeInUpBig">
          关于我们
          <p>About us</p>
        </span>
        <span class="animate__animated animate__fadeInUpBig">凌天众媒是一个提供全媒界广告投放、资源置换等媒体服务的垂直行业电商品牌。</span>
        <span
          class="animate__animated animate__fadeInUpBig"
        >专注于广告投放直接在线交易，为广告主提供广告投放需求发布，线上广告、线下广告、自媒体广告、广告内容制作及营销推广等资源一站式广告服务采购；同时为服务商提供需求对接，媒体人免费开店，媒体资源管理、置换，在线接单等服务。</span>
        <span
          class="animate__animated animate__fadeInUpBig"
        >凌天众媒总部位于深圳，创始人朱俊凯，主营业务是提供广告垂直行业的媒体电商平台解决方案，旨在通过互联网技术手段询价、下单、签署合同和交付等环节，为企业客户提供标准化广告投放服务解决方案。</span>
      </div>
    </div>
    <div class="newsLt" @mouseover="activeAnim()">
      <div class="news">
        <span class="spanP newsSpan">
          众媒大事件
          <p>LT-Media Events</p>
        </span>
        <div class="time">
          <div class="timeList" v-for="(item , index) in timeList" :key="index">
            <div>
              <span>{{item.time}}</span>
              <span></span>
              <span>{{item.text}}</span>
            </div>
            <div class="rightImg">
              <img src="~/assets/img/aboutUs/right.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="staffPresence" @mouseover="activeEnt()">
      <span class="spanP staffSpan">
        员工风采
        <p>Staff style</p>
      </span>
      <div class="staffImg">
        <div
          class="staff"
          v-for="(item , index) in staffImg"
          :key="index"
          @mousemove="staffMouve(item , index)"
        >
          <img :src="require(`~/assets/img/aboutUs/${item.img}.png`)" alt />
          <div class="text">
            <span>{{item.text}}</span>
            <span class="noText" :class="{staffActive:staffIndex == index}">{{item.content}}</span>
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
  name: "about",
  data() {
    return {
      timeList: [
        { time: "2018年01月", text: "凌天众媒网萌芽，筹备成立。" },
        { time: "2018年12月", text: "凌天众媒网商标注册成功。" },
        { time: "2019年5月", text: "招募产品和开发团队。" },
        {
          time: "2020年3月",
          text: " 凌天众媒媒体电商平台进行试运营。"
        },
        {
          time: "2020年4月",
          text:
            "凌天众媒平台媒体采购模块、广告投放需求发布模块，实时上刊画面模块开发完成"
        },
        {
          time: "2020年6月",
          text: "凌天众媒全媒界大型媒体电商平台 V1.0 版本上线。"
        }
      ],
      staffImg: [
        {
          text: "办公一角",
          content: "疫情挡不住的热情，认真工作的日常",
          img: "staff1"
        },
        {
          text: "自制火锅",
          content: "疫情期间响应国家号召不外聚餐，在公司下火锅不香吗",
          img: "staff2"
        },
        {
          text: "下午茶时间",
          content: "犯困时间，来份下午茶轻松下",
          img: "staff7"
        },
        {
          text: "认真的会议",
          content: "小伙伴们头脑风暴进行时，碰撞思维的火花",
          img: "staff4"
        },
        {
          text: "专项服务客户",
          content: "倾听客户的心声，只为服务好每一位客户",
          img: "staff5"
        },
        {
          text: "技能提升",
          content: "增强团队凝聚力，提高员工的协作能力",
          img: "staff6"
        }
      ],
      staffIndex: "",
      scroll1: false,
      scroll2: false
    };
  },
  beforeUpdate() {},
  mounted() {
    var about = document.querySelectorAll(".about");
    console.log(about);
    for (var i = 0; i < about.length; i++) {
      about[i].classList.add("entNone");
    }
    // if (document.documentElement.scrollTop < 220) {
    this.scroll1 = true;
    // }
    // if (document.documentElement.scrollTop < 860) {
    this.scroll2 = true;
    // }
    this.showIcon();
    window.addEventListener("scroll", this.showIcon);
  },
  methods: {
    staffMouve(item, index) {
      this.staffIndex = index;
    },
    activeAnim() {
      this.scroll1 = false;
    },
    activeEnt() {
      this.scroll2 = false;
    },
    showIcon() {
      var newsSpan = document.querySelectorAll(".newsSpan");
      var timeList = document.querySelectorAll(".timeList");
      var staffSpan = document.querySelectorAll(".staffSpan");
      var staff = document.querySelectorAll(".staff");
      if (document.documentElement.scrollTop > 220) {
        if (this.scroll1 == true) {
          for (var i = 0; i < newsSpan.length; i++) {
            newsSpan[i].classList.add(
              "animate__animated",
              "animate__fadeInDown"
            );
          }
          for (var i = 0; i < timeList.length; i++) {
            timeList[i].classList.add(
              "animate__animated",
              "animate__fadeInLeftBig",
              "animate__slow-3s"
            );
          }
        }
      }
      if (document.documentElement.scrollTop > 860) {
        if (this.scroll2 == true) {
          for (var i = 0; i < staffSpan.length; i++) {
            staffSpan[i].classList.add(
              "animate__animated",
              "animate__fadeInDown"
            );
          }
          for (var i = 0; i < staff.length; i++) {
            staff[i].classList.add("animate__animated", "animate__zoomIn");
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.aboutUs {
  & > .banner {
    max-width: 100%;
    min-width: 1300px;
    height: 580px;
    background: #111;
    & > .bannerBack {
      max-width: 1920px;
      min-width: 1300px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      background: url("../assets/img/aboutUs/banner2.jpg") no-repeat;
      position: relative;
      & > .animText {
        width: 100%;
        height: 580px;
        background: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        & > .animBack {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 1);
        }
        & > .text {
          //   width: 1300px;
          height: 580px;
          padding-top: 194px;
          //   position: absolute;
          //   top: 0;
          //   left: 50%;
          //   margin-left: -650px;
          // margin: 0 auto;
          & > div {
            width: 614px;
            height: 103px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            & > img:nth-child(1) {
              -webkit-animation-delay: 0.2s; //延迟
              animation-delay: 0.2s;
            }
          }
        }
      }
    }
  }
  & > .aboutLT {
    width: 1300px;
    height: 420px;
    margin: 106px auto 80px;
    display: flex;
    & > .imgLT {
      width: 560px;
      height: 420px;
      margin-right: 55px;
      display: none;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    & > .usLtzm {
      flex: 1;
      overflow: hidden;
      display: none;
      & > .spanP {
        margin-bottom: 31px;
      }
      & > span {
        font-size: 16px;
        line-height: 26px;
        color: #666;
        width: 684px;
        display: block;
        -webkit-animation-delay: 0.2s; //延迟
        animation-delay: 0.2s;
      }
      & > span:nth-child(2) {
        -webkit-animation-delay: 0.3s; //延迟
        animation-delay: 0.3s;
      }
      & > span:nth-child(3) {
        display: block;
        margin: 32px 0;
        -webkit-animation-delay: 0.4s; //延迟
        animation-delay: 0.4s;
      }
      & > span:nth-child(4) {
        -webkit-animation-delay: 0.5s; //延迟
        animation-delay: 0.5s;
      }
    }
  }
  .entNone {
    display: block !important;
  }
  & > .newsLt {
    width: 100%;
    height: 600px;
    background: linear-gradient(
      -90deg,
      rgba(253, 95, 73, 1),
      rgba(243, 38, 45, 1)
    );
    & > .news {
      width: 1300px;
      height: 100%;
      margin: 0 auto;
      padding-top: 40px;
      & > .spanP {
        border-color: #333;
        color: #fff !important;
        & > p {
          color: #fab4af;
        }
      }
      & > .time {
        margin-top: 61px;
        display: flex;
        flex-wrap: wrap;
        & > .timeList {
          height: 80px;
          display: flex;
          align-items: center;
          margin-bottom: 135px;
          animation-duration: 2s;
          & > div:nth-child(1) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 305px;
            & > span {
              color: #fff;
              font-size: 16px;
              line-height: 16px;
            }
            & > span:nth-child(1),
            & > span:nth-child(3) {
              margin-left: 51px;
            }
            & > span:nth-child(2) {
              width: 100%;
              height: 1px;
              background: #fff;
              margin: 15px 0 16px;
            }
          }
          & > .rightImg {
            width: 32px;
            height: 32px;
            & > img {
              width: 100%;
              height: 100%;
            }
          }
        }
        & > .timeList:nth-child(2) {
          -webkit-animation-delay: 0.1s; //延迟
          animation-delay: 0.1s;
        }
        & > .timeList:nth-child(3) {
          -webkit-animation-delay: 0.3s; //延迟
          animation-delay: 0.3s;
        }
        & > .timeList:nth-child(4) {
          -webkit-animation-delay: 0.5s; //延迟
          animation-delay: 0.5s;
          & > div {
            margin-top: 21px;
            & > span:nth-child(3) {
              line-height: 20px;
            }
          }
          & > .rightImg {
            & > img {
              margin-top: -13px;
            }
          }
        }
        & > .timeList:nth-child(5) {
          -webkit-animation-delay: 0.7s; //延迟
          animation-delay: 0.7s;
        }
        & > .timeList:nth-child(6) {
          -webkit-animation-delay: 0.9s; //延迟
          animation-delay: 0.9s;
          & > div {
            margin-top: -20px;
          }
        }
        & > .timeList:nth-child(1),
        & > .timeList:nth-child(5) {
          & > div:nth-child(1) {
            width: 242px;
            & > span:nth-child(1),
            & > span:nth-child(3) {
              margin-left: 0;
            }
            & > span:nth-child(3) {
              width: 224px;
            }
          }
        }
        & > .timeList:nth-child(6) {
          & > div:nth-child(1) {
            & > span:nth-child(3) {
              width: 208px;
            }
          }
        }
        & > .timeList:nth-child(5),
        & > .timeList:nth-child(6) {
          & > div:nth-child(1) {
            & > span:nth-child(3) {
              line-height: 20px;
            }
          }
          & > div:nth-child(2) {
            margin-top: -44px;
          }
        }
      }
    }
  }
  & > .staffPresence {
    width: 1300px;
    margin: 40px auto 50px;
    & > .staffImg {
      margin-top: 32px;
      display: flex;
      flex-wrap: wrap;
      & > .staff {
        width: 400px;
        position: relative;
        padding-bottom: 60px;
        margin: 0 50px 50px 0;
        -webkit-animation-delay: 0.2s; //延迟
        animation-delay: 0.2s;
        & > img {
          width: 100%;
          height: 340px;
          display: block;
        }
        & > .text {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease-in-out;
          & > span {
            color: #333;
            font-size: 20px;
            line-height: 20px;
          }
          & > .noText {
            font-size: 16px;
            line-height: 16px;
            display: none;
            margin-top: 10px;
          }
        }
      }
      & > .staff:nth-child(2) {
        -webkit-animation-delay: 0.3s; //延迟
        animation-delay: 0.3s;
      }
      & > .staff:nth-child(3) {
        -webkit-animation-delay: 0.4s; //延迟
        animation-delay: 0.4s;
        margin-right: 0;
      }
      & > .staff:nth-child(4) {
        -webkit-animation-delay: 0.5s; //延迟
        animation-delay: 0.5s;
      }
      & > .staff:nth-child(5) {
        -webkit-animation-delay: 0.6s; //延迟
        animation-delay: 0.6s;
      }
      & > .staff:nth-child(6) {
        -webkit-animation-delay: 0.7s; //延迟
        animation-delay: 0.7s;
        margin-right: 0;
      }
      & > .staff:hover {
        & > .text {
          height: 80px;
          background: rgba(243, 38, 45, 1);
          & > span {
            color: #fff;
          }
          & > .noText {
            display: block;
          }
        }
      }
    }
  }
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
  & > p {
    font-size: 16px;
    line-height: 16px;
    color: #999;
    font-weight: 400;
    margin-left: 8px;
  }
}
</style>