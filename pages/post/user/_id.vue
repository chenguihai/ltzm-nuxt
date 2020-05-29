<template>
  <div>
    <navAll :navWidth="1210"/>
    <div class="turn-upload-page">
      <div class="turn-time-box">
        <div class="m-shop-box">
          <div class="shop-avatar">
            <img
              src="~assets/img/img_bg.png"
              v-lazy="indexData.shop_info.logo+'?x-oss-process=image/resize,m_fill,h_100,w_100'"
              alt="默认头像"
            />
          </div>
          <div class="shop-info">
            <h2 class="shop-name">{{indexData.shop_info.store_name}}</h2>
            <div class="shop-btn-wrap">
              <div class="btn" v-if="!indexData.myself_shop">
                <span class="btn-collect" v-if="indexData.collection">已收藏</span>
                <span @click="collect(3,1)" class="btn-collect-hover" v-if="indexData.collection">取消收藏</span>
                <span @click="collect(3,0)" v-if="!indexData.collection">收藏店铺</span>
              </div>
              <nuxt-link class="btn" target="_blank" :to="'/shop/'+indexData.shop_info.shop_id">进入店铺</nuxt-link>
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <div class="v-bottom">
          <div class="turn-time">
            <div class="m-top-title">
              <h3 class="title">{{indexData.myself_shop ? '我':'他'}}上传的实时上刊</h3>
              <div class="sear-box">
                <input
                  type="text"
                  v-model="keywords"
                  placeholder="搜索上刊画面"
                  @keyup.enter="searchSubmit"
                />
                <i class="el-icon-search" @click="searchSubmit"></i>
              </div>
            </div>

            <uploadList
              listName="list"
              :turnType="turnType"
              :keywords="searchKeyWords"
              :chooseData="nowSelArr"
              :showPage="true"
            >
              <div slot="title" class="t2" v-if="indexData.list.total > 0">
                <ul>
                  <li
                    :class="{'active' : turnType==0}"
                    @click="turnType = 0"
                  >全部({{indexData.list.total}})</li>
                  <li
                    :class="{'active' : turnType==2}"
                    @click="turnType = 2"
                  >视频({{indexData.count_journal_video || 0}})</li>
                  <li
                    :class="{'active' : turnType==1}"
                    @click="turnType = 1"
                  >图片({{indexData.count_journal_img || 0}})</li>
                </ul>
              </div>
              <div v-else class="no-data">
                <img class="right_img" src="~assets/img/pintouge.png" alt="图片" />
                <span>店铺还未上架内容</span>
              </div>
            </uploadList>
          </div>
        </div>
        <!-- 列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import uploadList from "@/components/turnCom/uploadList";
import turnTitle from "@/components/turnCom/turnTitle";
import turnAside from "@/components/turnCom/turnAside";
import { journalShopAll, getHeader } from "@/api/async-server";
import { collect } from "@/api/turn-time";
import navAll from "@/components/component/navAll";

export default {
  name: "turnTimeImage",
  layout: "shop-list-layout",
  components: { uploadList, turnTitle, turnAside, navAll },
  provide() {
    return {
      indexData: this.indexData,
      nowPath: "img",
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  head() {
    const { store_name = "" } = this.indexData.shop_info;
    return {
      title: `${store_name}发布的上刊 - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "上刊视频列表，实时上刊，最新广告上刊，上刊大厅，上刊图片，上刊视频，热门上刊，找上刊资源上凌天众媒网（zhongmei66.com）" 
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${store_name}发布的上刊资源，全国最全上刊资源展示上凌天众媒网`
        }
      ]
    };
  },
  data() {
    return {
      turnType: 0,
      indexData: {
        shop_info: {}
      },
      nowSelArr: [],
      keywords: "",
      searchKeyWords: ""
    };
  },
  async asyncData(app) {
    const errCon = { statusCode: 500, message: "实时上刊加载失败,请重试" };
    const dataRes = await journalShopAll(app, app.params.id).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const data = dataRes ? dataRes.data.data : '';

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

    if (!data) return;
    return { 
      indexData: data,
      // 导航SSR
      navLeftMadio,
      popularMedia,
      headerNavList,
      PopularBrand
    };

  },
  methods: {
    async collect(type, cancel) {
      let data = {
        collect_id: this.indexData.shop_info.shop_id,
        type: type,
        cancel: cancel
      };
      let res = await collect(data);
      if (!res) return;
      let flag = cancel == 1;
      this.$message.success(flag ? "取消收藏成功" : "收藏成功");
      if (type == 3) {
        this.$set(this.indexData, "collection", !flag);
      }
    },
    searchSubmit() {
      this.searchKeyWords = this.keywords;
    }
  }
};
</script>

<style scoped lang="scss">
.turn-upload-page {
  background: #fff;
  width: 100%;
  padding-top: 10px;

  /deep/ .list-con {
    min-height: 360px;
  }

  .m-shop-box {
    height: 120px;
    padding: 10px 0 0 20px;
    display: flex;
    justify-content: flex-start;
    background: url("~assets/img/bg-shop.png") no-repeat left top;
    background-size: 100% 100%;

    .shop-avatar {
      width: 100px;
      height: 100px;
      margin-right: 12px;
      background: #ccc;

      img {
        width: 100px;
        height: 100px;
      }
    }

    .shop-info {
      width: 1000px;
    }

    .shop-name {
      color: #fff;
      font-size: 16px;
      padding-top: 16px;
    }

    .shop-btn-wrap {
      display: flex;
      padding-top: 15px;

      .btn {
        display: block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        background: #f3262d;
        text-align: center;
        color: #fff;
        font-size: 14px;
        margin-right: 30px;
        border-radius: 4px;
        cursor: pointer;

        span {
          display: block;
        }

        .btn-collect {
          display: block;
        }

        .btn-collect-hover {
          display: none;
        }
      }

      .btn:hover {
        background: #f43c42;
        text-decoration: none;

        .btn-collect {
          display: none;
        }

        .btn-collect-hover {
          display: block;
        }
      }
    }
  }

  .turn-time-box {
    width: 1210px;
    margin: 0 auto;
    padding-bottom: 50px;

    .v-bottom {
      display: flex;
      justify-content: space-between;

      .turn-time {
        flex: 1;
      }
    }
  }

  .more-btn {
    width: 70px;
    height: 22px;
    background: rgba(244, 246, 248, 1);
    border: 1px solid rgba(210, 213, 219, 1);
    border-radius: 100px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }
  }

  .m-top-title {
    display: flex;
    padding: 14px 0;
    justify-content: space-between;

    .title {
      font-size: 20px;
      line-height: 36px;
      font-weight: normal;
    }

    .sear-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 150px;
      height: 30px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 75px;
      overflow: hidden;
      padding-right: 12px;

      input {
        flex: 1;
        height: 100%;
        background: rgba(255, 255, 255, 1);
        padding: 10px 16px;
        border: none;
        width: 120px;
        outline: none;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }

      i {
        font-size: 15px;
        color: #999999;
      }
    }
  }

  /deep/ .t1 {
    border-bottom: 1px solid #eee;
    padding-bottom: 6px;

    .tab {
      margin-right: 14px;

      &::after {
        height: 2px;
        bottom: -15px;
      }

      &::before {
        bottom: -13px;
        border-bottom: 5px solid #f3262d;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
      }
    }
  }

  .t2 {
    background: #f4f6f8;
    height: 36px;
    line-height: 36px;
    padding-left: 20px;

    .tab {
      margin-right: 14px;
    }

    ul {
      display: flex;
      justify-content: flex-start;

      li {
        margin-right: 20px;
        color: #666;
        cursor: pointer;
      }

      li.active {
        color: #f3262d;
      }
    }
  }
}
.no-data {
  height: 149px;
  display: flex;
  align-items: center;
  color: #666;
  justify-content: center;

  .right_img {
    width: 62px;
    margin-right: 10px;
  }
}
</style>
