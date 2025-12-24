# 📌 Spur AI Support Agent

A **full-stack AI-powered customer support chat application** built as part of the **Spur Software Engineer Hiring Assignment**.
The app allows users to chat with an AI support agent, maintains conversation sessions, and stores chat history securely.

---

## 🚀 Features

* 💬 Real-time AI chat interface
* 🧠 AI-powered responses using **Groq (LLaMA 3.1)**
* 🗂 Session-based conversation history
* 🗄 Persistent storage using **Prisma + SQLite**
* ⚡ Fast and modern frontend using **React + Vite**
* 🔒 Secure handling of API keys using `.env`
* 🧼 Clean, modular backend architecture

---

## 🛠 Tech Stack

### Frontend

* React (TypeScript)
* Vite
* Axios
* CSS (inline styling)

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite database

### AI / LLM

* **Groq API**
* Model: `llama-3.1-8b-instant`

---

## 📁 Project Structure

```
spur-ai-support-agent/
├── spur-frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── spur-backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── db/
│   │   └── index.ts
│   ├── prisma/
│   ├── .env
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/spur-ai-support-agent.git
cd spur-ai-support-agent
```

---

### 2️⃣ Backend Setup

```bash
cd spur-backend
npm install
```

Create a `.env` file in `spur-backend`:

```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=file:./prisma/dev.db
```

Run database migration:

```bash
npx prisma migrate dev --name init
```

Start backend server:

```bash
npx ts-node-dev src/index.ts
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd spur-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧠 How It Works

1. User sends a message from the frontend chat UI
2. Backend:

   * Creates or resumes a conversation session
   * Stores user messages in the database
   * Sends chat history + new message to the LLM
3. AI generates a response
4. Response is stored and returned to the frontend
5. UI updates with auto-scroll and message distinction

---

## 🔐 Security & Best Practices

* `.env` file is ignored via `.gitignore`
* API keys are never committed
* Database file is ignored from version control
* Modular, maintainable code structure

---

## 🧪 Error Handling

* Graceful handling of empty messages
* LLM API errors are caught and logged
* User receives a friendly fallback message on failure

---

## 📸 Screenshots

### 🧠 AI Support Chat in Action

<img width="658" height="818" alt="{2EF10AF8-EB4F-4523-BFF4-E2135645AD4E}" src="https://github.com/user-attachments/assets/c01a492f-6c2e-40a6-95b6-ae7f223bc4b1" />

*Example conversation showing the AI assisting a user with placing an order.*

---

## 📌 Notes

* LLM provider is abstracted and can be switched easily
* Designed to be scalable and production-ready
* Demonstrates real-world debugging and API integration skills

---

## 👩‍💻 Author

**Kanak**
B.Tech CSE Student
Aspiring Software Engineer

---

## ✅ Status

✔ Fully functional
✔ Assignment completed
✔ Ready for evaluation

---


