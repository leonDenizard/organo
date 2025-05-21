import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../components/Loader";
import Calendar from "../../components/Calendar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import ButtonsSendSchedule from "../../components/ButtonsSendSchedule";
import Breadcrumb from "../../components/Breadcrumb";

export default function Schedule({ showHeader = true, onDayClick, uid }) {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loadindDay, setLoadingDay] = useState(null)
  const [userDataLogged, setUserDataLogged] = useState(null);
  const [workedDays, setWorkedDays] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Mês atual (1-12)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Ano atual


  const [loggedUserData, setLoggedUserData] = useState(null); // Dados do usuário logado (admin ou não)
  const [selectedUserData, setSelectedUserData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const loggedUserResponse = await fetch(`${API_URL}/user/${user.uid}`);
        const loggedUser = await loggedUserResponse.json();
        setLoggedUserData(loggedUser);


        const userUIDToFetch = loggedUser.admin && uid ? uid : user.uid;


        const userResponse = await fetch(`${API_URL}/user/${userUIDToFetch}`);
        const selectedUser = await userResponse.json();
        setSelectedUserData(selectedUser);


        const scheduleResponse = await fetch(`${API_URL}/schedule/${userUIDToFetch}`);
        const schedule = await scheduleResponse.json();

        const workedDaysArray = [];
        schedule.forEach((item) => {
          const dayData = item.schedule;
          for (const [date, uids] of Object.entries(dayData)) {
            if (uids.includes(userUIDToFetch)) workedDaysArray.push(parseInt(date.split("-")[0], 10));
          }
        });

        setWorkedDays(workedDaysArray);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [uid, user]);

  if (isLoading) {
    <Loader />
  }

  // 🔄 Função para atualizar a escala
  const handleDayClick = async (day) => {
    if (!loggedUserData?.admin) {
      alert("Você não tem permissão para alterar a escala.");
      return;
    }

    const formattedDate = `${String(day).padStart(2, "0")}-${String(currentMonth).padStart(2, "0")}-${currentYear}`;

    try {

      //setIsLoading(true)
      setLoadingDay(day)
      // 🔄 Busca a escala do usuário
      const scheduleResponse = await fetch(`${API_URL}/schedule/${selectedUserData.uid}`);

      if (!scheduleResponse.ok) throw new Error("Erro ao buscar escala");

      const scheduleData = await scheduleResponse.json();


      // Verifica se a resposta contém a estrutura correta (array não vazio)
      if (!Array.isArray(scheduleData) || scheduleData.length === 0) {
        console.warn("⚠️ Nenhuma escala encontrada ou formato incorreto.");
        return;
      }

      // Acessa o primeiro item do array
      const scheduleDoc = scheduleData[0];

      // Verifica se o campo 'schedule' existe no primeiro item
      if (!scheduleDoc || !scheduleDoc.schedule) {
        console.warn("⚠️ Escala não encontrada no documento.");
        return;
      }


      // Verifica se a data está presente no campo 'schedule'
      if (!scheduleDoc.schedule.hasOwnProperty(formattedDate)) {
        console.warn(`⚠️ O dia ${formattedDate} não foi encontrado na escala.`);
        return;
      }

      const scheduleForDate = scheduleDoc.schedule[formattedDate] || [];

      // Verifica se o UID está presente no dia
      const isAlreadyScheduled = scheduleForDate.includes(selectedUserData.uid);

      // 🔄 Envia requisição para atualizar no backend
      const response = await fetch(`${API_URL}/schedule/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          uid: selectedUserData.uid,
          action: isAlreadyScheduled ? "remove" : "add",
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar no backend");

      const data = await response.json();


      if (!data.success) throw new Error("Resposta inesperada do backend");

      // ✅ Atualiza UI depois da resposta do backend
      setWorkedDays((prev) =>
        isAlreadyScheduled ? prev.filter((d) => d !== day) : [...prev, day]
      );

    } catch (error) {
      console.error("❌ Erro ao atualizar escala:", error);
    } finally {
      //setIsLoading(false)
      setLoadingDay(null)
    }
  };



  let firstName = "";
  let profilePhoto = "";

  // Verificação se os dados foram carregados antes de acessar
  if (loggedUserData && loggedUserData.name) {
    firstName = loggedUserData.name.split(" ")[0];
    //   nameFormated = userDataLogged.name.split(" ").slice(0, 2).join(" ");
  }

  if (loggedUserData && loggedUserData.photoUrl) {
    profilePhoto = loggedUserData.photoUrl;
  }
  const handleLogOut = async () => {
    await logOut()
    navigate("/")
  }


  let isAdmin;
  if (loggedUserData && loggedUserData.admin){
    isAdmin = loggedUserData.admin
  }


  return (
    <div className="container w-[90%] m-auto min-h-screen">

      {!isLoading ? (
        <>
          <Breadcrumb/>
          {showHeader && <Header name={firstName} img={profilePhoto} logout={handleLogOut} />}
          <Calendar workedDays={workedDays} onDayClick={handleDayClick} loadindDay={loadindDay} />
          {isAdmin && <ButtonsSendSchedule />}
        </>

      ) : (
        <Loader />
      )}

    </div>
  );
}
