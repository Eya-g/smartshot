import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const classifyText = async (text) => {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a screenshot classification system for a Smart Screenshot Manager app.

Your job is to analyze extracted text from a screenshot and return the single most accurate category.

Categories and what they mean:
- programming: code, terminal, IDE, errors, stack traces, GitHub, dev tools, APIs
- finance: invoices, bank statements, payments, prices, receipts, crypto, transactions
- social_media: tweets, posts, chats, comments, DMs, Instagram, Facebook, LinkedIn, WhatsApp
- shopping: orders, products, carts, delivery tracking, e-commerce sites like Amazon
- education: courses, lectures, notes, PDFs, exercises, university platforms, tutorials
- work: emails, meetings, presentations, Notion, Trello, Jira, project management tools
- personal: photos, personal notes, calendars, health, anything private or unrelated to work

Rules:
- Return ONLY the category label, nothing else. No explanation, no punctuation.
- If the text is ambiguous, pick the closest match.
- If nothing matches at all, return: other`,
      },
      {
        role: "user",
        content: `Classify this screenshot text:\n\n${text}`,
      },
    ],
    temperature: 0,
  });

  return response.choices[0].message.content.trim().toLowerCase();
};
