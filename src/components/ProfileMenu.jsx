

export default function ProfileMenu( { logout } ) {
  return (
    <div className="absolute top-20 -right-[60px] w-[160px] bg-card-bg z-10 rounded-xl lg:w-[180px] backdrop-blur-lg">
        <ul className="cursor-pointer flex flex-col gap-2 items-center py-4">
            <li className="w-[90%] text-center hover:bg-border-color transition duration-300 ease-in-out py-1 rounded-md">Editar perfil</li>
            <li className="w-[90%] text-center hover:bg-border-color transition duration-300 ease-in-out py-1 rounded-md" onClick={logout}>Sair</li>
        </ul>
    </div>
  )
}
