import * as shared from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-5b1aa64d.js';
export { shared };
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-5b1aa64d.js","_app/immutable/chunks/index-d9b73412.js","_app/immutable/modules/pages/_layout.js-c3477997.js"];
export const stylesheets = ["_app/immutable/assets/_layout-00d077ea.css"];
