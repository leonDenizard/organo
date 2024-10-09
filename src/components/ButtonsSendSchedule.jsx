import { uploadScheduleToFirestore } from "../services/schedule"
import schedule from "../mockup/outubro.json"

export default function ButtonsSendSchedule() {
  return (
    <div>
      <button onClick={() => uploadScheduleToFirestore("october2024", schedule)}>Enviar escala para o firestore</button>
    </div>
  )
}
