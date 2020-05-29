const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const Router = require('koa-router')
const fileRouter = require('./fileTool')
const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'
process.on('unhandledRejection', (reason, p) => {
	// application specific logging, throwing an error, or other logic here
})

let router = new Router()

async function start() {
	// Instantiate nuxt.js
	const nuxt = new Nuxt(config)

	const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT || 3000 } = nuxt.options.server;

	// Build in development
	if (config.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	} else {
		await nuxt.ready()
	}
	// router.use('/nxapi', fileRouter)
	//加载路由中间件
	app.use(router.routes()).use(router.allowedMethods())

	app.use(ctx => {
		ctx.set('Access-Control-Allow-Origin', '*')
		ctx.status = 200
		ctx.respond = false // Bypass Koa's built-in response handling
		ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
		nuxt.render(ctx.req, ctx.res)
	})

	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	})
}

start()
