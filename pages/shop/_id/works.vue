<template>
  <div class="shop-cooperate">
    <shop-list v-if="caseList.data.length > 0" :list="caseList.data" :hideOther="true"></shop-list>
    <empty-data v-else />
    <div class="pagination_wrap" v-if="caseList.data.length > 0">
      <el-pagination
        next-text="下一页"
        prev-text="上一页"
        layout="prev, pager, next, total,jumper"
        :total="caseList.total"
        @current-change="pageChange"
        :current-page="nowPage"
        :page-size="caseList.per_page"
      ></el-pagination>
      <div class="pages_submit_btn mr_20">确定</div>
    </div>
  </div>
</template>

<script>
import shopList from "~/components/shop/shopList";
import emptyData from "~/components/shop/emptyData";
import { storeInfoInit, getCaseList, defaultAsync } from "~/api/async-server";
import { caseListHttp } from "~/api/store";
import { mapState } from "vuex";
export default {
  layout: "user-shop",
  name: "shop-cooperate",
  head() {
    const { store_name = "",shop_category=[] } = this.storeInfo;
    let cateArr = shop_category.map(item=>item.cat_name)
    return {
      title: `${store_name}客户合作示例 - ${this.caseList.current_page} - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网${store_name}服务商合作示例，${cateArr.join('，')}合作示例`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${store_name}合作示例，${cateArr.join('，')} - 凌天众媒网`
        }
      ]
    };
  },
  data() {
    return {
      store_id: this.$route.params.id,
      nowPage: 1,
      caseList: {
        total: 0,
        per_page: 0,
        data: []
      }
    };
  },
  components: {
    shopList,
    emptyData
  },
    computed: {
    ...mapState({
      storeInfo:'storeInfo'
    })
  },
  async fetch(app) {
    const { id } = app.params;
    if (!id) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  async asyncData(app) {
    /* 店铺档案 */
    const errCon = { statusCode: 500, message: "合作示例列表加载失败,请重试" };
    const caseListRes = await defaultAsync(app, ["id"], getCaseList).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const caseList = caseListRes ? caseListRes.data.data : '';
    return caseList
      ? { caseList }
      : app.error(errCon);
  },
  methods: {
    async pageChange(val) {
      if (this.newPage === val) {
        return;
      }
      this.nowPage = val;
      this.getList(val);
    },
    getList(page) {
      caseListHttp(this.store_id, page)
        .then(res => {
          const { code, data = {} } = res.data;
          if (code === 200) {
            this.caseList = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
.shop-cooperate {
  background: #fff;
  width: 1210px;
  margin: 20px auto 50px;

  ul {
    padding: 20px;
  }
}
.pagination_wrap {
  padding-bottom: 30px;
}
</style>
