import cookie from 'js-cookie'

//设置cookie
export function setCookie(n, v) {
    if (n && v) {
        cookie.set(n, v)
    }
};

//获取cookie
export function getCookie(n) {
    if (n) {
        let c = cookie.get(n)
        return c
    }
};

/*删除cookie*/
export function delCookie(n) {
    if (n) {
        cookie.remove(n)
    }
};

// 设置localstorage
export function setLocalStorage(n,v) {
    if (n && v) {
        localStorage.setItem(n, v)
    }
}

// 获取localstorage
export function getLocalStorage(n) {
    if (n) {
        let c = localStorage.getItem(n)
        return c
    }
}
// 删除localstorage
export function delLocalStorage(n) {
    if(n){
        let c = localStorage.removeItem(n)
        return c
    }
}

// 清除localstorage
export function clearLocalStorage() {
    localStorage.clear()
}

// 根据浏览器自动生成用户唯一标识码
export function newDeviceCode() {
    // 生成唯一识别码
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
  
    function guid() {
      return S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4();
    }
  
    if (localStorage && !localStorage.getItem('deviceCode')) {
        localStorage.setItem('deviceCode', guid());
    }
  }
