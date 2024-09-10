function ButtonFilter({ name, color, textColor, borderColor, border, onClick}) {
  return (
    <button onClick={onClick} type="button" className="bg-card-bg font-semibold p-1 px-12 rounded-full
    hover:bg-border-color transition duration-300 ease-in-out" style={{ backgroundColor: color, color: textColor, borderColor: borderColor, border: border}}>{name}</button>
  )
}

export default ButtonFilter
