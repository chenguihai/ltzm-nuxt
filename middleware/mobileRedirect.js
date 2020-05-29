const CONFIG = require("@/config").default;


const { MOBILE_DOMAIN } = CONFIG;

const ROUTE_MAP = {
    "index": {
        pc: "/",
        m_path: "/",
    },
    "login": {
        pc: "/login",
        m_path: "/login"
    },
    "register": {
        pc: "/register",
        m_path: "/register",
    },
    "binding": {
        pc: "/binding",
        m_path: "/binding",
    },
    'store-flow': {
        // 入驻介绍
        pc: "/store/flow",
        m_path: "/settleIntroduce"
    },
    'service-id': {
        // 服务详情
        pc: "/service",
        m_path: "/serviceDetail",
    },

    'novicClick-novicClick': {
        // 新人专享
        pc: "/novicClick/novicClick",
        m_path: "/userContent/homePage/novicClick",
    },
    'business': {
        // 入驻介绍
        pc: "/business",
        m_path: "/settleIntroduce",
    },
    'clues': {
        // 线索列表
        pc: "/clues",
        m_path: "/clues"
    },
    'clues-id': {
        // 线索详情
        pc: "/clues",
        m_path: "/clues/detail"
    },
    // 'ategory-id':{
    //     // 服务列表
    //     pc: "/category",
    //     m_path: "/serviceList"
    // },
    'shop-id': {
        // 店铺首页
        pc: "/shop",
        m_path: "/shopDetail"
    },
    'clues-release': {
        // 发布线索
        pc: "/clues/release",
        m_path: "/clues/release"
    },
    'tollMarket-marketShop-marketShop': {
        // 工具市场详情
        pc: "/tollMarket/marketShop/marketShop",
        m_path: "/tollMarketData"
    },
    'tollMarket': {
        // 工具市场列表
        pc: "/tollMarket",
        m_path: "/tollMarket"
    },
    'news': {
        // 行业资讯列表
        pc: "/news",
        m_path: "/news/list"
    },
    'news-id': {
        // 行业资讯详情
        pc: "/news",
        m_path: "/news/detail"
    },
    'invitation': {
        //用户邀请
        pc: "/invitation",
        m_path: "/invitation"
    }
}

export default function(ctx) {
    // !notice: isMobileOrTablet was injected by `@nuxt/device` module
    const { route, isMobileOrTablet, redirect } = ctx;
    const {
        name,
        fullPath
    } = route;
    //   console.log('name1111',name,fullPath)
    if (isMobileOrTablet) {
        // if current route's name matched with pre-defined `redirect route map`
        // make it redirect
        //服务列表
        if (name == 'category-id') {
            redirect(302, `${MOBILE_DOMAIN}${'/serviceList'}`);
        }
        // 店铺
        if (name == 'shopwork') {
            // console.log('fullPath','/shopDetail/'+fullPath.split('=')[1])
            redirect(302, `${MOBILE_DOMAIN}${'/shopDetail/'+fullPath.split('=')[1]}`);
        }
        if (name == 'shop-id-cla' || name == 'shop-id-salerinfo' || name == 'shop-id-review' || name == 'shop-id-hot') {
            // console.log('fullPath','/shopDetail/'+fullPath.split('/')[2])
            redirect(302, `${MOBILE_DOMAIN}${'/shopDetail/'+fullPath.split('/')[2]}`);
        }
        const isHitRedirectRoute = Object.keys(ROUTE_MAP).some((r) => r === name)
        if (isHitRedirectRoute) {
            const hitInstance = ROUTE_MAP[name];
            const route = fullPath.replace(hitInstance.pc, hitInstance.m_path);
            // console.log('route',MOBILE_DOMAIN+route)
            redirect(302, `${MOBILE_DOMAIN}${route}`);
        }
    }
}