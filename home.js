
let interval;

function clientSideRandomNotification() {
  const notifBody = `This Notification is sent from the app main thread!`;
  const notifImg = `/logo.jpeg`;
  const notifTitle = `Client-Side Notification`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
}

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const requestNotification = document.getElementById("request-notification");
    const serverPush = document.getElementById("server-push");

    requestNotification.addEventListener("click", () => {
      Notification.requestPermission().then((result) => {
        if (result === "granted") {
          clientSideRandomNotification();
        }
      });
      interval = setInterval(clientSideRandomNotification, 30000);
    });

    serverPush.addEventListener("click", () => {
      if (interval) {
        clearInterval(interval);
      }
      navigator.serviceWorker.getRegistration().then(reg => {
        reg.pushManager.subscribe({
          userVisibleOnly: true
        }).then(sub => {
          console.log(JSON.stringify(sub));
        });
      })
    });
  });
})();
