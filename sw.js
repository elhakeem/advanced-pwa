const caching = "advanced-pwa-v1";
const cacheList = ["/", "/home.html", "/login.js", "/logo.jpeg", "/manifest.webmanifest", "/style.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(caching).then((cache) => {
      return cache.addAll(cacheList);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (cacheList.includes(url.pathname)) {
    event.respondWith(caches.match(event.request));
  }
});


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }),
  );
});


