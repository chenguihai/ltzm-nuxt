<template>
  <div class="detail-box" v-if="caseDetail">
    <div class="scd_left">
      <h2>{{caseDetail.case_name}}</h2>
      <div class="scd_item">
        <p class="scd_p">
          <span>客户：</span>
          <em>{{caseDetail.customer_name}}</em>
        </p>
        <p class="scd_p">
          <span>客户领域：</span>
          <em>{{caseDetail.sr_name}}</em>
        </p>
        <p class="scd_p">
          <span>示例分类：</span>
          <em>{{caseDetail.cate_name}}</em>
        </p>
        <div @click="clickReport" class="flex_1">
          <span class="scd_report">举报</span>
        </div>
      </div>
      <pre v-html="caseDetail.desc"></pre>
      <div class="fy">
        <a href="javascript:;" @click="prevCase">
          上一个：{{caseDetail.prev ? caseDetail.prev.case_name :
          '无'}}
        </a>
        <a href="javascript:;" @click="nextCase">
          下一个：{{caseDetail.next ? caseDetail.next.case_name :
          '无'}}
        </a>
      </div>
    </div>
    <aside class="scd_right">
      <div class="scd_top">
        <p>合作费用：</p>
        <strong>¥{{caseDetail.price}}</strong>
      </div>
      <shop-fws :showLogo="false" :showFws="false"></shop-fws>
      <side-list
        class="scd_side"
        :sId ="shopId"
        :list="caseDetail.hotServiceList"
        :type="0"
        :link="`/shop/${shopId}/all`"
      ></side-list>
    </aside>
  </div>
</template>

<script>
import { storeInfoInit, getCaseDetail, defaultAsync } from "~/api/async-server";
import { mapState } from "vuex";
import sideList from "~/components/shop/sideList";
import shopFws from "~/components/shop/shopFws";
import { report } from "~/api/report";

export default {
  layout: "user-shop",
  name: "shop-cooperate-detail",
  head() {
    const { store_name = "" } = this.storeInfo;
    const {
      customer_name = "",
      sr_name = "",
      cate_name = ""
    } = this.caseDetail;
    return {
      title: `${cate_name}合作示例 - ${store_name} - 凌天众媒网`,
      meta: [
        { name: "referrer", content: "no-referrer" },
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网${store_name}服务商合作案例，${sr_name}${customer_name}在${cate_name}合作示例`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${cate_name}合作示例，${customer_name}，${sr_name}，凌天众媒网`
        }
      ]
    };
  },
  data() {
     const { caseid } =this.$route.params;
     const { shopid } =this.$route.query;
    const regExp = /(\d+)$/gi;
    const regResult = caseid.match(regExp);
    const workId = regResult ? regResult[0] : undefined;
    return {
      selectId: +workId,
      shopId: +shopid,
      caseDetail: ''
    };
  },
  components: {
    sideList,
    shopFws
  },
  computed: {
    ...mapState(["storeInfo"])
  },
  
  async fetch(app) {
    const { shopid } = app.query;
    // const workId = regResult ? regResult[0] : undefined;
    if (!shopid) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, shopid).catch(e => console.log(e));
  },
  async asyncData(app) {
    const { shopid } = app.query;
    const { caseid } = app.params;
    /* 获取店铺首页 */
    const errCon = { statusCode: 500, message: "合作详情加载失败,请重试" };
    // const caseDetail = await defaultAsync(app, ["workId"], getCaseDetail)
    const caseDetailRes = await getCaseDetail(app, caseid)
    
        .catch(
        e => {
            if (e && e.data) {
            errCon.message = e.data.message;
            }
            app.error(errCon);
        }
        );
        if(!caseDetailRes.data.data) return
    const caseDetail = caseDetailRes ? caseDetailRes.data.data : '';
    // var case_id = workId
    // const caseDetail = await getCaseDetail(app,case_id)
    //  console.log('11111111',caseDetail)
    // if (!caseDetail) return;
   
    return !caseDetail
      ? app.error(errCon)
      : { caseDetail };
  },
  created(){
    if (this.caseDetail == '') {    
      this.$router.push({
        path: "/closeData/closeData",
        query: { type: 7 }
      });
    }
  },
  methods: {
    clickReport() {
      const REPORT_TYPE = 5;
      let data = {
        project_type: REPORT_TYPE,
        project_id: this.selectId
      };
      report.tipOffs(data).then(res => {
        const { code, message } = res.data;
        if (code === 200) {
          sessionStorage.setItem('historyUrl',this.$route.fullPath)
            var { href } = this.$router.resolve({
            path: "/report",
            query: { type: REPORT_TYPE, id: this.selectId }
          });
            window.open(href, "_blank");
        } else {
          this.$message.error(message);
        }
      });
    },
    nextCase() {
      if (!this.caseDetail.next) return false;
      this.$router.push({
        path: `/shopwork/${this.caseDetail.next.id}?shopid=${this.shopId}`
      });
      return false;
    },
    prevCase() {
      if (!this.caseDetail.prev) return false;
      this.$router.push({
        path: `/shopwork/${this.caseDetail.prev.id}?shopid=${this.shopId}`
      });
      return false;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const dataRes = await getCaseDetail(undefined, this.selectId);
    const data = dataRes ? dataRes.data.data : '';
    if (!data) return this.$message.error("获取数据失败");
    this.caseDetail = data;
    next();
  }
};
</script>

<style scoped lang="less">
.detail-box {
  width: 1210px;
  margin: 20px auto 50px;
  display: flex;
}

.scd_left {
  padding: 20px;
  position: relative;

  flex: 1;
  background: #fff;
  margin-right: 20px;

  h2 {
    font-size: 24px;
    color: #333;
    padding-bottom: 10px;
  }

  pre {
    margin-top: 50px;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #666;
    font-size: 14px;
    line-height: 24px;
    padding-bottom: 50px;
    width: 100%;

    /deep/ img {
      margin-top: 20px;
      max-width: 100%;
    }
  }

  .fy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 30px;
    left: 20px;
    right: 20px;
    margin: auto;

    a {
      text-decoration-line: none;
      color: #666;
      font-size: 14px;

      &:hover {
        color: #ff0027;
      }
    }
  }
}

.scd_right {
  width: 277px;
  .scd_side {
    margin-bottom: 0;
  }
}

.scd_top {
  background: #fff;
  padding: 20px 10px;
  color: #666;
  font-size: 16px;
  border: 1px solid #eee;

  strong {
    font-size: 28px;
    color: #ff0027;
  }
}

.scd_item {
  display: flex;
}
.scd_p {
  span {
    color: #999;
    font-size: 14px;
  }

  em {
    font-size: 14px;
    color: #666;
    margin-right: 40px;
  }
}
.scd_report {
  cursor: pointer;
  float: right;
  color: #666;

  &:hover {
    color: #ff0027;
  }
}
.flex_1 {
  flex: 1;
}
</style>
