import { useEffect, useState } from "react";
import {
  getSchedule,
  updateScheduleService,
  getStatus,
  deleteSchedule,
  generateAndCreateSchedule,
  getScheduleById,
  deleteScheduleById
} from "../services/globalScheduleService";
import toast from "react-hot-toast";

export default function useGlobalSchedule() {
  const [isLoading, setIsLoading] = useState(true);
  const [allSchedule, setAllSchedule] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [scheduleUserById, setScheduleUserById] = useState([]);

  const fetchGlobalSchedule = async () => {
    try {
      const response = await getSchedule(); // já vem com data
      if (response === null) {
        // console.log("Limpei a tela")
        setAllSchedule([]) // limpa a tela
      } else {
        setAllSchedule(response);
      }
    } catch (error) {
      console.log("Erro ao buscar escala", error);
      setAllSchedule([]); // também limpa se der erro
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStatusUserSchedule = async () => {
    try {
      const response = await getStatus();
      setAllStatus(response);
    } catch (error) {
      console.log("Erro ao buscar status");
    }
  };

  const updateSchedule = async (shiftId, statusId, timeId) => {
    try {
      if (shiftId.length === 0) {
        return toast.error("Precisa ser selecionado algum dia");
      }

      await updateScheduleService(shiftId, statusId, timeId);

      toast.success("Escala atualizada");
      await fetchGlobalSchedule(); // 🔄 Atualiza a tela após sucesso
    } catch (err) {
      toast.error(err?.message || "Erro ao atualizar escala");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchedule = async () => {
    return toast
      .promise(deleteSchedule(), {
        loading: "Deletando escala...",
        success: "Escala deletada com sucesso",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar escala";
          return msg;
        },
      })
      .then(() => fetchGlobalSchedule());
  };

  const handleDeleteScheduleById = async (ids) => {
    return toast
      .promise(deleteScheduleById(ids), {
        loading: "Deletando usuário(s) da escala...",
        success: "Usuários deletados com sucesso",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar escala";
          return msg;
        },
      })
      .then(() => fetchGlobalSchedule());
  };

  const handleGenerateSchedule = async (schedule) => {
    try {
      await toast.promise(generateAndCreateSchedule(schedule), {
        loading: "Gerando escala...",
        success: "Escala criada com sucesso",
        error: "Erro ao criar escala",
      });

      // Atualiza o contexto **depois que a escala for criada**
      await fetchGlobalSchedule();
    } catch (error) {
      console.error("Erro ao gerar escala:", error);
    }
  };

  const handleGetScheduleById = async (id) => {
    try {

      setIsLoading(true)
      setScheduleUserById([])
      const response = await getScheduleById(id);
      setScheduleUserById(response);
      fetchGlobalSchedule();
    } catch (error) {
      console.log("Erro ao buscar escala do usuário");
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchGlobalSchedule();
    fetchStatusUserSchedule();
  }, []);

  return {
    allSchedule,
    allStatus,
    scheduleUserById,
    updateSchedule,
    isLoading,
    fetchGlobalSchedule,
    handleDeleteSchedule,
    handleGenerateSchedule,
    handleGetScheduleById,
    handleDeleteScheduleById,
  };
}
