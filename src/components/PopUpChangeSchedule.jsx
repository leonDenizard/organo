import { useEffect, useState } from "react";
import CheckBox from "./Checkbox";
import useGlobalSchedule from "../hooks/useGlobalSchedule";

export default function PopUpChangeSchedule({
  closeModal,
  date,
  shiftId,
  workShifts,
  allStatus,
  fetchGlobalSchedule
}) {
  const { updateSchedule } = useGlobalSchedule();

  const [shift, setShift] = useState(shiftId._id || "")
  const [selectTime, setSelectTime] = useState(shiftId.time._id || "");
  const [selectStatus, setSelectStatus] = useState(shiftId.status._id || "");

  // console.log(allStatus);
  // console.log(shiftId);

  const handleChangeTime = (id) => {
    setSelectTime((prev) => (prev === id ? null : id));
  };

  const handleChangeStatus = (id) => {
    setSelectStatus((prev) => (prev === id ? null : id));
  };

  const submitUpdateSchedule = async (shiftId, statusId, timeId) => {

    try {
      await updateSchedule(shiftId, statusId, timeId)

      if(fetchGlobalSchedule){
        await fetchGlobalSchedule()
      }

      closeModal()
      
    } catch (error) {
      console.log("Erro ao atualizar escala")
    }
  };

  useEffect(() => {
    console.log("ID Selecionado do popUp selectTime:", selectTime);
    console.log("ID Selecionado do popUp selectStatus:", selectStatus);
    console.log(date);
  }, [selectTime, selectStatus]);

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
        <p>
          {shiftId.time?.startTime} - {shiftId.time?.endTime}
        </p>
        {/* <p>Shift _id {shiftId._id}</p> */}
      </div>

      <div>
        <p>Mudar horario</p>
        {workShifts.map((ws) => (
          <CheckBox
            key={ws._id}
            id={ws._id}
            title={`${ws.startTime} às ${ws.endTime}`}
            isChecked={selectTime === ws._id}
            onChange={() => handleChangeTime(ws._id)}
          />
        ))}
      </div>

      <div>
        <p>Mudar de status</p>
        {allStatus.map((st) => (
          <CheckBox
            key={st._id}
            id={st._id}
            title={st.description}
            isChecked={selectStatus === st._id}
            onChange={() => handleChangeStatus(st._id)}
          />
        ))}
      </div>

      <div>
        <button
          onClick={() => submitUpdateSchedule(shift, selectStatus, selectTime)}
        >
          Atualizar escala
        </button>
      </div>
    </div>
  );
}
