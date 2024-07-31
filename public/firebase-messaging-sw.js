importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';


// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyC3PUIblEzsl-RURpxv7yQ3R7PxIXlZ4qM",
  authDomain: "rdpms-7bc62.firebaseapp.com",
  projectId: "rdpms-7bc62",
  storageBucket: "rdpms-7bc62.appspot.com",
  messagingSenderId: "199299823335",
  appId: "1:199299823335:web:8d750f5aee6a4a76fd1442",
  measurementId: "G-9X52YR3PS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
