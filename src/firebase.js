import { useEffect} from "react";
import axiosClient from "../src/Components/Authentication/ApiCall";
import { message } from "antd";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";


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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function getPushNotification(deviceToken){
  axiosClient
  .get("/pushnotification/getPushNotification?token=" + deviceToken)
  .then((response) => {
    if (response.isSuccess === true) {
      console.log("successNotification",response);
    } else {
      console.log("Something went wrong");
      // message.error("something went wrong");
    }
  })
  .catch((err) => {
    //console.log("errr", err);
    if (err.status === 0) {
      message.error("Server error");
    } else {
      message.error(err.error);
    }
  });
}

// Request permission for notifications
const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      try {
        // Get FCM token
        var deviceToken = await getToken(messaging, { vapidKey: 'BOUnWzYWARtXgHMUWSm6NsVswXh78Z95C2XP159ybQal2o0JJKoV-0D1wa45hJcp9auEM539FLzwTKvD8kspY20'});
        if (deviceToken) {
          console.log('FCM Token', deviceToken);
          getPushNotification(deviceToken);
          // You can send the token to your server or use it in your app
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } catch (ex) {
        console.log("Error getting token", ex);
      }
    } else if (permission === 'denied') {
      console.log('Notification permission denied.');
      // alert('Permission denied by user');
    } else if (permission === 'default') {
      console.log('The user did not grant or deny the permission.');
      // alert('Permission is in default state from user');
    }
  } catch (ex) {
    console.error('Error requesting notification permission:', ex);
  }
};

const checkPermission = () => {
  if (Notification.permission === 'granted') {
    console.log('Notification permission already granted.');
    requestNotificationPermission();
  } else if (Notification.permission === 'denied') {
    console.log('Notification permission denied.');
  } else if (Notification.permission === 'default') {
    requestNotificationPermission();
  }
};

// Call checkPermission when your component mounts or at an appropriate time
checkPermission();


// Handle incoming messages
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // Customize notification here
//   const notificationTitle = 'Foreground Message Title';
//   const notificationOptions = {
//     body: "test message",
//     // icon: payload.notification.icon,
//   };

//   if (Notification.permission === 'granted') {
//     new Notification(notificationTitle, notificationOptions);
//   }
// });

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}


const handleIncomingMessages = async() => {
  // console.log('handleIncomingMessages',  onMessage(messaging));
  onMessage(messaging, async (payload) => {
    console.log('Message received. ', payload);

    const notificationTitle = payload.notification?.title || 'Foreground Message Title';
    const notificationOptions = {
      body: payload.notification?.body || 'Test message',
      icon: 'https://cdn.pixabay.com/photo/2015/12/16/17/41/bell-1096280_1280.png'
      // payload.notification?.icon || '/default-icon.png',
    };

    if (Notification.permission === 'granted') {
      try {
        // Show notification
        new Notification(notificationTitle, notificationOptions);
      } catch (error) {
        console.error('Error displaying notification: ', error);
      }
    } else {
      console.log('Notification permission not granted');
    }
  });
};
handleIncomingMessages();


export { requestNotificationPermission };
