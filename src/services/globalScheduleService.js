const API_URL = import.meta.env.VITE_API_URL

export async function getSchedule () {
    const response = await fetch(`${API_URL}/global-schedule`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const result = await response.json()

    return result.data
}

export async function updateSchedule(shiftId, statusId, timeId) {
    
    const response = await fetch(`${API_URL}/global-schedule/:shiftId`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            shiftId: shiftId,
            statusId: statusId,
            timeId: timeId
        })
    })

    const result = await response.json()

    return result.data
}