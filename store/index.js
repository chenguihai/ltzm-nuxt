import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as mutations from './mutations/default'
import * as actions from './actions'
import moduleCart from './shopCart'
import Cookies from 'cookies'

/**
 * Gets the shared environment.
 * Documentation suggests it is only executed server side, but not wrapping
 * this in a conditional results in an error.
 * https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
 *
 * @return     {Object}  Shared environment variables.
 */
const geteEnvVariables = () =>
  process.server
    ? require('@/config').default || {}
    : {}

Vue.use(Vuex)
const store = () =>
	new Vuex.Store({
		state,
		mutations,
		modules: { moduleCart },
		actions: {
			...actions,
			nuxtServerInit(app, { req, res }) {
				if (process.server) {
					let cookies = new Cookies(req, res)
					const token = cookies.get('access_token')
					app.commit('SAVE_TOKEN', token)
					app.access_token = token
					app.commit('setEnvVariables', geteEnvVariables())
				}
			}
		}
	})

export default store
