<template>
  <div>
    <comHeader />
    <div class="top-wrap">
      <span class="top-title">全国广告线索大厅</span>
    </div>
    <div class="parent">
      <clues-hall class="leftClue" />
      <clues-side class="rightClue" />
    </div>
     <side-bar ref="sideBar"></side-bar>
    <com-footer />
  </div>
</template>
<script>
import comHeader from "~/components/component/comHeader";
import ComFooter from "~/components/component/comFooter";
import CluesHall from "~/components/clues/clues-hall";
import CluesSide from "~/components/clues/clues-side";
import sideBar from "~/components/sideBar";
import {
  clueShowlist,
  clueInquire,
  clueShowhead,
  clueList
} from "@/api/async-server";
export default {
  components: {
    CluesSide,
    ComFooter,
    CluesHall,
    comHeader,
    sideBar
  },
  head() {
    return {
      title: "广告线索大厅 - 找广告投放 - 投放广告需求 - 凌天众媒网",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "想投放广告就上凌天众媒网（zhongmei66.com），广告线索大厅，找广告投放，投放广告需求，广告线索大厅，一站式投放广告，找广告商，一站式全媒界大型媒体电商平台"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "广告线索大厅，找广告投放，投放广告需求，广告线索大厅，一站式投放广告，找广告商上凌天众媒网"
        }
      ]
    };
  },
  provide() {
    return {
      showListL: this.showListL,
      pageSizeL: this.pageSizeL,
      totalL: this.totalL,
      pageL: this.pageL,
      levelL: this.levelL,
      numtalL: this.numtalL,
      flagPageL: this.flagPageL,
      clueSeleClass: this.clueSeleClass,
      clueSeleMoney: this.clueSeleMoney,
      clueSeleTime: this.clueSeleTime,
      clueSeleType: this.clueSeleType,
      lastPage: this.lastPage,
      config: this.config
    };
  },
  data() {
    return {
      showListL: "",
      pageSizeL: 0,
      totalL: "0",
      pageL: 1,
      levelL: [],
      numtalL: "0",
      flagPageL: false,
      clueSeleClass: "",
      clueSeleMoney: "",
      clueSeleTime: "",
      clueSeleType: "",
      lastPage: 0,
      config: ""
    };
  },
  async asyncData(app) {
    var flagPageL = false;
    var money = ''
    var classd = 0
    var time = ''
    var type = 0
    var dataS = ''
    if (app.query.keywords) {
      var { keywords, page } = app.query;
      var title = keywords
      page = Number(page);
      const clueSRes = await clueShowhead(app);
      const clueS = clueSRes ? clueSRes.data.data : '';
      const dataAllRes = await clueShowlist(app, page);
      const dataAll = dataAllRes ? dataAllRes.data.data : '';
      const dataListRes = await clueInquire(app,money,classd,time,type,dataS, title, page);
      const dataList = dataListRes ? dataListRes.data.data : '';
      console.log('dataListRes',dataList)
      if(dataList.data == null){
          dataList.data = []
      }
          

      if (dataList.total < 10) {
        flagPageL = false;
      } else {
        flagPageL = true;
      }
      if (dataList.data.length > 0) {
        for (var i = 0; i < dataList.data.length; i++) {
          var now = new Date(); //本地时间
          //设置截止时间
          var end = new Date(Date.parse(dataList.data[i].end_time)); //结束时间
          //时间差
          var nMS = parseInt((end.getTime() - now.getTime()) / 1000);
          //定义变量 d,h,m,s保存倒计时的时间
          if (nMS >= 0) {
            var nD = parseInt(nMS / (24 * 60 * 60));
            var nH = parseInt((nMS / (60 * 60)) % 24);
            var nM = parseInt((nMS / 60) % 60);
            var nS = parseInt(nMS % 60);
            dataList.data[i] = { ...dataList.data[i], nD: nD, nH: nH };
          } else {
          }
        }
      }
      return {
        showListL: dataList.data || [],
        pageSizeL: dataList.per_page,
        totalL: dataList.total,
        levelL: dataAll.level,
        pageL: page,
        lastPage: dataList.last_page,
        flagPageL: flagPageL,
        numtalL: Math.ceil(Number(dataList.total) / Number(dataList.per_page)),
        clueSeleClass: clueS.class,
        clueSeleMoney: clueS.money,
        clueSeleTime: clueS.time,
        clueSeleType: clueS.type,
        config: {}
      };
    } else {
      var page = app.query.page || 1;
      const dataListRes = await clueShowlist(app, page);
      const dataList = dataListRes ? dataListRes.data.data : '';
      const clueSRes = await clueShowhead(app);
      const clueS = clueSRes ? clueSRes.data.data : '';
      const list = dataList.list;
      if (list.total < 10) {
        flagPageL = false;
      } else {
        flagPageL = true;
      }
      for (var i = 0; i < list.data.length; i++) {
        var now = new Date(); //本地时间
        //设置截止时间
        var end = new Date(Date.parse(list.data[i].end_time)); //结束时间
        //时间差
        var nMS = parseInt((end.getTime() - now.getTime()) / 1000);
        //定义变量 d,h,m,s保存倒计时的时间
        if (nMS >= 0) {
          var nD = parseInt(nMS / (24 * 60 * 60));
          var nH = parseInt((nMS / (60 * 60)) % 24);
          var nM = parseInt((nMS / 60) % 60);
          var nS = parseInt(nMS % 60);
          list.data[i] = { ...list.data[i], nD: nD, nH: nH };
        } else {
        }
      }
      return {
        showListL: list.data,
        pageSizeL: list.per_page,
        totalL: list.total,
        lastPage: list.last_page,
        pageL: Number(page),
        levelL: dataList.level,
        numtalL: Math.ceil(Number(list.total) / Number(list.per_page)),
        flagPageL: flagPageL,
        clueSeleClass: clueS.class,
        clueSeleMoney: clueS.money,
        clueSeleTime: clueS.time,
        clueSeleType: clueS.type,
        config: {}
      };
    }
  }
};
</script>
<style scoped lang="less">
.top-wrap {
  width: 1210px;
  margin: 0 auto;
  .top-title {
    display: block;
    height: 44px;
    width: 164px;
    line-height: 44px;
    background: #f3262d;
    font-size: 14px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
}
.parent {
  width: 1210px;
  display: flex;
  margin: 0 auto;
  padding-bottom: 30px;
  & > .rightClue {
    width: 260px;
    margin-left: 40px;
  }
  & > .leftClue {
    flex: 1;
    background: #fff;
    position: relative;
  }
}
</style>
