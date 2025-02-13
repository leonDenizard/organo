import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
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
          const userUIDQuery = await fetch(`http://localhost:3000/api/user/${user.uid}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
          })
  
          const userUIDResponse = await userUIDQuery.json()
          if (!userUIDResponse.empty) {
            setUserDataLogged(userUIDResponse);
            
            // Depois de buscar o userDataLogged, buscar a escala
            const scheduleResponse = await fetch(`http://localhost:3000/api/schedule/${userUIDResponse.uid}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })

            const schedule = await scheduleResponse.json()

           
            const workedDaysArray = [];

            // Verifica cada documento (dia) na coleção de outubro2024
            schedule.forEach((item) => {
              const dayData = item.schedule
              // Verifica se o uid do usuário logado está nos userIds da escala


              for (const [date, uids] of Object.entries(dayData)){
                if(uids.includes(userUIDResponse.uid))
                  workedDaysArray.push(date)
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
