<template>
  <div class="exhibition">
    <div class="advertising">
      <div class="advertising_top">
        <p>广告位精选</p>
        <img src="../../../assets/img/guanggao.png" alt />
      </div>

      <ul v-if="recommmendList.length > 0">
        <li
          v-for="(item , index) in recommmendList"
          :key="index"
          @click="recomClick(item , item.id)"
        >
          <div class="liatImg">
            <img :src="envVars.IMG_HOST+item.img" alt />
          </div>
          <span class="name">{{item.name}}</span>
          <div class="liatM">
            <span>
              <p>成交量：</p>
              <p>{{item.deal_num}}</p>
            </span>
            <span>￥{{item.price}}/月</span>
          </div>
        </li>
      </ul>
      <ul class="dataNone" v-else>
        <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
        暂无数据
      </ul>
    </div>
    <div class="advertising lick">
      <div class="advertising_top">
        <p>猜你喜欢</p>
        <img src="../../../assets/img/guanggao.png" alt />
      </div>

      <ul v-if="advertising.length > 0">
        <li v-for="(item , index) in advertising" :key="index" @click="recomClick(item , item.id)">
          <div class="liatImg">
            <img :src="envVars.IMG_HOST+item.img" alt />
          </div>
          <span class="name">{{item.name}}</span>
          <div class="liatM">
            <span>
              <p>成交量：</p>
              <p>{{item.deal_num}}</p>
            </span>
            <span>￥{{item.price}}/月</span>
          </div>
        </li>
      </ul>
      <ul class="dataNone" v-else>
        <img width="90" height="115" src="../../../assets/img/pintouge.png" alt />
        暂无数据
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["recommmend", "advertisingList"],
  data() {
    return {
      advertising: [],
      recommmendList: []
    };
  },
  computed: {
    ...mapState({ envVars: "envVariables" })
  },
  mounted() {
    this.recommmendList = this.recommmend;
    this.advertising = this.advertisingList;
  },
  methods: {
    recomClick(item, id) {//todo 
      console.log('==========',item)
      this.$router.push({
        path: "/service",
        query: { id: item.id }
      });
    }
  }
};
</script>
    <style lang="less" scoped>
@import "../../../assets/css/advertisingScode.less";
</style>