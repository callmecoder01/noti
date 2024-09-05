// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken ,onMessage} from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNRO-YqVwqM51pvorPbVMCTObg5ERh5R8",
  authDomain: "push-notification-1cae8.firebaseapp.com",
  projectId: "push-notification-1cae8",
  storageBucket: "push-notification-1cae8.appspot.com",
  messagingSenderId: "714692703563",
  appId: "1:714692703563:web:020b682aa8a2c7717be4ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const vapidKey = "BPnl5NAfqkQiPriwNkHyMWl45tvnGAqFpuxo4UPUiAOYIHDWRo074JPlW0piHK9DMQ0yQ5mjnYLSzYd4AD88Fe0"; // Ensure this key is correct
const messaging = getMessaging(app);

export const requestFCMtoken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey
        });
        return token;
      } else {
        console.log("Permission denied");
        return null;
      }
    } catch (err) {
      console.log('An error occurred while retrieving token.', err);
      throw err;
    }
};


export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}