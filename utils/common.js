// import de from "element-ui/src/locale/lang/de";
// const JSEncrypt = process.server ? undefined : require("JSEncrypt").default;

// const { JSDOM } = require('jsdom');
// const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
// const { window } = jsdom;
// global.window = window;
// global.document = window.document;
// global.navigator = {
//     userAgent: 'node.js'
// }
// const { JSEncrypt } = require('jsencrypt'); // RSA包
export function checkTaxId(taxId) {
    var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i]
    var i
    var j = regArr.length
    for (var i = 0; i < j; i++) {
        if (regArr[i].test(taxId)) {
            return true
        }
    }
    // 纳税人识别号格式错误
    return false
}
export function getAllItemIdFun(data) { // 返回数组的选项
    const option = []
    for (let i = 0; i < data.length; i++) {
        option.push(data[i].id)
    }
    return option
}

export function formatSearchTime(data) {
    const flag = data && data.length > 0
    const [start_time, end_time] = data || ['', '']
    let startTime = flag ? start_time : null;
    let endTime = flag ? end_time : null;
    return [startTime, endTime]
}

export function filterName(data = '') { //处理name
    // let val = data.split('').fill('*', 1).join('')
    let val = data.split('').map((item, index) => index > 0 ? '*' : item).join('')
    return val
}

export function filterPhone(data = '') { //处理手机号码
    // let val = data.split('').fill('*', 3, 7).join('')
    let val = data.substring(0, 3) + "****" + data.substring(7)
    return val
}

export function filterIdno(data = '') { //处理身份证
    // let val = data.split('').fill('*', 4, 14).join('')
    let val = data.substring(0, 6) + "********" + data.substring(14)
    return val
}

export function filterCode(data = '') { //处理企业统一信用代码
    // let val = data.split('').fill('*', 4, 14).join('')
    let val = data.substring(0, 6) + "********" + data.substring(14)
    return val
}

export function addressSplit(list, province, city, district) {
    let item = [],
        subItem = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == province) {
            item = list[i].child || [];
            for (let j = 0; j < item.length; j++) {
                if (item[j].id == city) {
                    subItem = item[j].child || [];
                    for (let k = 0; k < subItem.length; k++) {
                        if (subItem[k].id == district) {
                            return [item, subItem]
                        }
                    }
                }
            }
        }
    }
}

export function messageCommon(that, msg, type = 'success') { // 成功信息的发布
    that.$message({
        message: msg,
        type: type
    })
}
export function initShare({
    img,
    zmUrl,
    title
}) {

    //分享相关代码
    if (process.browser) {
        window._bd_share_config = {
            common: {
                bdSnsKey: {},
                bdText: title,
                bdUrl: zmUrl,
                bdMini: "1",
                bdMiniList: false,
                bdPic: img,
                bdStyle: "1",
                //   bdSize: "24"
            },
            share: {},
            selectShare: false
        };
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "/static/api/js/share.js"
        document.body.appendChild(s);

        // 百度分享有自动销毁的逻辑，加这么一段代码   重新初始化就没问题了。
        if (window._bd_share_main) {
            window._bd_share_main.init();
        }
    }

}

// 加密
export function encryptedData(data) {
    const publicKey = `-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDW3AJoMnSBW/2P80TYHT/GQJ8k
    Bxjb9TdJpXIquBcCjWiqjzpuUN1F/uyllm5u1X4XFxAviMwCWojOEoiTCI85b88Y
    jfeXuas2VQpp7j0xzF9+wZckbvj8r/Zy5K5/xGtvbzt4QEOF/sGHuOEYXZ/Ptzam
    iR0PeTwRBn2hdhGQBwIDAQAB
    -----END PUBLIC KEY-----`;
    // 新建JSEncrypt对象
    let encryptor = new JSEncrypt();
    // 设置公钥
    encryptor.setPublicKey(publicKey);
    // 加密数据
    return encryptor.encrypt(data);
}
// 解密
export function decryptData(data) {
    const privateKey = `-----BEGIN PRIVATE KEY-----
    MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBANbcAmgydIFb/Y/z
    RNgdP8ZAnyQHGNv1N0mlciq4FwKNaKqPOm5Q3UX+7KWWbm7VfhcXEC+IzAJaiM4S
    iJMIjzlvzxiN95e5qzZVCmnuPTHMX37BlyRu+Pyv9nLkrn/Ea29vO3hAQ4X+wYe4
    4Rhdn8+3NqaJHQ95PBEGfaF2EZAHAgMBAAECgYEAmWN56G9U02Eb9V+j33GKLPvH
    YQ4cBjPa453UkoDYFH9loJYeDdF3Fth2k4SAlGmf2dYiPP05P9joX83FaMqsi/KX
    MtReHyElqVRmwm5zjlYi0yqOm8/TZ5lHXO2jC3BdWU5jU73FOcitohH83zxD4Spq
    t69tLRbsm+F6sP1UO4ECQQDzfcGtMTdokahpOc0vZCmntHO6MMlKBrMJ80wyoMoi
    +muNdDl2WSQk9xAcK13uBmNtABUg85x3HAebYau6DtnHAkEA4eW0grDgJgBKFBBD
    rtq2dvzQh6ZnlZmiaR0RqwtpN6j7BPZ1g+Pfmuzij+2zmeTpklXEO1moIEfjNxUC
    Jj2XwQJARTOekdyFBOEw3gche7CZ7iHpKienbbSNuew94b209U/6tU8s7afUD/Vv
    zLG+lmGWbGozlxPliiybNNwDdHO4DQJBANDr5VrJw0TiF6EeubpJxV+eyi3rFPoj
    MTYOEH0k/Jbhzeb1GhJ0+iUK2S9MJEM8l1kjwW0yqm/QjLAw2eAMLwECQDY4hldJ
    T0ZsxD0XPEvZZNCdAnt0ZqOqeUs9sPy7pC6FysUeIWXrKxgQBeS1KiFBjXMPPZCW
    fgjmwbJR7ENHNQs=
    -----END PRIVATE KEY-----`;

    // 新建JSEncrypt对象
    let decrypt = new JSEncrypt();
    // 设置私钥
    decrypt.setPrivateKey(privateKey);
    // 解密数据
    return decrypt.decrypt(data);
}
export function bin2Hex(str) {
    var re = /[\u4E00-\u9FA5]/;
    var ar = [];
    for (var i = 0; i < str.length; i++) {
        var a = '';
        if (re.test(str.charAt(i))) { // 中文
            a = encodeURI(str.charAt(i)).replace(/%/g, '');
        } else {
            a = str.charCodeAt(i).toString(16);
        }
        ar.push(a);
    }
    str = ar.join("");
    console.log('str', str)
    return str;
}

// 计算两个时间搓的差时
export function getInterval(start, end) {
    let interval = end - start;
    interval /= 1000;
    const day = Math.round(interval / 60 / 60 / 24);
    const hour = Math.round(interval / 60 / 60 % 24);
    const minute = Math.round(interval / 60 % 60);
    const second = Math.round(interval % 60);
    return { day, hour, minute, second };
  }