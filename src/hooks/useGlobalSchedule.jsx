import { useEffect, useState } from "react";
import {
  getSchedule,
  updateScheduleService,
  getStatus,
} from "../services/globalScheduleService";
import toast from "react-hot-toast";

export default function useGlobalSchedule() {
  const [isLoading, setIsLoading] = useState(true);
  const [allSchedule, setAllSchedule] = useState();
  const [allStatus, setAllStatus] = useState();

  const fetchGlobalSchedule = async () => {
    try {
      const response = await getSchedule();
      setAllSchedule(response);
    } catch (error) {
      console.log("Erro ao buscar escala", error);
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
      const response = await updateScheduleService(shiftId, statusId, timeId);
      toast.success("Escala atualizada");
      return response;
    } catch (err) {
      toast.error(err?.message || "Erro ao atualizar escala");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalSchedule();
    fetchStatusUserSchedule();
  }, []);

  return { allSchedule, allStatus, updateSchedule, isLoading, fetchGlobalSchedule };
}
