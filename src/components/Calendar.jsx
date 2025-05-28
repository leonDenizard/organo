import { useState, useEffect, useTransition } from "react";
import LegendSchedule from "./LegendSchedule";

const Calendar = ({ workedDays, onDayClick, loadindDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [isPending, startTransition] = useTransition()

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

  useEffect(() => {});

  

  return (
    <div className="calendar-container relative m-auto lg:w-4/5 flex flex-col items-center justify-start top-12">
      <div className="relative">
        <div className="calendar-header flex gap-2">        
          <h2 className="text-6xl font-bold">
            {new Date().toLocaleString("default", { month: "2-digit" })} /{" "}
            {new Date().getFullYear()}
          </h2>
        </div>

        <div className="calendar-body relative top-8">
          <div className="calendar-weekdays grid grid-cols-7">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
              <div key={index} className="weekday text-2xl flex items-center justify-center p-2 text-white">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days grid grid-cols-7 border border-border-color relative top-4">
            {daysInMonth.map((day, index) => {
              const isWeekend = index % 7 === 5 || index % 7 === 6;
              const isWorked = workedDays.includes(day);
              const isLoading = loadindDay === day && day !== null
              //;
              

              return (
                <div
                  key={index}
                  className={`day ${day ? "" : "empty"} 
                    ${isWorked ? "bg-day-worked-week hover:bg-backgound transition-all duration-300" : ""}
                    ${isWorked && isWeekend ? "bg-weekend hover:bg-backgound transition-all duration-300" : ""}
                    relative
                    border border-border-color flex justify-center items-center
                    min-w-11 min-h-12 p-4 px-6 text-xl font-bold cursor-pointer
                    md:px-10 md:p-6 md:text-2xl
                    lg:p-6 lg:px-10 lg:text-3xl 
                     `}
                  onClick={() => {
                    startTransition(() => {
                      onDayClick(day)
                    })
                  }}
                >
                  {isLoading ? 
                    (
                      <div className="absolute w-10 h-10 border-4 border-t-blue-400 border-gray-300 rounded-full animate-spin"></div>
                    ) : 
                    
                    (day)
                  }
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <LegendSchedule/>

      {/* <ButtonsSendSchedule/> */}
    </div>
  );
};

export default Calendar;
