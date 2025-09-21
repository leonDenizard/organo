import useParameterization from "../hooks/useParameterization"
import CheckBox from "./Checkbox"


export default function PopUpChangeSchedule({closeModal, date, shiftId, workShifts}) {

  const selectedTime = shiftId.time._id
  console.log(shiftId.time._id)
  
  return (
    <div className="fixed w-2/3 m-auto h-4/5 top-0 left-0 right-0 bottom-0 backdrop-blur-3xl z-10 bg-modal-color flex flex-col justify-center items-center border rounded-lg border-border-color">
      
      <button
        onClick={closeModal}
        className="absolute top-0 right-3 mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Fechar
      </button>

      <div className="border">
        <p>{date}</p>
        <img src={shiftId.userId?.photoUrl} alt="" />
        <p>{shiftId.userId?.name}</p>
        <p>{shiftId.time?.startTime} - { shiftId.time?.endTime}</p>
        <p>Shift _id {shiftId._id}</p>
       
      </div>
      
      <div>
        <p>Mudar horario</p>
        {workShifts.map((ws) =>(

          <CheckBox
            key={ws._id}
            id={ws._id}
            title={`${ws.startTime} às ${ws.endTime}`}
            isChecked={selectedTime?.includes(ws._id)}
          />

        ) )}
      </div>
      <div>
      </div>
    </div>
  )
}
