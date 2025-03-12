import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultModalContext: ModalContextType = {
  state: false,
  setState: () => null,
};

export const ModalContext =
  createContext<ModalContextType>(defaultModalContext);

interface ModalProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProps) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ state, setState }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalContext must be use withing a ModalContextProvider");
  }

  return context;
};
