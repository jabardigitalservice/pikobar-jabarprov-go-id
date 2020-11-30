importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.2/workbox/workbox-sw.js')
// --------------------------------------------------
// Configure
// --------------------------------------------------
workbox.routing.registerRoute(
  ({ request }) => request.mode === 'navigate',
  new workbox.strategies.NetworkFirst({
    cacheName: 'pikobar-pages',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'pikobar-assets',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'pikobar-images',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  }),
);

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

self.__precacheManifest = [].concat(self.__precacheManifest || [])
// workbox.precaching.suppressWarnings(); // Only used with Vue CLI 3 and Workbox v3.
workbox.precaching.precacheAndRoute(self.__precacheManifest, {},{
  ignoreUrlParametersMatching: [/.*/]
})