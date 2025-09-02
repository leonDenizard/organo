import { useEffect, useState } from "react";

export default function GlobalSchedule() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [dateHeader, setDateHeader] = useState("");
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    const getSchedule = await fetch(`${API_URL}/global-schedule`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    const response = await getSchedule.json();
    const data = response.data;

    // 🔹 Ordenando os objetos pelo campo `date`
    const sortedSchedule = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("-").map(Number);
      const [dayB, monthB, yearB] = b.date.split("-").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      return dateA - dateB;
    });

    // 🔹 Pegando o primeiro item já ordenado pra header
    if (sortedSchedule.length > 0) {
      const [day, month, year] = sortedSchedule[0].date.split("-");
      setDateHeader(`${month}/${year}`);
    }

    setSchedule(sortedSchedule);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div>
      <h1>{dateHeader}</h1>
      <div className="grid grid-cols-5 gap-3">

        {schedule.map((d) => {
          const [day, month] = d.date.split("-");
          return (
            <div className="text-center text-lg border border-border-color" key={d._id}>
              <div className="font-bold bg-card-bg border border-border-color">{`${day}/${month}`}</div>
              <div className="text-sm bg-card-bg border border-border-color">
                {d.dayOfWeek}
              </div>

              {/* Aqui iteramos sobre os shifts */}
              <div className="flex flex-col">
                {d.shifts.map((shift) => (
                  <div key={shift._id} className="border border-border-color"
                  style={{ backgroundColor: shift.status.color }}>
                    {console.log(shift.status.color)}
                    {/* Foto do usuário */}
                    <div className="flex gap-2 justify-center items-center">
                      <img
                        src={shift.userId.photoUrl}
                        alt={shift.userId.name}
                        className="w-4 h-4 rounded-full"
                      />
                      {/* Nome do usuário */}
                      <div className="">{shift.userId.name}</div>
                    </div>

                    {/* Status do usuário */}
                    <div
                      className="text-sm px-1 rounded text-gray-400"
                      style={{ backgroundColor: shift.status.color }}
                    >
                      {shift.status.name} {/* ou shift.status.description */}
                    </div>
                    {/* Horário */}
                    <div className="text-sm">
                      {shift.time.startTime} - {shift.time.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
