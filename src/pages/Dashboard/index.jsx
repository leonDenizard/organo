import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";

export default function Dashboard() {
  const { user } = useAuth();
  
  const [userDataLogged, setUserDataLogged] = useState(null);
  const [allUsers, setAllUser] = useState([]);



  useEffect(() => {

    const fetchUserData = async () => {

        if (user) {
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

                  setAllUser(allUserData)

                  const userUIDSnapshot = await getDocs(userUIDQuery)
                  if(!userUIDSnapshot.empty){
                    const userDoc = userUIDSnapshot.docs[0]
                    const userData = userDoc.data()
                 
                    setUserDataLogged(userData)
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


  let firstName = "";
  let profilePhoto = "";

  // Verificação se os dados foram carregados antes de acessar
  if (userDataLogged && userDataLogged.name) {
    firstName = userDataLogged.name.split(' ')[0];
  }

  if (userDataLogged && userDataLogged.photoUrl) {
    profilePhoto = userDataLogged.photoUrl;
  }

  console.log("User logged", userDataLogged);

  return (
    <div className="container w-[90%] m-auto">
      <Header name={firstName} img={profilePhoto}></Header>

      <SearchBar/>

      {/* {userData.map((user, index) =>(
        <pre key={index}>{JSON.stringify(user, null, 2)}</pre>
      ))} */}
    </div>
  );
}
