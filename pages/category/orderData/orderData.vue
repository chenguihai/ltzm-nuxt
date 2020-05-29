<template>
  <div class="orderData">
    <comHeader />
    <div class="orderData_center">
      <h3>填写并核对订单信息</h3>
      <div class="order_Data">
        <span>购买清单：</span>
        <div class="tabhead">
          <ul>
            <li>服务信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
          </ul>
        </div>
        <div class="tabBody">
          <ul v-for="(item , index) in orderList" :key="index">
            <li>
              <span>{{item.name}}</span>
              <div class="itemList" v-for="(itemD , index) in item.data" :key="index">
                <div></div>
                <span>{{itemD.orderName}}</span>
                <div>
                  <span>素材时长：{{itemD.time}}S</span>
                  <span>投放周期：{{itemD.type}}</span>
                </div>
                <span>￥{{itemD.money}}</span>
                <span>X{{itemD.num}}</span>
                <span>{{itemD.subtotal}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="tabFoot">
          <span>4个服务，总金额3140.00</span>
          <span>
            <p>应付总额：</p>
            <p>￥3140.00</p>
          </span>
        </div>
        <span @click="orderClick()">提交订单</span>
      </div>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
export default {
  components: {
    comHeader,
    comFooter,
    sideBar
  },
  data() {
    return {
      orderList: [
        {
          name: "金墨文化传播有限公司",
          data: [
            {
              img: "",
              orderName:
                " 品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计",
              time: "15",
              type: "月",
              money: "1500",
              num: "1",
              subtotal: "1500"
            },
            {
              img: "",
              orderName:
                " 品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计",
              time: "15",
              type: "月",
              money: "1500",
              num: "1",
              subtotal: "1500"
            }
          ]
        },
        {
          name: "金墨文化传播有限公司",
          data: [
            {
              img: "",
              orderName:
                " 品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计",
              time: "15",
              type: "月",
              money: "1500",
              num: "1",
              subtotal: "1500"
            },
            {
              img: "",
              orderName:
                " 品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计品牌科技公司餐饮门店食品产品LOGO设计商标标志logo设计",
              time: "15",
              type: "月",
              money: "1500",
              num: "1",
              subtotal: "1500"
            }
          ]
        }
      ]
    };
  },
  methods: {
    orderClick() {
      this.$router.push({ path: "../../payment" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/css/ServGetDetailsPage/orderDataScode.less";
</style>
