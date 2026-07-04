import { Router } from "express";
import { personas } from "../personas/index.js";
import { chat } from "../services/gemini.js";
import { trimHistory } from "../utils/contextManager.js";

const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const { personaId, messages } = req.body;

    const persona = personas[personaId];
    if (!persona) return res.status(400).json({ error: "Unknown persona" });
    if (!Array.isArray(messages) || messages.length === 0)
      return res.status(400).json({ error: "messages must be a non-empty array" });

    const reply = await chat(persona, trimHistory(messages));
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "LLM call failed. Try again." });
  }
});

export default router;