import { uploadScheduleToBD } from "../services/schedule"
import { useState } from "react"

export default function ButtonsSendSchedule() {

  const [file, setFile] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL;


  const handleScheduleJson = (e) =>{

    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
    } else {
      console.log('Por favor, selecione um arquivo JSON válido.');
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if(!file){
      alert("Nenhum arquivo encontrado")
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        //converte o arquivo em objeto JS
        const jsonData = JSON.parse(event.target.result)

        const response = await uploadScheduleToBD(jsonData)

        alert("Escala inserida com sucesso")
      } catch (error) {
        console.log("Erro ao processar o arquivo JSON")
      }
    }
    reader.readAsText(file)
    setFile(null)
  }

  const handleDeleteSchedule = async () => {

    try {
      const response = await fetch(`${API_URL}/schedule/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if(!response.ok){
        throw new Error("Erro ao deletar escala")
      }

      alert("Escala deletada com sucesso")
    } catch (error) {
      console.error("Erro: ", error)
    }
  }
  
  return (
    <div className="relative flex justify-between w-4/5 m-auto">
      <input
        type="file"
        accept=".json"
        onChange={handleScheduleJson}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer font-semibold">
        {file ? file.name : "Escolher o arquivo"}
      </label>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-full ml-2 font-semibold"
        onClick={handleUpload}
      >
        Enviar Escala
      </button>

      <button
        className="px-4 py-2 bg-bubble-red text-white rounded-full ml-2 font-semibold"
        onClick={handleDeleteSchedule}
      >
        Deletar Escala
      </button>
      
    </div>
  )
}
