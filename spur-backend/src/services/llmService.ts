import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function generateReply(history: any[], userMessage: string) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        "You are a helpful ecommerce customer support agent. Answer politely and clearly.",
    },
    ...history.map(
      (m): ChatCompletionMessageParam => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })
    ),
    {
      role: "user",
      content: userMessage,
    },
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });

  return (
    response.choices[0]?.message?.content ??
    "Sorry, I couldn't generate a response."
  );
}
