import { useNavigate } from "react-router-dom"


export default function ProfileMenu( { logout } ) {

  const navigate = useNavigate()

  const updateProfile = () => {
    navigate("/register")
  }
  return (
    <div className="absolute top-20 -right-[60px] w-[160px] bg-card-bg z-10 rounded-xl lg:w-[180px] backdrop-blur-lg">
        <ul className="cursor-pointer flex flex-col gap-2 items-center py-4">
            <li className="w-[90%] text-center hover:bg-border-color transition duration-300 ease-in-out py-1 rounded-md" onClick={updateProfile}>Editar perfil</li>
            <li className="w-[90%] text-center hover:bg-border-color transition duration-300 ease-in-out py-1 rounded-md" onClick={logout}>Sair</li>
        </ul>
    </div>
  )
}
