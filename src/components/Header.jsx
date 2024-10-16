function Header({ img, name, logout }) {
  return (
    <header className="relative w-full flex justify-end gap-6 items-center top-5">
      <span className="font-medium text-lg">Olá, {name}!</span>
      <div className="relative w-16 rounded-full border-2 border-border-color">
        <img onClick={logout} src={img} alt="profile photo" className="w-16 rounded-full"/>
      </div>
    </header>
  );
}

export default Header;
