import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqBQimCHpSMxqRfyOLFCowRa7HiPR_jvY",
  authDomain: "cadastros-89e18.firebaseapp.com",
  projectId: "cadastros-89e18",
  storageBucket: "cadastros-89e18.appspot.com",
  messagingSenderId: "130034995872",
  appId: "1:130034995872:web:ccc3b5ea879013c6e92fc5",
  measurementId: "G-592SXVPQF5",
};

const firebasApp = initializeApp(firebaseConfig);

const auth = getAuth(firebasApp);
const db = getFirestore(firebasApp);
const storage = getStorage(firebasApp);

export { auth, db, storage };
