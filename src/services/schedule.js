const API_URL = import.meta.env.VITE_API_URL;

export const uploadScheduleToBD = async (json) => {
  try {
    const schedule = await fetch(`${API_URL}/api/schedule/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await schedule.json()

    console.log(response)

    
    if(response.length === 0){
      const uploadSchedule = await fetch(`${API_URL}/api/schedule/`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(json)
       })

       const response = await uploadSchedule.json()

       if (!response.ok) {
        console.log(response)

        return
      }

      const data = await response.json()
      console.log(data)
    }else{
      return console.log("Já existe uma escala cadastrada")

    }
   

  } catch (error) {
    console.error("Erro ao enviar a escala para o banco de dados: ", error);
    return { success: false, message: `Erro: ${error.message}` };
  }
};
