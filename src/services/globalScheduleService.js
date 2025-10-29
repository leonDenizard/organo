const API_URL = import.meta.env.VITE_API_URL

export async function getSchedule() {
    const response = await fetch(`${API_URL}/global-schedule`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    const result = await response.json()

    return result.data
}

export async function updateScheduleService(shiftIds, statusId, timeId) {

    const response = await fetch(`${API_URL}/global-schedule/update-status/bulk`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            shiftId: shiftIds,
            statusId: statusId,
            timeId: timeId
        })
    })

    const result = await response.json()

    return result.data
}

export async function getStatus() {

    try {
        const response = await fetch(`${API_URL}/status`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })

        const result = await response.json()

        return result.data
    } catch (error) {
        console.log("Erro ao buscar os status de trabalho", error)
    }
}

export async function deleteSchedule() {

    try {

        const response = await fetch(`${API_URL}/global-schedule`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" }
        })

        const result = await response.json()

        return result.data
    } catch (error) {
        console.log(error)
    }
}

export async function generateAndCreateSchedule(schedule) {

    try {
        const response = await fetch(`${API_URL}/global-schedule`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(schedule)
        })

        if (!response.ok) {
            throw new Error(`Erro ao criar escala: ${response.statusText}`);
        }

        const result = await response.json()
        return result.data
    } catch (error) {
        console.error("Erro em generateAndCreateSchedule:", error);
        throw error; // propaga o erro pro hook/tratamento com toast
    }
}

export async function getScheduleById(id){

    try {
        const response = await fetch(`${API_URL}/global-schedule/${id}`, {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })

        if (!response.ok) {
            throw new Error(`Erro ao criar escala: ${response.statusText}`);
        }

        const result = await response.json()
        return result.data
    } catch (error) {
        console.error("Erro em getScheduleById:", error);
        throw error;
    }
}

export async function deleteScheduleById(ids){
    try {
        const response = await fetch(`${API_URL}/global-schedule/ids`, {
            method: "DELETE",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ids:ids})
        })

        if (!response.ok) {
            throw new Error(`Erro ao criar escala: ${response.statusText}`);
        }

        const result = await response.json()
        return result.data

    } catch (error) {
        console.error("Erro em deleteScheduleById:", error);
        throw error;
    }
}