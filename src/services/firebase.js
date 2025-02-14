import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"

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
const db = getFirestore(app);

export const auth = getAuth(app);
export { db, collection, addDoc }

export const checkUserExists = async (uid) => {

  if (!uid) {
    return false;
  }

  //console.log("UID firebase.js checkUserExists", uid)
  try {
    const response = await fetch(`http://localhost:3000/api/user/${uid}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {

      const data = await response.json()
      console.log("Usuario encontrado funcao checkUserExists", data)
      return data

    }else{
      //console.log("Usuário não encontrado funcao checkUserExists")
      return false
    }


  } catch (error) {
    console.error("Erro ao encontrar usuário", error)
    return false
  }


};

const analytics = getAnalytics(app);

