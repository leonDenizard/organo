const API_URL = import.meta.env.VITE_API_URL

export async function getSchedule () {
    const response = await fetch(`${API_URL}/global-schedule`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    const result = await response.json()

    return result.data
}

window.getSchedule = getSchedule;