import { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import { X } from "lucide-react";

export default function PopUpMenuUser({ closeModal, onFilter, allUsers }) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return (
    <div className="fixed  m-auto  top-0 left-0 right-0 bottom-0 backdrop-blur-3xl z-10 bg-modal-color flex flex-col justify-center items-center border rounded-lg border-border-color">
      <X
      onClick={closeModal}
      
        className="absolute top-4 right-4 h-10 w-10 cursor-pointer p-1
             rounded-full bg-red-500 text-white 
             hover:bg-red-600 
              transition-transform duration-300
             hover:rotate-90
             flex items-center justify-center"
      />

      <div className="relative flex flex-col items-center justify-center w-[90%]">
        <p className="text-gray-400 mb-3 text-lg">
          Selecione os usuários que deseja visualizar.
        </p>
        <div className="relative w-full h-[300px] 2xl:h-[500px] grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 2xl:w-[80%] gap-1 overflow-y-auto scrollbar mb-8 py-4 px-5">
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
            onFilter(selectedUsers);
            closeModal();
          }}
          className="bg-bubble-blue hover:bg-bubble-blue/80 transition-all  text-white rounded py-2 font-semibold text-lg w-[40%] mb-2"
        >
          Filtrar
        </button>
        <button
          className="bg-transparent border-2 border-border-color text-white rounded py-2 font-semibold text-lg w-[40%]"
          onClick={() => {
            setSelectedUsers([]);
            onFilter([]);
            closeModal([]);
          }}
        >
          Limpar filtro
        </button>
      </div>
    </div>
  );
}
