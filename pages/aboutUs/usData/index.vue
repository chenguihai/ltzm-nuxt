
<template>
  <div class="aboutUs_us">
    <aboutUs />
    <div class="aboutUs_content">
      <div class="aboutUs_content_left">
        <ul>
          <h2>关于我们</h2>
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
  components: {
    comHeader,
    aboutUs,
    comFooter,
    sideBar
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
    const {id} = this.$route.query;
      this.init();
        this.id = id;
      if (id == "10") {
        this.selectIndex = 0;
        this.abData();
      } else if (id == "12") {
        this.selectIndex = 2;
        this.abData();
      }
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


