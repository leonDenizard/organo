import { useEffect, useState } from "react"
import { getSchedule, updateSchedule } from "../services/globalScheduleService"

export default function useGlobalSchedule(){
    const [isLoading, setIsLoading] = useState(true)
    const [allSchedule, setAllSchedule] = useState()


    const fetchGlobalSchedule = async() => {

        try {
            
          const response = await getSchedule()
          setAllSchedule(response)
        } catch (error) {
            console.log("Erro ao buscar escala", error)
        }finally{
            setIsLoading(false)
        }
    }

    const updateSchedule = async(shiftId, statusId, timeId) => {

        try {
           const response = await updateSchedule(shiftId, statusId, timeId) 
           console.log(response)
        } catch (error) {
            console.log("Erro ao atualizar a escala", error)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGlobalSchedule()
    }, [])

    return {allSchedule, isLoading}
}

