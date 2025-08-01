import { useEffect, useRef, useState } from "react";
import ButtonFilter from "../../components/ButtonFilter";
import Input from "../../components/Input";
import useParameterization from "../../hooks/useParameterization";
import { Trash } from "lucide-react";

export default function Parameterization() {
  const [activeTab, setActiveTab] = useState("cargo");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef({});

  const tabs = [
    { key: "cargo", label: "Cargo" },
    { key: "squad", label: "Squads" },
    { key: "supervisor", label: "Supervisor" },
    { key: "horario", label: "Horário" },
  ];

  const {
    position,
    setPosition,
    handleSubmitPosition,
    allPositions,
    handleDeletePosition,
    squad,
    setSquad,
    handleSubmitSquad,
    allSquads,
    handleDeleteSquad,
    supervisor,
    setSupervisor,
    handleSubmitSuper,
    allSuper,
    handleDeleteSuper,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    workShifts,
    handleSubmitWorkShift,
    handleDeleteWorkShift,
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
      <nav className="relative top-8 justify-center flex gap-5">
        {tabs.map(({ key, label }) => (
          <li
            key={key}
            ref={(el) => (tabRefs.current[key] = el)}
            className={`list-none p-3 px-6 cursor-pointer text-xl relative z-10
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
          className="absolute bottom-0 h-1 bg-white/65 transition-all duration-300 rounded-full"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </nav>

      <section className="border-2 h-[400px] w-[80%] relative top-0 left-0 m-auto mt-20">
        <div className="relative w-full h-full">
          
          {activeTab === "cargo" && (
            <div>
              <h2>Cadastro dos cargos</h2>

              <div className="flex-col">
                <Input
                  title={"JR I"}
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitPosition();
                    }
                  }}
                />
                <button
                  onClick={handleSubmitPosition}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Salvar Cargo
                </button>
              </div>

              <div>
                <p>Display Cargos</p>
                {allPositions.map((position) => (
                  <div key={position._id} className="flex items-center gap-4 ">
                    <span>{position.name}</span>
                    <Trash
                      color="white"
                      size={16}
                      strokeWidth={3}
                      onClick={() => handleDeletePosition(position._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "squad" && (
            <div>
              <h2>Cadastro dos Squad</h2>
              <div className="flex-col">
                <Input
                  title={"@squad-slack"}
                  value={squad}
                  onChange={(e) => setSquad(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitSquad();
                    }
                  }}
                />
                <button
                  onClick={handleSubmitSquad}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Salvar Squad
                </button>
              </div>

              <div>
                <p>Display Squad</p>
                {allSquads.map((squad) => (
                  <div key={squad._id} className="flex items-center gap-4 ">
                    <span>{squad.name}</span>
                    <Trash
                      color="white"
                      size={16}
                      strokeWidth={3}
                      onClick={() => handleDeleteSquad(squad._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "supervisor" && (
            <div>
              <h2>Cadastro dos Supervisores</h2>

              <div className="flex-col">
                <Input
                  title={"Nome Super"}
                  value={supervisor}
                  onChange={(e) => setSupervisor(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmitSuper();
                    }
                  }}
                />
                <button
                  onClick={handleSubmitSuper}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Salvar Super
                </button>
              </div>

              <div>
                <p>Display Supers</p>
                {allSuper.map((supervisor) => (
                  <div
                    key={supervisor._id}
                    className="flex items-center gap-4 "
                  >
                    <span>{supervisor.name}</span>
                    <Trash
                      color="white"
                      size={16}
                      strokeWidth={3}
                      onClick={() => handleDeleteSuper(supervisor._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "horario" && (
            <div>
              <h2>Cadastro dos horários do suporte</h2>

              <p>Inicio</p>
              <select
                id="horario"
                name="horario"
                className="md:max-w-[70%] focus:outline-none bg-backgound mt-4 border-2 border-border-color rounded-md p-2 text-lg"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
                <option value="00:00">00:00</option>
              </select>

              <p>Fim</p>
              <select
                id="horario"
                name="horario"
                className="md:max-w-[70%] focus:outline-none bg-backgound mt-4 border-2 border-border-color rounded-md p-2 text-lg"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
                <option value="00:00">00:00</option>
              </select>

              <button
                onClick={handleSubmitWorkShift}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Salvar Horário de trabalho
              </button>

              <div>
                <p>Display Horários</p>
                {workShifts.map((works) => (
                  <div key={works._id} className="flex items-center gap-4 ">
                    <span>{works.startTime}</span>
                    <span>{works.endTime}</span>
                    <Trash
                      color="white"
                      size={16}
                      strokeWidth={3}
                      onClick={() => handleDeleteWorkShift(works._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
