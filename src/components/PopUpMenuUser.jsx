import { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import SearchBar from "../components/SearchBar";
import { X } from "lucide-react";
import { useGlobalScheduleContext } from "../context/GlobalScheduleProvider";

export default function PopUpMenuUser({
  closeModal,
  onFilter,
  onDelete,
  allUsers,
  textHeader,
  textBtn,
  color,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleFilterUser = (e) => {
    const query = e.target.value;

    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };
  const { handleDeleteScheduleById } = useGlobalScheduleContext();

  const handleAction = async () => {
    try {
      if (onDelete) {
        await handleDeleteScheduleById(selectedUsers);
      } else if (onFilter) {
        onFilter(selectedUsers);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao executar handleAction", error);
    }
  };

  useEffect(() => {
    setFilteredUsers(allUsers);
    document.body.classList.add("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [allUsers]);

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

      <div className="relative flex flex-col items-center justify-center w-[90%]">
        <p className="text-gray-400 mb-3 text-lg">{textHeader}</p>
        <input
          onChange={handleFilterUser}
          className="bg-secundary-color p-3 px-8 w-[40%] mb-2 rounded-lg outline-none border-2 border-border-color text-lg leading-none caret-custom
            placeholder:text-white placeholder:font-semibold placeholder:tracking-wider placeholder:text-lg placeholder:px-3"
          type="text"
          placeholder="Procurar..."
        />

        <div className="relative w-full h-[300px] 2xl:h-[500px] grid grid-cols-1 sm:grid-cols-2 items-center justify-center lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 2xl:w-[80%] gap-1 overflow-y-auto scrollbar mb-8 py-4 px-5">
          {filteredUsers?.map((user, index) => (
            <Checkbox
              key={`${user.id}-${index}`}
              id={user.id}
              title={user.name}
              isChecked={selectedUsers.includes(user.id)}
              onChange={() => toggleUser(user.id)}
            />
          ))}
        </div>

        <button
          onClick={handleAction}
          className="bg-bubble-blue hover:bg-bubble-blue/80 transition-all  text-white rounded py-2 font-semibold text-lg w-[40%] mb-2"
          style={{ backgroundColor: color }}
        >
          {textBtn}
        </button>
        {!onDelete && (
          <button
            className="bg-transparent border-2 border-border-color text-white rounded py-2 font-semibold text-lg w-[40%] hover:bg-white/10 transition-all"
            onClick={() => {
              setSelectedUsers([]);
              onFilter([]);
              closeModal([]);
            }}
          >
            Limpar filtro
          </button>
        )}
      </div>
    </div>
  );
}
