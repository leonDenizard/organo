import { useState } from "react";
import ButtonUpload from "../../components/ButtonUpload";
import CheckBox from "../../components/Checkbox";
import Input from "../../components/Input";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useAuth } from "../../context/AuthProvider";
import { db, collection, addDoc } from "../../services/firebase"
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate()

  const { user } = useAuth()

  const email = user.email
  const uid = user.uid
  const photoUrl = user.photoURL

  const [name, setName] = useState(user.displayName)
  const [whatsApp, setWhatsApp] = useState('')
  const [slack, setSlack] = useState('')

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleWhatsApp = (e) => {
    setWhatsApp(e.target.value)
  }

  const handleSlack = (e) => {
    setSlack(e.target.value)
  }
  
  

  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedManager, setSelectedManager] = useState(null)

  const handleChangeTime = (id) => {
    setSelectedTime(selectedTime === id ? null : id)
  }

  const handleChangeRole = (id) => {
    setSelectedRole(selectedRole === id ? null : id)
  }

  const handleChangeManager = (id) => {
    setSelectedManager(selectedManager === id ? null : id)
  }


  

  const userRegistered = {
    uid: uid,
    name: name,
    whatsapp: whatsApp,
    slack: slack,
    email: email,
    time: selectedTime,
    role: selectedRole,
    manager: selectedManager,
    photoUrl: photoUrl

  }

  // console.log(user)

  const handleSubmit = async (event) => {

    event.preventDefault()
    try {
      await addDoc(collection(db, 'users'), userRegistered);
      console.log("Usuário registrado com sucesso");

      navigate("/dashboard")
      console.log("Redirecionando para o dashboard");
    } catch (error) {
      console.error("Erro ao registrar usuário: ", error);
    }
  }


  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center justify-center">
      <div className="w-[90%] m-auto">

        <h1 className="text-3xl font-semibold">Informações pessoais</h1>
        <div className="flex flex-col gap-3">

          <Input onChange={handleName} title="Digite seu nome" value={name}/>
          <Input onChange={handleWhatsApp} title="WhatsApp: (DD) + Número" />
          <Input onChange={handleSlack} title="@slack" />

          <div>
            <ButtonUpload />
          </div>

        </div>

        <div className="relative w-2/4">
          <h1 className="text-3xl font-semibold mt-10">Horário de expediente</h1>
          <div className="mt-5">
            <CheckBox isChecked={selectedTime === "morning"} onChange={() => handleChangeTime("morning")} disabled={selectedTime && selectedTime !== "morning"} title="10:00 às 19:00" id="morning" />
            <CheckBox isChecked={selectedTime === "afternoon"} onChange={() => handleChangeTime("afternoon")} disabled={selectedTime && selectedTime !== "afternoon"} title="13:00 às 22:00" id="afternoon" />
            <CheckBox isChecked={selectedTime === "night"} onChange={() => handleChangeTime("night")} disabled={selectedTime && selectedTime !== "night"} title="22:00 às 00:00" id="night" />
          </div>

          <h1 className="text-3xl font-semibold mt-4">Cargo Atual</h1>
          <div className="flex mt-5 justify-between">
            <div>
              <CheckBox isChecked={selectedRole === "trial"} onChange={() => handleChangeRole("trial")} disabled={selectedRole && selectedRole !== "trial"} title="Trial (Menor que três meses)" id="trial" />
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

          <h1 className="text-3xl font-semibold mt-4">Gestor</h1>
          <div className="flex mt-5 justify-between -mr-8">
            <div>
              <CheckBox isChecked={selectedManager === "guto"} onChange={() => handleChangeManager("guto")} disabled={selectedManager && selectedManager !== "guto"} title="Augusto Cezar" id="guto" />
              <CheckBox isChecked={selectedManager === "greice"} onChange={() => handleChangeManager("greice")} disabled={selectedManager && selectedManager !== "greice"} title="Greice Marques" id="greice" />
              <CheckBox isChecked={selectedManager === "diogo"} onChange={() => handleChangeManager("diogo")} disabled={selectedManager && selectedManager !== "diogo"} title="Diogo Nunes" id="diogo" />

            </div>
            <div>

              <CheckBox isChecked={selectedManager === "duda"} onChange={() => handleChangeManager("duda")} disabled={selectedManager && selectedManager !== "duda"} title="Duda" id="duda" />
              <CheckBox isChecked={selectedManager === "teteu"} onChange={() => handleChangeManager("teteu")} disabled={selectedManager && selectedManager !== "teteu"} title="Mateus Silva" id="teteu" />
            </div>

          </div>
        </div>
        <ButtonSubmit submit={handleSubmit} text="Cadastrar"/>
      </div>

      
    </form>
  )
}
