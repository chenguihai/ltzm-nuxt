<template>
  <div class="clues-hall">
    <ul class="item-box user_select">
      <li class="item" :class="{'colordisplayTerri':displayTerri}">
        <div class="inner-item">
          <strong>线索分类</strong>
          <div>
            <ol>
              <li>
                <span :class="{tterriNav:territoryIndex == -1}" @click="delatC">全部</span>
                <div class="inner_item">
                  <span
                    v-for="(itemC , indexC) in terriNav"
                    :key="indexC"
                    @click="territoryClick(itemC,indexC)"
                    :class="{tterriNav:territoryIndex == indexC}"
                  >{{itemC.cate_name}}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div
          v-show="clueSeleClass !=undefined &&clueSeleClass.length > 6"
          @click="showAlltory = !showAlltory"
          class="tory chang"
        >
          <p>{{wordT}}</p>
          <div class="changeIcon">
            <svg class="icon_s" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" />
            </svg>
            <svg class="icon_y" aria-hidden="true">
              <use xlink:href="#icon-xiangyoudianji-xuanzhong" />
            </svg>
          </div>
        </div>
      </li>
      <li class="item" :class="{'colordisplayTerri':displayMoney}">
        <div class="inner-item">
          <strong>投放预算</strong>
          <div>
            <ol>
              <li>
                <span :class="{tterriNav:terriMoneyIndex == -1}" @click="delatM">全部</span>
                <div class="inner-item">
                  <span
                    v-for="(itemM , indexM) in terriMoney"
                    :key="indexM"
                    @click="terriMoneyClick(itemM,indexM)"
                    :class="{tterriNav:terriMoneyIndex == indexM}"
                  >{{indexM}}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div
          v-show="clueSeleMoney.length > 6"
          @click="showAllMoney = !showAllMoney"
          class="tory chang"
        >
          <p>{{wordM}}</p>
          <div class="changeIcon">
            <svg class="icon_s" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" />
            </svg>
            <svg class="icon_y" aria-hidden="true">
              <use xlink:href="#icon-xiangyoudianji-xuanzhong" />
            </svg>
          </div>
        </div>
      </li>
      <li class="item">
        <div class="inner-item">
          <strong>发布时间</strong>
          <div>
            <ol>
              <li>
                <span :class="{tterriNav:terrItemIndex == -1}" @click="delatT">全部</span>
                <div class="inner-item">
                  <span
                    v-for="(itemI , indexI) in clueSeleTime"
                    :key="indexI"
                    @click="terrItemClick(itemI , indexI)"
                    :class="{tterriNav:terrItemIndex == indexI}"
                  >{{indexI}}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </li>
      <li class="item" :class="{'colordisplayTerri':displayType}">
        <div class="inner-item">
          <strong>线索类型</strong>
          <div>
            <ol>
              <li>
                <span :class="{tterriNav:terrTypeIndex == -1}" @click="delatY">全部</span>
                <div class="inner-item">
                  <span
                    v-for="(itemY , indexY) in terriType"
                    :key="indexY"
                    @click="terrTypeClick(itemY,indexY)"
                    :class="{tterriNav:terrTypeIndex == indexY}"
                  >{{itemY.customer_type}}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div
          v-show="clueSeleType.length > 6"
          @click="showAllType = !showAllType"
          class="tory chang"
        >
          <p>{{wordT}}</p>
          <div class="changeIcon">
            <svg class="icon_s" aria-hidden="true">
              <use xlink:href="#icon-xiangxia" />
            </svg>
            <svg class="icon_y" aria-hidden="true">
              <use xlink:href="#icon-xiangyoudianji-xuanzhong" />
            </svg>
          </div>
        </div>
      </li>
    </ul>
    <ul class="item-box2">
      <span v-show="flagBox">当前筛选</span>
      <div>
        <div class="spanF" v-show="flagC" @click="delatC">
          线索分类:
          <span>{{classData.cate_name}}</span>
          <div class="icon_box">
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
        <div class="spanF" v-show="flagM" @click="delatM">
          投放预算:
          <span>{{moneyData}}</span>
          <div class="icon_box">
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
        <div class="spanF" v-show="flagT" @click="delatT">
          发布时间:
          <span>{{timeData}}</span>
          <div class="icon_box">
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
        <div class="spanF" v-show="flagY" @click="delatY">
          线索分类:
          <span>{{typeData.customer_type}}</span>
          <div class="icon_box">
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
      </div>
      <span class="delatAll" v-show="flagALL" @click="delatAll">清空筛选</span>
    </ul>
    <div class="item-box3">
      <div class="left">
        <div
          v-for="(item , index) in pxtab"
          :key="index"
          @click="shopSctiveC(item)"
          :class="['shopSc',{shopSctiveC:typePX=== item.type}]"
        >
          {{item.name}}
          <span
            v-show="index >0"
            :class="['iconIndex','iconfont',typePX=== item.type && sort=== 'asc' ? 'icon-pingfenxiangshang':'icon-pingfenxiangxia']"
          ></span>
        </div>
      </div>
      <div class="search">
        <el-input v-model="searchVal" placeholder="搜索线索"></el-input>
        <div @click="searchClick">
          <img src="~assets/img/search.png" alt />
        </div>
      </div>
    </div>
    <div class="item-box4">
      <div>价格/标题</div>
      <div>模式/状态</div>
      <div>快速操作</div>
    </div>
    <div class="item-box5">
      <ul v-if="showList.length > 0">
        <li v-for="(item , index) in showList" :key="index">
          <a :href="`/clues/${item.id}`" target="_blank" class="msg">
            <div class="titleText">
              <span class="num">¥ {{item.budget_money}}</span>
              <em :title="item.title">{{item.title}}</em>
              <div class="yell yell_top boxMoney" v-show="item.top !=null && item.top !='N'">顶</div>
              <div class="boxMoney" v-show="item.go !=null && item.go !='N'">急</div>
              <div class="yell addr boxMoney" v-show="item.city_id !=null && item.city_id != 0">
                域
                <div class="boxHintBox">
                  <div class="jiaoImg">
                    <img src="../../assets/img/back.png" alt />
                  </div>
                  <div class="boxHint" v-if="item.province === '北京'">
                    <p>雇主要求{{item.province}}-{{item.city}}</p>
                    <p v-show="item.province == '北京'">{{item.province}}-{{item.city}}的凌客优先</p>
                  </div>
                  <div class="boxHint" v-else>
                    <p>雇主要求{{item.province}}-{{item.city}}</p>
                    <p>{{item.province}}-{{item.city}}的凌客优先</p>
                  </div>
                </div>
              </div>
              <div class="yell addr boxMoney" v-show="item.grade !=null && item.grade !=0">
                级
                <div class="boxHintBox">
                  <div class="jiaoImg">
                    <img src="../../assets/img/back.png" alt />
                  </div>
                  <div class="boxHint">
                    <p>雇主要求{{grade}}以上</p>
                    <p>{{grade}}以上的凌客可参与</p>
                  </div>
                </div>
              </div>

              <div class="yell boxMoney" v-show="item.service !=null && item.service !='N'">办</div>
            </div>
            <div class="center">
              <span class="customer_type">
                客户领域：
                <span class="font-cl">{{item.customer_type}}</span>
              </span>
              <span class="clue_start_time">
                投放时间：
                <p class="font-cl">{{item.clue_start_time}}</p>至
                <p class="font-cl">{{item.clue_end_time}}</p>
              </span>
            </div>
            <div class="payN">
              <span>{{item.number}}</span>
              <span>
                人浏览/
                <p class="pay_number">{{item.pay_number}}</p>人已购买线索
              </span>
            </div>
          </a>
          <div class="mod">
            <strong>信息模式</strong>
            <div class="center" v-if="item.clue_status == 'Y'&&(item.nD || item.nH)">
              <span>{{item.nD}}</span>天
              <span>{{item.nH}}</span>小时购买线索截止
            </div>
            <p class="centerT" v-else>已截止购买</p>
            <p class="created_at">发布时间：{{item.created_at}}</p>
          </div>
          <div class="maneuver" @mousemove="titleName(item)">
            <div class="maneuver_top user_select">
              <span class="mr_10" href="javascript:;" @click="lickClue(item)">我有类似需求</span>
              <span
                v-if="item.collect_status == 0"
                class="collet"
                @click="collectClick(item , $event)"
              >收藏</span>
              <span v-else class="collet detail-collect" @click="collectClick(item , $event)">取消收藏</span>
            </div>
            <no-ssr>
              <share :config="config" v-if="config" />
            </no-ssr>
          </div>
        </li>
      </ul>
      <div class="dataNone searNodata" v-else>
        <img width="90" height="115" src="../../assets/img/pintouge.png" alt />
        <p v-if="!this.keywords">暂无数据</p>
        <p class="noData" v-else>抱歉，没有找到“<i>{{this.$route.query.keywords}}</i>”对应的线索，请试试其他关键词试试</p>
        <a v-if="this.keywords" href="/clues?page=1">去全国广告线索大厅看看</a>
      </div>
    </div>
    <div class="clues-hall-box" v-show=" flagPage">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        prev-text="上一页"
        next-text="下一页"
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        v-loading.fullscreen.lock="fullscreenLoading"
      ></el-pagination>
      <div class="custom">
        <div>
          共{{total}}条,到
          <el-input v-model="input1"></el-input>页
          <a href="javascript:;" @click="pageSizeClick">确定</a>
        </div>
      </div>
    </div>
    <div class="box" v-show="flagClue ">
      <div class="coller">
        <div class="header">
          <span>提示信息</span>
          <span @click="clueClose" class="iconfont icon-guanbi"></span>
        </div>
        <div class="center">
          <div>
            <img src="../../assets/img/gou.png" alt />
            {{clueTitle}}
          </div>
          <span @click="clueClose">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  clueShowhead,
  clueShowlist,
  clueInquire,
  commonCollect,
  homeimage
} from "@/api/list";
import area from "@/assets/js/area";
import share from "@/components/component/share";
import dataEventTrack from "@/utils/dataEventTrack";
let count_http = 0;
import { mapState } from "vuex";

export default {
  components: { share },

  inject: [
    "showListL",
    "pageSizeL",
    "totalL",
    "pageL",
    "levelL",
    "numtalL",
    "flagPageL",
    "clueSeleClass",
    "clueSeleMoney",
    "clueSeleTime",
    "clueSeleType",
    "lastPage"
  ],

  data() {
    return {
      searchVal: "",
      clueSeleClass: this.clueSeleClass,
      clueSeleMoney: this.clueSeleMoney,
      clueSeleTime: this.clueSeleTime,
      clueSeleType: this.clueSeleType,
      showAlltory: false,
      showAllMoney: false,
      showAllType: false,
      displayTerri: false,
      displayMoney: false,
      displayType: false,
      territoryIndex: -1,
      terriMoneyIndex: -1,
      terrItemIndex: -1,
      terrTypeIndex: -1,
      classData: "", //当前筛选
      moneyData: "", //当前筛选
      timeData: "", //当前筛选
      typeData: "", //当前筛选
      flagC: false,
      flagM: false,
      flagT: false,
      flagY: false,
      flagALL: false,
      flagBox: false,
      flagClue: false,
      showList: this.showListL,
      pageSize: this.pageSizeL, //每页显示条数
      page: this.pageL,
      total: this.totalL, //总条目数
      numtal: this.numtalL,
      input1: "",
      flagPage: false,
      money: "",
      classd: 0,
      time: "",
      type: 0,
      dataS: "",
      title: "",
      pxtab: [
        { name: "综合", type: "default" },
        { name: "发布时间", type: "created_at" },
        { name: "剩余时间", type: "end_time" },
        { name: "参与数", type: "pay_number" },
        { name: "价格", type: "budget_money" }
      ],
      searchData: [],
      iconFlagC: 1,
      iconFlagH: 1,
      iconFlagJ: 1,
      iconFlagG: 1,
      activeIndex: 0,
      sort: "", // 排序方式
      nD: 0,
      nH: 0,
      nM: 0,
      nS: 0,
      clueData: [],
      city: "",
      province: "",
      level: this.levelL,
      grade: 0,
      area: JSON.parse(JSON.stringify(area)),
      clueTitle: "收藏成功",
      typePX: "default",
      isLoading: false,
      titleShare: "线索",
      idShare: "0",
      params: {},
      lastPageD: this.lastPage,
      fullscreenLoading: false,
      config: {},
      ad_img: "",
      keywords:this.$route.query.keywords,
    };
  },
  created() {
    const { page, keywords = "", _sel = "" } = this.$route.query;
    if (!page) {
      this.params = {
        page: this.page
      };
      if (page > this.lastPageD) {
        this.params.page = this.lastPageD;
      } else {
        this.params.page = page || 1;
      }
      this.replaceRouter();
    } else {
      if (keywords) {
        this.params = {
          keywords,
          _sel,
          page: this.page
        };

        if (page > this.lastPageD) {
          this.params.page = this.lastPageD;
          this.page = this.lastPageD;
        } else {
          this.params.page =  1;
        }
        this.replaceRouter();
      } else {
        this.params = {
          page: this.page
        };
        if (page > this.lastPageD) {
          this.params.page = this.lastPageD;
        } else {
          this.params.page = page || 1;
        }
        this.replaceRouter();
      }
    }
  },
  mounted() {
    var type = "27";
    homeimage(type)
      .then(res => {
        if (res.data.code == 200) {
          this.ad_img = res.data.data.ad_img;
          this.config = {
            url: location.origin + `/clues/${this.idShare || ""}`,
            title: `${this.titleShare}`,
            description: `我在凌天众媒网发现一条不错的广告投放需求，赶快来看看`,
            image: this.envVars.IMG_HOST + this.ad_img,
            summary: `我在凌天众媒网发现一条不错的广告投放需求，赶快来看看`
          };
        }
      })
      .catch(err => {
        console.log(err);
      });
      
    this.showList = this.showListL;
    this.pageSize = this.pageSizeL;
    this.total = this.totalL;
    this.page = this.pageL;
    this.numtal = this.numtalL;
    this.flagPage = this.flagPageL;
    this.funfor();
    if (this.page > this.lastPageD) {
      this.params.page = this.lastPageD;
      this.page = this.lastPageD;
      this.replaceRouter();
      this.clueShowlistUrl();
    } else if (this.page < 1) {
      this.params.page = 1;
      this.page = 1;
      this.replaceRouter();
      this.clueShowlistUrl();
    } else {
      if (count_http === 0) {
        this.eventTrackCommon();
        count_http = 1;
      }
    }
  },
  methods: {
    eventTrackCommon() {
      const {
        path = ""
      } = this.$route;
      const [tabName = "", sortName = ""] = this.dataS.split(",");
      dataEventTrack({
        referer: document.referrer,
        event_type: "list_show",
        kv: {
          router: path,
          tab: tabName || "default", //排序条件：综合、发布时间、剩余时间、参与者、价格
          ids: this.showList.map(item => item.id), //	传数组对象
          sort: sortName, //值为（asc/desc)，表示按升序/降序排列
          pageno: this.page //	列表页当前分页页数（从1开始计数）
        }
      });
    },
    replaceRouter() {
      this.$router.replace({
        name: this.$route.name,
        query: this.params
      });
    },
    async init() {
      //获取筛选列表
      let clueS = await clueShowhead();
      const { code, message, data } = clueS.data;
      if (code != 200) return this.$message.error(message);
      this.clueSeleClass = data.class;
      this.clueSeleMoney = data.money;
      this.clueSeleTime = data.time;
      this.clueSeleType = data.type;
    },
    //线索列表-主线（线索分页）
    clueShowlistUrl() {
      if (!this.$route.query.keywords) {
        var page = this.page;
        clueShowlist(page)
          .then(res => {
            if (res.data.code == 200) {
              const {
                level,
                list: { data, per_page, total, current_page }
              } = res.data.data;
              this.showList = { ...data };
              this.pageSize = per_page;
              this.total = total;
              this.page = current_page;
              this.level = level;
              delete this.showList.level;
              this.replaceRouter();
              this.funfor();
              this.citiData();
              this.countTime();
              this.numtal = Math.ceil(
                Number(this.total) / Number(this.pageSize)
              );
              if (this.total < 10) {
                this.flagPage = false;
              } else {
                this.flagPage = true;
              }
              this.fullscreenLoading = false;
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
            this.eventTrackCommon();
          });
      } else {
        this.title = this.$route.query.keywords;

        this.clueInquireUrl();
        this.replaceRouter();
      }
    },
    titleName(item) {
      this.titleShare = item.title;
      this.idShare = item.id;
      this.config = {
        url: location.origin + `/clues/${item.id || ""}`,
        title: `${item.title}`,
        description: `我在凌天众媒网发现一条不错的广告投放需求，赶快来看看`,
        image: this.envVars.IMG_HOST + this.ad_img,
        summary: `我在凌天众媒网发现一条不错的广告投放需求，赶快来看看`
      };
    },
    
    // 线索列表-支线（筛选）
    async clueInquireUrl() {
      var money = this.money;
      var classd = this.classd;
      var time = this.time;
      var type = this.type;
      var dataS = this.dataS;
      var title = this.title;
      var page = this.page;
      let dataInq = await clueInquire(
        money,
        classd,
        time,
        type,
        dataS,
        title,
        page
      );
      const { code, message, data } = dataInq.data;
      this.isLoading = false;
      if (code != 200) {
        this.$message.error(message);
        return;
      }
      this.searchData = data.data;
      this.showList = this.searchData;
      this.pageSize = data.per_page;
      this.total = data.total;
      this.page = data.current_page;
      console.log(data)
      if (this.total < 10) {
        this.flagPage = false;
      } else {
        this.flagPage = true;
      }
      this.replaceRouter();
      this.funfor();
      this.countTime();
      this.eventTrackCommon();
      this.fullscreenLoading = false;
    },
    //当前筛选
    //线索分类
    territoryClick(itemC, indexC) {
      this.territoryIndex = indexC;
      this.flagC = true;
      this.flagALL = true;
      this.classData = itemC;
      this.classd = itemC.id;
      this.page = 1;
      this.title = "";
      this.clueInquireUrl();
      this.flageAll();
    },
    //投放预算
    terriMoneyClick(itemM, indexM) {
      this.terriMoneyIndex = indexM;
      this.flagM = true;
      this.flagALL = true;
      this.moneyData = indexM;
      this.money = itemM;
      this.page = 1;
      this.title = "";
      this.clueInquireUrl();
      this.flageAll();
    },
    //发布时间
    terrItemClick(itemI, indexI) {
      this.terrItemIndex = indexI;
      this.flagT = true;
      this.flagALL = true;
      this.timeData = indexI;
      this.time = itemI;
      this.page = 1;
      this.title = "";
      this.clueInquireUrl();
      this.flageAll();
    },
    //发布类型
    terrTypeClick(itemY, indexY) {
      this.terrTypeIndex = indexY;
      this.flagY = true;
      this.flagALL = true;
      this.typeData = itemY;
      this.type = itemY.id;
      this.page = 1;
      this.title = "";
      this.clueInquireUrl();
      this.flageAll();
    },
    delatC() {
      this.flagC = false;
      this.classData = "";
      this.classd = "";
      this.territoryIndex = -1;
      this.clueInquireUrl();
      this.flageAll();
    },
    delatM() {
      this.flagM = false;
      this.moneyData = "";
      this.money = "";
      this.terriMoneyIndex = -1;
      this.clueInquireUrl();
      this.flageAll();
    },
    delatT() {
      this.flagT = false;
      this.timeData = "";
      this.time = "";
      this.terrItemIndex = -1;
      this.clueInquireUrl();
      this.flageAll();
    },
    delatY() {
      this.flagY = false;
      this.typeData = "";
      this.type = "";
      this.terrTypeIndex = -1;
      this.clueInquireUrl();
      this.flageAll();
    },
    delatAll() {
      this.flagC = false;
      this.flagM = false;
      this.flagT = false;
      this.flagY = false;
      this.flagALL = false;
      this.classData = "";
      this.moneyData = "";
      this.timeData = "";
      this.typeData = "";
      this.money = "";
      this.classd = "";
      this.time = "";
      this.type = "";
      this.dataS = "";
      this.title = "";
      this.page = 1;
      this.territoryIndex = -1;
      this.terriMoneyIndex = -1;
      this.terrItemIndex = -1;
      this.terrTypeIndex = -1;
      this.clueShowlistUrl();
      this.flageAll();
    },
    flageAll() {
      if (
        this.flagC == false &&
        this.flagM == false &&
        this.flagT == false &&
        this.flagY == false
      ) {
        this.flagBox = false;
        this.flagALL = false;
      } else {
        this.flagBox = true;
        this.flagALL = true;
      }
    },
    //当前筛选
    // 排序

    shopSctiveC(item, index) {
      if (item.type === "default") {
        if (this.typePX === item.type) {
          //之前就选中了综合
          this.sort = "";
          this.dataS = "";
          this.typePX = "default";
          this.clueShowlistUrl();
          return;
        } else {
          this.typePX = "default";
          this.sort = "";
          this.dataS = "";
          this.clueShowlistUrl();
          return;
        }
      } else {
        if (this.typePX === item.type) {
          this.sort = this.sort === "asc" ? "desc" : "asc";
        } else {
          this.sort = "asc";
        }
        this.dataS = item.type + "," + this.sort;
        this.typePX = item.type;
      }

      this.page = 1;
      this.clueInquireUrl();
    },
    //排序
    // 关键字搜索
    searchClick() {
      if (this.isLoading) {
        return;
      }
      this.page = 1;
      this.isLoading = true;
      if (this.searchVal != "") {
        this.title = this.searchVal;
        this.clueInquireUrl();
      } else {
        this.searchVal = "";
        this.title = "";
        this.clueShowlistUrl();
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.params.page = val;
      this.title = this.searchVal;
      if (
        this.money != "" ||
        this.classd != "" ||
        this.time != "" ||
        this.type != "" ||
        this.dataS != "" ||
        this.title != ""
      ) {
        this.clueInquireUrl();
      } else {
        this.clueShowlistUrl();
      }
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 0;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
      this.fullscreenLoading = true;
    },
    pageSizeClick() {
      let inputValue =
        this.input1 > this.numtal
          ? this.numtal
          : this.input1 > 0
          ? this.input1
          : 1;
      this.input1 = inputValue;
      this.page = inputValue;
      this.title = this.searchVal;
      if (
        this.money != "" ||
        this.classd != "" ||
        this.time != "" ||
        this.type != "" ||
        this.dataS != "" ||
        this.title != ""
      ) {
        this.clueInquireUrl();
      } else {
        this.clueShowlistUrl();
      }
    },
    //倒计时
    countTime() {
      //获取当前时间
      for (var i = 0; i < this.showList.length; i++) {
        var now = new Date(); //本地时间
        //设置截止时间
        var end = new Date(Date.parse(this.showList[i].end_time)); //结束时间
        //时间差
        var nMS = parseInt((end.getTime() - now.getTime()) / 1000);
        //定义变量 d,h,m,s保存倒计时的时间
        if (nMS >= 0) {
          this.flag = true;
          this.nD = parseInt(nMS / (24 * 60 * 60));
          this.nH = parseInt((nMS / (60 * 60)) % 24);
          this.nM = parseInt((nMS / 60) % 60);
          this.nS = parseInt(nMS % 60);
          this.showList[i] = { ...this.showList[i], nD: this.nD, nH: this.nH };
        } else {
          this.flag = false;
        }
      }
    },
    // 我有类似需求
    lickClue(item) {
      this.clueData = [];
      this.clueData.push({ content: item.content }, { title: item.title });
      window.localStorage.setItem("clueData", JSON.stringify(this.clueData));
      var { href } = this.$router.resolve({ path: "/clues/release" });
      window.open(href, "_blank");
    },
    // 等级限制
    funfor() {
      var showList = [];
      for (let i in this.showList) {
        var o = {};
        o[i] = this.showList[i];
        showList.push(o[i]);
      }
      if (this.level) {
        for (var i = 0; i < this.level.length; i++) {
          for (var p = 0; p < showList.length; p++) {
            if (this.level[i].id == showList[p].grade) {
              this.grade = this.level[i].bl_name;
            }
          }
        }
        // }
      }
      for (var i = 0; i < area.length; i++) {
        var a = area[i].child;
        if (a != undefined) {
          for (var j = 0; j < a.length; j++) {
            for (var k = 0; k < showList.length; k++) {
              if (showList[k].city_id != null) {
                if (a[j].id == showList[k].city_id) {
                  var city = a[j].name;
                  var province = area[i].name;
                  showList[k] = { ...showList[k], city, province };
                }
              }
            }
          }
        }
      }
      this.showList = showList;
    },
    citiData() {},
    collectClick(item, e) {
      var ty = "";
      if (item.collect_status == 0) {
        var data = {
          type: "2",
          collect_id: item.id,
          cancel: "0"
        };
      } else {
        var data = {
          type: "2",
          collect_id: item.id,
          cancel: "1"
        };
      }

      commonCollect(data)
        .then(res => {
          if (res.data.data.status == 0) {
            this.$message.error(res.data.data.errorMsg);
          } else {
            this.flagClue = true;
            this.clueShowlistUrl();
            if (item.collect_status == 0) {
              this.clueTitle = "收藏成功";
            } else {
              this.clueTitle = "取消收藏成功";
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clueClose() {
      this.flagClue = false;
      this.clueTitle = "收藏成功";
    }
  },
  watch: {},
  computed: {
    ...mapState({ envVars: "envVariables" }),
    //线索分类更多
    terriNav: function() {
      if (this.showAlltory == false) {
        var terriNav = [];
        if (this.clueSeleClass != undefined && this.clueSeleClass.length > 6) {
          for (var y = 0; y < 6; y++) {
            terriNav.push(this.clueSeleClass[y]);
          }
        } else {
          terriNav = this.clueSeleClass;
        }

        return terriNav;
      } else {
        return this.clueSeleClass;
      }
    },
    wordT: function() {
      if (this.showAlltory == false) {
        //对文字进行处理
        this.displayTerri = false;
        return "更多";
      } else {
        this.displayTerri = true;
        return "收起";
      }
    },
    //投放预算
    terriMoney: function() {
      if (this.showAllMoney == false) {
        var terriMoney = [];
        if (this.clueSeleMoney != undefined && this.clueSeleMoney.length > 6) {
          for (var y = 0; y < 6; y++) {
            terriMoney.push(this.clueSeleMoney[y]);
          }
        } else {
          terriMoney = this.clueSeleMoney;
        }
        return terriMoney;
      } else {
        return this.clueSeleMoney;
      }
    },
    wordM: function() {
      if (this.showAllMoney == false) {
        //对文字进行处理
        this.displayMoney = false;
        return "更多";
      } else {
        this.displayMoney = true;
        return "收起";
      }
    },
    //线索类型
    terriType: function() {
      if (this.showAllType == false) {
        var terriType = [];
        if (this.clueSeleType != undefined && this.clueSeleType.length > 6) {
          for (var y = 0; y < 6; y++) {
            terriType.push(this.clueSeleType[y]);
          }
        } else {
          terriType = this.clueSeleType;
        }
        return terriType;
      } else {
        return this.clueSeleType;
      }
    },
    wordM: function() {
      if (this.showAllType == false) {
        //对文字进行处理
        this.displayType = false;
        return "更多";
      } else {
        this.displayType = true;
        return "收起";
      }
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/clues/clues-hall";
</style>
<style lang="less" scoped>
@import "../../assets/css/clues/clues-hallScode";
.searNodata{
    flex-direction: column!important;
    &>.noData{
        font-size: 14px;
        display: flex;
        margin-top: 10px;
        &>i{
            color: #006699;
        }
    }
    &>a{
        padding: 9px 11px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
        color: #666;
        margin-top: 25px;
        cursor: pointer;
    }
    &>a:hover{
        background: #f4f6f8;
    }
}
</style>
