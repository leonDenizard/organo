import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MultiDayCalendar({ onChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);

  // Função para navegar entre meses
  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  // Função para pegar os dias do mês
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    return [...Array(days).keys()].map((d) => new Date(year, month, d + 1));
  };

  // Helper para formatar no padrão dia-mes-ano
  const formatDMY = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  // Alternar seleção de um dia
  const toggleDay = (day) => {
    const dayString = formatDMY(day);
    let newSelected;

    if (selectedDays.includes(dayString)) {
      newSelected = selectedDays.filter((d) => d !== dayString);
    } else {
      newSelected = [...selectedDays, dayString];
    }

    setSelectedDays(newSelected);
    onChange && onChange(newSelected); // envia para o pai
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-4 bg-card-bg text-white rounded-xl shadow-xl w-full">
      {/* Header do calendário */}
      <div className="flex justify-center items-center mb-4">
        
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
        </h2>
        
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 text-center font-medium mb-2">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => {
          const dayString = formatDMY(day);
          const isSelected = selectedDays.includes(dayString);

          return (
            <button
              key={dayString}
              onClick={() => toggleDay(day)}
              className={` w-8 h-8 2xl:w-11 2xl:h-11 rounded-full transition ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "hover:bg-border-color text-gray-300"
              }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
