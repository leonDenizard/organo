import { useEffect, useState } from "react";

export default function MultiDayCalendar({
  onChange,
  schedule,
  userId,
  initialDate,
  initialShiftId,
  selectedDay
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([initialShiftId?._id]);

  // Helper para formatar no padrão dia-mes-ano
  const formatDMY = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  // Gera todos os dias do mês, incluindo "espaços vazios" no início para alinhar os dias da semana
  const getDaysInMonth = (date) => {
    if (!date) return [];

    const [day, month, year] = date.split("-").map(Number); // espera 'DD-MM-YYYY'
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const totalDays = lastDay.getDate();

    const daysArray = [];

    // Preenche com nulls para os dias vazios antes do dia 1
    const emptySlots = firstDay.getDay(); // 0 = domingo
    for (let i = 0; i < emptySlots; i++) {
      daysArray.push(null);
    }

    // Adiciona os dias do mês
    for (let d = 1; d <= totalDays; d++) {
      daysArray.push(new Date(year, month - 1, d));
    }

    return daysArray;
  };

  // Alternar seleção de um dia
  const toggleDay = (day) => {
    if (!day) return; // espaço vazio

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
    if (!userShift) return console.warn("Shift não encontrado para userId:", userId);

    // adiciona ou remove o ID do shift
    const isShiftSelected = selectedShifts.includes(userShift._id);
    const newSelectedShifts = isShiftSelected
      ? selectedShifts.filter((id) => id !== userShift._id)
      : [...selectedShifts, userShift._id];

    setSelectedShifts(newSelectedShifts);

    // devolve só os IDs pro pai
    onChange && onChange(newSelectedShifts);
  };

  // Atualiza selectedDays e selectedShifts ao receber initialDate ou initialShiftId
  useEffect(() => {
    if (!initialDate) return;

    setSelectedDays([initialDate]);

    if (initialShiftId?._id) {
      setSelectedShifts([initialShiftId._id]);
    }

    // Atualiza currentDate para o mês da initialDate
    const [day, month, year] = initialDate.split("-").map(Number);
    setCurrentDate(new Date(year, month - 1, day));
  }, [initialDate, initialShiftId]);

  // Notifica o pai sempre que selectedShifts mudar
  useEffect(() => {
    if (selectedShifts.length > 0) {
      onChange && onChange(selectedShifts);
    }
  }, [selectedShifts, onChange]);

  const days = getDaysInMonth(initialDate);

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
      <div className="grid grid-cols-7 gap-1 justify-items-center">
        {days.map((day, i) => {
          if (!day)
            return <div key={i} className="w-10 h-10" />; // espaço vazio

          const dayString = formatDMY(day);
          const isSelected = selectedDays.includes(dayString);

          return (
            <button
              key={dayString}
              onClick={() => toggleDay(day)}
              className={`w-10 h-10 2xl:w-11 2xl:h-11 rounded-full transition ${
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