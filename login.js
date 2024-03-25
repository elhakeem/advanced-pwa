import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js'

// // Add Firebase products that you want to use
// import { getAuth } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging.js'


const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator
        .serviceWorker.register("firebase-messaging-sw.js", {
          scope: "./",
        });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const sendOTP = (cp = () => {}) => {
  if ("OTPCredential" in window) {
    const ac = new AbortController();
    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal,
      })
      .then((otp) => {
        cp(otp.code);
        ac.abort();
      })
      .catch((err) => {
        ac.abort();
        console.log(err);
      });
  }
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbxL8cbXhzvBWTGUTXa2XBOGx2X453rmw",
  authDomain: "book-a-service-88145.firebaseapp.com",
  databaseURL: "https://book-a-service-88145.firebaseio.com",
  projectId: "book-a-service-88145",
  storageBucket: "book-a-service-88145.appspot.com",
  messagingSenderId: "272406522048",
  appId: "1:272406522048:web:175c08773e2c82cff56525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

console.log(app, messaging, onMessage)

onMessage((payload) => {
  new Notification(payload.notification.title, payload.notification.body);
});

function clientSideRandomNotification() {
  const notifBody = `This Notification is sent from the app main thread!`;
  const notifImg = `/logo.jpeg`;
  const notifTitle = `Client-Side Notification`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

(() => {
  registerServiceWorker();
  window.addEventListener("DOMContentLoaded", () => {
    const phoneNumberField = document.getElementById("phone-number");
    const sendOtpButton = document.getElementById("send-otp");
    const otpField = document.getElementById("otp");
    const loginButton = document.getElementById("login");
    const subscribeBtn = document.getElementById("subs");

    sendOtpButton.addEventListener("click", () => {
      sendOTP((otp) => {
        otpField.value = otp;
      });
    });

    loginButton.addEventListener("click", () => {
      const phoneNumber = phoneNumberField.value;
      const otp = otpField.value;
      if (phoneNumber && otp) {
        window.location.href = `home.html?phone=${phoneNumber}&otp=${otp}`;
      }
    });

    subscribeBtn.addEventListener("click", () => {
      // let promise = Notification.requestPermission();
      getToken(messaging, {vapidKey: "BAon65Yx8U1D4T0DHSR5YFJA8tZUvaaL2BmnJnGPZltI8XyGBI2NgHzQG5RSzMsUFWtwEwtF3a1Jgdl1BQ2Lbas"}).then(token => {
        console.log(token);
      })
    });
  });
})();
