<template>
  <div class="shop-service">
    <shop-class @change="changeCla" :nowCla.sync="nowStoreClass"></shop-class>
    <div class="service_item user_select">
      <sort-btn
        v-for="(item, index) in sortRules"
        :key="item.value"
        @click.native="changeOrderBy(item, index)"
        :now-sort="item.sort"
        :active="nowOrderBy === item.value"
        :text="item.name"
      ></sort-btn>
    </div>
    <div class="list" v-if="serviceList">
      <shop-list :sId="store_id" v-if="serviceList.data.length > 0" :list="serviceList.data" @itemClick="goDetail"></shop-list>
      <empty-data v-else></empty-data>
    </div>
    <div class="pagination_wrap" v-if="serviceList.data.length > 0">
      <el-pagination
        next-text="下一页"
        prev-text="上一页"
        layout="prev, pager, next,total, jumper, ->, slot"
        :total="total"
        @current-change="pageChange"
        :current-page="nowPage"
        :page-size="pageSize"
      ></el-pagination>
      <div class="pages_submit_btn">确定</div>
    </div>
  </div>
</template>

<script>
import { getServiceList, storeInfoInit } from "~/api/async-server";
import shopList from "~/components/shop/shopList";
import shopClass from "~/components/shop/shopClass";
import sortBtn from "~/components/shop/sortBtn";
import emptyData from "~/components/shop/emptyData";
import { pageMixin } from "~/utils/common-mixins";
import { mapState } from "vuex";

/* 排序规则统筹表 */
const sortRules = [
  { name: "综合", value: "default", sort: true },
  { name: "成交量", value: "sales", sort: true },
  { name: "好评率", value: "comments", sort: true },
  { name: "价格", value: "price", sort: true },
  { name: "更新", value: "new", sort: true }
];
const DESC = "desc",
  ASC = "asc";

export default {
  layout: "user-shop",
  name: "shop-service",
  mixins: [pageMixin("serviceList")],
  components: {
    shopList,
    shopClass,
    sortBtn,
    emptyData
  },
  head() {
    const { store_name = "", shop_category = [] } = this.storeInfo;
    let classItem = shop_category.map(item => item.cat_name);
    const {current_page=1} =this.serviceList;
    return {
      title: `买服务 - ${current_page} - ${store_name} - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网服务商：${store_name}， ${classItem.join('、')}`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${classItem.join('、')}，${store_name}，凌天众媒网`
        }
      ]
    };
  },
  computed: {
    ...mapState(["storeInfo"])
  },
  data() {
    const { id = 0, cla } = this.$route.params;
    return {
      nowOrderBy: "default",
      nowSort: ASC,
      sortRules,
      store_id: id,
      nowStoreClass: cla !== "all" ? cla : undefined,
    };
  },
  async fetch(app) {
    const { id, caseid } = app.params;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  async asyncData(app) {
    const errCon = { statusCode: 500, message: "服务列表数据加载失败,请重试" };
    const { id, cla } = app.params;
    if (!id) return;
    const params = {
      store_id: id,
      order: "default",
      store_class: cla !== "all" ? cla : undefined,
      sort: ""
    };

    const serviceListRes = await getServiceList(app, params).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    const serviceList = serviceListRes.data.data;
    return serviceList ? { serviceList } : app.error(errCon);
  },
  methods: {
    changeCla(val) {
      this.nowPage = 1;
      this.nowStoreClass = val;
      console.log('changeCla',val)
          this.$router.replace({
        path: `/shop/${this.store_id}/${this.nowStoreClass || "all"}`
      });
      // this.getData(this.nowPage);
    },
    async getData(cur) {
      const params = {
        store_id: this.store_id,
        page: cur,
        order: this.nowOrderBy,
        store_class: this.nowStoreClass,
        sort: this.nowSort
      };
      const serviceListRes = await getServiceList(undefined, params);
      const serviceList = serviceListRes.data.data;
      // this.$router.replace({
      //   path: `/shop/${this.store_id}/${this.nowStoreClass || "all"}`
      // });
      if (!serviceList) return this.$message.error("数据加载失败");
      this.serviceList = serviceList;
      return serviceList;
    },
    goDetail(info) {
      this.$router.push({
        path: "/service/"+info.id,
        query: { id: this.store_id }
      });
    },
    async changeOrderBy({ value, sort }, index) {
      if (value === "default") {
        //等于综合
        if (sort === true) {
          //之前就选中了综合
          if (this.nowOrderBy === "default") {
            return;
          }
          this.nowOrderBy = "default";
          this.nowSort = "";
        }
      } else {
        //更改排序
        if (this.nowOrderBy === value) {
          //排序字段 nowOrderBy
          const op = this.sortRules[index]; //排序数组
          op.sort = !sort;
          this.nowSort = op.sort ? ASC : DESC;
        } else {
          this.nowOrderBy = value;
          this.nowSort = ASC;
          this.sortRules.forEach(r => (r.sort = true));
        }
      }
      // 更改规则之后 重新加载数据
      await this.getData(this.nowPage);
    }
  }
};
</script>

<style scoped lang="less">
.list {
  min-height: 320px;
}

.shop-service {
  background: #fff;
  width: 1210px;
  margin: 20px auto 50px;
  padding: 20px;
}

.service_item {
  margin-top: 20px;
  height: 38px;
  margin-bottom: 20px;
  background: rgba(244, 246, 248, 1);
  border: 1px solid rgba(239, 239, 239, 1);
  display: flex;
}
</style>
