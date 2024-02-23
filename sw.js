const caching = "caching-v1";

self.addEventListener("install", (event) => {
  console.log("V1 installing…");
  event.waitUntil(
    caches.open(caching).then((cache) => {
      return cache.addAll(["/", "home.html", "login.js", "logo.jpeg", "manifest.webmanifest", "style.css"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin == location.origin && url.pathname == "/dog.svg") {
    event.respondWith(caches.match("/cat.svg"));
  }
});
