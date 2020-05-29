<template>
  <div class="redPage">
    <comHeader />
    <div class="red_img">
      <img src="@/assets/img/redPage/red_01.jpg" alt />
      <img src="@/assets/img/redPage/red_02.jpg" alt />
      <img src="@/assets/img/redPage/red_03.jpg" alt />
      <img src="@/assets/img/redPage/red_04.jpg" alt />
      <img src="@/assets/img/redPage/red_05.jpg" alt />
      <img src="@/assets/img/redPage/red_06.jpg" alt />
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
  methods: {
   
  }
};
</script>
<style lang="less" scoped>
/deep/ .comHeader {
  /deep/ & > .head {
    display: none;
  }
}
.redPage {
  width: 1920px;
  margin: 0 auto;
  .red_img {
    width: 1920px;
    & > img {
      display: block;
    }
  }
}
</style>