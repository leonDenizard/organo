import { useEffect, useState } from "react";
import { createPosition, createSquad, createSupervisor, deletePositionById, deleteSquadById, deleteSuperById, getAllPosition, getAllSquad, getAllSuper } from "../services/parameterizationService";

export default function useParameterization() {
  const [position, setPosition] = useState("");
  const [allPositions, setAllPositions] = useState([])
  const [squad, setSquad] = useState("")
  const [allSquads, setAllSquads] = useState([])
  const [supervisor, setSupervisor] = useState("")
  const [allSuper, setAllSuper] = useState([])

  //Handler submit

  const handleSubmitPosition = async () => {
    if (!position.trim()) return;

    await createPosition(position);
    setPosition("");
    fetchPosition()
  };

  const handleSubmitSquad = async () => {
    if(!squad.trim()) return

    await createSquad(squad)
    fetchSquad()
    setSquad("")

  }

 const fetchSquad = async () => {
    const data = await getAllSquad()
    setAllSquads(data.message)
  }

  const handleDeletePosition = async (id) => {
    await deletePositionById(id)
    fetchPosition()
  }

  const handleDeleteSquad = async (id) =>{
    await deleteSquadById(id)
    fetchSquad()
  } 

  const fetchPosition = async () => {
    const data = await getAllPosition()
    //console.log(data.AllPosition)
    setAllPositions(data.AllPosition)
  }

  const handleSubmitSuper = async () => {
    if(!supervisor.trim()) return

    await createSupervisor(supervisor)
    fetchSuper()
    setSupervisor("")

  }

 const fetchSuper = async () => {
    const data = await getAllSuper()
    //console.log("Super vindo do useParam", data)
    setAllSuper(data)
  }

  const handleDeleteSuper = async (id) => {
    await deleteSuperById(id)
    fetchSuper()
  }

  useEffect(() => {
    fetchPosition()
    fetchSquad()
    fetchSuper()
  }, [])

  return {
    position,
    setPosition,
    allPositions,
    handleSubmitPosition,
    handleDeletePosition,

    squad,
    setSquad,
    allSquads,
    handleSubmitSquad,
    handleDeleteSquad,

    supervisor,
    setSupervisor,
    allSuper,
    handleSubmitSuper,
    handleDeleteSuper
  };
}
