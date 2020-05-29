const baiduUrl = require('./plugins/baiduCode')
const webpack = require('webpack')
    // const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
// var ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: '凌天众媒一站式全媒界大型媒体电商平台',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
            { hid: 'keywords', name: 'keywords', content: '电梯广告，写字楼广告，住宅小区广告，地铁高铁广告，电视广告，电台广告，地铁广告，校园媒体，广告交易平台' },
            { name: 'renderer', content: 'webkit' },
            { 'http-equiv': 'pragram', content: 'no-cache' },
            { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' },
            { 'http-equiv': 'expires', content: '0' },
            { 'http-equiv': 'cache', content: 'no-cache' }

        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'dns-prefetch', href: '//www.zhongmei66.com' },
            { rel: 'dns-prefetch', href: '//www.ltzm66.com' },
            { rel: 'dns-prefetch', href: '//www.lingtianzhongmei.com' },
            { rel: 'dns-prefetch', href: '//www.zhongmeiwang.com' },
        ],
        script: [
            // { src: 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' },
            // {
            // 	src: 'http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js',
            // 	'data-id': '101572448',
            // 	'data-redirecturi': 'http://dev.api.zhongmei66.com/api/qq/callback',
            // 	// 'data-redirecturi': 'http://dev.api.lingtianzhongmei.com/api/qq/callback',
            // },
            {
                src: baiduUrl,
                defer: true
            },
            // {
            // 	src:'http://static.bshare.cn/b/button.js#style=-1&amp;uuid=&amp;pophcol=3&amp;lang=zh'
            // },
            // {
            // 	src:'http://static.bshare.cn/b/bshareC0.js'
            // },
        ],
        __dangerouslyDisableSanitizers: ['script'],
        htmlAttrs: { lang: 'zh' }
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#f3262d', height: '2px' },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '@/assets/css/reset.less',
        '@/assets/css/common.css',
        // '@/assets/css/swiper.min.css',
        '@/assets/fonts/iconfont/iconfont.css',
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'quill/dist/quill.core.css',
        'swiper/dist/css/swiper.css',
        'video.js/dist/video-js.css',
        // '@/assets/css/animate.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~/plugins/element-ui', ssr: true },
        { src: '~utils/common-plugins.js', ssr: false },
        { src: '@/plugins/vue-awesome-swiper.js', ssr: false },
        { src: '@/plugins/map.js', ssr: false },
        { src: '@/assets/fonts/iconfont/iconfont.js', ssr: false },
        { src: '~plugins/nuxt-quill-plugin.js', ssr: false },
        { src: '~plugins/route.js', ssr: false },
        { src: '~utils/common-directives.js', ssr: false },
        { src: '~/plugins/baidu.js' },
        { src: '~plugins/nuxt-video-player-plugin.js', ssr: false },
        { src: '@/plugins/vue-lazyload', ssr: false },
        { src: '@/plugins/babel-polyfill', ssr: true },
        // { src: '@/assets/js/swiper.min5.3.js', ssr: false },
        // { src: '@/assets/js/swiper.min.js', ssr: false },
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/device',
    ],
    axios: {
        proxy: true
    },
    proxy: {
        // '/api': {
        // 	target: SERVER_URL,
        // 	changeOrigin: true,
        // 	pathRewrite: {
        // 		'^/api': ''
        // 	}
        // }
    },
    router: {
        prefetchLinks: false, // 全局禁用所有链接上的预取
        middleware: 'mobileRedirect'
    },
    render: {
        resourceHints: false, // 添加prefetch和preload，以加快初始化页面加载时间。如果有许多页面和路由，可禁用此项
    },

    vue: {
        config: {
            productionTip: true,
            devtools: true,
            silent: true
        }
    },
    /*
     ** Build configuration
     */
    build: {
        loaders: { vue: { compilerOptions: { preserveWhitespace: false } } },
        transpile: [/^element-ui/, 'vue-video-player'], //加入swiper会报错
        // extractCSS: { allChunks: true },
        analyze: false,
        extractCSS: true,




        maxChunkSize: 300000,
        productionSourceMap: false,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css', 'svg'],
        optimization: {
            minimizer: [
                // webpack4 使用的压缩插件，用来替代webpack3的 UglifyJsPlugin
                new TerserPlugin({
                    terserOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true, // 可选：false,生产移除 console.log
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        },
                        output: {
                            // 是否保留代码注释
                            comments: false
                        },
                        cache: true,
                        parallel: true, //多线程
                        // Must be set to true if using source-maps in production
                        sourceMap: process.env.NODE_ENV !== 'production'
                    }
                })
            ],
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '.',
                // minSize: 30000,// 当使用import或者require引入的模块文件大于30k会被分离出来
                maxSize: 500000, //模块超过500k将被拆分
                minChunks: 2, // 模块被引用>=1次，便分割
                maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
                maxAsyncRequests: 5, // 异步加载chunk的最大并行请求数
                cacheGroups: {
                    video: {
                        test: /node_modules[\\/]vue-video-player/,
                        chunks: 'all',
                        priority: 20, // 优先级
                        name: true
                    },
                    // swiper: {
                    // 	test: /node_modules[\\/]swiper/,
                    // 	chunks: 'all',
                    // 	priority: 20,
                    // 	name: true
                    // },
                    quill: {
                        test: /node_modules[\\/]quill/,
                        chunks: 'all',
                        priority: 20,
                        name: true
                    },
                    elementui: {
                        test: /node_modules[\\/]element-ui/,
                        chunks: 'all',
                        priority: 20,
                        name: true
                    }
                }
            },


        },

        babel: {
            plugins: [
                [
                    'component',
                    {
                        'libraryName': 'element-ui',
                        'styleLibraryName': 'theme-chalk'
                    }
                ]
            ],
            comments: true
        },


        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            // 为 客户端打包 进行扩展配置
            if (ctx.isClient) {
                if (ctx.isDev) {
                    // config.devtool = 'eval-source-map'
                    config.devtool = 'none'
                }
            }
            if (ctx.isClient) {
                // config.module.rules.push({
                // 	test: /\.(png|jpe?g|gif|svg)$/,
                // 	loader: "url-loader",
                // 	// query为旧版
                // 	options: {
                // 		limit: false,//默认10k转成base64
                // 		// outputPath:'img/'
                // 		name: 'img/[name].[hash:7].[ext]'
                // 	},

                // })

                // config.plugins.push(
                // 	new ImageminPlugin({
                // 		disable: process.env.NODE_ENV !== 'production', // Disable during development
                // 		pngquant: {
                // 		  quality: '95-100'
                // 		}
                // 	  })
                // )

                config.plugins.push(
                    new webpack.IgnorePlugin({
                        resourceRegExp: /^\.\/locale$/,
                        contextRegExp: /moment$/
                    })
                    //   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
                )




            }
            // if (ctx.isDev) {
            // 	config.plugins.push(
            // 	  new HardSourceWebpackPlugin({
            // 		cacheDirectory: 'node_modules/.cache/hard-source/[confighash]'//设置缓存目录
            // 	  })
            // 	)


            //   }
            // const vueLoader = config.module.rules.find(rule => rule.loader === `vue-loader`)
            // vueLoader.options.preserveWhitespace = true
        },
    },

    generate: {
        minify: {
            collapseWhitespace: false
        }
    },
    env: {
        NODE_ENV: process.env.NODE_ENV,
        SERVER_ENV: process.env.SERVER_ENV,
    }
}