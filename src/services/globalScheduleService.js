const API_URL = import.meta.env.VITE_API_URL

export async function getSchedule () {
    const response = await fetch(`${API_URL}/global-schedule`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const result = await response.json()

    return result.data
}

export async function updateScheduleService(shiftId, statusId, timeId) {
    
    const response = await fetch(`${API_URL}/global-schedule/update-status/${shiftId}`, {
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            statusId: statusId,
            timeId: timeId
        })
    })

    const result = await response.json()

    return result.data
}

export async function getStatus(){

    try {
        const response = await fetch(`${API_URL}/status`, {
            method: "GET",
            headers: {"Content-type": "application/json"},
        })

        const result = await response.json()
        
        return result.data
    } catch (error) {
        console.log("Erro ao buscar os status de trabalho", error)      
    }
}