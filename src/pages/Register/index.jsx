import { useEffect, useState } from "react";
import ButtonUpload from "../../components/ButtonUpload";
import CheckBox from "../../components/Checkbox";
import Input from "../../components/Input";
import ButtonSubmit from "../../components/ButtonSubmit";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  formatSlackHandle,
  formatWhatsApp,
} from "../../functions/regex";
import Loader from "../../components/Loader";
import { checkUserExists } from "../../services/firebase";
import resizeImage from "../../functions/resizeImage";
import useParameterization from "../../hooks/useParameterization";
import Breadcrumb from "../../components/Breadcrumb";

export default function Register() {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  let { googleUser, isLoading } = useAuth();

  const email = googleUser.email;
  const uid = googleUser.uid;
  const photoUrl = googleUser.photoURL;

  const [name, setName] = useState(googleUser.displayName);
  const [whatsApp, setWhatsApp] = useState("");
  const [slack, setSlack] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isFetchingImage, setIsFetchingImage] = useState(false);
  const [interval, setInterval] = useState("13:00");
  const [admin, setAdmin] = useState(false);

  const [userExists, setUserExists] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleWhatsApp = (e) => {
    const formatedWhatsApp = formatWhatsApp(e.target.value);
    setWhatsApp(formatedWhatsApp);
  };

  const handleSlack = (e) => {
    const formatedSlack = formatSlackHandle(e.target.value);
    setSlack(formatedSlack);
  };

  const handleSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleBirthday = (e) => {
    const birthdayFormated = formatDate(e.target.value);
    setBirthday(birthdayFormated);
  };

  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedSquad, setSelectedSquad] = useState([]);

  //Pegando infos do hook pra renderizar
  const { workShifts, allPositions, allSuper, allSquads } =
    useParameterization();

  const handleSelectShift = (id) => {
    setSelectedShiftId((prev) => (prev === id ? null : id));
  };

  const handleChangeRole = (id) => {
    setSelectedRole((prev) => (prev === id ? null : id));
  };

  const handleChangeManager = (id) => {
    setSelectedManager((prev) => (prev === id ? null : id));
  };

  const handleChangeChildOption = (id) => {
    setSelectedChild(selectedChild === id ? null : id);
  };

  const handleChangeSquad = (id) => {
    setSelectedSquad((prev = []) => {
      const exists =prev.includes(id)
      const next = exists ? prev.filter((s) => s !== id) : [...prev, id]
      return next
    })
  };

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

  const handleInterval = (event) => {
    setInterval(event.target.value);
  };

  const userRegistered = {
    uid: uid,
    name: name,
    whatsapp: whatsApp,
    slack: slack,
    email: email,
    time: selectedShiftId,
    role: selectedRole,
    manager: selectedManager,
    squad: selectedSquad,
    photoUrl: selectedPhoto,
    surname: surname,
    birthday: birthday,
    child: selectedChild,
    admin: admin,
    interval: interval,
  };

  const fetchImage = async (uid, photoUrl, setSelectedPhoto) => {
    setIsFetchingImage(true);
    try {
      const response = await fetch(`${API_URL}/user/sigin/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.data.photoUrl) {
        setSelectedPhoto(data.data.photoUrl);
      } else {
        setSelectedPhoto(photoUrl);
      }
    } catch (error) {
      console.error("Erro ao buscar a foto:", error);
      setSelectedPhoto(photoUrl);
    }

    const exists = await checkUserExists(uid);
    
    if (exists) {
      setName(exists.data.name);
      setWhatsApp(exists.data.whatsapp);
      setSlack(exists.data.slack);
      setSurname(exists.data.surname);
      setBirthday(exists.data.birthday);
      setSelectedShiftId(exists.data.time);
      setSelectedManager(exists.data.manager);
      setSelectedRole(exists.data.role);
      setSelectedSquad(exists.data.squad);
      setSelectedChild(exists.data.child);
      setAdmin(exists.data.admin);
      setUserExists(true)
    }

    setIsFetchingImage(false);
  };

  useEffect(() => {
    if (uid) {
      fetchImage(uid, googleUser.photoURL, setSelectedPhoto);
    }
  }, [uid]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedShiftId) return alert("Selecione seu horário.");
    if (!selectedRole) return alert("Selecione seu cargo.");
    if (!selectedManager) return alert("Selecione seu gestor(a).");
    if (!selectedChild) return alert("Selecione se possui filhos.");

    try {
      const exists = await checkUserExists(uid);
      console.log("EXISTS", exists)

      let response;
      if (exists) {
        response = await fetch(`${API_URL}/user/${exists.data._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRegistered),
        });
        navigate("/dashboard");
      } else {
        response = await fetch(`${API_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRegistered),
        });

        if (!response.ok) {
          console.log(`Erro na requisição: ${response.status}`);
          const errorData = await response.json();
          console.log(errorData);

          return;
        }

        const data = await response.json();
        console.log(data);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (isLoading || isFetchingImage) {
    return <Loader />;
  }
  //setIsLoading(false)

  const roleExists = allPositions?.some((pos) => pos._id === selectedRole);
  const superExists = allSuper?.some((sup) => sup._id === selectedManager);
  //const squadExists = allSquads?.some((squad) => squad._id === selectedSquad);
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      {userExists && <Breadcrumb/>}
      <div className="w-[95%] lg:w-[90%] m-auto overflow-x-hidden lg:overflow-x-visible h-dvh">
        <h1 className="text-3xl font-semibold mt-5">Informações pessoais</h1>
        <div className="flex flex-col gap-3 relative">
          <Input
            onChange={handleName}
            title="Digite seu nome"
            value={name}
            required={true}
          />
          <Input
            onChange={handleWhatsApp}
            title="WhatsApp: (DD) + Número"
            value={whatsApp}
            max={16}
            required={true}
          />
          <Input
            onChange={handleSlack}
            title="@slack"
            value={slack}
            required={true}
          />
          <Input onChange={handleSurname} title="Apelido" value={surname} />
          <Input
            onChange={handleBirthday}
            title="Aniversário (dia/mês/ano)"
            value={birthday}
            max={10}
            required={true}
          />

          <div>
            <ButtonUpload onChange={handleFileChange} disabled={false} />
            <img
              src={selectedPhoto}
              className="absolute top-0 right-0 w-28 h-28 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-4">
          <div className="mt-4">
            <h1 className="text-3xl font-semibold mb-5">
              Horário de expediente
            </h1>
            {workShifts?.map((works) => (
              <CheckBox
                key={works._id}
                id={works._id}
                title={`${works.startTime} às ${works.endTime}`}
                disabled={selectedShiftId && selectedShiftId !== works._id}
                onChange={() => handleSelectShift(works._id)}
                isChecked={selectedShiftId === works._id}
              />
            ))}
          </div>

          <div className="">
            <div>
              <h1 className="text-3xl font-semibold mt-4">Cargo Atual</h1>
              <div className="flex mt-5 gap-7">
                <div>
                  {allPositions?.map((position) => (
                    <CheckBox
                      key={position._id}
                      isChecked={selectedRole === position._id}
                      disabled={
                        roleExists &&
                        selectedRole &&
                        selectedRole !== position._id
                      }
                      onChange={() => handleChangeRole(position._id)}
                      id={position._id}
                      title={position.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mt-4">Gestor</h1>
            <div className="lg:flex mt-5 gap-10">
              <div>
                {allSuper?.map((sup) => (
                  <CheckBox
                    key={sup._id}
                    isChecked={selectedManager === sup._id}
                    disabled={
                      superExists &&
                      selectedManager &&
                      selectedManager !== sup._id
                    }
                    onChange={() => handleChangeManager(sup._id)}
                    id={sup._id}
                    title={sup.name}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold mt-4">Squad</h1>

            <div className="relative mt-5">
              {allSquads?.map((squad) => (
                <CheckBox
                  key={squad._id}
                  isChecked={selectedSquad?.includes(squad._id)}
                  onChange={() => handleChangeSquad(squad._id)}
                  id={squad._id}
                  title={squad.name}
                />
              ))}
            </div>
          </div>
          <div className="Horario">
            <div className="flex flex-col ">
              <label htmlFor="horario" className="text-3xl font-semibold mt-4">
                Selecione o horário do intervalo
              </label>
              <select
                id="horario"
                name="horario"
                className="md:max-w-[25%] focus:outline-none bg-backgound mt-4 border-2 border-border-color rounded-md p-2 text-lg"
                value={interval}
                onChange={handleInterval}
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
          </div>

          <div className="FILHO">
            <h1 className="text-3xl font-semibold mt-4">Possui filhos?</h1>
            <div className="relative flex mt-5 gap-7">
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
        </div>

        <ButtonSubmit text="Cadastrar" />
      </div>
    </form>
  );
}
