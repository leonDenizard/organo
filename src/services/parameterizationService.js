const API_URL = import.meta.env.VITE_API_URL

export async function createPosition(data) {
  const response = await fetch(`${API_URL}/position/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: data }),
  });

  const result = await response.json();

  return result.data;
}



export async function getAllPosition() {
  try {
    const response = await fetch(`${API_URL}/position/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("getAllPosition error:", error);
    return [];
  }
}


export async function deletePositionById(id) {
  try {
    const response = await fetch(`${API_URL}/position/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("deletePositionById error:", error);
    return null;
  }
}


export async function createSquad(data) {
  try {
    const response = await fetch(`${API_URL}/squad/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Corrigido Content-Type
      body: JSON.stringify({ name: data }),
    });

    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("createSquad error:", error);
    return null;
  }
}

export async function getAllSquad() {
  try {
    const response = await fetch(`${API_URL}/squad/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }, // Corrigido Content-Type
    });


    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("Erro ao buscar squads:", error);
    return null;
  }
}

export async function deleteSquadById(id){
  try {
    const response = await fetch(`${API_URL}/squad/${id}`, {
      method: "DELETE",
      headers: {"Content-type": "application/json"}
    })
    
    const result = await response.json();
    return result.data

  } catch (error) {
    console.error("Erro ao deletar Squad", error)
  }
} 

export async function createSupervisor(data){
  try {
    const response = await fetch(`${API_URL}/supervisor`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({name: data})
    })
    
    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("Erro ao criar super", error)
  }
}

export async function getAllSuper() {
  try {
    const response = await fetch(`${API_URL}/supervisor/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }, // Corrigido Content-Type
    });

    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("Erro ao buscar supervisores:", error);
    return null;
  }
}

export async function deleteSuperById(id){
  try {
    const response = await fetch(`${API_URL}/supervisor/${id}`, {
      method: "DELETE",
      headers: {"Content-type": "application/json"}
    })
    
    const result = await response.json();
    return result.data

  } catch (error) {
    console.error("Erro ao deletar Super", error)
  }
} 

export async function createWorkShift(startTime, endTime){
  try {
    const response = await fetch(`${API_URL}/work-shift`, {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        startTime: startTime,
        endTime: endTime
      })
      
    })


    const result = await response.json();
    return result.data
  } catch (error) {
    console.log("Erro ao cadastrar horário", error)
  }

}

export async function getAllWorkShift(){
  try {
    const response = await fetch(`${API_URL}/work-shift`, {
      method: "GET",
      headers: {"Content-type" : "application/json"}
    })

    
    const result = await response.json();
    return result.data
  } catch (error) {
    console.log("Erro ao buscar horários", error)
  }
}

export async function deleteWorkShiftById(id){
  try{
    const response = await fetch(`${API_URL}/work-shift/${id}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    })

    
    const result = await response.json();
    return result.data

  } catch (error) {
    console.error("Erro ao deletar horário", error)
  }
}

export async function getAllUsers(){
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {"Content-type": "application/json"}
    })

    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("Erro ao buscar usuários", error)
  }
}

export async function updateUserAdminById(id){
  try{
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        admin: true
      })
    })
    
    const result = await response.json();
    result.data

  }catch(error){
    console.error("Erro ao atualizar usuário", id, error)
  }
}

export async function deleteUserAdminById(id){
  try{
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        admin: false
      })
    })
    
    const result = await response.json();
    return result.data

  }catch(error){
    console.error("Erro ao atualizar usuário", id, error)
  }
}