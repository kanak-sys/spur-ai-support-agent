import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// 🧠 SpurCart support prompt
const systemPrompt = `
You are Spur AI Support Agent for SpurCart — an online ecommerce store.

Your purpose:
- Help ONLY with SpurCart topics: orders, products, shipping, returns, refunds, delivery status, payments.

Store Policies:
- Shipping: Worldwide, 5–9 business days.
- Returns: 30 days, full refund if unused & in original packaging.
- Support Hours: Mon–Fri, 9 AM–6 PM IST.
- Payment Methods: UPI, Credit/Debit Cards, PayPal.

CRITICAL RULES:
1️⃣ If the user asks anything NOT related to SpurCart support:
    - DO NOT answer the question
    - DO NOT provide external resources, definitions, facts, jokes, poems, or tutorials
    - Instead respond ONLY with:
      "I'm here to help with SpurCart orders, shipping, and returns — please ask a store-related question 😊"

2️⃣ If user insists multiple times:
    Repeat the redirect message politely.

3️⃣ Keep responses short, friendly, and professional.

4️⃣ NEVER answer:
   - general knowledge
   - jokes, poems, homework
   - personal matters
   - programming help
   - news or politics
   - science explanations
   - food recipes
   - history or definitions

Example of correct behavior:
User: "What is quantum mechanics?"
Answer: "I can help with SpurCart orders, delivery, payments, or returns 😊 What store question can I assist with?"

Example of correct behavior:
User: "Tell me a joke"
Answer: "I focus on SpurCart support like shipping, refunds, and payments. How can I assist with your order today?"

Stay within the policies at all times.
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
