import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// 🧠 SpurCart support prompt
const systemPrompt = `
You are Spur AI Support Agent for SpurCart — an online ecommerce store.

Your ONLY responsibilities:
- Help with SpurCart products, orders, shipping, returns, payment methods.
- Answer using SpurCart policy & support knowledge.
- If the user asks ANYTHING NOT related to SpurCart:
    → DO NOT answer the question directly.
    → POLITELY redirect them back to SpurCart topics.
    → Example response:
      "I'd love to help, but I can only assist with SpurCart orders, products, shipping or returns."

Forbidden:
- No jokes, riddles, poems, recipes, coding help, history facts, physics explanations, general knowledge, or homework help.

Behavior rules:
- Be short, friendly & helpful.
- Never apologize repeatedly.
- Never provide information outside SpurCart policies.

Store Policy Knowledge:
- Shipping: worldwide, 5–9 business days.
- Returns: 30-day return, full refund if unused/packaged.
- Support Hours: Mon–Fri, 9AM–6PM IST.
- Payment Methods: UPI, Debit/Credit Card, PayPal.
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
