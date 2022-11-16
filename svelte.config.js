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
		adapter: autoAdapter()

		// Only build the endpoints in web enviroment
		// This seems removed for now?
		// routes: (path) => {
		// 	if (process.env.IS_DESKTOP && path.includes('/api/')) {
		// 		return false;
		// 	}
		// 	return true;
		// }
	}
};

export default config;
