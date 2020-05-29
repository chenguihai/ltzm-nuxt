<template>
  <div class="closeData">
    <comHeader />
    <div class="center">
      <img src="../../assets/img/pintouge.png" alt />
      <span>
        很抱歉，您查看的{{text}}，
        <i>{{time}}</i> 秒后将自动跳转到首页，如未跳转
        <a href="/">点击此处</a>
      </span>
    </div>
    <comFooter />
  </div>
</template>
<script>
import comHeader from "~/components/component/comHeader";
import comFooter from "~/components/component/comFooter";
export default {
  components: {
    comHeader,
    comFooter
  },
  data() {
    return {
      text: "",
      time: 5,
      //   flag: false,
      timer: null,
      type: this.$route.query.type
    };
  },
  mounted() {
    if (this.type == 1) {
      this.text = "服务已下架";
    } else if (this.type == 2) {
      this.text = "店铺已关闭";
    } else if (this.type == 3) {
      this.text = "案例传记已下架";
    } else if (this.type == 4) {
      this.text = "线索不存在";
    } else if (this.type == 5) {
      this.text = "上刊画面已下架";
    } else if (this.type == 6) {
      this.text = "新闻资讯不存在";
    } else if (this.type == 7) {
      this.text = "客户示例已下架";
    } else {
      this.text = "店铺不存在或已关闭";
    }
    this.countTime();
  },
  methods: {
    countTime() {
      let _times = 5;
      let _t = this.time;
      this.timer = setInterval(() => {
        _times--;
        this.time = `${_times}`;
        if (_times < 1) {
          _times = 0;
          this.time = 0;
          return this.$router.push({ path: "/" });
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
<style lang="less" scoped>
.closeData {
  & > .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0 230px 0;
    & > img {
      width: 100px;
      height: 135px;
      margin-bottom: 30px;
    }
    & > span {
      display: flex;
      font-size: 14px;
      color: #666;
      & > i {
        color: #f3262d;
      }
      & > a {
        color: #0066cc;
        cursor: pointer;
      }
    }
  }
}
</style>