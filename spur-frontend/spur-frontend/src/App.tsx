import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";

interface Message {
  sender: "user" | "ai";
  text: string;
  time?: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🌍 LIVE BACKEND URL
  const backendURL = "https://spur-ai-support-agent-xf77.onrender.com/chat";

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  // 🎉 Welcome message
  useEffect(() => {
    if (!localStorage.getItem("spur-welcome")) {
      setMessages([{ sender: "ai", text: "👋 Hey! I'm your Spur AI Support Agent — how can I assist today?" }]);
      localStorage.setItem("spur-welcome", "yes");
    }
  }, []);

  // 💾 Load saved session
  useEffect(() => {
    const saved = localStorage.getItem("spur-session");
    if (saved) setSessionId(saved);
  }, []);

  // 📜 Fetch old chat history
  useEffect(() => {
    const loadHistory = async () => {
      if (!sessionId) return;
      try {
        const res = await axios.get(`${backendURL}/${sessionId}`);
        setMessages(res.data);
      } catch (err) {
        console.log("History loading failed:", err);
      }
    };
    loadHistory();
  }, [sessionId]);

  // 🎤 Voice input
  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser 😢");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setInput("🎙 Listening...");
    recognition.onresult = (event: any) => setInput(event.results[0][0].transcript);
    recognition.onerror = () => alert("Voice recognition error. Try again.");
    recognition.start();
  };

  // 💬 Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    // 🚫 limit message length
    if (input.length > 500) {
      alert("Message too long — please keep under 500 characters");
      return;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = { sender: "user", text: input, time: timestamp };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${backendURL}/message`, { message: input, sessionId });
      setSessionId(res.data.sessionId);
      localStorage.setItem("spur-session", res.data.sessionId);

      const aiMsg: Message = { sender: "ai", text: res.data.reply, time: timestamp };
      setMessages(prev => [...prev, aiMsg]);
    } 
    catch (err) {
      console.log(err);
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "⚠️ Agent had a problem — please try again." }
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && !loading && sendMessage();


  // -------------------- UI RENDER --------------------
  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          Spur AI Support Agent
          <button
            style={styles.newChat}
            onClick={() => {
              localStorage.removeItem("spur-session");
              setMessages([{ sender: "ai", text: "✨ New chat started — how can I help?" }]);
              setSessionId(null);
            }}
          >
            ➕
          </button>
        </div>

        <div style={styles.messages}>
          {messages.map((m, i) => (
            <div key={i} style={m.sender === "user" ? styles.userRow : styles.aiRow}>
              <img
                src={
                  m.sender === "user"
                    ? "https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=user"
                    : "https://api.dicebear.com/9.x/bottts/svg?seed=ai"
                }
                style={styles.avatar}
              />
              <div>
                <div style={styles.msgBubble(m.sender)}>{m.text}</div>
                {m.time && <div style={styles.time}>{m.time}</div>}
              </div>
            </div>
          ))}

          {/* ⏳ Typing animation */}
          {loading && (
            <div style={styles.aiRow}>
              <img src="https://api.dicebear.com/9.x/bottts/svg?seed=ai" style={styles.avatar} />
              <div className="typing-dots"><span></span><span></span><span></span></div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 💬 Input area */}
        <div style={styles.inputRow}>
          <button style={styles.micBtn} onClick={startVoiceInput}>🎤</button>

          <input
            style={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message or use mic..."
          />

          <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

// -------------------- STYLES --------------------
const styles: any = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)"
  },
  chatBox: {
    width: "420px",
    height: "620px",
    background: "white",
    borderRadius: "18px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.4)"
  },
  header: {
    background: "linear-gradient(90deg,#2563eb,#60a5fa)",
    color: "white",
    padding: "14px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "18px",
    position: "relative"
  },
  newChat: {
    position: "absolute",
    right: "14px",
    top: "10px",
    background: "#1e40af",
    color: "white",
    padding: "4px 8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  messages: {
    flex: 1,
    background: "#f1f5f9",
    overflowY: "auto",
    padding: "12px"
  },
  userRow: { display: "flex", justifyContent: "flex-end", marginBottom: "8px" },
  aiRow: { display: "flex", justifyContent: "flex-start", marginBottom: "8px" },
  avatar: { width: "36px", marginRight: "8px" },
  msgBubble: (sender: string) => ({
    padding: "10px 12px",
    borderRadius: sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
    maxWidth: "260px",
    color: sender === "user" ? "white" : "black",
    background: sender === "user" ? "#2563eb" : "#e2e8f0"
  }),
  time: { fontSize: "10px", opacity: 0.6, marginLeft: "4px" },
  micBtn: {
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: "50%",
    width: "42px",
    height: "42px",
    fontSize: "20px",
    cursor: "pointer"
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    padding: "12px",
    borderTop: "1px solid #e2e8f0"
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none"
  },
  sendBtn: {
    background: "#2563eb",
    color: "white",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  }
};
