"use client";

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/lib/AppContext';

export default function HomePage() {
  const context = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (context) {
      if (context.appState.weeklyObjective) {
        router.replace('/tasks');
      } else {
        router.replace('/strategy');
      }
    }
  }, [context, router]);

  // Render a loading state while redirecting
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}