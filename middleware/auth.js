const privateRoutes = [
	'userCenter/*',
	'payment/*',
	'shoppingCart/*',
	'store/*',
]

export default function ({
	store,
	redirect,
	route,
	req
}) {
	if (req) {
		const cookie = req.headers.cookie,
			cookies = {}
		if (cookie) {
			cookie.split(';').forEach(s => {
				const props = s.split('=')
				cookies[props[0].replace(/\s/g, '')] = props[1]
			})
		}
		cookies.access_token && store.commit('SAVE_TOKEN', cookies.access_token)
	}
	const currentFirstLevelPath = route.path.split('/*')[0];
	const exactMatchAuthRoute = privateRoutes.includes(route.path);
	const fuzzyMacthAuthRoute = privateRoutes.some((p) => p.indexOf(currentFirstLevelPath) > -1);
	if (!store.state.access_token && exactMatchAuthRoute && fuzzyMacthAuthRoute ) {
		return redirect('/login');
	}
}