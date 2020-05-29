
<template>
  <div class="aboutUs_us">
    <aboutUs />
    <div class="aboutUs_content">
      <div class="aboutUs_content_left">
        <ul>
          <li
            class="Tab"
            :class="{active:index ==selectIndex}"
            v-for="(item,index) in tabArrList"
            :key="index"
            @click="tabActive(item,index ,item.id)"
          >
            <div>
              <p>{{item.name}}</p>
              <span class="iconfont icon-xiangyoudianji"></span>
            </div>
          </li>
        </ul>
        <div class="content">
          <div>
            <span>{{usNews&&usNews.title&&usNews.title}}</span>
            <div class="contText">
              <span v-html="usNews&&usNews.content"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import aboutUs from "@/components/component/aboutUs";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { adminAboutUs, aboutUsDetail } from "@/api/list";

export default {
      head() {
    return {
      title: " 关于我们-凌天众媒网（zhongmei66.com） 中国一站式全媒界大型媒体电商平台",
      meta: [
        {
          hid: "description",
          name: "description",
          content:"凌天众媒网（zhongmei66.com） 中国一站式全媒界大型媒体电商平台，专注于电梯、楼宇、地铁、电视、公交车、 户外、机场、社区、网络、校园、影院、展会等领域广告区域投放。"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "关于我们、企业文化、联系我们，凌天众媒网"
        }
      ]
    };
  },
  components: {
    comHeader,
    aboutUs,
    comFooter,
    sideBar
  },
   async asyncData(app) {
      let selectIndex= 0,id=app.query.id,tabArrList= "",usNews= "";
        if (id == "10") {
          selectIndex = 0;
        } else if (id == "12") {
          selectIndex = 2;
        }
      let abouRes = await adminAboutUs()
        if (abouRes.status == 200) {
            tabArrList = abouRes.data.nav;
          if (!id) {
            usNews = abouRes.data.default;
          }
        }
        if(id == "10"||id == "12"){
          let res =await aboutUsDetail(id)
            if (res.status == 200) {
              usNews = res.data;
            }
        }
        return {
          selectIndex,id,tabArrList,usNews
        }
   },
  data() {
    return {
      selectIndex: 0,
      id: "",
      tabArrList: "",
      usNews: ""
    };
  },
  mounted() {
  },
  methods: {
    init() {
      adminAboutUs()
        .then(res => {
          if (res.status == 200) {
            this.tabArrList = res.data.nav;
           if (!this.$route.query.id) {
              this.usNews = res.data.default;
           }
           
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    tabActive(item, index, id) {
      this.selectIndex = index;
      this.id = item.id;
      this.abData();
    },
    abData() {
      var id = this.id;
      aboutUsDetail(id)
        .then(res => {
          if (res.status == 200) {
            this.usNews = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "aboutUsScode.less";
</style>


