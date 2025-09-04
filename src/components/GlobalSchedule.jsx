import { useEffect, useState } from "react";
import PopUpMenu from "./PopUpMenu";
import GlobalScheduleMenu from "./GlobalScheduleMenu";

export default function GlobalSchedule() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [dateHeader, setDateHeader] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [layout, setLayout] = useState("7cols");
  const [modalType, setModalType] = useState(null);

  const fetchSchedule = async () => {
    const getSchedule = await fetch(`${API_URL}/global-schedule`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    const response = await getSchedule.json();
    const data = response.data;

    //Ordenando os objetos pelo campo date
    const sortedSchedule = data?.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("-").map(Number);
      const [dayB, monthB, yearB] = b.date.split("-").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      return dateA - dateB;
    });

    //Pegando o primeiro item já ordenado pra header
    if (sortedSchedule?.length > 0) {
      const [day, month, year] = sortedSchedule[0].date.split("-");
      setDateHeader(`${month}/${year}`);
    }

    // sortedSchedule?.forEach((day) => {
    //   day.shifts.sort((a, b) => {
    //     // reordenando pelo horário
    //     if (a.time.startTime !== b.time.startTime) {
    //       return a.time.startTime.localeCompare(b.time.startTime);
    //     }

    //     // mesmo horario compara pelo nome
    //     // return a.userId.name.localeCompare(b.userId.name);
    //   });
    // });

    //console.log(sortedSchedule)

    setSchedule(sortedSchedule);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setModalType(null);
  };

  const getOptions = () => {
    if (modalType === "layout") return layoutOptions;
    if (modalType === "user") return userOptions;
    if (modalType === "date") return dateOptions;
    return [];
  };

  const layoutOptions = [
    { id: "5cols", name: "Escala 5 colunas" },
    { id: "6cols", name: "Escala 6 colunas" },
    { id: "7cols", name: "Escala 7 colunas" },
    { id: "horizontal", name: "Escala Horizontal" },
  ];
  const layoutClasses = {
    "5cols": "grid grid-cols-5 overflow-x-visible gap-1",
    "6cols": "grid grid-cols-6 overflow-x-visible gap-1",
    "7cols": "grid grid-cols-7 overflow-x-visible gap-1",
    "horizontal": "flex flex-row gap-1"
  };

  const handleSelect = (selected) => {
    if (modalType === "layout") {
      console.log("item selecionado", selected);
      setLayout(selected);
    }
    if (modalType === "user") {
      console.log("Filtro por usuário:", selected);
    }
    if (modalType === "date") {
      console.log("Filtro por data:", selected);
    }
    closeModal();
  };

  return (
    <div className="p-12">
      <h1 className="text-6xl  font-bold mb-11">{dateHeader}</h1>

      <GlobalScheduleMenu onOpenLayout={() => openModal("layout")} />
      <div
        className={layoutClasses[layout] || layoutClasses["7cols"]}
      >
        {schedule?.map((d) => {
          const [day, month] = d.date.split("-");
          return (
            <div
              className="text-center text-lg border border-border-color "
              key={d._id}
            >
              {/* Cabeçalho da data */}
              <div className="sticky top-0 z-10  backdrop-blur-xl border border-border-color flex flex-col gap-2 p-3">
                <div className="flex justify-center items-center ">
                  <p className="text-3xl font-bold text-white px-3 tracking-widest rounded-md shadow-lg">
                    {`${day}/${month}`}
                  </p>
                </div>
                <div className="text-sm backdrop-blur-xl justify-center items-center flex">
                  <p className="bg-card-bg tracking-widest px-8 py-1 uppercase rounded-full shadow-lg">
                    {d.dayOfWeek}
                  </p>
                </div>
              </div>

              {/* shifts */}
              <div className="flex flex-col">
                {d.shifts?.map((shift) => (
                  <div
                    key={shift._id}
                    className="border cursor-pointer border-border-color group h-[120px] hover:brightness-125 transition"
                    style={{ backgroundColor: shift.status.color }}
                  >
                    {shift.status.code !== 2 && (
                      <div className="relative h-full flex flex-col justify-center items-center group-hover:opacity-90 transition">
                        <div className=" flex gap-2 justify-center items-center">
                          {/* <img
                            src={shift.userId?.photoUrl}
                            alt={shift.userId?.name}
                            className="absolute top-5 left-4 h-10 rounded-full invisible group-hover:visible"
                          /> */}
                          <p className="font-semibold tracking-wider mt-9 group-hover:mt-0 transition-all duration-200">
                            {shift.userId?.name}
                          </p>
                        </div>
                        <div
                          className="
                            text-sm px-2 rounded relative
                            opacity-0 scale-95 
                            group-hover:opacity-100 group-hover:scale-100
                            transition-all duration-300"
                          style={{ backgroundColor: shift.status.color }}
                        >
                          <p className="text-gray-400">
                            {shift.status?.description}
                          </p>
                        </div>
                        <div
                          className="text-sm px-2 rounded text-gray-300 font-semibold bg-white/5 relative opacity-0 scale-95 
                            group-hover:opacity-100 group-hover:scale-100
                            transition-all duration-100"
                        >
                          {shift.time?.startTime} - {shift.time?.endTime}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {isOpenModal && (
        <PopUpMenu
          options={getOptions()}
          onSelect={handleSelect}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
