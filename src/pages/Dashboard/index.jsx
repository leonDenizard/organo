import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Header from "../../components/Header";

export default function Dashboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);

  const [userImg, setUserImg] = useState("")


  useEffect(() => {

    const fetchUserData = async () => {

        if (user) {

            // console.log("Fetching data for users: ", user.uid)

            //Retorna somente 1 usuário
            const userUIDQuery = query(collection(db, "users"), where("uid", "==", user.uid))
            
            const allUserQuery = collection(db, "users")
            // console.log("Query created", q)
            
            try {
              
                const querySnapshot = await getDocs(allUserQuery)
                // console.log("Query snapshot: ", querySnapshot)

                if(!querySnapshot.empty){

                  const allUserData = []

                  querySnapshot.forEach((doc) => {
                        //console.log(" => ", doc.data())

                    allUserData.push(doc.data())
                  })

                  setUserData(allUserData)

                  const userUIDSnapshot = await getDocs(userUIDQuery)
                  if(!userUIDSnapshot.empty){
                    const userDoc = userUIDSnapshot.docs[0]
                    const userData = userDoc.data()

                    if(userData.photoUrl){
                      setUserImg(userData.photoUrl)
                    }
                    else{
                      console.log("Photo not found")
                    }

                    console.log(userData)
                  }

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
    <div className="container w-[90%] m-auto">
      <Header name="Leon" img={userImg}></Header>
      <h1 className="text-3xl">Dashboard</h1>

      {/* {userData.map((user, index) =>(
        <pre key={index}>{JSON.stringify(user, null, 2)}</pre>
      ))} */}
    </div>
  );
}
