import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Loader from "../../components/Loader";
import Calendar from "../../components/Calendar";

export default function Schedule() {
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [userDataLogged, setUserDataLogged] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {

        //Retorna somente 1 usuário
        const userUIDQuery = query(
          collection(db, "users"),
          where("uid", "==", user.uid)
        );

        try {
          const userUIDSnapshot = await getDocs(userUIDQuery);
          if (!userUIDSnapshot.empty) {
            const userDoc = userUIDSnapshot.docs[0];
            const userData = userDoc.data();

            setUserDataLogged(userData);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No user authenticated");
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div>
      {userDataLogged ? (
        <>
          <Calendar/>
        </>
      ) : (
        <Loader/>
      )}
      
    </div>
  );
}
