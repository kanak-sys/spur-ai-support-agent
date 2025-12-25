## 📌 Spur AI Support Agent

A **full-stack AI customer support chat application** built as part of the **Spur Software Engineer Hiring Assignment**.
Users can chat with an AI support agent, and all conversations are persisted with session support.

---

## 🚀 Features

✔️ Beautiful real-world chat UI
✔️ AI-powered customer support
✔️ Session-based conversation (chat continues after reload)
✔️ Persistent storage using Prisma + SQLite
✔️ Typing indicator + UX polish
✔️ New Chat reset option
✔️ Voice input support (mic 🎤)
✔️ Robust error handling

---

## 🧠 Tech Stack

### **Frontend**

* React (TypeScript)
* Vite
* Axios
* CSS + Inline UI Styling

### **Backend**

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite

### **AI**

* OpenAI / GPT / Grok
* System prompt tuned for ecommerce support
* Context-aware replies using chat history

---

## 📁 Project Structure

```
spur/
├── spur-frontend   # React UI
└── spur-backend    # Node + Express API
```

Backend Structure:

```
src
 ├─ routes/
 ├─ services/
 ├─ db/
 └─ index.ts
```

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone Repo

```
git clone https://github.com/YOUR_USERNAME/spur-ai-support-agent.git
cd spur-ai-support-agent
```

---

### 2️⃣ Backend Setup

```
cd spur-backend
npm install
```

Create `.env`

```
OPENAI_API_KEY=your_key_here
DATABASE_URL="file:./dev.db"
```

Run Prisma

```
npx prisma migrate dev --name init
```

Start Server

```
npx ts-node-dev src/index.ts
```

Backend → `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```
cd spur-frontend
npm install
npm run dev
```

Frontend → `http://localhost:5173`

---

## 🧠 How it Works

1️⃣ User types message
2️⃣ Backend:

* Creates / resumes session
* Saves message
* Sends history + message to LLM
  3️⃣ LLM replies
  4️⃣ Reply stored + returned
  5️⃣ Frontend updates UI + scrolls smoothly

---

## 🔐 Security

✔️ `.env` ignored
✔️ DB file ignored
✔️ No hardcoded secrets
✔️ Clean architecture

---

## 🧪 Error Handling

* Prevents empty messages
* Friendly fallback replies
* Handles API timeouts
* Never crashes UI or backend

---

## 🎥 Screenshots

<img width="686" height="862" alt="{43D0C6EB-351D-4C38-92FD-9AC130A19BE5}" src="https://github.com/user-attachments/assets/f9d2775d-a690-4176-bc13-3a32e2171e19" />

---

## 📌 Notes

* Uses SQLite for simplicity (recommended by assignment)
* Can swap to PostgreSQL easily
* Designed to be scalable
* Clean code & best practices followed

---

## 👨‍💻 Author

**Kanak**
Final Year B.Tech CSE
Aspiring Software Engineer 🚀

---

## ✅ Status

✔ Fully Functional
✔ Meets Spur Assignment Requirements
✔ Ready For Evaluation

---
