<template>
  <el-carousel :interval="5000" arrow="always" height="550px" class="banners">
    <el-carousel-item v-for="(item , index) in imgs" :key="index">
      <div class="adImgBg"  :style="{backgroundImage:`url(${envVars.IMG_HOST+item.ad_img_bg})`}" >
        <a :href="item.ad_img_link || '/'" target="_blank">
          <img :src="envVars.IMG_HOST+item.ad_img" alt />
        </a>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["adTopLarge"],
  data() {
    return {
      imgs: []
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    })
  },
  mounted() {
    this.imgs = this.adTopLarge;
  }
};
</script>
<style lang="less">
.banners {
  width: 100%;
  border-top: 1px solid #f3262d;
  background: url("../../assets/img/novicClick/bannerB.jpg") no-repeat;
  background-size: 100% 100%;
  .el-carousel__container {
    .el-carousel__item {
      width: 100%;
      div {
        height: 550px;
        margin: 0 auto;
        background-repeat:  no-repeat;
        background-size: 100% 100%;
        a {
          display: block;
          width: 1210px;
          height: 550px;
          margin: 0 auto;
          position: relative;
          img {
            display: block;
            width: 1920px;
            height: 550px;
            position: absolute;
            left: 50%;
            margin-left: -960px;
          }
        }
      }
    }
  }
  & > .el-carousel__indicators {
    margin-bottom: 5px;
    & > .el-carousel__indicator {
      padding: 3px;
      border: 1px solid rgba(225, 225, 225, 0);
      border-radius: 50%;
      & > .el-carousel__button {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fff;
        opacity: 1;
      }
    }
    & > .is-active {
      padding: 3px;
      border: 1px solid #fff;
      border-radius: 50%;
    }
  }
}
</style>