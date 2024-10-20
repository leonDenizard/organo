export default function LegendSchedule() {
  return (
    <div className="relative flex justify-between top-16">
      <div className="flex gap-4 items-center">
        <div className="border border-border-color w-8 h-8 bg-day-worked-week rounded-md"></div>
        <h3 className="text-sm font-popp tracking-wider">Trabalhando</h3>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border border-border-color w-8 h-8 bg-weekend rounded-md"></div>
        <h3 className="text-sm font-popp tracking-wider">Trabalhando no final de semana</h3>
      </div>
      <div className="flex gap-4 items-center">
        <div className="border-2 border-border-color w-8 h-8 rounded-md"></div>
        <h3 className="text-sm font-popp tracking-wider">Folga 🎉</h3>
      </div>
      
    </div>
  );
}
