const API_URL = import.meta.env.VITE_API_URL

export const uploadScheduleToBD = async (json) => {
  try {
    const schedule = await fetch(`${API_URL}/schedule/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log("API_URL:", API_URL)

    const response = await schedule.json()

    console.log("Resposta do GET:", response)

    if (response.length === 0) {
      const uploadSchedule = await fetch(`${API_URL}/schedule/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(json)
      })

      if (!uploadSchedule.ok) {
        const errorText = await uploadSchedule.text()
        console.log("Erro na resposta do servidor:", errorText)
        return
      }

    } else {
      console.log("Já existe uma escala cadastrada")
    }
  } catch (error) {
    console.error("Erro ao enviar a escala para o banco de dados: ", error);
    return { success: false, message: `Erro: ${error.message}` };
  }
};
