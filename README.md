🚀 Spur AI Support Agent — SpurCart Assignment  https://spur-ai-support-agent-hfrr.vercel.app/

> A full-stack AI-powered customer support assistant for SpurCart, built for the Spur Software Engineer Hiring Assignment.
Focused on real product UX, persistent conversation history, and LLM guardrails.



<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/LLM-Groq%20Llama3-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node%20%2B%20Express-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/DB-SQLite-lightgrey?style=for-the-badge"/>
</p>
---


> Chat persists after refresh, voice input works, unrelated questions are redirected to support topics ✔️




---

✨ Features

Capability	Status	Notes

Persisted chat history	✅	sessionId stored in browser + DB
New chat / resume chat	✅	single-click reset
Voice input (speech-to-text)	🎤	browser speech API
Typing indicator	⏳	animated three-dot CSS
Guardrails for unrelated Qs	🎯	policy-based system prompt
Backend deployed	☁️	Render
Frontend deployed	🧭	Vercel
Long message validation	🔒	>500 chars blocked with alert
Clean modular code	🛠	separation of routes/services/data



---

🧠 LLM Prompting Strategy

> Goal: Act as a realistic ecommerce support agent and gently redirect unrelated questions.



You are Spur AI Support Agent for SpurCart — an online ecommerce store.

Store Policies:
- Shipping: Worldwide, 5–9 business days
- Returns: 30 days, full refund if unused & packaged
- Support Hours: Mon–Fri, 9AM–6PM IST
- Payments: UPI, Debit/Credit, PayPal

Rules:
- Always answer using SpurCart policies first
- If user asks unrelated or general topics → redirect politely to SpurCart support
- Keep tone helpful & concise

Example Behavior

User asks	Agent Response

"Explain quantum physics"	redirects to support topics
"Track my order"	answers correctly with policies
"Write poem"	politely declines + refocuses



---

🧱 Architecture (Short)

Frontend (React + Vite + TS)
│
│— REST (Axios)
▼
Backend (Node + Express + TS)
│
├── Routes
│   ├─ POST /chat/message     → send message & get agent reply
│   └─ GET /chat/:sessionId   → return persisted history
│
├── Service (LLM)
│   └─ generateReply(history,message)
│        ↳ builds system prompt + policy guardrails
│
└── Data (Prisma + SQLite)
    ├─ Conversation
    └─ Message

✔ Extensible — can plug WhatsApp, product search, auth later without UI changes.


---

🚀 How to Run Locally

1️⃣ Clone & install

git clone https://github.com/kanak-sys/spur-ai-support-agent.git
cd spur-ai-support-agent


---

2️⃣ Backend Setup

cd spur-backend
cp .env.example .env

Edit .env:

GROQ_API_KEY=your_api_key_here
DATABASE_URL="file:./prisma/dev.db"

Then:

npm install
npx prisma migrate deploy
npx ts-node-dev src/index.ts

Runs at http://localhost:5000


---

3️⃣ Frontend Setup

cd spur-frontend
npm install
npm run dev

Runs at: http://localhost:5173


---

🧪 Correctness Checklist

Requirement	Status

Persist conversations	✔ DB + localStorage
Redirect unrelated Qs	✔ system prompt guardrails
Error handling	✔ try/catch with friendly response
Long messages handled	✔ >500 chars blocked
Resilience	✔ no crash-on-refresh
UX realism	✔ typing dots, voice input, avatars



---

⚙️ Environment Variables

Name	Description

GROQ_API_KEY	LLM Provider API key
DATABASE_URL	SQLite path



---

📬 Contact

Kanak — mkanak0430@gmail.com


---

> If you can build this, you're close to what we'd ship at Spur as a founding engineer. 💛




---


