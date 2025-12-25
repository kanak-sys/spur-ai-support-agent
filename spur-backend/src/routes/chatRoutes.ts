import { Router } from "express";
import prisma from "../db/prisma";
import { generateReply } from "../services/llmService";

const router = Router();

/* ===========================
   POST /chat/message
   Send message and get reply
=========================== */

router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversationId = sessionId;

    // Validate sessionId — create if not found
    if (conversationId) {
      const exists = await prisma.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!exists) {
        conversationId = null;
      }
    }

    // Create a new conversation if none
    if (!conversationId) {
      const convo = await prisma.conversation.create({ data: {} });
      conversationId = convo.id;
    }

    // Store user message
    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    // Fetch conversation history
    const history = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    // Generate AI reply
    const reply = await generateReply(history, message);

    // Store AI reply
    await prisma.message.create({
      data: {
        conversationId,
        sender: "ai",
        text: reply,
      },
    });

    res.json({ reply, sessionId: conversationId });
  } catch (err: any) {
    console.error("CHAT ROUTE ERROR ↓↓↓");
    console.error(err?.message || err);
    console.error(err?.response?.data || "");
    console.error("↑↑↑ END ERROR");

    res.status(500).json({
      reply: "Sorry, I am facing issues right now. Please try again later.",
      sessionId: req.body.sessionId || null,
    });
  }
});

/* ===========================
   GET /chat/:sessionId
   Fetch entire chat history
=========================== */

router.get("/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: sessionId },
      orderBy: { createdAt: "asc" }
    });

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
