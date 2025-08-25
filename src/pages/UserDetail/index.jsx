import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Schedule from "../Schedule";
import { useAuth } from "../../context/AuthProvider";
import useParameterization from "../../hooks/useParameterization";
import Breadcrumb from "../../components/Breadcrumb";
import { AlarmClock, Coffee, MailIcon, Rocket, Slack, UserCheck } from "lucide-react";

export default function UserDetail() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { backendUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { allPositions, workShifts, allSquads, allSuper } =
    useParameterization();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/user/${id}`);
        const data = await response.json();

        setUserData(data.data);
      } catch (error) {
        console.log("Erro ao buscar usuário na página UserDetail", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (isLoading) return <Loader />;

  const role =
    allPositions.find((n) => n._id === userData?.role)?.name ||
    "Cargo não encontrado";
  const workShift =
    workShifts.find((w) => w._id === userData?.time) ||
    "Horário não encontrado";
  const shiftText = `${workShift.startTime} - ${workShift.endTime}`;
  const supervisor =
    allSuper.find((sup) => sup._id === userData?.manager)?.name || "Sem super";
  const squads = userData.squad.map(
    (sq) => allSquads.find((s) => s._id === sq)?.name || "Squad não encontrado"
  );

  return (
    <div className="container w-[90%] m-auto">
      <Header name={backendUser.data?.name} img={backendUser.data?.photoUrl} />
      <Breadcrumb />
      <Schedule
        showHeader={false}
        onClick={onclick}
        userId={id}
        showBreadcrumbs={false}
        showButtonSend={false}
      />

      <section className="relative top-40 m-auto w-[90%] flex flex-col gap-6 mb-5 p-6 rounded-md shadow-md bg-card-bg border-2 border-border-color">

        {/* Perfil */}
        <div className="flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover border-2 border-border-color"
            src={userData?.photoUrl}
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-2xl font-semibold">
              {userData?.name}
            </span>
            <span className="text-sm text-gray-400">{role}</span>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <span className="bg-backgound p-2 rounded-lg shadow-sm flex gap-2 items-center">
            <div className="bg-card-bg h-10 w-10 p-[9px] rounded-full flex items-center justify-center">
              <Slack />
            </div> 
            <p className="font-semibold text-gray-300">{userData?.slack}</p>
          </span>

          <span className="bg-backgound p-2 rounded-lg shadow-sm flex gap-2 items-center">
            <div className="bg-card-bg h-10 w-10 p-[9px] rounded-full flex items-center justify-center">
              <MailIcon/>
            </div> 
            <p className="font-semibold text-gray-300">{userData?.email}</p>
          </span>
          <span className="bg-backgound p-2 rounded-lg shadow-sm flex gap-2 items-center">
            <div className="bg-card-bg h-10 w-10 p-[9px] rounded-full flex items-center justify-center"><AlarmClock /></div><p className="font-semibold text-gray-300">{shiftText}</p>
          </span>
          <span className="bg-backgound p-2 rounded-lg shadow-sm flex gap-2 items-center">
            <div className="bg-card-bg h-10 w-10 p-[9px] rounded-full flex items-center justify-center"><UserCheck /></div> <p className="font-semibold text-gray-300">{supervisor}</p>
          </span>
          < span className="bg-backgound p-2 rounded-lg shadow-sm flex gap-2 items-center">
            <div className="bg-card-bg h-10 w-10 p-[9px] rounded-full flex items-center justify-center"><Rocket /></div> {squads.map((s, i) => (<p className="bg-purple-700/10 px-4 py-1 items-center text-purple-400 rounded-md font-semibold" key={i}>{s}</p>))}
          </span>
          <span className="bg-backgound p-2 rounded-lg shadow-sm flex gap-2 items-center">
            <div className="bg-card-bg h-10 w-10 p-[9px] rounded-full flex items-center justify-center"><Coffee /></div> <p className="font-semibold text-gray-300">{userData?.interval} hs</p>
          </span>
        </div>
      </section>

      {/* Adicionar mais informações aqui */}
    </div>
  );
}
