<template>
  <div class="side-item" v-if="list">
    <h3>
      <span>{{title}}</span>
      <!-- todo -->
      <nuxt-link target="_blank" class="nuxt_link user_select" :to="{path: this.type === 0?`/shop/${shopId}/all`:`/shopwork?shopid=${shopId}`}">
        更多
        <svg class="right_arrow" aria-hidden="true">
          <use xlink:href="#icon-you" />
        </svg>
      </nuxt-link>
    </h3>
    <ul v-if="list.length > 0">
      <a class="sa_side_li" v-for="item in list" :key="item.id" :href="type === 0 ? `/service/${item.id}?id=${shopId}` : `/shopwork/${item.id}?shopid=${shopId}`" target="_blank">
        <img
          src="~/assets/img/img_bg.png"
          v-lazy="(item[type === 0 ? 'img' :'image_url'])+'?x-oss-process=image/resize,m_fill,h_84,w_140'"
          :alt="item[type === 0 ? 'name' :'case_name']"
        />
        <div class="sa_text-box">
          <p>{{item[type === 0 ? 'name' :'case_name']}}</p>
          <strong class="unitName" :title="`￥${parseInt(item.price)}/${item.unit_name}`">
            ¥{{parseInt(item.price)}}<span v-if="type === 0">/{{item.unit_name}}</span>
          </strong>
        </div>
      </a>
    </ul>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const SIDE_INFO = new Map([
  [0, "热门服务"],
  [1, "客户合作示例"]
]);
export default {
  name: "sideList",
  props: ["list", "type", "link","sId"],
  computed: {
    ...mapState({
      envVars: "envVariables"
    }),
    title() {
      return SIDE_INFO.get(this.type);
    }
  },
  data() {
    const {id} = this.$route.params;
    return {
      shopId: id ||this.sId
    };
  },
  methods: {
    goSer(id) {
      let routeData = this.$router.resolve({
        path: "/service/"+id,
        query: {id: this.shopId }
      });
      window.open(routeData.href, "_blank");
    },
    goCase(id) {
      let routeData = this.$router.resolve({
        path: `/shopwork/${id}?shopid=${this.shopId}`
      });
      window.open(routeData.href, "_blank");
    },
    itemClick(item) {
      this.type === 0 ? this.goSer(item.id) : this.goCase(item.id);
    }
  }
};
</script>

<style scoped lang="less">
@pred: #f3262d;
.side-item {
  background: #fff;
  margin-bottom: 20px;
  border: 1px solid #eee;
  margin-top: 20px;

  h3 {
    padding-left: 10px;
    padding-right: 10px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;

    span {
      font-size: 16px;
      color: #666;
    }
  }

  .nuxt_link {
    color: #999;
    font-size: 14px;

    &:hover {
      color: @pred;
    }
  }

  .no-data {
    font-size: 14px;
    height: 104px;
    line-height: 104px;
    color: #666;
    text-align: center;
  }
}

.sa_side_li {
  display: flex;
  padding: 10px;
  justify-content: space-between;
  cursor: pointer;

  img {
    width: 140px;
    height: 84px;
    transition: transform 0.5s;
  }

  &:hover {
    img {
      transform: scale(1.04);
    }

    p {
      color: #f3262d;
    }
  }
}

.sa_text-box {
  width: 112px;
  padding-left: 10px;
  p,
  strong {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
    &>span{
        font-size: 12px;
        font-weight: 400;
    }
  }
    .unitName{
           display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    }
  p {
    color: #666;
   line-height: 18px;
    word-wrap: break-word;
    margin-bottom: 10px;
  }

  strong {
    color: #ff0027;
    line-height: 24px;
  }
}

.right_arrow {
  width: 12px;
  height: 12px;
}
</style>
