import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDI5Cqoan118CCXeZLSmGw6VH2RKk85kUs",
  authDomain: "suseo-reunion.firebaseapp.com",
  databaseURL: "https://suseo-reunion-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "suseo-reunion",
  storageBucket: "suseo-reunion.firebasestorage.app",
  messagingSenderId: "1080166286072",
  appId: "1:1080166286072:web:4a4bfc994e6ffd36bff10d",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
