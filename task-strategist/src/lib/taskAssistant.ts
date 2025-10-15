import { AppState, ConversationState, Message, Task } from "./types";
import { v4 as uuidv4 } from 'uuid';

// Handles the multi-step conversation for setting priority
function handlePriorityConversation(message: string, currentState: AppState): AppState {
  const newState = JSON.parse(JSON.stringify(currentState));
  const userMessage: Message = { id: uuidv4(), text: message, sender: 'user' };
  newState.messages.push(userMessage);

  const conversation = newState.conversationState as ConversationState;
  const task = newState.tasks.find((t: Task) => t.id === conversation.taskId);

  if (!task) {
    newState.messages.push({ id: uuidv4(), text: "Sorry, something went wrong. I can't find the task we were discussing.", sender: 'ai' });
    newState.conversationState = null; // End conversation
    return newState;
  }

  if (conversation.step === 'ASK_URGENCY') {
    // Here you would normally store the urgency answer. For now, we'll just move to the next step.
    newState.conversationState.step = 'ASK_IMPACT';
    newState.messages.push({ id: uuidv4(), text: "Got it. Now, how critical is this task to achieving your weekly objective? (Low, Medium, or High)", sender: 'ai' });
  } else if (conversation.step === 'ASK_IMPACT') {
    // Based on the (imagined) urgency and the impact, set a priority.
    const impact = message.toLowerCase();
    let priority: 'High' | 'Medium' | 'Low' = 'Medium';
    if (impact.includes('high')) {
      priority = 'High';
    } else if (impact.includes('low')) {
      priority = 'Low';
    }
    task.priority = priority;

    newState.messages.push({ id: uuidv4(), text: `Okay, I've set the priority for "${task.title}" to ${priority}.`, sender: 'ai' });
    newState.conversationState = null; // End conversation
  }

  return newState;
}

// Main function to process user messages
export function processTaskMessage(message: string, currentState: AppState): AppState {
  // If we are in the middle of a conversation, delegate to the handler
  if (currentState.conversationState) {
    return handlePriorityConversation(message, currentState);
  }

  // Otherwise, process as a new command
  const newState = JSON.parse(JSON.stringify(currentState));
  const userMessage: Message = { id: uuidv4(), text: message, sender: 'user' };
  newState.messages = [userMessage]; // Start with a fresh message list

  let aiResponseText: string;
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.startsWith('add task')) {
    const title = message.substring(9).trim();
    if (title) {
      const newTask: Task = { id: uuidv4(), title, priority: 'Medium', subTasks: [], completed: false, recurring: null, type: title };
      newState.tasks.push(newTask);
      aiResponseText = `Task added: "${title}". To discuss its priority, type: set priority for "${title}"`;
    } else {
      aiResponseText = "Please provide a title for the task.";
    }
  } else if (lowerCaseMessage.startsWith('add subtask')) {
    const matches = message.match(/add subtask ["“](.*)["”] to ["“](.*)["”]/i);
    if (matches && matches.length === 3) {
      const subtaskTitle = matches[1], parentTaskTitle = matches[2];
      const parentTask = newState.tasks.find((t: Task) => t.title.toLowerCase() === parentTaskTitle.toLowerCase());
      if (parentTask) {
        parentTask.subTasks.push({ id: uuidv4(), title: subtaskTitle, completed: false });
        aiResponseText = `Added sub-task "${subtaskTitle}" to "${parentTask.title}".`;
        newState.learnedTaskPatterns[parentTask.type] = parentTask.subTasks;
      } else {
        aiResponseText = `Sorry, I couldn't find a task named "${parentTaskTitle}".`;
      }
    } else {
      aiResponseText = `To add a sub-task, use: add subtask "sub-task title" to "task title"`;
    }
  } else if (lowerCaseMessage.startsWith('set recurring')) {
    const matches = message.match(/set recurring (daily|weekly) for ["“](.*)["”]/i);
    if (matches && matches.length === 3) {
      const recurringType = matches[1] as 'daily' | 'weekly', taskTitle = matches[2];
      const task = newState.tasks.find((t: Task) => t.title.toLowerCase() === taskTitle.toLowerCase());
      if (task) {
        task.recurring = recurringType;
        aiResponseText = `Set "${task.title}" to recur ${recurringType}.`;
      } else {
        aiResponseText = `Sorry, I couldn't find a task named "${taskTitle}".`;
      }
    } else {
      aiResponseText = `To set recurrence, use: set recurring <daily|weekly> for "task title"`;
    }
  } else if (lowerCaseMessage.startsWith('set priority for')) {
    const matches = message.match(/set priority for ["“](.*)["”]/i);
    if (matches && matches.length === 2) {
      const taskTitle = matches[1];
      const task = newState.tasks.find((t: Task) => t.title.toLowerCase() === taskTitle.toLowerCase());
      if (task) {
        // Start the conversation
        newState.conversationState = { type: 'SET_PRIORITY', taskId: task.id, step: 'ASK_URGENCY' };
        aiResponseText = `Let's set the priority for "${task.title}". First, on a scale of 1 to 10, how urgent is this task?`;
      } else {
        aiResponseText = `Sorry, I couldn't find a task named "${taskTitle}".`;
      }
    } else {
      aiResponseText = `To set priority, use: set priority for "task title"`;
    }
  } else {
    aiResponseText = "I'm ready to help. You can 'add task', 'add subtask', 'set recurring', or 'set priority'.";
  }

  newState.messages.push({ id: uuidv4(), text: aiResponseText, sender: 'ai' });
  return newState;
}
