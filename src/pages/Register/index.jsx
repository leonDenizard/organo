import { useState } from "react";
import ButtonUpload from "../../components/ButtonUpload";
import CheckBox from "../../components/Checkbox";
import Input from "../../components/Input";

export default function Register() {

  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedManager, setSelectedManager] = useState(null)

  const handleChangeTime = (id) => {
    setSelectedTime(selectedTime === id ? null : id)
  }

  const handleChangeRole = (id) => {
    setSelectedRole(selectedRole === id ? null : id)
  }

  const handleChangeManager = (id) =>{
    setSelectedManager(selectedManager === id ? null : id)
  }
  return (
    <form className="relative min-h-screen flex items-center">
      <div className="border-2 border-border-color w-[90%] h-[600px] m-auto">

        <h1 className="text-2xl">Informações pessoais</h1>
        <div className="flex flex-col gap-3">
          <Input title="Digite seu nome" />
          <Input title="WhatsApp: (DD) + Número" />
          <Input title="@slack" />
          <div>
            <ButtonUpload />
          </div>

        </div>

        <h1 className="text-2xl">Horário de expediente</h1>
        <div>
          <CheckBox isChecked={selectedTime === "manha"} onChange={() => handleChangeTime("manha")} disabled={selectedTime && selectedTime !== "manha"} title="10:00 às 19:00" id="manha" />
          <CheckBox isChecked={selectedTime === "tarde"} onChange={() => handleChangeTime("tarde")} disabled={selectedTime && selectedTime !== "tarde"} title="13:00 às 22:00" id="tarde" />
          <CheckBox isChecked={selectedTime === "noite"} onChange={() => handleChangeTime("noite")} disabled={selectedTime && selectedTime !== "noite"} title="22:00 às 00:00" id="noite" />
        </div>

        <h1 className="text-2xl">Cargo Atual</h1>
        <div>
          <div>
            <CheckBox isChecked={selectedRole === "trial"} onChange={() => handleChangeRole("trial")} disabled={selectedRole && selectedRole !== "trial"} title="Trial (Menor que trê meses)" id="trial" />
            <CheckBox isChecked={selectedRole === "jri"} onChange={() => handleChangeRole("jri")} disabled={selectedRole && selectedRole !== "jri"} title="JR I" id="jri" />
            <CheckBox isChecked={selectedRole === "jrii"} onChange={() => handleChangeRole("jrii")} disabled={selectedRole && selectedRole !== "jrii"} title="JR II" id="jrii" />
            <CheckBox isChecked={selectedRole === "jriii"} onChange={() => handleChangeRole("jriii")} disabled={selectedRole && selectedRole !== "jriii"} title="JR III" id="jriii" />
          </div>

          <div>
            <CheckBox isChecked={selectedRole === "jriv"} onChange={() => handleChangeRole("jriv")} disabled={selectedRole && selectedRole !== "jriv"} title="JR IV" id="jriv" />
            <CheckBox isChecked={selectedRole === "pleno"} onChange={() => handleChangeRole("pleno")} disabled={selectedRole && selectedRole !== "pleno"} title="Pleno" id="pleno" />
            <CheckBox isChecked={selectedRole === "super"} onChange={() => handleChangeRole("super")} disabled={selectedRole && selectedRole !== "super"} title="Super" id="super" />
            <CheckBox isChecked={selectedRole === "gerente"} onChange={() => handleChangeRole("gerente")} disabled={selectedRole && selectedRole !== "gerente"} title="Gerente" id="gerente" />

          </div>


        </div>

        <h1 className="text-2xl">Gestor</h1>
        <div>
          <CheckBox isChecked={selectedManager === "guto"} onChange={() => handleChangeManager("guto")} disabled={selectedManager && selectedManager !== "guto"} title="Augusto Cezar" id="guto" />
          <CheckBox isChecked={selectedManager === "greice"} onChange={() => handleChangeManager("greice")} disabled={selectedManager && selectedManager !== "greice"} title="Greice Marques" id="greice" />
          <CheckBox isChecked={selectedManager === "diogo"} onChange={() => handleChangeManager("diogo")} disabled={selectedManager && selectedManager !== "diogo"} title="Diogo Nunes" id="diogo" />
          <CheckBox isChecked={selectedManager === "duda"} onChange={() => handleChangeManager("duda")} disabled={selectedManager && selectedManager !== "duda"} title="Duda" id="guto" />
          <CheckBox isChecked={selectedManager === "teteu"} onChange={() => handleChangeManager("teteu")} disabled={selectedManager && selectedManager !== "teteu"} title="Mateus Silva" id="teteu" />
        </div>
      </div>
      {console.log(selectedTime, selectedRole, selectedManager)}
    </form>
  )
}