import { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import { X } from "lucide-react";
import useParameterization from "../hooks/useParameterization";
import useGlobalSchedule from "../hooks/useGlobalSchedule";
import createSchedule from "../functions/createSchedule";

export default function PopUpMenuUser({ closeModal, onFilter, allUsers }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { allSuper, workShifts } = useParameterization();
  const { allStatus } = useGlobalSchedule();

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const workingStatus = allStatus?.find((st) => st.name === "working")

  const selectedShifts = selectedUsers.map((userId) => {

    const user = allUsers.find((u) => u.id === userId)
    const ws = workShifts.find((w) => w._id === user.time)

    return {
      userId: userId,
      status: workingStatus?._id,
      time: ws?._id
    }
  })
  


  const schedule = createSchedule({
    month: 10,
    year: 2025,
    shifts: selectedShifts
  })


  useEffect(() => {
    
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="fixed  m-auto  top-0 left-0 right-0 bottom-0 backdrop-blur-3xl z-10 bg-modal-color flex flex-col justify-center items-center">
      <X
        onClick={closeModal}
        className="absolute top-4 right-4 h-10 w-10 cursor-pointer p-1
             rounded-full bg-red-500 text-white 
             hover:bg-red-600 
              transition-transform duration-300
             hover:rotate-90
             flex items-center justify-center"
      />

      <div className="relative overflow-y-scroll scrollbar">
        <p className="text-gray-400 mb-3 text-xl">Cadastro da escala</p>

        <div className="border grid grid-cols-2">
          <div className="grid grid-cols-1 scrollbar border">
            {allUsers?.map((user) => {
              const ws = workShifts.find((w) => w._id === user.time);
              return (
                <div key={user._d} className="">
                  <Checkbox
                    key={user.id}
                    id={user.id}
                    title={user.name}
                    isChecked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                    img={user.profile}
                  />
                  <p className="text-center text-sm text-gray-400 mb-4">
                    {ws ? `${ws.startTime} - ${ws.endTime}` : "Sem horário"}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 scrollbar"></div>
        </div>

        <button
          className="bg-transparent border-2 border-border-color text-white rounded py-2 font-semibold text-lg w-[40%]"
          onClick={() => {
            setSelectedUsers([]);
            closeModal([]);
          }}
        >
          Criar a escala
        </button>
      </div>
    </div>
  );
}
