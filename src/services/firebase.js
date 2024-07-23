import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCc6zuUNj--SnfmYHhqYMe0L_Zf9x3OxMY",
  authDomain: "organo-support.firebaseapp.com",
  projectId: "organo-support",
  storageBucket: "organo-support.appspot.com",
  messagingSenderId: "233972393549",
  appId: "1:233972393549:web:3ccca1b902716521435e04",
  measurementId: "G-N4ZM5ZDVVB"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);