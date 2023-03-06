import { initializeApp, getApps, getApp } from "firebase/app";

export let app;

if(!getApps().lenth){
        app = initializeApp({
                apiKey: "AIzaSyCHJ7WW9uVo85rCeCNdN2LBYZ2WSQ-urgs",
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
//Object to initalize our application, should only be used with other firebase js
//export class firebaseClass {
//        constructor(){
//        this.firebaseApp = initializeApp({
//                apiKey: "AIzaSyDMridiJkNgQGeEAep7XxCluHoTU3ANSi0",
//                authDomain: "campusride-d8466.firebaseapp.com",
//                projectId: "campusride-d8466",
//                storageBucket: "campusride-d8466.appspot.com",
//                messagingSenderId: "563369241588",
//                appId: "1:563369241588:web:4c822b4f300a88602ee7a1",
//                measurementId: "G-8Z61791P4B"
//        });
//        console.log('Application Initialized');
//        }
//}