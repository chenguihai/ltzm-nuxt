<template>
  <div class="marketShop">
    <comHeader />
    <navAll />
    <div class="market_shop">
      <div class="marketShop_top">
        <div>
          <img :src="(envVars.IMG_HOST+'/'+toolsinfo.tool_img)" alt />
        </div>
        <div>
          <span>{{toolsinfo.tool_name}}</span>
          <div v-if="id ==1">
            价&#32;&#8194;&#8194;&#8194;格：
            <span>
              ￥
              <p v-if="lm_list==''">
                {{toolsinfo.price}}
                <i style="font-size:12px;margin-left:2px">起</i>
                <i class="closeTime">会员有效期至2020-04-27</i>
              </p>
              <p v-else>{{lm_list.price}}</p>
            </span>
          </div>

          <div v-else-if="id ==2">
            价&#32;&#8194;&#8194;&#8194;格：
            <span>
              ￥
              <p v-if="jMoney">{{jMoney}}</p>
              <p v-else>
                {{toolsinfo.price}}
                <i style="font-size:12px;margin-left:2px">起</i>
                <i class="closeTime">会员有效期至2020-04-27</i>
              </p>
            </span>
          </div>
          <div v-else-if="id == 3">
            价&#32;&#8194;&#8194;&#8194;格：
            <span>
              ￥
              <p v-if="lm_list==''">
                {{toolsinfo.price}}
                <i style="font-size:12px;margin-left:2px">起</i>
              </p>
              <p v-else>{{lm_list.price}}</p>
            </span>
          </div>
          <div v-if="id ==1" class="product_delcom">
            <p v-if="id == 1">会员等级：</p>
            <div>
              <button
                href="javascript:;"
                v-for="(item,idx) in levels"
                :key="idx"
                @click="levelsClick(idx)"
                :disabled="item.disabled"
                :class="{level_active:l_index == idx,'aaaa':item.disabled}"
              >
                {{item.ml_name}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xuanze" class="ccccc" />
                </svg>
              </button>
            </div>
          </div>
          <div v-if=" id == 3" class="product_delcom">
            <p v-if="id == 3" class="idThre">设计师等级：</p>
            <div>
              <button
                href="javascript:;"
                v-for="(item,idx) in levels"
                :key="idx"
                @click="levelsClick(idx)"
                :class="{level_active:l_index == idx}"
              >
                {{item.ml_name}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xuanze" class="ccccc" />
                </svg>
              </button>
            </div>
          </div>
          <div v-else-if="id ==2 " class="lmM">
            <p>类目个数：</p>
            <div class="number">
              <input
                type="text"
                name="number"
                @blur="blurNum"
                autocomplete="off"
                v-model="number"
                class="inputN"
              />
            </div>
          </div>
          <div class="product_delcom" v-if="id ==1 || id == 3" :class="{'product_id':id == 3}">
            <p v-if="id == 1">有&#8194;效&#8194;期：</p>
            <p v-else-if="id == 3">服务类型：</p>
            <div>
              <a
                href="javascript:;"
                v-for="(item,idx) in months"
                :key="idx"
                @click="monthClick(idx,item)"
                :class="{month_active:y_index == idx}"
              >
                {{item.expire}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xuanze" class="ccccc" />
                </svg>
              </a>
            </div>
          </div>
          <div class="product_delcom" v-else-if="id ==2 ">
            <p>有&#8194;效&#8194;期：</p>
            <div>
              <a
                href="javascript:;"
                v-for="(item,index) in jnlmData"
                :key="index"
                :class="{month_active:jIndex == item.id}"
                @click="jnlmDataClick(item,index)"
              >
                {{item.expire}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xuanze" class="ccccc" />
                </svg>
              </a>
            </div>
          </div>
          <div class="icon_support">
            支持平台：
            <svg class="icon icon_dn" aria-hidden="true" v-if="flag">
              <use xlink:href="#icon-gongjushichang-diannao" class="aaaaa" />
            </svg>
            <svg class="icon icon_sj" aria-hidden="true" v-if="flaga">
              <use xlink:href="#icon-gongjushichang-shouji" class="ccccc" />
            </svg>
          </div>
          <div class="submintD" :class="{'submint_id':id == 2}">
            <el-button type="text" @click="onOpen" class="submint">立即购买</el-button>
          </div>
        </div>
        <div>
          <div class="dynamic_buy">购买动态</div>
          <div class="dynamic_news">
            <ul :class="{animateadMediathr}">
              <li v-for="(item,index) in dynamicNews" :key="index">
                <span v-bind:title="item.shop">{{item.store_name}}</span>
                <span>
                  <p>于</p>
                  {{item.updated_at}}
                  <p class="buyBoss">购买了</p>
                </span>
                <span style="color:#F3262D" v-if="item.type == 1">{{item.type_name}}</span>
                <span v-else-if="item.type == 2" style="color:#F3262D">{{item.type_name}}</span>
                <span v-else-if="item.type == 3" style="color:#F3262D">{{item.type_name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="marketShop_bot">
        <div class="marketShop_bot_left">
          <div class="lz_official">
            <span>{{store.name}}</span>
            <div>
              <div>
                <img src="../../../assets/img/icon/phone.gif" alt />&#32;&#8194;
              </div>
              <div>
                官方客服
                <a
                  class="callMy"
                  href="https://url.cn/59IhwSe?_type=wpa&qidian=true"
                  target="_blank"
                >
                  <img src="../../../assets/img/qqT.png" alt />&#32;&#8194;
                </a>
              </div>
              <div>服务时间 周一至周日 9:00-20:00</div>
            </div>
          </div>
          <div class="lz_other">
            <span>其他工具</span>
            <div v-for="itemT in toolsList" :key="itemT.id" @click="markClickL(itemT , itemT.id)">
              <img :src="(envVars.IMG_HOST+'/'+itemT.tool_img)" alt />
              <div>
                <span>{{itemT.tool_name}}</span>
                <span>
                  ￥
                  <p>{{itemT.amount}}</p>起
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="marketShop_bot_right">
          <span>应用详情</span>
          <div v-html="toolsinfo.description">{{toolsinfo.description}}</div>
        </div>
      </div>
    </div>
    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      @close="closeHand()"
      class="tc_title"
      :modal="true"
      width="30%"
      center
      v-if="id == 1 || id == 3"
    >
      <div v-if="lm_list=='' && id == 1 ">请选择有效期</div>
      <div v-else-if="lm_list!='' && id == 1 ">您已选择会员升级工具：{{lm_list.ml_name}}、{{lm_list.expire}}</div>
      <div v-if="lm_list=='' && id == 3 ">请选择服务类型</div>
      <div v-else-if="lm_list!='' && id == 3 ">您已选择会设计师等级：{{lm_list.ml_name}}、{{lm_list.expire}}</div>

      <div v-if="lm_list!=''">
        ￥
        <p>{{lm_list.price}}</p>
      </div>
      <div v-if="lm_list==''" slot="footer" class="dialog-footer submitdele">
        <el-button type="primary" @click="submitdele">确定</el-button>
      </div>
      <div v-else slot="footer" class="dialog-footer">
        <el-button type="primary" class="cubClick" @click="submit">确定购买</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      @close="closeHand()"
      class="tc_title"
      width="30%"
      center
      v-if="id == 2"
      :modal="true"
    >
      <div v-if="number <= 0">请输入类目个数</div>
      <div v-else-if="number > tools.can_buy_num">最多可购买{{tools.can_buy_num}}</div>
      <div v-else-if="jnlmD==''">请选择有效期</div>
      <div v-else-if="number <= tools.can_buy_num">您已选择技能类目工具：{{number}}个类目、{{jnlmD.expire}}</div>
      <div v-if="number > 0 && number <= tools.can_buy_num && jnlmD !=''">
        ￥
        <p>{{jnlmD.price*number}}</p>
      </div>
      <div
        v-if="number > 0 && number <= tools.can_buy_num && jnlmD !=''"
        slot="footer"
        class="dialog-footer"
      >
        <el-button type="primary" @click="submit" class="cubClick">确定购买</el-button>
      </div>
      <div
        v-if="number <= 0 || number > tools.can_buy_num || jnlmD ==''"
        slot="footer"
        class="dialog-footer submitdele"
      >
        <el-button type="primary" @click="submitdele">确定</el-button>
      </div>
    </el-dialog>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "~/components/component/comHeader";
import comFooter from "~/components/component/comFooter";
import sideBar from "@/components/sideBar";
import navAll from "~/components/component/navAll";
import { toolsInfo, toolsOrder } from "@/api/list";
import dataEventTrack from "@/utils/dataEventTrack";
import { mapState } from "vuex";
export default {
  components: {
    comHeader,
    comFooter,
    navAll,
    sideBar
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      map: {},
      buy: [], // 等级和月份
      levels: [], //等级
      months: [],
      l_index: 0, //等级索引
      y_index: -1,
      jIndex: -1,
      id: "",
      lm_list: "", //类目有效期
      number: 1, //类目数量
      toolsinfo: "",
      price: "", //类目有效期价格
      flag: false,
      flaga: false,
      store: {},
      centerDialogVisible: false,
      tools: [],
      toolsList: [],
      jnlmData: [],
      dynamicNews: [],
      animateadMediathr: false,
      leId: "",
      jnlmD: "",
      jMoney: "",
      numLM: ""
    };
  },
  mounted() {
    dataEventTrack({
      referer: document.referrer,
      event_type: "page_show",
      kv: {
        router: this.$route.fullPath,
        tool_id: this.id
      }
    });
  },
  methods: {
    closeHand() {
      this.centerDialogVisible = false;
      var tool_spec = "";
      if (this.jnlmD || this.lm_list) {
        if (this.id == 1 ) {
          tool_spec = `会员等级:${this.lm_list.ml_name};有效期:${this.lm_list.expire}`;
        }else if (this.id == 3) {
          tool_spec = `设计师等级:${this.lm_list.ml_name};服务类型:${this.lm_list.expire}`;
        }  else if (this.id == 2) {
          tool_spec = `类目个数:${this.number}个;有 效 期:${this.jnlmD.expire ||
            this.lm_list.ml_name}`;
        }
      } else {
        tool_spec = "";
      }
      if (this.jnlmD) {
        var pic = this.jnlmD.price * this.number;
        pic = pic.toFixed(2);
      } else {
        var pic = this.lm_list.price;
      }

      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: this.$route.fullPath,
          rname: "关闭弹窗",
          tool_id: this.id,
          tool_spec: tool_spec,
          tool_price: pic
        }
      });
    },
    onOpen() {
      this.centerDialogVisible = true;
      //数据埋点
      if (this.jnlmD || this.lm_list) {
        var tool_spec = "";
        if (this.id == 1) {
          tool_spec = `会员等级:${this.lm_list.ml_name};有效期:${this.lm_list.expire}`;
        } else if (this.id == 3) {
          tool_spec = `设计师等级:${this.lm_list.ml_name};服务类型:${this.lm_list.expire}`;
        } else if (this.id == 2) {
          tool_spec = `类目个数:${this.number}个;有效期:${this.jnlmD
            .expire || this.lm_list.ml_name}`;
        }
        if (this.jnlmD) {
          var pic = this.jnlmD.price * this.number;
          pic = pic.toFixed(2);
        } else {
          var pic = this.lm_list.price;
        }
        return
        dataEventTrack({
          referer: document.referrer,
          event_type: "click",
          kv: {
            router: this.$route.fullPath,
            rname: "立即购买",
            tool_id: this.id,
            tool_spec: tool_spec,
            tool_price: pic
          }
        });
      }
    },
    // 点击等级切换事件
    levelsClick(idx) {
      this.lm_list = "";
      this.l_index = idx;
      this.y_index = -1;
      this.months = this.map.get(this.levels[this.l_index]);
    },
    //点击月份切换事件
    monthClick(idx, item) {
      this.y_index = idx;
      let { levels, y_index, l_index } = this; // 获取等级数组，月份索引，等级索引
      let curMons = this.map.get(levels[l_index]);
      let obj = curMons[y_index];
      this.lm_list = obj;
      return obj;
    },
    // 技能类目 有效期
    jnlmDataClick(item, index) {
      this.jIndex = item.id;
      this.jnlmD = item;
      this.jMoney = this.jnlmD.price;
    },
    init() {
      this.id = this.$route.query.id;
      var data = {
        id: this.id
      };
      // 工具市场详情页请求数据
      toolsInfo(data)
        .then(res => {
          if (res.data.code == 200) {
            this.dynamicNews = res.data.data.dynamic;
            if (this.dynamicNews.length >= 8) {
              setInterval(this.showMediathr, 2000);
            }
            var b = res.data.data;
            if (b.tools_info.id == 3) {
              for (let i = 0; i < b.buy.length; i++) {
                b.buy[i] = {
                  ...b.buy[i],
                  sml_id: b.buy[i].designer_level_id,
                  ml_name: b.buy[i].designer_level,
                  expire: b.buy[i].service_type
                };
              }
              this.tools = b;
            } else {
              this.tools = res.data.data;
            }

            this.store = this.tools.store;
            this.toolsList = this.tools.tools_list;
            this.toolsinfo = this.tools.tools_info;
            let levels = []; //存所有名称
            let map = new Map();
            let { buy } = this.tools; // 解构赋值，取buy
            if (this.$route.query.id == 2) {
              this.jnlmData = res.data.data.buy;
            }
            if (
              this.tools.shop_info != undefined &&
              this.tools.shop_info.vip_level
            ) {
              this.leId = this.tools.shop_info.vip_level.id;
              for (let i = 0; i < buy.length; i++) {
                if (this.leId > buy[i].sml_id) {
                  buy[i] = { ...buy[i], disabled: true };
                } else {
                  buy[i] = { ...buy[i], disabled: false };
                }
              }
              buy.forEach((item, idx) => {
                // 遍历，添加所有名称到等级
                if (this.leId > item.sml_id) {
                  levels.push({ ml_name: item.ml_name, disabled: true });
                } else {
                  levels.push({ ml_name: item.ml_name, disabled: false });
                }
              });
            } else {
              for (let i = 0; i < buy.length; i++) {
                buy[i] = { ...buy[i], disabled: false };
              }
              buy.forEach((item, idx) => {
                // 遍历，添加所有名称到等级
                levels.push({ ml_name: item.ml_name, disabled: false });
              });
            }
            // 数组去重
            var objItem = {},
              newAry = [];
            for (var i = 0; i < levels.length; i++) {
              if (!objItem[levels[i].ml_name]) {
                newAry.push(levels[i]);
                objItem[levels[i].ml_name] = true;
              }
            }
            levels = newAry;
            levels.forEach((l_item, l_idx) => {
              let tmp = [];
              buy.forEach((item, idx) => {
                if (l_item.ml_name == item.ml_name) {
                  tmp.push(item);
                }
                map.set(l_item, tmp);
              });
            });

            this.buy = buy;
            this.map = map;
            this.levels = levels;
            this.months = map.get(levels[this.l_index]);

            if (this.toolsinfo.support_platform == 1) {
              this.flag = true;
              this.flaga = false;
            } else if (this.toolsinfo.support_platform == 2) {
              this.flag = false;
              this.flaga = true;
            } else {
              this.flag = true;
              this.flaga = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //工具市场下单
    submit() {
      this.centerDialogVisible = false;
      if (this.$route.query.id == 1 || this.$route.query.id == 3) {
        var buyid = this.lm_list.id;
      } else {
        var buyid = this.jnlmD.id;
      }
      var data = {
        id: this.id,
        buy_id: buyid,
        number: this.number
      };
      toolsOrder(data)
        .then(res => {
          if (res.data.code == 200) {
            var orderSn = res.data.data;
            this.$router.push({
              path: `/payment`,
              query: { order_sn: orderSn, type: 3 }
            });
          } else if (res.data.code == 422) {
            this.$message.error(res.data.message);
          } else {
            this.$message.error("最多可购买" + this.tools.can_buy_num + "个");
          }
          //数据埋点
          var tool_spec = "";
          if (this.jnlmD || this.lm_list) {
            if (this.id == 1) {
              tool_spec = `会员等级:${this.lm_list.ml_name};有效期:${this.lm_list.expire}`;
            } else if (this.id == 3) {
              tool_spec = `设计师等级:${this.lm_list.ml_name};服务类型:${this.lm_list.expire}`;
            } else if (this.id == 2) {
              tool_spec = `类目个数:${this.number}个;有 效 期:${this.jnlmD
                .expire || this.lm_list.ml_name}`;
            }
          } else {
            tool_spec = "";
          }

          if (this.jnlmD) {
            var pic = this.jnlmD.price * this.number;
            pic = pic.toFixed(2);
          } else {
            var pic = this.lm_list.price;
          }

          dataEventTrack({
            referer: document.referrer,
            event_type: "click",
            kv: {
              router: this.$route.fullPath,
              rname: "确定购买",
              tool_id: this.id,
              tool_spec: tool_spec,
              tool_price: pic
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //类目数量
    blurNum() {
      this.numLM = "";
      if (this.number < 0) {
        this.number = 0;
      }
      this.numLM = this.number - this.tools.can_buy_num;
    },
    //取消弹窗
    submitdele() {
      this.centerDialogVisible = false;
    },
    // 提交订单
    markClickL(itemT, id) {
      this.id = this.$route.query.id;
      if (this.id) {
        var { href } = this.$router.resolve({
          path: "/tollMarket/marketShop/marketShop",
          query: { id: itemT.id }
        });
        window.open(href, "_blank");
      }
    },
    // 滚动
    showMediathr() {
      this.animateadMediathr = true;
      setTimeout(() => {
        this.dynamicNews.push(this.dynamicNews[0]);
        this.dynamicNews.shift();
        this.animateadMediathr = false;
      }, 1000);
    }
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.showMoney); // 清除定时器
  }
};
</script>
<style lang="less" scoped>
@import "marketShopScode.less";

.level_active {
  color: red;
}

.month_active {
  color: red;
}
</style>
<style lang="less">
.marketShop {
  .el-button {
    border-radius: 2px !important;
    font-size: 16px;
  }

  .tc_title {
    background: rgba(0, 0, 0, 0.5);
    &>.el-dialog {
      margin-top: 34vh !important;
      width: 426px !important;
      min-height: 220px;
      transform:translateY(0)!important;
      top: 0!important;
      .el-dialog__header {
        background: #f5f5f5;
        padding: 11px 20px 11px;
        .el-dialog__headerbtn {
          top: 12px !important;
          font-size: 20px !important;
        }
        .el-dialog__headerbtn:hover .el-dialog__close {
          color: #f3262d;
        }
      }

      .el-dialog__body {
        text-align: center;
        color: #666;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        padding: 23px 0 0 0;

        & > div {
          padding: 27px 0 0px 0;
        }

        & > div:nth-child(2) {
          color: #ff0027;
          display: flex;
          justify-content: center;
          font-size: 20px;
          line-height: 52px;
          height: 72px;
          overflow: hidden;

          p {
            font-size: 36px;
            line-height: 40px;
          }
        }
      }

      .dialog-footer {
        & > .el-button {
          padding: 8px 16px;
          background: #f3262d;
          border: 0;
          border-radius: 0;
          font-size: 14px;
        }
        .cubClick {
          margin: 26px 0;
        }
        & > .el-button:hover {
          background: #f43c42;
        }
      }
      .submitdele {
        display: block;
        margin-top: 35px;
      }
    }
  }
}
</style>

