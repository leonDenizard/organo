import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Schedule from "../Schedule";
import { useAuth } from "../../context/AuthProvider";
import useParameterization from "../../hooks/useParameterization";
import Breadcrumb from "../../components/Breadcrumb";

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
      <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
      <p className="flex items-center gap-3">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={userData?.photoUrl}
          alt=""
        />
        {userData?.name}
      </p>
      <p>Email: {userData?.email}</p>
      <p>Cargo: {role}</p>
      <p>Horário: {shiftText}</p>
      <p>Supervisor: {supervisor}</p>
      <p>Squads: {squads.join(", ")}</p>
      {/* Adicionar mais informações aqui */}

      <Schedule showHeader={false} onClick={onclick} userId={id} />
    </div>
  );
}
