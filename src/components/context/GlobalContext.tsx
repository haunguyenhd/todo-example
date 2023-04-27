import React, { ReactNode, createContext, useContext } from "react";

type taskType = {
  ticketId: string;
  task: string;
  state: boolean;
};
interface IGlobalContext {
  tickets: string[] | undefined;
  setTicket: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  listTask: taskType[] | undefined;
  setListTask: React.Dispatch<React.SetStateAction<taskType[] | undefined>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  tickets: [],
  setTicket: () => {},
  listTask: [],
  setListTask: () => {},
});
export const useGlobalContext = (): IGlobalContext => useContext(GlobalContext);

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTicket] = React.useState<string[] | undefined>(undefined);
  const [listTask, setListTask] = React.useState<taskType[] | undefined>(
    undefined
  );
  const GlobalContextData = {
    tickets,
    setTicket,
    listTask,
    setListTask,
  };
  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;
