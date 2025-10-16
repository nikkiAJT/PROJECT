import { createContext, Dispatch, SetStateAction } from 'react';
import { AppState } from './types';

interface AppContextType {
  appState: AppState;
  setAppState: Dispatch<SetStateAction<AppState>>;
  clearAll: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
