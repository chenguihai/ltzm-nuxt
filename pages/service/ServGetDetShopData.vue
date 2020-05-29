<template>
  <div class="ServGetDetShopData">
    <ServGetDetShopDataleft :dataLIST="dataLIST" v-if="dataLIST.length" />
    <div class="ServGetDetShopData_right">
      <div class="box">
        <div id="boxFixed" :class="{'is_fixed' : isFixed}">
          <div>
            <ul class="user_select">
              <li :key="0" :class="{active:0==selectIndex}" @click="activeClick(0)">
                <span>服务介绍</span>
              </li>
              <li :key="1" :class="{active:1==selectIndex}" @click="activeClick(1)">
                <span>服务评价</span>
              </li>
              <li :key="2" :class="{active:2==selectIndex}" @click="activeClick(2)">
                <span>交易保障</span>
              </li>
              <li
                :key="3"
                :class="{active:3==selectIndex}"
                @click="activeClick(3)"
                v-if="shopDataListLeft.case"
              >
                <span>案例介绍</span>
              </li>
              <li
                :key="4"
                :class="{active:4==selectIndex}"
                @click="activeClick(4)"
                v-if="shopDataListLeft.biography"
              >
                <span>传记介绍</span>
              </li>
              <li
                :key="5"
                :class="{active:5==selectIndex}"
                @click="activeClick(5)"
                v-if="bestServiceList.length > 0"
              >
                <span>店铺精选</span>
              </li>
              <span class="shopCarS" @click="shopCarS">加入购物车</span>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="flag1" class="serviceIntroduction">
        <div class="serviceData" v-if="normal_attr.length > 1">
          <span>服务参数</span>
          <div class="biographyNone" v-if="normal_attr.length < 1">
            <img src="../../assets/img/pintouge.png" alt />
            <span>暂无数据</span>
          </div>
          <div class="serviceData_d" v-else>
            <div class="serviceData_left">
              <div>
                <ul>
                  <li
                    v-for="(itemD,index) in normal_attr.filter(item=>item.checked ==1)"
                    :key="index"
                  >
                    <span>{{itemD.attr_name}}</span>
                    <span
                      v-if="itemD.input_type ==1"
                      :title="itemD.checked_list"
                    >{{itemD.checked_list}}</span>
                    <span
                      v-else-if="itemD.input_type ==2"
                      :title="itemD.checked_list[0].value"
                    >{{itemD.checked_list[0].value}}</span>
                    <span v-else :title="itemD.checked_list">{{itemD.checked_list}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="serviceDetails" v-if="shopDataListLeft.pc">
          <span>服务详情</span>
          <div class="biographyNone" v-if="shopDataListLeft.pc == null">
            <img src="../../assets/img/pintouge.png" alt />
            <span>暂无数据</span>
          </div>
          <div v-else>
            <div v-html="shopDataListLeft.pc"></div>
          </div>
        </div>
      </div>
      <div v-show="flag2" class="evaluate">
        <span class="serviceIntr">累计评价</span>
        <div class="evaluateData">
          <div class="shopGrade">
            <div class="gradeS" v-if="commentsP">
              <div class="gradeS_left">
                <span>综合评分</span>
                <span>{{commentsP.avgScore | twoFixed}}</span>
                <rate-cpn :pass="commentsP.avgScore" />
              </div>
              <div class="gradeS_right">
                <span>
                  服务态度：
                  <span>{{commentsP.quality |twoFixed}}</span>分
                </span>
                <span>
                  工作速度：
                  <span>{{commentsP.speed |twoFixed}}</span>分
                </span>
                <span>
                  完成质量：
                  <span>{{commentsP.attitude |twoFixed}}</span>分
                </span>
              </div>
            </div>
          </div>
          <div id="chartsBox"></div>
        </div>
        <div class="comment">
          <ul class="commentImg">
            <li
              v-for="(itemP,index) in commentListData.commentCount"
              :key="index"
              :class="{active:index==commentIndex}"
              @click="commentClick(itemP , index)"
            >
              <div>
                <svg v-if="index == 'good'" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-haoping" class="ccccc" />
                </svg>
                <svg v-else-if="index =='middle'" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zhongping" class="ccccc" />
                </svg>
                <svg v-else class="icon" aria-hidden="true">
                  <use xlink:href="#icon-chaping" class="ccccc" />
                </svg>

                <span v-if="index =='good'">
                  好评
                  <i>( {{itemP}} )</i>
                </span>
                <span v-else-if="index =='middle'">
                  中评
                  <i>( {{itemP}} )</i>
                </span>
                <span v-else>
                  差评
                  <i>( {{itemP}} )</i>
                </span>
              </div>
            </li>
          </ul>
          <div>
            <div v-for="(itemD,index) in commentList" :key="index">
              <div class="commentIndexData">
                <div>
                     <img
                    v-if="itemD.avatar"
                    :src="envVars.IMG_HOST+itemD.avatar"
                    :alt="itemD.nick_name"
                  />
                  <img
                    v-else-if="itemD.avatar && itemD.avatar.indexOf('thirdwx') > -1"
                    :src="itemD.avatar"
                    :alt="itemD.nick_name"
                  />
                 
                  <img v-else src="@/assets/img/userDataImg.png" :alt="itemD.nick_name" />
                </div>
                <div>{{itemD.nick_name}}</div>
                <div>{{itemD.u_time}}</div>
              </div>
              <div class="commentIndexText">
                <div>
                  <span v-if="itemD.evaluate =='1'">好评</span>
                  <span v-else-if="itemD.evaluate =='2'">中评</span>
                  <span v-else>差评</span>
                  <rate-cpn :pass="itemD.avgScore" />
                </div>
                <div>评价：{{itemD.u_content}}</div>
                <div>交易金额：￥{{itemD.amount}}</div>
                <div v-if="itemD.explain">服务商解释：{{itemD.explain}}</div>
              </div>
            </div>
          </div>
          <div class="block" id="block" v-if="flagPage">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              background
              :page-size="pageSize"
              layout="total,prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            ></el-pagination>
            <div class="sbm">确定</div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div v-show="flag3" class="safeguard">
        <span class="serviceIntr">交易保障</span>
        <div>
          <img src="../../assets/img/safeguard.jpg" alt />
        </div>
      </div>
      <div v-show="flag4" class="analysis" v-if="shopDataListLeft.case">
        <span class="serviceIntr">案例介绍</span>
        <div class="biographyNone" v-if="!shopDataListLeft.case">
          <img src="../../assets/img/pintouge.png" alt />
          <span>暂无数据</span>
        </div>
        <div v-else class="service_img">
          <div v-html="shopDataListLeft.case"></div>
        </div>
      </div>
      <div v-show="flag5" style="margin-top:29px" v-if="shopDataListLeft.biography">
        <div class="biography" v-if="!shopDataListLeft.biography">
          <span class="serviceIntr">传记介绍</span>
          <div class="biographyNone">
            <img src="../../assets/img/pintouge.png" alt />
            <span>暂无数据</span>
          </div>
        </div>
        <div v-else>
          <span class="serviceIntr">传记介绍</span>
          <div class="service_img" v-html="shopDataListLeft.biography"></div>
        </div>
      </div>
      <div v-if="flag6&&bestServiceList.length > 0" class="storeSelection">
        <span class="serviceIntr">店铺精选</span>
        <div class="biographyNone" v-if="bestServiceList.length < 1">
          <img src="../../assets/img/pintouge.png" alt />
          <span>暂无数据</span>
        </div>
        <div v-else class="storeSelectionList">
          <ul>
            <a
              v-for="(itemS , index) in bestServiceList"
              :key="index"
              :href="`/service/${itemS.id}?id=${shopDataListLeft.store_id}`"
              target="_blank"
            >
              <div>
                <img
                  v-if="itemS.img!=null&&itemS.img!=''"
                  v-lazy="itemS.img+'?x-oss-process=image/resize,m_fill,h_120,w_200'"
                  :title="itemS.name"
                  :alt="itemS.name"
                />
                <img :title="itemS.name" :alt="itemS.name" v-else src="../../assets/img/img_bg.png" />
              </div>
              <span>{{itemS.name}}</span>
              <div>
                <p>
                  <i>成交量：</i>
                  <span>{{itemS.deal_num}}</span>
                </p>
                <p>
                  <span :title="`￥${parseInt(itemS.price)}/${itemS.unit_name}`">
                    ￥{{parseInt(itemS.price)}}
                    <i>/{{itemS.unit_name}}</i>
                  </span>
                </p>
              </div>
            </a>
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
import ServGetDetShopDataleft from "./ServGetDetShopDataleft";
import echarts from "echarts";
import { serviceComments, addCart } from "@/api/list";
import { mapState } from "vuex";
import { sliceNumber, serviceDiffText, abs } from "~/utils/common-filters";
import rateCpn from "~/components/component/rateCpn";

import { rateMixin } from "~/utils/common-mixins";
import dataEventTrack from "@/utils/dataEventTrack";
export default {
  computed: {
    ...mapState({ envVars: "envVariables", userInfoData: "userInfo" })
  },
  components: {
    ServGetDetShopDataleft,
    rateCpn
  },
  props: ["spec_json", "count", "evaluate"],
  inject: ["dataLIST", "stockNum", "cassData"],
  mixins: [rateMixin()],
  data() {
    return {
      dataLIS: this.dataLIST,
      stockN: this.stockNum,
      spec_j: this.spec_json,
      cassDa: this.cassData,
      coun: this.count,
      selectIndex: 0,
      commentIndex: 0,
      sid: "",
      comments: "",
      bestServiceList: "", //店铺精选
      normal_attr: "",
      shopDataListLeft: "",
      arrTab: [
        "服务介绍",
        "服务评价",
        "交易保障",
        "案例介绍",
        "传记介绍",
        "店铺精选"
      ],
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
      flag4: true,
      flag5: true,
      isFixed: false,
      flag6: true,
      commentsP: "",
      serviceStatistic: "",
      chart: null,
      userId: "",
      evalu: this.evaluate || "",
      offsetTop: "",
      caseData: [],
      hasBiog: [],
      storeData: ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.dataList();
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
    dataList() {
      this.shopDataListLeft = this.dataLIS[0];
      this.storeData = this.dataLIS[1];
      this.bestServiceList = this.shopDataListLeft.bestServiceList;
      this.normal_attr = this.shopDataListLeft.normal_attr;
      this.caseData = this.cassDa[0].hasCase;
      this.hasBiog = this.cassDa[0].hasBiog;
      for (let i = 0; i < this.normal_attr.length; i++) {
        if (this.normal_attr[i].input_type == 3) {
          var Arr = JSON.stringify(this.normal_attr[i].checked_list);
          var str = "";
          Arr = Arr.replace(/\[|]/g, "");
          this.normal_attr[i].checked_list = Arr.replace(/\"|"/g, "");
        }
      }
    },
    init() {
      this.sid = this.shopDataListLeft.id;
      var data = {
        sid: this.sid,
        evaluate: this.eval,
        page: this.currentPage3
      };

      serviceComments(data)
        .then(res => {
          if (res.data.code == 200) {
            const {
              data,
              per_page,
              total,
              current_page,
              comments,
              serviceStatistic
            } = res.data.data;
            this.commentListData = res.data.data;
            this.commentList = data;
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.commentsP = comments;
            this.serviceStatistic = serviceStatistic;
            this.charts();
            for (var i = 0; i < this.commentList.length; i++) {
              this.commentList[i].avgScore = Number(
                this.commentList[i].avgScore
              );
            }
            //分页显示隐藏
            if (this.total < 20) {
              this.flagPage = false;
            } else {
              this.flagPage = true;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    initHeight() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (
        this.caseData != undefined &&
        this.caseData.length > 0 &&
        this.hasBiog != undefined &&
        this.hasBiog.length > 0

      ) {
        this.isFixed = scrollTop > this.offsetTop + 1040 ? true : false;
      } else {
        this.isFixed = scrollTop > this.offsetTop + 910 ? true : false;
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
            radius: "60%",
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
    activeClick(index) {
      this.selectIndex = index;
      if (this.selectIndex == 1) {
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = false;
        this.flag4 = false;
        this.flag5 = false;
        this.flag6 = false;
      } else if (this.selectIndex == 2) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = true;
        this.flag4 = false;
        this.flag5 = false;
        this.flag6 = false;
      } else if (this.selectIndex == 3) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
        this.flag4 = true;
        this.flag5 = false;
        this.flag6 = false;
      } else if (this.selectIndex == 4) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
        this.flag4 = false;
        this.flag5 = true;
        this.flag6 = false;
      } else if (this.selectIndex == 5) {
        this.flag1 = false;
        this.flag2 = false;
        this.flag3 = false;
        this.flag4 = false;
        this.flag5 = false;
        this.flag6 = true;
      } else {
        this.flag1 = true;
        this.flag2 = true;
        this.flag3 = true;
        this.flag4 = true;
        this.flag5 = true;
        this.flag6 = true;
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
        query: { id: this.shopDataListLeft.store_id }
      });
      window.open(href, "_blank");
      // let top = document.documentElement.scrollTop || document.body.scrollTop;
      // // 实现滚动效果
      // const timeTop = setInterval(() => {
      //     document.body.scrollTop = document.documentElement.scrollTop = top = 0;
      //     if (top <= 0) {
      //         clearInterval(timeTop);
      //     }
      // }, 10);
    },
    async shopCarS() {
      if (
        this.spec_j != undefined &&
        this.spec_j.length > 0 &&
        this.stockNum != 0
      ) {
        if (this.count > this.stockNum) {
          this.$message.error("此服务最多可购买" + this.stockNum + "个");
          return;
        }
      }
      if (
        this.spec_j != undefined &&
        this.spec_j.length > 0 &&
        this.stockNum == 0
      ) {
        if (this.stockNum == 0) {
          this.$message.error("此服务库存不足,不能加入购物车");
          this.count = this.stockNum;
          return;
        }

        if (this.count > this.stockNum) {
          this.$message.error("此服务最多可购买" + this.stockNum + "个");
          return;
        }
      } else if (this.spec_j.length == 0 && this.dataLIST[0].stock == 0) {
        this.$message.error("此服务库存不足,不能购买");
      } else {
        var params = {
          type: "1",
          goods_id: this.sid,
          price: this.shopDataListLeft.price,
          num: 1,
          spec_json: this.spec_j
        };
        if (this.userInfoData) {
          this.userId = this.userInfoData.original.id;
          if (this.userId == this.shopDataListLeft.user_id)
            return this.$message.error("您不能购买自己的服务");
          let carTow = await addCart(params);
          const { code, message, data } = carTow.data;
          if (code != 200) return this.$message.error(message);
          this.$message.success("成功加入购物车");
          var key = [];
          if (this.spec_j.length > 0) {
            this.spec_j.filter(item => {
              key.push(item.key + ":" + item.value);
            });
            console.log("key", key);
            key = JSON.stringify(key)
              .replace(/\[|]/g, "")
              .replace(/\"|"/g, "");
          } else {
            key = "";
          }
          dataEventTrack({
            referer: document.referrer,
            event_type: "click",
            kv: {
              router: this.$route.fullPath,
              rname: "加入购物车",
              service_id: this.sid,
              service_spec: key || "",
              service_num: "1",
              service_price: this.shopDataListLeft.price
            }
          });
        } else if (!this.token)
          return this.$loginp(0, () => {
            this.isFreely = 1;
          });
      }
    },
    evaluatype() {
      if (this.evalu == 1) {
        this.selectIndex = 1;
        this.flag1 = false;
        this.flag2 = true;
        this.flag3 = false;
        this.flag4 = false;
        this.flag5 = false;
        this.flag6 = false;
      }
      this.evalu = 0;
    }
  },
  filters: {
    sliceNumber,
    serviceDiffText,
    abs,
    twoFixed: num => {
      if (isNaN(+num)) {
        return "0.00";
      }
      return (+num).toFixed(2);
    }
  },
  watch: {
    spec_json(val) {
      this.spec_j = val;
    },
    evaluate(val) {
      this.evalu = val;
      this.evaluatype();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/ServGetDetailsPage/ServGetDetShopDataScode.less";

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
  width: 657px;
  height: 100%;
}
</style>
