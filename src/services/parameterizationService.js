const API_URL = import.meta.env.VITE_API_URL

export async function createPosition(data) {
    const response = await fetch(`${API_URL}/position/`, {
        method: "POST",
        headers: { "content-type" : "application/json" },
        body: JSON.stringify({name: data})
    })

    return await response.json()
}

export async function getAllPosition() {
    const response = await fetch(`${API_URL}/position/`, {
        method: "GET",
        headers: { "content-type" : "application/json" },
    })

    return await response.json()
}