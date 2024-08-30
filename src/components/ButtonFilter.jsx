function ButtonFilter({ name, color, textColor, borderColor, border }) {
  return (
    <button type="button" className="bg-card-bg font-semibold p-1 px-12 rounded-full" style={{ backgroundColor: color, color: textColor, borderColor: borderColor, border: border}}>{name}</button>
  )
}

export default ButtonFilter
