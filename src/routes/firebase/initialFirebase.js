import { initializeApp, getApps, getApp } from "firebase/app";
import { PUBLIC_FIREBASE_KEY } from '$env/static/public'

export let app;

if(!getApps().lenth){
        app = initializeApp({
                apiKey: PUBLIC_FIREBASE_KEY,
                authDomain: "campusride-b34e2.firebaseapp.com",
                databaseURL: "https://campusride-b34e2-default-rtdb.firebaseio.com",
                projectId: "campusride-b34e2",
                storageBucket: "campusride-b34e2.appspot.com",
                messagingSenderId: "851703925581",
                appId: "1:851703925581:web:50b6bd9a05a923a0734504"
              
        });
} else { 
        app = getApp(); 
}