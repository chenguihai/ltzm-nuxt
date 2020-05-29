<template>
  <div class="servGetTop">
    <div class="serv_header">
      <ul class="serv_category">
        <li v-if="showP" :title="dataLIST[0].position">{{dataLIST[0].position}}</li>
      </ul>
      <ul class="serv_stors">
        <li>
          <div :title="shopDataListA.store_name">{{shopDataListA.store_name}}</div>
          <div class="bl_name">{{shopLevel.bl_name}}</div>
          <div class="type_id_1" v-if="shopDataListA.type_id == 1">个人</div>
          <div class="type_id_2" v-else>企业</div>
          <div class="vipLevel" v-if="vipLevel != null">
            <img :src="envVars.IMG_HOST+vipLevel.icon" alt />
          </div>
          <div class="marginsum">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huanyingyebaozhengjin" class="ccccc" />
            </svg>
            <i>{{shopDataListA.marginsum}}</i>
          </div>
          <div class="shopNum">
            <p>店铺综合评分</p>
            <rate-cpn :pass="shopDataListA.score"/>
            <span class="score_text">{{shopDataListA.score | twoFixed}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pingfenxiangshang1" class="ccccc" />
            </svg>
            <!--弹框-->
            <div class="gradeData">
              <div class="shopGrade">
                <div class="shopGrade_z shopG w_127">
                  <span class="sgt_title">店铺综合评分</span>
                  <ul>
                    <li>
                      <p>完成质量：</p>
                      <p
                        :class="{'topColor':serviceStatistic.quality>0,'botColor':serviceStatistic.quality<0,'endColor':serviceStatistic.quality==0}"
                      >{{shopDataListA.quality | twoFixed}}</p>
                    </li>
                    <li>
                      <p>工作速度：</p>
                      <p
                        :class="{'topColor':serviceStatistic.speed>0,'botColor':serviceStatistic.speed<0,'endColor':serviceStatistic.speed==0}"
                      >{{shopDataListA.speed | twoFixed }}</p>
                    </li>
                    <li>
                      <p>服务态度：</p>
                      <p
                        :class="{'topColor':serviceStatistic.attitude>0,'botColor':serviceStatistic.attitude<0,'endColor':serviceStatistic.attitude==0}"
                      >{{shopDataListA.attitude | twoFixed }}</p>
                    </li>
                  </ul>
                </div>
                <div class="shopGrade_p shopG">
                  <span class="sgt_title">与行业相比</span>
                  <ul>
                    <li>
                      <p v-if="serviceStatistic.quality>0">高于</p>
                      <p v-else-if="serviceStatistic.quality<0">低于</p>
                      <p v-else>持平</p>
                      <p
                        :class="{'topColor':serviceStatistic.quality>0,'botColor':serviceStatistic.quality<0,'endColor':serviceStatistic.quality==0}"
                      >{{serviceStatistic.quality | abs}}%</p>
                      <svg v-if="serviceStatistic.quality>0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingfenxiangshang" class="ccccc" />
                      </svg>
                      <svg v-else-if="serviceStatistic.quality<0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingfenxiangxia" class="ccccc" />
                      </svg>
                      <span v-else class="fair_icon"></span>
                    </li>
                    <li>
                      <p v-if="serviceStatistic.speed>0">高于</p>
                      <p v-else-if="serviceStatistic.speed<0">低于</p>
                      <p v-else>持平</p>
                      <p
                        :class="{'topColor':serviceStatistic.speed>0,'botColor':serviceStatistic.speed<0,'endColor':serviceStatistic.speed==0}"
                      >{{serviceStatistic.speed|abs}}%</p>
                      <svg v-if="serviceStatistic.speed>0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingfenxiangshang" class="ccccc" />
                      </svg>
                      <svg v-else-if="serviceStatistic.speed<0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingfenxiangxia" class="ccccc" />
                      </svg>
                      <span v-else class="fair_icon"></span>
                    </li>
                    <li>
                      <p v-if="serviceStatistic.attitude>0">高于</p>
                      <p v-else-if="serviceStatistic.attitude<0">低于</p>
                      <p v-else>持平</p>
                      <p
                        :class="{'topColor':serviceStatistic.attitude>0,'botColor':serviceStatistic.attitude<0,'endColor':serviceStatistic.attitude==0}"
                      >{{serviceStatistic.attitude|abs}}%</p>

                      <svg v-if="serviceStatistic.attitude>0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingfenxiangshang" class="ccccc" />
                      </svg>
                      <svg v-else-if="serviceStatistic.attitude<0" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-pingfenxiangxia" class="ccccc" />
                      </svg>
                      <span v-else class="fair_icon"></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="service"
                v-if="shopDataListA.customer_services != undefined && shopDataListA.customer_services.length > 0"
              >
                <span>客服</span>
                <a
                  v-for="(item , index) in shopDataListA.customer_services"
                  :key="index"
                  :href="`tencent://message/?uin=${item.kf_account}&Site=none&Menu=yes`"
                  class="rl"
                  target="_blank"
                >
                  <img src="../../assets/img/qqT.png" alt />
                  <p>{{item.kf_name}}</p>
                </a>
              </div>
              <div class="service" v-else>
                <div class="service_title">客服</div>
                <div class="service_text">店铺暂时还未添加客服QQ哦</div>
              </div>
              <div v-if="false" class="cashDeposit">
                <div class="cash">
                  <div>
                    <svg class="icon icon_s" aria-hidden="true">
                      <use xlink:href="#icon-baozhengjinjiaona" class="ccccc" />
                    </svg>
                  </div>
                  <div>
                    <span>服务商已缴纳</span>
                    <span>
                      保证金：
                      <span class="deposit_num">{{shopDataListA.marginsum}}</span>
                    </span>
                  </div>
                </div>
                <div class="deposit">
                  <p>保障雇主权益，出问题</p>
                  <p>&nbsp;保证金赔付</p>
                </div>
              </div>
              <div class="serv_fws_wrap">
                <div class="top">
                  <img class="bzj-icon" src="~/assets/img/_bzj.png" />
                  <div>
                    <strong>服务商已缴纳</strong>
                    <p class="mg-box">
                      <span class="fs_12">保证金：</span>
                      <span class="margin-sum">{{shopDataListA.marginsum}}</span>
                    </p>
                  </div>
                </div>
                <div class="top-info">
                  <span>保障雇主权益，出问题</span>
                  <span class="margin-sum">&nbsp;保证金赔付</span>
                </div>
              </div>
            </div>
          </div>
          <a
            class="callMy"
            v-if="shopDataListA.customer_services!=undefined && shopDataListA.customer_services.length>0"
            :href="`tencent://message/?uin=${shopDataListA.customer_services&&shopDataListA.customer_services[0].kf_account}&Site=none&Menu=yes`"
            target="_blank"
          >
            <span class="iconfont icon-lianxiwo services"></span>
            <p>联系客服</p>
          </a>
          <div class="callMy user_select" v-else>
            <span class="iconfont icon-lianxiwo noSer"></span>
            <p title="该店铺尚未设置客服">联系客服</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { abs } from "~/utils/common-filters";
import rateCpn from "~/components/component/rateCpn";
export default {
  props: ["dataLIST", "showPosition"],
  inject: ["dataLIST"],
  components: { rateCpn },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      shopL: [],
      shopDataListA: this.dataLIST[1],
      icon: "",
      showP: true,
      vipLevel: "",
      shopLevel: "",
      storeId: "",
      serviceStatistic: ""
    };
  },
  created() {
    if (this.showPosition === false) {
      this.showP = false;
    }
    this.init();
  },
  methods: {
    init() {
      this.vipLevel = this.shopDataListA.vip_level;
      this.shopLevel = this.shopDataListA.shopLevel;
      this.serviceStatistic = this.shopDataListA.serviceStatistic;
      // 保证金取整
      if (this.vipLevel != null) {
        this.tag = this.vipLevel.tag;
        this.icon = this.vipLevel.icon;
      }
      this.shopDataListA.marginsum = parseInt(this.shopDataListA.marginsum);
    }
  },
  filters: {
    abs,
    twoFixed: num => {
      if (!num) {
        return "0.00";
      }
      return (+num).toFixed(2);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/ServGetDetailsPage/ServGetTopScode.less";
</style>
