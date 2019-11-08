/* workbox 2019-11-08T07:56:34.415Z */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
    /.*.(?:js|css|png|jpeg|jpg|svg|svgz|woff2)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "assets-cache",
    })
);
workbox.precaching.precacheAndRoute([
    {
        url: "/offline/",
        revision: "1573199794415",
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
