<template>
  <div class="evaluate">
    <span
      class="r-t-t"
      :class="{red:(orderInfo.order_status >= 6 && ![8,9].includes(orderInfo.order_status))}"
    >评价</span>
    <!-- v-if="(!orderInfo.comments || orderInfo.comments.status !== 1) && !showCommentsCon" -->
    <div class="right">
      <!-- 雇主对您的评价： 服务商视角-->
      <div class="comment-top-box" v-if="employerEnd && identity === 2">
        <div class="comment-top">
          <span>{{otherCommentsTitle}}</span>
          <comment-icon :top="false" :type="orderInfo.comments.evaluate"></comment-icon>
          <span class="top-time">{{orderInfo.comments.u_time}}</span>
        </div>
        <div class="comment-top">
          <el-rate
            disabled
            :colors="rateColor"
            v-model="orderInfo.comments.attitude"
            :void-icon-class="voidRate"
            :icon-classes="activeRate"
            disabled-void-color="#ddd"
          ></el-rate>
          <span>服务态度：{{orderInfo.comments.attitude}}分</span>
        </div>
        <div class="comment-top">
          <el-rate
            disabled
            :colors="rateColor"
            v-model="orderInfo.comments.speed"
            :void-icon-class="voidRate"
            :icon-classes="activeRate"
            disabled-void-color="#ddd"
          ></el-rate>
          <span>工作速度：{{orderInfo.comments.speed}}分</span>
        </div>
        <div class="comment-top">
          <el-rate
            disabled
            :colors="rateColor"
            v-model="orderInfo.comments.quality"
            :void-icon-class="voidRate"
            :icon-classes="activeRate"
            disabled-void-color="#ddd"
          ></el-rate>
          <span>完成质量：{{orderInfo.comments.quality}}分</span>
        </div>
        <p>{{orderInfo.comments.u_content}}</p>

        <div v-if="!explainEnd && !showExplainCon" class="btn" @click="showExplainCon = true">我要解释</div>

        <!-- 服务商解释完成 -->
        <p v-if="explainEnd">您的解释：{{orderInfo.comments.explain}}</p>
        <!-- 服务商解释 -->
        <div class="comment-box" v-if="!explainEnd && showExplainCon">
          <div class="comment-item">
            <div class="label">解释：</div>
            <textarea class="comment-inp" maxlength="300" v-model="explain" placeholder="您有一次解释机会"></textarea>
          </div>
          <div class="comment-item">
            <div class="label"></div>
            <div class="btn" @click="submitExplain">提交解释</div>
          </div>
        </div>
      </div>

      <template v-if="serviceEnd && identity === 1">
        <!-- 服务商已经完成评价 雇主视角-->
        <div class="comment-top-box">
          <div class="comment-top">
            <span>服务商对您的评价：</span>
            <comment-icon :type="orderInfo.comments.s_evaluate" :top="false"></comment-icon>
            <span class="top-time">{{orderInfo.comments.s_time}}</span>
          </div>
          <p>{{orderInfo.comments.s_content}}</p>
        </div>
      </template>

      <p v-if="showCanComment">项目验收完成后可评价对方</p>
      <div
        v-if="showCanComment && !showCommentsCon"
        class="btn"
        :class="{dis:orderInfo.order_status !== 6}"
        @click="more"
      >{{title}}</div>

      <!-- 服务商评价雇主  没评价  服务商视角-->
      <template v-if="!serviceEnd && identity === 2 && showCommentsCon">
        <div class="comment-box">
          <div class="comment-item">
            <div class="label">{{title}}：</div>
            <el-radio-group v-model="radio1">
              <div class="icon-box">
                <comment-icon class="icon-mar-left" :radio="true"></comment-icon>
                <comment-icon class="icon-mar-left" :radio="true" :type="2"></comment-icon>
                <comment-icon class="icon-mar-left" :radio="true" :type="3"></comment-icon>
              </div>
            </el-radio-group>
          </div>

          <div class="comment-item">
            <div class="label">评价：</div>
            <textarea
              class="comment-inp"
              maxlength="300"
              v-model="con"
              placeholder="简单描述一下这个雇主吧～也可以说说您和雇主间发生的小故事（评价内容最多为300字）"
            ></textarea>
          </div>
          <div class="comment-item">
            <div class="label"></div>
            <div class="btn" @click="submit">提交评价</div>
          </div>
        </div>
      </template>

      <template v-if="employerEnd && identity === 1">
        <!-- 雇主评价服务商完成  雇主视角-->
        <div class="comment-top-box no-bd">
          <div class="comment-top">
            <span>您对服务商做出的评价：</span>
            <comment-icon :type="orderInfo.comments.evaluate" :top="false"></comment-icon>
            <span class="top-time">{{orderInfo.comments.u_time}}</span>
          </div>
          <div class="comment-top">
            <el-rate
              disabled
              :colors="rateColor"
              v-model="orderInfo.comments.attitude"
              :void-icon-class="voidRate"
              :icon-classes="activeRate"
              disabled-void-color="#ddd"
            ></el-rate>
            <span>服务态度：{{orderInfo.comments.attitude}}分</span>
          </div>
          <div class="comment-top">
            <el-rate
              disabled
              :colors="rateColor"
              v-model="orderInfo.comments.speed"
              :void-icon-class="voidRate"
              :icon-classes="activeRate"
              disabled-void-color="#ddd"
            ></el-rate>
            <span>工作速度：{{orderInfo.comments.speed}}分</span>
          </div>
          <div class="comment-top">
            <el-rate
              disabled
              :colors="rateColor"
              v-model="orderInfo.comments.quality"
              :void-icon-class="voidRate"
              :icon-classes="activeRate"
              disabled-void-color="#ddd"
            ></el-rate>
            <span>完成质量：{{orderInfo.comments.quality}}分</span>
          </div>
          <p>{{orderInfo.comments.u_content}}</p>
          <!-- 服务商解释完成 -->
          <p v-if="explainEnd">服务商的解释：{{orderInfo.comments.explain}}</p>
        </div>
      </template>

      <!-- 服务商已经完成评价 -->
      <template v-if="serviceEnd && identity === 2">
        <div class="comment-top-box no-bd">
          <div class="comment-top">
            <span>您对雇主的评价：</span>
            <comment-icon :type="orderInfo.comments.s_evaluate" :top="false"></comment-icon>
            <span class="top-time">{{orderInfo.comments.s_time}}</span>
          </div>
          <p>{{orderInfo.comments.s_content}}</p>
        </div>
      </template>

      <template v-if="!employerEnd && identity === 1 && showCommentsCon">
        <!-- 雇主评价服务商 输入版-->
        <div class="comment-box">
          <div class="comment-item">
            <div class="label">{{title}}：</div>
            <el-radio-group v-model="radio1">
              <div class="icon-box">
                <comment-icon class="icon-mar-left" :radio="true"></comment-icon>
                <comment-icon class="icon-mar-left" :radio="true" :type="2"></comment-icon>
                <comment-icon class="icon-mar-left" :radio="true" :type="3"></comment-icon>
              </div>
            </el-radio-group>
          </div>

          <div class="comment-item">
            <div class="label">服务态度：</div>
            <el-rate
              :colors="rateColor"
              v-model="attitude"
              :void-icon-class="voidRate"
              :icon-classes="activeRate"
              disabled-void-color="#ddd"
            ></el-rate>
            <span v-show="attitude">{{attitude}}分</span>
          </div>
          <div class="comment-item">
            <div class="label">工作速度：</div>
            <el-rate
              :colors="rateColor"
              v-model="speed"
              :void-icon-class="voidRate"
              :icon-classes="activeRate"
              disabled-void-color="#ddd"
            ></el-rate>
            <span v-show="speed">{{speed}}分</span>
          </div>
          <div class="comment-item">
            <div class="label">完成质量：</div>
            <el-rate
              :colors="rateColor"
              v-model="quality"
              :void-icon-class="voidRate"
              :icon-classes="activeRate"
              disabled-void-color="#ddd"
            ></el-rate>
            <span v-show="quality">{{quality}}分</span>
          </div>
          <div class="comment-item">
            <div class="label">评价：</div>
            <textarea class="comment-inp" maxlength="300" v-model="con"></textarea>
          </div>
          <div class="comment-item">
            <div class="label"></div>
            <div class="btn" @click="submit">提交评价</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import commentIcon from "./commentIcon";
import { sendComments, sendExplain } from "~/api/order";
import { proxyMixin, rateMixin } from "~/utils/common-mixins";
const evaluateList = new Map([
  ["好评", 1],
  ["中评", 2],
  ["差评", 3]
]);
const origin = {
  async submit() {
    const params = {
      order_sn: this.orderInfo.order_sn,
      type: this.identity,
      attitude: this.identity === 1 ? this.attitude : undefined,
      speed: this.identity === 1 ? this.speed : undefined,
      quality: this.identity === 1 ? this.quality : undefined,
      evaluate: this.evaluate,
      text: this.con
    };
    if (this.identity === 1 && this.attitude == 0) {
      this.$message.error("评分至少1星");
      return;
    }

    if (this.identity === 1 && this.speed == 0) {
      this.$message.error("评分至少1星");
      return;
    }
    if (this.identity === 1 && this.quality == 0) {
      this.$message.error("评分至少1星");
      return;
    }
    if (this.con.length == 0) {
      this.$message.error("评价内容不能为空");
      return;
    }
    const res = await sendComments(params).catch(e =>
      this.$message.error("提交失败")
    );
    if (!res) return;
    this.$message.success("提交评价成功");
    // 刷新数据
    this.$emit("update");
  },
  async submitExplain() {
    if (!this.explain) {
      this.$message.error("解释不能为空");
      return;
    }
    const params = {
      order_sn: this.orderInfo.order_sn,
      explain: this.explain
    };
    const res = await sendExplain(params).catch(e =>
      this.$message.error("提交失败")
    );
    if (!res) return;
    this.$message.success("提交解释成功");
    // 刷新数据
    this.$emit("update");
  }
};
export default {
  inject: ["orderInfo", "identity"],
  mixins: [proxyMixin(origin), rateMixin()],
  computed: {
    title() {
      return this.identity === 1 ? "评价服务商" : "评价雇主";
    },
    otherCommentsTitle() {
      return this.identity === 1 ? "服务商对您的评价：" : "雇主对您的评价：";
    },
    evaluate() {
      return evaluateList.get(this.radio1);
    },
    employerEnd() {
      // 雇主是否评价
      if (this.orderInfo.comments) {
        return this.orderInfo.comments.u_status === 1;
      } else {
        return false;
      }
    },
    serviceEnd() {
      // 服务商是否评价
      if (this.orderInfo.comments) {
        return this.orderInfo.comments.s_status === 1;
      } else {
        return false;
      }
    },
    explainEnd() {
      // 服务商是否解释
      if (this.orderInfo.comments) {
        return this.orderInfo.comments.explain !== "";
      } else {
        return false;
      }
    },
    showCanComment() {
      // 验收后可以评价话语
      return (
        !this.orderInfo.comments ||
        (this.identity === 1 && this.orderInfo.comments.u_status !== 1) ||
        (this.identity === 2 && this.orderInfo.comments.s_status !== 1)
      );
    },
    showCanCommentBtn() {
      // 评价按钮
      return (
        !this.orderinfo.comments ||
        (this.identity === 1 && this.orderInfo.comments.u_status !== 1) ||
        (this.identity === 2 && this.orderInfo.comments.s_status !== 1)
      );
    }
  },
  data() {
    return {
      attitude: 0,
      speed: 0,
      quality: 0,
      radio1: "好评",
      con: "", // 评价内容
      showCommentsCon: false, // 展开评论主体
      explain: "", // 解释内容
      showExplainCon: false // 解释内容是否显示
    };
  },
  components: {
    commentIcon
  },
  mounted() {},
  methods: {
    more() {
      if (this.orderInfo.order_status !== 6) return;
      this.showCommentsCon = true;
    }
  }
};
</script>

<style scoped lang="less">
@bg: #f4f6f8;
@redText: #f3262d;
@c333: #333;
@c666: #666;
@pick: #fff8f8;
.no-bd {
  border: none !important;
}
.btn {
  padding: 10px 16px;
  background: @redText;
  text-align: center;
  color: #fff;
  cursor: pointer;
  margin-top: 12px;
  display: inline-block;
  &.dis {
    background: #ddd;
    font-size: 14px;
    font-weight: 400;
    cursor: not-allowed;
  }
}
.evaluate {
  display: flex;
  align-items: flex-start;
  margin-top: 12px;
  .r-t-t {
    padding-top: 7px;
    color: #333;
    font-size: 14px;
    position: relative;
    display: inline-block;
    padding-left: 12px;
    &::before {
      display: block;
      content: "";
      position: absolute;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background: #cccccc;
      left: 0;
      top: 14px;
      z-index: 2;
    }
    &.red::before {
      background: #f3262d;
    }
  }

  .icon-box {
    display: flex;
    align-items: center;
    .i-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 100px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      .icon {
        width: 21px;
        height: 21px;
        margin-bottom: 9px;
      }
      font-size: 12px;
    }
  }

  .comment-box {
    width: 879px;
    background: rgba(255, 248, 248, 1);
    padding: 20px;
    margin-top: 12px;
    .comment-item {
      display: flex;
      margin-bottom: 14px;
    }
    .label {
      font-size: 14px;
      color: #666;
      width: 90px;
      margin-right: 30px;
      text-align: right;
    }
    .comment-inp {
      width: 700px;
      height: 140px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      padding: 10px;
      font-size: 12px;
      color: #333;
      outline: none;
      resize: none;
    }
  }
  .comment-top {
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    .top-time {
      margin-left: 11px;
    }
  }
  .comment-top-box {
    margin-bottom: 14px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 14px;
    flex: 1;
    &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
  .icon-mar-left {
    margin-right: 100px;
    &:last-child {
      margin-right: 0;
    }
  }

  .btn {
    padding: 10px 16px;
    background: @redText;
    text-align: center;
    color: #fff;
    cursor: pointer;
    margin-top: 12px;
    display: inline-block;
    border-radius: 2px;
    &.dis {
      background: #ddd;
      font-size: 14px;
      font-weight: 400;
      cursor: not-allowed;
    }
  }
  .right {
    padding-top: 7px;
    margin-left: 20px;
    font-size: 14px;
    color: @c666;
    max-width: 880px;
    button {
      margin-top: 12px;
    }
    .item1 {
      min-width: 880px;
      .pj {
        font-size: 14px;
        span {
          span {
            margin-right: 44px;
          }
        }
      }
      .js {
        display: flex;
        width: 880px;
        background: rgba(255, 248, 248, 1);
        padding: 20px;
        .js-div {
          padding-left: 20px;
          .el-textarea {
            width: 685px;
            background: rgba(255, 255, 255, 1);
          }
        }
      }
      p {
        line-height: 27px;
        span {
          margin-left: 12px;
        }
        .active {
          color: @redText;
        }
      }
    }
    .item2 {
      padding: 20px;
      background: rgba(255, 248, 248, 1);

      .pjgz-2 {
        display: flex;
        .t1 {
          width: 60px;
          text-align: right;
          margin-right: 48px;
        }
        p {
          padding-top: 10px;
          display: flex;
          align-items: center;
          img {
            margin-right: 0.5em;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
        .el-textarea {
          width: 636px;
        }
      }
    }
  }
  .commentcon-enter-active,
  .commentcon-leave-active {
    transition: max-height 0.5s;
    max-height: 752px;
    overflow: hidden;
  }
  .commentcon-enter,
  .commentcon-leave-to {
    max-height: 0;
  }
}
</style>
<style lang="less">
.comment-top {
  & > .el-rate {
    & > .el-rate__item {
      & > .el-rate__icon {
        font-size: 17px;
      }
      & > .el-icon-star-on {
        font-size: 25px;
      }
    }
  }
}
</style>
