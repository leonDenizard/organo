import { useEffect, useState } from "react"
import { getSchedule } from "../services/globalScheduleService"

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

    useEffect(() => {
        fetchGlobalSchedule()
    }, [])

    return {allSchedule, isLoading}
}