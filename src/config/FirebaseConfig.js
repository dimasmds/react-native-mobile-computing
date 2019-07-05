import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-w9woiadJ5dO2x_3WzyXkM07sFFKWSc0",
    authDomain: "mobile-computing-random.firebaseapp.com",
    databaseURL: "https://mobile-computing-random.firebaseio.com",
    projectId: "mobile-computing-random",
    storageBucket: "",
    messagingSenderId: "740645049619",
    appId: "1:740645049619:web:9c98ebde770b4313"
  };

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);