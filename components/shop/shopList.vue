<template>
  <!-- 商品列表 -->
  <ul class="list-box">
    <shop-item v-for="item in list" :key="item.id" :info="item" :show-btn="showBtn" :hideOther="hideOther"></shop-item>
  </ul>
</template>

<script>
  import shopItem from './shopItem'
  export default {
    name: 'shopList',
    props: ['list', 'showBtn', 'hideOther'],
    components:{
      shopItem
    },
  };
</script>

<style scoped lang="less">
  .list-box{
    display:flex;
    flex-wrap: wrap;
  }
</style>
