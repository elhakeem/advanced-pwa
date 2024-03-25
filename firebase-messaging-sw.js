// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDbxL8cbXhzvBWTGUTXa2XBOGx2X453rmw",
  authDomain: "book-a-service-88145.firebaseapp.com",
  databaseURL: "https://book-a-service-88145.firebaseio.com",
  projectId: "book-a-service-88145",
  storageBucket: "book-a-service-88145.appspot.com",
  messagingSenderId: "272406522048",
  appId: "1:272406522048:web:175c08773e2c82cff56525"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

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


messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, payload.notification.body);
});

