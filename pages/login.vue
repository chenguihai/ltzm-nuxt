<template>
  <login-content />
</template>

<script>
import LoginContent from '~/components/login/login-content.vue'
export default {
  layout: 'login-common',
  components: {
    LoginContent
  },
  mounted(){
    if(this.$route.query.code&&this.$route.query.code==402){
      this.$message.error(this.$route.query.msg||'账号已被禁用，无法登录！')
    }
  }
}
</script>

<style>

</style>
