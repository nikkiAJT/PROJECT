"use client";

import { useContext } from 'react';
import { AppContext } from '@/lib/AppContext';
import { Task } from '@/lib/types';

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Priority: {task.priority}</h6>
        {task.subTasks.length > 0 && (
          <div>
            <strong>Sub-tasks:</strong>
            <ul>
              {task.subTasks.map(st => <li key={st.id}>{st.title}</li>)}
            </ul>
          </div>
        )}
        {task.recurring && <p className="card-text"><small className="text-muted">Recurring: {task.recurring}</small></p>}
      </div>
    </div>
  );
}

export default function TaskList() {
  const context = useContext(AppContext);

  if (!context) return <p>Loading...</p>;

  const { appState } = context;

  return (
    <div className="p-3">
      <div className="mb-4 p-3 bg-light rounded">
        <h4>Weekly Objective: {appState.weeklyObjective?.title}</h4>
        <ul className="mb-0">
          {appState.weeklyObjective?.keyResults.map((kr, i) => <li key={i}>{kr}</li>)}
        </ul>
      </div>
      
      <h4>Tasks</h4>
      {appState.tasks.filter(t => !t.completed).length === 0 && <p>No tasks yet. Add one in the chat!</p>}
      {appState.tasks.filter(t => !t.completed).map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
