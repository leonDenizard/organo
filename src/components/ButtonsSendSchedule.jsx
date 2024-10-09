import { uploadScheduleToFirestore } from "../services/schedule"
import schedule from "../mockup/outubro.json"

export default function ButtonsSendSchedule() {
  return (
    <div>
      <button className="absolute top-0 right-3 mt-4 px-4 py-2 bg-red-500 text-white rounded" 
      onClick={() => uploadScheduleToFirestore("october2024", schedule)}>Enviar escala para o firestore</button>
    </div>
  )
}
