import ButtonFilter from "./ButtonFilter";

export default function FilterBar({
  orderByName,
  orderByRole,
  orderByManager,
  orderByTime,
  handleSchedule,
}) {
  return (
    <div className="relative top-14">
      <div
        className="relative flex w-full xl:justify-center gap-10 overflow-x-scroll md:overflow-x-auto
        
        items-center"
      >
        <p
          className="
          text-nowrap
          lg:font-bold lg:text-xl lg:tracking-wide"
        >
          Filtrar por:
        </p>

        <ButtonFilter name={"A-Z"} onClick={orderByName} />
        <ButtonFilter name={"Cargo"} onClick={orderByRole} />
        <ButtonFilter name={"Horário"} onClick={orderByTime} />
        <ButtonFilter name={"Gestor"} onClick={orderByManager} />
        <ButtonFilter
          name={"Escala"}
          onClick={handleSchedule}
          color={"rgba(4, 33, 150, 0.3)"}
          textColor={"rgba(255, 255, 255, 1)"}
          borderColor={"#193296"}
          border={"1px solid rgba(0, 51, 255, 1)"}
        />
      </div>
      <div className="
      absolute pointer-events-none right-0 top-0 h-full w-16 
      bg-gradient-to-l from-backgound to-transparent
      lg:hidden"></div>
    </div>
  );
}
