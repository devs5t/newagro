import React, {ReactNode, useState} from 'react';

type ModalContextType = {
  modal?: {
    title?: string,
    component?: any
  };
  setModal: (modal: any) => void;
};

const ModalContext = React.createContext<ModalContextType>({
  modal: undefined,
  setModal: () => {}
} as ModalContextType);

interface PriceContextProviderProps {
  children: ReactNode;
}

const ModalProvider = ({ children }: PriceContextProviderProps) => {
  const [modal, setModal] = useState<undefined | any>();

  return (
    <ModalContext.Provider value={{modal, setModal}}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
