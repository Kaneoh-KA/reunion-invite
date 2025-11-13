// Firebase SDK 불러오기
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ 실시간 DB 추가

// ✅ Firebase 설정 (Realtime Database URL 반드시 포함!)
const firebaseConfig = {
  apiKey: "AIzaSyDI5Cqoan118CCXeZLSmGw6VH2RKk85kUs",
  authDomain: "suseo-reunion.firebaseapp.com",
  databaseURL: "https://suseo-reunion-default-rtdb.asia-southeast1.firebasedatabase.app/", // 🔥 이 줄 추가
  projectId: "suseo-reunion",
  storageBucket: "suseo-reunion.appspot.com", // ✅ 수정됨 (firebasestorage.app ❌)
  messagingSenderId: "1080166286072",
  appId: "1:1080166286072:web:4a4bfc994e6ffd36bff10d"
};

// ✅ Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// ✅ Realtime Database 인스턴스 생성
export const db = getDatabase(app);
