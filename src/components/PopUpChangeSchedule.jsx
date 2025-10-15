import { useEffect, useState } from "react";
import CheckBox from "./Checkbox";
import useGlobalSchedule from "../hooks/useGlobalSchedule";
import { X } from "lucide-react";
import MultiDayCalendar from "./MultiDayCalendar";

export default function PopUpChangeSchedule({
  closeModal,
  date,
  shiftId,
  workShifts,
  allStatus,
  fetchGlobalSchedule,
  schedule
}) {
  const { updateSchedule } = useGlobalSchedule();

  const [shift, setShift] = useState(shiftId?._id || "");
  const [selectTime, setSelectTime] = useState(shiftId?.time?._id || "");
  const [selectStatus, setSelectStatus] = useState(shiftId?.status?._id || "");
  const [selectUserId, setSelectUserId] = useState(shiftId?.userId?._id || "");
  const [selectedShiftIds, setSelectedShiftIds] = useState([])

  // console.log(allStatus);

  const formatDate = (date) => {
    
    const dateFormated = date?.split("-").join("/")
    return dateFormated
  }
  const handleChangeTime = (id) => {
    setSelectTime((prev) => (prev === id ? null : id));
  };

  const handleChangeStatus = (id) => {
    setSelectStatus((prev) => (prev === id ? null : id));
  };

  const handleMultiDaySelect = (shiftIds) => {
    setSelectedShiftIds(shiftIds);
  };

  const submitUpdateSchedule = async (shiftId, statusId, timeId) => {
    try {
      console.log("Parametrso",shiftId, statusId, timeId)
      await updateSchedule(shiftId, statusId, timeId);

      if (fetchGlobalSchedule) {
        await fetchGlobalSchedule();
      }

      closeModal();
    } catch (error) {
      console.log("Erro ao atualizar escala");
    }
  };

  //console.log("shift", selectUserId)

  return (
    <div className="fixed 2xl:w-2/3 m-auto 2xl:h-4/5 top-0 left-0 right-0 bottom-0 backdrop-blur-3xl z-10 bg-modal-color flex flex-col justify-center items-center border rounded-lg border-border-color">
      <X
      onClick={closeModal}
      
        className="absolute top-4 right-4 h-10 w-10 cursor-pointer p-1
             rounded-full bg-red-500 text-white 
             hover:bg-red-600 
              transition-transform duration-300
             hover:rotate-90
             flex items-center justify-center"
      />

      <div className=" 2xl:w-[80%] w-[60%] mb-8">
        <p className="text-5xl 2xl:mb-16 mb-8 font-semibold">{formatDate(date)}</p>
        <div className="flex items-center gap-5">
          <img
            className="rounded-full h-20 w-20"
            src={shiftId?.userId?.photoUrl}
            alt=""
          />
          <div>
            <p className="text-2xl font-semibold tracking-wider">{shiftId?.userId?.name}</p>
            <p className="text-gray-400">
              {shiftId?.time?.startTime} - {shiftId?.time?.endTime}
            </p>
          </div>

          {/* <p>Shift _id {shiftId._id}</p> */}
        </div>
      </div>

      <div className="grid grid-cols-3 2xl:w-[80%] w-[60%]">
        <div className="">
          <p className="text-2xl text-gray-200 mb-3">Mudar horario</p>
          {workShifts?.map((ws) => (
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
          <p className="text-2xl text-gray-200 mb-3">Mudar de status</p>
          {allStatus?.map((st) => (
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
          <p className="text-2xl text-gray-200 mb-3 text-center">Alterar em mais dias</p>
          <MultiDayCalendar 
            schedule={schedule} 
            userId={selectUserId}
            initialDate={date}
            initialShiftId={shiftId}
            onChange={handleMultiDaySelect} 
          />
        </div>

      </div>

      

      <div>
        <button className="border-2 border-border-color p-2 w-[350px] hover:bg-white/5 rounded-md hover:transition-all mt-8"
          onClick={() => submitUpdateSchedule(selectedShiftIds, selectStatus, selectTime)}
        >
          Atualizar escala
        </button>
      </div>
    </div>
  );
}
