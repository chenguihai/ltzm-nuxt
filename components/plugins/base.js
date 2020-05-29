/*
 * @Date: 2019-10-29 10:17:41
 * @LastEditors: Eve
 * @LastEditTime: 2019-12-10 16:27:39
 */
import { isObject, isNumber, isString } from '~/utils/tool'
const limitNameList = ['loginPlugin']
export default ({ content = 'loginType', struct, id, name, whiteList }) => {
	const Component = (options, resolve, reject) => {
		const nowPage = location.pathname
		//if (whiteList && whiteList.includes(nowPage)) return
		if (isNumber(options) || isString(options)) {
			options = {
				[content]: +options
			}
		}
		const Instance = new struct({ data: options })
		Instance.id = `${name}-${id}`
		Instance.vm = Instance.$mount()
		Instance.vm.visible = !(limitNameList.includes(name) && document.querySelector(`.${name}`))
		Instance.vm._resfn = resolve
		Instance.vm._rejfn = reject
		Instance.dom = Instance.vm.$el
		document.body.appendChild(Instance.dom)
		return Instance.vm
	}
	return Component
}
