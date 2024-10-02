export default function PopUpMenu({ roles, onSelectRole, closeModal }) {
  return (
    <div className="fixed w-2/3 m-auto h-4/5 top-0 left-0 right-0 bottom-0 backdrop-blur-3xl z-10 bg-modal-color flex flex-col justify-center items-center border rounded-lg border-border-color">
      <ul className="flex flex-col gap-4">
        {roles.map((role, index) => (
          <li key={index}>
            <button
              onClick={() => onSelectRole(role)}
              className="bg-secundary-color font-semibold text-xl p-1 px-12 rounded-md
               hover:bg-border-color transition duration-300 ease-in-out w-48 border-2 border-border-color"
            >
              {role.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={closeModal}
        className="absolute top-0 right-3 mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Fechar
      </button>
    </div>
  );
}
