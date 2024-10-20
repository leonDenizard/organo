import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

function Header({ img, name, logout }) {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  };

  return (
    <header className="relative w-full flex justify-end gap-6 items-center lg:top-5 top-2">
      <span className="font-bold text-xl">Olá, {name}!</span>
      <div className="relative w-16 h-16 rounded-full border-2 border-border-color overflow-hidden">
        <img
          src={img}
          onClick={toggleMenu}
          alt="profile photo"
          className="relative w-16 h-16 rounded-full object-cover cursor-pointer"
        />
      </div>
        {openMenu && <ProfileMenu logout={logout} />}

      
    </header>
  );
}

export default Header;
