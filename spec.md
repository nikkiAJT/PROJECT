# Project Specification

## 1. Background & Problem
**What's the problem?** [I have too many tasks related to different teams or key results, and I have difficulty knowing which to do first or which to do next, to re-prioritise quickly when ad-hoc tasks come in, to remember the processes involved for each task, and to be aware of the technical requirements involved.]

**Who has this problem?** [Myself and I guess everyone doing project management in this company.]

**Current situation:** [It's as if I constantly have a hundred tabs open in my mind, and I get overwhelmed easily, and encounter blind spots or being forgetful, and that negatively impacts my team or project timeline.]

## 2. Goals & Success Metrics
**Primary Goal:** [I have a running list of prioritised and time-sensitive items with process checklists that I can clear, share, and update on a day to day basis.]

**Success looks like:**
- [No task left behind]
- [Every task completed fully]
- [Every task documented]

## 3. Project Overview
**Project Name:** [Task Strategist]

**Description:** [An AI-powered task assistant that helps you prioritize work based on your strategic goals (Objectives & Key Results). It allows you to discuss priorities, reminds you of dependencies and standard processes, and ensures you're always working on what matters most.]

**Target Users:** [Anyone requiring assistance managing and strategizing their tasklist]

## 4. What It Should Do
### Core Features
- [ ] Feature 1: **Conversational Task Management:** Instead of filling out a form, you discuss tasks with an AI assistant. It asks clarifying questions about urgency, effort, and strategic alignment to determine the right priority.
- [ ] Feature 2: **Goal-Oriented Prioritization:** Define your high-level Objectives and Key Results (OKRs). The AI will constantly align and re-prioritize your tasks based on which ones will best deliver on those results.
- [ ] Feature 3: **Intelligent Flow Recognition:** The assistant learns your common workflows. When you add a task like "Onboard new client," it can automatically suggest a checklist of your standard process steps, ensuring nothing is missed.
- [ ] Feature 4: **Strategic Dashboard:** View a dynamic dashboard that shows you what to work on next and, more importantly, *why*. See which tasks are contributing to which key results.
- [ ] Feature 5: **Weekly Sprint Focus:** At the start of each week, define a specific focus and key value metrics. The AI uses this short-term context to further refine priorities on top of the quarterly OKRs.

### User Actions
1. User can define and manage their high-level Objectives and Key Results (OKRs).
2. User can engage in a conversation with the AI to add, update, and discuss a task.
3. The AI assistant can ask questions to clarify a task's priority and its link to an OKR.
4. When a user adds a task of a known type, the assistant suggests a pre-defined checklist of sub-tasks (dependencies/flow).
5. User can define and update their weekly sprint focus and associated value metrics.

## 5. How It Should Look
**Visual Style:** Clean, modern, and conversational.

**Colors:** A simple and focused color palette (e.g., blues, greys, white) to make the conversation and data easy to read.

**Layout:** A two-panel layout. The left panel is a chat interface for interacting with the AI assistant. The right panel is the dynamic "Strategic Dashboard," which visualizes the prioritized tasks and their alignment with your objectives.

### Key Pages/Sections
- **AI Chat Interface:** The primary area for user interaction. Used for adding tasks, asking for recommendations, and discussing priorities.
- **Strategic Dashboard:** The main view of your tasks, but organized by Objective. It will feature a "What Should I Do Next?" section with the AI's top recommendation.
- **Objectives Management Page:** A simple interface to add, edit, and review your high-level Objectives and Key Results, as well as your current Weekly Sprint Focus.

## 6. Technical Requirements
**Deployment:** Netlify or Vercel.

**Works on:** Both computers and mobile phones.

**Data Storage:** "Save user's tasks, objectives, and conversation history." We will start with the browser's local storage but design for a future database backend to support more advanced AI features.

## 7. Example Scenarios
**Scenario 1: Adding a Task via Conversation**
- **User opens the app and types into the chat:** "I need to get the new landing page live."
- **AI Assistant:** "Okay. To help me prioritize this, how urgent is it? And which of our current objectives (`Increase User Signups`, `Improve Brand Presence`) does this support?"
- **User:** "It's for the new campaign, so it supports `Increase User Signups`. Deadline is next Wednesday."
- **AI Assistant:** "Got it. I've prioritized it as High. Based on our standard 'New Webpage' workflow, I've added the following sub-tasks: `1. Finalize copy`, `2. Get design approval`, `3. Run performance tests`, `4. Deploy to production`. Does that look right?"

**Scenario 2: Setting a Weekly Focus and Deciding What to Work On**
- **At the start of the week, the AI prompts the user:** "It's a new week! What is your primary focus? And what value metric are you aiming for?"
- **User types in chat:** "Focus is to launch the new referral program. Metric is 50 new sign-ups from referrals."
- **AI Assistant:** "Great. I've set that as your focus for the week. Your dashboard has been updated."
- **Later, the user asks:** "What should I work on now?"
- **AI Assistant:** "Given your weekly focus on launching the referral program, I recommend working on 'Finalize referral bonus terms'. This is the main blocker for that initiative."

## 8. Content & Copy
**Key Headlines:**
- **Main headline:** Your AI Task Strategist
- **Subheadline:** Stop managing lists. Start achieving objectives.

**Call-to-Action Buttons:**
- The primary interaction is the chat input field, with a placeholder like "What's on your mind?"

**Other Important Text:**
- On the dashboard: "What Should I Do Next?"

## 9. Out of Scope (Not Included)
- Real-time, adaptive learning from user actions (the initial version will use predefined workflows and rules).
- Deep integrations with external tools like Jira, Asana, or email to auto-import tasks.
- Multi-user collaboration and team-level objectives.