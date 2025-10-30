import { uploadScheduleToBD } from "../services/schedule";
import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeletedModal";
import { Trash, Upload } from "lucide-react";
import toast from "react-hot-toast";
import PopUpSendGlobalSchedule from "./PopUpSendGlobalSchedule";
import { useGlobalScheduleContext } from "../context/GlobalScheduleProvider";

export default function ButtonsSendGlobalSchedule({ allUsers, closeModal }) {
  const [file, setFile] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { handleDeleteSchedule } = useGlobalScheduleContext();

  const handleScheduleJson = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
    } else {

      setFile(null);
    }

    e.target.value = null;
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Nenhum arquivo encontrado!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        //converte o arquivo em objeto JS
        const jsonData = JSON.parse(event.target.result);

        await uploadScheduleToBD(jsonData);
        toast.success("Escalda inserida com sucesso!");
      } catch (error) {
        toast.error("Erro ao processar o arquivo JSON");
      }
    };
    reader.readAsText(file);
    setFile(null);
  };

  return (
    <div
      className="
      relative grid grid-cols-1 gap-3 p-3 top-32
      md:flex md:justify-center
      "
    >

      
      <button
        className="flex gap-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 transition-colors text-white rounded md:ml-2 font-semibold"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <Upload />
        Criar a escala
      </button>

      <button
        className="px-4 py-2 flex gap-1 bg-bubble-red hover:bg-bubble-red/80 transition-colors text-white rounded md:ml-2 font-semibold row-span-1"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <Trash
          className="stroke-white group-hover:stroke-red-300 transition-colors duration-200"
          size={20}
          strokeWidth={2}
        />{" "}
        Deletar Escala
      </button>
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          onConfirm={async () => {
            await handleDeleteSchedule();
            setIsDeleteModalOpen(false);
            closeModal && closeModal(); // fecha o modal pai, se houver
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
          text={"Tem certeza que deseja excluir a escala?"}
        />
      )}

      {isCreateModalOpen && (
        <PopUpSendGlobalSchedule
          allUsers={allUsers}
          closeModal={() => {
            setIsCreateModalOpen(false);
            closeModal && closeModal(); // garante fechamento total
          }}
        />
      )}
    </div>
  );
}
