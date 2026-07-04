import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chat(persona, history) {
  const contents = [
    // Few-shots first — they lock in the voice
    ...persona.fewShots.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    // Then the real (trimmed) conversation
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

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
}