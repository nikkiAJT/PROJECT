"use client";

import { useContext, useState } from 'react';
import { AppContext } from '@/lib/AppContext';
import { processTaskMessage } from '@/lib/taskAssistant';

export default function TaskChat() {
  const context = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');

  if (!context) return null;

  const { appState, setAppState } = context;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newState = processTaskMessage(inputValue, appState);
    setAppState(newState);
    setInputValue('');
  };

  return (
    <div className="d-flex flex-column h-100 border-start">
      <div className="flex-grow-1 p-3 overflow-auto">
        {appState.messages.map(msg => (
          <div key={msg.id} className={`mb-2 ${msg.sender === 'ai' ? 'text-start' : 'text-end'}`}>
            <span className={`d-inline-block p-2 rounded ${msg.sender === 'ai' ? 'bg-light' : 'bg-primary text-white'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-3 border-top">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="e.g., Add task: Draft the report" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}