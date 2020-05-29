<template>
  <div class="collect">
    <comHeader />
    <div class="collect_con">
      <LTnav />
      <div class="collect_right">
        <div class="collect_right_head">
          <span>我的收藏</span>
          <div class="collectSearch">
            <el-form :inline="true" :model="formInline" class="demo-form-inline collect_user">
              <el-form-item class="user_botw col_keyword">
                <el-input v-model="formInline.keyword" :placeholder="placeholder"></el-input>
              </el-form-item>
              <el-form-item class="col_submit">
                <el-button @click="onSubmit" :loading="isLoading">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sousuo" class="ccccc" />
                  </svg>
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="collect_right_con">
          <div class="collectTab">
            <ul>
              <li
                v-for="(item , index) in collectTab"
                :key="index"
                :class="{collectActive:collectIndex == index}"
                @click="collectClick(item , index)"
              >{{item}}</li>
            </ul>
          </div>
          <div class="serveList" v-if="collectIndex == 0 &&collectLict !=null">
            <ul v-if="collectLict != undefined && collectLict.length > 0">
              <li
                v-for="(item , index) in collectLict"
                :key="index"
                @click.stop="collectLClick(item , index)"
              >
                <div class="serImg">
                  <div class="serbox">
                    <span @click.stop="shopClick(item , index)">进入店铺</span>
                    <span @click.stop=" cancelClick(item, index)">取消收藏</span>
                  </div>
                  <img
                    v-if="item.lose_img != ''"
                    :src="envVars.IMG_HOST+item.lose_img+preFix+'m_fill,h_120,w_200'"
                    alt
                  />
                  <img v-else src="../../../assets/img/userDataImg.png" alt />
                </div>
                <span class="serTitle">{{item.lose_name}}</span>

                <div
                  class="serNum"
                  v-if="item.get_service_one !=undefined && item.get_service_one.length >0 &&item.get_service_one[0].shelf_status!= 0"
                >
                  <span>¥{{item.get_service_one[0].price}}</span>
                  <span>
                    成交量:
                    <p>{{item.get_service_one[0].deal_num}}</p>
                  </span>
                </div>
                <div class="serNum" v-else></div>
                <div
                  class="serContrast"
                  v-if="item.get_service_one !=undefined && item.get_service_one.length >0&& item.get_service_one[0].shelf_status!= 0"
                >
                  <div class="radio">
                    <div class="detail-batn" @click.stop="Checkbox($event ,item)"></div>对比
                  </div>
                  <div class="shopCar" @click.stop="carClick(item)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gouwuche" class="ccccc" />
                    </svg>
                    <p>加入购物车</p>
                  </div>
                </div>
                <div
                  class="shelf_status"
                  v-else-if="item.get_service_one !=undefined && item.get_service_one.length >0&& item.get_service_one[0].shelf_status== 0"
                >
                  <img src="../../../assets/img/shangxin.png" />
                  <span>此服务已下架</span>
                </div>

                <div class="shelf_status" v-else>
                  <img src="../../../assets/img/shangxin.png" />
                  <span>此服务已失效</span>
                </div>
              </li>
            </ul>
            <div class="none noneData" v-if="collectLict.length < 1 && name==''">
              <p style="width:197px">您还没有收藏过服务呢</p>
              <p style="width:197px">快去首页筛选进入服务大厅看看</p>
              <p style="width:197px">
                <i @click="serClick">去逛逛</i>
              </p>
            </div>
          </div>
          <div class="culeList" v-else-if="collectIndex == 1 &&cluesList !=null">
            <div class="culeHead span">
              <span>线索名称</span>
              <span>投放预算</span>
              <span>客户领域</span>
              <span>投放时间</span>
              <span class="buyTime">截止购买时间</span>
              <span>
                <p>操作</p>
              </span>
            </div>
            <div class="culeCon" v-if="cluesList != undefined && cluesList.length > 0">
              <ul>
                <li class="span" v-for="(item , index) in cluesList" :key="index">
                  <span @click="loseNameClick(item,index)">
                    <p>{{item.lose_name}}</p>
                  </span>
                  <span>¥{{item.get_clue.budget_money}}</span>
                  <span>{{item.get_clue.get_clue_realm[0].sr_name}}</span>
                  <span>
                    <p>{{item.get_clue.clue_start_time}}</p>至
                    <p>{{item.get_clue.clue_end_time}}</p>
                  </span>
                  <span>{{item.get_clue.end_time}}</span>
                  <span @click=" cancelClick(item, index)">
                    <p>取消收藏</p>
                  </span>
                </li>
              </ul>
            </div>
            <div class="none noneData" v-if="cluesList.length < 1 && name==''">
              <p style="width:197px">您还没有收藏过线索呢</p>
              <p style="width:197px">快去线索大厅看看</p>
              <p style="width:197px">
                <i @click="colClick">去逛逛</i>
              </p>
            </div>
          </div>
          <div class="shopList" v-else-if="collectIndex == 2 &&shopLict !=null">
            <div class="shopHead">
              <span>店铺名称／logo</span>
              <span>新上架的</span>
              <span>操作</span>
            </div>
            <div class="shopCon" v-if="shopLict != undefined && shopLict.length > 0 ">
              <ul>
                <li v-for="(item , index) in shopLict" :key="index">
                  <div class="shopCon_l">
                    <img
                      v-if="item.lose_img != '' && item.lose_img != null"
                      :src="envVars.IMG_HOST+item.lose_img+preFix+'m_fill,h_130,w_130'"
                      @click="shopdataClick(item , index)"
                      alt
                    />
                    <img v-else src="../../../assets/img/userDataImg.png" alt />
                    <div>
                      <span>
                        {{item.lose_name}}
                        <p>
                          <span class="iconfont icon-dizhi"></span>
                          {{item.city}}
                        </p>
                      </span>
                      <span
                        v-if="item.get_shop !=undefined && item.get_shop.length > 0 && item.get_shop[0].status ==1"
                      >
                        <p>
                          <i>{{item.get_shop[0].valueName.bl_name}}</i>
                          <img :src="envVars.IMG_HOST+item.get_shop[0].valueName.icon" alt />
                        </p>
                        <p class="typeOne" v-if="item.get_shop[0].status == 1">个人</p>
                        <p class="typeTow" v-else>企业</p>
                      </span>
                      <span
                        v-if="item.get_shop !=undefined && item.get_shop.length > 0 && item.get_shop[0].status ==1"
                      >
                        90天成交量:
                        <p>{{item.get_stores_data[0].sales_amount}}</p>| 好评率:
                        <p>{{item.get_stores_data[0].praise_rate}}%</p>
                      </span>
                      <span
                        v-if="item.get_shop !=undefined && item.get_shop.length > 0 && item.get_shop[0].status ==1"
                        @click="shopClick(item , index)"
                      >进入店铺</span>
                      <span v-else class="shangxin">
                        <img src="../../../assets/img/shangxin.png" />店铺已关闭
                      </span>
                    </div>
                  </div>
                  <div
                    class="shopCon_c"
                    v-if="item.get_service && item.get_shop && item.get_shop[0].status ==1"
                  >
                    <div
                      v-for="(itemG , index) in item.get_service"
                      :key="index"
                      v-if="index< 3"
                      @click="serviceData(itemG)"
                    >
                      <img
                        :title="itemG.name"
                        v-if="itemG.img != ''"
                        :src="envVars.IMG_HOST+itemG.img+preFix+'m_fill,h_66,w_112'"
                        alt
                      />
                      <img :title="itemG.name" v-else src="../../../assets/img/userDataImg.png" alt />
                      <span>￥{{itemG.price}}</span>
                    </div>
                  </div>
                  <div class="shopCon_c" v-else>
                    <span>暂无数据</span>
                  </div>
                  <div class="shopCon_r" @click="cancelClick(item , index)">
                    <span>取消收藏</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="none noneData" v-if="shopLict.length<1 && name==''">
              <p style="width:197px">您还没有收藏过店铺呢</p>
              <p style="width:197px">快去店铺大厅看看</p>
              <p style="width:197px">
                <i @click="shClick">去逛逛</i>
              </p>
            </div>
          </div>
          <div
            class="serveList caseList"
            v-else-if="(collectIndex == 3 || collectIndex == 4)&&caseHas !=null"
          >
            <ul v-if="caseHas != undefined && caseHas.length > 0">
              <li
                v-for="(item , index) in caseHas"
                :key="index"
                @click.stop="caseClick(item)"
                :title="item.lose_name"
              >
                <div class="serImg">
                  <div class="serbox">
                    <span @click.stop="shopClick(item , index)">进入店铺</span>
                    <span @click.stop=" cancelClick(item, index)">取消收藏</span>
                  </div>
                  <img
                    v-if="item.lose_img != ''"
                    :src="envVars.IMG_HOST+item.lose_img+preFix+'m_fill,h_120,w_200'"
                    alt
                  />
                  <img v-else src="../../../assets/img/userDataImg.png" alt />
                </div>
                <span class="serTitle">{{item.lose_name}}</span>
                <div
                  class="serNum"
                  v-if="item.get_case !=undefined && item.get_case.length >0 && item.get_case[0].on_sale!=0"
                >
                  <span>¥{{item.get_case[0].price}}</span>
                  <span>
                    成交量:
                    <p>{{item.get_case[0].deal_num}}</p>
                  </span>
                </div>
                <div class="serNum" v-else>
                  <span></span>
                  <span>
                    <p></p>
                  </span>
                </div>
                <div
                  class="serContrast"
                  v-if="item.get_case !=undefined && item.get_case.length >0 && item.get_case[0].on_sale!=0"
                >
                  <div class="caseCar">
                    <span class="iconfont icon-gouwuche1"></span>
                    <span @click.stop="carClick(item)">加入购物车</span>
                  </div>
                </div>
                <div class="serContrast" v-else>
                  <div class="caseCarNone">
                    <img src="../../../assets/img/shangxin.png" />
                    <span v-if="collectIndex == 3 ">案例已失效</span>
                    <span v-if="collectIndex == 4 ">传记已失效</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="none noneData" v-if="caseHas.length < 1 && name==''">
              <p style="width:197px" v-if="collectIndex == 3 ">您还没有收藏过案例呢</p>
              <p style="width:197px" v-if="collectIndex == 4 ">您还没有收藏过传记呢</p>
              <p style="width:197px">快去店铺大厅看看</p>
              <p style="width:197px">
                <i @click="shClick">去逛逛</i>
              </p>
            </div>
          </div>
          <div class="serveList issueList" v-else-if="collectIndex == 5 &&journalList !=null">
            <ul v-if="journalList != undefined && journalList.length > 0">
              <li
                v-for="(item , index) in journalList"
                :key="index"
                @click.stop="serveListClick(item)"
                :title="item.lose_name"
              >
                <div class="serImg">
                  <div class="serbox">
                    <span @click.stop="shopClick(item , index)">进入店铺</span>
                    <span @click.stop=" cancelClick(item, index)">取消收藏</span>
                  </div>
                  <img
                    v-if="item.lose_img != ''"
                    :src="envVars.IMG_HOST+item.lose_img+preFix+'m_fill,h_120,w_200'"
                    alt
                  />
                  <img v-else src="../../../assets/img/userDataImg.png" alt />
                  <span
                    v-if="item.get_journal_info !=undefined && item.get_journal_info.length >0 && item.get_journal_info[0].on_sale >0 && item.get_journal_info[0].duration != ''"
                  >{{formatTime(item.get_journal_info[0].duration)}}</span>
                </div>
                <span class="serTitle">{{item.lose_name}}</span>
                <div
                  class="serNum"
                  v-if="item.get_journal_info !=undefined && item.get_journal_info.length >0 && item.get_journal_info[0].on_sale >0"
                >
                  <span>¥{{item.get_journal_info[0].price}}</span>
                  <span>
                    成交量:
                    <p>{{item.get_journal_info[0].deal_num}}</p>
                  </span>
                </div>
                <div class="serNum serNumNone" v-else>
                  <img src="../../../assets/img/shangxin.png" />
                  <span>上刊画面已失效</span>
                </div>
              </li>
            </ul>
            <div class="none noneData" v-if="journalList.length < 1 && name==''">
              <p style="width:197px">您还没有收藏过上刊画面呢</p>
              <p style="width:197px">快去上刊画面大厅看看</p>
              <p style="width:197px">
                <i @click="journClick">去逛逛</i>
              </p>
            </div>
          </div>
          <div class="dataNone" v-if="flagData !=null&&flagData.length < 1 && name!=''">
            <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
            <p>暂无数据</p>
          </div>
          <div class="blockCollect" style="margin:30px 50px" id="block" v-if="flagB">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              background
              :page-size="pageSize"
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            ></el-pagination>
            <div class="custom">
              <span>
                共{{num}}页 , 到
                <el-input v-model="input1"></el-input>页
                <a class="subTotal" href="javascript:;" @click="pageSizeClick">确定</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <comFooter />
    <div class="pop-up" v-if="flag == true">
      <div class="popUpBox">
        <div class="header">
          <span>温馨提示</span>
          <span @click="iconGuanbi()" class="iconfont icon-guanbi"></span>
        </div>
        <div class="content">
          <span>您确定要取消收藏吗？</span>
          <div>
            <span @click="deletClick">确定</span>
            <span @click="iconGuanbi()">取消</span>
          </div>
        </div>
      </div>
    </div>
    <div class="comparison" v-if="closeL">
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
                <img
                  v-lazy="itemC.lose_img"
                  v-if="itemC.lose_img != null || itemC.lose_img != ''"
                  alt
                />
                <img v-else src="../../../assets/img/userDataImg.png" alt />
              </div>
              <div>
                <span>{{itemC.lose_name}}</span>
                <span>
                  ￥{{itemC.get_service_one[0].price}}
                  <p @click="deletItemC(itemC)">删除</p>
                </span>
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
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import LTnav from "@/components/component/LT_nav";
import area from "@/assets/js/area";
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { mapState } from "vuex";
import {
  collectStores,
  commonCollect,
  collectService,
  collectCase,
  addCart,
  collectCluee,
  collectJournal
} from "@/api/list";
import { downloadMixin } from "~/utils/common-mixins";
import dataEventTrack from "@/utils/dataEventTrack";
export default {
  components: {
    LTnav,
    comHeader,
    comFooter,
    sideBar
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  mixins: [downloadMixin()],
  data() {
    return {
      formInline: {
        keyword: ""
      },
      placeholder: "服务名称",
      collectTab: [
        "服务收藏",
        "线索收藏",
        "店铺收藏",
        "案例收藏",
        "传记收藏",
        "上刊画面收藏"
      ],
      collectIndex: 0,
      flagB: false,
      flag: false,

      pageSize: 10,
      page: 1,
      total: 0, //总条目数
      input1: 0,
      collectLict: null,
      area: JSON.parse(JSON.stringify(area)),
      type: "1",
      // 对比
      closeL: false,
      messageFlage: false, //对比提示
      messageMore: false, //对比提示
      comparisonList: [],
      item: "",
      name: "",
      caseHas: null,
      status: "1",
      cluesList: null,
      journalList: null,
      shopLict: null,
      flagData: null,
      preFix: "?x-oss-process=image/resize,",
      isLoading: false
    };
  },
  mounted() {
    this.serData();
  },
  methods: {
    // 服务收藏
    serData() {
      if (this.isLoading) {
        return;
      }
      var page = this.page;
      var name = this.name;
      this.isLoading = true;
      collectService(page, name)
        .then(res => {
          if (res.data.code == 200) {
            const {
              data = [],
              per_page = 0,
              total = 0,
              current_page = 1
            } = res.data.data;
            this.collectLict = data;
            this.flagData = this.collectLict || [];
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.num = Math.ceil(this.total / this.pageSize);
            this.flagB = !(this.total < 11);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    // 店铺收藏
    init() {
      var page = this.page;
      var name = this.name;
      this.isLoading = true;
      collectStores(page, name)
        .then(res => {
          if (res.data.code == 200) {
            const {
              data = [],
              per_page = 0,
              total = 0,
              current_page = 1
            } = res.data.data;
            this.shopLict = data;
            this.flagData = data;
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.num = Math.ceil(this.total / this.pageSize);
            this.flagB = !(this.total < 11);
            if (this.shopLict.length > 0) {
              for (var i = 0; i < this.shopLict.length; i++) {
                if (
                  this.shopLict[i].get_shop != undefined &&
                  this.shopLict[i].get_shop.length > 0
                ) {
                  var col = res.data.data.data;
                  for (var i = 0; i < area.length; i++) {
                    var a = area[i].child;
                    if (a != undefined) {
                      for (var j = 0; j < a.length; j++) {
                        for (var k = 0; k < col.length; k++) {
                          if (col[k].get_shop[0].city != null) {
                            if (a[j].id == col[k].get_shop[0].city) {
                              var city = a[j].name;
                              col[k] = {
                                ...col[k],
                                city
                              };
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            } else {
            }
            // 取省市

            this.shopLict = col || [];
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    // 收藏案例/传记
    case() {
      var page = this.page;
      var name = this.name;
      var type = this.type;
      this.isLoading = true;
      collectCase(page, name, type)
        .then(res => {
          if (res.data.code == 200) {
            const {
              data = [],
              per_page = 0,
              total = 0,
              current_page = 1
            } = res.data.data;
            this.caseHas = data || [];
            this.flagData = this.caseHas;
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.num = Math.ceil(this.total / this.pageSize);
            this.flagB = !(this.total < 11);
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    // 线索收藏
    clues() {
      var page = this.page;
      var name = this.name;
      this.isLoading = true;
      collectCluee(page, name)
        .then(res => {
          if (res.data.code == 200) {
            const {
              data = [],
              per_page = 0,
              total = 0,
              current_page = 1
            } = res.data.data;
            this.cluesList = data || [];
            this.flagData = this.cluesList;
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.num = Math.ceil(this.total / this.pageSize);
            for (var i in this.cluesList) {
              this.cluesList[i].get_clue = this.cluesList[i].get_clue[0];
            }
            this.flagB = !(this.total < 11);
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    // 上刊收藏
    journal() {
      var page = this.page;
      var name = this.name;
      this.isLoading = true;
      collectJournal(page, name)
        .then(res => {
          if (res.data.code == 200) {
            const {
              data = [],
              per_page = 0,
              total = 0,
              current_page = 1
            } = res.data.data;
            this.journalList = data || [];
            this.flagData = this.journalList;
            this.pageSize = per_page;
            this.total = total;
            this.page = current_page;
            this.num = Math.ceil(this.total / this.pageSize);
            this.flagB = !(this.total < 11);
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    onSubmit(formName) {
      this.page = 1;
      if (this.formInline.keyword == "") {
        this.name = "";
        this.typeList();
      } else {
        this.name = this.formInline.keyword;
        this.typeList();
      }
    },
    // tab切换
    collectClick(item, index) {
      this.flagB = false;
      this.collectLict = null;
      this.cluesList = null;
      this.caseHas = null;
      this.journalList = null;
      this.flagData = null;
      this.collectIndex = index;
      this.formInline.keyword = "";
      this.name = "";
      this.page = 1;
      if (this.collectIndex == 0) {
        this.placeholder = "服务名称";
        this.type = "1";
        this.status = "1";
        this.serData();
      } else if (this.collectIndex == 1) {
        this.placeholder = "线索名称";
        this.type = "2";
        this.clues();
      } else if (this.collectIndex == 2) {
        this.placeholder = "店铺名称";
        this.type = "3";
        this.init();
      } else if (this.collectIndex == 3) {
        this.placeholder = "案例名称";
        this.caseHas = null;
        this.type = "4";
        this.status = "2";
        this.case();
      } else if (this.collectIndex == 4) {
        this.placeholder = "传记名称";
        this.caseHas = null;
        this.status = "3";
        this.type = "5";
        this.case();
      } else if (this.collectIndex == 5) {
        this.placeholder = "上刊画面名称";
        this.type = "6";
        this.journal();
      }
    },
    //点击对比
    Checkbox(e, item) {
      this.messageMore = false;
      this.closeL = true;
      if (e.target.className.indexOf("detail-selected") == -1) {
        if (this.comparisonList.length < 4) {
          e.target.className = `detail-batn detail-selected ${item.id}`; //切换按钮样式
          e.currentTarget.parentElement.className = "radio radioF";
          this.comparisonList.push(item);
        } else {
          this.messageMore = true;
        }
      } else {
        e.target.className = "detail-batn";
        e.currentTarget.parentElement.className = "radio";
        for (var i = 0; i < this.comparisonList.length; i++) {
          var index = this.comparisonList[i].index;
          if (this.comparisonList[i].id == item.id) {
            this.comparisonList.splice(i, 1);
          }
          if (this.comparisonList.length < 1) {
            this.closeL = false;
          }
        }
      }
      if (this.comparisonList.length >= 2) {
        this.messageFlage = false;
        this.messageMore = false;
      } else if (this.comparisonList.length > 4) {
        this.messageFlage = false;
        this.messageMore = true;
      }
    },
    //清空对比
    deletList() {
      var a = document.querySelectorAll(".detail-batn");
      for (var i = 0; i < a.length; i++) {
        if ((a[i].className = "detail-batn detail-selected")) {
          a[i].className = "detail-batn";
        }
      }
      this.comparisonList = [];
      window.localStorage.setItem(
        "comparisonList",
        JSON.stringify(this.comparisonList)
      );
      this.closeL = false;
    },
    //关闭对比
    closeList() {
      this.closeL = false;
      this.messageFlage = false;
      this.messageMore = false;
    },
    // 跳转对比
    comparisonId() {
      this.messageFlage = false;
      var id = [];
      for (var i = 0; i < this.comparisonList.length; i++) {
        id.push(this.comparisonList[i].collect_id);
      }
      if (this.comparisonList.length < 2) {
        this.messageFlage = true;
      } else {
        var dataId = id;
        window.localStorage.setItem("dataId", JSON.stringify(dataId));
        var { href } = this.$router.resolve({
          path: "/category/comparison"
        });
        window.open(href, "_blank");
      }
    },
    // 删除单个对比
    deletItemC(itemC) {
      var a = document.getElementsByClassName(`${itemC.id}`);
      a[0].className = "detail-batn";
      for (var i = 0; i < this.comparisonList.length; i++) {
        var index = this.comparisonList[i].index;
        if (this.comparisonList[i].id == itemC.id) {
          this.comparisonList.splice(i, 1);
          if (this.comparisonList.length < 1) {
            this.closeL = false;
          }
        }
      }
    },
    //点击加入购物车
    async carClick(item) {
      var params = {
        type: this.status,
        goods_id: item.collect_id,
        num: 1,
        list: "1"
      };
      let carAdd = await addCart(params);
      const { code, message, data } = carAdd.data;
      if (code != 200) return this.$message.error(message);
      this.$message.success("成功加入购物车");
      var pri = "";
      var markPri = "";
      if (this.status == 1) {
        pri = item.get_service_one[0].price;
        dataEventTrack({
          referer: document.referrer,
          event_type: "click",
          kv: {
            router: `/userCenter/collect/collect`,
            rname: "加入购物车",
            item_type: "服务",
            id: item.collect_id,
            price:pri,
            service_spec: "1"
          }
        });
      } else {
        var typeN = "";
        if (this.status == 2) {
          typeN = "案例";
        } else if (this.status == 3) {
          typeN = "传记";
        }
        pri = item.get_case[0].price;
        dataEventTrack({
          referer: document.referrer,
          event_type: "click",
          kv: {
            router: `/userCenter/collect/collect`,
            rname: "加入购物车",
            item_type: typeN,
             price:pri,
            id: item.collect_id,
          }
        });
      }
    },
    collectLClick(item, index) {
      if (
        item.get_service_one != undefined &&
        item.get_service_one.length > 0 &&
        item.get_service_one[0].shelf_status != 0
      ) {
        var { href } = this.$router.resolve({
          path: "/service/" + item.collect_id,
          query: { id: item.store_id }
        });
        window.open(href, "_blank");
      } else {
        var { href } = this.$router.resolve({
          path: "/closeData/closeData",
          query: { type: 1 }
        });
        window.open(href, "_blank");
      }
    },
    serviceData(itemG) {
      var { href } = this.$router.resolve({
        path: "/service/" + itemG.id,
        query: { id: itemG.store_id }
      });
      window.open(href, "_blank");
    },
    // 跳转店铺
    shopClick(item, index) {
      var { href } = this.$router.resolve({ path: "/shop/" + item.store_id });
      window.open(href, "_blank");
    },
    shopdataClick(item, index) {
      if (
        item.get_shop != undefined &&
        item.get_shop.length > 0 &&
        item.get_shop[0].status == 1
      ) {
        var { href } = this.$router.resolve({ path: "/shop/" + item.store_id });
        window.open(href, "_blank");
      } else {
        var { href } = this.$router.resolve({
          path: "/closeData/closeData",
          query: { type: 2 }
        });
        window.open(href, "_blank");
      }
    },
    // 取消收藏
    deletClick() {
      var item = this.item;
      var id = "";
      if (
        this.type == "1" ||
        this.type == "2" ||
        this.type == "4" ||
        this.type == "5" ||
        this.type == "6"
      ) {
        id = item.collect_id;
      } else if (this.type == "3") {
        id = item.store_id;
      }
      var data = {
        type: this.type,
        collect_id: id,
        cancel: "1"
      };
      commonCollect(data)
        .then(res => {
          if (res.data.code == 200) {
            this.flag = false;
            this.typeList();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击打开取消弹窗
    cancelClick(item, index) {
      this.item = item;
      this.flag = true;
    },
    // 关闭取消窗口
    iconGuanbi() {
      this.flag = false;
    },
    typeList() {
      if (this.type == "1") {
        this.serData();
      } else if (this.type == "3") {
        this.init();
      } else if (this.type == "4" || this.type == "5") {
        this.case();
      } else if (this.type == "2") {
        this.clues();
      } else if (this.type == "6") {
        this.journal();
      }
    },
    // 分页器
    pageSizeClick() {
      this.page = this.input1;
      this.typeList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.input1 = this.page;
      this.typeList();
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top = 0;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    //线索详情页
    loseNameClick(item, index) {
      var { href } = this.$router.resolve({
        path: "/clues/" + item.collect_id
      });
      window.open(href, "_blank");
    },
    // 案例传记详情页
    caseClick(item) {
      if (
        item.get_case != undefined &&
        item.get_case.length > 0 &&
        item.get_case[0].on_sale != 0
      ) {
        var { href } = this.$router.resolve({
          path: "/case-biog/" + item.collect_id,
          query: { id: item.store_id }
        });
        window.open(href, "_blank");
      } else {
        var { href } = this.$router.resolve({
          path: "/closeData/closeData",
          query: { type: 3 }
        });
        window.open(href, "_blank");
      }
    },
    serveListClick(item) {
      if (
        item.get_journal_info != undefined &&
        item.get_journal_info.length > 0 &&
        item.get_journal_info[0].on_sale > 0
      ) {
        var { href } = this.$router.resolve({
          path: "/post/" + item.collect_id
        });
        window.open(href, "_blank");
      } else {
        var { href } = this.$router.resolve({
          path: "/closeData/closeData",
          query: { type: 5 }
        });
        window.open(href, "_blank");
      }
    },
    colClick() {
      var { href } = this.$router.resolve({
        path: "/clues?page=1"
      });
      window.open(href, "_blank");
    },
    shClick() {
      var { href } = this.$router.resolve({
        path: "/shop/list"
      });
      window.open(href, "_blank");
    },
    journClick() {
      var { href } = this.$router.resolve({
        path: "/post"
      });
      window.open(href, "_blank");
    },
    serClick() {
      var { href } = this.$router.resolve({
        path: "/"
      });
      window.open(href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
@import "./collectScode.less";
</style>
<style lang="less">
@import "../index.less";
</style>
<style lang="less">
.collect_user {
  margin-top: 27px;
  width: 265px;
  display: flex;
  & > .user_botw {
    margin-bottom: 8px !important;
  }
  & > .col_keyword {
    margin-right: 5px !important;

    & > .el-form-item__content {
      line-height: 36px;
      & > .el-input {
        & > .el-input__inner {
          width: 219px;
          height: 36px;
          line-height: 36px;
          border-radius: 0;
        }
        & > .el-input__inner:focus {
          border: 1px solid #5da6ff;
          outline: 0;
          box-shadow: 0px 0px 4px #5da6ff;
        }
      }
    }
  }
  & > .col_submit {
    margin: 0 0 0 -5px;
    & > .el-form-item__content {
      & > .el-button {
        padding: 0;
        width: 45px;
        height: 36px;
        border-radius: 0;
        background: #f4f4f4 !important;
        border-left: 0;
        & > span {
          & > .icon {
            width: 19px;
            height: 19px;
          }
        }
      }
      & > .el-button:focus {
        border: 1px solid #dcdfe6;
        border-left: 0;
        outline: 0;
      }
    }
  }
}
</style>
