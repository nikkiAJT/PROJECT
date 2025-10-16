"use client";

import { useContext } from 'react';
import { AppContext } from '@/lib/AppContext';
import TaskChat from "@/components/TaskChat";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  const context = useContext(AppContext);

  const handleClear = () => {
    if (context) {
      context.clearAll();
    }
  };

  return (
    <main className="container-fluid vh-100 d-flex flex-column">
      <header className="row bg-light border-bottom">
        <div className="col d-flex justify-content-between align-items-center">
          <h1 className="p-3 mb-0">This Week&apos;s Tasks</h1>
          <div>
            <a href="/strategy" className="btn btn-secondary me-3">Edit Strategy</a>
            <button className="btn btn-danger me-3" onClick={handleClear}>Clear All</button>
          </div>
        </div>
      </header>
      <div className="row flex-grow-1" style={{ minHeight: 0 }}>
        <div className="col-md-7 overflow-auto">
          <TaskList />
        </div>
        <div className="col-md-5 h-100">
          <TaskChat />
        </div>
      </div>
    </main>
  );
}