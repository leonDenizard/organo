import { useState, useEffect } from "react";
import ButtonsSendSchedule from "./ButtonsSendSchedule";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);


  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Função para obter o número de dias no mês
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };

    // Função para obter o primeiro dia do mês, ajustando para Segunda-feira como primeiro dia
    const getFirstDayOfMonth = (year, month) => {
      const day = new Date(year, month, 1).getDay();
      return day === 0 ? 6 : day - 1; // Ajustar: Domingo (0) vira 6 e os outros dias são decrementados em 1
    };

    // Gerar os dias do mês
    const days = [];
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Adicionar os dias "vazios" antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Adicionar os dias reais do mês
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    setDaysInMonth(days);
  }, [currentDate]);

  // Mudar mês
  const changeMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + direction))
    );
  };

  return (
    <div className="calendar-container relative m-auto w-4/5 h-screen flex flex-col items-center justify-center border border-border-color">
      <div className="calendar-header flex gap-2">
        <button onClick={() => changeMonth(-1)}>Anterior</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} /{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>Próximo</button>
      </div>

      <div className="calendar-body border border-border-color">
        <div className="calendar-weekdays grid grid-cols-7 border border-border-color">
          {[
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
            "Domingo",
          ].map((day, index) => (
            <div key={index} className="weekday">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-days grid grid-cols-7 border border-border-color">
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`day ${day ? "" : "empty"} border border-border-color`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <ButtonsSendSchedule/>
    </div>
  );
};

export default Calendar;
