import { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContextType {
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const defaultGlobalContext: GlobalContextType = {
    value: null,
    setValue: () => {},
  };

export const GlobalContext = createContext<GlobalContextType>(defaultGlobalContext);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)

    if (!context.value && context.value !== 0) {
        throw new Error("GlobalContext must be use withing a GlobalContextProvider")
    }
    
    return context;
}

interface GlobalProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProps) => {
  const [value, setValue] = useState<number>(0);

  return (
    <GlobalContext.Provider value={{ value, setValue }}>
      {children}
    </GlobalContext.Provider>
  );
};