<template>
  <div class="steps">
    <div class="inner">
      <div
        class="item"
        v-for="(item,index) in render"
        :key="item.code"
        :class="{active:
            (item.code < finals._code || (item.code === finals._code && finals.ready))
            }"
      >
        <span class="num">{{index+1}}</span>
        <span class="line">
          <span class="icons">
            <i class="iconfont icon-xiangyoudianji-xuanzhong"></i>
            <i class="iconfont icon-xiangyoudianji-xuanzhong"></i>
          </span>
        </span>
        <div class="text">
          <p>{{item.inactiveName}}</p>
          <p>{{orderInfo[item.timeProp] | timeProp}}</p>
        </div>
      </div>
    </div>
    <div class="btn-box" v-if="identity === 1">
      <!-- 雇主视角 -->
      <!-- _code 1 待托管 -->
      <div class="btn" @click="goPay" v-if="finals._code === 1">托管赏金</div>
      <!-- 待评价之前可补充需求 -->
      <div class="btn" v-if="orderInfo.order_status < 6" @click="showSupple = true">补充需求</div>
      <div class="btn dis" v-if="orderInfo.order_status <= 2" @click="showCloseSupple = true">关闭需求</div>
      <div
        class="btn dis"
        v-if="orderInfo.order_status === 3 && orderInfo.isRefund !== 1"
        @click="showCloseSupple = true"
      >申请退款</div>
      <div
        class="btn pos"
        v-if="[6,7].includes(orderInfo.order_status) && orderInfo.u_invoice_status === 0"
        @click="showApplyInvoice = true"
      >申请发票</div>
    </div>
    <!-- 服务商视角 -->
    <div class="btn-box" v-if="identity === 2">
      <div
        class="btn"
        v-if="orderInfo.order_status <= 2 && orderInfo.confirm_status === 0"
        @click="accept(1)"
      >接受订单</div>
      <div
        class="btn dis"
        v-if="orderInfo.order_status <= 2 && orderInfo.confirm_status === 0"
        @click="accept(2)"
      >放弃订单</div>
    </div>
    <!-- 补充需求 -->
    <supplement v-if="showSupple" @close="close"></supplement>

    <!-- 关闭需求/申请退款 -->
    <close-supple v-if="showCloseSupple" @close="close"></close-supple>

    <!-- 申请发票 -->
    <ticket-info
      v-if="showApplyInvoice"
      @emitCloseDialog="handleClose"
      @emitTicketInfo="ticketInfoHttp"
    ></ticket-info>
    <!--填写收票地址-->
    <ticket-address
      v-if="ticketAddrFlag"
      @emitCloseDialog="handleClose"
      @emitTicketAddress="ticketAddressHttp"
    />
    <!-- 接受需求 -->
    <accept-order v-if="showAccept" @close="close" :type="showAccept"></accept-order>
  </div>
</template>

<script>
import supplement from "./supplement";
import closeSupple from "./closeSupple";
import ticketInfo from "./ticketInfo";
import ticketAddress from "./ticketAddress";
import acceptOrder from "./acceptOrder";
import { proxyMixin } from "~/utils/common-mixins";
import moment from "moment";
import { messageCommon } from "@/utils/common.js";
import { applyInvoice } from "~/api/order";
const origin = {
  goPay() {
    this.$router.push({
      path: "/payment",
      query: {
        order_sn: this.orderInfo.order_sn,
        type: 5
      }
    });
  },
  close(submit) {
    this.showSupple = false;
    this.showCloseSupple = false;
    this.showApplyInvoice = false;
    this.accept(0);
    submit && this.$emit("update");
  },
  accept(type) {
    this.showAccept = type;
  }
};
export default {
  name: "steps",
  components: {
    supplement,
    closeSupple,
    acceptOrder,
    ticketInfo,
    ticketAddress
  },
  mixins: [proxyMixin(origin)],
  props: {
    render: Array, // 流程渲染列表
    finals: Object // 流程定点
  },
  filters: {
    timeProp(time) {
      if (!time) return "";
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  inject: ["identity", "orderInfo"],
  data() {
    return {
      showSupple: false,
      showCloseSupple: false,
      showApplyInvoice: false,
      showAccept: 0,
      ticketAddrFlag: false,
      params: {}
    };
  },
  methods: {
    handleClose() {
      this.showApplyInvoice = false;
      this.ticketAddrFlag = false;
    },
    ticketInfoHttp(val) {
      // 填写发票信息
      this.params = val;
      this.handleClose();
      this.ticketAddrFlag = true;
    },
    ticketAddressHttp(val) {
      // 填写收票地址
      const [province, city, district] = val.addr;
      delete val.addr;
      this.params = {
        ...this.params,
        ...val,
        province,
        city,
        district,
        order_sn: this.orderInfo.order_sn
      };
      this.applyInvoiceFun();
    },
    applyInvoiceFun() {
      applyInvoice(this.params)
        .then(res => {
          const { code, data, message } = res.data;
          if (code === 200) {
            this.handleClose();
            messageCommon(this, "操作成功");
            this.$emit("update");
          } else {
            messageCommon(this, message, "error");
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
@bg: #f4f6f8;
@redText: #f3262d;
@c333: #333;
@c666: #666;
@pick: #fff8f8;
.steps {
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  margin-bottom: 0;

  .inner {
    display: flex;
    align-items: center;
    margin-left: 55px;
    .item {
      display: flex;
      padding-top: 10px;
      align-items: center;
      position: relative;
      padding-bottom: 70px;
      &:last-child > .line {
        display: none;
      }
      .num {
        box-sizing: content-box;
        text-align: center;
        width: 22px;
        height: 22px;
        line-height: 22px;
        background: rgba(221, 221, 221, 1);
        border-radius: 50%;
        color: #fff;
        border: 3px solid #f3f0f0;
      }

      .line {
        width: 228px;
        border-bottom: 1px solid #ccc;
        background: @redText;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .icons {
          position: absolute;
          left: 0;
          text-align: center;
          top: 0;
          bottom: 0;
          right: 0;
          width: 24px;
          margin: auto;
          height: 19px;
          display: flex;
          background: #fff;
          justify-content: center;
          align-items: center;
          i {
            color: #ccc;
            font-size: 7px;
          }

          i:nth-child(2) {
            position: relative;
            left: -4px;
          }
        }
      }

      .text {
        width: 120px;
        position: absolute;
        top: 48px;
        left: 0;
        transform: translateX(-36%);
        text-align: center;
        color: #999999;
        font-size: 12px;
        p:last-child {
          color: #999;
        }
      }
    }

    .active {
      .num {
        box-sizing: content-box;
        color: #fff;
        background: @redText;
        border: 3px solid #fbc5c6;
      }

      .line {
        border-bottom: 1px solid @redText;

        .icons {
          i {
            color: @redText;
          }
        }
      }

      .text {
        color: @redText;
        p:last-child {
          color: #999;
        }
      }
    }
  }

  .btn-box {
    display: flex;
    align-items: center;
    margin-left: 13px;
    .btn {
      padding: 0 20px;
      height: 36px;
      line-height: 36px;
      color: #fff;
      background: @redText;
      font-size: 14px;
      margin-right: 20px;
      border-radius: 2px;
      cursor: pointer;
      &:not(.dis):hover {
        background: #f43c42;
      }
      &.dis {
        color: #666;
        background: #f4f4f4;
        border: 1px solid #dfdfdf;
        &:hover {
          background: #ffffff;
        }
      }
      &.pos {
        color: #fff;
        background: @redText;
        border: none;
      }
    }
  }
}
</style>
