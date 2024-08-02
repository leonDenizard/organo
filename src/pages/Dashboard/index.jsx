import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);


  useEffect(() => {

    const fetchUserData = async () => {

        if (user) {

            // console.log("Fetching data for users: ", user.uid)

            const q = query(collection(db, "users"), where("uid", "==", user.uid))
            // console.log("Query created", q)
            
            try {
              
                const querySnapshot = await getDocs(q)
                // console.log("Query snapshot: ", querySnapshot)

                if(!querySnapshot.empty){
                    querySnapshot.forEach((doc) => {
                        console.log(" => ", doc.data())

                        setUserData(doc.data())
                    })
                }else{
                    console.log("Nenhum documento encontrado")
                }

            } catch (error) {
              console.error("Error fetching user data: ", error);
            }
          } else {
            console.log("No user authenticated");
        }

    };

    fetchUserData();
  }, [user]);
  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>

      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
