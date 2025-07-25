import { useState } from "react";
import ButtonFilter from "../../components/ButtonFilter";
import Loader from "../../components/Loader"
import Input from "../../components/Input";
import useParameterization from "../../hooks/useParameterization";

export default function Parameterization() {
  const [activeTab, setActiveTab] = useState("Cargo");

  const { position, setPosition, handleSubmitPosition, allPositions } =
    useParameterization();

  return (
    <div className="relative h-screen">
      <nav className="flex justify-around border-2">
        <ButtonFilter name={"Cargo"} onClick={() => setActiveTab("Cargo")} />
        <ButtonFilter name={"Squad"} onClick={() => setActiveTab("Squad")} />
        <ButtonFilter
          name={"Supervisor"}
          onClick={() => setActiveTab("Supervisor")}
        />
        <ButtonFilter
          name={"Horário de trabalho"}
          onClick={() => setActiveTab("Horario")}
        />
      </nav>

      <section className="border-2 h-[400px] w-[80%] relative top-0 left-0 m-auto mt-20">
        {activeTab === "Cargo" && (
          <div>
            <h2>Cadastro dos cargos</h2>
            <Input
              title={"JR I"}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <button
              onClick={handleSubmitPosition}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Salvar Cargo
            </button>

            <div>
              <p>Display Cargos</p>
              {allPositions.length === 0 ? (
                <Loader/>
              ) : (
                allPositions.map((p) => <p key={p._id}>{p.name}</p>)
              )}
            </div>
          </div>
        )}

        {activeTab === "Squad" && (
          <div>
            <h2>Cadastro dos Squad</h2>
            <Input title={"@Squa-NFC"} />
          </div>
        )}

        {activeTab === "Supervisor" && (
          <div>
            <h2>Cadastro dos Supervisores</h2>
            <Input title={"Nome Super"} />
          </div>
        )}

        {activeTab === "Horario" && (
          <div>
            <h2>Cadastro dos horários do suporte</h2>

            <p>Inicio</p>
            <select
              id="horario"
              name="horario"
              className="md:max-w-[70%] focus:outline-none bg-backgound mt-4 border-2 border-border-color rounded-md p-2 text-lg"
              value={""}
              onChange={""}
            >
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
            </select>

            <p>Fim</p>
            <select
              id="horario"
              name="horario"
              className="md:max-w-[70%] focus:outline-none bg-backgound mt-4 border-2 border-border-color rounded-md p-2 text-lg"
              value={""}
              onChange={""}
            >
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
            </select>
          </div>
        )}
      </section>
    </div>
  );
}
