<template>
  <div class="shop-highly">
    <shop-fws></shop-fws>
    <div class="sh_right">
      <div class="sh_top">
        <h3>店铺综合评分</h3>
        <overivew></overivew>
      </div>
      <div class="sh_inner">
        <h3>店铺服务情况</h3>
        <table class="sh_table">
          <tbody>
            <tr>
              <th></th>
              <th>本月值</th>
              <th>近90天</th>
              <th>近半年</th>
            </tr>
            <tr v-if="serviceData">
              <td>退款数：</td>
              <td>
                <span>{{serviceData.months.num}}</span>
              </td>
              <td>
                <span>{{serviceData.threeMonths.num}}</span>
              </td>
              <td>
                <span>{{serviceData.halfYear.num}}</span>
              </td>
            </tr>
            <tr v-if="serviceData">
              <td>退款率：</td>
              <td>
                <span>{{serviceData.months.percent}}</span>%
              </td>
              <td>
                <span>{{serviceData.threeMonths.percent}}</span>%
              </td>
              <td>
                <span>{{serviceData.halfYear.percent}}</span>%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="sh_inner">
        <h3>
          <span>评价概况</span>
          <span>好评率：</span>
          <span>{{storeInfo.praise_rate}}%</span>
        </h3>
        <div class="sh_nav user_select">
          <span
            v-for="item in dataCycle"
            :key="item.value"
            @click="changeCycle(item.value)"
            :class="[{'active':nowCycle === item.value}]"
          >{{item.text}}</span>
        </div>
        <div class="sh_content">
          <div class="sh_wrap">
            <comment-icon :type="1" :top="false" />
            <p class="mt_10">{{cycleCommentsInfo.good}}</p>
          </div>
          <div class="sh_wrap">
            <comment-icon :type="2" :top="false" />
            <p class="mt_10">{{cycleCommentsInfo.middle}}</p>
          </div>
          <div class="sh_wrap">
            <comment-icon :type="3" :top="false" />
            <p class="mt_10">{{cycleCommentsInfo.bad}}</p>
          </div>
        </div>
      </div>
      <div class="sh_commont">
        <h3>雇主对我的评价</h3>
        <list-con :comments="comments"></list-con>
      </div>
    </div>
  </div>
</template>

<script>
import {
  storeInfoInit,
  storeCommentInit,
  defaultAsync
} from "~/api/async-server";
import overivew from "~/components/shop/comments/overivew";
import listCon from "~/components/shop/comments/listCon";
import shopFws from "~/components/shop/shopFws";
import commentIcon from "~/components/contract/commentIcon";

const CYCLE_INFO = [
  { text: "最近一周", value: "week" },
  { text: "最近一月", value: "months" },
  { text: "最近半年", value: "halfYear" },
  { text: "半年前", value: "halfYearAgo" }
];
export default {
  layout: "user-shop",
  name: "shop-highly",
  head() {
    const { store_name = "" } = this.storeInfo;
    return {
      title: `${store_name} - 交易评价_怎么样 - 凌天众媒网`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `凌天众媒网服务商：${store_name}怎么样，${store_name}交易评价`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${store_name}怎么样，${store_name}交易评价，凌天众媒网`
        }
      ]
    };
  },
  data() {
    return {
      value: 5,
      isActive: 1,
      nowCycle: "week",
      dataCycle: CYCLE_INFO,
      comments: {},
      serviceData: null
    };
  },
  computed: {
    cycleCommentsInfo() {
      return this.comments.commentsData[this.nowCycle];
    },
    storeInfo() {
      return this.$store.state.storeInfo;
    }
  },
  async fetch(app) {
    const { id } = app.params;
    if (!id) return;
    /* 获取店铺信息 */
    await storeInfoInit(app, id).catch(e => console.log(e));
  },
  async asyncData(app) {
    /* 店铺评价 */
    const errCon = { statusCode: 500, message: "店铺评价加载失败,请重试" };
    const comments = await defaultAsync(
      app,
      ["id", { val: "good" }, { val: 1 }, { val: false }],
      storeCommentInit
    ).catch(e => {
      if (e && e.data) {
        errCon.message = e.data.message;
      }
      app.error(errCon);
    });
    return comments
      ? { comments, serviceData: comments.serviceData }
      : app.error(errCon);
  },
  components: {
    shopFws,
    overivew,
    listCon,
    commentIcon
  },
  methods: {
    changeCycle(val) {
      this.nowCycle = val;
      return false;
    }
  }
};
</script>

<style scoped lang="less">
.shop-highly {
  width: 1210px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
}

.sh_right {
  flex: 1;
  margin-left: 20px;
}

.sh_top,
.sh_inner,
.sh_commont {
  background: #fff;

  h3 {
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #e3e3e3;
    height: 40px;
    line-height: 40px;
    margin: 0 20px;
    font-weight: 400;
  }
}

.sh_top {
  /deep/ .rate {
    border: none;
  }
}

.sh_inner {
  margin: 20px 0;
  padding-bottom: 1px;

  h3 {
    span {
      &:first-child {
        margin-right: 28px;
      }

      &:last-child {
        color: #f3262d;
      }
    }
  }
}

.sh_nav {
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-top: 20px;

  span {
    font-size: 14px;
    color: #333;
    height: 40px;
    text-align: center;
    line-height: 40px;
    width: 90px;
    background: #eee;
    margin-right: 15px;
    cursor: pointer;

    &.active {
      border: 1px solid #ddd;
      border-bottom: 0;
      background: #fff;
      position: relative;
      top: 1px;
    }
  }
}

.sh_table {
  margin: 20px;
  font-size: 14px;

  th {
    width: 200px;
    color: #999;
    height: 40px;
  }

  th:nth-child(1) {
    width: 100px;
  }

  td {
    text-align: center;
    height: 40px;
    color: #333;
  }

  td:nth-child(1) {
    color: #212121;
  }

  td:nth-child(2) {
    color: #f3262d;
  }
}

.sh_content {
  border: 1px solid #ddd;
  margin: 20px;
  margin-top: 0;
  display: flex;
  padding: 30px 20px;
  justify-content: center;

  .sh_wrap {
    flex: 1;
    text-align: center;
  }
}

.sh_commont {
  margin-top: 20px;

  /deep/ .pages_submit_btn {
    margin-right: 20px;
  }
}
</style>
