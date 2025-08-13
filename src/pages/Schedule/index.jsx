import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../components/Loader";
import Calendar from "../../components/Calendar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import ButtonsSendSchedule from "../../components/ButtonsSendSchedule";
import Breadcrumb from "../../components/Breadcrumb";
import toast from "react-hot-toast";

export default function Schedule({ showHeader = true, onDayClick, uid }) {
  const { googleUser, logOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingDays, setLoadingDays] = useState(new Set());
  const [userDataLogged, setUserDataLogged] = useState(null);
  const [workedDays, setWorkedDays] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Mês atual (1-12)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Ano atual

  const [loggedUserData, setLoggedUserData] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedUserResponse = await fetch(
          `${API_URL}/user/${googleUser.uid}`
        );
        const loggedUser = await loggedUserResponse.json();

        setLoggedUserData(loggedUser);

        const userUIDToFetch = loggedUser.admin && uid ? uid : googleUser.uid;

        const userResponse = await fetch(`${API_URL}/user/${userUIDToFetch}`);
        const selectedUser = await userResponse.json();
        setSelectedUserData(selectedUser);

        const scheduleResponse = await fetch(
          `${API_URL}/schedule/${userUIDToFetch}`
        );
        const schedule = await scheduleResponse.json();

        const workedDaysArray = [];
        schedule.forEach((item) => {
          const dayData = item.schedule;

          for (const [date, uids] of Object.entries(dayData)) {
            if (uids.includes(userUIDToFetch))
              workedDaysArray.push(parseInt(date.split("-")[0], 10));
          }
        });

        setWorkedDays(workedDaysArray);
      } catch (error) {
        console.error("Erro ao buscar dados ou usuário não está escala", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [uid, googleUser]);

  if (isLoading) {
    <Loader />;
  }

  // 🔄 Função para atualizar a escala
  const handleDayClick = async (day) => {

    if(!day) return
    if (!isAdmin) {
      toast.error("Você não possui permissão parar alterar escala");
      return;
    }
    // Bloqueia clique duplo no mesmo dia
    if (loadingDays.has(day)) return;

    const formattedDate = `${String(day).padStart(2, "0")}-${String(
      currentMonth
    ).padStart(2, "0")}-${currentYear}`;

    // Guarda estado anterior para rollback se der erro
    const prevWorkedDays = [...workedDays];
    const alreadyWorked = workedDays.includes(day);

    try {
      // Marca dia como "carregando"
      setLoadingDays((prev) => new Set(prev).add(day));

      // Atualiza UI otimisticamente
      setWorkedDays((prev) =>
        alreadyWorked ? prev.filter((d) => d !== day) : [...prev, day]
      );

      // Chama backend
      //await new Promise(resolve => setTimeout(resolve, 2000))

      const response = await fetch(`${API_URL}/schedule/update`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          uid: selectedUserData.uid,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar no backend");

      const data = await response.json();
      if (!data.success) throw new Error("Resposta inesperada do backend");

      console.warn("✅ Escala atualizada", data);
    } catch (error) {
      console.error("❌ Erro ao atualizar escala:", error);
      // Rollback para estado anterior
      setWorkedDays(prevWorkedDays);
    } finally {
      // Remove do loading
      setLoadingDays((prev) => {
        const newSet = new Set(prev);
        newSet.delete(day);
        return newSet;
      });
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
    await logOut();
    navigate("/");
  };
  return (
    <div className="container w-[90%] m-auto min-h-screen">
      {!isLoading ? (
        <>
          <Breadcrumb />
          {showHeader && (
            <Header name={firstName} img={profilePhoto} logout={handleLogOut} />
          )}
          <Calendar
            workedDays={workedDays}
            onDayClick={handleDayClick}
            loadingDays={loadingDays}
          />
          {isAdmin && <ButtonsSendSchedule />}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
