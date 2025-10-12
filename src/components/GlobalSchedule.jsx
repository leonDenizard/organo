import { useEffect, useState } from "react";
import PopUpMenu from "./PopUpMenu";
import ButtonSendGlobalSchedule from "./ButtonSendGlobalSchedule";
import GlobalScheduleMenu from "./GlobalScheduleMenu";
import PopUpMenuUser from "./PopUpMenuUser";
import useParameterization from "../hooks/useParameterization";
import Loader from "../components/Loader";
import PopUpChangeSchedule from "./PopUpChangeSchedule";
import useGlobalSchedule from "../hooks/useGlobalSchedule";
import { useAuth } from "../context/AuthProvider";

export default function GlobalSchedule({ showButtonSend = true }) {
  const [dateHeader, setDateHeader] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [isOpenModalChangeSchedule, setIsOpenModalChangeSchedule] =
    useState(false);
  const [layout, setLayout] = useState("7cols");
  const [modalType, setModalType] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedShift, setSelectedShift] = useState({});
  const [selectedDay, setSelectedDay] = useState("");

  const { allUsers, workShifts } = useParameterization();
  const { allSchedule, allStatus, isLoading, fetchGlobalSchedule } =
    useGlobalSchedule();

  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!allSchedule || allSchedule.length === 0) return;

    // Ordena pelo campo date
    const sortedSchedule = allSchedule.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("-").map(Number);
      const [dayB, monthB, yearB] = b.date.split("-").map(Number);
      return (
        new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
      );
    });

    setSchedule(sortedSchedule);

    // Atualiza o header
    const [day, month, year] = sortedSchedule[0].date.split("-");
    setDateHeader(`${month}/${year}`);
  }, [allSchedule]);

  if (isLoading) return <Loader />;

  const openModal = (type) => {
    setModalType(type);
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setModalType(null);
    setIsOpenModalUser(false);
    setIsOpenModalChangeSchedule(false);
  };

  const openModalChangeSchedule = (idDay, shiftId) => {
    console.log(shiftId)
    setIsOpenModalChangeSchedule(true);
    setSelectedDay(idDay.date);
    const shift = idDay.shifts.find((u) => u._id === shiftId);
    setSelectedShift(shift);
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
    { id: "compacta", name: "Escala Compacta" }, // 👈 Novo layout
  ];

  const layoutClasses = {
    "5cols": "grid grid-cols-5 overflow-x-visible justify-center",
    "6cols": "grid grid-cols-6 overflow-x-visible",
    "7cols": "grid grid-cols-7 overflow-x-visible",
    horizontal: "flex flex-row", // antigo horizontal restaurado
    compacta: "flex flex-row", // novo layout enxuto
  };

  const handleSelect = (selected) => {
    if (modalType === "layout") setLayout(selected);
    if (modalType === "user") console.log("Filtro por usuário:", selected);
    if (modalType === "date") console.log("Filtro por data:", selected);
    closeModal();
  };

  return (
    <div className="p-12">
      <h1 className="text-6xl font-bold mb-11">{dateHeader}</h1>

      <menu className="flex justify-between mb-5">
        <GlobalScheduleMenu
          onOpenLayout={() => openModal("layout")}
          onOpenModalUser={() => setIsOpenModalUser(true)}
        />
        <div>Trabalhando (X)</div>
        <div>Folgando (X)</div>
      </menu>

      <div className={layoutClasses[layout] || layoutClasses["7cols"]}>
        {schedule?.map((d) => {
          const [day, month] = d.date.split("-");
          return (
            <div className="text-center" key={d._id}>
              {/* Cabeçalho */}
              <div
                className={`sticky top-0 z-10 backdrop-blur-xl border border-border-color flex flex-col gap-2 p-3 ${
                  layout === "compacta" ? "w-[60px] py-2" : ""
                }`}
              >
                <div className="flex justify-center items-center">
                  <p
                    className={
                      layout === "compacta"
                        ? "text-sm font-semibold"
                        : "text-3xl font-bold text-white px-3 tracking-widest rounded-md shadow-lg"
                    }
                  >
                    {`${day}/${month}`}
                  </p>
                </div>
                <div className="text-sm backdrop-blur-xl justify-center items-center flex">
                  <p
                    className={
                      layout === "compacta"
                        ? "text-xs bg-black/50 rounded-xl py-[1px] truncate w-[60px] px-[2px] font-thin"
                        : "bg-card-bg tracking-widest px-8 py-1 uppercase rounded-full shadow-lg"
                    }
                  >
                    {d.dayOfWeek}
                  </p>
                </div>
              </div>

              {/* shifts */}
              <div
                className={`flex flex-col ${
                  layout === "compacta" ? "w-[60px]" : ""
                }`}
              >
                {d.shifts
                  ?.filter((shift) => {
                    if (!shift.userId) return false;
                    if (filteredUsers.length === 0) return true;
                    return filteredUsers.includes(shift.userId._id);
                  })
                  .map((shift) => {
                    if (!shift.userId) return null;

                    const isCompact = layout === "compacta";

                    return (
                      <div
                        key={shift._id}
                        className={`border cursor-pointer border-border-color group hover:brightness-125 transition relative hover:z-10 ${
                          isCompact ? "h-[45px]" : "h-[65px]"
                        }`}
                        style={{ backgroundColor: shift.status.color }}
                        onClick={() => openModalChangeSchedule(d, shift._id)}
                      >
                        {shift.status.code !== 2 && (
                          <div className="relative h-full flex flex-col justify-center items-center group-hover:opacity-90 transition">
                            <div className="flex gap-2 justify-center items-center">
                              <p
                                className={`text-sm font-semibold tracking-wider ${
                                  isCompact
                                    ? "truncate w-[55px]"
                                    : "mt-7 group-hover:mt-0 transition-all duration-200"
                                }`}
                              >
                                {isCompact
                                  ? shift.userId?.surname ||
                                    shift.userId?.name?.split(" ")[0]
                                  : shift.userId?.name}
                              </p>
                            </div>

                            {!isCompact && (
                              <>
                                <div
                                  className="text-sm mb-[1px] px-2 rounded relative opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                                  style={{
                                    backgroundColor: shift.status.color,
                                  }}
                                >
                                  <p className="text-xs text-gray-400">
                                    {shift.status?.description}
                                  </p>
                                </div>

                                <div className="text-xs px-2 rounded text-gray-300 font-semibold bg-white/5 relative opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100">
                                  {shift.time?.startTime} -{" "}
                                  {shift.time?.endTime}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
      {isOpenModalUser && (
        <PopUpMenuUser
          allUsers={allUsers}
          closeModal={closeModal}
          onFilter={(users) => setFilteredUsers(users)}
        />
      )}
      {isOpenModalChangeSchedule && isAdmin && (
        <PopUpChangeSchedule
          closeModal={closeModal}
          shiftId={selectedShift}
          date={selectedDay}
          workShifts={workShifts}
          allStatus={allStatus}
          fetchGlobalSchedule={fetchGlobalSchedule}
          schedule={schedule}
        />
      )}
      {isAdmin && (
        <ButtonSendGlobalSchedule
          onScheduleChange={() => console.log("teste")}
          setWorkedDays={"setWorkedDays"}
          showButtonSend={showButtonSend}
        />
      )}
    </div>
  );
}
