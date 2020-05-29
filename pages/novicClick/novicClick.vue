<template>
  <div class="novicClick">
      <comHeader /> 
    <div>
      <img src="../../assets/img/novicClick/novicClick_01.jpg" alt="">
      <img src="../../assets/img/novicClick/novicClick_02.jpg" alt="">
      <img src="../../assets/img/novicClick/novicClick_03.jpg" alt="">
      <img src="../../assets/img/novicClick/novicClick_04.jpg" alt="">
      <img src="../../assets/img/novicClick/novicClick_05.jpg" alt="">
      <img src="../../assets/img/novicClick/novicClick_06.jpg" alt="">
    </div>
    <div>
      <span @click="NewHouse">
        新手入驻
      </span>
    </div>
    <comFooter />
    <side-bar ref="sideBar"></side-bar>
  </div>
</template>
<script>
import comHeader from "@/components/component/comHeader";
import comFooter from "@/components/component/comFooter";
import sideBar from "@/components/sideBar";
import { mapState } from "vuex";

export default {
  components: {
    comHeader,
    comFooter,
    sideBar
  },
  methods: {
    NewHouse(){
      this.$router.push({
        path: "/store?storeIndex=index",
      });
    }
  },
}
</script>
<style lang="less" scoped>
@import "./novicClickScode.less";
</style>