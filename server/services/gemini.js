import { GoogleGenAI } from "@google/genai";

const keys = (process.env.GEMINI_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

const clients = keys.map((key) => new GoogleGenAI({ apiKey: key }));

// ── NEW: Layer 3 — leak detector (module level, above chat) ──
const LEAK_MARKERS = [
  "You are Hitesh Choudhary —",
  "You are Piyush Garg —",
  "IDENTITY",
  "VOICE (from your real videos",
  "TEACHING STYLE",
  "BOUNDARIES",
  "Never say you are an AI",
];

function looksLikeLeak(text = "") {
  const hits = LEAK_MARKERS.filter((m) => text.includes(m)).length;
  return hits >= 2;
}
// ──────────────────────────────────────────────────────────────

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

      // ── CHANGED: was `return res.text;` — now filtered ──
      const text = res.text;
      if (looksLikeLeak(text)) return persona.safeReply;
      return text;
      // ─────────────────────────────────────────────────────

    } catch (err) {
      lastErr = err;
      const is429 =
        err?.status === 429 ||
        err?.code === 429 ||
        /429|RESOURCE_EXHAUSTED|quota/i.test(err?.message || "");
      if (!is429) throw err;
    }
  }
  throw lastErr;
}