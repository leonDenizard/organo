export default function LegendSchedule() {
  return (
    <div className="relative flex justify-between top-16 bg-card-bg p-3 px-6 rounded-full border-2 border-border-color">
      <div className="flex gap-4 items-center">
        <div className="border border-border-color w-10 h-10 bg-day-worked-week rounded-md"></div>
        <h3 className="text-sm font-popp tracking-wider">Trabalhando</h3>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border border-border-color w-10 h-10 bg-weekend rounded-md"></div>
        <h3 className="text-sm font-popp tracking-wider">Trabalhando no final de semana</h3>
      </div>
      <div className="flex gap-4 items-center">
        <div className="bg-backgound border-2 border-border-color w-10 h-10 rounded-md"></div>
        <h3 className="text-sm font-popp tracking-wider">Folga 🎉</h3>
      </div>
      
    </div>
  );
}
