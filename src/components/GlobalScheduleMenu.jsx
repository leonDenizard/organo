import { LayoutGrid, ListFilter, Trash } from "lucide-react";
import ButtonFilter from "../components/ButtonFilter"
import { useAuth } from "../context/AuthProvider";
export default function GlobalScheduleMenu({ onOpenLayout, onOpenModalUser, onOpenModalDeleteUser }) {
  
  const {isAdmin} = useAuth()
  return (
    <menu>
      <nav className="flex gap-4">
        <ButtonFilter onClick={onOpenLayout} name={"Modelo de escala"} icon={<LayoutGrid/>}/>
        <ButtonFilter onClick={onOpenModalUser} name={"Filtrar por usuário"} icon={<ListFilter />}/>
        {isAdmin && (<ButtonFilter onClick={onOpenModalDeleteUser} name={"Deletar usuário da escala"} icon={<Trash />}/>)}
      </nav>
    </menu>
  );
}
