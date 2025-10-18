import { useEffect, useState } from "react";
import {
  getSchedule,
  updateScheduleService,
  getStatus,
  deleteSchedule,
  generateAndCreateSchedule,
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
      
      if(shiftId.length === 0){
        return  toast.error("Precisa ser selecionado algum dia")
      } 
      toast.success("Escala atualizada");
      return response;
    } catch (err) {
      toast.error(err?.message || "Erro ao atualizar escala");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSchedule = async() => {
    
    toast
      .promise(deleteSchedule (),{
        loading: "Deletando escala",
        success: "Escala deletada com sucesso",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar cargo";
          return msg;
        }
      }).then(() => {
        fetchGlobalSchedule();
      })
  }

  const handleGenerateSchedule = async(schedule) => {

    toast.promise(
      generateAndCreateSchedule(schedule),
      {
        loading: "Gerando escala...",
        success: "Escala criada com sucesso",
        error: "Erro ao criar escala"
      }.then(() => {
        fetchGlobalSchedule()
      })
    )
  }

  useEffect(() => {
    fetchGlobalSchedule();
    fetchStatusUserSchedule();
  }, []);

  return { 
    allSchedule, 
    allStatus, 
    updateSchedule, 
    isLoading, 
    fetchGlobalSchedule, 
    handleDeleteSchedule,
    handleGenerateSchedule
  };
}
