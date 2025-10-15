export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  subTasks: SubTask[];
  completed: boolean;
  recurring: 'daily' | 'weekly' | null;
  type?: string; // Used for pattern matching
}

export interface WeeklyObjective {
  id: string;
  title: string;
  keyResults: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

// Represents an ongoing conversation with the AI
export interface ConversationState {
  type: 'SET_PRIORITY';
  taskId: string;
  step: 'ASK_URGENCY' | 'ASK_IMPACT';
}

export interface AppState {
  tasks: Task[];
  weeklyObjective: WeeklyObjective | null;
  messages: Message[];
  learnedTaskPatterns: Record<string, SubTask[]>;
  conversationState: ConversationState | null;
}
