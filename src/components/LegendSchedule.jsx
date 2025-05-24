export default function LegendSchedule() {
  return (
    <div className="
      relative flex flex-col justify-center gap-3 md:flex md:flex-row md:justify-center  
      w-[100%] md:text-nowrap lg:w-[88%] 2xl:w-[60%]
      p-3 rounded-lg
      top-16 bg-card-bg  md:rounded-full border-2 border-border-color">
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
