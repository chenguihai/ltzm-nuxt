<template>
  <div class="content">
    <img :src="envVars.IMG_HOST+ad_img" alt/>
    <div class="register-wrap">
      <div class="login-box _out-box">
        <register-box />
      </div>
    </div>
  </div>
</template>
<script>
import RegisterBox from './register-box'
import { homeimage } from "@/api/list";
import { mapState } from 'vuex';

export default {
  components: {
    RegisterBox
  },
  computed: {
    ...mapState({
      envVars: "envVariables"
    })
  },
  data () {
    return {
      ad_img: ''
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      var type = "16";
      homeimage(type)
        .then(res => {
          if (res.data.code == 200) {
            this.ad_img = res.data.data.ad_img;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>
<style scoped lang="less">
@import '../login/out.less';
.content {
  height: 610px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  background: #c31b1e;
  img {
    width: 100%;
    max-width: 1920px;
    height: 610px;
    display: block;
    margin: 0 auto;
  }
  .register-wrap {
    width: 1200px;
    margin: 0 auto;
    height: 610px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .login-box {
      background: white;
    }
  }
}
</style>