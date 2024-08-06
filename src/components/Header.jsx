function Header({ img, name }) {
  return (
    <header className="w-full flex justify-end gap-4">
      <span>Olá, {name}</span>
      <div>
        <img src={img} alt="" />
        img
      </div>
    </header>
  );
}

export default Header;
