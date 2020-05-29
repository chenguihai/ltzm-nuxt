<template>
  <div class="clues-detail-defalut">
    <div class="item-box-1">
      <div class="inner-box-1">
        <div class="left">
          <div class="avatar">
            <img
              v-if="avatar != null && avatar != ''"
              :src="avatar.indexOf('http')>-1?avatar:envVars.IMG_HOST+avatar+'?x-oss-process=image/resize,m_fill,h_164,w_164'"
              alt
            />
            <img v-else src="~assets/img/icon_sign_mobile.jpg" alt />
          </div>
          <p v-if="nick_name!=null">{{nick_name}}</p>
          <div class="icon-box">
            <div>
              <img
                title="已实名认证"
                v-if="cluesData.accountId == true"
                src="~assets/img/icon/smr1.png"
                alt="已实名认证"
              />
            </div>
            <div>
              <img title="已手机认证" src="~assets/img/icon/sjr1.png" alt="已手机认证" />
            </div>
            <div v-if="cluesData.bank != 0">
              <img title="已绑定银行卡" src="~assets/img/icon/yhk1.png" alt="已绑定银行卡" />
            </div>
          </div>
        </div>
        <div class="Right">
          <div>
            <div class="title">{{clueInfo.title}}</div>
            <div class="text">
              <span>线索费用</span>
              <span style="font-size:12px">￥{{clueInfo.budget_money}}</span>
            </div>
          </div>
          <div class="condition" v-if="clueInfo.status=='S' && clueInfo.clue_status != 'N'">
            <span class="color">距离截止：</span>
            <span>{{this.nD}}天{{this.nH}}小时{{this.nM}}分{{this.nS}}秒</span>
          </div>
          <div class="condition" v-else-if="clueInfo.status=='S' && clueInfo.clue_status == 'N'">
            <span>线索已关闭</span>
          </div>
          <div class="condition" v-else-if="clueInfo.status=='N'">
            <span>未审核</span>
          </div>
          <div class="condition reasonC" v-else-if="clueInfo.status=='Y'">
            <span>审核失败</span>
            <span :title="clueInfo.reason">原因：{{clueInfo.reason}}</span>
          </div>
          <div class="limit">
            <div class="addr" v-if="city != ''">
              <span>{{city}}</span>
              <strong>地域限制</strong>
              <div class="jiaoImg">
                <img src="../../../assets/img/back.png" alt />
              </div>
              <div class="boxHint" v-if="province === '北京'">
                <p>雇主要求{{province}}-{{city}}</p>
                <p v-if="province == '北京'">{{province}}-{{city}}的凌客优先</p>
              </div>
              <div class="boxHint" v-else>
                <p>雇主要求{{province}}-{{city}}</p>
                <p>{{province}}{{city}}的凌客优先</p>
              </div>
            </div>
            <div class="addr" v-if="clueInfo.grade != 0 && clueInfo.grade != null">
              <span>{{grade}}</span>
              <strong>等级限制</strong>
              <div class="jiaoImg">
                <img src="../../../assets/img/back.png" alt />
              </div>
              <div class="boxHint">
                <p>雇主要求{{grade}}以上</p>
                <p>{{grade}}以上的凌客可参与</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inner-box-2">
        <h3>线索信息</h3>
        <div class="table">
          <ul>
            <li>
              <div class="item">
                <span class="title">投放时间</span>
                <span class="esTime">
                  <i>{{clueInfo.clue_start_time}}</i> 至
                  <i>{{clueInfo.clue_end_time}}</i>
                </span>
              </div>
              <div class="item">
                <span class="title">投放预算</span>
                <span class="n-border">{{clueInfo.budget_money}}元</span>
              </div>
            </li>
            <li>
              <div class="item">
                <span class="title">联系人</span>
                <span class>{{clueInfo.name}}</span>
              </div>
              <div class="item">
                <span class="title">客户领域</span>
                <span class="n-border">{{clueInfo.sr_name}}</span>
              </div>
            </li>
            <li>
              <div class="item">
                <span class="title">客户类型</span>
                <span v-if="clueInfo.type_id ==1">直客公司</span>
                <span v-else-if="clueInfo.type_id ==3">4A公司</span>
                <span v-else-if="clueInfo.type_id ==2">中间商（非4A公司）</span>
              </div>
              <div class="item">
                <span class="title">联系方式</span>
                <span
                  class="n-border colorRed linh"
                  v-if=" message=='LoginBossOk' || message=='LoginPayOk'"
                >
                  <p v-if="clueInfo.mobile!='隐藏'">手机号：{{clueInfo.mobile}}</p>
                  <p v-if="clueInfo.qq!= null && clueInfo.qq!= ''">QQ：{{clueInfo.qq}}</p>
                  <p v-if="clueInfo.wechat!= null&&clueInfo.wechat!= ''">微信：{{clueInfo.wechat}}</p>
                  <p v-if="clueInfo.email!= null&&clueInfo.email!= ''">邮箱：{{clueInfo.email}}</p>
                </span>
                <span class="n-border colorRed" v-else>购买线索可见</span>
              </div>
            </li>
            <li>
              <div class="item2">
                <span class="title">媒体类型</span>
                <span style="width: 772px;padding: 12px;">
                  <span>{{classWe.cate_name}}&nbsp;&gt;&nbsp;</span>
                  <span v-if="classW !=undefined && classW.length>0">{{classW.cate_name}}：</span>
                  <span v-for="(item , index) in sort" :key="index">
                    {{item.cate_name}}
                    <p :class="index===sort.length-1?'deleted':''">，</p>
                  </span>
                </span>
              </div>
            </li>
            <li>
              <div class="item2">
                <span class="title">投放区域</span>
                <span style="width: 772px;">
                  <p v-for="(item , index) in region" :key="index">
                    <em v-if="item.city_id != 100000">{{item.city_id}}</em>
                    <em v-else>全国</em>
                    <i :class="index===region.length-1?'deleted':''">，</i>
                  </p>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="inner-box-3">
        <h3>线索需求</h3>
        <p v-html="clueInfo.content"></p>
      </div>

      <div class="inner-box-4" v-if="message=='LoginBossOk' && need != undefined && need.length >0">
        <h3>
          补充线索
          <span></span>
        </h3>
        <div v-for="(item , index) in need" :key="index">
          <p v-if="item.status == 1">
            <span>{{ item.created_at}} 客服审核通过</span>
            <span>{{item.content}}</span>
          </p>
          <p v-else-if="item.status == 2" class="resCol">
            <span>
              {{item.created_at}} 客服审核未通过
              <i>原因：{{item.reason}}</i>
            </span>
            <span>{{item.content}}</span>
          </p>
          <p v-else class="resCol">
            <span>{{ item.created_at}}客服未审核</span>
            <span>{{item.content}}</span>
          </p>
        </div>
      </div>
      <div
        class="inner-box-4"
        v-if="message!='LoginBossOk' && otherClue.clueNeed != undefined && otherClue.clueNeed.length >0"
      >
        <h3>
          补充线索
          <span></span>
        </h3>
        <div v-for="(item , index) in otherClue.clueNeed" :key="index">
          <p v-if="item.status == 1">
            <span>{{item.created_at}} 客服审核通过</span>
            <span>{{item.content}}</span>
          </p>
          <p v-else-if="item.status == 2 && message=='LoginBossOk'">
            <span>
              {{item.created_at}} 客服审核未通过
              <i>原因：{{item.reason}}</i>
            </span>
            <span>{{item.content}}</span>
          </p>
        </div>
      </div>
      <div class="inner-box-5">
        <h3>附件下载</h3>
        <div class="updown">
          <p v-for="(item , index) in annex" :key="index">
            <a
              v-if="item.annex0 != null && item.annex0 != ''"
              :href="item.annex0"
              target="_blank"
              download="logo1.png"
            >
              附件1
              <span></span>下载
            </a>
            <a v-else>暂无数据</a>
            <a
              v-if="item.annex1 != null && item.annex1 != ''"
              :href="item.annex1"
              target="_blank"
              download="logo2.png"
            >
              附件2
              <span></span>下载
            </a>
            <a
              v-if="item.annex2 != null && item.annex2 != ''"
              :href="item.annex2"
              target="_blank"
              download="logo3.png"
            >
              附件3
              <span></span>下载
            </a>
            <a
              v-if="item.annex3 != null && item.annex3 != ''"
              :href="item.annex3"
              target="_blank"
              download="logo4.png"
            >
              附件4
              <span></span>下载
            </a>
            <a
              v-if="item.annex4 != null && item.annex4 != ''"
              :href="item.annex4"
              target="_blank"
              download="logo5.png"
            >
              附件5
              <span></span>下载
            </a>
          </p>
          <br />
          <br />
          <div class="bottom">
            <div v-if="message !='LoginBossOk'">
              <!-- 游客状态 -->
              <p v-if="message =='notLoginOk' && clueInfo.clue_status == 'Y' ">
                距离截止：
                <span>{{this.nD}}天{{this.nH}}小时{{this.nM}}分{{this.nS}}秒</span>
              </p>
              <!-- 线索已关闭，无法购买 -->
              <p class="imgflxe" v-else-if="clueInfo.clue_status == 'N' && message !='LoginBossOk'">
                <img width="16" height="16" src="../../../assets/img/gantan.png" alt />线索已关闭，无法购买
              </p>
              <!-- 能购买线索状态 -->

              <!-- 条件不符合 ，无法购买 -->
              <p
                v-else-if="clueInfo.clue_status == 'Y' && message !='LoginBossOk' && message !='LoginPayOk' && intercept != ''"
                class="imgflxe"
              >
                <img width="16" height="16" src="../../../assets/img/gantan.png" alt />很抱歉，条件不符合购买线索
              </p>
              <p class="buyClue" v-else-if="intercept == '' && message !='LoginBossOk'">
                <i>
                  <img width="16" height="16" src="../../../assets/img/resimg.png" alt />
                  您现在可以购买线索
                </i>
                <i>
                  <img width="16" height="16" src="../../../assets/img/gantan.png" alt />
                  现在正在购买线索期间
                </i>
              </p>
              <!-- 已购买状态 -->
              <P class="imgflxe" v-else-if="message =='LoginPayOk'">
                <img width="16" height="16" src="../../../assets/img/gantan.png" alt />您已购买线索，可以联系雇主了
              </P>
              <!-- 条件不符  ，  不能购买   不是雇主本人 -->
              <button
                v-if="intercept != '' && message !='LoginBossOk' && message !='notLoginOk'"
                disabled
                style="background:#DFDFDF;"
              >购买线索</button>
              <!--线索关闭 , 不能购买    不是雇主本人 -->
              <button
                v-else-if="clueInfo.clue_status == 'N' && message !='LoginBossOk' "
                disabled
                style="background:#DFDFDF;"
              >购买线索</button>
              <!-- 已购买状态 -->
              <button v-else-if="message =='LoginPayOk'" disabled style="background:#DFDFDF;">购买线索</button>
              <!-- 条件符合 可以购买 -->
              <button v-else-if="intercept == '' && message !='LoginBossOk'" @click="buyCule">购买线索</button>
              <!-- 游客状态 -->
              <button
                v-if="message =='notLoginOk'  && clueInfo.clue_status == 'Y' "
                @click="buyCule"
                style="background:#f3262d;"
              >购买线索</button>
            </div>
          </div>
          <div class="bottom-text">
            <div>
              <i></i>
              <span>发布时间：{{clueInfo.created_at}}</span>
            </div>
            <div>
              <img src="../../../assets/img/bian.png" alt />
              <span>线索编号：{{clueInfo.id}}</span>
            </div>
            <div
              v-if="clueInfo.collect_status == 0 && message !='LoginBossOk'"
              class="collet"
              @click="colletClick($event)"
            >
              <img src="../../../assets/img/icon/xxbh.png" alt />
              <span class="collet">收藏线索</span>
            </div>
            <div
              class="collet detail-collect"
              @click="colletClick($event)"
              v-else-if="clueInfo.collect_status == 1 && message !='LoginBossOk'"
            >
              <img src="../../../assets/img/icon/xxbh.png" alt />
              <span class="collet detail-collect">取消收藏</span>
            </div>
            <div @click="reportClick" v-if="message !='LoginBossOk'">
              <img src="../../../assets/img/icon/jbxs.png" alt />
              <span>举报线索</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--线索购买-->
    <div class="item-box-2">
      <div class="top-box">
        <h3>
          线索购买
          <span>({{clueInfo.pay_number}})</span>
        </h3>
      </div>
      <div
        class="img-box"
        v-if="otherClue.payClueShop !==undefined && otherClue.payClueShop.length > 0"
      >
        <i class="el-icon-arrow-left nextser left" v-if="otherClue.payClueShop.length >10"></i>
        <div class="swiper-container gallery-thumbs case-swbox"  v-swiper:swiper="swiperOption">
          <div class="swiper-wrapper">
            <nuxt-link
              tag="a"
              class="swiper-slide"
              v-for="(item , index) in otherClue.payClueShop"
              :key="index"
              :to="{path:'/shop/'+item.id}"
              :title="item.store_name"
              target="_blank"
            >
              <img
                v-if="item.logo != null && item.logo != ''"
                :src="envVars.IMG_HOST+item.logo"
                alt
              />
              <img v-else src="../../../assets/img/userDataImg.png" alt="默认头像" />
            </nuxt-link>
          </div>
        </div>
        <i class="el-icon-arrow-right prevser right" v-if="otherClue.payClueShop.length >10"></i>
      </div>
      <div class="img-box" v-else>
        <div class="tbodyNone">
          <img class="noneImg" src="../../../assets/img/pintouge.png" alt />
          <p>暂无数据</p>
        </div>
      </div>
    </div>

    <!-- 因以下原因，您暂时不能参与任务 -->
    <div
      class="item-box-3"
      v-if="intercept != ''&& clueInfo.clue_status != 'N' && message =='LoginNotPayOk'"
    >
      <h3>因以下原因，您暂时不能参与任务</h3>
      <p class="msg">温馨提示：完成条件后，刷新本页面查看您的最新参与资格</p>
      <div class="item-box">
        <div class="item" v-for="(item , index) in intercept" :key="index">
          <div>
            <span v-if="index == 'shop'" class="text">店</span>
            <span v-else-if="index == 'city'" class="text">域</span>
            <span v-else-if="index == 'class'" class="text">技</span>
            <span v-else class="text">级</span>
          </div>
          <div v-if="index == 'shop'" class="p-text">
            <p>您还没有开通店铺</p>
            <p>请前往开通店铺</p>
          </div>
          <div v-else-if="index == 'city'" class="p-text">
            <p>您地域不符合</p>
            <p>请选择符合地域线索</p>
          </div>
          <div v-else-if="index == 'class'" class="p-text">
            <p>技能标签不符合</p>
            <p v-if="classWe !=''">请加入{{classWe.cate_name}}类目</p>
          </div>
          <div v-else class="p-text">
            <p>您凌客等级不符合</p>
            <p>请参与更多的线索提升等级</p>
          </div>
          <div class="btn-box">
            <nuxt-link tag="button" to="/store?storeIndex=index" v-if="index == 'shop'">去提交</nuxt-link>
            <nuxt-link tag="button" to="/clues" v-else-if="index == 'city'">去选择</nuxt-link>
            <nuxt-link
              tag="button"
              to="/store/skill?storeIndex=skill"
              v-else-if="index == 'class'"
            >去加入</nuxt-link>
            <nuxt-link tag="button" to="/clues" v-else>去参与</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  cluepaysn,
  commonCollect,
  commonTipOffs,
  accountExp
} from "@/api/list";
import area from "@/assets/js/area";
import { mapState } from "vuex";
import dataEventTrack from "@/utils/dataEventTrack";

export default {
  props: ["cluesDataList", "messages"],
  data() {
    return {
      cluesData: this.cluesDataList,
      clueInfo: "",
      otherClue: "",
      avatar: "",
      area: JSON.parse(JSON.stringify(area)),
      name: "",
      intercept: "",
      message: this.messages,
      nD: 0,
      nH: 0,
      nM: 0,
      nS: 0,
      nMS: "",
      flag: false,
      city: "",
      province: "",
      level: [],
      grade: "",
      sort: [],
      classW: [],
      classWe: "",
      region: [],
      city_name: [],
      timen: [],
      clueTime: [],
      annex: [],
      need: [],
      nick_name: "",
      swiperOption: {
        slidesPerView: 10,
        spaceBetween: 27,
        navigation: {
          nextEl: `.right`,
          prevEl: `.left`
        }
      }
    };
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    })
  },
  mounted() {
    this.init();
    this.countTime();
    const {
      path = "",
      params: { id = "" }
    } = this.$route;
    dataEventTrack({
      referer: document.referrer,
      event_type: "page_show",
      kv: {
        router: path,
        clues_id: id
      }
    });
  },
  methods: {
    init() {
      this.clueInfo = this.cluesData.clueInfo;
      this.otherClue = this.cluesData.otherClue;
      var result = [];
      for (var i = 0; i < this.otherClue.payClueShop.length; i += 20) {
        result.push(this.otherClue.payClueShop.slice(i, i + 20));
      }
      this.need = this.cluesData.need;
      this.nick_name = this.otherClue.bossInfo.nick_name;
      this.avatar = this.otherClue.bossInfo.avatar;
      this.name = this.otherClue.bossInfo.name;
      this.sort = this.cluesData.last.sort;
      this.classWe = this.cluesData.last.class[0];
      this.classW = this.cluesData.last.class[0];
      this.region = this.cluesData.last.region;
      this.intercept = this.cluesData.intercept;
      this.annex = this.otherClue.annex;
      this.level = this.cluesData.level;
      this.funfor();
      this.citiData();
    },
    funfor() {
      if (this.level) {
        for (var i = 0; i < this.level.length; i++) {
          if (this.level[i].id == this.clueInfo.grade) {
            this.grade = this.level[i].bl_name;
          }
        }
      }

      for (var i = 0; i < this.region.length; i++) {
        var a = this.region[i];
        for (var k = 0; k < area.length; k++) {
          var b = area[k].child;
          if (area[k].id == a.city_id) {
            a.city_id = area[k].name;
          } else {
            if (area[k].child && b != "") {
              for (var j = 0; j < b.length; j++) {
                if (a.city_id == b[j].id) {
                  a.city_id = b[j].name;
                }
              }
            }
          }
        }
      }
    },
    countTime() {
      // 获取当前时间
      let date = new Date();
      let now = date.getTime();
      // 设置截止时间
      let endDate = new Date(this.clueInfo.end_time); // 需要倒计时的日期
      let end = endDate.getTime();
      // 时间差
      let leftTime = end - now;
      // 定义变量 保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        this.nD = parseInt(leftTime / 1000 / 60 / 60 / 24);
        // 时
        let h = parseInt((leftTime / 1000 / 60 / 60) % 24);
        this.nH = h < 10 ? "0" + h : h;
        // 分
        let m = parseInt((leftTime / 1000 / 60) % 60);
        this.nM = m < 10 ? "0" + m : m;
        // 秒
        let s = parseInt((leftTime / 1000) % 60);
        this.nS = s < 10 ? "0" + s : s;
      } else {
        this.nD = 0;
        this.nH = "00";
        this.nM = "00";
        this.nS = "00";
      }
      // 等于0的时候不调用
      if (
        Number(this.nH) === 0 &&
        Number(this.nD) === 0 &&
        Number(this.nM) === 0 &&
        Number(this.nS) === 0
      ) {
        return;
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
      }
      setTimeout(this.countTime, 1000);
    },
    // 时间格式化
    // 查找城市
    citiData() {
      for (var i = 0; i < area.length; i++) {
        var a = area[i].child;
        if (a) {
          for (var j = 0; j < a.length; j++) {
            if (a[j].id == this.clueInfo.city_id) {
              this.city = a[j].name;
              this.province = area[i].name;
            }
          }
        }
      }
    },
    // 购买线索
    buyCule() {
      var data = {
        clueid: this.clueInfo.id,
        cluename: this.clueInfo.title
      };
      cluepaysn(data)
        .then(res => {
          if (res.data.code == 200) {
            var order_sn = res.data.data.order_sn;
            this.$router.push("/payment?order_sn=" + order_sn + "&type=1");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
      const {
        path = "",
        params: { id = "" }
      } = this.$route;
      dataEventTrack({
        referer: document.referrer,
        event_type: "click",
        kv: {
          router: path,
          clues_id: id,
          clues_price: this.clueInfo.budget_money
        }
      });
    },
    colletClick(e) {
      if (e.target.className.indexOf("detail-collect") == -1) {
        e.target.className = "collet detail-collect";
        var data = {
          type: "2",
          collect_id: this.clueInfo.id,
          cancel: "0"
        };
        commonCollect(data)
          .then(res => {
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
            } else {
              e.target.innerHTML = "取消收藏";
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        e.target.className = "collet";
        var data = {
          type: "2",
          collect_id: this.clueInfo.id,
          cancel: "1"
        };
        commonCollect(data)
          .then(res => {
            if (res.data.code != 200) {
              this.$message.error(res.data.message);
            } else {
              e.target.innerHTML = "收藏线索";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 举报
    reportClick() {
      let data = {
        project_type: "3",
        project_id: this.clueInfo.id
      };
      commonTipOffs(data)
        .then(res => {
          if (res.data.code == 200) {
            sessionStorage.setItem("historyUrl", this.$route.fullPath);
            var { href } = this.$router.resolve({
              path: "/report",
              query: { type: "3", id: this.clueInfo.id }
            });
            window.open(href, "_blank");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    cluesDataList(newVal) {
      this.cluesData = newVal;
      this.init();
      this.countTime();
    },
    messages(newVal) {
      this.messages = newVal;
      this.init();
      this.countTime();
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../assets/css/clues/detail/adminScode";
.detail-collect {
}
</style>
<style lang="less">
.item-box-2 {
  position: relative;
  & > .img-box {
    & > .left,
    & > .right {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 15px;
      background: #999;
      color: #fff;
      border: 1px solid rgba(241, 241, 241, 1);
      position: absolute;
      right: 0;
      top: 0;
      text-align: center;
      cursor: pointer;
    }
    & > .left {
      right: 60px;
    }
    & > .right {
      right: 30px;
    }
    & > .left:focus,
    & > .right:focus {
      border: 1px solid rgba(241, 241, 241, 1);
    }
    & > .case-swbox {
      margin-left: 16px;
      margin-right: 16px;
      width: 862px;
      max-height: 206px;
      display: flex;
      flex-wrap: wrap;
      & > .swiper-wrapper {
        width: 100%;

        & > .swiper-slide {
          width: 60px !important;
          margin-right: 16px;
          cursor: pointer;
          & > img {
            display: block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid #e3e1df;
          }
          & > span {
            width: 152px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            word-wrap: break-word;
            font-size: 12px;
            color: #666;
            height: 33px;
            margin: 5px 0 5px 0;
          }
          & > :nth-child(3) {
            font-size: 16px;
            line-height: 16px;
            color: #ff0027;
            display: flex;
            & > .detail-btn {
              width: 14px;
              height: 14px;
              border: 1px solid #ddd;
              margin-right: 5px;
              margin-top: 1px;
            }
            & > .detail-selected {
              border: 1px solid #f3262d !important;
              background: url("../../../assets/img/redgou.png") no-repeat 100%;
            }
            & > .hasBuy {
              width: 14px;
              height: 14px;
              border: 1px solid #ddd;
              margin-right: 5px;
              margin-top: 1px;
              background: url("../../../assets/img/ServGetDetailsPage/disa.png");
            }
          }
        }
        & > .swiper-slide:lase-child {
          margin-right: 0;
        }
      }
    }
    & > .detail-btn,
    & > .detail-batn {
      width: 14px;
      height: 14px;
      border: 1px solid #ddd;
      margin-right: 5px;
      margin-top: 1px;
    }
    & > .detail-selected,
    & > .detail-sele {
      border: 1px solid #f3262d !important;
      background: url("../../../assets/img/redgou.png") no-repeat 100%;
    }
  }
}
</style>
<style lang="css">
@import "@/assets/css/swiper5.3.css";
</style>

