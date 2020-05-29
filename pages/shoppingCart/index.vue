<template>
  <div class="shopping-cart-page">
    <template v-if="cartData.length <= 0">
      <emptyData text="购物车空空的，去挑选您需要的服务吧" class="emp-data"></emptyData>
      <router-link to="/" tag="div" class="index-btn">去首页</router-link>
    </template>
    <template v-else>
      <div class="shopping-cart" ref="cart" v-loading="cartLoading">
        <!-- 头部 -->
        <ul class="cart-header bggray">
          <li class="items-title">
            <div class="check-box iconfont" @click="changeAllCheck" :class="{checked: allChecked}"></div>
            <p>全选</p>
          </li>
          <li class="items-title" style="margin-left:186px;">名称</li>
          <li class="items-title" style="margin-left:196px;">规格</li>
          <li class="items-title" style="margin-left:181px;">单价</li>
          <li class="items-title" style="margin-left:119px;">数量</li>
          <li class="items-title" style="margin-left:121px;">小计</li>
          <li class="items-title" style="margin-left:99px;">操作</li>
        </ul>
        <!-- 头部 -->

        <!-- 同店铺 -->
        <div class="cart-store" v-for="store in cartSplitData" :key="store.store_id">
          <!-- 店铺名 -->
          <div class="store-name">
            <div
              class="check-box iconfont"
              v-if="store.goodsList.filter(good => good.changed === 1).length < store.goodsList.length"
              :class="{checked:store.goodsList.every(good => good.changed === 1 || good.checked)}"
              @click="storeCheck(store)"
            ></div>
            <div class="replace-check" v-else></div>
            <p>{{store.store_name}}</p>
            <span
              :class="['iconfont','icon-lianxiwo',{'active':!!store.customerServices}]"
              @click="openQQ(store.customerServices ? store.customerServices.kf_account : undefined)"
            ></span>
          </div>
          <!-- 店铺名 -->
          <!-- 商品所属 -->
          <template v-if="store.serList.length !== 0">
            <div class="cart-cla bggray">服务</div>
            <ul class="shop-list">
              <li
                class="shop-items"
                v-for="goods in store.serList"
                :key="goods.id"
                :class="{'is-sel':goods.checked,dis:goods.changed === 1}"
                v-loading="goods.rowLoading"
              >
                <div
                  class="check-box iconfont"
                  v-if="goods.changed !== 1"
                  :class="{checked:goods.checked}"
                  @click="selGood(goods,store.store_name)"
                ></div>
                <div class="replace-check" v-else></div>
                <a :href="goods.type==1?`service/${goods.goods_id}?id=${goods.store_id}`:`/case-biog/${goods.goods_id}?id=${goods.store_id}`" target="_blank">
                <img
                  src="~/assets/img/img_bg.png"
                  v-lazy="goods.img+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                  class="shop-img"
                />
                </a>
                <div class="oth-box">
                  <a
                    class="shop-name"
                   :href="goods.type==1?`service/${goods.goods_id}?id=${goods.store_id}`:`/case-biog/${goods.goods_id}?id=${goods.store_id}`" target="_blank"
                  >{{goods.name}}</a>
                  <div class="shop-prop">
                    <!-- <p>投放周期 月</p>
                    <p>投放时间 2019-05-30至2019-06-30</p>-->
                    <p>{{goods.spec}}</p>
                  </div>
                  <p class="shop-price">￥{{goods.price}}</p>
                  <div class="num-box">
                    <i
                      class="el-icon-minus"
                      :class="{dis:goods.changed === 1 || goods.num <= minNum}"
                      @click="numMinus(goods)"
                    ></i>
                    <input
                      type="number"
                      class="num-inp"
                      v-model="goods.num"
                      :disabled="goods.changed === 1"
                      @change="inpChange($event,goods)"
                    />
                    <i
                      class="el-icon-plus"
                      :class="{dis:goods.changed === 1 || goods.num >= goods.stock}"
                      @click="numPlus(goods)"
                    ></i>
                    <div class="stock-tip" v-if="goods.changed === 1">
                      <span>失效</span>
                      <p>服务已下架、删除、库存不足</p>
                    </div>
                  </div>
                  <p class="amount">￥{{goods.num * goods.price}}</p>
                  <p class="del" @click="delGood(goods)">删除</p>
                </div>
              </li>
            </ul>
          </template>
          <template v-if="store.caseList.length !== 0">
            <div class="cart-cla bggray">案例传记</div>
            <ul class="shop-list">
              <li
                class="shop-items"
                v-for="goods in store.caseList"
                :key="goods.id"
                :class="{'is-sel':!!goods.checked,dis:goods.changed === 1}"
                v-loading="goods.rowLoading"
              >
                <div
                  class="check-box iconfont"
                  v-if="goods.changed !== 1"
                  :class="{checked:!!goods.checked}"
                  @click="selGood(goods,store.store_name)"
                ></div>
                <div class="replace-check" v-else></div>
                <a :href="goods.type==1?`service/${goods.goods_id}?id=${goods.store_id}`:`/case-biog/${goods.goods_id}?id=${goods.store_id}`" target="_blank">
                <img
                  src="~/assets/img/img_bg.png"
                  v-lazy="goods.img+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                  class="shop-img"
                />
                </a>
                <div class="oth-box">
                  <a
                    class="shop-name"
                   :href="goods.type==1?`service/${goods.goods_id}?id=${goods.store_id}`:`/case-biog/${goods.goods_id}?id=${goods.store_id}`" target="_blank"
                  >{{goods.name}}</a>
                  <div class="shop-prop">
                    <!-- <p>投放周期 月</p>
                    <p>投放时间 2019-05-30至2019-06-30</p>-->
                    <p>{{goods.spec}}</p>
                  </div>
                  <p class="shop-price">￥{{goods.price}}</p>
                  <div class="num-box nobd">
                    {{goods.num}}
                    <div class="stock-tip" v-if="goods.changed === 1">
                      <span>失效</span>
                      <p class="ns">案例传记已下架、删除</p>
                    </div>
                  </div>
                  <p class="amount">￥{{goods.num * goods.price}}</p>
                  <p class="del" @click="delGood(goods)">删除</p>
                </div>
              </li>
            </ul>
          </template>
          <!-- 商品所属 -->
        </div>
        <!-- 同店铺 -->
        <!-- 底部 -->
        <div :class="cartBtnMode">
          <div class="cart-bottom">
            <div class="cart-bottom-left">
              <div
                class="check-box iconfont"
                @click="changeAllCheck"
                :class="{checked: allChecked}"
              ></div>
              <p class="check-label">全选</p>
              <p @click="delCheck">删除选中</p>
              <p @click="delAll">清空购物车</p>
              <p @click="delNegate">删除已失效</p>
            </div>
            <div class="cart-bottom-right">
              <p>
                <span>已选择{{allSelNum}}件</span>
                <span>应付总额:&nbsp;</span>
                <span class="sub-amount">￥{{allSelAmount}}</span>
              </p>
              <div class="submit" :class="{dis:unSupport && showSup}" @click="goPay(0)">
                {{(unSupport &&
                showSup) ? '不支持合并结算' : '去结算'}}
              </div>
            </div>

            <!-- 不合并结算 -->
            <div class="no-merge-box" v-show="unSupport && showSup">
              <p class="merge-title">请分开结算以下项目</p>
              <i class="el-icon-close close" @click="showSup = false"></i>
              <div class="merge-ser-box">
                <i class="el-icon-arrow-left prevser swbtn1"></i>
                <!-- swiper -->
                <div class="swiper-container gallery-thumbs ser-swbox" v-swiper:swiper1="swiperOption">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in serData" :key="item.id">
                      <img src="~/assets/img/img_bg.png" v-lazy="item.img" class="ser-img" />
                    </div>
                  </div>
                </div>
                <i class="el-icon-arrow-right nextser swbtn2"></i>
                <div class="merge-info">
                  <p>服务（{{serData.length}}件）</p>
                  <p>
                    合计
                    <span>￥{{allSerAmount}}</span>
                  </p>
                  <div class="info-btn" @click="goPay(1)">去结算</div>
                </div>
              </div>
              <div class="merge-ser-box">
                <i class="el-icon-arrow-left prevser swbtn3"></i>
                <div class="swiper-container gallery-thumbs2 ser-swbox" v-swiper:swiper2="swiperOption2"> 
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in caseData" :key="item.id">
                      <img src="~/assets/img/img_bg.png" v-lazy="item.img" class="ser-img" />
                    </div>
                  </div>
                </div>
                <i class="el-icon-arrow-right nextser swbtn4"></i>
                <div class="merge-info">
                  <p>案例传记（{{caseData.length}}件）</p>
                  <p>
                    合计
                    <span>￥{{allCaseAmount}}</span>
                  </p>
                  <div class="info-btn" @click="goPay(2)">去结算</div>
                </div>
              </div>
            </div>
            <!-- 不合并结算 -->
          </div>
        </div>

        <!-- 底部 -->
      </div>
      <!-- 广告位 -->
      <div class="adv-box" v-if="adv.bottom_recommmend">
        <div class="adv-title">
          <p>广告位精选</p>
          <p>广告</p>
        </div>
        <ul class="adv-list">
          <a
            tag="li"
            :href="`/service/${item.id}?id=${item.store_id}`"
            class="adv-items"
            v-for="item in adv.bottom_recommmend"
            :key="item.id"
          >
            <img
              src="~/assets/img/img_bg.png"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_132,w_220'"
              class="adv-img"
            />
            <p class="adv-name">{{item.name}}</p>
            <div class="adv-info">
              <p>
                成交量:&nbsp;
                <span>{{item.deal_num}}</span>
              </p>
              <p>¥{{parseInt(item.price)}}元/{{item.unit_name}}</p>
            </div>
          </a>
        </ul>
      </div>
      <!-- 广告位 -->
      <!-- 广告位 -->
      <div class="adv-box">
        <div class="adv-title">
          <p>猜你喜欢</p>
          <p>广告</p>
        </div>
        <ul class="adv-list">
          <a
            tag="li"
            :href="`/service/${item.id}?id=${item.store_id}`"
            class="adv-items"
            v-for="item in adv.bottom_guess_like"
            :key="item.id"
          >
            <img
              src="~/assets/img/img_bg.png"
              v-lazy="item.img+'?x-oss-process=image/resize,m_fill,h_132,w_220'"
              class="adv-img"
            />
            <p class="adv-name">{{item.name}}</p>
            <div class="adv-info">
              <p>
                成交量:&nbsp;
                <span>{{item.deal_num}}</span>
              </p>
              <p>¥{{parseInt(item.price)}}元/{{item.unit_name}}</p>
            </div>
          </a>
        </ul>
      </div>
      <!-- 广告位 -->
    </template>
  </div>
</template>

<script>
Object.defineProperty(Array.prototype, "flat", {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  }
});
import { EventUtil } from "@/utils/tool";
import emptyData from "@/components/shop/emptyData";
import { getSpCartList, getSpCartAdv } from "@/api/async-server";
import { changeGoodsNum, selCartGoods } from "@/api/shop-cart";
import { shopCartMixin } from "@/utils/common-mixins";
import { mapState } from "vuex";
// import Swiper from "swiper";
import dataEventTrack from "@/utils/dataEventTrack";

const cartListFormat = data => {
  data.forEach(store => {
    let tmps = [];
    let tmpc = [];
    store.goodsList.forEach(goods => {
      switch (goods.type) {
        case 1:
          tmps.push(goods);
          break;
        default:
          tmpc.push(goods);
      }
    });
    store.serList = tmps;
    store.caseList = tmpc;
  });
  return data;
};
export default {
  name: "ShoppingCart",
  layout: "shop-flow-layout",
  components: { emptyData },
  props: {},
  mixins: [shopCartMixin()],
  data() {
    return {
      shopNum: 1,
      scrollTop: 0,
      elHeight: 0,
      winHeight: 0,
      setlement: false, // 结算
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 12,
        navigation: {
          prevEl: `.swbtn1`,
          nextEl: `.swbtn2`,
        }
      },
      swiperOption2: {
        slidesPerView: 6,
        spaceBetween: 12,
        navigation: {
          prevEl: `.swbtn3`,
          nextEl: `.swbtn4`
        }
      },
      mapChange: 0,
      showSup: true,
      minNum: 1,
      adv: {}
    };
  },
  async fetch(app) {
    
  },
  async created () {
    const adv = await getSpCartAdv();
    if (!adv) return;
    this.adv = adv.data.data;
    const data = await getSpCartList();
    console.log('datadata',data)
    if (!data) return;
    this.$store.commit("moduleCart/CHANGE_CART_DATA", data.data.data);
  },
  async asyncData(app) {
    
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    }),
    allids() {
      return this.cartData
        .map(store => store.goodsList.map(goods => goods.id))
        .flat();
    },
    serDataList() {
      let x = this.mapChange;
      let tmp = [];
      this.cartData.forEach(store => {
        let arr = store.goodsList.filter(
          goods => goods.changed !== 1 && goods.type === 1 && goods.checked
        );
        arr.length > 0 && tmp.push([store.store_name, arr]);
      });
      return new Map(tmp);
    },
    caseDataList() {
      let x = this.mapChange;
      let tmp = [];
      this.cartData.forEach(store => {
        let arr = store.goodsList.filter(
          goods => goods.changed !== 1 && goods.type !== 1 && goods.checked
        );
        arr.length > 0 && tmp.push([store.store_name, arr]);
      });
      return new Map(tmp);
    },
    cartSplitData() {
      return cartListFormat(this.cartData);
    },
    cartBtnMode() {
      return this.winHeight + this.scrollTop - this.elHeight > 165
        ? "cart-glue"
        : "cart-fixed";
    },
    serData() {
      let x = this.mapChange;
      return [...this.serDataList.values()].flat();
    },
    caseData() {
      let x = this.mapChange;
      return [...this.caseDataList.values()].flat();
    },
    unSupport() {
      return this.serData.length !== 0 && this.caseData.length !== 0;
    },
    allChecked() {
      return this.cartData.every(store =>
        store.goodsList.every(goods => goods.changed !== 1 && goods.checked)
      );
    },
    allSelNum() {
      return this.serData.length + this.caseData.length;
    },
    allSelAmount() {
      return this.allSerAmount + this.allCaseAmount;
    },
    allSerAmount() {
      return this.serData.reduce((pre, cur) => pre + cur.num * cur.price, 0);
    },
    allCaseAmount() {
      return this.caseData.reduce((pre, cur) => pre + cur.num * cur.price, 0);
    }
  },
  mounted() {
    if (this.cartData.length <= 0) return;
    EventUtil.addHandler(window, "scroll", this.scrollEvent, true);
    this.elUpdateSize();
    this.winHeight = window.innerHeight;
    // require('@/assets/js/swiper.min5.3.js');
    // var swiperOption = new Swiper(".gallery-thumbs", {
    //   slidesPerView: 6,
    //   spaceBetween: 12,
    //   navigation: {
    //     nextEl: `.swbtn1`,
    //     prevEl: `.swbtn2`
    //   }
    // });
    // var swiperOption2 = new Swiper(".gallery-thumbs2", {
    //   slidesPerView: 6,
    //   spaceBetween: 12,
    //   navigation: {
    //     nextEl: `.swbtn3`,
    //     prevEl: `.swbtn4`
    //   }
    // });
  },
  beforeDestroy() {
    EventUtil.removeHandler(window, "scroll", this.scrollEvent, true);
  },
  methods: {
    // gotoDetail(id, type, store_id) {
    //   if (type == 1) {
    //     this.$router.push(`service/${id}?id=${store_id}`);
    //   } else if (type == 2 || type == 3) {
    //     this.$router.push(`/case-biog/${id}?id=${store_id}`);
    //   }
    // },
    elUpdateSize() {
      this.elHeight = this.$refs.cart ? this.$refs.cart.offsetHeight : 0;
    },
    inpChange(event, goods) {
      const { stock } = goods;
      let val = +event.target.value;
      if (isNaN(val) || val < this.minNum) {
        goods.num = this.minNum;
      } else if (val > stock) {
        goods.num = stock;
      }
      changeGoodsNum(goods.id, goods.num);
    },
    scrollEvent() {
      this.scrollTop = EventUtil.scrollTop();
    },
    numMinus(goods) {
      const { num } = goods;
      goods.num = num <= this.minNum ? this.minNum : num - 1;
      changeGoodsNum(goods.id, goods.num);
    },
    numPlus(goods) {
      const { num, stock } = goods;
      goods.num = num >= stock ? stock : num + 1;
      changeGoodsNum(goods.id, goods.num);
    },
    openQQ(kf) {
      if (!kf) {
        return;
      }
      window.open(`tencent://message/?uin=${kf}`);
      // kf ? window.open(`tencent://message/?uin=${kf}`) : this.$message.error('该店铺没有客服')
    },
    mapRandomResponse() {
      this.mapChange = Math.random();
    },
    selGood(goods) {
      goods.checked = goods.checked === 1 ? 0 : 1;
      this.showSup = true;
      this.mapRandomResponse();
      selCartGoods({ checked: goods.checked, cart_id: [goods.id] });
    },
    delGood(goods) {
      // 删除
      this.delCom([goods.id]);
    },
    delCheck() {
      // 删除选择
      let checkList = this.serData
        .map(item => item.id)
        .concat(this.caseData.map(item => item.id));
      checkList.length > 0
        ? this.delCom(checkList)
        : this.$message.error("您还没有选择哦");
    },
    delNegate() {
      // 删除失效
      let negateArrId = [];
      this.negate.forEach(res => {
        negateArrId.push(res.id);
      });
      this.negate.length > 0
        ? this.delCom(negateArrId)
        : this.$message.error("当前没有失效商品哦");
    },
    async delCom(cart_id) {
      (await this.delGoods({ cart_id }))
        ? this.$message.success("删除成功,正在获取最新列表")
        : this.$message.error("删除失败");
    },
    async delAll() {
      // 清空
      const res = await this.delGoods({ empty: 1 });
      if (!res) return this.$message.error("清空失败");
      this.$message.success("清空成功");
      this.serDataList.clear();
      this.caseDataList.clear();
      this.negate = [];
      this.mapRandomResponse();
    },
    changeAllCheck() {
      let checked = this.allChecked;
      this.cartData.forEach(store => {
        store.goodsList.forEach(goods => {
          if (goods.changed !== 1) goods.checked = checked ? 0 : 1;
        });
      });
      selCartGoods({ checked: checked ? 0 : 1, cart_id: this.allids });
      this.mapRandomResponse();
      this.showSup = true;
    },
    storeCheck(store) {
      let tmpc = store.goodsList.every(
        goods => goods.changed === 1 || goods.checked
      );
      let cart_id = store.goodsList.map(goods => {
        if (goods.changed !== 1) goods.checked = tmpc ? 0 : 1;
        return goods.id;
      });
      selCartGoods({ checked: tmpc ? 0 : 1, cart_id });
      this.mapRandomResponse();
    },
    goPay(type) {
      if (this.unSupport && type === 0) return (this.showSup = true);
      const list =
        type === 2 || this.serData.length === 0
          ? this.caseDataList
          : this.serDataList;
      if (list.size <= 0) return this.$message.error("请先选择要结算的商品");
      sessionStorage.setItem("cartToPayData", JSON.stringify([...list]));
      this.$router.push("/shoppingCart/setlement");

      let servObj = {
          service_id: "", //	服务id，多个用逗号分隔，同一个服务不同规格，服务id要写多个
          service_spec: "", //	服务规格
          service_num: "", //	服务购买数量
          service_price: "", //	服务单价
          service_total_price: "" //服务总价
        },
        caseObj = {
          case_id: "", //	案例传记id，多个用逗号分隔
          case_num: "", //	案例传记id对应的数量
          case_price: "", //	案例传记id对应的几个
          case_total_price: "" //	案例传记总价格
        },
        newList = [],
        oldList = [...list];
      for (let i = 0; i < oldList.length; i++) {
        newList = newList.concat(oldList[i][1]);
      }
      if (type === 2 || this.serData.length === 0) {
        //case
        let case_id = newList.map(item => item.goods_id).toString();
        let case_num = newList.map(item => item.num).toString();
        let case_price = newList.map(item => item.price).toString();

        let casePrice = newList.map(item => +(item.price * item.num));
        let case_total_price = casePrice.reduce((prev, cur) => {
          return prev + cur;
        });
        caseObj = {
          case_id, //	案例传记id，多个用逗号分隔
          case_num, //	案例传记id对应的数量
          case_price, //	案例传记id对应的几个
          case_total_price //	案例传记总价格
        };
      } else {
        //service
        let service_id = newList.map(item => item.goods_id).toString();
        let service_spec = newList.map(item => item.spec.replace(/,/g,';')).toString();
        let service_num = newList.map(item => item.num).toString();
        let service_price = newList.map(item => item.price).toString();

        let servicePrice = newList.map(item => +(item.price * item.num));
        let service_total_price = servicePrice.reduce((prev, cur) => {
          return prev + cur;
        });
        servObj = {
          service_id, //	服务id，多个用逗号分隔，同一个服务不同规格，服务id要写多个
          service_spec, //	服务规格
          service_num, //	服务购买数量
          service_price, //	服务单价
          service_total_price //服务总价
        };
      }
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: "/shoppingCart",
          rname: "购物车结算",
          ...caseObj,
          ...servObj
        }
      });
    },
    async updateCartList() {
      this.updateCartData();
      this.elUpdateSize();
      this.mapRandomResponse();
    }
  }
};
</script>

<style scoped lang="less" src="./cart.less"></style>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>
<style lang="less">
.shopping-cart-page {
  .swiper-slide {
    width: 150px;
    margin-right: 12px;
  }
}
</style>
