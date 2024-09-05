importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");


const firebaseConfig = {
  apiKey: "AIzaSyBNRO-YqVwqM51pvorPbVMCTObg5ERh5R8",
  authDomain: "push-notification-1cae8.firebaseapp.com",
  projectId: "push-notification-1cae8",
  storageBucket: "push-notification-1cae8.appspot.com",
  messagingSenderId: "714692703563",
  appId: "1:714692703563:web:020b682aa8a2c7717be4ce",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
