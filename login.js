const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
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

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const phoneNumberField = document.getElementById("phone-number");
    const sendOtpButton = document.getElementById("send-otp");
    const otpField = document.getElementById("otp");
    const loginButton = document.getElementById("login");

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
  });
})();
