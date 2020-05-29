<template>
  <div class="ServGetDetailsPage company_story_main">
    <l-head />
    <ServGetTop :dataLIST="dataLIST" :showPosition="false" v-if="dataLIST.length>0" />
    <div class="ServGetDetShop_data" >
      <div class="ServGetDetShop" v-if="caseDetail.img||caseDetail.name">
        <div class="buyCar story_car">
          <div class="ServGetDetShop_left company_story">
            <div class="swiper gallery-top">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img
                    :src="envVars.IMG_HOST+caseDetail.img+'?x-oss-process=image/resize,m_fill,h_408,w_680'"
                    alt
                  />
                </div>
              </div>
            </div>
            <div class="comparison company-img-bottom">
              <div class="radio" @click="collectCasebiog()">
                <div class="m-icon-heart" :class="{'m-icon-heart-active':isCollect}"></div>
                <span v-if="isCollect">已收藏</span>
                <span v-else>收藏</span>
              </div>
              <share :config="config" :typeNone="typeNone" v-if="config" />
              <span class="m-report-text" @click="reportClick">举报</span>
            </div>
          </div>
          <div class="company_story_right">
            <h4>{{caseDetail.name}}</h4>
            <div class="ServGetDetShop_right_top">
              <div>
                <span>
                  <p>售价</p>
                  <i>¥{{caseDetail.price}}</i>
                </span>
              </div>
              <div></div>
            </div>
            <div class="m-has-buy" v-if="caseDetail.hasBuy">
              <span class="iconfont icon-chenggong"></span>您已购买，可直接下载。
            </div>
            <div class="wrap wrap-sku">
              <div class="product-box">
                <div class="product-footer">
                  <div v-if="!caseDetail.hasBuy">
                    <span class="shopCarP user_select" @click="shopCarClick">加入购物车</span>
                    <el-button type="text" @click="onSubmit" class="buyShop">立即购买</el-button>
                  </div>
                  <a
                    v-else
                    :href="localUrl+'/api/casebiog/downFile?id='+caseDetail.id"
                    :download="localUrl+'/api/casebiog/downFile?id='+caseDetail.id"
                    class="buyShop"
                  >下载</a>
                  <div v-html="apply"></div>
                  <div class="textM">
                    服务商已经缴纳保证金
                    <i>{{storeInfo.marginsum}}</i> 元，承诺交易出问题，保证金赔付
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-related-service-wrap" v-if="hasService.length>0">
        <div class="m-title-wrap">
          <h3>相关服务</h3>
          <nuxt-link class="m-more-link" :to="'/shop/'+store_id+'/all'">
            更多服务
            <p style="font-family: simsun;">></p>
          </nuxt-link>
        </div>
        <div class="m-related-list">
          <ul>
            <li v-for="(item,index) in hasService" :key="index">
              <nuxt-link :to="'/service/'+item.id+'?id='+store_id">
                <img :src="envVars.IMG_HOST+item.img" alt />
                <span class="name">{{item.name}}</span>
                <span class="price">¥{{item.price}}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <CompanyStoryData :dataLIST="dataLIST" v-if="dataLIST.length" />
    </div>
    <div class="buyShopData" v-if="flagBuy">
      <div class="buyShopDataCENT">
        <span @click="deleClick" class="iconfont icon-guanbi"></span>
        <div class="centerLeft">
          <h3>购买服务</h3>
          <div class="div_item">
            服务名称
            <p class="name" :title="caseDetail.name">{{caseDetail.name}}X{{count}}</p>
          </div>
          <div class="div_item">
            服务价格
            <p class="payMoney">¥{{caseDetail.price*count}}</p>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="70px">
            <el-form-item label="您的需求" prop="desc">
              <el-input
                type="textarea"
                v-model="form.desc"
                resize="none"
                placeholder="填写详细需求，以便为您快速匹配专业人才（字数限制500字）"
                :maxlength="500"
              ></el-input>
            </el-form-item>
            <el-form-item class="upload">
              <el-upload
                class="upload-demo"
                :headers="headers"
                name="imgs"
                ref="upload"
                :action="$store.state.uploadApi"
                :file-list="upload_imgs"
                :on-remove="handleRemove"
                :limit="5"
                :auto-upload="true"
                :before-upload="beforeAvatarUpload"
                :on-success="avant_upload_succ"
              >
                <template>
                  <span>上传附件</span>
                </template>
                <el-button size="small" type="primary">上传附件</el-button>
                <span slot="tip" class="el-upload__tip">最多可添加5个附件，每个大小不超过50M.</span>
              </el-upload>
            </el-form-item>
            <el-form-item class="primary">
              <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="centerRight">
          <div class="buyShopData_r">
            <span>便捷、放心的需求发布</span>
            <ul>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-goumaifuwu-xiangying" class="ccccc" />
                </svg>
                <div>
                  <p>一键发布，快速响应</p>
                  <p>凌客30分钟内及时响应</p>
                </div>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-goumaifuwu-guocheng" class="ccccc" />
                </svg>
                <div>
                  <p>交易过程中全程提供保障</p>
                  <p>在线电子合同签约，先验收后付款，全程有保障</p>
                </div>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-goumaifuwu-baozhengjin" class="ccccc" />
                </svg>
                <div>
                  <p>交易出问题，保证金赔付</p>
                  <p>交易出问题，申请退款维权，可获保证金赔付</p>
                </div>
              </li>
              <li>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-goumaifuwu-danbao" class="ccccc" />
                </svg>
                <div>
                  <p>担保交易，验收合格再付款</p>
                  <p>托管赏金到平台，先验收后付款，拒绝拿钱不做事</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ServGetTop from "../service/ServGetTop";
import config from "@/config/index";
import CompanyStoryData from "./CompanyStoryData";
import LHead from "@/components/shop/header";
import comFooter from "@/components/component/comFooter";
import { addCart } from "@/api/list";
import { cartTools } from "@/utils/tool";
import {
  serviceStoreInfo,
  createCaseBiogOrder,
  commonCollect,
  commonTipOffs
} from "@/api/list";
import { casebiogDetails } from "~/api/async-server";

import { report } from "~/api/report";
import { downFile } from "../../api/store-flow";
import { removeFile } from "@/api/common";
import { downloadMixin } from "~/utils/common-mixins";
import { storeInfoInit, storeIndexInit } from "~/api/async-server";
import { getCookie } from "../../utils";
import { mapState } from "vuex";
import dataEventTrack from "@/utils/dataEventTrack";
import share from "@/components/component/share";
const SERVICE_TYPE = {
  service: "服务",
  case: "案例",
  biog: "传记"
};
export default {
  computed: {
    ...mapState({ envVars: "envVariables", userInfoData: "userInfo" })
  },
  mixins: [downloadMixin()],
  layout: "hasSideBar",
  components: {
    LHead,
    ServGetTop,
    CompanyStoryData,
    comFooter,
    share
  },
  provide() {
    return {
      dataLIST: this.dataLIST,
      caseResa: this.caseResa,
      caseDetail:this.caseDetail,
      storeInfo:this.storeInfo,
    };
  },
  head() {
    const caseName = this.caseDetail.name;
    const storeName = this.storeInfo.store_name;
    const storeDesc = this.storeInfo.description;
    const title = `${caseName} - ${
      SERVICE_TYPE[this.selectType]
    } - ${storeName}`;
    return {
      title: `${title}凌天众媒网`,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: `${caseName || ""} - ${storeName || ""}  - 凌天众媒网`
        },
        {
          hid: "description",
          name: "description",
          content: `${storeName || ""}在凌天众媒网发布的一条${
            SERVICE_TYPE[this.selectType]
          }${caseName || ""},${storeDesc}`
        }
      ]
    };
  },
  async fetch(app) {},
  data() {
    const { id = 0, type = "service" } = this.$route.query;
    const { cid = 0 } = this.$route.params;
    return {
      config: "",
      apply: "",
      localUrl: config.UPLOAD_IMAGE_URL,
      isCollect: true,
      // swiperOptionTop: {
      //   spaceBetween: 10,
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev"
      //   }
      // },
      hasService: [],
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "7",
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      // shopSl: "",
      dataLIST: [],
      // shop: {},
      // messageFlage: false,
      comparData: [], //点击获取当前页面信息
      comparisonList: [], //储存的对比信息
      messageMore: false,
      // closeL: false,
      // money: 0,
      shopDataListA: {},
      sale_attr: [],
      choiceFlagArr: [],
      saleKeyArr: [],
      selectArr: [], //存放被选中的值
      shopItemInfo: {}, //存放要和选中的值进行匹配的数据
      subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
      count: 1,
      dialogFormVisible: false,
      // 购买弹窗
      form: {
        desc: "",
        fileList3: []
      },
      // 校验
      rules: {
        desc: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      spec_json: "",
      store_id: "",
      attrName: [],
      allName: [],
      y_index: -1,
      flagBuy: false,
      userId: "",
      upload_imgs: [], // 上传文件
      indexI: "",
      selectId: id,
      selectType: type,
      selectCid: cid,
      typeNone: "",
      caseName: "",
      titleData: "",
      selectT: "",
      caseDetail:'',
      storeInfo:''
    };
  },
  async asyncData(app) {
    // 请求页面数据
    const { cid } = app.params;
    var sid = cid;
    let caseDetail = {};
    let storeInfo = {};

    try {
      const caseResRes = await casebiogDetails(app, sid, app.query.sign);
      const caseRes = caseResRes ? caseResRes.data.data : "";
      console.log('caseRescaseRes',caseRes)
      if(!caseRes) return
      var caseResa = caseRes;
      caseDetail = caseRes;
      if (caseResa) {
        const storeInfoRes = await serviceStoreInfo(caseDetail.store_id);
        if (storeInfoRes.data.code === 200) storeInfo = storeInfoRes.data.data;
      }
      return {
        caseDetail,
        storeInfo,
        dataLIST: [{ ...caseDetail }, { ...storeInfo }],
        caseResa: caseResa
      };
    } catch (error) {
      console.log(error);
    }
  },
  created() {
    if (!this.caseDetail) {
      this.$router.push({
        path: "/closeData/closeData",
        query: { type: 3 }
      });
    }
  },
  mounted() {
    if (this.caseDetail.collect == 1) {
      console.log(this.caseDetail);
      this.isCollect = true;
    } else {
      this.isCollect = false;
      console.log(this.caseDetail);
    }
    this.typeNone = "1";
    if (SERVICE_TYPE[this.selectType] === "案例") {
      this.selectT = "1";
    } else if (SERVICE_TYPE[this.selectType] === "传记") {
      this.selectT = "2";
    }
    this.init();
  },
  methods: {
    collectCasebiog() {
      if (this.userInfoData) {
        this.userId = this.userInfoData.original.id;
        if (this.userId != this.caseDetail.user_id) {
          let _this = this;
          let data = {
            type: this.caseDetail.type == 1 ? 4 : 5,
            collect_id: this.selectCid,
            cancel: this.isCollect ? 1 : 0
          };

          commonCollect(data)
            .then(res => {
              if (res.data.data.status == 1) {
                if (this.isCollect) {
                  this.isCollect = false;
                } else {
                  this.isCollect = true;
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error(
            "您不能收藏自己的" + SERVICE_TYPE[this.selectType]
          );
        }
      }else {
        return this.$loginp(0, () => {
          this.colletClick(e);
        });
      }
    },
    async init() {
      var title = "";
      if (SERVICE_TYPE[this.selectType] == "案例") {
        title = "媒体案例";
      } else if (SERVICE_TYPE[this.selectType] == "传记") {
        title = "媒主传记";
      }
      this.config = {
        url: location.href,
        title: `${this.caseDetail.name}`,
        description: `我在凌天众媒网发现一个不错的${title}，赶快来看看`,
        image:
          this.envVars.IMG_HOST + this.caseDetail.img ||
          location.origin + "/favicon.ico",
        summary: `我在凌天众媒网发现一个不错的${title}，赶快来看看`
      };
    },

    //图片格式
    beforeAvatarUpload(file) {
      this.headers = { Authorization: "Bearer " + getCookie("access_token") };
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$$.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      return isJPG || isBMP || isGIF || isPNG;
    },
    handleRemove(file, fileList) {
      if (file && file.status === "success") {
        let str = file.url;
        let iStr = str.replace(file.domain, "");
        let arr = this.upload_imgs;
        removeFile({ rmfile: iStr })
          .then(res => {
            arr.forEach((el, idx) => {
              if (el.uid == file.uid) {
                arr.splice(idx, 1);
                this.upload_imgs = arr;
              }
            });
            this.$message.success("操作成功");
          })
          .catch(err => {
            this.$message.error("操作失败");
            return false;
          });
      }
    },
    downFileHttp(id) {
      download();
    },
    async avant_upload_succ(response, file, fileList) {
      let { code, message, data } = response;
      this.upload_imgs.push({
        url: data.file,
        name: "附件"
      });
    },

    // 提交订单
    onSubmit(formName) {
      console.log(SERVICE_TYPE[this.selectType]);

      let _this = this;
      var data = {
        id: this.selectCid
      };
      createCaseBiogOrder(data)
        .then(res => {
          if (res.data.code == 200 && res.data.data.id > 0) {
            var order_sn = res.data.data.order_sn;
            dataEventTrack({
              referer: document.referrer,
              event_type: "click",
              kv: {
                router: this.$route.fullPath,
                rname: "立即购买",
                case_id: this.selectCid,
                case_type: this.selectT,
                case_num: "1",
                case_price: this.caseDetail.price
              }
            });
            if (SERVICE_TYPE[this.selectType] === "案例") {
              this.$router.push("/payment?order_sn=" + order_sn + "&type=6");
            } else if (SERVICE_TYPE[this.selectType] === "传记") {
              this.$router.push("/payment?order_sn=" + order_sn + "&type=8");
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    shopCarClick() {
      var data = {
        type: 1 + this.dataLIST[0].type,
        goods_id: this.selectCid,
        price: this.caseDetail.price,
        num: this.count,
        spec_json: this.spec_json
      };
      if (this.userInfoData) {
        this.userId = this.userInfoData.original.id;
        if (this.userId != this.caseDetail.user_id) {
          addCart(data)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("成功加入购物车");
                dataEventTrack({
                  referer: document.referrer,
                  event_type: "click",
                  kv: {
                    router: this.$route.fullPath,
                    rname: "加入购物车",
                    case_id: this.selectCid,
                    case_type: this.selectT,
                    case_num: "1",
                    case_price: this.caseDetail.price
                  }
                });
                cartTools.countChange.call(this);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error(
            "您不能购买自己的" + SERVICE_TYPE[this.selectType]
          );
        }
      } else if (!this.token)
        return this.$loginp(0, () => {
          this.isFreely = 1;
        });
    },

    //关闭购买服务
    deleClick() {
      this.flagBuy = false;
    },
    // 举报
    reportClick() {
      var type = "";
      let obj = {
        project_type: 6,
        project_id: this.selectCid
      };
      if (this.caseDetail.type == "1") {
        obj.project_type = 6;
      } else if (this.caseDetail.type == "2") {
        obj.project_type = 7;
      }
      report.tipOffs(obj).then(res => {
        if (res.data.code == 200) {
          sessionStorage.setItem("historyUrl", this.$route.fullPath);
          var { href } = this.$router.resolve(
            "/report?type=" + obj.project_type + "&id=" + this.selectCid
          );
          window.open(href, "_blank");
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/ServGetDetailsPage/ServDetailsComm.less";
</style>
<style lang="less">
@import "../../assets/css/ServGetDetailsPage/ServGetDetailsPage.less";
</style>
<style lang="scss" scoped>
.company_story_main {
  .story_car {
    min-height: 486px !important;
  }
  .company_story {
    min-height: 486px;
    overflow: hidden;
    .swiper-slide {
      height: 408px;
    }
  }
  .ServGetDetShop_right_top {
    & > div {
      & > span {
        display: flex;
        align-items: flex-end;
        & > p {
          font-size: 12px;
          color: #999;
          line-height: 12px;
        }
        & > i {
          font-size: 24px;
          color: #ff0027;
          line-height: 23px;
          margin: 0px 0 0 34px;
        }
      }
    }
    & > div:nth-child(2) {
      border-left: 1px solid #f4f6f8 !important;
    }
  }
  .swiper-container {
    background-color: #fff;
  }

  .m-share {
    display: inline-block;
    margin-left: 10px;
    box-sizing: content-box;

    .bdsharebuttonbox {
      display: inline-block;
      padding-top: 10px;
    }
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
  }

  .gallery-top {
    width: 100%;

    .swiper-slide {
      video {
        width: 100%;
      }
    }
  }

  .gallery-thumbs {
    height: 17% !important;
    box-sizing: border-box;
    padding: 10px 0;

    .swiper-wrapper {
      .swiper-slide {
        video {
          width: 90px;
          height: 54px;
        }
      }
    }
  }

  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .swiper-button-prev {
    width: 15px;
    height: 54px;
    top: 38%;
    left: 0;
    background-image: url("../../assets/img/arrows/arrowsXz.png");
    background-size: 15px 54px;
    display: none;
  }

  .swiper-button-next {
    width: 15px;
    height: 54px;
    top: 38%;
    right: 0;
    display: none;
    background: url("../../assets/img/arrows/arrowsXy.png");
    background-size: 15px 54px;
  }

  .gallery-thumbs:hover {
    .swiper-button-prev {
      display: block;
    }

    .swiper-button-prev:hover {
      background: url("../../assets/img/arrows/arrowsHz.png");
    }

    .swiper-button-next {
      display: block;
    }

    .swiper-button-next:hover {
      background: url("../../assets/img/arrows/arrowsHy.png");
    }
  }

  .m-has-buy {
    height: 38px;
    padding-top: 18px;
    line-height: 20px;
    display: flex;
    align-items: center;
    .icon-chenggong {
      font-size: 20px;
      color: #0ba06c;
      margin-right: 6px;
    }
  }
}
</style>
