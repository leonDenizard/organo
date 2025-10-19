import { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import { X } from "lucide-react";
import useParameterization from "../hooks/useParameterization";
import useGlobalSchedule from "../hooks/useGlobalSchedule";
import createSchedule from "../functions/createSchedule";
import MonthSelector from "../components/MonthSelector";
import { useGlobalScheduleContext } from "../context/GlobalScheduleProvider";

export default function PopUpMenuUser({ closeModal, allUsers }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const { workShifts } = useParameterization();
  const { allStatus, handleGenerateSchedule, fetchGlobalSchedule } =
    useGlobalScheduleContext();

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const workingStatus = allStatus?.find((st) => st.name === "working");

  const selectedShifts = selectedUsers.map((userId) => {
    const user = allUsers.find((u) => u.id === userId);
    const ws = workShifts.find((w) => w._id === user.time);

    return {
      userId: userId,
      status: workingStatus?._id,
      time: ws?._id,
    };
  });

  const handleCreateSchedule = async () => {
    const schedule = createSchedule({
      month: selectedMonth,
      year: 2025,
      shifts: selectedShifts,
    });

    try {
      await handleGenerateSchedule(schedule);
    } catch (error) {
      console.error("Erro ao gerar escala:", error);
    } finally {
      closeModal([]); // fecha o modal
    }
  };

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

      <div className="relative overflow-y-scroll scrollbar mb-6">
        <p className="text-gray-400 mb-3 text-3xl">Cadastro da escala</p>
        <h1 className="text-gray-400 mb-14 text-md">
          Selecione os usuários que deseja gerar a escala <br />
          (Obs: A escala é gerado completa para o mês sendo necessários realizar
          os ajustes manuais)
        </h1>
        <div className="grid grid-cols-2 items-start justify-items-center">
          <div className="grid grid-cols-3 scrollbar h-[400px] gap-4">
            <Checkbox
              id="selectAll"
              title="Selecionar todos"
              isChecked={selectedUsers.length === allUsers.length}
              onChange={() => {
                if (selectedUsers.length === allUsers.length) {
                  setSelectedUsers([]); // desmarca todos
                } else {
                  setSelectedUsers(allUsers.map((u) => u.id));
                }
              }}
            />
            {allUsers?.map((user) => {
              const ws = workShifts.find((w) => w._id === user.time);
              return (
                <div key={user._id} className="">
                  <Checkbox
                    key={user.id}
                    id={user.id}
                    title={user.name}
                    isChecked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                    img={user.profile}
                  />
                  <p className="relative text-sm text-gray-400 mb-4">
                    {ws ? `${ws.startTime} - ${ws.endTime}` : "Sem horário"}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 scrollbar">
            <h1>Selecione o mês da escala</h1>
            <MonthSelector onChange={(month) => setSelectedMonth(month)} />
          </div>
        </div>
      </div>
      <button
        className="bg-transparent border-2 border-border-color text-white rounded py-2 font-semibold text-lg w-[40%] hover:bg-white/10 transition-all"
        onClick={handleCreateSchedule}
      >
        Criar a escala
      </button>
    </div>
  );
}
