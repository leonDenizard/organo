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
    positionsOptimistic,
    handleDeletePosition,
    squad,
    setSquad,
    handleSubmitSquad,
    squadsOptimistic,
    handleDeleteSquad,
    supervisor,
    setSupervisor,
    handleSubmitSuper,
    superOptimistic,
    handleDeleteSuper,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    workOptimistic,
    handleSubmitWorkShift,
    handleDeleteWorkShift,
    allUsers,
    userOptimistic,
    selectedUserUid,
    setSelectedUserUid,
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
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeTab]);

  return (
    <div className="relative h-screen">
      <Breadcrumb />
      <nav className="relative flex overflow-auto w-[90%] px-5 lg:w-full md:justify-center gap-3 lg:top-8 lg:gap-5">
        {tabs.map(({ key, label }) => (
          <li
            key={key}
            ref={(el) => (tabRefs.current[key] = el)}
            className={`list-none py-2 px-4 lg:p-3 lg:px-6 cursor-pointer tracking-widest text-lg lg:text-xl relative z-10
              ${activeTab === key ? "text-blue-white font-semibold" : "text-white"}
              hover:bg-button-hover hover:rounded-md transition-all`}
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

      <section className="w-full lg:px-4 lg:w-[90%] mt-12 lg:m-auto lg:mt-20 2xl:mt-30">
        <div className="relative flex justify-center">
          {/* ===== Cargo ===== */}
          {activeTab === "cargo" && (
            <div className="">
              <h2 className="text-center text-xl lg:text-2xl text-gray-400 tracking-wider mb-8 lg:mb-20">
                Cadastro dos cargos
              </h2>
              <div className="flex flex-col w-full gap-5 lg:space-y-10">
                <div className="w-[calc(100vw-2rem)] md:w-[600px] lg:w-full flex flex-col gap-3 lg:flex-row">
                  <input
                    value={position}
                    placeholder="JR I"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitPosition()}
                    onChange={(e) => setPosition(e.target.value)}
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
                      p-3 w-full text-lg lg:w-[500px] lg:text-xl font-medium"
                    type="text"
                  />
                  <button
                    onClick={handleSubmitPosition}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white
                      rounded w-full py-3 font-semibold text-lg tracking-wide lg:w-[150px]"
                  >
                    Salvar Cargo
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {positionsOptimistic.map((position) => (
                    <div
                      key={position._id}
                      className="hover:bg-card-bg flex rounded px-4 py-3 items-center justify-between gap-3 bg-button-hover transition-colors duration-200"
                    >
                      <span className="flex items-center text-base lg:text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-6 lg:h-8 mr-4"></span>
                        {position.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:border-red-900 hover:bg-red-800 cursor-pointer"
                        onClick={() => handleDeletePosition(position._id)}
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

          {/* ===== Squad ===== */}
          {activeTab === "squad" && (
            <div>
              <h2 className="text-center text-xl lg:text-2xl text-gray-400 tracking-wider mb-8 lg:mb-20">
                Cadastro dos Squads
              </h2>
              <div className="flex flex-col gap-5 lg:space-y-10">
                <div className="flex flex-col gap-3 lg:flex-row w-[calc(100vw-2rem)] md:w-[600px] lg:w-full ">
                  <input
                    value={squad}
                    placeholder="@squad-suporte"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitSquad()}
                    onChange={(e) => setSquad(e.target.value)}
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
                      p-3 w-full text-lg lg:text-xl font-medium"
                    type="text"
                  />
                  <button
                    onClick={handleSubmitSquad}
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-full py-3 font-semibold text-lg lg:w-[150px]"
                  >
                    Salvar Squad
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {squadsOptimistic.map((s) => (
                    <div
                      key={s._id}
                      className="hover:bg-card-bg flex rounded px-4 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-base lg:text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-6 lg:h-8 mr-4"></span>
                        {s.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:bg-red-800 cursor-pointer"
                        onClick={() => handleDeleteSquad(s._id)}
                      >
                        <Trash className="stroke-white group-hover:stroke-red-300" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== Supervisor ===== */}
          {activeTab === "supervisor" && (
            <div>
              <h2 className="text-center text-xl lg:text-2xl text-gray-400 tracking-wider mb-8 lg:mb-20">
                Cadastro dos Supervisores
              </h2>
              <div className="flex flex-col gap-5 lg:space-y-10">
                <div className="w-[calc(100vw-2rem)] md:w-[600px] lg:w-full flex flex-col gap-3 lg:flex-row">
                  <input
                    value={supervisor}
                    placeholder="Nome super"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmitSuper()}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover
                      p-3 w-full text-lg lg:w-[500px] lg:text-xl font-medium"
                    type="text"
                  />
                  <button
                    onClick={handleSubmitSuper}
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-full py-3 font-semibold text-lg lg:w-[150px]"
                  >
                    Salvar Super
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {superOptimistic.map((sup) => (
                    <div
                      key={sup._id}
                      className="hover:bg-card-bg flex rounded px-4 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-base lg:text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-6 lg:h-8 mr-4"></span>
                        {sup.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:bg-red-800 cursor-pointer"
                        onClick={() => handleDeleteSuper(sup._id)}
                      >
                        <Trash className="stroke-white group-hover:stroke-red-300" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== Horário ===== */}
          {activeTab === "horario" && (
            <div>
              <h2 className="text-center text-xl lg:text-2xl text-gray-400 tracking-wider mb-8 lg:mb-20">
                Cadastro dos horários do suporte
              </h2>
              <div className="flex flex-col gap-5 lg:space-y-10">
                <div className="w-[calc(100vw-2rem)] md:w-[600px] lg:w-full flex flex-col gap-3 lg:flex-row">
                  <select
                    className="w-full lg:w-[220px] text-lg lg:text-xl font-medium bg-transparent border-2 border-border-color rounded p-3 focus:bg-button-hover outline-none"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  >
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 10 + i;
                      const label = hour >= 24 ? "00:00" : `${hour.toString().padStart(2, "0")}:00`;
                      return (
                        <option className="bg-backgound" key={label} value={label}>
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  <select
                    className="w-full lg:w-[220px] text-lg lg:text-xl font-medium bg-transparent border-2 border-border-color rounded p-3 focus:bg-button-hover outline-none"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    {Array.from({ length: 15 }, (_, i) => {
                      const hour = 10 + i;
                      const label = hour >= 24 ? "00:00" : `${hour.toString().padStart(2, "0")}:00`;
                      return (
                        <option className="bg-backgound" key={label} value={label}>
                          {label}
                        </option>
                      );
                    })}
                  </select>

                  <button
                    onClick={handleSubmitWorkShift}
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-full py-3 font-semibold text-lg lg:w-[200px]"
                  >
                    Salvar Horário
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {workOptimistic.map((works) => (
                    <div
                      key={works._id}
                      className="hover:bg-card-bg flex rounded px-4 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-base lg:text-lg tracking-wider">
                        <span className="inline-block rounded-full bg-bubble-red w-2 h-6 lg:h-8 mr-4"></span>
                        {works.startTime} - {works.endTime}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:bg-red-800 cursor-pointer"
                        onClick={() => handleDeleteWorkShift(works._id)}
                      >
                        <Trash className="stroke-white group-hover:stroke-red-300" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== Admin ===== */}
          {activeTab === "admin" && (
            <div>
              <h2 className="text-center text-xl lg:text-2xl text-gray-400 tracking-wider mb-8 lg:mb-20">
                Cadastro dos Admin's
              </h2>
              <div className="flex flex-col gap-5 lg:space-y-10">
                <div className="flex w-[calc(100vw-2rem)] md:w-[600px] lg:w-full flex-col gap-3 lg:flex-row">
                  <select
                    className="peer rounded bg-transparent outline-none border-2 border-border-color focus:bg-button-hover p-3 w-full text-lg lg:w-[500px] lg:text-xl font-medium"
                    value={selectedUserUid}
                    onChange={(e) => setSelectedUserUid(e.target.value)}
                  >
                    <option className="bg-backgound" value="">
                      Selecione um usuário
                    </option>
                    {allUsers.map((user) => (
                      <option key={user.id} value={user.uid} className="bg-backgound">
                        {user.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handlePromoteToAdmin(selectedUserUid)}
                    className="bg-green-600 hover:bg-green-700 text-white rounded w-full py-3 font-semibold text-lg lg:w-[150px]"
                  >
                    Inserir admin
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {userOptimistic.map((user) => (
                    <div
                      key={user.id}
                      className="hover:bg-card-bg flex rounded px-4 py-3 items-center justify-between gap-3 bg-button-hover"
                    >
                      <span className="flex items-center text-base lg:text-lg tracking-wider">
                        <img src={user.profile} className="inline-block rounded-full w-8 h-8 mr-4" />
                        {user.name}
                      </span>
                      <div
                        className="group rounded-full p-2 bg-card-bg border border-border-color hover:bg-red-800 cursor-pointer"
                        onClick={() => handleRemoveAdmin(user.uid)}
                      >
                        <Trash className="stroke-white group-hover:stroke-red-300" size={20} />
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
