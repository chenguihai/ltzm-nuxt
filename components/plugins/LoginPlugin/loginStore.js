const SET_TOKEN = 'SET_TOKEN'
const loginStore = () => ({
	actions: {
		[SET_TOKEN]({ commit }, token) {
			try {
				commit('root/SAVE_TOKEN', token, { root: true })
			} catch (err) {}
		}
	},
	states: {},
	mutations: {},
	getters: {}
})

export default loginStore
