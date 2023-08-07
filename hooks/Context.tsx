import { createContext, useContext } from 'react';

export type GlobalContent = {
  selectedKey: string;
  setSelectedKey: (c: string) => void;
};

export const Context = createContext<GlobalContent>({
  selectedKey: '1',
  setSelectedKey: () => {},
});

export const useGlobalContext = () => useContext(Context);
