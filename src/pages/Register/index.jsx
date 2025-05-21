import { useEffect, useState } from "react";
import ButtonUpload from "../../components/ButtonUpload";
import CheckBox from "../../components/Checkbox";
import Input from "../../components/Input";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { formatDate, formatSlackHandle, formatWhatsApp } from "../../functions/regex";
import Loader from "../../components/Loader";
import { checkUserExists } from "../../services/firebase";
import resizeImage from "../../functions/resizeImage"

export default function Register() {

  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL no frontend:", API_URL);

  const navigate = useNavigate();

  let { user, isLoading, setIsLoading } = useAuth();

  const [isFetchingImage, setIsFetchingImage] = useState(false);

  // setIsLoading(true)
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
  const [selectedPhoto, setSelectedPhoto] = useState(null)


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
    const file = e.target.files[0];

    if (file) {
      resizeImage(file, 200, (blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result;
          setSelectedPhoto(base64String);
        };
        reader.readAsDataURL(blob);
      });

    }
  };


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
    admin: false,

  }



  const fetchImage = async (uid, photoUrl, setSelectedPhoto) => {

    setIsFetchingImage(true);
    try {

      const response = await fetch(`${API_URL}/user/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();


      if (data.photoUrl) {
        setSelectedPhoto(data.photoUrl)
      } else {
        setSelectedPhoto(photoUrl);

      }
    } catch (error) {
      console.error("Erro ao buscar a foto:", error);
      setSelectedPhoto(photoUrl);
    }


    const exists = await checkUserExists(uid)

    if (exists) {
      setName(exists.name)
      setWhatsApp(exists.whatsapp)
      setSlack(exists.slack)
      setSurname(exists.surname)
      setBirthday(exists.birthday)
      setSelectedTime(exists.time)
      setSelectedManager(exists.manager)
      setSelectedRole(exists.role)
      setSelectedChild(exists.child)
    }

    setIsFetchingImage(false);

  };

  useEffect(() => {

    if (uid) {
      fetchImage(uid, user.photoURL, setSelectedPhoto);
    }
  }, [uid])


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedTime) return alert("Selecione seu horário.")
    if (!selectedRole) return alert("Selecione seu cargo.")
    if (!selectedManager) return alert("Selecione seu gestor(a).")
    if (!selectedChild) return alert("Selecione se possui filhos.")

    setIsLoading(true)
    try {

      const exists = await checkUserExists(uid)


      let response
      if (exists) {

        response = await fetch(`${API_URL}/user/${uid}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userRegistered)

        })
        navigate("/dashboard")

      } else {

        response = await fetch(`${API_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userRegistered)
        })

        if (!response.ok) {
          console.log(`Erro na requisição: ${response.status}`);
          const errorData = await response.json()
          console.log(errorData)

          return
        }

        const data = await response.json()
        console.log(data)

        navigate("/dashboard")
      }


    } catch (error) {
      console.error("Erro na requisição:", error)
    }finally{
      setIsLoading(false)
    }

  };



  if (isLoading || isFetchingImage) {
    return <Loader />;
  }
  setIsLoading(false)

  return (

    <form
      onSubmit={handleSubmit}
      className="relative"
    >
      <div className="w-[95%] lg:w-[90%] m-auto overflow-x-hidden lg:overflow-x-visible h-dvh">
        <h1 className="text-3xl font-semibold mt-5">Informações pessoais</h1>
        <div className="flex flex-col gap-3 relative">
          <Input onChange={handleName} title="Digite seu nome" value={name} required={true} />
          <Input onChange={handleWhatsApp} title="WhatsApp: (DD) + Número" value={whatsApp} max={16} required={true} />
          <Input onChange={handleSlack} title="@slack" value={slack} required={true} />
          <Input onChange={handleSurname} title="Apelido" value={surname} />
          <Input onChange={handleBirthday} title="Aniversário (dia/mês/ano)" value={birthday} max={10} required={true} />

          <div>
            <ButtonUpload onChange={handleFileChange} disabled={false} />
            <img src={selectedPhoto}
              className="absolute top-0 right-0 w-28 h-28 rounded-full object-cover"
            />
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
                  disabled={selectedManager && selectedManager !== "luan"}
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
