import ButtonFilter from "../components/ButtonFilter"
export default function GlobalScheduleMenu({ onOpenLayout, onOpenUser }) {
  return (
    <menu>
      <nav className="flex gap-4">
        <ButtonFilter onClick={onOpenLayout} name={"Modelo de escala"}/>
        <ButtonFilter onClick={onOpenUser} name={"Filtrar por usuário"}/>
        <ButtonFilter onClick={onOpenLayout} name={"filtra por data"}/>
      </nav>
    </menu>
  );
}
