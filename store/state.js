import config  from "@/config/index";
export default () => {
    const {UPLOAD_IMAGE_URL,IMG_HOST} = config;
	return {
		login: false, //是否已登录
		userInfo: null, //用户信息
		access_token: null, //token，凭证
		storeInfo: {
			serviceStatistic: {},
			shopLevel: {},
			customer_services: {},
			shop_category: {},
			vip_level: {}
		},
		uploadApi: `${UPLOAD_IMAGE_URL}/admin/uploadImage`,
		uploadImg: `${UPLOAD_IMAGE_URL}/api/user/upavatar`,
		ali_api_host:  IMG_HOST,
		nature_list:[],
		scale_list:[],
		// shared env among both client side and server side
		envVariables: {}
	}
}
