export default function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed w-11/12 lg:w-2/5 m-auto h-1/3 top-0 left-0 right-0 bottom-0 
      backdrop-blur-2xl z-10 bg-modal-color 
      flex flex-col justify-center items-center border rounded-lg border-border-color">
      <h2 className="text-xl font-semibold mb-8">Tem certeza que deseja excluir a escala? ❌</h2>
      
      <div className="flex gap-6">
        <button
          onClick={onConfirm}
          className="bg-secundary-color font-semibold text-lg p-2 px-8 rounded-md
           hover:bg-border-color transition duration-300 ease-in-out border-2 border-border-color"
        >
          Sim
        </button>

        <button
          onClick={onCancel}
          className="bg-bubble-red font-semibold text-lg p-2 px-8 rounded-md
           hover:bg-bubble-red/80 transition duration-300 ease-in-out border-2 border-black/10"
        >
          Não
        </button>
      </div>
    </div>
  );
}
