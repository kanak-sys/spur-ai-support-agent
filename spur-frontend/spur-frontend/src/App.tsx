import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat/message", {
        message: userMessage,
        sessionId,
      });

      setSessionId(res.data.sessionId);
      localStorage.setItem("spur-session", res.data.sessionId);

      setMessages(prev => [
        ...prev,
        { sender: "ai", text: res.data.reply },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) sendMessage();
  };

  useEffect(() => {
    const saved = localStorage.getItem("spur-session");
    if (saved) setSessionId(saved);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>Spur AI Support Agent</div>

        <div style={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={m.sender === "user" ? styles.userMsg : styles.aiMsg}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div style={styles.aiMsg}>Agent is typing...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  chatBox: {
    width: "400px",
    height: "600px",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#2563eb",
    color: "white",
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  userMsg: {
    alignSelf: "flex-end",
    background: "#2563eb",
    color: "white",
    padding: "8px 10px",
    borderRadius: "10px",
    maxWidth: "75%",
  },
  aiMsg: {
    alignSelf: "flex-start",
    background: "#e5e7eb",
    padding: "8px 10px",
    borderRadius: "10px",
    maxWidth: "75%",
  },
  inputRow: {
    padding: "10px",
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  button: {
    padding: "8px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};
