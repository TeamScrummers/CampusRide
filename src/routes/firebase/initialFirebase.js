import { initializeApp } from "firebase/app";

//Object to initalize our application, should only be used with other firebase js
export class firebaseClass {
        constructor(){
        this.firebaseApp = initializeApp({
                apiKey: "AIzaSyDMridiJkNgQGeEAep7XxCluHoTU3ANSi0",
                authDomain: "campusride-d8466.firebaseapp.com",
                projectId: "campusride-d8466",
                storageBucket: "campusride-d8466.appspot.com",
                messagingSenderId: "563369241588",
                appId: "1:563369241588:web:4c822b4f300a88602ee7a1",
                measurementId: "G-8Z61791P4B"
        });
        console.log('Application Initialized');
        }
}