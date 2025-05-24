function ButtonFilter({ name, color, textColor, borderColor, border, onClick}) {
  return (
    <button onClick={onClick} type="button" className="bg-card-bg font-semibold text-nowrap p-1 px-12 md:p-1 md:px-12 rounded-full lg:h-9
    hover:bg-border-color transition duration-300 ease-in-out" style={{ backgroundColor: color, color: textColor, borderColor: borderColor, border: border}}>{name}</button>
  )
}

export default ButtonFilter
