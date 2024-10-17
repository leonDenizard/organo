import { useState } from "react";
import ProfileMenu from "./ProfileMenu";

function Header({ img, name, logout }) {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  };

  return (
    <header className="relative w-full flex justify-end gap-6 items-center top-5">
      <span className="font-medium text-lg">Olá, {name}!</span>
      <div className="relative w-16 rounded-full border-2 border-border-color">
        <img
          src={img}
          onClick={toggleMenu}
          alt="profile photo"
          className="relative w-16 rounded-full cursor-pointer"
        />
        {openMenu && <ProfileMenu logout={logout} />}
      </div>

      
    </header>
  );
}

export default Header;
