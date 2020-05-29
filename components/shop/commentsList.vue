<template>
  <div class="comments-list">
    <h3><span>累计评价</span></h3>
    <overivew></overivew>
    <list-con></list-con>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import overivew from '~/components/shop/comments/overivew'
import listCon from '~/components/shop/comments/listCon'
export default {
  name: 'commentsList',
  components: {
    overivew,
    listCon
  },
  computed: {
    ...mapState(['storeInfo'])
  }
};
</script>

<style scoped lang="less">
.comments-list {
  width: 100%;
  h3 {
    span {
      width: 110px;
      display: block;
      height: 16px;
      font-size: 16px;
      color: rgba(243, 38, 45, 1);
      position: relative;
      padding-bottom: 33px;
      text-align: center;

      &:after {
        display: block;
        position: absolute;
        content: "";
        height: 2px;
        background: #f3262d;
        left: 0;
        top: 31px;
        width: 110px;
      }
    }
  }
}
</style>
