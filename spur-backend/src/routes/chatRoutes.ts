import { Router } from "express";
import  prisma  from "../db/prisma";
import { generateReply } from "../services/llmService";

const router = Router();

router.post("/message", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversationId = sessionId;

    // If sessionId exists, verify it
    if (conversationId) {
        const exists = await prisma.conversation.findUnique({
            where: { id: conversationId },
        });

    if (!exists) {
        conversationId = null;
    }
    }

    // Create new conversation if needed
    if (!conversationId) {
        const convo = await prisma.conversation.create({ data: {} });
        conversationId = convo.id;
    }

    await prisma.message.create({
      data: {
        conversationId,
        sender: "user",
        text: message,
      },
    });

    const history = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    const reply = await generateReply(history, message);

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

export default router;
