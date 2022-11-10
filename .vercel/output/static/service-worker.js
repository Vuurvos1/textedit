const l = [
  "/_app/immutable/start-e24c33ce.js",
  "/_app/immutable/components/pages/_layout.svelte-5b1aa64d.js",
  "/_app/immutable/assets/_layout-00d077ea.css",
  "/_app/immutable/components/error.svelte-17b25bb6.js",
  "/_app/immutable/components/pages/_page.svelte-70e5001f.js",
  "/_app/immutable/assets/_page-6ccb5760.css",
  "/_app/immutable/components/pages/notes/_slug_/_page.svelte-29d3aa3b.js",
  "/_app/immutable/modules/pages/_layout.js-c3477997.js",
  "/_app/immutable/components/pages/notes/_page.svelte-2e72460b.js",
  "/_app/immutable/modules/pages/notes/_page.js-7ea12486.js",
  "/_app/immutable/chunks/singletons-fda1fbdf.js",
  "/_app/immutable/chunks/index-d9b73412.js",
  "/_app/immutable/chunks/index-4aa33943.js",
  "/_app/immutable/chunks/preload-helper-b21cceae.js",
  "/_app/immutable/chunks/_layout-b9069e01.js",
  "/_app/immutable/chunks/stores-9eaa5e27.js",
  "/_app/immutable/chunks/supabase-82831bcf.js",
  "/_app/immutable/chunks/_page-688ed88c.js",
  "/_app/immutable/assets/_page-83a3d797.css",
  "/_app/immutable/chunks/_page-a5ca5da7.js",
  "/_app/immutable/chunks/0-d4dabc43.js",
  "/_app/immutable/chunks/1-ce228110.js",
  "/_app/immutable/chunks/2-f3163332.js",
  "/_app/immutable/chunks/3-93bfb2f0.js",
  "/_app/immutable/chunks/4-2c855531.js",
  "/_app/immutable/chunks/easymde-31095713.js"
], u = [
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/browserconfig.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/mstile-144x144.png",
  "/mstile-150x150.png",
  "/mstile-310x150.png",
  "/mstile-310x310.png",
  "/mstile-70x70.png",
  "/safari-pinned-tab.svg",
  "/site.webmanifest"
], p = "1668099176162", t = self, i = `cache${p}`, o = l.concat(u), h = new Set(o);
t.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(i).then((s) => s.addAll(o)).then(() => {
      t.skipWaiting();
    })
  );
});
t.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const a of s)
        a !== i && await caches.delete(a);
      t.clients.claim();
    })
  );
});
async function r(e) {
  const s = await caches.open(`offline${p}`);
  try {
    const a = await fetch(e);
    return s.put(e, a.clone()), a;
  } catch (a) {
    const c = await s.match(e);
    if (c)
      return c;
    throw a;
  }
}
t.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), a = s.protocol.startsWith("http"), c = s.hostname === self.location.hostname && s.port !== self.location.port, n = s.host === self.location.host && h.has(s.pathname), m = e.request.cache === "only-if-cached" && !n;
  a && !c && !m && e.respondWith(
    (async () => n && await caches.match(e.request) || r(e.request))()
  );
});
