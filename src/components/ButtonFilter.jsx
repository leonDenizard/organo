function ButtonFilter({
  name,
  color,
  textColor,
  borderColor,
  border,
  onClick,
  icon
}) {
  return (
    <>
      <div>
        
        <button
          onClick={onClick}
          type="button"
          className="flex justify-center items-center gap-2 bg-card-bg font-semibold text-nowrap p-2 px-12 md:p-1 md:px-12 rounded-full lg:h-9
    hover:bg-border-color transition duration-300 ease-in-out text-white/60 hover:text-white"
          style={{
            backgroundColor: color,
            color: textColor,
            borderColor: borderColor,
            border: border,
          }}
        >
          <span>{icon}</span>
          {name}
        </button>
      </div>
    </>
  );
}

export default ButtonFilter;
