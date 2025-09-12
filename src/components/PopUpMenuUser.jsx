import { useState } from "react";
import useParameterization from "../hooks/useParameterization";
import Checkbox from "../components/Checkbox";

export default function PopUpMenuUser({ closeModal, onFilter }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { allUsers } = useParameterization();

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed w-2/3 m-auto h-4/5 top-0 left-0 right-0 bottom-0 backdrop-blur-3xl z-10 bg-modal-color flex flex-col justify-center items-center border rounded-lg border-border-color">
      <button
        onClick={closeModal}
        className="absolute top-0 right-3 mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Fechar
      </button>

      <div className="flex w-[calc(100vw-2rem)] md:w-[600px] lg:w-full flex-col gap-3 lg:flex-row">
        <div className="flex flex-wrap gap-3 border w-[90%]">
          {allUsers?.map((user) => (
            <Checkbox
              key={user.id}
              id={user.id}
              title={user.name}
              isChecked={selectedUsers.includes(user.id)} 
              onChange={() => toggleUser(user.id)} 
            />
          ))}
        </div>

        <button
          onClick={() => {
            onFilter(selectedUsers)
            closeModal()
          }}
          
          className="bg-green-600 hover:bg-green-700 text-white rounded w-full py-3 font-semibold text-lg lg:w-[150px]"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
