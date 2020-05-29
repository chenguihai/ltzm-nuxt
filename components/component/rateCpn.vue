<template>
  <el-rate
    v-model="rateValue"
    :disabled="isDisabled"
    class="star_class"
    :colors="['#f3262d','#f3262d','#f3262d']"
    disabled-void-color="#ddd"
    score-template="{value}"
  ></el-rate>
</template>    
<script>
export default {
  name: "rateCpn",
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
    pass: [Number, String]
  },
  data() {
    if (typeof this.pass === "string") {
      this.pass = +this.pass;
    }
    return {
      isDisabled: this.disabled,
      rateValue: this.pass
    };
  }
};
</script>
<style lang="scss">
.star_class {
  .el-rate__icon {
    margin-right: 0px!important;
    font-size: 20px;
  }
}
</style>  