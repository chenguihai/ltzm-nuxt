<template>
  <!-- identity 1 服务商视角 -->
  <div class="ht">
    <span
      class="r-t-t"
      :class="{red:(orderInfo.order_status >= 3 && ![8,9].includes(orderInfo.order_status))}"
    >合同</span>
    <div class="right" v-if="orderInfo.order_status == 3 && !contractDetail">
      <!-- 待签署才可以签 -->
      <p>还没有发起合同，请尽快发起合同</p>
      <div class="btn" :class="{'dis':orderInfo.order_status < 3}" @click="startContract">发起合同</div>
    </div>

    <div
      class="right"
      v-if="orderInfo.order_status >= 3 && ![8,9].includes(orderInfo.order_status) && contractDetail && status!=3"
    >
      <!-- 已经签署 -->
      <p>{{isAllSign ? '已经签署合同，服务商开始工作' : '您已签署，等待对方签署合同'}}</p>
      <div class="btn" @click="startContract">查看合同</div>
    </div>
    <div class="right" v-if="status == 3">
      <!-- 还没签署 -->
      <p>{{textArr[textNum]}}</p>
      <div class="btn" @click="startContract">签署合同</div>
    </div>
    <div class="right" v-if="orderInfo.order_status < 3 || orderInfo.order_status>7">
      <!-- 已经签署 -->
      <p>当前还不能发起合同</p>
      <div class="btn dis" @click="startContract">发起合同</div>
    </div>
    <el-dialog
      custom-class="dialog-box rg-box"
      with="420"
      title="温馨提示"
      :modal-append-to-body="false"
      :visible.sync="tipsShowFlag"
      center
    >
      <div class="code-box">
        <div>根据《电子签名法》，电子合同具有法律效力，为了确保您的签名真实有效，请先实名认证。</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pushRealName">进入实名认证</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getContractDetail,
  getContractAccount,
  getCAndP
} from "~/api/contract";
export default {
  name: "signs",
  inject: ["orderInfo", "identity"],
  data() {
    return {
      tipsShowFlag: false,
      status: 0,
      isAllSign: false,
      userId: 0,
      isRealName: false,
      textArr: ["合同已发起，请尽快签署合同。", "对方已签署合同，请尽快签署。"],
      textNum: 0,
      contractDetail: {}
    };
  },
  components: {},
  methods: {
    async contractAccount() {
      let _this = this;
      let dataAc = getContractAccount();
      const { code, message, data } = dataAc;
      if (code == "200") {
        _this.isRealName = false;
      } else {
        _this.isRealName = true;
      }
    },
    pushRealName() {
      this.$router.push("/userCenter/realName/realName");
    },
    startContract() {
      if (!this.userId) return;
      getCAndP()
        .then(res => {
          if (res.data.code != 200) {
            this.tipsShowFlag = true;
          } else {
            this.contractAccount();
            if (this.orderInfo.order_status < 3) return;
            if (this.isRealName) {
              this.$emit("start", this.contractDetail, this.status);
            } else {
              this.tipsShowFlag = true;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getContractDetailData() {
      let contractDetailData = await getContractDetail(
        this.$route.query.order_sn
      ).catch(e => console.log(e));
      if (!contractDetailData) return this.$message.error("错误提示");
      this.contractDetail = contractDetailData.data.data;
      let role = {};
      if (this.contractDetail) {
        let signA = this.contractDetail.signA;
        let signB = this.contractDetail.signB;
        role = this.contractDetail.contractData.role;
        if (signA != null && signB != null) {
          this.isAllSign = true;
        }
      }
      if (this.orderInfo.order_status < 3 || this.orderInfo.order_status > 7) {
        this.status = 0;
      } else if (
        this.orderInfo.order_status == 3 &&
        this.contractDetail &&
        this.contractDetail.StuffData
      ) {
        if (
          (!this.contractDetail.signA && this.userId == role.A) ||
          (!this.contractDetail.signB && this.userId == role.B)
        ) {
          this.status = 3;
        } else {
          this.status = 2;
        }
      } else if (this.orderInfo.order_status > 3) {
        this.status = 2;
      } else {
        this.status = 1;
      }
    }
  },
  created() {
    this.getContractDetailData();
  },
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { id } = userInfo.original;
    this.userId = id;
  }
};
</script>

<style scoped lang="less">
.ht {
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
  /deep/ .dialog-box {
    position: absolute;
    width: 520px !important;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -50px !important;
  }
  /deep/ .el-button--primary {
    border: none !important;
  }
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
  .right {
    padding-top: 7px;
    margin-left: 20px;
    font-size: 14px;
    color: #666;
  }
  .btn {
    width: 86px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    background: #f3262d;
    cursor: pointer;
    margin-top: 12px;
    border-radius: 2px;
    color: #fff;
    &:not(.dis):hover {
      background: #f43c42;
    }
  }
  .dis {
    background: #ddd;
    cursor: not-allowed;
  }
}
</style>
<style lang="less">
.rg-box {
  & > .el-dialog__footer {
    padding: 10px 20px 32px;
    & > .dialog-footer {
      & > .el-button--primary:hover {
        background: #f43c42 !important;
      }
    }
  }
}
</style>
