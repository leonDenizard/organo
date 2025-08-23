import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Loader from "../../components/Loader";
import Calendar from "../../components/Calendar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import ButtonsSendSchedule from "../../components/ButtonsSendSchedule";
import Breadcrumb from "../../components/Breadcrumb";
import toast from "react-hot-toast";

export default function Schedule({ showHeader = true, userId }) {
  const { googleUser, logOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingDays, setLoadingDays] = useState(new Set());
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [workedDays, setWorkedDays] = useState([]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Busca dados do usuário logado e do selecionado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        // 1. Pega usuário logado pelo Google UID
        const res = await fetch(`${API_URL}/user/sigin/${googleUser.uid}`);
        const loggedUser = await res.json();
        setLoggedUserData(loggedUser.data);

        // 2. Decide qual usuário buscar
        const targetId = isAdmin && userId ? userId : loggedUser.data._id;

        // 3. Pega dados do usuário alvo
        const userRes = await fetch(`${API_URL}/user/${targetId}`);
        const selectedUser = await userRes.json();
        setSelectedUserData(selectedUser);

      } catch (error) {
        console.error("❌ Erro ao buscar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (googleUser) fetchUser();
  }, [googleUser, userId, isAdmin]);

  // 🔹 Busca a escala do usuário selecionado
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!selectedUserData?.data?._id) return;

      try {
        setIsLoading(true);

        const userId = selectedUserData.data._id;
        const scheduleResponse = await fetch(`${API_URL}/schedule/${userId}`);
        const schedule = await scheduleResponse.json();

        const workedDaysArray = [];
        schedule?.data?.forEach((item) => {
          const dayData = item.schedule;
          for (const [date, ids] of Object.entries(dayData)) {
            if (ids.includes(userId)) {
              workedDaysArray.push(parseInt(date.split("-")[0], 10));
            }
          }
        });

        setWorkedDays(workedDaysArray);
      } catch (error) {
        console.error("❌ Erro ao buscar escala:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedUserData]);

  // 🔹 Atualiza a escala ao clicar no dia
  const handleDayClick = async (day) => {
    if (!day) return;
    if (!isAdmin) {
      toast.error("Você não possui permissão para alterar escala");
      return;
    }
    if (loadingDays.has(day)) return; // evita duplo clique

    const formattedDate = `${String(day).padStart(2, "0")}-${String(
      currentMonth
    ).padStart(2, "0")}-${currentYear}`;

    const userId = selectedUserData?.data?._id;
    if (!userId) return;

    const prevWorkedDays = [...workedDays];
    const alreadyWorked = workedDays.includes(day);

    try {
      setLoadingDays((prev) => new Set(prev).add(day));

      // Atualiza UI otimisticamente
      setWorkedDays((prev) =>
        alreadyWorked ? prev.filter((d) => d !== day) : [...prev, day]
      );

      // Atualiza no backend
      const response = await fetch(`${API_URL}/schedule/update`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          date: formattedDate,
          id: userId,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar no backend");

      const data = await response.json();
      if (!data.success) throw new Error("Resposta inesperada do backend");

      console.warn("✅ Escala atualizada", data);
    } catch (error) {
      console.error("❌ Erro ao atualizar escala:", error);
      setWorkedDays(prevWorkedDays); // rollback
    } finally {
      setLoadingDays((prev) => {
        const newSet = new Set(prev);
        newSet.delete(day);
        return newSet;
      });
    }
  };

  // 🔹 Dados básicos do header
  const firstName = loggedUserData?.name?.split(" ")[0] || "";
  const profilePhoto = loggedUserData?.photoUrl || "";

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
          {isAdmin && (
            <ButtonsSendSchedule
              onScheduleChange={() => selectedUserData && setWorkedDays([])}
              setWorkedDays={setWorkedDays}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
