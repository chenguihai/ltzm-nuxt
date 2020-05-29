<template>
  <div class="more-box">
    <info-con title="服务需求" :article="{con:orderInfo.service_demand, files:orderInfo.demand_files}"></info-con>
    <info-con v-if="orderInfo.supplement.length > 0" title="补充需求" :con-list="orderInfo.supplement"></info-con>
  </div>
</template>

<script>
import infoCon from './infoCon'
export default {
  name: 'moreInfo',
  components: {
    infoCon
  },
  inject: ['orderInfo', 'identity']
};
</script>

<style scoped lang="less">
@bg: #f4f6f8;
@redText: #f3262d;
@c333: #333;
@c666: #666;
@pick: #fff8f8;
.more-box {
  margin-top: 30px;
  &>div:nth-child(1){
    margin-bottom: 10px;
  }
}
</style>
