import ButtonFilter from "../components/ButtonFilter"
export default function GlobalScheduleMenu({ onOpenLayout, onOpenModalUser, onOpenModalDeleteUser }) {
  return (
    <menu>
      <nav className="flex gap-4">
        <ButtonFilter onClick={onOpenLayout} name={"Modelo de escala"}/>
        <ButtonFilter onClick={onOpenModalUser} name={"Filtrar por usuário"}/>
        <ButtonFilter onClick={onOpenModalDeleteUser} name={"Deletar usuário da escala"}/>
      </nav>
    </menu>
  );
}
