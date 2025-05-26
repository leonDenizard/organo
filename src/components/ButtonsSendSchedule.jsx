import { uploadScheduleToBD } from "../services/schedule"
import { useState } from "react"
import ConfirmDeleteModal from "./ConfirmDeletedModal"

export default function ButtonsSendSchedule() {
  
  const API_URL = import.meta.env.VITE_API_URL

  const [file, setFile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)



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
    <div className="
      relative grid grid-cols-1 gap-3 p-3 top-32
      md:flex md:justify-center
      ">
      <input
        type="file"
        accept=".json"
        onChange={handleScheduleJson}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="rounded-full px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white cursor-pointer font-semibold">
        {file ? file.name : "➕ Escolher o arquivo"}
      </label>
      
      <button
        className="px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-full md:ml-2 font-semibold"
        onClick={handleUpload}
      >
        🚀 Enviar Escala
      </button>

      <button
        className="px-4 py-2 bg-bubble-red hover:bg-bubble-red/80 transition-colors text-white rounded-full md:ml-2 font-semibold row-span-1"
        onClick={() => setIsModalOpen(true)}
      >
        🗑️ Deletar Escala
        
      </button>
      {isModalOpen && (
        <ConfirmDeleteModal 
          onConfirm={() => {handleDeleteSchedule(); setIsModalOpen(false)}} 
          onCancel ={() => setIsModalOpen(false)}
        />
      )}
      
      
    </div>
  )
}
