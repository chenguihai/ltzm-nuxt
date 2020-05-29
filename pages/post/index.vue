<template>
    <div>
      <navAll :navWidth="1395"/>
      <div class="turn-time-box">
        <div class="turn-time">
          <turnList listName="newest_video" :setImgSize="'h_108,w_180'">
            <turnTitle slot="title" title="新上刊视频" :tab-arr="titleTabArr" ></turnTitle>
          </turnList>
          <turnAside type="2" param="play" title="热门上刊视频"></turnAside>
        </div>

        <div class="turn-time" style="margin-top:100px;">
          <turnList :isVideo="false" listName="newest_image" :setImgSize="'h_108,w_180'">
            <turnTitle slot="title" title="新上刊图片" :tab-arr="titleTabArr"></turnTitle>
          </turnList>
          <turnAside type="1" param="view" title="热门上刊图片"></turnAside>
        </div>

        <div style="margin-top:45px;">
          <turnList :isLike="true" listName="recommended_video" :setImgSize="'h_162,w_270'">
            <div class="divider" slot="title">
              <p>猜你喜欢</p>
            </div>
          </turnList>
          <turnList :isLike="true" :isVideo="false" listName="recommended_image" :setImgSize="'h_162,w_270'"></turnList>
        </div>
      </div>
    </div>
</template>

<script>
import turnList from "@/components/turnCom/turnList";
import turnTitle from "@/components/turnCom/turnTitle";
import turnAside from "@/components/turnCom/turnAside"
import { getTurnTimeData, getHeader } from "@/api/async-server";
import comHeader from "@/components/component/comHeader";
import navAll from "@/components/component/navAll";

export default {
  name: "turnTime",
  layout: 'post-layout',
  components: {  turnList, turnTitle, turnAside, navAll },
  head() {
    return {
      title: "媒体实时上刊 - 广告上刊 - 凌天众媒网",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "实时上刊，最新广告上刊，上刊大厅，上刊图片，上刊视频，热门上刊，找上刊资源就上凌天众媒网（zhongmei66.com）"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "实时上刊，最新最全广告上刊，最新最全媒体上刊，上刊大厅，一站式投放广告上凌天众媒网"
        }
      ]
    };
  },
  provide() {
    return {
      indexData: this.indexData,
      // 导航SSR
      navList: this.headerNavList,
      navLeftMadio: this.navLeftMadio,
      popularMedia: this.popularMedia,
      PopularBrand: this.PopularBrand,
    };
  },
  props: {},
  data() {
    return {
      indexData: null,
      titleTabArr: [
        { text: "最新投稿", sel: 1 },
        { text: "最新动态", sel: 2 }
      ]
    };
  },
  async asyncData(app) {
      const errCon = { statusCode: 500, message: "实时上刊加载失败,请重试" };
    const dataRes = await getTurnTimeData(app).catch(e => {
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
  }
};
</script>

<style scoped lang="scss">
.turn-time-page {
  background: #fff;
  width: 100%;
  overflow-x: hidden;

  .turn-time-box {
    width: 1390px;
    margin: 30px auto 90px;

    .turn-time {
      display: flex;
      justify-content: space-between;
    }
  }
}

.divider {
  height: 20px;
  text-align: center;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(33, 33, 33, 1);
  width: 350px;
  position: relative;
  margin: 0 auto 9px;

  p {
    width: 110px;
    background: #fff;
    line-height: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }

  &::before {
    content: " ";
    position: absolute;
    height: 1px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #eeeeee;
    z-index: 0;
  }
}
</style>
