<template>
  <!-- identity 1 雇主视角 -->
  <div class="job">
    <span
      class="r-t-t"
      :class="{red:(orderInfo.order_status >= 4 && ![8,9].includes(orderInfo.order_status))}"
    >工作</span>
    <div class="right">
      <job-file
        @upload="updateJob"
        :type="1"
        :has-files="acceptFiles"
        :title="identity === 1 ? '验收文件（您可直接查看或下载）' : '上传验收文件（雇主可直接查看或下载）'"
        :empty-text="`文件柜是空的，${identity === 1 ? '服务商' : '您'}还没有上传任何文件`"
      ></job-file>
      <job-file
        :type="2"
        @upload="updateJob"
        :has-files="sourceFiles"
        :title="identity === 1 ? '源文件（您验收通过后可下载）' : '上传源文件（雇主验收通过后可获得下载权限）'"
        :empty-text="`文件柜是空的，${identity === 1 ? '服务商' : '您'}还没有上传任何文件`"
        style="margin-bottom:0;"
      ></job-file>

      <div
        class="phase-box"
        v-if="phaseData && orderInfo.order_status >= 4 && ![8,9].includes(orderInfo.order_status)"
      >
        <p v-if="phaseData.payOrderStage">
          当前项目阶段
          <span>“{{phaseData.payOrderStage.name}}”</span>
          ，已验收付款
          <span>{{payedStage}}</span> 个，
          剩余
          <span>{{phaseData.orderStageList.length - payedStage}}</span> 个。
        </p>
        <p v-if="phaseData.payOrderStage" style="margin-top:9px;">
          具体内容及交付成果：需求沟通及投放方案制定
          <span class="mg1">工期：{{phaseData.payOrderStage.days}}天</span>
          <span class="mg1">付款金额：</span>
          <span>￥{{phaseData.payOrderStage.moneys}}</span>
        </p>
        <p
          v-if="phaseData.orderStageList && phaseData.orderStageList.length - payedStage === 0 && orderInfo.order_status >= 5 && ![8,9].includes(orderInfo.order_status)"
        >{{identity === 1 ? '您' : '雇主' }}已完成所有项目阶段的验收付款。</p>
      </div>

      <div class="tip" v-if="orderInfo.order_status >= 4">
        工作出现问题，你可以联系
        <span>
          <a href="https://url.cn/59IhwSe?_type=wpa&qidian=true" target="_blank">官方客服</a>
        </span>
        进行维权
      </div>

      <div
        class="btn"
        @click="goPhase"
        :class="{dis:orderInfo.order_status !== 5}"
        v-if="identity === 1 && orderInfo.order_status <= 5"
      >确认验收付款</div>
      <div
        class="btn"
        @click="goPhase"
        :class="{dis:![4,5].includes(orderInfo.order_status)}"
        v-else-if="identity === 2 && orderInfo.order_status <= 5"
      >申请验收付款</div>

      <acceptance v-if="showPhase" @close="closeDialog"></acceptance>
    </div>
  </div>
</template>

<script>
import jobFile from "./jobFile";
import acceptance from "./acceptance";
import { proxyMixin } from "~/utils/common-mixins";
const origin = {
  goPhase() {
    if (this.identity === 2 && ![4, 5].includes(this.orderInfo.order_status))
      return;
    if (this.identity === 2 && this.acceptFiles.length == 0) {
      this.$message.error("请先上传验收文件");
      return;
    }
    if (this.identity === 1 && this.orderInfo.order_status !== 5) return;
    this.surePhase();
  }
};
export default {
  name: "job",
  data() {
    return {
      showPhase: false
    };
  },
  mixins: [proxyMixin(origin)],
  components: {
    jobFile,
    acceptance
  },
  props: ["phaseData"],
  inject: ["orderInfo", "identity"],
  computed: {
    acceptFiles() {
      return this.orderInfo.workFiles.filter(item => item.type === 1);
    },
    sourceFiles() {
      return this.orderInfo.workFiles.filter(item => item.type === 2);
    },
    payedStage() {
      if (this.phaseData) {
        return this.phaseData.orderStageList.filter(item => item.status === 1)
          .length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    closeDialog(update) {
      this.showPhase = false;
    },
    updateJob(update) {
      this.$emit("update");
    },
    surePhase() {
      this.showPhase = true;
    },
  }
};
</script>

<style scoped lang="less">
@bg: #f4f6f8;
@redText: #f3262d;
@c333: #333;
@c666: #666;
@pick: #fff8f8;
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
.job {
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  .right {
    padding-top: 7px;
    margin-left: 20px;
    font-size: 14px;
    color: @c666;
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
        font-family: Microsoft YaHei;
        font-weight: 400;
        cursor: not-allowed;
      }
    }
  }
}
.phase-box {
  width: 100%;
  padding: 9px 12px;
  background: rgba(255, 248, 248, 1);
  margin-top: 12px;
  font-size: 12px;
  p {
    span {
      color: #f3262d;
    }
  }
  p:last-child {
    span {
      color: #666;
      &:last-child {
        color: #f3262d;
      }
    }
  }
  .mg1 {
    margin-left: 30px;
  }
}
.tip {
  margin-top: 11px;
  font-size: 14px;
  span,
  a {
    color: #3e93f8;
    cursor: pointer;
    &:hover {
      color: #f3262d;
    }
  }
}
</style>
