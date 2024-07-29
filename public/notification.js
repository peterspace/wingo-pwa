const checkPermission = () => {
  if (!("Notification" in window)) {
    throw new Error("No support for notification API");
  }
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  } else {
    new Notification("Hello world");
  }

  //   if (permission !== "granted") {
  //     throw new Error("Notification permission not granted");
  //   } else {
  //     subscribe();
  //   }
};

// const subscribe = async () => {
//   let sw = await navigator.serviceWorker.ready;
//   // let sw = await window.navigator.serviceWorker.ready;
//   let push = await sw.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: "Todo!!",
//   });
//   console.log({ push: JSON.stringify(push) }); // to be sent to server
// };

checkPermission();
requestNotificationPermission();

// const notify = async () => {
//   checkPermission();
//   requestNotificationPermission();
// };
// notify();
