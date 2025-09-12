import ButtonFilter from "../components/ButtonFilter"
export default function GlobalScheduleMenu({ onOpenLayout, onOpenModalUser }) {
  return (
    <menu>
      <nav className="flex gap-4">
        <ButtonFilter onClick={onOpenLayout} name={"Modelo de escala"}/>
        <ButtonFilter onClick={onOpenModalUser} name={"Filtrar por usuário"}/>
        <ButtonFilter onClick={onOpenLayout} name={"filtra por data"}/>
      </nav>
    </menu>
  );
}
