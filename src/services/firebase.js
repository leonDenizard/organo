import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc, query, getDocs, where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBHkQ7m1aejMhybac9kbExQYbzo2iL4lXM",
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
    console.error("UID is null or undefined")
    return false;
  }

  const userQuery = query(collection(db, "users"), where("uid", "==", uid))
  console.log("Query created:", userQuery);
  
  try {

    const querySnapshot = await getDocs(userQuery)
    console.log("Query snapshot size:", querySnapshot.size)
    return !querySnapshot.empty

  } catch (error) {
    console.error("Error fetching documents:", error)
    return false;
  }
};

const analytics = getAnalytics(app);

