import { app } from "./initialFirebase"
import { getMessaging, getToken } from "firebase/messaging";

// Initialize Firebase
export function requestPermission() {
    console.log('Requesting permission...');
    if (typeof Notification === "undefined") {
        console.log("noti not found");
      }
      else {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            //const app = initializeApp(firebaseConfig);
    
    
    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);
    getToken(messaging, {vapidKey: "BBMD4-t0Yb_yUAnrBRQLPuWI6toaqWEbDtxHFZkcGbtqnEv52dn0k8w19WQhtGOwt7yIt_g4yheWXtTsrjQjIj8"})
    .then((currentToken) => {
        if (currentToken) {
            console.log('currentToken: ', currentToken);
        } else {
            console.log('Can not get token');
        }
    })
          } else {
            console.log('Do not have permission!');
          }
        });
      }
    
}

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});