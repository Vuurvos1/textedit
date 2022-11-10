export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","mstile-144x144.png","mstile-150x150.png","mstile-310x150.png","mstile-310x310.png","mstile-70x70.png","safari-pinned-tab.svg","site.webmanifest","service-worker.js"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".ico":"image/vnd.microsoft.icon",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"},
	_: {
		entry: {"file":"_app/immutable/start-e24c33ce.js","imports":["_app/immutable/start-e24c33ce.js","_app/immutable/chunks/index-d9b73412.js","_app/immutable/chunks/singletons-fda1fbdf.js","_app/immutable/chunks/index-4aa33943.js","_app/immutable/chunks/preload-helper-b21cceae.js"],"stylesheets":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js')
		],
		routes: [
			{
				id: "/api/cookie",
				pattern: /^\/api\/cookie\/?$/,
				names: [],
				types: [],
				optional: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/cookie/_server.js')
			},
			{
				id: "/api/v1/items",
				pattern: /^\/api\/v1\/items\/?$/,
				names: [],
				types: [],
				optional: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/v1/items/_server.js')
			},
			{
				id: "/api/v1/login",
				pattern: /^\/api\/v1\/login\/?$/,
				names: [],
				types: [],
				optional: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/v1/login/_server.js')
			},
			{
				id: "/api/v1/logout",
				pattern: /^\/api\/v1\/logout\/?$/,
				names: [],
				types: [],
				optional: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/v1/logout/_server.js')
			},
			{
				id: "/api/v1/users/[user]/features",
				pattern: /^\/api\/v1\/users\/([^/]+?)\/features\/?$/,
				names: ["user"],
				types: [null],
				optional: [false],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/v1/users/_user_/features/_server.js')
			},
			{
				id: "/api/v1/users/[user]/subscription",
				pattern: /^\/api\/v1\/users\/([^/]+?)\/subscription\/?$/,
				names: ["user"],
				types: [null],
				optional: [false],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/v1/users/_user_/subscription/_server.js')
			},
			{
				id: "/notes",
				pattern: /^\/notes\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/notes/[slug]",
				pattern: /^\/notes\/([^/]+?)\/?$/,
				names: ["slug"],
				types: [null],
				optional: [false],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
