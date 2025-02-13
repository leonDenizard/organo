import { uploadScheduleToBD } from "../services/schedule"
import schedule from "../mockup/outubro.json"
import { useState } from "react"

export default function ButtonsSendSchedule() {

  const [file, setFile] = useState(null)


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
      console.log("Nenhum arquivo encontrado")
      return
    }

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        //converte o arquivo em objeto JS
        const jsonData = JSON.parse(event.target.result)

        const response = await uploadScheduleToBD(jsonData)

      } catch (error) {
        console.log("Erro ao processar o arquivo JSON")
      }
    }
    reader.readAsText(file)
    setFile(null)
  }
  
  return (
    <div className="absolute top-10">
      <input
        type="file"
        accept=".json"
        onChange={handleScheduleJson}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
        {file ? file.name : "Escolher o arquivo"}
      </label>
      <button
        className="px-4 py-2 bg-bubble-red text-white rounded ml-2"
        onClick={handleUpload}
      >
        Enviar Escala
      </button>
      
    </div>
  )
}
