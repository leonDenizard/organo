import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function MonthSelector({ onChange }) {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setOpen(!open);

  const handleSelect = (index) => {
    setSelectedMonth(index);
    setOpen(false);
    onChange?.(index + 1);
  };

  // console.log(new Date().getMonth())
  // console.log(currentMonthIndex)
  // Fechar dropdown clicando fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className=" w-72" ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className="w-full p-2 flex justify-between items-center rounded bg-card-bg text-white hover:bg-black/45"
      >
        {months[selectedMonth]}
        <ChevronDown size={18} />
      </button>

       {open && (
        <ul className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded bg-card-bg text-white scrollbar">
          {months
            .map((monthName, index) => ({ monthName, index }))
            .filter(({ index }) => index >= currentMonthIndex) // filtra meses menores que o atual
            .map(({ monthName, index }) => (
              <li
                key={index}
                onClick={() => handleSelect(index)}
                className="cursor-pointer px-3 py-2 hover:bg-black/45"
              >
                {monthName}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
