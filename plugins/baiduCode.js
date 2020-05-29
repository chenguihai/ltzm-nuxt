module.exports = (() => {
	switch (process.env.NODE_ENV) {
		case 'test':
				return 'https://hm.baidu.com/hm.js?b3dc20fd3223f49aa80a0414086a9075'
		default:
			return 'https://hm.baidu.com/hm.js?0a506a846b3e2566ef6f7f83df39ecb1'
	}
})()
