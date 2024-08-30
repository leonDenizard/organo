import ButtonFilter from "./ButtonFilter";

export default function FilterBar() {
  return (
    <div className="flex justify-center gap-10 relative top-14 ">
        <h4 className="font-bold text-xl tracking-wide">Filtrar por:</h4>
        <ButtonFilter name={"A-Z"}/>
        <ButtonFilter name={"Cargo"}/>
        <ButtonFilter name={"Horário"}/>
        <ButtonFilter name={"Gestor"}/>
        <ButtonFilter name={"Escala"} color={"rgba(4, 33, 150, 0.3)"} textColor={"rgba(255, 255, 255, 1)"} borderColor={"#193296"} border={"1px solid rgba(0, 51, 255, 1)"}/>
    </div>
  )
}
