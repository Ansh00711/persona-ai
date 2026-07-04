import { GoogleGenAI } from "@google/genai";

// Supports multiple comma-separated keys in GEMINI_API_KEY.
// On quota/rate-limit errors (429), falls over to the next key.
const keys = (process.env.GEMINI_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

const clients = keys.map((key) => new GoogleGenAI({ apiKey: key }));

export async function chat(persona, history) {
  const contents = [
    ...persona.fewShots.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  let lastErr;
  for (const ai of clients) {
    try {
      const res = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction: persona.systemPrompt,
          temperature: 0.9,
          maxOutputTokens: 1024,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
      return res.text;
    } catch (err) {
      lastErr = err;
      if (err?.status !== 429) throw err; // real errors: fail fast
      // 429 = this key's quota/rate limit hit → try the next key
    }
  }
  throw lastErr;
}