<template>
  <div class="mediaum">
    <h3>
      <i class="iconfont" :class="comInfo.icon"></i>
      <span>{{comInfo.name}}</span>
    </h3>
    <div class="sa_carousel" v-if="type === 0 || type === 2">
      <!-- <template v-if="mediaList.length > 4">
                <a class="item-a-1" :class="`mediaum-prev${type}`" slot="button-prev" href="javascript:void(0);"><i
                        class="el-icon-arrow-left"></i></a>
                <a class="item-a-2" :class="`mediaum-next${type}`" slot="" href="javascript:void(0);"><i
                        class="el-icon-arrow-right"></i></a>
      </template>-->
      <template v-if="type === 0">
        <a
          class="item-a-1"
          :class="`mediaum-prev1${type}`"
          slot="button-prev"
          href="javascript:void(0);"
        >
          <i class="el-icon-arrow-left"></i>
        </a>
        <a class="item-a-2" :class="`mediaum-next1${type}`" slot href="javascript:void(0);">
          <i class="el-icon-arrow-right"></i>
        </a>
      </template>
      <template v-if="type === 2">
        <a
          class="item-a-1"
          :class="`mediaum-prev${type}`"
          slot="button-prev"
          href="javascript:void(0);"
        >
          <i class="el-icon-arrow-left"></i>
        </a>
        <a class="item-a-2" :class="`mediaum-next${type}`" slot href="javascript:void(0);">
          <i class="el-icon-arrow-right"></i>
        </a>
      </template>
      <div class="carousel-box">
        <div class="swiper-container" v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <template v-if="type === 0">
              <div class="swiper-slide" v-for="item in mediaList" :key="item.id">
                <div class="sa_slide">
                  <div class="media-box" @click="showPreview(item)">
                    <img
                      :key="index"
                      v-for="(subItem,index) in [item.img1,item.img2,item.img3].filter(item=>item)"
                      src="~/assets/img/img_bg.png"
                      alt="媒介图片"
                      v-lazy="subItem+'?x-oss-process=image/resize,m_fill,h_108,w_180'"
                    />
                  </div>
                  <p>{{item.type_id | mediaLevel}}</p>
                  <p v-if="item.type_id !== 0">
                    <span>{{item.begin_time|splitF}}</span>—
                    <span>{{item.end_time|splitF}}</span>
                  </p>
                </div>
              </div>
            </template>
            <template v-if="type === 2">
              <div class="swiper-slide" v-for="item in mediaList" :key="item.id">
                <div class="slide">
                  <div class="media-box" @click="showPreview(item)">
                    <img
                      src="~/assets/img/img_bg.png"
                      v-lazy="item.honor_img+'?x-oss-process=image/resize,m_fill,h_108,w_180'"
                      :alt="item.type_name"
                    />
                  </div>
                  <p v-bind:title="item.type_name">{{item.type_name}}</p>
                  <p>{{item.received_time}}</p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!--隶属媒体公司-->
    <div class="media-comp" v-else-if="type === 1">
      <p>{{mediaList.company_name}}</p>
      <div class="media_img">
        <!-- ,mediaList.img_certify -->
        <img
          v-for="(item,index) in [mediaList.img_license].filter(item=>item)"
          :key="index"
          src="~/assets/img/img_bg.png"
          @click="showPreview(mediaList)"
          alt="媒介图片"
          v-lazy="item+'?x-oss-process=image/resize,m_fill,h_108,w_180'"
        />
      </div>
    </div>
    <ul v-else-if="type === 3">
      <li class="job_li" v-for="item in mediaList" :key="item.id">
        <p class="job_top">
          <span>{{item.company_name}}</span>
          <span>{{item.begin_time|splitF}}—{{item.end_time|splitF}}</span>
        </p>
        <div class="job_text">
          <span>
            公司性质：
            <span>{{item.nature_name}}</span>
          </span>
          <span>
            公司规模：
            <span>{{item.scale_name}}</span>
          </span>
          <span>
            部门：
            <span>{{item.department}}</span>
          </span>
          <span>
            职位：
            <span>{{item.position}}</span>
          </span>
        </div>
      </li>
    </ul>
    <preview-picture v-if="preview" :list="nowViewImages" @close="emitClose"></preview-picture>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mediaLevel } from "~/utils/common-filters";
import PreviewPicture from "~/components/component/previewPicture";
// import Swiper from 'swiper'
const COM_TITLE = new Map([
  [0, { name: "店铺媒介资质", icon: "icon-meijiezizhi" }],
  [1, { name: "隶属媒体公司", icon: "icon-lishumeitigongsi" }],
  [2, { name: "自传资质", icon: "icon-zichuanzizhi" }],
  [3, { name: "工作经历", icon: "icon-gongzuojingli" }]
]);
export default {
  name: "mediaum",
  components: { PreviewPicture },
  props: {
    mediaList: {},
    /* 0 媒介资质  1 媒体公司*/
    type: {
      type: Number,
      default: 0
    }
  },
  filters: {
    mediaLevel,
    splitF: val => {
      return val.split(" ")[0];
    }
  },
  data() {
    return {
      num: 10,
      left: 0,
      value: "",
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
          nextEl: `.mediaum-next${this.type}`,
          prevEl: `.mediaum-prev${this.type}`
        }
      },
      preview: false,
      nowViewImages: []
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    }),
    comInfo() {
      return COM_TITLE.get(this.type);
    }
  },
  mounted() {
    // require('@/assets/js/swiper.min5.3.js');
    // var swiperOption2 = new Swiper(".gallery-thumbs8", {
    //   // some swiper options/callbacks
    //   // 所有的参数同 swiper 官方 api 参数
    //   // ...
    //   slidesPerView: 4,
    //   spaceBetween: 30,
    //   navigation: {
    //     nextEl: `.mediaum-next1${this.type}`,
    //     prevEl: `.mediaum-prev1${this.type}`
    //   }
    // });
    // var swiperOption = new Swiper(".gallery-thumbs9", {
    //   // some swiper options/callbacks
    //   // 所有的参数同 swiper 官方 api 参数
    //   // ...
    //   slidesPerView: 4,
    //   spaceBetween: 30,
    //   navigation: {
    //     nextEl: `.mediaum-next${this.type}`,
    //     prevEl: `.mediaum-prev${this.type}`
    //   }
    // });
  },
  methods: {
    emitClose() {
      this.preview = false;
    },
    showPreview(item) {
      let param = [];
      if (this.type === 0) {
        const { img1 = "", img2 = "", img3 = "" } = item;
        param = [img1, img2, img3].filter(item => item);
      } else if (this.type === 2) {
        param = [item.honor_img];
      } else if (this.type === 1) {
        //隶属媒体公司
        param = [item.img_license, item.img_certify];
      }
      this.nowViewImages = param;
      this.preview = true;
    }
    /*
            nextClickHandle() {
                let _left = Math.abs(this.left)
                let _num = this.num * 210 - 800
                if (_left >= _num) {
                    return
                } else {
                    this.left = this.left - 210
                }
            },
            prevClickHandle() {
                let _left = Math.abs(this.left)
                if (_left <= 0) {
                    return
                } else {
                    this.left = this.left + 210
                }
            },
            */
  }
};
</script>

<style scoped lang="less">
.item-a-1 {
  left: 0;
}

.item-a-2 {
  right: 0;
}

.item-a-1,
.item-a-2 {
  position: absolute;
  z-index: 1;
  top: 50px;

  width: 20px;
  height: 51px;
  outline: none;

  i {
    width: 20px;
    height: 51px;
    background: #f9f9f9;
    line-height: 51px;
    color: #757575;
    text-align: center;
  }

  &:hover {
    i {
      color: #ff0027;
    }
  }
}

.mediaum {
  background: #fff;
  margin-top: 20px;
  padding: 20px 10px 10px;
  width: 920px;

  h3 {
    height: 16px;
    line-height: 16px;
    font-weight: 400;

    span {
      font-size: 16px;
      line-height: 1em;
      color: #333;
      margin-left: 10px;
    }
  }
}

.sa_carousel {
  position: relative;
  overflow: hidden;
  // 媒介
  .carousel-box {
    position: relative;
    margin: 0 30px;
    padding-top: 25px;
  }
}

.sa_slide {
  width: 200px;
  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }

  p {
    font-size: 14px;
    color: #666;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:nth-child(2) {
    padding-top: 10px;
    padding-bottom: 4px;
  }
}

.media-box {
  width: 100%;
  height: 120px;
  display: flex;
  position: relative;

  img {
    width: 180px;
    height: 108px;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.04);
    }

    &:nth-child(2) {
      top: 6px;
      left: 6px;
    }

    &:nth-child(3) {
      top: 12px;
      left: 12px;
    }
  }
}

// 工作经验
.job_li {
  border-bottom: 1px solid #ddd;
  padding: 16px 10px 10px 28px;

  &:last-child {
    border-bottom: none;
  }

  .job_top,
  .job_text {
    line-height: 1.5;
    font-size: 14px;

    span {
      color: #666;
    }
  }

  .job_top {
    padding-bottom: 10px;

    span {
      margin-right: 50px;
    }
  }

  .job_text {
    display: flex;

    span {
      flex: 1;
    }
  }
}

// 媒体公司
.media-comp {
  padding-top: 18px;

  p {
    font-size: 14px;
    color: #666;
    padding-bottom: 10px;
    padding-left: 20px;
  }
}

.media_img {
  padding-left: 20px;

  img {
    width: 180px;
    height: 108px;
    margin-right: 20px;
    transition: transform 0.5s;

    &:hover {
      transform: scale(1.04);
    }
  }
}
</style>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>
