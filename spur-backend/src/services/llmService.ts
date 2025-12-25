import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// 🧠 SpurCart support prompt
const systemPrompt = `
You are Spur AI Support Agent for SpurCart — an online store.

Store Policy Knowledge:
- Shipping: worldwide shipping, 5-9 business days delivery.
- Returns: 30-day return policy, full refund if unused & original packaging.
- Support Hours: Monday–Friday, 9AM–6PM IST.
- Payment Methods: UPI, Debit/Credit Card, PayPal.

Guidelines:
- Always answer using the policy first.
- If asked something not about orders, delivery, product, refunds, support → redirect kindly back to store support.
- Keep answers friendly, short, and useful.
- If user asks random/off-topic things, reply: 
  "I can help with SpurCart orders, products, shipping or returns — what would you like to know?"
`;

export async function generateReply(history: any[], userMessage: string) {
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },

    ...history.map(
      (m): ChatCompletionMessageParam => ({
        role: m.sender === "ai" ? "assistant" : "user",
        content: m.text,
      })
    ),

    { role: "user", content: userMessage },
  ];

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.4, // more consistent support responses
    });

    return (
      completion.choices[0]?.message?.content ||
      "I'm here to help with SpurCart orders, products, delivery or returns."
    );
  } catch (err) {
    console.error("LLM error:", err);
    return "⚠️ I'm having trouble responding — please try again in a moment.";
  }
}
