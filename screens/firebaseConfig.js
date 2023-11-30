// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  // ... あなたのFirebaseコンフィグ
  apiKey: "AIzaSyAcn8Ilep0vVeOFO4-TsyXiRhk8vGUYKac",
  authDomain: "expo-mobile-5e037.firebaseapp.com",
  projectId: "expo-mobile-5e037",
  storageBucket: "expo-mobile-5e037.appspot.com",
  messagingSenderId: "306880378013",
  appId: "1:306880378013:web:100c5a2f19c450bc059074",
  measurementId: "G-3VXRV3H90V"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
