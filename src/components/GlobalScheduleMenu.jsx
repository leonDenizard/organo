import ButtonFilter from "../components/ButtonFilter"
import { useAuth } from "../context/AuthProvider";
export default function GlobalScheduleMenu({ onOpenLayout, onOpenModalUser, onOpenModalDeleteUser }) {
  
  const {isAdmin} = useAuth()
  return (
    <menu>
      <nav className="flex gap-4">
        <ButtonFilter onClick={onOpenLayout} name={"Modelo de escala"}/>
        <ButtonFilter onClick={onOpenModalUser} name={"Filtrar por usuário"}/>
        {isAdmin && (<ButtonFilter onClick={onOpenModalDeleteUser} name={"Deletar usuário da escala"}/>)}
      </nav>
    </menu>
  );
}
