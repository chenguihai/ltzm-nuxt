import Vue from 'vue'
import LoginPro from './loginp.vue'
import pluginBase from '../base'
import loginStore from './loginStore'
const LoginConstructor = Vue.extend(LoginPro)
export const Loginp = pluginBase({
	content: 'loginType',
	id: 1,
	name: 'loginPlugin',
	struct: LoginConstructor,
	whiteList: ['/login', '/']
})
export const LoginStore = loginStore
export default {
	install: v => {
		v.prototype.$loginp = Loginp
	},
	initStore(store) {
		LoginConstructor.prototype.$store = store
	}
}
