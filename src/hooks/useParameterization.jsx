import { useEffect, useState } from "react";
import { createPosition, deletePositionById, getAllPosition } from "../services/parameterizationService";

export default function useParameterization() {
  const [position, setPosition] = useState("");
  const [allPositions, setAllPositions] = useState([])

  //Handler submit

  const handleSubmitPosition = async () => {
    if (!position.trim()) return;

    await createPosition(position);
    setPosition("");
    fetchPosition()
  };

  const handleDeletePosition = async (id) => {
    await deletePositionById(id)
    fetchPosition()
  }

  const fetchPosition = async () => {
    const data = await getAllPosition()
    // console.log(data.AllPosition[0]._id)
    setAllPositions(data.AllPosition)
  }

  useEffect(() => {
    fetchPosition()
  }, [])

  return {
    position,
    setPosition,
    allPositions,
    fetchPosition,
    handleSubmitPosition,
    handleDeletePosition
  };
}
