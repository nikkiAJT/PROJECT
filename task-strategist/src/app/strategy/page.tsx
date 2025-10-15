"use client";

import { useContext, useState, useEffect } from 'react';
import { AppContext } from '@/lib/AppContext';
import { Message, WeeklyObjective } from '@/lib/types';

// Define the steps of the conversation
type ConversationStep = 'AWAITING_OBJECTIVE' | 'AWAITING_KEY_RESULTS' | 'COMPLETED';

function StrategyChat() {
  const context = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<ConversationStep>('AWAITING_OBJECTIVE');

  // Effect to start the conversation
  useEffect(() => {
    if (context && context.appState.messages.length === 0) {
      const initialMessage: Message = {
        id: 'init',
        sender: 'ai',
        text: "Let's start by defining your main objective for this week. What is the single most important thing you want to achieve?",
      };
      context.setAppState(prevState => ({ ...prevState, messages: [initialMessage] }));
    }
  }, [context]);

  // Effect to handle redirection when the process is complete
  useEffect(() => {
    if (step === 'COMPLETED') {
      const redirectMessage: Message = {
        id: 'redirect',
        sender: 'ai',
        text: "Great! Your weekly strategy is set. Redirecting you to the task board...",
      };
      context?.setAppState(prevState => ({ ...prevState, messages: [...prevState.messages, redirectMessage] }));
      
      setTimeout(() => {
        window.location.href = '/tasks'; // Using a direct browser redirect for reliability
      }, 2000);
    }
  }, [step, context]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !context) return;

    const { appState, setAppState } = context;
    const userMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    const newMessages = [...appState.messages, userMessage];
    let aiResponse: Message | null = null;

    if (step === 'AWAITING_OBJECTIVE') {
      // User has provided the objective title
      const newObjective: WeeklyObjective = { id: 'weekly-obj', title: inputValue, keyResults: [] };
      setAppState({ ...appState, messages: newMessages, weeklyObjective: newObjective });
      
      aiResponse = {
        id: Date.now().toString() + '-ai',
        sender: 'ai',
        text: "That's a great objective. Now, what are 1-3 key results that would prove you've achieved it? Please list them, separated by commas.",
      };
      setStep('AWAITING_KEY_RESULTS');

    } else if (step === 'AWAITING_KEY_RESULTS') {
      // User has provided the key results
      const keyResults = inputValue.split(',').map(kr => kr.trim());
      const updatedObjective = { ...appState.weeklyObjective!, keyResults };
      setAppState({ ...appState, messages: newMessages, weeklyObjective: updatedObjective });
      setStep('COMPLETED'); // This will trigger the redirect effect
    }

    if (aiResponse) {
      setAppState(prevState => ({ ...prevState, messages: [...prevState.messages, aiResponse!] }));
    }
    
    setInputValue('');
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 p-3 overflow-auto">
        {context?.appState.messages.map(msg => (
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
            placeholder="Your response..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={step === 'COMPLETED'} // Disable input when done
          />
          <button className="btn btn-primary" onClick={handleSendMessage} disabled={step === 'COMPLETED'}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default function StrategyPage() {
  return (
    <main className="container-fluid vh-100 d-flex flex-column">
      <header className="row bg-light border-bottom">
        <div className="col">
          <h1 className="p-3 mb-0">Set Your Weekly Strategy</h1>
        </div>
      </header>
      <div className="row flex-grow-1">
        <div className="col h-100">
          <StrategyChat />
        </div>
      </div>
    </main>
  );
}