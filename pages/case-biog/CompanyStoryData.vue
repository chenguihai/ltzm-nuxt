<template>
  <!-- 服务详情页服务介绍 -->
  <div class="ServGetDetShopData">
    <ServGetDetShopDataleft :dataLIST="dataLIST" v-if="dataLIST.length" />
    <div class="ServGetDetShopData_right">
      <div class="box">
        <div id="boxFixed" :class="{'is_fixed' : isFixed}">
          <div>
            <ul class="user_select">
              <li
                v-for="(item , index) in arrTab"
                :key="index"
                :class="{active:index==selectIndex}"
                @click="activeClick(item , index)"
              >
                <span>{{item}}</span>
              </li>
              <span class="shopCarS" @click="shopCarS">加入购物车</span>
            </ul>
          </div>
        </div>
      </div>
      <!-- 传记介绍 -->
      <div v-show="flag1" style="margin-top:29px">
        <div class="biography" v-if="shopDataListLeft.introduce == null">
          <span class="serviceIntr">{{arrTab[0]}}</span>
          <div class="biographyNone">
            <img src="../../assets/img/pintouge.png" alt />
            <span>暂无数据</span>
          </div>
        </div>
        <div v-else>
          <span class="serviceIntr">{{arrTab[0]}}</span>
          <!--          biography-->
          <div
            class="m-introduce-content"
            style="display:block;margin-top:10px;"
            v-html="shopDataListLeft.introduce"
          ></div>
        </div>
      </div>
      <!-- 交易保障 -->
      <div v-show="flag2" class="safeguard">
        <span class="serviceIntr">交易保障</span>

        <div>
          <img src="../../assets/img/safeguard.jpg" alt />
        </div>
      </div>
      <!-- 店铺精选 -->

      <div v-if="flag3&&bestServiceList.length > 0" class="storeSelection">
        <span class="serviceIntr">店铺精选</span>
        <div class="biographyNone" v-if="bestServiceList.length < 1">
          <img src="../../assets/img/pintouge.png" alt />
          <span>暂无数据</span>
        </div>
        <div v-else class="storeSelectionList">
          <ul>
            <li
              v-for="(itemS , index) in bestServiceList"
              :key="index"
              @click="bestServiClick(itemS)"
            >
              <div>
                <img :src="envVars.IMG_HOST+itemS.img" alt />
              </div>
              <span>{{itemS.name}}</span>
              <div>
                <p>
                  <i>成交量：</i>
                  {{itemS.deal_num}}
                </p>
                <p>
                  <span :title="`￥${parseInt(itemS.price)}/${itemS.unit_name}`">
                    ￥{{parseInt(itemS.price)}}
                    <i>/{{itemS.unit_name}}</i>
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <p class="statement_text">
        <b>内容声明：</b>
        <span>凌天众媒网为第三方交易平台及互联网信息服务居间提供者，凌天众媒网（含PC、H5网站等）所展示的商品/服务的标题、价格、详情、图片、视频等信息内容系由店铺经营者发布，其真实性、准确性和合法性均由店铺经营者负责。凌天众媒网提醒用户购买商品/服务前注意谨慎核实。如用户或权利人对商品/服务的标题、价格、详情图片、视频等任何信息有任何疑问的，请在购买前与店铺经营者沟通确认；如用户发现店铺内有任何违法/侵权信息，请立即向凌天众媒网举报并提供有效线索，我们在核实后将及时删除违法/侵权信息。</span>
      </p>
    </div>
  </div>
</template>
 <script src="echarts.min.js"></script>

<script>
import ServGetDetShopDataleft from "../service/ServGetDetShopDataleft";
import echarts from "echarts";
import { serviceComments } from "@/api/list";
import { mapState } from "vuex";
import { sliceNumber, serviceDiffText, abs } from "~/utils/common-filters";
import { addCart } from "@/api/list";
import { cartTools } from "@/utils/tool";
import { rateMixin } from "~/utils/common-mixins";
import dataEventTrack from '@/utils/dataEventTrack';
export default {
  name: "companyStoryData",
  computed: {
    ...mapState({ envVars: "envVariables", userInfoData: "userInfo" })
  },
  components: {
    ServGetDetShopDataleft
  },
  inject: ["dataLIST"],
  mixins: [rateMixin()],

  data() {
    return {
      selectIndex: 0,
      commentIndex: 0,
      score: 0,
      sid: "",
      comments: "",
      bestServiceList: this.dataLIST[0].bestServiceList || "", //店铺精选
      normal_attr: this.dataLIST[0].normal_attr || "",
      shopDataListLeft: this.dataLIST[0] || "",
      arrTab: ["案例介绍", "交易保障", "店铺精选"],
      serviceData: [],

      ServGetDetS: {
        grade: 5.0,
        Dnum: 9,
        serve: "5.00",
        speed: "5.00",
        succ: "5.00"
      },
      commentListData: [],
      commentList: [],
      pageSize: 0, //每页显示条数
      page: 1,
      total: 0, //总条目数
      flagPage: false,
      storeSelectionList: [],
      currentPage3: 1,
      eval: "good",
      flag1: true,
      flag2: true,
      flag3: true,
      commentsP: "",
      serviceStatistic: "",
      chart: null,
      isFixed: false
    };
  },
  created() {
    if (this.shopDataListLeft.type === 1) {
     this.arrTab =  ["案例介绍", "交易保障", "店铺精选"]
    
    } else if (this.shopDataListLeft.type === 2) {
     this.arrTab =  ["传记介绍", "交易保障", "店铺精选"]

    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.init();
    window.addEventListener("scroll", this.initHeight);
    this.$nextTick(() => {
      this.offsetTop = document.querySelector("#boxFixed").offsetTop;
    });
  },
  //清除
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    init() {
      this.sid = this.shopDataListLeft.id;
      var data = {
        sid: this.sid,
        evaluate: this.eval,
        page: this.currentPage3
      };
    },
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > this.offsetTop + 735 ? true : false;
    },
    async shopCarS() {
      var params = {
        type: this.shopDataListLeft.type + 1,
        goods_id: this.sid,
        price: this.shopDataListLeft.price,
        num: 1,
        list: 1
      };
      if (this.userInfoData) {
        this.userId = this.userInfoData.original.id;
        if (this.userId != this.shopDataListLeft.user_id) {
          let carCase = await addCart(params);
          const { code, message, data } = carCase.data;
          if (code != 200) return this.$message.error(message);
          this.$message.success("成功加入购物车");
           dataEventTrack({
                    referer: document.referrer,
                    event_type: 'click',
                    kv: {
                        router:this.$route.fullPath,
                        rname:'加入购物车',
                        case_id:this.shopDataListLeft.id,
                        case_type:this.shopDataListLeft.type,
                        case_num:'1',
                        case_price:this.shopDataListLeft.price
                    }
                    })
          cartTools.countChange.call(this);
        } else {
          let text = this.shopDataListLeft.type == 1 ? "案例" : "传记";
          this.$message.error("您不能购买自己的" + text);
        }
      }
    },
    charts() {
      // 基于准备好的dom，初始化echarts实例
      const store = this.serviceStatistic;
      if (!store) return;
      this.chart = echarts.init(document.getElementById("chartsBox"));
      const storeMap = new Map([
        ["服务态度", store.attitude],
        ["工作速度", store.speed],
        ["完成质量", store.quality],
        ["服务销量", store.deal_num]
      ]);
      const option = {
        radar: [
          {
            indicator: [
              { name: "服务态度" },
              { name: "工作速度" },
              { name: "完成质量" },
              { name: "服务销量" }
            ],
            radius: "65%",
            name: {
              color: "#999",
              fontSize: 12,
              formatter: params => {
                let s = storeMap.get(params),
                  diff = serviceDiffText(s),
                  template = `{a|${params}}  {b|比同类型服务${diff}}  `;
                if (diff !== "持平")
                  template += `{${diff === "低" ? "d" : "c"}|${abs(s)}%}`;
                return template;
              },
              rich: {
                a: {
                  color: "#666",
                  fontSize: 14,
                  fontFamily: "Microsoft YaHei",
                  verticalAlign: "middle"
                },
                b: {
                  color: "#999",
                  fontSize: 12,
                  fontFamily: "Microsoft YaHei",
                  verticalAlign: "middle"
                },
                c: {
                  color: "#F3262D",
                  fontSize: 12,
                  fontFamily: "Microsoft YaHei",
                  verticalAlign: "middle",
                  fontWeight: "bold"
                },
                d: {
                  color: "#55CC5B",
                  fontSize: 12,
                  fontFamily: "Microsoft YaHei",
                  verticalAlign: "middle",
                  fontWeight: "bold"
                }
              }
            }
          }
        ],
        series: [
          {
            type: "radar",
            itemStyle: {
              normal: { areaStyle: { type: "default", color: "#F3262D" } }
            },
            data: [
              {
                value: Array.from(storeMap.values())
              }
            ]
          }
        ]
      };
      this.chart.setOption(option);
    },
    activeClick(item, index) {
      this.selectIndex = index;
      if (this.selectIndex == 1) {
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = false;
      } else if (this.selectIndex == 2) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = true;
      } else {
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = true;
      }
    },
    commentClick(itemP, index) {
      this.commentIndex = index;
      this.eval = index;
      this.init();
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    bestServiClick(itemS) {
      var { href } = this.$router.resolve({
        path: "/service/" + itemS.id,
        query: { id: itemS.id }
      });
      window.open(href, "_blank");
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 0;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  filters: {
    sliceNumber,
    serviceDiffText,
    abs
  }
};
</script>
        <style lang="less" scoped>
@import "../../assets/css/ServGetDetailsPage/ServGetDetShopDataScode.less";
.statement_text {
  margin: 60px 0 16px;
  span {
    line-height: 20px;
  }
}
.is_fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #f4f6f8;

  & > div {
    position: relative;
    width: 1210px;
    & > ul {
      position: absolute;
      right: 0;
      & > .shopCarS {
        display: block !important;
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
  }
}
</style>
    <style lang="less">
#chartsBox {
  // flex: 1;
  // margin-left: 64px;
  width: 657px;
  height: 100%;
}
.m-introduce-content {
  img {
    width: 100%;
  }
}
</style>
