const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')
const request = require('request')
// const urllib = require('urllib')
const tmpDirPath = path.join(__dirname, 'tmp')

/* router.get('/files_process', async ctx => {
	//从ctx中读取get传值

	const { file_url, name } = ctx.query
	if (!fs.existsSync(tmpDirPath)) {
		fs.mkdirSync(tmpDirPath)
	}
	ctx.set('Content-disposition', `attachment; filename="${name}"`)
	ctx.set('Content-Type', 'application/octet-stream')
	// let stream = fs.createWriteStream(path.join(tmpDirPath, name))

	// let file = await urllib.request(encodeURI(file_url))
	// ctx.body = file.data
	// request(encodeURI(file_url))

	// request
	// 	.get({
	// 		url: encodeURI(file_url),
	// 		gzip: true,
	// 		headers: {
	// 			'Content-Type': 'application/octet-stream'
	// 		}
	// 	})
	// 	.on('response', function(response) {
	// 		console.log(response.statusCode) // 200
	// 		console.log(response.headers)
	// 		// console.log(response.headers['content-type']) // 'image/png'
	// 		// res.headers['content-type'] = response.headers['content-type']
	// 		this.pipe(stream)
	// 	})
	// .pipe(stream)
	// .on('close', function(err) {
	// 	if (err) {
	// 		ctx.body = {
	// 			code: 500,
	// 			message: '文件下载失败',
	// 			data: err
	// 		}
	// 	} else {
	// 		console.log('文件[' + name + ']下载完毕')
	// 		ctx.body = {
	// 			code: 200,
	// 			message: '文件下载成功',
	// 			data: err
	// 		}
	// 	}
	// })

	// pipe generated file to the response
	fs.createReadStream(tmpExcel).pipe(res)
}) */

// router.get('/binding', async ctx => {
//   ctx.body = {
//     code:200,
//     message: 188
//   }
// })

module.exports = router.routes()
