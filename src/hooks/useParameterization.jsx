import { useEffect, useState } from "react";
import {
  createPosition,
  createSquad,
  createSupervisor,
  createWorkShift,
  deletePositionById,
  deleteSquadById,
  deleteSuperById,
  deleteUserAdminById,
  deleteWorkShiftById,
  getAllPosition,
  getAllSquad,
  getAllSuper,
  getAllUsers,
  getAllWorkShift,
  updateUserAdminById,
} from "../services/parameterizationService";
import toast from "react-hot-toast";

export default function useParameterization() {
  const [position, setPosition] = useState("");
  const [allPositions, setAllPositions] = useState([]);

  const [squad, setSquad] = useState("");
  const [allSquads, setAllSquads] = useState([]);

  const [supervisor, setSupervisor] = useState("");
  const [allSuper, setAllSuper] = useState([]);

  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("19:00");
  const [workShifts, setWorkShifts] = useState([]);

  const [allUsers, setAllUser] = useState([]);
  const [selectedUserUid, setSelectedUserUid] = useState("");
  const [userAdmin, setUsersAdmin] = useState("");

  //Handler submit

  const [positionsOptimistic, setPositionsOptimistic] = useState([]);
  const [squadsOptimistic, setSquadsOptimistic] = useState([]);
  const [superOptimistic, setSuperOptimistic] = useState([]);
  const [workOptimistic, setWorkOptimistic] = useState([]);
  const [userOptimistic, setUserOptimistic] = useState([]);

  useEffect(() => {
    setPositionsOptimistic(allPositions);
    setSquadsOptimistic(allSquads);
    setSuperOptimistic(allSuper);
    setWorkOptimistic(workShifts);
  }, [allPositions, allSquads, allSuper, workShifts]);

  const handleSubmitPosition = async () => {
    if (!position.trim()) return;
    if (
      allPositions.some(
        (pos) => pos.name.toLowerCase() === position.toLowerCase()
      )
    ) {
      toast.error("Cargo já existe");
      setPosition("");
      return;
    }

    const newPos = { _id: Date.now().toString(), name: position };

    // Adiciona OTIMISTA
    setPositionsOptimistic((old) => [...old, newPos]);
    setPosition("");

    try {
      await createPosition(position);
      toast.success("Cargo cadastrado com sucesso");
      fetchPosition();
    } catch (err) {
      // Remove o item otimista que falhou
      setPositionsOptimistic((old) =>
        old.filter((pos) => pos._id !== newPos._id)
      );

      toast.error(err.message || "Erro ao salvar cargo");
    }
  };

  const handleSubmitSquad = async () => {
    if (!squad.trim()) return;

    if (
      allSquads.some(
        (sqd) => sqd.name.toLowerCase() === squad.toLocaleLowerCase()
      )
    ) {
      toast.error("Squad já existe");
      setSquad("");
      return;
    }

    const newSquad = { _id: Date.now().toString(), name: squad };

    setSquadsOptimistic((old) => [...old, newSquad]);

    try {
      await createSquad(squad);
      setSquad("");
      toast.success("Squad criado com suecesso");
      fetchSquad();
    } catch (error) {
      setSquadsOptimistic((old) =>
        old.filter((sqd) => sqd._id !== newSquad._id)
      );
      toast.error(error.message || "Erro ao salvar cargo");
    }
  };

  const fetchSquad = async () => {
    const data = await getAllSquad();
    setAllSquads(data);
  };

  const handleDeletePosition = async (id) => {
    toast
      .promise(deletePositionById(id), {
        loading: "Deletando cargo...",
        success: "Cargo deletado com sucesso",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar cargo";
          return msg;
        },
      })
      .then(() => {
        fetchPosition();
      });
  };

  const handleDeleteSquad = async (id) => {
    toast
      .promise(deleteSquadById(id), {
        loading: "Deletando Squad",
        success: "Squad deletado com sucesso!",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar carfo";
          return msg;
        },
      })
      .then(() => {
        fetchSquad();
      });
  };

  const fetchPosition = async () => {
    const data = await getAllPosition();
    setAllPositions(data);
  };

  const handleSubmitSuper = async () => {
    if (!supervisor.trim()) return;

    if (
      allSuper?.some(
        (sup) => sup.name.toLocaleLowerCase() === supervisor.toLocaleLowerCase()
      )
    ) {
      toast.error("Supervisor já criado!");
      setSupervisor("");
      return;
    }

    const newSuper = { _id: Date.now.toString(), name: supervisor };
    setSuperOptimistic((old) => [...(old ?? []), newSuper]);

    try {
      await createSupervisor(supervisor);
      setSupervisor("");
      toast.success("Supervisor inserido com sucesso");
      fetchSuper();
    } catch (error) {
      setSquadsOptimistic((old) =>
        old.filter((sup) => sup._id !== newSuper._id)
      );
      toast.error(error.message || "Erro ao salvar supervisor");
    }
  };

  const fetchSuper = async () => {
    const data = await getAllSuper();
    //console.log("Super vindo do useParam", data)
    setAllSuper(data);
  };

  const handleDeleteSuper = async (id) => {
    toast
      .promise(deleteSuperById(id), {
        loading: "Deletando supervisor...",
        success: "Supervisor deletado com sucesso",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar Super";
          return msg;
        },
      })
      .then(() => {
        fetchSuper();
      });
  };

  const handleSubmitWorkShift = async () => {
    const newStart = startTime.trim();
    const newEnd = endTime.trim();

    if (
      workShifts?.some(
        (ws) => ws.startTime === newStart && ws.endTime === newEnd
      )
    ) {
      toast.error("Horário já existe");
      return;
    }

    const newWorkShift = {
      _id: Date.now().toString(),
      startTime: newStart,
      endTime: newEnd,
    };

    setWorkOptimistic((old) => [...(old ?? []), newWorkShift]);

    try {
      await createWorkShift(newStart, newEnd);
      fetchWorkShift();
      toast.success("Horário inserio com sucesso");
    } catch (err) {
      setWorkOptimistic((old) =>
        old.filter((ws) => ws._id !== newWorkShift._id)
      );

      toast.error(
        err?.response?.data?.message || err?.message || "Erro ao salvar horário"
      );
    }
  };

  const fetchWorkShift = async () => {
    const data = await getAllWorkShift();
    setWorkShifts(data);
  };

  const handleDeleteWorkShift = async (id) => {
    toast
      .promise(deleteWorkShiftById(id), {
        loading: "Deletando Horário...",
        success: "Horário deletado com sucesso",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao deletar Horário";
          return msg;
        },
      })
      .then(() => {
        fetchWorkShift();
      });
  };

  const fetchAllUsers = async () => {
    const response = await getAllUsers();

    const users = response.map((user) => ({
      id: user._id,
      uid: user.uid,
      name: user.name,
      admin: user.admin,
      profile: user.photoUrl,
      time: user.time,
      manager: user.manager
    }));

    const admins = users.filter((user) => user.admin === true);
    setUsersAdmin(admins);
    setAllUser(users);
    setUserOptimistic(admins);
  };

  const handlePromoteToAdmin = async (id) => {
    if (!id) return;

    // Verifica se já é admin na lista completa
    const userAlreadyAdmin = allUsers.some(
      (user) => user._id === id && user.admin === true
    );

    if (userAlreadyAdmin) {
      toast.error("Usuário já é admin");
      return;
    }

    // Pega o usuário para adicionar no estado otimista
    const userToPromote = allUsers.find((user) => user._id === id);

    // Atualiza otimista adicionando o usuário com admin=true
    setUserOptimistic((old) => [...old, { ...userToPromote, admin: true }]);

    try {
      await updateUserAdminById(id);
      await fetchAllUsers(); // Sincroniza a lista completa após update
      toast.success("Usuário promovido para admin");
    } catch (err) {
      // Reverte estado otimista em caso de erro
      setUserOptimistic((old) => old.filter((user) => user._id !== id));
      toast.error(err?.message || "Erro ao promover usuário");
    }
  };

  const handleRemoveAdmin = async (id) => {
    if (!id) return;
    
    toast
      .promise(deleteUserAdminById(id), {
        loading: "Removendo acesso de Admin...",
        success: "Removido o acesso de admin",
        error: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Erro ao remover acesso de admin";
          return msg;
        },
      })
      .then(() => {
        fetchAllUsers();
      });
  };

  useEffect(() => {
    fetchPosition();
    fetchSquad();
    fetchSuper();
    fetchWorkShift();
    fetchAllUsers();
  }, []);

  return {
    position,
    setPosition,
    allPositions,
    handleSubmitPosition,
    handleDeletePosition,
    positionsOptimistic,
    squad,
    setSquad,
    allSquads,
    squadsOptimistic,
    handleSubmitSquad,
    handleDeleteSquad,

    supervisor,
    setSupervisor,
    allSuper,
    superOptimistic,
    handleSubmitSuper,
    handleDeleteSuper,

    startTime,
    endTime,
    setStartTime,
    setEndTime,
    workShifts,
    workOptimistic,
    handleSubmitWorkShift,
    handleDeleteWorkShift,

    fetchAllUsers,
    allUsers,
    userOptimistic,
    selectedUserUid,
    setSelectedUserUid,
    handlePromoteToAdmin,
    handleRemoveAdmin,
    userAdmin,
  };
}
