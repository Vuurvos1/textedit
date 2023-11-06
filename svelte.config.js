// import vercelAdapter from '@sveltejs/adapter-vercel';
// import staticAdapter from '@sveltejs/adapter-static';
import autoAdapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.IS_DESKTOP ? 'building static' : 'building Vercel');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ postcss: true }),

	kit: {
		// Change adapter based on build enviroment
		// adapter: process.env.IS_DESKTOP
		// 	? staticAdapter({
		// 			pages: 'electron/dist',
		// 			assets: 'electron/dist',
		// 			fallback: 'index.html'
		// 	  })
		// 	: vercelAdapter()
		adapter: autoAdapter(),
		paths: {
			base: ''
		},

		csrf: {
			checkOrigin: false
		}

		// Only build the endpoints in web enviroment
		// This seems removed for now?
		// routes: (path) => {
		// 	if (process.env.IS_DESKTOP && path.includes('/api/')) {
		// 		return false;
		// 	}
		// 	return true;
		// }
	},

	vitePlugin: {
		experimental: {
			inspector: {
				// change shortcut
				toggleKeyCombo: 'meta-shift',
				// hold and release key to toggle inspector mode
				holdMode: false,
				// show or hide the inspector option
				// showToggleButton: 'always',
				// inspector position
				toggleButtonPos: 'top-right'
			}
		}
	}
};

export default config;
