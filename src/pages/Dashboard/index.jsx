import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);


  useEffect(() => {

    const fetchUserData = async () => {

        if (user) {

            // console.log("Fetching data for users: ", user.uid)

            //Retorna somente 1 usuário
            //const q = query(collection(db, "users"), where("uid", "==", user.uid))
            
            const q = collection(db, "users")
            // console.log("Query created", q)
            
            try {
              
                const querySnapshot = await getDocs(q)
                // console.log("Query snapshot: ", querySnapshot)

                if(!querySnapshot.empty){

                  const allUserData = []

                    querySnapshot.forEach((doc) => {
                        //console.log(" => ", doc.data())

                        allUserData.push(doc.data())
                    })

                    setUserData(allUserData)
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

  console.log(userData)

  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>

      {/* {userData.map((user, index) =>(
        <pre key={index}>{JSON.stringify(user, null, 2)}</pre>
      ))} */}
    </div>
  );
}
