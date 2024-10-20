import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Loader from "../../components/Loader";
import Calendar from "../../components/Calendar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [userDataLogged, setUserDataLogged] = useState(null);
  const [workedDays, setWorkedDays] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Busca os dados do usuário logado 
          const userUIDQuery = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const userUIDSnapshot = await getDocs(userUIDQuery);
          if (!userUIDSnapshot.empty) {
            const userDoc = userUIDSnapshot.docs[0];
            const userData = userDoc.data();
            setUserDataLogged(userData);
            
            // Depois de buscar o userDataLogged, buscar a escala
            const scheduleCollection = collection(db, "october2024");
            const scheduleSnapshot = await getDocs(scheduleCollection);
            const workedDaysArray = [];

            // Verifica cada documento (dia) na coleção de outubro2024
            scheduleSnapshot.forEach((doc) => {
              const dayData = doc.data();
              // Verifica se o uid do usuário logado está nos userIds da escala
              if (dayData.userIds.includes(userData.uid)) {
                workedDaysArray.push(doc.id); // Adiciona o dia se o usuário trabalhou
              }

              const daysWorked = workedDaysArray.map(date => {
                const day = date.split("-")[0]; // Extrai o dia do formato "DD-MM-AAAA"
                return parseInt(day, 10); // Converte para número
              });

              
              setWorkedDays(daysWorked);
            });

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

  //console.log(userDataLogged.uid)

  let firstName = "";
  let profilePhoto = "";

  // Verificação se os dados foram carregados antes de acessar
  if (userDataLogged && userDataLogged.name) {
    firstName = userDataLogged.name.split(" ")[0];
    //   nameFormated = userDataLogged.name.split(" ").slice(0, 2).join(" ");
  }

  if (userDataLogged && userDataLogged.photoUrl) {
    profilePhoto = userDataLogged.photoUrl;
  }
  const handleLogOut = async() =>{
    await logOut()
    navigate("/")
  }

  return (
    <div className="container w-[90%] m-auto min-h-screenwd">
      {!isLoading ? (
        <>
        <Header name={firstName} img={profilePhoto} logout={handleLogOut}></Header>
        <Calendar workedDays={workedDays} /> 
        
        </>
        
      ) : (
        <Loader />
      )}
      
    </div>
  );
}
