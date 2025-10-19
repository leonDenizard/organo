import { useEffect, useState } from "react";

export default function MultiDayCalendar({ onChange, schedule, userId, initialDate, initialShiftId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([initialShiftId?._id]);



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

  // console.log("Dados carregados via prop", schedule)
  // console.log("Dados carregados via prop", userId)

  // Alternar seleção de um dia
  const toggleDay = (day) => {
    const dayString = formatDMY(day);

    // alterna seleção de dias
    const isSelected = selectedDays.includes(dayString);
    const newSelectedDays = isSelected
      ? selectedDays.filter((d) => d !== dayString)
      : [...selectedDays, dayString];

    setSelectedDays(newSelectedDays);

    // encontra o shift do usuário naquele dia
    const selectedDate = schedule.find((s) => s.date === dayString);
    if (!selectedDate) return console.warn("Data não encontrada:", dayString);

    const userShift = selectedDate.shifts.find(
      (shift) => String(shift.userId?._id) === String(userId)
    );
    if (!userShift)
      return console.warn("Shift não encontrado para userId:", userId);

    // adiciona ou remove o ID do shift
    const isShiftSelected = selectedShifts.includes(userShift._id);
    const newSelectedShifts = isShiftSelected
      ? selectedShifts.filter((id) => id !== userShift._id)
      : [...selectedShifts, userShift._id];

    setSelectedShifts(newSelectedShifts);

    // devolve só os IDs pro pai
    onChange && onChange(newSelectedShifts);

    //console.log("IDs selecionados:", newSelectedShifts);
  };

  const days = getDaysInMonth(currentDate);

  useEffect(() => {
  if (!initialDate) return;

  const dayString = initialDate;
  setSelectedDays([dayString]);

  if (initialShiftId?._id) {
    setSelectedShifts([initialShiftId._id]); // inicializa o shift
  }
}, [initialDate, initialShiftId]);

// 🔹 Aqui garantimos que o pai seja notificado sempre que selectedShifts mudar
useEffect(() => {
  if (selectedShifts.length > 0) {
    onChange && onChange(selectedShifts);
  }
}, [selectedShifts, onChange]);

  return (
    <div className="p-4 bg-card-bg text-white rounded-xl shadow-xl w-full">
      {/* Header do calendário */}
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
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
