<template>
  <!-- 确认验收付款 -->
  <div class="supplement-box" @click.self="close">
    <div class="supplement">
      <div class="top">
        <p class="title">
          {{
          identity === 1 ? '确认验收付款' : '申请验收付款'
          }}
        </p>
      </div>

      <div class="top-tip" v-if="payOrderStage">
        当前支付阶段
        <span class="str">“{{payOrderStage.name}}”</span>
        需支付
        <span class="rtx">{{payOrderStage.moneys}}</span> 元，
        赏金剩余
        <span class="rtx">{{+payOrderStage.balance}}</span> 元
      </div>

      <div class="table">
        <el-table :data="phaseData" border style="width:100%">
          <el-table-column prop="name" label="项目阶段"></el-table-column>
          <el-table-column prop="days" label="工期"></el-table-column>
          <el-table-column prop="moneys" label="付款金额"></el-table-column>
          <el-table-column label="付款状态">
            <template slot-scope="scope">{{scope.row.status === 1 ?'已付款' : '未付款'}}</template>
          </el-table-column>
        </el-table>
      </div>

      <div class="code-box" v-if="identity === 1">
        <p>
          短信验证码将发至
          <span>{{otherPhone}}</span>
        </p>
        <div class="inp-box">
          <el-input class="inp" v-model="code" placeholder="请输入短信验证码"></el-input>
          <div
            class="btn"
            :class="{dis:!canCountDownDo}"
            @click.stop="sendCode"
            :loading="loadConfig.sendCodeLoading"
          >{{countDownUIText}}</div>
        </div>
      </div>

      <div class="tips-box" v-if="identity === 1">
        <p>温馨提示：</p>
        <p>1、此操作会从托管金额中扣除指定金额支付给服务商，请谨慎操作；雇主需支付完上一 阶段的金额，才能进行下一阶段的支付</p>
        <p>2、如需更换手机号请前往雇主中心->更改绑定手机号页面进行更换</p>
      </div>
      <div class="tips-box" v-else>
        <p>温馨提示：</p>
        <p>1、此操作会通知雇主验收您上传的文件，请确保您已完成当前阶段工作并上传成果。</p>
        <p>2、雇主验收通过后，平台将奖金结算到您的账户余额。</p>
      </div>
      <div class="btn-box">
        <div class="btn" @click.stop="submit">确定</div>
        <div class="btn cancel" @click.stop="close">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendPhaseCode, getPhase, payPhase } from "~/api/order";
import { countDownMixin, dialogMixin } from "~/utils/common-mixins";
import { applyPay } from "~/api/order";
export default {
  name: "acceptance",
  mixins: [countDownMixin(), dialogMixin()],
  data() {
    return {
      phaseData: [
        { phase: "项目开发阶段1", limit: "一天", amount: 88888, pay: true }
      ],
      code: "",
      code_key: "",
      otherPhone: "",
      payOrderStage: false,
      loadConfig: {
        sendCodeLoading: false
      }
    };
  },
  computed: {
    imgApi() {
      return this.$store.state.uploadApi;
    }
  },
  inject: ["orderInfo", "identity"],
  created() {
    this.getPhaseInfo();
  },
  methods: {
    async applyPayment() {
      const res = await applyPay(this.orderInfo.order_sn).catch(e =>
        this.$message.error("申请失败")
      );
      const { data, code, message } = res.data;
      if (code === 200) {
        this.$message.success("申请成功");
        this.close(1);
      } else {
        this.$message.error(message);
      }
    },
    async submit() {
      if (this.identity !== 1) return this.applyPayment();
      if (this.code === "") return this.$message.error("请填写验证码");
      const params = {
        order_sn: this.orderInfo.order_sn,
        verification_key: this.code_key,
        verification_code: this.code,
        stage_id: this.payOrderStage.id // 阶段id
      };
      const res = await payPhase(params).catch(e =>
        this.$message.error("验收失败")
      );
      const { data, code, message } = res.data;
      if (code === 200) {
        // 发起结算 后应该支付
        this.$message.success("验收成功");
        this.close(1);
        window.location.reload();
      } else {
        this.$message.error(message);
      }
    },
    async sendCode() {
      if (!this.canCountDownDo) return;
      if (!this.otherPhone) return this.$message.error("手机号解析错误");
      this.loadConfig.sendCodeLoading = true;
      const res = await sendPhaseCode(this.otherPhone).catch(e =>
        this.$message.error("发送失败")
      );
      this.loadConfig.sendCodeLoading = false;
      if (!res) return;
      this.code_key = res.data.data.key;
      // 发送验证码
      this.countDownInit();
    },
    async getPhaseInfo() {
      const data = await getPhase(this.orderInfo.order_sn).catch(e =>
        this.$message.error("获取项目阶段信息失败")
      );
      if (!data) return;
      const { orderStageList, mobile, payOrderStage } = data.data.data;
      this.phaseData = orderStageList;
      this.otherPhone = mobile;
      this.payOrderStage = payOrderStage;
    }
  }
};
</script>

<style scoped lang="less">
.supplement-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  .supplement {
    width: 630px;
    background: #fff;
    padding-bottom: 36px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 25px;
      background: #f5f5f5;
      text-align: center;
      .title {
        font-size: 16px;
        font-weight: 400;
        color: #333;
        width: 100%;
        text-align: center;
      }
    }
    .close {
      font-size: 16px;
      width: 11px;
      height: 11px;
      cursor: pointer;
      &:hover {
        color: #f3262d;
      }
    }
    .btn {
      padding: 10px 20px;
      background: rgba(243, 38, 45, 1);
      border-radius: 2px;
      font-size: 14px;
      margin: auto;
      cursor: pointer;
      margin-top: 30px;
      color: #fff;
      text-align: center;
      display: inline-block;
      &.dis {
        background: #e3e3e3;
        color: #999;
        cursor: not-allowed;
      }
      &:hover:not(.dis) {
        background: #f43c42;
      }
    }
    .top-tip {
      margin-top: 30px;
      text-align: center;
      .str {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333;
      }
      .rtx {
        color: #ff0027;
      }
    }
    .table {
      padding: 0 65px;
      margin-top: 14px;
      color: #666;
      /deep/ th {
        background: #f4f6f8 !important;
      }
      /deep/ td {
        background: #f4f6f8 !important;
      }
    }
  }
  .code-box {
    margin-top: 50px;
    padding: 0 65px;
    p {
      span {
        color: #f3262d;
      }
    }
    .inp-box {
      margin-top: 13px;
      display: flex;
      align-items: center;
      .inp {
        width: 162px;
        height: 36px;
        margin-right: 20px;
      }
      .btn {
        margin: 0;
      }
    }
  }
  .tips-box {
    margin-top: 26px;
    padding: 0 65px;
    p {
      font-size: 13px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #888;
      margin-top: 12px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
  .btn-box {
    margin-top: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      margin: 0;
      margin-right: 12px;
    }
    .cancel {
      background: rgba(244, 244, 244, 1);
      border: 1px solid rgba(223, 223, 223, 1);
      color: #666;
      &:hover {
        background: #ffffff !important;
      }
    }
  }
}
</style>
