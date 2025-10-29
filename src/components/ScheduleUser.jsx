import { useEffect, useMemo, useState } from "react";
import { useGlobalScheduleContext } from "../context/GlobalScheduleProvider";

export default function ScheduleUser({ id }) {
  const { handleGetScheduleById, scheduleUserById } =
    useGlobalScheduleContext();
  const [scheduleUser, setScheduleUser] = useState([]);
  const dayInWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

  useEffect(() => {
    if (id) {
      setScheduleUser([]);

      handleGetScheduleById(id);
    }
  }, [id]);

  useEffect(() => {
    if (scheduleUserById?.length > 0) {
      setScheduleUser(scheduleUserById);
    } else {
      // zera também o estado local se o contexto vier vazio
      setScheduleUser([]);
    }
  }, [scheduleUserById]);

  const monthFormatted = useMemo(() => {
    const month = scheduleUser?.[0]?.date?.slice(3, 11);
    return month ? month.replace("-", "/") : "";
  }, [scheduleUser]);

  // Gera a matriz do mês, agora com status e horários
  function generateMonthMatrix(scheduleUser, dayInWeek) {
    const monthMatrix = [];
    let currentWeek = Array(7).fill(null);

    scheduleUser.forEach((item) => {
      const shortDay = item.dayOfWeek.slice(0, 3);
      const index = dayInWeek.findIndex((d) => d === shortDay);
      const day = item.date.slice(0, 2);

      const shift = item.shifts?.[0]; // pega o primeiro turno (se houver)
      const color = shift?.status?.color || null;
      const statusName = shift?.status?.description || "";
      const startTime = shift?.time?.startTime || "";
      const endTime = shift?.time?.endTime || "";

      if (index !== -1) {
        currentWeek[index] = {
          day,
          color,
          statusName,
          startTime,
          endTime,
        };
      }

      if (index === 6) {
        monthMatrix.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    });

    if (currentWeek.some((d) => d !== null)) {
      monthMatrix.push(currentWeek);
    }

    return monthMatrix;
  }

  const monthMatrix = generateMonthMatrix(scheduleUser, dayInWeek);

  // Gera legenda automática (sem duplicar cores)
  const uniqueLegends = Array.from(
    new Map(
      scheduleUser
        .flatMap((item) => item.shifts)
        .map((shift) => [shift.status.description, shift.status.color])
    )
  );

  return (
    <div className="relative top-20 m-auto w-[calc(90%+1.5rem)]">
      {scheduleUser.length > 0 && (
        <div className="p-4">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-20">
            {monthFormatted}
          </h2>

          {/* Cabeçalho dos dias da semana */}
          <div className="grid grid-cols-7">
            {dayInWeek.map((day) => (
              <div
                key={day}
                className=" text-xs font-bold md:text-xl text-center mb-7"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Corpo do calendário */}
          {monthMatrix.map((week, i) => (
            <div key={i} className="relative grid grid-cols-7 shadow-xl">
              {week.map((cell, j) => (
                <div
                  key={j}
                  className={`
                    border-t-2 border-l-2 border-border-color
                    ${i === monthMatrix.length - 1 ? "border-b-2" : ""}
                    ${j === 6 ? "border-r-2" : ""}
                    text-center flex flex-col items-center justify-center text-sm
                    h-24 md:h-20 2xl:h-24
                    group hover:brightness-125 transition relative hover:z-10`}
                  style={{
                    backgroundColor: cell?.color || "transparent",
                  }}
                >
                  {cell && (
                    <>
                      <div className="font-bold md:text-xl 2xl:text-2xl">
                        {cell.day}
                      </div>
                      {cell.startTime && cell.endTime && (
                        <div
                          className="text-xs md:absolute md:bottom-1 md:left-1/2 md:-translate-x-1/2
                        md:opacity-0 md:scale-95 md:group-hover:opacity-100 md:group-hover:scale-100
                        md:transition-all md:duration-300 text-white/60 2xl:text-sm"
                        >
                          {cell.startTime} - {cell.endTime}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Legenda */}
          <div className="relative mt-16 m-auto  flex flex-col gap-6 mb-5 p-6 rounded-md shadow-xl  border-border-color">
            <div className="flex gap-3 flex-col md:flex-row  flex-wrap md:justify-around lg:justify-between">
              <h3 className=" w-full md:w-auto text-lg font-semibold">Legenda</h3>
              {uniqueLegends.map(([name, color], idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-2 py-1 rounded mt-4 md:mt-0"
                >
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
