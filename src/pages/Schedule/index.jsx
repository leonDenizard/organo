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
  const [workedDays, setWorkedDays] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Busca os dados do usuário logado (já existe no seu código)
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

              console.log(daysWorked)
              setWorkedDays(daysWorked);
            });

            // Salva os dias trabalhados no estado
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
  return (
    <div>
      {!isLoading ? (
        <Calendar workedDays={workedDays} /> // Passa os dias trabalhados para o Calendar
      ) : (
        <Loader />
      )}
      
    </div>
  );
}
