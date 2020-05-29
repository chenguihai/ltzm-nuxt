import {getCookie, setCookie} from '../../utils'

/*更改店铺信息 http://localhost:3000/store?storeIndex=index*/
export const CHANGE_STORE_INFO = (state, storeInfo) => {
    state.storeInfo = storeInfo
}

/** 更改用户信息 @param state @param payload @constructor */
export const CHANGE_USER_INFO = (state, userInfo) => {
    state.userInfo = userInfo
    if (!process.server && userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        // 2019年12月10日14:42:31 尝试剔除无用cookie
        // setCookie('userInfo', userInfo)
    }
}
/**
 * 保存token
 * @param state
 * @param access_token
 */
export const SAVE_TOKEN = (state, access_token) => {
    state.access_token = access_token
}

/**
 * 更改登录状态
 * @param state
 * @param status
 */
export const CHANGE_LOGIN = (state, status) => {
    state.login = status
}

export const GET_STORE_INFO = (state, storeInfo) => {
    state.storeInfo = storeInfo
}

export const CHANGE_IMG_HOST = (state, imgHost) => {
    state.ali_api_host = imgHost
}
export const GET_NATURE_LIST = (state, status) => {
    state.nature_list = status
}
export const GET_SCALE_LIST = (state, status) => {
    state.scale_list = status
}

// set env variables 
export const setEnvVariables = (state, content) => {
    state.envVariables = content;
}