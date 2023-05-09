importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCHJ7WW9uVo85rCeCNdN2LBYZ2WSQ-urgs",
    authDomain: "campusride-b34e2.firebaseapp.com",
    projectId: "campusride-b34e2",
    storageBucket: "campusride-b34e2.appspot.com",
    messagingSenderId: "851703925581",
    appId: "1:851703925581:web:50b6bd9a05a923a0734504"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  // console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});