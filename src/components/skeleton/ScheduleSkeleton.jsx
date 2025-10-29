import { Skeleton } from "../ui/skeleton";

export function ScheduleSkeleton() {
  return (
    <div className="relative flex flex-col gap-6 w-[90%] m-auto top-5 overflow-hidden p-4 bg-card-bg rounded-md">
      {/* Data do mês */}
      <div className="flex flex-col gap-2">
        <div className="relative w-[270px] overflow-hidden">
          <Skeleton className="h-[60px] w-full overflow-hidden" />
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-backgound to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      {/* Dias da semana */}
      <div className="flex gap-4 overflow-hidden">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="relative overflow-hidden">
            <Skeleton className="w-32 h-8 overflow-hidden" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-backgound to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>

      {/* Quadradinhos do calendário (31 dias) */}
      <div className="grid grid-cols-7 gap-2 mt-4">
        {[...Array(31)].map((_, i) => (
          <div
            key={i}
            className="relative w-32 h-16 overflow-hidden rounded-md"
          >
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-backgound to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>

      {/* Rodapé com botões */}
      <div className="relative flex gap-4 mt-6 overflow-hidden justify-center">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative overflow-hidden">
            <Skeleton className="w-32 h-10 rounded-md" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-backgound to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    </div>
  );
}
