<template>
  <div v-if="storeComments">
    <ul class="common_head user_select">
      <li class="common_li hp" @click="clickCommon('good')">
        <i class="iconfont icon-haoping"></i>
        <span>
          好评（
          <span>{{storeComments.commentCount.good}}</span>）
        </span>
      </li>
      <li class="common_li zp" @click="clickCommon('middle')">
        <i class="iconfont icon-zhongping"></i>
        <span class="c_666">
          中评（
          <span>{{storeComments.commentCount.middle}}</span>）
        </span>
      </li>
      <li class="common_li cp" @click="clickCommon('bad')">
        <i class="iconfont icon-chaping"></i>
        <span class="c_666">
          差评（
          <span>{{storeComments.commentCount.bad}}</span>）
        </span>
      </li>
    </ul>
    <emptyData text="暂无评价" v-if="!storeComments || storeComments.data&&storeComments.data.length <= 0" />
    <ul v-else>
      <li class="c-list-li" v-for="item in storeComments.data&&storeComments.data" :key="item.id">
        <div class="user-box">
          <img
            v-lazy="item.avatar+'?x-oss-process=image/resize,m_fill,h_45,w_45'"
            src="~/assets/img/icon_sign_mobile.jpg"
            :alt="item.nick_name"
          />
          <p :title="item.nick_name">{{item.nick_name}}</p>
          <p>{{item.u_time}}</p>
        </div>
        <div class="comment-info">
          <p>
            <span>{{item.name}}</span>
            <em>
              交易额：￥
              <span>{{item.amount}}</span>
            </em>
          </p>
          <p>
            <rate-cpn class="mr_4" :pass="item.avgScore"/>
            <span
              :class="{
                        'hp':item.evaluate === 1,
                        'c_666':item.evaluate !== 1
                      }"
              class="comment-val"
            >{{item.evaluate|commentLevel}}</span>
          </p>
          <p>
            评价:
            <span>{{item.u_content}}</span>
          </p>
          <p v-if="item.explain">
            <strong>
              服务商解释:
              <span>{{item.explain}}</span>
            </strong>
          </p>
        </div>
      </li>
    </ul>
    <div class="pagination_wrap" v-if="storeComments.data&&storeComments.data.length > 0">
      <el-pagination
        next-text="下一页"
        prev-text="上一页"
        layout="prev, pager, next,total, jumper"
        :total="storeComments.total"
        @current-change="pageChange"
        :current-page="nowPage"
        :page-size="storeComments.per_page"
      ></el-pagination>
      <div class="pages_submit_btn">确定</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { pageMixin, rateMixin } from "~/utils/common-mixins";
import {
  sliceNumber,
  serviceDiffText,
  abs,
  commentLevel
} from "~/utils/common-filters";
import { storeCommentInit } from "~/api/async-server";
import emptyData from "~/components/shop/emptyData";
import rateCpn from "~/components/component/rateCpn";

export default {
  name: "listCon",
  // rateMixin()
  mixins: [pageMixin("storeComments")],
  props: ["comments"],
  components: { emptyData,rateCpn },
  data() {
    return {
      storeComments: this.comments || undefined,
      store_id: this.$route.params.id,
      evaluate: "good", // 是 string	好评 good，中评 middle，差评 bad
      nowPage: 1
    };
  },
  created() {
    /* 获取店铺评价 */
    !this.$isServer && !this.storeComments && this.getData(1);
  },
  computed:{
   ...mapState({
      envVars: "envVariables"
    }),
  },
  methods: {
    pageChange(val) {
      this.nowPage = val;
      this.getData(val);
    },
    clickCommon(val) {
      if (this.evaluate === val) {
        return;
      }
      this.evaluate = val;
      this.getData(1);
    },
    async getData(cur) {
      const comments = await storeCommentInit(
        undefined,
        this.store_id,
        this.evaluate,
        cur,
        !this.comments
      ).catch(e => {
        console.log(e);
      });
      this.storeComments = comments;
    }
  },
  filters: {
    sliceNumber,
    serviceDiffText,
    abs,
    commentLevel
  }
};
</script>

<style scoped lang="less">
.common_head {
  padding: 20px;
  display: flex;
  align-items: center;

  .common_li {
    display: flex;
    align-items: center;
    margin-right: 40px;
    font-size: 12px;
    cursor: pointer;

    i {
      font-size: 22px;
      margin-right: 7px;
    }
  }
}

.c-list-li {
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0;

  &:nth-last-child(1) {
    border: none;
  }

  div:nth-child(1) {
    text-align: center;
  }

  div:nth-last-child(1) {
    p:nth-child(1) {
      display: flex;
      align-items: center;

      span {
        width: 152px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #0066cc;
        font-size: 12px;
        line-height: 24px;
        margin-right: 20px;
      }

      em {
        font-size: 12px;
        color: #999;
      }
    }

    p:nth-child(2) {
      display: flex;
      align-items: center;
      padding-top: 5px;
      padding-bottom: 5px;
      margin-left: -2px;

      i {
        font-size: 20px;
        margin-right: 0.5em;
      }
    }

    p:nth-child(3) {
      color: #666;
      font-size: 12px;
      line-height: 1.6;
    }

    p:nth-last-child(1) {
      padding-right: 10px;

      strong {
        font-size: 12px;
        color: #ff9b2f;
      }
    }
  }
}

.hp {
  color: #f74147;
}

.zp {
  color: #ffc948;
}

.cp {
  color: #ddd;
}

.user-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333;
  font-size: 12px;
  padding-left: 12px;
  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }

  p {
    width: 132px;
    margin-top: 8px;
    line-height: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-child {
      color: #999;
      width: 120px;
    }
  }
}

.comment-info {
  margin-left: 39px;

  .comment-val {
    font-size: 12px;
  }
}

.pagination_wrap {
  margin-top: 50px;
  padding-bottom: 30px;
}
</style>
