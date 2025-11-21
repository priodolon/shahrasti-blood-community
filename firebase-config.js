// firebase-config.js - COMPLETE VERSION
const firebaseConfig = {
  apiKey: "AIzaSyCMCPvBk5YDB_eWnvdIJz59C5P0BKVCePw",
  authDomain: "shahrasti-blood-bank.firebaseapp.com",
  databaseURL: "https://shahrasti-blood-bank-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shahrasti-blood-bank",
  storageBucket: "shahrasti-blood-bank.firebasestorage.app",
  messagingSenderId: "903185812654",
  appId: "1:903185812654:web:63a34a69e07e575a91713f"
};

// Initialize Firebase (DIFFERENT VERSION)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
