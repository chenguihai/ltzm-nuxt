<template>
  <!-- 服务详情页服务左侧-->
  <ul class="ServGetDetShopData_left">
    <li>
      <div class="shopData">
        <a class="shopData_rou" :href="'/shop/'+storeData.id" target="_blank">
          <img
            src="@/assets/img/userDataImg.png"
            v-lazy="storeData.logo+'?x-oss-process=image/resize,m_fill,h_255,w_255'"
            :alt="storeData.store_name"
            :title="storeData.store_name"
          />
          <div class="pop_up" @click="popUpClick()">进入店铺</div>
        </a>
        <div >{{storeData.store_name}}</div>
        <div>
          <div class="bl_name">{{bl_name}}</div>
          <div
            :class="['type_id_1',storeData.type_id === 1 ? 'c_personal':'c_company']"
            v-if="storeData.type_id == 1"
          >个人</div>
          <div class="type_id_2" v-else>企业</div>
          <div class="vipLevel" v-if="storeData.vip_level!= null">
            <img :src="envVars.IMG_HOST+storeData.vip_level.icon" alt />
          </div>
          <div class="marginsum">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huanyingyebaozhengjin" class="ccccc" />
            </svg>
            <p>{{parseInt(storeData.marginsum)}}</p>
          </div>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dizhi" class="ccccc" />
          </svg>
          {{storeData.shortname}}
        </div>
      </div>
      <div class="company" v-if="shopList.mediaCompanyShortName != ''">
        <span>隶属媒体公司</span>
        <span>
          {{shopList.mediaCompanyShortName}}
          <img title="已实名认证" src="../../assets/img/icon/smr2.png" alt="已实名认证" />
        </span>
      </div>
      <div class="Mname" v-if="proof.mediaNum != 0">
        <span>店铺拥有证书</span>
        <ul>
          <li v-if="proof.mediaNum != 0">
            <p>{{proof.mediaNum}}个媒介证书</p>
            <p>媒介证书</p>
          </li>
          <li v-for="(item , index) in proof.honorTypeNum.filter(item=>item.count)" :key="index">
            <p>
              <span>{{item.count}}</span>个<span>{{item.type_name}}</span>
            </p>
            <p>{{item.type_name}}</p>
          </li>
        </ul>
      </div>
      <div class="company aptitude copy" v-if="shopList.mediaAptitudeType != ''">
        <div>当前服务媒介资质</div>
        <div v-if="shopList.intell == 0">
          <p>直营媒体</p>
          <p class="color">直营</p>
        </div>
        <div v-else-if="shopList.intell == 1">
          <p>一级代理</p>
          <p class="color1">一级代理</p>
        </div>
        <div v-else-if="shopList.intell == 2">
          <p>二级代理</p>
          <p class="color2">二级代理</p>
        </div>
        <div v-else-if="shopList.intell == 3">
          <p>其他</p>
          <p class="color3">其他</p>
        </div>
      </div>
      <div class="shopGrade" v-if="comments">
        <span>服务评分</span>
        <div class="gradeS">
          <div class="gradeS_left">
            <span>{{comments.avgScore|twoFixed}}</span>
            <rate-cpn :pass="comments.avgScore" />
            <p>
              (
              <i>{{shopList.commentsNum}}</i>条评价 )
            </p>
          </div>
          <div class="gradeS_right">
            <span>
              服务态度：
              <span>{{comments.quality |twoFixed}}</span>分
            </span>
            <span>
              工作速度：
              <span>{{comments.speed |twoFixed}}</span>分
            </span>
            <span>
              完成质量：
              <span>{{comments.attitude |twoFixed}}</span>分
            </span>
          </div>
        </div>
      </div>
    </li>
    <li>
      <span class="spanA">联系客服</span>
      <div class="callMy" v-if="customer_services.length > 0">
        <a
          v-for="(itemC , index) in customer_services"
          :key="index"
          :href="`tencent://message/?uin=${itemC.kf_account}&Site=none&Menu=yes`"
          class="rl"
          target="_blank"
        >
          <img src="../../assets/img/qqT.png" alt />
          <p>{{itemC.kf_name}}</p>
        </a>
      </div>
      <div class="fws_not" v-else>
        <div>店铺暂时还未添加客服QQ哦</div>
      </div>
    </li>
    <li>
      <span class="spanA">店铺热销</span>
      <div class="hotCakes">
        <ul>
          <li v-if="hotServiceList.length == 0" class="fws_not">「暂无数据」</li>
          <a
            v-else
            v-for="(itemH , index) in hotServiceList"
            :key="index"
           :href="`/service/${itemH.id}?id=${storeData.id}`"
            target="_blank"
          >
            <div>
              <span class="hotCakesStat1" v-if="index == 0">1</span>
              <span class="hotCakesStat2" v-else-if="index == 1">2</span>
              <span class="hotCakesStat3" v-else-if="index == 2">3</span>
              <span class="hotCakesStat4" v-else>{{index+1}}</span>
              <img
                src="@/assets/img/img_bg.png"
                v-lazy="itemH.img+'?x-oss-process=image/resize,m_fill,h_156,w_260'"
                :alt="itemH.name"
                :title="itemH.name"
              />
            </div>
            <span>{{itemH.name}}</span>
            <div>
              <div>
                <i>成交量:</i>
                <span>{{itemH.deal_num}}</span>
              </div>
              <p>
                <span :title="`￥${parseInt(itemH.price)}/${itemH.unit_name}`">
                  ￥{{parseInt(itemH.price)}}
                  <i>/{{itemH.unit_name}}</i>
                </span>
              </p>
            </div>
          </a>
        </ul>
      </div>
    </li>
    <li>
      <span class="spanA">最近上新</span>
      <div class="newProduct">
        <ul>
          <li v-if="newServiceList.length == 0" class="fws_not">「暂无数据」</li>
          <a
            v-else
            v-for="(itemH , index) in newServiceList"
            :key="index"
            :href="`/service/${itemH.id}?id=${storeData.id}`"
            target="_blank"
          >
            <div>
              <img
                src="@/assets/img/img_bg.png"
                v-lazy="itemH.img+'?x-oss-process=image/resize,m_fill,h_156,w_260'"
                :alt="itemH.name"
                :title="itemH.name"
              />
            </div>
            <div>
              <span>{{itemH.name}}</span>
              <span>
                <span :title="`￥${parseInt(itemH.price)}/${itemH.unit_name}`" style="display: flex;">
                  ￥{{parseInt(itemH.price)}}<i>/{{itemH.unit_name}}</i>
                </span>
              </span>
            </div>
          </a>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapState } from "vuex";

export default {
  inject: ["dataLIST"],
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  data() {
    return {
      dataLIS: this.dataLIST || "",
      storeData: this.dataLIST[1] || "", //店铺信息
      shopList: this.dataLIST[0] || "", //详情页信息
      flages: true,
      bl_name: this.dataLIST[1].shopLevel.bl_name || "",
      tag: "",
      icon: "",
      proof: this.dataLIST[0].proof || "",
      score: 0,
      hotServiceList: this.dataLIST[0].hotServiceList || "", //店铺热销
      newServiceList: this.dataLIST[0].newServiceList || "", //最近上新
      customer_services: this.dataLIST[1].customer_services || [],
      comments: this.dataLIST[0].comments || ""
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    this.init();
  },
  filters: {
    twoFixed: num => {
      if (isNaN(+num)) {
        return "0.00";
      }
      return (+num).toFixed(2);
    }
  },
  methods: {
    init() {
      // 保证金取整
      this.storeData.marginsum = parseInt(this.storeData.marginsum);
      this.score = this.comments && this.comments.avgScore;
    },

    //店铺跳转
    shopClick() {
      var { href } = this.$router.resolve("/shop/" + this.storeData.id);
      window.open(href, "_blank");
    },
    // 服务跳转
    shopListClick(itemH, index) {
      var { href } = this.$router.resolve({
        path: "/service/" + itemH.id,
        query: { id: this.storeData.id }
      });
      window.open(href, "_blank");
    },
    popUpClick(){
         var { href } = this.$router.resolve({
        path: "/shop/" + this.storeData.id,
      });
      window.open(href, "_blank");
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
@import "../../assets/css/ServGetDetailsPage/ServGetDetShopDataleftScode.less";

.fws_not {
  padding: 30px 10px 50px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #666;
}
</style>

