export default function GlobalScheduleMenu({onOpenLayout}) {
  return (
   <menu>
        <nav className="flex gap-4">
          <button onClick={onOpenLayout}>Modelo de escala</button>
          <button>Filtrar por usuário</button>
          <button>filtra por data</button>
        </nav>
    </menu>
  )
}
