<template>
  <div>
    <div
      class="head_top"
      :style="{
      backgroundImage: `url(${envVars.IMG_HOST + storeInfo.head_img+'?x-oss-process=image/resize,m_fill,h_130,w_1920'})`
            }"
      v-if="storeInfo.head_img"
    ></div>
    <div class="head_bottom">
      <div class="head_box">
        <nuxt-link class="head_item" :to="{path: '/shop/'+storeId}">
          <span class="head_title bl">首页</span>
        </nuxt-link>

        <nuxt-link :to="{path: `/shop/${storeId}/${catId}`}" class="head_item">
          <div class="text-con">
            <span>买服务</span>
            <i class="el-icon-caret-bottom"></i>
            <ul class="sel_box" v-if="showSel">
              <li
                class="sel"
                :class="{'sel-active':catId == item.cat_id}"
                v-for="item in storeInfo.shop_category"
                :key="item.cat_id"
                @click.stop="serviceGo(item.cat_id)"
              >{{item.cat_name}}</li>
            </ul>
          </div>
        </nuxt-link>
        <nuxt-link class="head_item" :to="{path: `/shop/${storeId}/salerinfo`}">
          <span class="head_title">店铺档案</span>
        </nuxt-link>
        <nuxt-link class="head_item" rel="nofollow" :to="{path: `/shop/${storeId}/review`}">
          <span class="head_title">交易评价</span>
        </nuxt-link>
        <nuxt-link class="head_item" :to="{path: `/shopwork?shopid=${storeId}`}">
          <span class="head_title">客户合作示例</span>
        </nuxt-link>
        <nuxt-link class="head_item" :to="{path: `/shop/${storeId}/hot`}">
          <span class="head_title">排行榜</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import emptyData from "~/components/shop/emptyData";
import { mapState } from "vuex";

export default {
  data() {
    const { cla="all", id = 0,shopid } = this.$route.query;
    const params = this.$route.params;
    return {
      timer: null,
      speed: 40,
      boxShow: false,
      storeId: id || shopid || params.id,
      showSel: true,
      catId: cla
    };
  },
  components: {
    emptyData
  },
  computed: {
    ...mapState({
      storeInfo: "storeInfo",
      envVars: "envVariables"
    })
  },
  methods: {
    serviceGo(cla) {
      this.showSel = false;
      this.catId = cla;
    }
  }
};
</script>
<style scoped lang="less">
.head_top {
  height: 130px;
  min-width: 1210px;
  margin: auto;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  // background-size: 100% auto;
  /*background-attachment:fixed*/
}

.head_bottom {
  min-width: 1210px;
  margin: auto;
  height: 30px;
  background: #444;
}

.head_box {
  width: 1210px;
  margin: auto;
  display: flex;
  align-items: center;
}

.head_item {
  width: 150px;
  height: 30px;
  text-align: center;
  padding: 5px 0;

  .text-con,
  .head_title {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #bdbdbd;
    border-right: 1px solid #555;
    display: block;
  }

  .bl {
    border-left: 1px solid #555;
  }
  &.nuxt-link-exact-active {
    background: #555;

    .text-con,
    .head_title {
      border-right: none;
    }
  }

  &:hover {
    background: #555;

    .text-con,
    .head_title {
      color: #fff;

      .sel_box {
        display: block;
      }

      i {
        transform: rotate(180deg);
      }
    }
  }

  .text-con {
    position: relative;

    i {
      transition: transform 0.5s;
    }
  }
}

.sel_box {
  position: absolute;
  top: 25px;
  left: -17px;
  right: -17px;
  margin: auto;
  width: 150px;
  text-align: center;
  line-height: 30px;
  display: none;
  z-index: 10;
  color: #bdbdbd;

  .sel {
    background-color: #444;
    height: 31px;

    &:not(:last-child) {
      border-bottom: 1px solid #555;
    }

    &:hover,
    &.sel-active {
      color: #fff;
      background-color: #555;
    }
  }
}
</style>
