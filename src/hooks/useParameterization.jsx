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

  useEffect(() => {
    setPositionsOptimistic(allPositions); // sincroniza quando allPositions mudar
  }, [allPositions]);

  const handleSubmitPosition = async () => {
    if (!position.trim()) return;
    if (
      allPositions.some(
        (pos) => pos.name.toLowerCase() === position.toLowerCase()
      )
    ) {
      toast.error("Cargo já existe");
      return;
    }

    const newPos = { _id: Date.now().toString(), name: position };

    // Adiciona OTIMISTA
    setPositionsOptimistic((old) => [...old, newPos]);
    setPosition("");

    try {
      await createPosition(position); // se erro, vai lançar e cair no catch
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

    await createSquad(squad);
    fetchSquad();
    setSquad("");
  };

  const fetchSquad = async () => {
    const data = await getAllSquad();
    setAllSquads(data.message);
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
            "Erro ao deletar carfo";
          return msg;
        },
      })
      .then(() => {
        fetchPosition();
      });
  };

  const handleDeleteSquad = async (id) => {
    await deleteSquadById(id);
    fetchSquad();
  };

  const fetchPosition = async () => {
    const data = await getAllPosition();
    //console.log(data.AllPosition)
    setAllPositions(data.AllPosition);
  };

  const handleSubmitSuper = async () => {
    if (!supervisor.trim()) return;

    await createSupervisor(supervisor);
    fetchSuper();
    setSupervisor("");
  };

  const fetchSuper = async () => {
    const data = await getAllSuper();
    //console.log("Super vindo do useParam", data)
    setAllSuper(data);
  };

  const handleDeleteSuper = async (id) => {
    await deleteSuperById(id);
    fetchSuper();
  };

  const handleSubmitWorkShift = async () => {
    await createWorkShift(startTime, endTime);
    fetchWorkShift();
  };

  const fetchWorkShift = async () => {
    const data = await getAllWorkShift();
    setWorkShifts(data);
  };

  const handleDeleteWorkShift = async (id) => {
    await deleteWorkShiftById(id);
    fetchWorkShift();
  };

  const fetchAllUsers = async () => {
    const response = await getAllUsers();

    const users = response.map((user) => ({
      id: user._id,
      uid: user.uid,
      name: user.name,
      admin: user.admin,
      profile: user.photoUrl,
    }));

    const admins = users.filter((user) => user.admin === true);
    setUsersAdmin(admins);
    setAllUser(users);
  };

  const handlePromoteToAdmin = async (uid) => {
    if (!uid) return;
    await updateUserAdminById(uid);
    fetchAllUsers();
  };
  const handleRemoveAdmin = async (uid) => {
    if (!uid) return;
    await deleteUserAdminById(uid);
    fetchAllUsers();
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
    handleSubmitSquad,
    handleDeleteSquad,

    supervisor,
    setSupervisor,
    allSuper,
    handleSubmitSuper,
    handleDeleteSuper,

    startTime,
    endTime,
    setStartTime,
    setEndTime,
    workShifts,
    handleSubmitWorkShift,
    handleDeleteWorkShift,

    fetchAllUsers,
    allUsers,
    selectedUserUid,
    setSelectedUserUid,
    handlePromoteToAdmin,
    handleRemoveAdmin,
    userAdmin,
  };
}
