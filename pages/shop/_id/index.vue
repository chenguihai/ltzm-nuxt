<template>
  <div class="shop_home" v-if="this.storeInfo.id">
    <div class="sh_box" v-html="storeInfo.custom_setting"></div>
    <div class="sh_main">
      <div class="sh_title">
        <div class="more">
          <nuxt-link target="_blank" :to="`/shop/${store_id}/all`">
            更多服务
            <i class="el-icon-arrow-right"></i>
          </nuxt-link>
        </div>
        <div class="sh_inner">
          <h3>热门推荐</h3>
          <span>你的满意 是我们的宗旨</span>
        </div>
      </div>
      <div class="sh_list">
        <shop-list :list="storeIndexInfo" :showBtn="true" @itemClick="goDetail"></shop-list>
      </div>
      <!--评价-->
      <div class="sh_highly">
        <!--侧边-->
        <shop-fws titlebg="active"></shop-fws>
        <div class="sh_comments">
          <comments-list></comments-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  storeInfoInit,
  storeIndexInit,
  defaultAsync
} from "~/api/async-server";
import { mapState } from "vuex";
import shopList from "~/components/shop/shopList";
import commentsList from "~/components/shop/commentsList";
import shopFws from "~/components/shop/shopFws";

export default {
  layout: "user-shop",
  name: "shop-index",
  components: {
    shopList,
    commentsList,
    shopFws
  },
  head() {
      const {store_name='',keywords='',description=''} = this.storeInfo;
    return {
      title: `${store_name} - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网服务商：${store_name}，${description}`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${keywords}，凌天众媒网`
        }
      ]
    };
  },
  data() {
    return {
      value: null,
      storeId: 0,
      store_id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState(["storeInfo"])
  },
  async fetch(app) {
    const { id } = app.params;
    if (!id) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  async asyncData(app) {
    /* 获取店铺首页 */
    const errCon = { statusCode: 500, message: "店铺首页数据加载失败,请重试" };
    const storeIndexInfo = await defaultAsync(app, ["id"],  storeIndexInit )
    // if(!storeIndexInfo) return
    return { storeIndexInfo: storeIndexInfo.data ||[]};
  },
  created() {
    if (!this.storeInfo.id) {
      this.$router.push({
        path: "/closeData/closeData",
        query: { type: 8 }
      });
    }
  },
  methods: {
    goDetail(info) {
      this.$router.push({
        path: "/service/"+info.id,
        query: { id: this.store_id }
      });
    }
  }
};
</script>

<style scoped lang="less">
.shop_home {
  padding-bottom: 50px;
  background: #fff;
}

.sh_box {
  /deep/ img {
    display: block;
    max-width: 1920px;
    width: 100%;
    min-width: 1210px;
    margin: 0 auto;
    text-align: center;
    object-fit: cover;
  }

  /deep/ p {
    /*width: 1210px;*/
    margin: 0 auto;
  }
}

.sh_main {
  padding-top: 56px;
  width: 1210px;
  margin: auto;
}

.sh_title {
  .more {
    display: flex;
    justify-content: flex-end;

    a {
      font-size: 12px;
      color: #666;
    }
  }
}

.sh_inner {
  padding-bottom: 20px;

  h3 {
    font-size: 20px;
    color: #333;
  }

  span {
    font-size: 12px;
    color: #999;
    padding-top: 8px;
  }

  width: 190px;
  text-align: center;
  margin: auto;
  position: relative;

  &:before,
  &:after {
    position: absolute;
    z-index: 1;
    width: 510px;
    content: "";
    display: block;
    height: 1px;
    background: #ccc;
    top: 14px;
  }

  &:before {
    left: -510px;
  }

  &:after {
    left: 190px;
  }
}

.sh_list {
  ul {
    flex-wrap: nowrap;
    margin-bottom: 30px;
  }
}

.sh_highly {
  display: flex;
  justify-content: space-between;
}
.sh_comments {
  flex: 1;
  margin-left: 20px;
  /deep/ .pages_submit_btn {
    margin-right: 20px;
  }
}
</style>
