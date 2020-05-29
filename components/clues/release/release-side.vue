<template>
  <div class="release-side">
    <div class="box-1">
      <h3>我们向您承诺</h3>
      <div class="inner-box">
        <span>广</span>
        <em>全渠道资源，凌客实名认证</em>
      </div>
      <div class="inner-box">
        <span>免</span>
        <em>入驻免佣金，等雇主来青睐</em>
      </div>
      <div class="inner-box">
        <span>满</span>
        <em>商城价对比，雇主满意付款</em>
      </div>
      <div class="inner-box">
        <span>退</span>
        <em>服务不满意，一键全额退款</em>
      </div>
    </div>
    <div class="box-2">
      <h3>联系我们</h3>
      <div class="inner-box">
        <div class="phone">
          <div class="img"></div>
          <div class="text">
            <p>全国免长途电话</p>
            <strong>400-688-6662</strong>
          </div>
        </div>
        <div class="qq">
          <div class="img"></div>
          <div class="text">
            <p>企业QQ</p>
            <strong>800884838</strong>
          </div>
        </div>
      </div>
    </div>
    <a class="box-3" v-if="ad_img != '' && ad_img != null" :href="ad_img_link" target="_blank">
      <img width="260" height="340" v-lazy="ad_img" alt />
    </a>
    <div class="box-3" v-else>
      <img width="260" height="340" v-lazy="ad_img" alt />
    </div>
  </div>
</template>

<script>
import {homeimage } from "@/api/list";
import { mapState } from "vuex";

export default {
  name: "release-side",
   computed: {
    ...mapState({
      envVars: "envVariables",
    })
  },
  data() {
    return {
      ad_img:'',
      ad_img_link:'',
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var type = "11";
      homeimage(type)
        .then(res => {
          if (res.data.code == 200) {
            this.ad_img = res.data.data.ad_img;
            this.ad_img_link = res.data.data.ad_img_link
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.release-side {
  margin-top: 20px;

  .box-1 {
    background: #fff;
    border: 1px solid #e9e9e9;

    h3 {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e9e9e9;
      text-align: center;
      font-size: 18px;
      color: #333;
      position: relative;

      &:before {
        display: block;
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        background: #333333;
        top: 33px;
        left: 2em;
      }

      &:after {
        display: block;
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        background: #333333;
        top: 33px;
        left: 10.8em;
      }
    }

    .inner-box {
      height: 80px;
      line-height: 80px;
      padding-left: 20px;
      border-bottom: 1px solid #e9e9e9;

      span {
        font-size: 18px;
        padding: 7px 8px;
        margin-right: 0.5em;
        color: #e43312;
        background: rgba(248, 248, 248, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 4px;
        font-weight: 600;
      }

      em {
        font-size: 14px;
        color: #212121;
      }
    }

    .inner-box:nth-last-child(1) {
      border: none;
    }
  }

  .box-2 {
    background: #fff;
    border: 1px solid #e9e9e9;
    margin-top: 20px;

    h3 {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e9e9e9;
      text-align: center;
      font-size: 18px;
      color: #333;
      position: relative;

      &:before {
        display: block;
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        background: #333333;
        top: 33px;
        left: 2em;
      }

      &:after {
        display: block;
        content: "";
        position: absolute;
        height: 1px;
        width: 30px;
        background: #333333;
        top: 33px;
        left: 10.8em;
      }
    }

    .inner-box {
      padding-left: 20px;
      padding-right: 20px;

      .phone,
      .qq {
        align-items: center;
        display: flex;
        padding-top: 20px;
        padding-bottom: 20px;

        .img {
          margin-right: 1em;
          height: 42px;
          width: 60px;
          background: url("~assets/img/tel.png") no-repeat center;
          background-size: cover;
        }

        .text {
          p {
            font-size: 12px;
            color: #333;
            line-height: 28px;
          }

          strong {
            font-size: 16px;
            color: #333;
          }
        }
      }

      .qq {
        padding-top: 0;

        .img {
          margin-right: 1em;
          height: 42px;
          width: 60px;
          background: url("~assets/img/qq.png") no-repeat center;
          background-size: 34px 39px;
        }
      }
    }
  }

  .box-3 {
      display: block;
    margin-top: 20px;
  }
}
</style>