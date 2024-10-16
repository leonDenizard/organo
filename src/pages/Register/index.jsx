import { useState } from "react";
import ButtonUpload from "../../components/ButtonUpload";
import CheckBox from "../../components/Checkbox";
import Input from "../../components/Input";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useAuth } from "../../context/AuthProvider";
import { db, collection, addDoc } from "../../services/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { formatDate, formatSlackHandle, formatWhatsApp } from "../../functions/regex";
import Loader from "../../components/Loader";

export default function Register() {
  const navigate = useNavigate();

  const { user, isUserRegistered, isLoading } = useAuth();
  

  const email = user.email;
  const uid = user.uid;
  const photoUrl = user.photoURL;

  const [name, setName] = useState(user.displayName);
  const [whatsApp, setWhatsApp] = useState("");
  const [slack, setSlack] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("")

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleWhatsApp = (e) => {
    const formatedWhatsApp = formatWhatsApp(e.target.value);    
    setWhatsApp(formatedWhatsApp);
  };

  const handleSlack = (e) => {
    const formatedSlack = formatSlackHandle(e.target.value)
    setSlack(formatedSlack);
  };

  const handleSurname = (e) => {
    setSurname(e.target.value)
  }

  const handleBirthday = (e) => {
    const birthdayFormated = formatDate(e.target.value)
    setBirthday(birthdayFormated)
  }

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(photoUrl)

  const handleChangeTime = (id) => {
    setSelectedTime(selectedTime === id ? null : id);
  };

  const handleChangeRole = (id) => {
    setSelectedRole(selectedRole === id ? null : id);
  };

  const handleChangeManager = (id) => {
    setSelectedManager(selectedManager === id ? null : id);
  };

  const handleChangeChildOption = (id) => {
    setSelectedChild(selectedChild === id ? null : id)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if(file){
      const fileUrl = URL.createObjectURL(file)

      setSelectedPhoto(fileUrl)
    }
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
    photoUrl: selectedPhoto,
    surname: surname,
    birthday: birthday,
    child: selectedChild,

  };

  // console.log(user)

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    try {
      await addDoc(collection(db, "users"), userRegistered);
      console.log("Usuário registrado com sucesso");

      navigate("/dashboard");
      console.log("Redirecionando para o dashboard");
    } catch (error) {
      console.error("Erro ao registrar usuário: ", error);
    }
  };

  console.log("User Registered", isUserRegistered)

  if(isLoading){
    return <Loader/>
  }
  if(isUserRegistered){
    return <Navigate to={"/dashboard"}/>
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="relative"
    >
      <div className="w-[95%] lg:w-[90%] m-auto overflow-x-hidden lg:overflow-x-visible h-dvh">
        <h1 className="text-3xl font-semibold mt-5">Informações pessoais</h1>
        <div className="flex flex-col gap-3 relative">
          <Input onChange={handleName} title="Digite seu nome" value={name} required={true} />
          <Input onChange={handleWhatsApp} title="WhatsApp: (DD) + Número" value={whatsApp} max={16} required={true}/>
          <Input onChange={handleSlack} title="@slack" value={slack} required={true}/>
          <Input onChange={handleSurname} title="Apelido" />
          <Input onChange={handleBirthday} title="Aniversário (dia/mês/ano)" value={birthday} max={10} required={true}/>

          <div>
            <ButtonUpload onChange={handleFileChange} disabled={true}/>
            <img src={selectedPhoto} className="absolute top-0 right-0 w-28 h-28 rounded-full"/>
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-4">
          <div className="mt-4">
          <h1 className="text-3xl font-semibold mb-5">
            Horário de expediente
          </h1>
            <CheckBox
              isChecked={selectedTime === "morning"}
              onChange={() => handleChangeTime("morning")}
              disabled={selectedTime && selectedTime !== "morning"}
              title="10:00 às 19:00"
              id="morning"
            />
            <CheckBox
              isChecked={selectedTime === "afternoon"}
              onChange={() => handleChangeTime("afternoon")}
              disabled={selectedTime && selectedTime !== "afternoon"}
              title="13:00 às 22:00"
              id="afternoon"
            />
            <CheckBox
              isChecked={selectedTime === "night"}
              onChange={() => handleChangeTime("night")}
              disabled={selectedTime && selectedTime !== "night"}
              title="22:00 às 00:00"
              id="night"
            />
          </div>

          <div className="">
            <div>
              <h1 className="text-3xl font-semibold mt-4">Cargo Atual</h1>
              <div className="flex mt-5 gap-7">
                <div>
                  <CheckBox
                    isChecked={selectedRole === "trial"}
                    onChange={() => handleChangeRole("trial")}
                    disabled={selectedRole && selectedRole !== "trial"}
                    title="Trial (Menor que três meses)"
                    id="trial"
                  />
                  <CheckBox
                    isChecked={selectedRole === "jri"}
                    onChange={() => handleChangeRole("jri")}
                    disabled={selectedRole && selectedRole !== "jri"}
                    title="JR I"
                    id="jri"
                  />
                  <CheckBox
                    isChecked={selectedRole === "jrii"}
                    onChange={() => handleChangeRole("jrii")}
                    disabled={selectedRole && selectedRole !== "jrii"}
                    title="JR II"
                    id="jrii"
                  />
                  <CheckBox
                    isChecked={selectedRole === "jriii"}
                    onChange={() => handleChangeRole("jriii")}
                    disabled={selectedRole && selectedRole !== "jriii"}
                    title="JR III"
                    id="jriii"
                  />
                </div>

                <div>
                  <CheckBox
                    isChecked={selectedRole === "jriv"}
                    onChange={() => handleChangeRole("jriv")}
                    disabled={selectedRole && selectedRole !== "jriv"}
                    title="JR IV"
                    id="jriv"
                  />
                  <CheckBox
                    isChecked={selectedRole === "pleno"}
                    onChange={() => handleChangeRole("pleno")}
                    disabled={selectedRole && selectedRole !== "pleno"}
                    title="Pleno"
                    id="pleno"
                  />
                  <CheckBox
                    isChecked={selectedRole === "super"}
                    onChange={() => handleChangeRole("super")}
                    disabled={selectedRole && selectedRole !== "super"}
                    title="Super"
                    id="super"
                  />
                  <CheckBox
                    isChecked={selectedRole === "gerente"}
                    onChange={() => handleChangeRole("gerente")}
                    disabled={selectedRole && selectedRole !== "gerente"}
                    title="Gerente"
                    id="gerente"
                  />
                </div>
              </div>
            </div>
            

          </div>
          <div>
              <h1 className="text-3xl font-semibold mt-4">Gestor</h1>
              <div className="lg:flex mt-5 gap-10">
                <div>
                  <CheckBox
                    isChecked={selectedManager === "guto"}
                    onChange={() => handleChangeManager("guto")}
                    disabled={selectedManager && selectedManager !== "guto"}
                    title="Augusto Cezar"
                    id="guto"
                  />
                  <CheckBox
                    isChecked={selectedManager === "greice"}
                    onChange={() => handleChangeManager("greice")}
                    disabled={selectedManager && selectedManager !== "greice"}
                    title="Greice Marques"
                    id="greice"
                  />
                  <CheckBox
                    isChecked={selectedManager === "diogo"}
                    onChange={() => handleChangeManager("diogo")}
                    disabled={selectedManager && selectedManager !== "diogo"}
                    title="Diogo Nunes"
                    id="diogo"
                  />
                </div>
                <div>
                  <CheckBox
                    isChecked={selectedManager === "duda"}
                    onChange={() => handleChangeManager("duda")}
                    disabled={selectedManager && selectedManager !== "duda"}
                    title="Duda"
                    id="duda"
                  />
                  <CheckBox
                    isChecked={selectedManager === "luan"}
                    onChange={() => handleChangeManager("luan")}
                    disabled={selectedManager && selectedManager !== "duda"}
                    title="Luan"
                    id="luan"
                  />
                  <CheckBox
                    isChecked={selectedManager === "teteu"}
                    onChange={() => handleChangeManager("teteu")}
                    disabled={selectedManager && selectedManager !== "teteu"}
                    title="Mateus Silva"
                    id="teteu"
                  />
                </div>
              </div>
            </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold mt-4">Possui filhos?</h1>
          <div className="flex mt-5 justify-between -mr-8 gap-10">
            <div>
              <CheckBox
                isChecked={selectedChild === "yes"}
                onChange={() => handleChangeChildOption("yes")}
                disabled={selectedChild && selectedChild !== "yes"}
                title="Sim"
                id="yes"
              />
              <CheckBox
                isChecked={selectedChild === "no"}
                onChange={() => handleChangeChildOption("no")}
                disabled={selectedChild && selectedChild !== "no"}
                title="Não"
                id="no"
              />
            </div>
          </div>
        </div>
        <ButtonSubmit text="Cadastrar" />
      </div>
    </form>
  );
}
