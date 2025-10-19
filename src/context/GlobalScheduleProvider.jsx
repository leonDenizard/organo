import { createContext, useContext } from "react";
import useGlobalSchedule from "../hooks/useGlobalSchedule";

const GlobalScheduleContext = createContext();

// 🚀 Provider que encapsula todo o estado e funções do hook
export function GlobalScheduleProvider({ children }) {
  const globalSchedule = useGlobalSchedule();

  return (
    <GlobalScheduleContext.Provider value={globalSchedule}>
      {children}
    </GlobalScheduleContext.Provider>
  );
}

// 🧩 Hook para usar o contexto em qualquer componente
export function useGlobalScheduleContext() {
  const context = useContext(GlobalScheduleContext);
  if (!context) {
    throw new Error(
      "useGlobalScheduleContext deve ser usado dentro de um GlobalScheduleProvider"
    );
  }
  return context;
}
