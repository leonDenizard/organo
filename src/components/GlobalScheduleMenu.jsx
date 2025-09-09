import ButtonFilter from "../components/ButtonFilter"
export default function GlobalScheduleMenu({ onOpenLayout }) {
  return (
    <menu>
      <nav className="flex gap-4">
        <ButtonFilter onClick={onOpenLayout} name={"Modelo de escala"}/>
        <ButtonFilter onClick={onOpenLayout} name={"Filtrar por usuário"}/>
        <ButtonFilter onClick={onOpenLayout} name={"filtra por data"}/>
      </nav>
    </menu>
  );
}
