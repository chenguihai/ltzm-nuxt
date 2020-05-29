<template>
  <!-- 补充需求弹框 -->
  <div class="supplement-box"  @click.self="close">
    <div class="supplement">
      <div class="top">
        <p></p>
        <p class="title">{{title}}</p>
        <i
          class="iconfont icon-guanbi close"
          @click="close"
        ></i>
      </div>
      <div class="tips">
        {{
          type === 1 ? '确认接受订单嘛？' : '确认放弃订单嘛？'
        }}
      </div>
      <div
        class="btn"
        @click="submit"
      >确定</div>
    </div>
  </div>
</template>

<script>
import { acceptOrder } from '~/api/order'
import {dialogMixin} from '~/utils/common-mixins'
export default {
  name: 'acceptOrder',
  mixins:[dialogMixin()],
  computed: {
    title(){
      return this.type === 1 ? '接受需求' : '放弃需求'
    }
  },
  props: {
    type: {
      type:Number,
      default: 1 // 1 接收 2 放弃
    }
  },
  inject: ['orderInfo','identity'],
  methods: {
    async submit () {
      const params = {
        order_sn: this.orderInfo.order_sn,
        status: this.type === 1 ? 'Y' : 'N'
      }
      const data = await acceptOrder(params).catch(e => this.$message.error('操作失败'));
      if (!data) return 
      this.$message.success('操作成功')
      this.close(1)
      location.reload()
    }
  }
};
</script>

<style scoped lang="less">
@import './dialog.less';
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
  z-index:2000;
  .supplement {
    width: 426px;
    background: #fff;
    padding-bottom: 24px;
    height: 220px;
    overflow: hide;
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
      }
    }
    .tips{
      margin-top:49px;
      text-align:center;
      color:#666;
    }
    .btn {
      width: 80px;
      height: 36px;
      background: rgba(243, 38, 45, 1);
      border-radius: 2px;
      font-size: 14px;
      margin: auto;
      cursor: pointer;
      margin-top: 30px;
      line-height: 36px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
