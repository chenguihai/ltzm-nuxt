<template>
  <div class="ServGetDetailsPage serv_detail_main">
    <l-head />
    <ServGetTop :dataLIST="dataLIST" v-if="dataLIST.length > 0" />
    <div class="ServGetDetShop_data">
      <div class="ServGetDetShop" v-if="simulatedDATA">
        <div class="buyCar">
          <div class="swirp_Det">
            <div
              class="swiper-container gallery-top"
              v-swiper:swiper1="swiperOptionTop"
              ref="swiperTop"
            >
              <div class="swiper-wrapper">
                <div
                  @click="previewPicture(index)"
                  class="swiper-slide"
                  v-for="(item, index) in simulatedDATA&&simulatedDATA.images"
                  :key="index"
                >
                  <video
                    v-if="item.type=='video'"
                    :src="envVars.IMG_HOST+simulatedDATA.video"
                    class="video"
                    controls
                  ></video>
                  <img
                    v-else
                    :src="envVars.IMG_HOST+item.url+'?x-oss-process=image/resize,m_fill,h_408,w_678'"
                    alt
                  />
                </div>
              </div>
            </div>
            <div
              class="swiper-container gallery-thumbs"
              v-swiper:swiper2="swiperOptionThumbs"
              ref="swiperThumbs"
            >
              <div class="swiper-wrapper">
                <div
                  class="swiper-slide"
                  v-for="(item, index) in simulatedDATA&&simulatedDATA.images"
                  :key="index"
                >
                  <div v-if="item.type=='video'" style="height:100%">
                    <video :src="envVars.IMG_HOST+simulatedDATA.video"></video>
                    <svg class="video_icon" aria-hidden="true">
                      <use xlink:href="#icon-bofang" fill="#fff" />
                    </svg>
                  </div>
                  <img
                    v-else
                    :src="envVars.IMG_HOST+item.url+'?x-oss-process=image/resize,m_fill,h_50,w_90'"
                    alt
                  />
                </div>
              </div>
            </div>
            <!-- Add Arrows -->
            <div class="add_white_button">
              <div class="swiper-button-next swiper-button-white arrows_left" slot="button-prev"></div>
              <div class="swiper-button-prev swiper-button-white arrows_right" slot="button-next"></div>
            </div>
            <div class="comparison" v-if="simulatedDATA">
              <div class="radio" :class="{'radioRed':redFlag}" @click.stop="Checkbox($event)">
                <div id="detail-btn" class="detail-btn" :class="{'detail-selected':deFlag}"></div>对比
              </div>
              <div
                class="collet"
                @click.stop="colletClick($event)"
                v-if="simulatedDATA.collect == 0"
              >收藏</div>
              <div class="collet detail-collect" @click.stop="colletClick($event)" v-else>已收藏</div>
              <no-ssr>
                <share :config="config" v-if="config" />
              </no-ssr>
              <div class="report" @click="reportClick">举报</div>
              <div class="comparisons" v-if="closeL">
                <div class="message" v-if="messageFlage">
                  <span>至少有两件服务才能对比哦！</span>
                </div>
                <div class="message" v-if="messageMore">
                  <span>对比栏已经装不下啦，请删除后在添加</span>
                </div>
                <div class="comparison_top">
                  <span>对比栏</span>
                  <div @click="closeList">
                    <span class="iconfont icon-guanbi"></span>
                  </div>
                </div>
                <div class="comparison_cont">
                  <div class="comparison_cont_left">
                    <ul class="comparisNone">
                      <li v-for="item  in 4" :key="item.index">
                        <div>{{item}}</div>
                        <div>
                          <span>您还可以继续添加</span>
                        </div>
                      </li>
                    </ul>
                    <ul class="comparisonList">
                      <li v-for="(itemC , index) in comparisonList" :key="index">
                        <div>
                          <img v-lazy="itemC.img" alt />
                        </div>
                        <div>
                          <span>{{itemC.name}}</span>
                          <div>
                            <span>￥{{itemC.price}}/</span>
                            <span>{{itemC.unit_name}}</span>
                            <p @click="deletItemC(itemC)">删除</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="comparison_cont_right">
                    <span @click="comparisonId()">对比</span>
                    <span @click="deletList">清空</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ServGetDetShop_right" v-if="showPage||simulatedDATA">
            <h4>{{simulatedDATA.name}}</h4>
            <div class="ServGetDetShop_right_top">
              <div>
                <div>
                  <p>售价</p>
                  <i>
                    <span>¥{{stockPrice}}</span>
                  </i>
                  <span>/{{simulatedDATA.unit_name}}</span>
                </div>
                <div>
                  <i>市场价</i>
                  <p>
                    <span>¥{{marketPrice}}</span>
                  </p>
                </div>
              </div>
              <div @click="evaluateClick" class="evaluate_box">
                <div>
                  <p>累计评价</p>
                  <p v-if="simulatedDATA.commentsNum>999">999+</p>
                  <p class="tc" v-else>{{simulatedDATA.commentsNum}}</p>
                </div>
              </div>
            </div>
            <div class="wrap wrap-sku">
              <div class="product-box">
                <div class="product-content">
                  <div class="product-delcom">
                    <ul class="product-footerlist clearfix">
                      <li class="allName" v-for="(oItem,index1) in tree" :key="index1">
                        <p class="attrName">{{oItem.k}}</p>
                        <div class="attrNameList">
                          <i
                            v-for="(item,index2) in oItem.v"
                            :key="index2"
                            @click="skuClick(index1,index2,{key:oItem.k_s,valueId:item.id,disabled:item.disabled})"
                            :class="{'Name_active':item.select == true||sale_attr.length==1,'disable_sel':item.disabled}"
                          >{{item.name}}</i>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="number">
                    <p>数量</p>
                    <input type="text" value="1" size="1" v-model="count" @blur="countBlur" />
                    <div>
                      <div class="btn_add" @click="btnAdd">
                        <span class="iconfont icon-xiangshang"></span>
                      </div>
                      <div :class="`btn_minute ${count==1?'disableds':''}`" @click="btnMinute">
                        <span class="iconfont icon-xiangxia"></span>
                      </div>
                    </div>
                    <span class="jsn">
                      库存
                      <span>{{stockNum || '库存不足'}}</span>件
                    </span>
                  </div>
                </div>
                <div class="product-footer">
                  <div>
                    <span class="shopCarP" @click="shopCarClick">加入购物车</span>
                    <el-button type="text" @click="buySbmit" class="buyShop">立即购买</el-button>
                  </div>
                  <div class="textM">
                    服务商已经缴纳保证金
                    <i>{{numS}}</i> 元，承诺交易出问题，保证金赔付
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <cooperationCase :cassData="cassData" v-if="cassData.length > 0" />
      <ServGetDetShopData
        :dataLIST="dataLIST"
        :evaluate="evaluate"
        :spec_json="spec_json"
        v-if="dataLIST.length"
      />
    </div>

    <div class="buyShopData" v-if="flagBuy">
      <div class="buyShopDataCENT">
        <span @click="deleClick" class="iconfont icon-guanbi"></span>
        <div class="centerLeft">
          <h3>购买服务</h3>
          <div class="div_item">
            服务名称
            <p class="name" :title="simulatedDATA.name">
              &nbsp;&nbsp;
              <span>{{simulatedDATA.name}}</span> X
              <span>{{count}}</span>
            </p>
          </div>
          <div class="div_item">
            服务价格
            <p class="payMoney">
              &nbsp;&nbsp;¥
              <span>{{stockPrice*count}}</span>
            </p>
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
              <template>
                <span>上传附件</span>
              </template>
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
                :on-exceed="handleExceed"
              >
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
            <div>
              <img src="../../assets/img/icon/lfb.png" alt="凌付宝" />
              <span>便捷. 放心的需求发布</span>
            </div>
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
    <preview-img
      v-if="previewFlag"
      :select="selectIndex"
      :list="sendData"
      :video="simulatedDATA&&simulatedDATA.video"
      :initList="sendData"
      @close="emitClose"
    ></preview-img>
  </div>
</template>
<script>
import ServGetTop from "./ServGetTop";
import ServGetDetShopData from "./ServGetDetShopData";
import cooperationCase from "./cooperationCase";
import LHead from "@/components/shop/header";
import PreviewImg from "@/components/shop/previewImg";
import {
  addCart,
  commonCollect,
  commonTipOffs,
  creatOrders,
  serviceDetails,
  serviceStoreInfo,
  homeimage
} from "@/api/list";
import { removeFile } from "@/api/common";
import { storeInfoInit, serDataAsync } from "~/api/async-server";
import { getCookie } from "../../utils";
import { mapState } from "vuex";
import { cartTools } from "@/utils/tool";
// import Swiper from "swiper";
import dataEventTrack from "@/utils/dataEventTrack";
import share from "@/components/component/share";
const UNSELECTED_SKU_VALUE_ID = "";

export default {
  computed: {
    ...mapState({ envVars: "envVariables", userInfoData: "userInfo" })
  },
  layout: "hasSideBar",
  components: {
    LHead,
    ServGetTop,
    ServGetDetShopData,
    cooperationCase,
    PreviewImg,
    share
  },
  head() {
    return {
      title: `${this.simulatedDATA.name || ""} - ${this.simulatedDATA
        .store_name || ""} - 凌天众媒网`,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.simulatedDATA.name || ""} - ${this.simulatedDATA
            .store_name || ""} - 凌天众媒网`
        },
        {
          hid: "description",
          name: "description",
          content: `${this.simulatedDATA.store_name ||
            ""}在凌天众媒网发布的一条${this.simulatedDATA.name || ""},${
            this.shopDataListA.description
          }`
        }
      ]
    };
  },
  provide() {
    return {
      dataLIST: this.dataLIST,
      stockPrice: this.stockPrice,
      marketPrice: this.marketPrice,
      sendData: this.sendData,
      numS: this.numS,
      money: this.money,
      shopDataListA: this.shopDataListA,
      imgData: this.imgData,
      showPage: this.showPage,
      cassData: this.cassData,
      stockNum: this.stockNum,
      simulatedDATA: this.simulatedDATA
    };
  },
  async fetch(app) {
    const { id } = app.query;
    if (!id) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  data() {
    return {
      swiperOptionTop: {
        // spaceBetween: 10,
        // loop: true,
        spaceBetween: 0,
        loopedSlides: 7,
        speed: 1000,
        allowTouchMove: true,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "7",
        touchRatio: 0.2,
        slideToClickedSlide: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      dataLIST: [],
      shop: {},
      messageFlage: false,
      comparisonList: [], //对比
      comparData: [], //点击获取当前页面信息
      messageMore: false,
      closeL: false,
      money: 0,
      simulatedDATA: "",
      sendData: [],
      shopDataListA: [],
      sale_attr: [],
      choiceFlagArr: [],
      saleKeyArr: [], //存放被选中的值
      count: 1,
      // 购买弹窗
      form: {
        desc: "",
        fileList3: []
      },
      // 校验
      rules: {
        desc: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      spec_json: [],
      tree: [],
      list: [],
      selectedSku: {},
      normalTree: [],
      y_index: -1,
      flagBuy: false,
      previewFlag: false, //false
      selectIndex: -1, //选择放大的图片
      userId: "",
      upload_imgs: [],
      // 上传文件
      cassData: [],
      numS: 0,
      evaluate: "0",
      stockNum: "",
      redFlag: false,
      showPage: false,
      deFlag: false,
      imgNum: 0,
      disabledId: "",
      clickIndex: [],
      stockPrice: "",
      marketPrice: "",
      isSelectFlag: false,
      imgData: "",
      config: {},
      key: [],
      val: [],
      ad_img: ""
    };
  },
  async asyncData(app) {
    // 获取商品id
    let sid = app.params.id;
    var simulatedDATA = "";
    try {
      const data = await serDataAsync(app,sid,app.query.sign);
      simulatedDATA = data.data.data;
      if (simulatedDATA.img) {
        simulatedDATA.images.unshift({ url: simulatedDATA.img });
      }
      if (simulatedDATA.video) {
        simulatedDATA.images.unshift({
          url: simulatedDATA.video,
          type: "video"
        });
      }

      var imgData = simulatedDATA.img;
      var sendData = simulatedDATA.images;
      var numS = Math.round(simulatedDATA.marginsum);
      var money = simulatedDATA.price;
      var id = simulatedDATA.store_id;
      let InfoRes = await storeInfoInit(app, id);
      if (!InfoRes) return;
      var shopDataListA = InfoRes;
      var dataLIST = [{ ...simulatedDATA }, { ...shopDataListA }];
      var showPage = true;
      return {
        simulatedDATA: simulatedDATA,
        stockPrice: simulatedDATA.price,
        marketPrice: simulatedDATA.market_price,
        sendData: sendData,
        numS: numS,
        money: simulatedDATA.price,
        shopDataListA: InfoRes,
        dataLIST: [{ ...simulatedDATA }, { ...shopDataListA }],
        imgData: imgData,
        showPage: true,
        cassData: [{ ...simulatedDATA }],
        stockNum: simulatedDATA.stock || ""
      };
    } catch (error) {
      //   console.log('获取服务信息失败', error);
    }
  },
  created() {
    if (!this.simulatedDATA) {
      this.$router.push({
        path: "/closeData/closeData",
        query: { type: 1 }
      });
    }
  },
  mounted() {
    dataEventTrack({
      referer: document.referrer,
      event_type: "page_show",
      kv: {
        router: this.$route.fullPath,
        service_id: this.simulatedDATA.id
      }
    });
    var type = "27";
    homeimage(type)
      .then(res => {
        if (res.data.code == 200) {
          var img = "";
          if (this.imgData != "" || this.imgData != null) {
            img = this.envVars.IMG_HOST + this.imgData;
          } else {
            img = this.envVars.IMG_HOST + res.data.data.ad_img;
          }
          this.config = {
            url: location.href,
            title: `${this.simulatedDATA.name}`,
            description: `我在凌天众媒网发现了一个不错的广告位，赶快来看看`,
            image: img,
            summary: `我在凌天众媒网发现了一个不错的广告位，赶快来看看`
          };
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.init();
    this.headers = { Authorization: "Bearer " + getCookie("access_token") };
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper;
      const swiperThumbs = this.$refs.swiperThumbs.swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  methods: {
    skuList() {
      if (!this.simulatedDATA.sale_attr) return [];
      const { sale_attr } = this.simulatedDATA;
      let id = 1000;
      this.stockNum = this.simulatedDATA.stock;
      return sale_attr.map(attr => {
        const { stock, price, list, m_price } = attr;
        let obj = {
          id: id++,
          // price: price * 100,
          price: price,
          market_price: m_price,
          stock_num: stock,
          ending: list.map(pop => ({ key: pop.key, value: pop.value }))
        };
        // eslint-disable-next-line no-labels
        let subItem = [],
          vj = [],
          vk = [];
        for (let i = 0; i < this.tree.length; i++) {
          subItem = this.tree[i];
          for (let j = 0; j < subItem.v.length; j++) {
            vj = subItem.v[j];
            for (let k = 0; k < list.length; k++) {
              vk = list[k];
              if (subItem.k === vk.attr_name && vj.name === vk.value) {
                obj[subItem.k_s] = vj.id;
                continue;
              }
            }
          }
        }
        return obj;
      });
    },
    skuTree() {
      if (!this.simulatedDATA.sale_attr) return [];
      const { sale_attr } = this.simulatedDATA;
      let obj = {},
        id = 1,
        tree = [],
        index = 1;
      sale_attr.map(item => {
        item.list &&
          item.list.map((attr, idx) => {
            const { attr_name, value, key } = attr;
            if (obj[attr_name]) {
              obj[attr_name].add(value);
            } else {
              obj[attr_name] = new Set([value]);
            }
          });
      });
      for (let [k, value] of Object.entries(obj)) {
        const v = Array.from(value).map(item => ({
          id: `${id++}`,
          name: item,
          select: false,
          disabled: false
        }));
        tree.push({ k, v, k_s: `s${index}` });
        index++;
      }
      return tree;
    },
    // 根据已选择的 sku 获取 skuComb
    getSkuComb(skuList, selectedSku) {
      const skuComb = skuList.filter(item =>
        Object.keys(selectedSku).every(
          skuKeyStr =>
            String(item[skuKeyStr]) === String(selectedSku[skuKeyStr])
        )
      );
      return skuComb[0];
    },
    // 判断是否所有的sku都已经选中 todo click/init run
    isAllSelected(skuTree, selectedSku) {
      // 筛选selectedSku对象中key值不为空的值
      const selected = Object.keys(selectedSku).filter(
        skuKeyStr => selectedSku[skuKeyStr] !== UNSELECTED_SKU_VALUE_ID
      );
      return skuTree.length === selected.length;
    },
    //todo init run
    normalizeSkuTree(skuTree) {
      const normalizedTree = {};
      skuTree.forEach(treeItem => {
        normalizedTree[treeItem.k_s] = treeItem.v;
        this.selectedSku[treeItem.k_s] = "";
        this.clickIndex.push("");
      });
      return normalizedTree;
    },
    // 判断sku是否可选 打开sku
    isSkuChoosable(skuList, selectedSku, skuToChoose) {
      const { key, valueId } = skuToChoose;

      // 先假设sku已选中，拼入已选中sku对象中  skuList = tree ,selectedSku = {s1: "", s2: "1193"}
      const matchedSku = {
        ...selectedSku,
        [key]: valueId
      };
      // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中skusToCheck = ["s1", "s2"]
      const skusToCheck = Object.keys(matchedSku).filter(
        skuKey => matchedSku[skuKey] !== UNSELECTED_SKU_VALUE_ID
      );
      //filteredSku 过滤后的列表
      const filteredSku = skuList.filter(sku =>
        skusToCheck.every(
          skuKey => String(matchedSku[skuKey]) === String(sku[skuKey])
        )
      );
      return filteredSku.length === 0;
    },
    skuClick(index1, index2, item) {
      if (item.disabled) {
        //禁用的不能点击
        return;
      }
      this.key = [];
      this.clickIndex[index1] =
        this.clickIndex[index1] === index2 ? "" : index2;

      let treeList = JSON.parse(JSON.stringify(this.tree));
      let treeV = [];
      for (let i = 0; i < treeList.length; i++) {
        treeV = treeList[i].v;
        for (let j = 0; j < treeV.length; j++) {
          if (treeV[j].select) {
            treeList[i].v[j].select = false;
          }
          if (treeV[j].disabled) {
            treeList[i].v[j].disabled = false;
          }
        }
      }
      this.tree = treeList;
      for (let i = 0; i < this.clickIndex.length; i++) {
        //设置select
        if (this.clickIndex[i] !== "") {
          this.tree[i].v[this.clickIndex[i]].select = true;
          this.selectedSku[item.key] = item.valueId;
        } else {
          this.selectedSku["s" + (i + 1)] = "";
          this.spec_json = []
        }
      }
      let valueId = "",
        subItem = [];
      for (let key in this.normalTree) {
        subItem = this.normalTree[key];
        for (let j = 0; j < subItem.length; j++) {
          let params = { key: key, valueId: subItem[j].id };
          this.disabledId = subItem[j].id;
          // matchedSku {s1: "30349", s2: "", s3: ""}
          let flag = this.isSkuChoosable(this.list, this.selectedSku, params);
          if (flag) {
            //设置disabled
            let index = key.split("s")[1];
            this.tree[index - 1].v[j].disabled = true;
          }
        }
      }
      let flag = this.isAllSelected(this.tree, this.selectedSku);
      if (flag) {
        let skuComb = this.getSkuComb(this.list, this.selectedSku);
        this.stockNum = skuComb.stock_num;
        this.stockPrice = skuComb.price;
        this.marketPrice = skuComb.market_price;
        this.spec_json = skuComb.ending;
        this.specSty();
      }
      this.isSelectFlag = flag;
    },
    specSty() {
      console.log("this.spec_json", this.spec_json);
      if (this.spec_json.length > 0) {
        this.spec_json.filter(item => {
          this.key.push(item.key + ":" + item.value);
        });
        console.log("key", this.key);
        this.key = JSON.stringify(this.key)
          .replace(/\[|]/g, "")
          .replace(/\"|"/g, "");
      }
    },
    // 请求页面数据
    async init() {
      // 对比数据~~~~~~~~
      let comparison = localStorage.getItem("comparisonList");
      if (comparison) {
        this.comparisonList = JSON.parse(comparison) || [];
        // this.closeL = true;
        for (var i = 0; i < this.comparisonList.length; i++) {
          if (this.comparisonList[i].id == this.simulatedDATA.id) {
            this.deFlag = true;
            this.redFlag = true;
          }
        }
      } else {
        this.comparisonList = [];
      }
      // 对比数据~~~~~~~~
      this.tree = this.skuTree();
      this.list = this.skuList();
      this.normalTree = this.normalizeSkuTree(this.tree);
    },
    // 只有一列时默认选中
    defaultHand() {
      let checkArr = [];
      let listData = this.sale_attr[0].list;
      this.simulatedDATA.price = this.sale_attr[0].price;
      listData.map((item, i) => {
        checkArr.push({ key: item.key, value: item.value });
      });
      this.stockNum = this.sale_attr[0].stock;
      return checkArr;
    },
    emitClose() {
      this.previewFlag = false;
    },
    previewPicture(index, type = "") {
      this.previewFlag = true;
      this.selectIndex = index;
    },
    /*
     * 购买数量按钮-
     */
    countBlur() {
      if (this.count < 1) {
        this.count = 1;
      } else {
        if (this.stockNum != "") {
          if (this.count > this.stockNum) {
            this.count = this.stockNum;
          } else if (this.count > 100) {
            this.count = 100;
          }
        } else {
          if (this.count > this.simulatedDATA.stock) {
            this.count = this.simulatedDATA.stock;
          }
        }
      }
    },
    btnAdd(count) {
      if (this.stockNum != "") {
        if (this.count >= this.stockNum) {
          this.count = this.stockNum;
        } else {
          this.count++;
        }
      } else {
        if (this.count >= this.simulatedDATA.stock) {
          this.count = this.simulatedDATA.stock;
        } else {
          this.count++;
        }
      }
    },

    btnMinute(count) {
      if (this.count <= 1) {
        this.count = 1;
      } else {
        this.count -= 1;
      }
    },
    //图片格式
    beforeAvatarUpload(file) {
      this.headers = { Authorization: "Bearer " + getCookie("access_token") };
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
        return false;
      }
      return isJPG || isBMP || isGIF || isPNG;
    },
    handleExceed(files, fileList) {
      this.$message.error("最多只能上传5个文件");
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
    async avant_upload_succ(response, file, fileList) {
      let { code, message, data } = response;
      var index = 0;
      this.imgNum++;
      this.upload_imgs.push({
        url: data.file,
        name: `附件` + this.imgNum
      });
    },

    // 提交订单
    onSubmit(formName) {
      let _this = this;
      this.$refs.upload.submit();
      this.$refs[formName].validate(valid => {
        if (valid) {
          var demand_files = [];
          for (var i = 0; i < this.upload_imgs.length; i++) {
            demand_files.push(this.upload_imgs[i].url);
          }
          var data = {
            sid: this.$route.params.id,
            spec_json: _this.spec_json, //规格
            amount: this.stockPrice, //价格
            number: this.count, //数量
            service_demand: this.form.desc, //需求内容
            demand_files: demand_files //上传附件
          };
          creatOrders(data)
            .then(res => {
              if (res.data.code == 200 && res.data.data.id > 0) {
                var order_sn = res.data.data.order_sn;
                var amountP = this.stockPrice * this.count;
                if (this.spec_json.length > 0) {
                  var spec = this.key;
                } else {
                  var spec = "";
                }
                if (demand_files.length > 0) {
                  demand_files = JSON.stringify(demand_files)
                    .replace(/\[|]/g, "")
                    .replace(/\"|"/g, "");
                } else {
                  demand_files = "";
                }
                dataEventTrack({
                  referer: document.referrer,
                  event_type: "click",
                  kv: {
                    router: this.$route.fullPath,
                    rname: "提交订单",
                    service_id: this.$route.params.id,
                    service_spec: spec,
                    service_num: this.count,
                    service_price: this.stockPrice,
                    service_total_price: amountP,
                    service_demand: this.form.desc,
                    attach_id: demand_files
                  }
                });
                this.$router.push("/payment?order_sn=" + order_sn + "&type=5");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 第一个加入购物车
    shopCarClick() {
      let _this = this;
      if (this.spec_json.length > 0 && this.stockNum == 0) {
        this.$message.error("此服务库存不足,不能加入购物车");
      } else if (this.spec_json.length == 0 && this.simulatedDATA.stock == 0) {
        this.$message.error("此服务库存不足,不能加入购物车");
      } else {
        if (this.sale_attr.length == 1) {
          this.spec_json = this.defaultHand();
        }
        var data = {
          type: "1",
          goods_id: this.$route.params.id,
          price: this.stockPrice,
          num: this.count,
          spec_json: this.spec_json
        };
        if (this.userInfoData) {
          this.userId = this.userInfoData.original.id;
          if (this.userId != this.simulatedDATA.user_id) {
            addCart(data)
              .then(res => {
                if (res.data.code == 200) {
                  this.$message.success("成功加入购物车");
                  if (this.spec_json.length > 0) {
                    var spec = this.key;
                  } else {
                    var spec = "";
                  }
                  dataEventTrack({
                    referer: document.referrer,
                    event_type: "click",
                    kv: {
                      router: this.$route.fullPath,
                      rname: "加入购物车",
                      service_id: this.$route.params.id,
                      service_spec: spec,
                      service_num: this.count,
                      service_price: this.stockPrice
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
            this.$message.error("您不能购买自己的服务");
          }
        } else if (!this.token)
          return this.$loginp(0, () => {
            this.isFreely = 1;
          });
      }
    },
    //点击对比
    Checkbox(e) {
      this.comparData = this.simulatedDATA;
      this.closeL = true;
      this.messageMore = false;
      this.messageFlage = false;
      let detailDom = document.getElementById("detail-btn");

      if (JSON.parse(localStorage.getItem("comparisonList"))) {
        this.comparisonList = JSON.parse(
          localStorage.getItem("comparisonList")
        );
      } else {
        this.comparisonList = [];
      }
      if (detailDom.className.indexOf("detail-selected") == -1) {
        if (this.comparisonList.length < 4) {
          detailDom.className = `detail-btn detail-selected`; //切换按钮样式
          this.redFlag = true;
          var index = this.comparisonList.findIndex(
            item => item.id === this.comparData.id
          );
          ~index
            ? (this.comparisonList[index].id = this.comparData.id)
            : this.comparisonList.push(this.comparData);
        } else {
          this.messageMore = true;
        }
      } else {
        this.redFlag = false;
        this.closeL = true;
        detailDom.className = "detail-btn";
        for (var i = 0; i < this.comparisonList.length; i++) {
          if (this.comparisonList[i].id == this.comparData.id) {
            this.comparisonList.splice(i, 1);
          }
        }
        if (this.comparisonList.length < 1) {
          this.closeL = false;
        }
      }
      window.localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );
    },
    //保存对比id
    comparisonId() {
      this.messageFlage = false;
      var id = [];

      for (var i = 0; i < this.comparisonList.length; i++) {
        id.push(this.comparisonList[i].id);
      }
      if (this.comparisonList.length < 2) {
        this.messageFlage = true;
      } else {
        var dataId = id;
        window.localStorage.setItem("dataId", JSON.stringify(dataId));
        this.$router.push({
          path: "/category/comparison"
        });
      }
    },
    //清空对比
    deletList() {
      var a = document.querySelectorAll(".detail-btn");
      for (var i = 0; i < a.length; i++) {
        if ((a[i].className = "detail-btn detail-selected")) {
          a[i].className = "detail-btn";
          this.redFlag = false;
        }
      }
      this.comparisonList = [];
      window.localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );
      this.closeL = false;
    },

    // 删除单个对比
    deletItemC(itemC) {
      let detail = document.getElementById("detail-btn");
      for (var i = 0; i < this.comparisonList.length; i++) {
        if (this.comparisonList[i].id == itemC.id) {
          if (this.comparisonList[i].id == this.comparData.id) {
            detail.className = "detail-btn";
            this.redFlag = false;
            this.messageMore = false;
            this.messageFlage = false;
            this.comparisonList.splice(i, 1);
          } else {
            this.comparisonList.splice(i, 1);
          }
        }
      }
      if (this.comparisonList.length < 1) {
        detail.className = "detail-btn";
        this.redFlag = false;
        this.closeL = false;
      }
      window.localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );
    },
    colletClick(e) {
      if (this.userInfoData) {
        this.userId = this.userInfoData.original.id;
        if (this.userId != this.simulatedDATA.user_id) {
          if (e.target.className.indexOf("detail-collect") == -1) {
            e.target.className = "collet detail-collect";
            var data = {
              type: "1",
              collect_id: this.simulatedDATA.id,
              cancel: "0"
            };
            commonCollect(data)
              .then(res => {
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                } else {
                  e.target.innerHTML = "已收藏";
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            e.target.className = "collet";
            var data = {
              type: "1",
              collect_id: this.simulatedDATA.id,
              cancel: "1"
            };
            commonCollect(data)
              .then(res => {
                if (res.data.code != 200) {
                  this.$message.error(res.data.message);
                } else {
                  e.target.innerHTML = "收藏";
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$message.error("您不能收藏自己的服务");
        }
      } else {
        return this.$loginp(0, () => {
          this.colletClick(e);
        });
      }
    },
    // 立即购买
    buySbmit() {
      if (this.tree.length > 0 && !this.isSelectFlag) {
        this.$message.error("请选择全部的规格属性");
        return;
      }
      if (this.spec_json.length > 0 && this.stockNum == 0) {
        this.$message.error("此服务库存不足,不能购买");
      } else if (this.spec_json.length == 0 && this.simulatedDATA.stock == 0) {
        this.$message.error("此服务库存不足,不能购买");
      } else {
        let _this = this;
        if (this.userInfoData) {
          this.userId = this.userInfoData.original.id;
          if (this.userId != this.simulatedDATA.user_id) {
            if (this.sale_attr != undefined && this.sale_attr.length > 0) {
              if (this.sale_attr.length == 1) {
                this.spec_json = this.defaultHand();
              }
              if (this.spec_json.length > 0 && this.count > 0) {
                this.flagBuy = true;
                if (this.spec_json.length > 0) {
                  var spec = this.key;
                } else {
                  var spec = "";
                }
                dataEventTrack({
                  referer: document.referrer,
                  event_type: "click",
                  kv: {
                    router: this.$route.fullPath,
                    rname: "立即购买",
                    service_id: this.$route.params.id,
                    service_spec: spec,
                    service_num: this.count,
                    service_price: this.stockPrice
                  }
                });
              } else {
                this.$message.error("请选择规格属性");
              }
            } else {
              this.flagBuy = true;
              if (this.spec_json.length > 0) {
                var spec = this.key;
              } else {
                var spec = "";
              }
              dataEventTrack({
                referer: document.referrer,
                event_type: "click",
                kv: {
                  router: this.$route.fullPath,
                  rname: "立即购买",
                  service_id: this.$route.params.id,
                  service_spec: spec,
                  service_num: this.count,
                  service_price: this.stockPrice
                }
              });
            }
          } else {
            this.$message.error("您不能购买自己的服务");
          }
        } else if (!this.token)
          return this.$loginp(0, () => {
            this.isFreely = 1;
          });
        this.isFreely = 1;
      }
    },

    //关闭购买服务
    deleClick() {
      this.flagBuy = false;
      var amountP = this.stockPrice * this.count;
      var demand_files = [];
      for (var i = 0; i < this.upload_imgs.length; i++) {
        demand_files.push(this.upload_imgs[i].url);
      }
      if (this.spec_json.length > 0) {
        var spec = this.key;
      } else {
        var spec = "";
      }
      if (demand_files.length > 0) {
        demand_files = JSON.stringify(demand_files)
          .replace(/\[|]/g, "")
          .replace(/\"|"/g, "");
      } else {
        demand_files = "";
      }
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: this.$route.fullPath,
          rname: "关闭弹窗",
          service_id: this.$route.params.id,
          service_spec: spec,
          service_num: this.count,
          service_price: this.stockPrice,
          service_total_price: amountP,
          service_demand: this.form.desc,
          attach_id: demand_files
        }
      });
    },
    closeList() {
      let detailA = document.getElementById("detail-btn");
      detailA.className = "detail-btn";
      this.closeL = false;
      this.redFlag = false;
    },
    // 举报
    reportClick() {
      var data = {
        project_type: "4",
        project_id: this.simulatedDATA.id
      };
      commonTipOffs(data)
        .then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem("historyUrl", this.$route.fullPath);
            var { href } = this.$router.resolve({
              path: "/report",
              query: { type: "4", id: this.simulatedDATA.id }
            });
            window.open(href, "_blank");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    evaluateClick() {
      this.evaluate = "1";
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 925;
        if (top > 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  }
};
</script>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>
<style lang="less" scoped>
@import "../../assets/css/ServGetDetailsPage/ServDetailsComm.less";
</style>
<style lang="less">
@import "../../assets/css/ServGetDetailsPage/ServGetDetailsPage.less";
</style>
<style lang="scss">
.serv_detail_main {
  .swiper-slide {
    cursor: pointer;
  }

  .gallery-top {
    width: 678px;
    height: 408px;

    .swiper-slide {
      .video,
      img {
        width: 100%;
        height: 100%;
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      opacity: 0;
      background: rgba($color: #000000, $alpha: 0.5);
      color: #e7dfdf;

      transition: all 0.4s;

      &:after {
        padding: 5px;
        font-size: 28px;
      }
    }

    .swiper-button-prev.swiper-button-disabled,
    .swiper-button-next.swiper-button-disabled {
    }

    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
      }

      .swiper-button-prev.swiper-button-disabled,
      .swiper-button-next.swiper-button-disabled {
        z-index: 99 !important;
        opacity: 0.3 !important;
        cursor: none;
      }
    }
  }

  .gallery-thumbs {
    height: 70px;
    box-sizing: border-box;
    position: relative;
    padding-top: 18px;
    width: 646px; //678px;
    .swiper-wrapper {
      box-sizing: border-box;
      margin-left: -271px;
    }

    .swiper-slide {
      width: 88px !important;
      height: 52px;

      video,
      img {
        width: 100% !important;
        height: 100%;
        background-color: #000;
      }
    }

    .swiper-slide-thumb-active {
      border: 2px solid #f3262d;
    }
  }

  .add_white_button {
    position: relative;

    .swiper-button-next {
      right: 5px;
      left: unset;
    }

    .swiper-button-prev {
      left: 5px;
    }

    .swiper-button-white {
      width: 16px;
      height: 52px;
      position: absolute;
      background: #f9f9f9;
      color: #b5b5b5;
      border: 1px solid #f1f1f1;
      font-size: 16px;
      font-weight: bolder;
      bottom: 0;
      top: -30px;
      cursor: pointer;
      opacity: unset;

      &:hover {
        background: #cccccc;
        color: #ffffff;
      }

      &:focus {
        outline: none;
      }
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 10px;
    }

    .swiper-button-disabled {
      background: #ffffff;
      color: #c3c3c3;

      &:hover {
        cursor: unset;

        .swiper-button-prev:after,
        .swiper-button-next:after {
          cursor: none;
        }
      }
    }
  }
}
</style>
