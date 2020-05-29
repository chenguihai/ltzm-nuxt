<template>
  <h3 class="info-title">
    {{text}}
  </h3>
</template>

<script>
export default {
  props: ['text']
};
</script>

<style scoped lang="less">
@redText: #f3262d;
@c333: #333;
.info-title {
  border-left: 6px solid @redText;
  font-size: 20px;
  color: @c333;
  padding-left: 5px;
  font-weight: 400;
  height: 20px;
  line-height: 20px;
}
</style>
