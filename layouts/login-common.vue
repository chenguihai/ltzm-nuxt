<template>
  <div class="container">
    <!--头部-->
    <nav style="background:#fff;padding-bottom:16px;padding-top:20px;">
      <login-nav />
    </nav>
    <!--中间-->
    <main>
      <nuxt />
    </main>
    <!--底部-->
    <footer>
      <login-footer />
    </footer>
  </div>
</template>

<script>
import LoginNav from '~/components/login/login-nav.vue'
import LoginFooter from '~/components/login/login-footer.vue'
import {bodyColor} from '@/utils/common-mixins'
export default {
  mixins:[bodyColor('fff')],
  components: {
    LoginNav, LoginFooter
  }
}
</script>
