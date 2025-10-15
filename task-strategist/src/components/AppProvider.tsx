"use client";

import { useEffect, useState } from 'react';
import { AppContext } from '@/lib/AppContext';
import { AppState } from '@/lib/types';

const initialAppState: AppState = {
  tasks: [],
  weeklyObjective: null,
  messages: [],
  learnedTaskPatterns: {},
  conversationState: null,
};

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState<AppState>(initialAppState);

  useEffect(() => {
    const savedState = localStorage.getItem('taskStrategistState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // Ensure conversationState is reset on load
      parsedState.conversationState = null;
      setAppState(parsedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskStrategistState', JSON.stringify(appState));
  }, [appState]);

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}
