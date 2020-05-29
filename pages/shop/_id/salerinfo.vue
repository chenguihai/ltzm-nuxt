<template>
  <div class="shop-archives">
    <div class="sa_left">
      <div class="item-1">
        <div class="item_top">
          <div class="logo">
            <img
              src="~/assets/img/userDataImg.png"
              v-lazy="archives.logo+'?x-oss-process=image/resize,m_fill,h_200,w_200'"
              :alt="archives.store_name"
            />
          </div>
          <div class="item-right">
            <h2>{{archives.store_name}}</h2>
            <p class="about">关于我们</p>
            <p class="about_desc">{{archives.about_us}}</p>
            <ul class="sa_rate">
              <li class="rate_item">
                <div>{{archives.score | sliceNumber}}</div>
                <p>综合评分</p>
              </li>
              <li class="rate_item">
                <div>{{archives.threeMonthAmount}}</div>
                <p>近三月收入</p>
              </li>
              <li class="rate_item">
                <div>{{archives.praise_rate || 0}}%</div>
                <p>好评率</p>
              </li>
              <li class="rate_item">
                <div>{{archives.sales_amount}}</div>
                <p>店铺销量</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="archives-title">
          <i class="iconfont icon-dizhi"></i>&nbsp;
          <span>{{archives.shortname}}</span>
        </div>
        <div class="sa_share">
          <div class="share_box">
            <share :config="config" v-if="config" />
            <span class="report" @click="clickReport">举报</span>
          </div>
        </div>
      </div>
      <div class="sa_skill">
        <div class="item_title">一级赋能技能</div>
        <div class="item_content">
          <span v-for="item in archives.skillList" :key="item.cat_one">{{item.cate_name}}</span>
        </div>
      </div>
      <div class="sa_skill">
        <div class="item_title">擅长领域</div>
        <div class="item_content">
          <span v-for="item in archives.realmList" :key="item.id">{{item.sr_name}}</span>
        </div>
      </div>
      <template>
        <mediaum v-if="showApt" :mediaList="archives.mediaAptitudeList" />
        <mediaum v-if="showCompany" :mediaList="archives.mediaCompanyList" :type="1" />
        <mediaum v-if="showSelfHonor" :mediaList="archives.selfHonorList" :type="2" />
        <mediaum v-if="showExp" :mediaList="archives.experienceList" :type="3" />
        <div class="comments-box">
          <comments-list></comments-list>
        </div>
      </template>
    </div>
    <div>
      <shop-fws :showLogo="false" :fwsFixed="2"></shop-fws>
      <aside class="sa_aside">
        <side-list
          v-if="archives.hotServiceList"
          :type="0"
          :sid="selectId"
          :list="archives.hotServiceList"
          :link="`/shop/${selectId}/all`"
        />
        <side-list
          v-if="archives.customerCaseList"
          :type="1"
          :sid="selectId"
          :list="archives.customerCaseList"
          :link="`/shopwork?shopid=${selectId}`"
        />
      </aside>
    </div>
  </div>
</template>

<script>
import {
  defaultAsync,
  getStoreArchives,
  storeInfoInit
} from "~/api/async-server";
import { sliceNumber } from "~/utils/common-filters";
import mediaum from "~/components/shop/mediaum";
// import ShareCpn from "~/components/component/shareCpn";
import commentsList from "~/components/shop/commentsList";
import sideList from "~/components/shop/sideList";
import shopFws from "~/components/shop/shopFws";
import { report } from "~/api/report";
// import { initShare } from "~/utils/common";
import { mapState } from "vuex";
import share from "@/components/component/share";
import { homeimage } from "@/api/list";

export default {
  layout: "user-shop",
  name: "shop-archives",
  components: { mediaum, commentsList, sideList, shopFws, share },
  head() {
    const { store_name = "" } = this.storeInfo;
    const { skillList = [], keywords = "", description = "" } = this.archives;
    let classItem = skillList.map(item => item.cate_name);
    return {
      title: `${store_name} - 店铺信息 - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            description ||
            `凌天众媒网服务商：${store_name}， ${classItem.join(
              "、"
            )}，店铺信息`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: keywords || `${store_name} 档案信息，凌天众媒网`
        }
      ]
    };
  },
  data() {
    const { id } = this.$route.params;
    return {
      num: 10,
      left: 0,
      value: "",
      selectId: +id || 0,
      archives: {},
      config: ""
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables", storeInfo: "storeInfo" }),
    showApt() {
      // 店铺媒介资质显示
      const { mediaAptitudeList = [] } = this.archives;
      return mediaAptitudeList.length > 0;
    },
    showCompany() {
      // 隶属媒体公司显示
      const { mediaCompanyList = {}, type_id = 0 } = this.archives;
      return mediaCompanyList && type_id === 1;
    },
    showExp() {
      // 工作经历
      const { experienceList = [], type_id = 0 } = this.archives;
      return experienceList.length > 0 && type_id === 1;
    },
    showSelfHonor() {
      // 自传资质
      const { selfHonorList = [] } = this.archives;
      return selfHonorList.length > 0;
    }
  },
  filters: { sliceNumber },
  async fetch(app) {
    const { id } = app.params;
    if (!id) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  async asyncData(app) {
    /* 店铺档案 */
    const errCon = { statusCode: 500, message: "店铺档案加载失败,请重试" };
    const archivesRes = await defaultAsync(app, ["id"], getStoreArchives).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    })
    const archives = archivesRes ? archivesRes.data.data : '';
    return archives ? { archives } : app.error(errCon);
  },
  mounted() {
      console.log(this.archives.logo)
    var type = "27";
    homeimage(type)
      .then(res => {
        if (res.data.code == 200) {
          // this.ad_img = res.data.data.ad_img;
          var img = "";
          if (this.archives.logo) {
            img = this.envVars.IMG_HOST + this.archives.logo;
             console.log('1111',img)
          } else {
            img = this.envVars.IMG_HOST + res.data.data.ad_img;
             console.log('2222',img)
          }
          this.config = {
            url: location.href,
            title: `${this.archives.store_name}`,
            description: `我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`,
            image: img,
            summary: `我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`
          };
        }
      })
      .catch(err => {
        console.log(err);
      });
    // if (this.archives.logo == "" || this.archives.logo == null) {
    //   // console.log(this.archives.logo)
    //   var img = location.origin + "/favicon.ico";
    //   this.config = {
    //     url: location.href,
    //     title: `${this.archives.store_name}`,
    //     description: `我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`,
    //     image: img,
    //     summary: `我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`
    //   };
    // } else {
    //   var img = this.envVars.IMG_HOST + this.archives.logo;
    //   this.config = {
    //     url: location.href,
    //     title: `${this.archives.store_name}`,
    //     description: `我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`,
    //     image: img,
    //     summary: `我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`
    //   };
    // }
    // setTimeout(() => {
    //   initShare({
    //     img,sa
    //     zmUrl,
    //     title: `${this.archives.store_name}-我在凌天众媒网看到一个不错的媒体店铺，赶快来看看`
    //   });
    // }, 100);

    console.log(this.config);
  },
  methods: {
    clickReport() {
      let data = {
        project_type: 2,
        project_id: this.selectId
      };
      report.tipOffs(data).then(res => {
        const { code, message } = res.data;
        if (code === 200) {
          sessionStorage.setItem("historyUrl", this.$route.fullPath);
          var { href } = this.$router.resolve({
            path: "/report",
            query: { type: 2, id: this.selectId }
          });
          window.open(href, "_blank");
        } else {
          this.$message.error(message);
        }
      });
    }
    /**
             nextClickHandle() {
                let _left = Math.abs(this.left)
                let _num = this.num * 200 - 800
                if (_left >= _num) {
                    return
                } else {
                    this.left = this.left - 200
                    console.log(_left)
                }
            },
             prevClickHandle() {
                let _left = Math.abs(this.left)
                if (_left <= 0) {
                    return
                } else {
                    this.left = this.left + 200
                }
            }
             */
  }
};
</script>
<style scoped lang="less">
.shop-archives {
  display: flex;
  width: 1210px;
  margin: 0 auto 50px;

  a {
    text-decoration-line: none;
  }

  .report {
    cursor: pointer;
    color: #757575;
    margin-left: 10px;

    &:hover {
      color: #ff0027;
    }
  }
}

.bzj-icon {
  font-size: 50px;
  text-align: center;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  margin-right: 18px;
  line-height: 50px;
}

.archives-title {
  display: flex;
  align-items: center;
  position: absolute;
  top: 14px;
  right: 40px;
  color: #666;
  font-size: 12px;

  .icon-dizhi {
    color: #f3262d;
  }
}

.sa_left {
  flex: 1;
  margin-right: 20px;
  margin-top: 20px;

  .item-1 {
    margin-bottom: 20px;
    background: #fff;
    padding: 10px;
    position: relative;
  }
}

.item_top {
  display: flex;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 220px;
    border: 1px solid #eee;

    img {
      width: 200px;
      height: 200px;
    }
  }
}

.item-right {
  margin-left: 20px;

  h2 {
    font-size: 24px;
    line-height: 1em;
    color: #333;
  }

  .about {
    color: #222;
    font-size: 16px;
    margin: 30px 0 14px;
  }

  .about_desc {
    font-size: 14px;
    padding-right: 30px;
    color: #333;
    line-height: 24px;
    padding-bottom: 28px;
  }
}

.sa_skill {
  margin-top: 20px;
  background: #fff;
  padding: 20px 20px 2px;

  .item_title {
    height: 1em;
    line-height: 1em;
    font-size: 16px;
    color: #333;
    font-weight: 400;
  }

  .item_content {
    padding: 10px 0;
    margin: 0 -10px;

    span {
      display: inline-block;
      font-size: 14px;
      color: #f3262d;
      border: 1px solid #fa7478;
      background-color: #fff8f8;
      border-radius: 16px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      margin: 6px 8px;
      padding: 0 11px;
    }
  }
}

.sa_aside {
  width: 277px;
  margin-top: 20px;
}

.sa_rate {
  display: flex;

  .rate_item {
    text-align: center;
    margin-right: 50px;

    div {
      font-size: 16px;
      line-height: 1em;
      color: #f3262d;
      font-weight: bold;
    }

    p {
      color: #333;
      margin-top: 12px;
      font-size: 14px;
      line-height: 1em;
    }
  }
}

.sa_share {
  padding-top: 20px;

  .share_box {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > .icon {
      width: 15px;
      height: 16px;
      margin-right: 5px;
    }

    i,
    span {
      font-size: 14px;
      color: #757575;
    }

    .report:hover,
    .share_btn:hover {
      color: #ff0027;
    }
  }
}

.comments-box {
  margin-top: 20px;
  background: #fff;
  padding: 20px 10px 20px 20px;

  /deep/ .comments-list {
    h3 {
      span {
        color: #333;
        text-align: left;
        font-weight: 400;

        &::after {
          display: none;
        }
      }
    }

    .rate {
      border-left: none;
      border-right: none;
      width: 100%;
    }
  }

  /deep/ .pages_submit_btn {
    margin-right: 10px;
  }
}
</style>
