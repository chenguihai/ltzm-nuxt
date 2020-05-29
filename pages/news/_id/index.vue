<template>
  <div class="newsDetailsScode" v-if="newsDe">
    <!-- 新闻资讯详情页 -->
    <comHeader />
    <navAll />
    <div class="news_Information">
      <div class="news_left" >
        <h3>{{newsDe.title}}</h3>
        <div class="con">
          <p>
            <span class="iconfont icon-wenzhang-mingcheng"></span>
            <i v-if="newsDe.author!=null">{{newsDe.author}}</i>
          </p>
          <p>
            <span class="iconfont icon-wenzhang-shijian"></span>
            <i>{{newsDe.created_at}}</i>
          </p>
          <p>
            <span class="iconfont icon-wenzhang-chakanrenshu"></span>
            <i>{{newsDe.click_num}}</i>
          </p>
        </div>
        <div class="article_content" v-html="newsDe.content"></div>
        <div class="bott">
          <div class="prePage user_select">
            <nuxt-link v-if="prePage" :to="`/news/${prePage.id}`">上一篇：<p>{{prePage.title}}</p></nuxt-link>
            <span v-else>上一篇：无</span>
          </div>
          <div class="nextPage user_select">
            <nuxt-link v-if="nextPage" :to="`/news/${nextPage.id}`">下一篇：<p>{{nextPage.title}}</p></nuxt-link>
            <span v-else>下一篇：无</span>
          </div>
        </div>
      </div>
      <div class="news_right">
        <div class="news_right_a">
          <share :config="config" v-if="config" />
        </div>
        <div class="news_right_b">
          <h3>阅读排行榜</h3>
          <a
            v-for="(itemN , index) in ranking"
            :key="index"
            :href="'/news/'+itemN.id"
            target="_blank"
          >
            <p>{{index+1}}.</p>
            <span>{{itemN.title}}</span>
          </a>
        </div>
        <div class="news_right_b">
          <h3>最新发布</h3>
          <a
            v-for="(itemN , index) in newest"
            :key="index"
            :href="'/news/'+itemN.id"
            target="_blank"
          >
            <p>{{index+1}}.</p>
            <span>{{itemN.title}}</span>
          </a>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import navAll from "@/components/component/navAll";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { newsCentreDetail } from "@/api/list";
import share from "@/components/component/share";
import { mapState } from "vuex";
import { getHeader } from "@/api/async-server";
export default {
  components: {
    comHeader,
    navAll,
    sideBar,
    comFooter,
    share
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  head() {
    if (this.newsDe) {
      return {
        title: `${this.newsDe.title || ""}`,
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              " 一站式全媒界大型媒体电商平台，专注于电梯、楼宇、地铁、电视、公交车、 户外、机场、社区、网络、校园、影院、展会等领域广告区域投放。"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "行业资讯,内容营销,内容管理,传媒头条"
          }
        ]
      };
    }
  },
  data() {
    return {
      queryId: "",
      newsDe: "",
      nextPage: "",
      prePage: "",
      ranking: "",
      newest: "",
      newsRList: [],
      config: ""
    };
  },
  provide() {
    return {
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  async asyncData(app) {
    let queryId = app.params.id,
      newsDe = "",
      nextPage = "",
      prePage = "",
      ranking = "",
      newest = "",
      newsRList = [];
    let newData = await newsCentreDetail(queryId);
    const { data, status } = newData;
    if (!data) return;
    newsDe = data.article;
    nextPage = data.nextPage;
    prePage = data.prePage;
    ranking = data.ranking;
    newest = data.newest;

    // 导航SSR
    let navData = await getHeader();
    const navDataRes = navData.data.data;
    // if (code != 200) return this.$message.error(message);
    let navLeftMadio = navDataRes.cate_left;
    let headerNavList = navDataRes.cate_right || [];
    let PopularBrand = navDataRes.hot_media && navDataRes.hot_media.hot_brand;
    let popularMedia = navDataRes.hot_media && navDataRes.hot_media.hot_media;
    for (var i = 0; i < navLeftMadio.length; i++) {
      var a = navLeftMadio[i].child;
      var itemList = [];
      navLeftMadio[i] = { ...navLeftMadio[i], itemList };
      if (a) {
        for (var j = 0; j < a.length; j++) {
          for (var k = 0; k < a[j].child.length; k++) {
            if (a[j].child[k].inr == 1 && a[j].child[k].pid == a[j].id) {
              navLeftMadio[i].itemList.push(a[j].child[k]);
            }
          }
        }
      }
    }

    return {
      newsDe,
      nextPage,
      prePage,
      ranking,
      newest,
      newsRList,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };
  },
  created() {
    if (!this.newsDe) {
      console.log(this.newsDe);
      this.$router.push({
        path: "/closeData/closeData",
        query: { type: 6 }
      });
    }
  },
   mounted() {
    this.queryId = this.$route.params.id;
    if(this.newsDe){
        this.init();
    }
  },
  methods: {
    async init() {
      var id = this.queryId;
      let newData = await newsCentreDetail(id);
      const { data } = newData;
      this.newsDe = data.article;
      this.nextPage = data.nextPage;
      this.prePage = data.prePage;
      this.ranking = data.ranking;
      this.newest = data.newest;
      var img = this.envVars.IMG_HOST + this.newsDe.cover;
      var zmUrl = location.origin + "/favicon.ico";
      this.config = {
        url: location.href,
        title: `${this.newsDe.title}`,
        description: `我在凌天众媒网发现一个不错资讯内容，赶快来看看`,
        image: img || zmUrl,
        summary: `我在凌天众媒网发现一个不错资讯内容，赶快来看看`
      };
    },
    prePageClick() {
      if (this.prePage != null) {
        this.queryId = this.prePage.id;
      } else {
        this.queryId = this.$route.query.id;
      }

      this.init();
    },
    nextPageClick() {
      if (this.nextPage != null) {
        this.queryId = this.nextPage.id;
      } else {
        this.queryId = this.$route.query.id;
      }
      this.init();
    }
  }
};
</script>
<style lang="less">
@import "newsDetailsScode.less";
</style>
