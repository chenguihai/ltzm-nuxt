<template>
  <!--中间-->
  <div v-loading="!!token">
    <bindContent></bindContent>
  </div>
</template>

<script>

import bindContent from '~/components/login/bind-content.vue'
import { browser, tokenDoing } from '@/utils/tool'
import { mapState } from "vuex";
import { userInfoInit } from '@/api/async-server'
import dataEventTrack from '@/utils/dataEventTrack';
export default {
  layout: 'login-common',
  components: {
    bindContent
  },
   computed: {
    ...mapState({ envVars: "envVariables" }),
  },
  mounted(){
       dataEventTrack({
          referer: document.referrer,
          event_type: 'page_show',
          kv: {
            router: this.$route.fullPath,
          }
        })  
  },
  async asyncData (app) {

    const agent = app.req.headers['user-agent']
    if (!!agent.match(/AppleWebKit.*Mobile.*/)) {
      let search = '?'
      for (let [key, val] of Object.entries(app.query)) {
        search += `${key}=${val}&`
      }
      search = search.slice(0, -1)
      const redUrl = `${this.envVars.API_ROOT_URL}/bind${search}`
      app.redirect(redUrl)
    }
  },
  async fetch (app) {
    const { token } = app.query
    if (!token) return
    app.store.commit('SAVE_TOKEN', token)
  },
  data () {
    return {
      token: this.$route.query.token
    }
  },
  created () {
    if (!!this.token) {
      !process.server && tokenDoing(this.token)
      this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>
