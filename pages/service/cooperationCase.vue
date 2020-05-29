<template>
  <div class="cooperationCase biography_main" v-if="flagA">
    <ul>
      <li
        v-for="(item , index) in caseList"
        :key="index"
        :class="{caseActive:caseIndex == index}"
        @click="caseClick(item , index)"
      >{{item}}</li>
    </ul>
    <div class="swiper_data">
      <div class="seleData">
        <img
          src="@/assets/img/img_bg.png"
          v-lazy="caseD.img+'?x-oss-process=image/resize,m_fill,h_90,w_150'"
        />

        <span>{{caseD.name}}</span>
        <div>
          <div class="detail-btn" @click.stop="Checkone($event,caseD)"></div>
          ￥{{caseD.min_price}}
        </div>
      </div>
      <img src="../../assets/img/ServGetDetailsPage/jiahao.png" alt />
      <i class="el-icon-arrow-left nextser left1" v-show="flagC"></i>
      <i class="el-icon-arrow-left nextser left2" v-show="flagH"></i>

      <div class="swiper-container gallery-thumbs3 case-swbox" v-show="flagC">
        <div class="swiper-wrapper">
          <div class="swiper-slidew" v-for="(item , index) in caseData" :key="index">
            <img
              src="@/assets/img/img_bg.png"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_90,w_150'"
              @click="caseRouter(item , index)"
            />
            <span @click="caseRouter(item , index)">{{item.name}}</span>
            <div>
              <div
                class="detail-btn"
                @click.stop="Checkbox($event,item)"
                v-if="item.hasBuy == false"
              ></div>
              <div @click.stop="buyClick" class="hasBuy" v-else></div>
              ￥{{item.price}}
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-container swiper-thumbs4 case-swbox" v-show="flagH">
        <div class="swiper-wrapper">
          <div
            class="swiper-slidew"
            v-for="(item , index) in hasBiog"
            :key="index"
            @click="caseRouter(item , index)"
          >
            <img
              src="@/assets/img/img_bg.png"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_90,w_150'"
            />
            <span>{{item.name}}</span>
            <div>
              <div
                class="detail-batn"
                @click.stop="CheckHas($event,item)"
                v-if="item.hasBuy == false"
              ></div>
              <div @click.stop="buyClick" class="hasBuy" v-else></div>
              ￥{{item.price}}
            </div>
          </div>
        </div>
      </div>
      <i class="el-icon-arrow-right prevser right1" v-show="flagC"></i>
      <i class="el-icon-arrow-right prevser right2" v-show="flagH"></i>

      <img class="imgD" src="../../assets/img/ServGetDetailsPage/jianhao.png" alt />
      <div class="total">
        <div v-if="caseALL !=undefined && caseALL.length >0">
          已选择
          <p v-if="caseF !=undefined && caseF.length >0">1个服务,</p>
          <p v-if="caseP !=undefined && caseP.length >0">{{caseP.length}}个案例,</p>
          <p v-if="caseH !=undefined && caseH.length >0">{{caseH.length}}个传记</p>
        </div>
        <span v-else>已选择0个</span>
        <span>
          组合价:
          <span>￥{{totalSumAll}}</span>
        </span>
        <span @click="shopClick()">立即购买</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { addCartPackage } from "@/api/list";
export default {
  inject: ["cassData"],

  data() {
    return {
      caseList: ["媒体合作案例", "媒主经历传记"],
      caseIndex: 0,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 12,
        navigation: {
          nextEl: `.left`,
          prevEl: `.right`
        }
      },
      caseD: this.cassData[0] || [],
      caseData: this.cassData[0].hasCase || [],
      hasBiog: this.cassData[0].hasBiog || [],
      caseP: [],
      caseF: [],
      caseH: [],
      caseALL: [],
      numP: 0,
      userId: "",
      flagA: false,
      flagC: false,
      flagH: false,
      id: []
    };
  },
  mounted() {
    if (this.caseData.length > 0 || this.hasBiog.length > 0) {
      this.flagA = true;
    }
    if (this.caseData.length == 0 && this.hasBiog.length > 0) {
      this.caseList = ["媒主经历传记"];
      this.flagH = true;
    } else if (this.hasBiog.length == 0 && this.caseData.length > 0) {
      this.caseList = ["媒体合作案例"];
      this.flagC = true;
    } else {
      this.caseList = ["媒体合作案例", "媒主经历传记"];
      if (this.caseIndex == 0) {
        this.flagC = true;
      }
    }
    if (this.caseData) {
    }
  },
  methods: {
    caseClick(item, index) {
      this.caseIndex = index;
      if (this.caseIndex == 0) {
        this.flagC = true;
        this.flagH = false;
      } else {
        this.flagH = true;
        this.flagC = false;
      }
    },
    // 单选
    Checkbox(e, item) {
      if (e.target.className.indexOf("detail-selected") == -1) {
        e.target.className = `detail-btn detail-selected`;
        this.caseP.push(item);
        this.caseALL.push(item);
      } else {
        e.target.className = "detail-btn";
        for (var i = 0; i < this.caseP.length; i++) {
          if (this.caseP[i].id == item.id) {
            this.caseP.splice(i, 1);
          }
        }

        for (var i = 0; i < this.caseALL.length; i++) {
          if (this.caseALL[i].id == item.id) {
            this.caseALL.splice(i, 1);
          }
        }
      }
    },
    CheckHas(e, item) {
      if (e.target.className.indexOf("detail-sele") == -1) {
        e.target.className = `detail-batn detail-sele`;
        this.caseH.push(item);
        this.caseALL.push(item);
      } else {
        e.target.className = "detail-batn";
        for (var i = 0; i < this.caseH.length; i++) {
          if (this.caseH[i].id == item.id) {
            this.caseH.splice(i, 1);
          }
        }
        for (var i = 0; i < this.caseALL.length; i++) {
          if (this.caseALL[i].id == item.id) {
            this.caseALL.splice(i, 1);
          }
        }
      }
    },
    Checkone(e, caseD) {
      if (e.target.className.indexOf("detail-selected") == -1) {
        e.target.className = `detail-btn detail-selected`;
        this.caseF.push(caseD);
        this.caseALL.push(caseD);
      } else {
        e.target.className = "detail-btn";
        for (var i = 0; i < this.caseF.length; i++) {
          if (this.caseF[i].id == caseD.id) {
            this.caseF.splice(i, 1);
          }
        }
        for (var i = 0; i < this.caseALL.length; i++) {
          if (this.caseALL[i].id == caseD.id) {
            this.caseALL.splice(i, 1);
          }
        }
      }
      if (this.caseF != undefined && this.caseF.length > 0) {
        for (var j = 0; j < this.caseF.length; j++) {
          this.numP = this.caseF[j].min_price;
        }
      } else {
        this.numP = 0;
      }
    },
    caseRouter(item, index) {
      var { href } = this.$router.resolve({
        path: `/case-biog/${item.id}`,
        query: { id: item.store_id }
      });
      window.open(href, "_blank");
    },
    shopClick() {
      var a = [...this.caseH, ...this.caseP];
      for (var i = 0; i < a.length; i++) {
        this.id.push(a[i].id);
      }
      if (this.id.length < 1) {
        this.$message.error("请选择案例传记");
        return;
      }
      if (this.userInfoData) {
        this.userId = this.userInfoData.original.id;
        if (this.userId != this.caseD.user_id) {
          this.buyClick();
        } else {
          this.$message.error("您不能购买自己的服务");
        }
      } else {
        this.buyClick();
      }
    },
    // 加入购物车
    async buyClick() {
      var params = {
        sid: this.caseD.id,
        case_biog_ids: this.id
      };
      let carPack = await addCartPackage(params);
      const { code, message, data } = carPack.data;
      if (code != 200) return this.$message.error(message);
      this.$message.success("成功加入购物车");
    }
  },

  computed: {
    ...mapState({ userInfoData: "userInfo" }),
    totalSumAll() {
      var num = Number(this.numP);
      var data = [...this.caseP, ...this.caseH];
      data.map(item => {
        num += Number(item.price);
      });
      num = parseFloat(num).toFixed(2);
      return num;
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/ServGetDetailsPage/cooperationCase";
</style>
<style lang="less">
.swiper_data {
  & > .left1,
  .left2,
  & > .right1,
  .right2 {
    width: 16px;
    height: 60px;
    line-height: 60px;
    margin-top: 15px;
    color: #c5c5c5;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(241, 241, 241, 1);
    cursor: pointer;
  }

  & > .left1:focus,
  .left2:focus,
  & > .right1:focus,
  .right2:focus {
    border: 1px solid rgba(241, 241, 241, 1);
  }

  .case-swbox {
    margin-left: 16px;
    margin-right: 16px;
    width: 643px;

    & > .swiper-wrapper {
      width: 100%;

      & > .swiper-slidew {
        width: 152px !important;
        margin-right: 16px;
        display: flex;
        flex-direction: column;
        & > img {
          display: block;
          width: 152px;
          height: 90px;
           cursor: pointer;
        }

        & > span {
          width: 152px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-wrap: break-word;
          font-size: 12px;
          color: #666;
          height: 33px;
          margin: 5px 0 5px 0;
           cursor: pointer;
          &:hover {
            color: #f3262d;
          }
        }
        & > :nth-child(3) {
          font-size: 16px;
          line-height: 16px;
          color: #ff0027;
          display: flex;
          & > .detail-btn {
            width: 14px;
            height: 14px;
            border: 1px solid #ddd;
            margin-right: 5px;
            margin-top: 1px;
              cursor: pointer;
          }

          & > .detail-selected {
            border: 1px solid #f3262d !important;
            background: url("../../assets/img/redgou.png") no-repeat 100%;
            background-size: 13px 13px;
          }

          & > .hasBuy {
            width: 14px;
            height: 14px;
            border: 1px solid #ddd;
            margin-right: 5px;
            margin-top: 1px;
            background: url("../../assets/img/ServGetDetailsPage/disa.png");
          }
        }
      }

      & > .swiper-slidew:lase-child {
        margin-right: 0;
      }
    }
  }

  .detail-btn,
  .detail-batn {
    width: 14px;
    height: 14px;
    border: 1px solid #ddd;
    margin-right: 5px;
    margin-top: 1px;
      cursor: pointer;
  }

  .detail-selected,
  .detail-sele {
    border: 1px solid #f3262d !important;
    background: url("../../assets/img/redgou.png") no-repeat 100%;
    background-size: 13px 13px;
  }
}
</style>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>
<style lang="less">
.biography_main {
  .nextser2,
  .prevser2 {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
}
</style>
