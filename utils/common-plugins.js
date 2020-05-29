import Vue from 'vue'
import Loginp from '~/components/plugins/LoginPlugin'
export default ({ store }) => {
	Loginp.initStore(store)
	Vue.use(Loginp)
}
