<template>
  <div class="setle-box">
    <template v-if="!overdue">
      <h3 class="title">请核对订单信息</h3>
      <div class="setle-con">
        <p class="con-title">购买清单：</p>
        <ul class="setle-top">
          <li style="margin-left:343px;">购买信息</li>
          <li style="margin-left:160px;" class="f1">单价</li>
          <li class="f1">数量</li>
          <li class="f1">小计</li>
        </ul>
        <div v-for="(item,idx) in list" :key="idx">
          <div class="cart-store" v-if="item[1].length > 0">
            <!-- 店铺名 -->
            <div class="store-name">
              <p>{{item[0]}}</p>
            </div>
            <!-- 店铺名 -->
            <!-- 商品所属 -->
            <ul class="shop-list">
              <li class="shop-items is-setle" v-for="goods in item[1]" :key="goods.id">
                <img
                  src="~/assets/img/img_bg.png"
                  v-lazy="goods.img+'?x-oss-process=image/resize,m_fill,h_60,w_100'"
                  class="shop-img"
                />
                <div class="oth-box">
                  <p class="shop-name">{{goods.name}}</p>
                  <div class="shop-prop">
                    <p>{{goods.spec}}</p>
                  </div>
                  <p class="shop-price">￥{{goods.price}}</p>
                  <div class="num-box">X {{goods.num}}</div>
                  <p class="amount">￥{{goods.num * goods.price}}</p>
                </div>
              </li>
            </ul>
            <!-- 商品所属 -->
          </div>
        </div>

        <!-- 总额 -->
        <div class="sub-box">
          <p>共{{allNums}}件，总金额{{allAmounts}}</p>
          <p>
            应付总额：
            <span>￥{{allAmounts}}</span>
          </p>
        </div>
        <!-- 总额 -->
        <div class="sub-btn">
          <div class="submit" @click="submit">提交订单</div>
        </div>
      </div>
    </template>
    <template v-else>
      <emptyData class="emp-data">
        <p class="emp-tip">
          {{overText}}
          <router-link tag="span" to="/shoppingCart" replace>返回我的购物车</router-link>
          <router-link tag="span" to="/" replace>返回首页</router-link>
        </p>
      </emptyData>
    </template>
  </div>
</template>

<script>
import emptyData from "@/components/shop/emptyData";
import { letsPay } from "@/api/shop-cart";
import dataEventTrack from "@/utils/dataEventTrack";

export default {
  name: "setlement",
  layout: "shop-flow-layout",
  components: { emptyData },
  props: {},
  data() {
    return {
      list: [],
      overdue: false,
      overText: "",
      type: ""
    };
  },
  computed: {
    allAmounts() {
      return this.list.reduce(
        (pre, cur) =>
          pre +
          cur[1].reduce(
            (preGoods, curGoods) => preGoods + curGoods.num * curGoods.price,
            0
          ),
        0
      );
    },
    allNums() {
      return this.list.reduce((pre, cur) => pre + cur[1].length, 0);
    }
  },
  mounted() {
    this.dataInit();
  },
  methods: {
    dataInit() {
      let list = sessionStorage.getItem("cartToPayData");
      list = list ? JSON.parse(list) : [];
      if (list.length <= 0) {
        this.overText = "当前结算信息已过期，请返回购物车重新添加";
        this.overdue = true;
        return;
      }
      this.list = list;
      this.type = this.list[0][1][0].type === 1 ? "service" : "caseBiog";
    },
    async submit() {
      const opts = {
        ids: this.list.map(store => store[1].map(goods => goods.id)).flat(),
        amount: this.allAmounts
      };
      const data = await letsPay(opts, this.type);
      if (!data) return;
      this.$router.replace({
        path: "/payment",
        query: {
          order_sn: data.data.data.order_sn,
          type: this.type === "service" ? 5 : 6
        }
      });
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
        oldList = this.list;
      for (let i = 0; i < oldList.length; i++) {
        newList = newList.concat(oldList[i][1]);
      }
      if (this.type !== "service") {
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
          router: "/shoppingCart/setlement",
          rname: "提交订单",
          ...caseObj,
          ...servObj
        }
      });
    }
  }
};
</script>

<style scoped lang="less" src='./cart.less'>
</style>
