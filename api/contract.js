/**
 * 合同接口列表
 */
import request from '@/plugins/service'


/**
 * 合同填充
 * @param data
 */
export const contentstuff = data => {
	return request({
		url: '/contract/contentstuff',
		method: 'post',
		data: data
	})
}

/**
 * 合同查看
 * @param ordersn
 */
export const getContractDetail = order_sn => {
	return request({
		url: `/contract/contract/${order_sn}`,
		method: 'GET'
	})
}

/**
 * 合同-签约清除个人签名
 * @param ordersn
 */
export const eSignUserRemove = data => {
	return request({
		url: `/contract/eSignUserRemove`,
		method: 'POST',
		data
	})
}

/*
企业个人判别
*/
export function getCAndP () {
   return request({ 
	url: '/user/sign/account',
	method: 'GET'
   })
}
/**
 * 合同-签约存放个人签名
 * @param eSignUser
 */
export const eSignUser = data => {
	return request({
		url: `/contract/eSignUser`,
		method: 'POST',
		data
	})
}
/**
 * 合同-签约查看个人签名
 * @param data
 */
export const eSignUserGet = data => {
	return request({
		url: `/contract/eSignUserGet`,
		method: 'POST',
		data
	})
}

/**
 * 合同-签约发送短信
 * @param null
 */
export const eSignUserCode = () => {
	return request({
		url: `/contract/eSignUserCode`,
		method: 'GET'
	})
}

/**
 * 合同-签约
 * @param data
 */
export const contractSign = data => {
	return request({
		url: `/contract/sign`,
		method: 'POST',
		data
	})
}
/**
 * 合同-查看合同
 * @param order_sn
 */
export const contractInfo = order_sn => {
	return request({
		url: `/contract/contract/${order_sn}`,
		method: 'GET'
	})
}
/**
 * 合同-二维码
 * @param null
 */
export const contractQrCode = data => {
	return request({
		url: `/contract/qrCode`,
		method: 'POST',
		data
	})
}
/**
 * 查询账户E签宝开通
 * @param null
 */
export const getContractAccount = () => {
	return request({
		url: `/contract/account`,
		method: 'get'
	})
}
