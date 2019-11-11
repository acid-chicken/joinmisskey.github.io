/* workbox 2019-11-11T05:23:38.879Z */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
    /.*.(?:js|css|png|jpeg|jpg|svg|webp|svgz)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "assets-cache",
    })
);

workbox.routing.registerRoute(
  /^https:\/\/cdn\.jsdelivr\.net/,
  new workbox.strategies.CacheFirst({
    cacheName: 'jsdelivr',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 160
      })
    ]
  })
);
workbox.precaching.precacheAndRoute([
    {
        url: "/offline/",
        revision: "1573449818879",
    }
]);

self.addEventListener("fetch", function(event) {
  event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          return response || fetch(event.request);
      })
      .catch(function() {
          return caches.match("/offline/");
      })
  );
});
