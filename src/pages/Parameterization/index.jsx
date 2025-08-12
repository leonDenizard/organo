import { useEffect, useRef, useState } from "react";
import useParameterization from "../../hooks/useParameterization";
import { Trash } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb";

export default function Parameterization() {
  const [activeTab, setActiveTab] = useState("cargo");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef({});

  const tabs = [
    { key: "cargo", label: "Cargo" },
    { key: "squad", label: "Squads" },
    { key: "supervisor", label: "Supervisor" },
    { key: "horario", label: "Horário" },
    { key: "admin", label: "Admin" },
  ];

  const {
    position,
    setPosition,
    handleSubmitPosition,
    allPositions,
    positionsOptimistic,
    handleDeletePosition,
    squad,
    setSquad,
    handleSubmitSquad,
    allSquads,
    squadsOptimistic,
    handleDeleteSquad,
    supervisor,
    setSupervisor,
    handleSubmitSuper,
    allSuper,
    superOptimistic,
    handleDeleteSuper,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    workShifts,
    workOptimistic,
    handleSubmitWorkShift,
    handleDeleteWorkShift,
    allUsers,
    userOptimistic,
    selectedUserUid,
    setSelectedUserUid,
    userAdmin,
    handlePromoteToAdmin,
    handleRemoveAdmin,
  } = useParameterization();

  useEffect(() => {
    const updateUnderline = () => {
      const currentRef = tabRefs.current[activeTab];
      if (currentRef) {
        const { offsetLeft, offsetWidth } = currentRef;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    // Atualiza ao clicar
    updateUnderline();

    // Atualiza ao redimensionar
    window.addEventListener("resize", updateUnderline);

    // Remove o listener quando o componente desmontar
    return () => {
      window.removeEventListener("resize", updateUnderline);
    };
  }, [activeTab]);

  return (
    <div className="relative h-screen">
      <Breadcrumb />
      <nav className="relative top-8 justify-center flex gap-5">
        {tabs.map(({ key, label }) => (
          <li
            key={key}
            ref={(el) => (tabRefs.current[key] = el)}
            className={`list-none p-3 px-6 cursor-pointer tracking-widest text-xl relative z-10
            ${
              activeTab === key ? "text-blue-white font-semibold" : "text-white"
            }
            // hover:bg-button-hover hover:rounded-md transition-all`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </li>
        ))}

        <span
          className="absolute bottom-0 h-1 bg-bubble-blue transition-all duration-300 rounded-full"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </nav>

      <section className="w-[90%] relative top-0 left-0 m-auto xl:mt-20 2xl:mt-40">
        <div className="relative flex justify-center">
          {activeTab === "cargo" && (
            <div className="">
              <h2 className="text-center text-2xl text-gray-400 tracking-wider mb-20">
                Cadastro dos cargos
              </h2>
              <div className="relative flex-col space-y-10">
                <div className="flex gap-3">
                  <input
                    value={position}
                    placeholder={"JR I"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmitPosition();
                      }
                    }}
                    onChange={(e) => setPosition(e.target.value)}
                    className=" relative peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
                    p-3 w-[500px] text-xl font-medium"
                    type="text"
                  />

                  <button
                    onClick={handleSubmitPosition}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white
                    rounded w-[150px] font-semibold text-lg tracking-wide"
                  >
                    Salvar Cargo
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {positionsOptimistic.map((position) => (
                    <div
                      key={position._id}
                      className="hover:bg-card-bg flex rounded px-5 py-3 items-cente justify-between gap-3 bg-button-hover transition-colors duration-200"
                    >
                      <span className="flex justify-center items-center text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red relative w-2 h-8 mr-4"></span>
                        {position.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:border-red-900
                    hover:bg-red-800 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleDeletePosition(position._id)}
                      >
                        <Trash
                          className="stroke-white group-hover:stroke-red-300 transition-colors duration-200"
                          color="white"
                          size={20}
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "squad" && (
            <div>
              <h2 className="text-center text-2xl text-gray-400 tracking-wider mb-20">
                Cadastro dos Squads
              </h2>

              <div className="relative flex-col space-y-10">
                <div className="flex gap-3">
                  <input
                    value={squad}
                    placeholder={"@squad-suporte"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmitSquad();
                    }}
                    onChange={(e) => setSquad(e.target.value)}
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
          p-3 w-[500px] text-xl font-medium"
                    type="text"
                  />

                  <button
                    onClick={handleSubmitSquad}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white
          rounded w-[150px] font-semibold text-lg tracking-wide"
                  >
                    Salvar Squad
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {squadsOptimistic.map((squad) => (
                    <div
                      key={squad._id}
                      className="hover:bg-card-bg transition-colors duration-200 flex rounded px-5 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-8 mr-4"></span>
                        {squad.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:border-red-900
              hover:bg-red-800 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleDeleteSquad(squad._id)}
                      >
                        <Trash
                          className="stroke-white group-hover:stroke-red-300 transition-colors duration-200"
                          size={20}
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "supervisor" && (
            <div>
              <h2 className="text-center text-2xl text-gray-400 tracking-wider mb-20">
                Cadastro dos Supervisores
              </h2>

              <div className="relative flex-col space-y-10">
                <div className="flex gap-3">
                  <input
                    value={supervisor}
                    placeholder={"Nome super"}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmitSuper();
                    }}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
          p-3 w-[500px] text-xl font-medium"
                    type="text"
                  />

                  <button
                    onClick={handleSubmitSuper}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white
          rounded w-[150px] font-semibold text-lg tracking-wide"
                  >
                    Salvar Super
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {superOptimistic.map((supervisor) => (
                    <div
                      key={supervisor._id}
                      className="hover:bg-card-bg transition-colors duration-200 flex rounded px-5 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-8 mr-4"></span>
                        {supervisor.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:border-red-900
              hover:bg-red-800 transition-colors duration-200 cursor-pointer"
                      >
                        <Trash
                          className="stroke-white group-hover:stroke-red-300 transition-colors duration-200"
                          size={20}
                          strokeWidth={2}
                          onClick={() => handleDeleteSuper(supervisor._id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "horario" && (
            <div>
              <h2 className="text-center text-2xl text-gray-400 tracking-wider mb-20">
                Cadastro dos horários do suporte
              </h2>

              <div className="relative flex-col space-y-10">
                <div className="flex gap-3">
                  <select
                    className="w-[220px] text-xl font-medium bg-transparent border-2 border-border-color rounded p-3
          focus:bg-button-hover outline-none"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 10 + i;
                      const label =
                        hour >= 24
                          ? "00:00"
                          : `${hour.toString().padStart(2, "0")}:00`;
                      return (
                        <option
                          className="bg-backgound border-none"
                          key={label}
                          value={label}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className="focus:outline-none bg-backgound w-[220px] text-xl font-medium bg-transparent border-2 border-border-color rounded p-3"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 10 + i;
                      const label =
                        hour >= 24
                          ? "00:00"
                          : `${hour.toString().padStart(2, "0")}:00`;
                      return (
                        <option
                          className="bg-backgound border-none"
                          key={label}
                          value={label}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  <button
                    onClick={handleSubmitWorkShift}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white
          rounded w-[200px] font-semibold text-lg tracking-wide"
                  >
                    Salvar Horário
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {workOptimistic.map((works) => (
                    <div
                      key={works._id}
                      className="hover:bg-card-bg transition-colors duration-200 flex rounded px-5 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-8 mr-4"></span>
                        {works.startTime} - {works.endTime}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:border-red-900
              hover:bg-red-800 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleDeleteWorkShift(works._id)}
                      >
                        <Trash
                          className="stroke-white group-hover:stroke-red-300 transition-colors duration-200"
                          size={20}
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "admin" && (
            <div className="">
              <h2 className="text-center text-2xl text-gray-400 tracking-wider mb-20">
                Cadastro dos Admin's
              </h2>
              <div className="relative flex-col space-y-10 min-w-[500px]">
                <div className="flex gap-3">
                  <select
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
          p-3 w-[500px] text-xl font-medium"
                    value={selectedUserUid}
                    onChange={(e) => setSelectedUserUid(e.target.value)}
                  >
                    <option className="bg-backgound" value="">
                      Selecione um usuário
                    </option>
                    {allUsers.map((user) => (
                      <option
                        key={user.id}
                        value={user.uid}
                        className="bg-backgound border-none"
                      >
                        {user.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handlePromoteToAdmin(selectedUserUid)}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white
          rounded w-[150px] font-semibold text-lg tracking-wide"
                  >
                    Inserir admin
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {userOptimistic.map((user) => (
                    <div
                      key={user.id}
                      className="hover:bg-card-bg flex rounded px-5 py-3 items-cente justify-between gap-3 bg-button-hover transition-colors duration-200"
                    >
                      <span className="flex justify-center items-center text-lg tracking-wider">
                        <img
                          src={user.profile}
                          className="inline-block rounded-full relative w-8 h-8 mr-4"
                        />
                        {user.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:border-red-900
                    hover:bg-red-800 transition-colors duration-200 cursor-pointer"
                        onClick={() => handleRemoveAdmin(user.uid)}
                      >
                        <Trash
                          className="stroke-white group-hover:stroke-red-300 transition-colors duration-200"
                          color="white"
                          size={20}
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
