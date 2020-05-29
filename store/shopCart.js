const CHANGE_COUNT = 'CHANGE_COUNT'
const CHANGE_CART_DATA = 'CHANGE_CART_DATA'
const CHANGE_CART_LOADING = 'CHANGE_CART_LOADING'
import { getCartList, getCartNums, delCartGoods } from '@/api/shop-cart'
import { getSpCartList } from '@/api/async-server'
import { isNumber } from '@/utils/tool'

export default {
	namespaced: true,
	state: {
		count: 0,
		cartData: [],
		cartLoading: false
	},
	mutations: {
		[CHANGE_COUNT](state, n) {
			state.count = n
		},
		[CHANGE_CART_DATA](state, d) {
			state.cartData = d
		},
		[CHANGE_CART_LOADING](state, l) {
			state.cartLoading = l
		}
	},
	actions: {
		async countChange({ commit }) {
            const countD = await getCartNums()
            var count = countD.data.data
            if (!isNumber(count) && !count) return
			commit(CHANGE_COUNT, count)
		},
		async updateCartData({ commit, dispatch }, app) {
			commit(CHANGE_CART_LOADING, true)
            const dataL = await getCartList()
			commit(CHANGE_CART_LOADING, false)
            if (!dataL) return
            var data = dataL.data.data
			commit(CHANGE_CART_DATA, data)
			dispatch('countChange')
		},
		async delGoods({ commit, dispatch }, data) {
			const res = await delCartGoods(data)
			if (!res) return
			dispatch('updateCartData')
			return true
		}
	}
}
