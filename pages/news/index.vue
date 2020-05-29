<template>
  <div class="news_main">
    <!-- 新闻资讯 -->
    <comHeader />
    <navAll :navWidth="1210"/>
    <div class="news_Information">
      <div class="Information_top">
        <div class="news_banner_left">
          <el-carousel :interval="5000" arrow="always" height="546px">
            <el-carousel-item v-for="item in imgsList" :key="item.id">
              <div>
                <nuxt-link :to="`/news/${item.id}`" tag="a" target="_blank">
                  <img  :src="envVars.IMG_HOST+item.cover"  alt/>
                </nuxt-link>
              </div>
              <template>
                <div>
                  <p>{{item.title}}</p>
                </div>
              </template>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="news_banner_right">
          <nuxt-link :to="`/news/${item.id}`" tag="a" target="_blank" v-for="item in imgsListR" :key="item.id">
            <img :src="envVars.IMG_HOST+item.cover" alt />
            <div>
              <p>{{item.title}}</p>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="Information_bott">
        <div class="nwes_left">
          <ul class="user_select">
            <li
              v-for="(item , index) in newsList"
              :key="index"
              :class="{active:index == seleIndex}"
              @click="newsActive(item,index ,item.id)"
            >
              <p>
                {{item.name}}
                <img src="@/assets/img/gywmTab.png" alt />
              </p>
            </li>
          </ul>
          <div class="newsList">
            <nuxt-link :to="`/news/${item.id}`" tag="a" target="_blank" v-for="item  in News" :key="item.id">
            <div class="List">
              <div>
                <img :src="envVars.IMG_HOST+item.cover" alt />
              </div>
              <div class="text_r">
                <div :title="item.title">{{item.title}}</div>
                <div>{{item.preface}}</div>
                <div>
                  <p>{{item.created_at}}</p>
                  <p>
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-chakan" class="ccccc" />
                    </svg>
                    <span>{{item.click_num}}</span>
                  </p>
                </div>
              </div>
              <div class="clear"></div>
            </div>
            </nuxt-link>
            <div class="block" id="block" v-if="totalFlag">
              <div class="sbm">确定</div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                background
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                prev-text="上一页"
                next-text="下一页"
                :total="total"
              ></el-pagination>
            </div>
            <div class="clear"></div>
          </div>
        </div>

        <div class="nwes_right">
          <div class="nwes_right_top">
            <h3>阅读排行榜</h3>
            <a v-for="(item , index) in neswCon" :key="index" :href="'/news/'+item.id" target="_blank">
              <div>{{index+1}}</div>
              <div>
                <img :src="envVars.IMG_HOST+item.cover" alt />
              </div>
              <div>
                <p>{{item.title}}</p>
              </div>
            </a>
          </div>
          <div class="nwes_right_bott">
            <h3>最新发布</h3>
            <a v-for="(item , index) in newest" :key="index" :href="'/news/'+item.id" target="_blank">
              <div>{{index+1}}</div>
              <div>
                <img :src="envVars.IMG_HOST+item.cover" alt />
              </div>
              <div>
                <p>{{item.title}}</p>
              </div>
            </a>
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
import navAll from "@/components/component/navAll";
import sideBar from "@/components/sideBar";
import { newsCentre, newsCentreList } from "@/api/list";
import comFooter from "@/components/component/comFooter";
import { mapState } from "vuex";
import { getHeader } from "@/api/async-server";
export default {
  components: {
    comHeader,
    comFooter,
    navAll,
    sideBar
  },
  head() {
    return {
      title: "一站式全媒界大型媒体电商平台-行业资讯",
      meta: [
        {
          hid: "description",
          name: "description",
          content:" 一站式全媒界大型媒体电商平台，专注于电梯、楼宇、地铁、电视、公交车、 户外、机场、社区、网络、校园、影院、展会等领域广告区域投放。"
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "行业资讯,内容营销,内容管理,传媒头条"
        }
      ]
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
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
     let newsLi,newsList=[],neswCon=[],newest=[],id="",News,total=0,totalFlag = false,pageSize=0,imgsList=[],imgsListR=[];
     let data = await newsCentre()
     if (data.status == 200) {
        let res = data.data
            newsLi = res.hot;
            newsList = res.nav;
            neswCon = res.ranking;
            newest = res.newest;
            id = newsList[0].id;
            News = res.default.data;
            total = res.default.total;
            if (total > 8) {
              totalFlag = true;
            }
            pageSize = res.default.per_page;
            if (total > 8) {
              totalFlag = true;
            }
            for (var i = 0; i < newsLi.length; i++) {
              if (i <= 4) {
                imgsList.push(newsLi[i]);
              } else if (i > 4) {
                imgsListR.push(newsLi[i]);
              }
            }
     }

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
      newsLi,
      newsList,
      neswCon,
      newest,
      id,
      News,
      total,
      totalFlag,
      pageSize,
      imgsList,
      imgsListR,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
     }
   },
  data() {
    return {
      seleIndex: 0,
      currentPage3: 1,
      page: 1,
      total: 0,
      pageSize: 0,
      totalFlag: false,
      id: "",
      imgsList: [],
      imgsListR: [],
      News: "",
      newsList: [],
      newest: [],
      neswCon: []
    };
  },
  mounted() {
  },
  methods: {
    // 请求新闻数据
    init() {
      newsCentre()
        .then(res => {
          if (res.status == 200) {
            var newsList = res.data.hot;
            this.newsList = res.data.nav;
            this.neswCon = res.data.ranking;
            this.newest = res.data.newest;
            this.id = this.newsList[0].id;
            this.News = res.data.default.data;
            this.total = res.data.default.total;
            if (this.total > 8) {
              this.totalFlag = true;
            }
            this.pageSize = res.data.default.per_page;
            if (this.total > 8) {
              this.totalFlag = true;
            }
            for (var i = 0; i < newsList.length; i++) {
              if (i <= 4) {
                this.imgsList.push(newsList[i]);
              } else if (i > 4) {
                this.imgsListR.push(newsList[i]);
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    newsCentre() {
      var id = this.id;
      var page = this.page;
      newsCentreList(id, page)
        .then(res => {
          if (res.status == 200) {
            this.News = res.data.data;
            this.total = res.data.total;
            if (this.total > 8) {
              this.totalFlag = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    newsActive(item, index, id) {
      this.totalFlag = false;
      this.seleIndex = index;
      this.id = item.id;
      this.newsCentre();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      this.page = val;
      this.newsCentre();
    },
  }
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
<style lang="less">
.news_banner_left {
  .el-carousel {
    .el-carousel__container {
      .el-carousel__item {
        & > div:nth-child(1) {
          img {
            width: 910px;
            height: 546px;
          }
        }
        & > div:nth-child(2) {
          position: absolute;
          bottom: 0px;
          width: 910px;
          height: 81px;
          background: linear-gradient(0deg, #000, rgba(0, 0, 0, 0.1));
          opacity: 0.4;

          p {
            color: #fff;
            opacity: 1;
            font-size: 20px;
            line-height: 81px;
            padding-left: 20px;
          }
        }
      }
    }
    .el-carousel__indicators {
      height: 81px;
      min-width: 122px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      right: 0;
      left: 90%;
      .el-carousel__indicator {
        padding: 0;
        .el-carousel__button {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
      .is-active {
        .el-carousel__button {
          background: #f3262d;
        }
      }
    }
  }
}
#block {
  width: 100%;
  float: right;
  margin: 30px 0;

  .is-background {
    float: right;
    border-bottom: 0;
  }

  .sbm {
    float: right;
    border: 1px solid #d1d1d1;
    width: 50px;
    height: 30px;
    cursor: pointer;
    font-size: 14px;
    line-height: 28px;
    color: #333;
    text-align: center;
    justify-content: center;
  }

  .el-input__inner {
    height: 28xp !important;
  }

  .btn-prev,
  .btn-next {
    width: 70px;
    height: 30px;
    background: #fff;
    border: 1px solid #d1d1d1;
  }

  .el-pager {
    .number {
      background: #fff;
      border: 1px solid #d1d1d1;
    }

    .number:hover {
      color: #fff;
      background: #f3262d;
      border: 0;
    }

    .active {
      color: #f3262d;
      background: #fff;
      border: 0;
    }
  }

  .el-pagination__jump {
    margin-left: 10px;
  }
  #block {
    .el-input__inner {
      height: 28px;
    }
  }
}
</style>
