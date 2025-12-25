Spur AI Support Agent – SpurCart Assignment

A fully working AI-powered customer support agent for SpurCart, built as part of the Spur Software Engineer Hiring Assignment.

The agent:

Persists chat history (per session)

Responds using SpurCart policies

Redirects unrelated questions back to support topics

Provides realistic support UX with typing animation, voice input & session restore

Built with Prisma + SQLite + Express + TypeScript + Vite React + Groq LLM



---

🧠 Live Demo

Frontend (Vercel): https://spur-ai-support-agent.vercel.app (example — replace with yours)

Backend (Render): https://spur-ai-support-agent-xf77.onrender.com



---

📌 Features

Feature	Status

Persisted conversation history	✅
New chat / resume chat	✅
Voice input (browser speech API)	✅
Typing dots animation	✅
Guardrails against unrelated questions	✅
Works with deployed backend	✅
Readable code & modular backend	✅



---


---

📦 Tech Stack

Layer	Tools

Frontend	React + TypeScript + Vite
Backend	Node.js + Express + TypeScript
LLM Provider	Groq — model: llama-3.1-8b-instant
Database	SQLite via Prisma
Deployment	Render (backend), Vercel (frontend)



---

🛠 How to Run Locally

1️⃣ Clone the repo

git clone https://github.com/kanak-sys/spur-ai-support-agent.git
cd spur-ai-support-agent


---

2️⃣ Backend Setup

cd spur-backend
cp .env.example .env

Edit .env and add:

GROQ_API_KEY=your_key_here
DATABASE_URL="file:./prisma/dev.db"

Install dependencies:

npm install

Run DB migrations:

npx prisma migrate deploy

Start server:

npx ts-node-dev src/index.ts


---

3️⃣ Frontend Setup

cd spur-frontend
npm install
npm run dev

The app runs at http://localhost:5173


---



🧱 Architecture Overview (Short)

The system follows a layered client-server architecture with persistent chat sessions and an LLM-based support engine.

Frontend (React + Vite)
│
│ REST API calls (Axios)
▼
Backend (Node + Express)
│
├── Routes: 
│   • POST /chat/message → send user message & get reply
│   • GET /chat/:sessionId → restore previous chat
│
├── Service:
│   • generateReply(history, message)
│   • builds system prompt + sends to Groq LLM
│
└── Data (Prisma + SQLite)
    • messages + sessions stored for persistence

Session logic:
sessionId is saved in localStorage, allowing the user to return and continue the same chat.
Messages are stored in the database so history loads after refresh or reconnect.

LLM behavior:
A structured system prompt ensures responses stay on-topic (SpurCart support).
Unrelated questions are answered briefly and redirected back to support topics.

Extensibility:
Because routing, service logic, and LLM integration are decoupled, new channels (WhatsApp/IG), authentication, or product search could be added without UI changes.




---


---

🔧 Environment Variables

Name	Description

GROQ_API_KEY	LLM provider API key
DATABASE_URL	SQLite database path



---


---

🤖 LLM Notes

Item	Value

Provider	Groq
Model	llama-3.1-8b-instant
Prompting Strategy	Strict system guardrails to redirect unrelated chat
Purpose	E-commerce support agent behavior


Prompt Snippet

You are Spur AI Support Agent for SpurCart — an online ecommerce store.
...
If the user asks ANYTHING unrelated:
→ DO NOT answer the question.
→ POLITELY redirect back to SpurCart support topics.


---


---

🧪 Correctness Checks

Requirement	Implementation

Persist sessions	sessionId + Prisma
Retrieve history	GET /chat/:sessionId
Unrelated Q redirect	strict systemPrompt
Error handling	try/catch with graceful UI
Long message handling	500 char validation
Typing indicator	animated dots CSS



---


---

🚀 Deployments

Backend (Render)

Build:

npm install && npx prisma migrate deploy

Start:

npx ts-node src/index.ts

Frontend (Vercel)

Just import repo → Deploy

➡ Update API URL:

https://spur-ai-support-agent-xf77.onrender.com/chat


---


---

⚖️ Trade-offs & "If I had more time…"

Enhancement	Reason

Add authentication	separate user-based histories
Pagination of history	scale for long conversations
Streaming LLM responses	more natural agent feel
Better error banner UI	instead of inline chat bubble
Vector search for FAQs	improve product discovery





---

🟢 Status

✔ Meets assignment spec
✔ Redirects unrelated questions
✔ Persisted conversations & working deployment
✔ No crash-on-change behavior


---

💬 Contact

Kanak
Email: mkanak0430@gmail.com

---
