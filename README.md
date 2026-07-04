# Persona AI 🎭

Chat with AI versions of **Hitesh Choudhary** ☕ and **Piyush Garg** 🐳 — two of
India's favourite tech educators. Built for the *GenAI with JS 2026* cohort assignment.

**Live:** https://persona.ai.sovekt.com 

Each persona is built from evidence, not vibes: 10 of their real YouTube videos were
transcribed and mined for catchphrases, teaching patterns, and speech rhythm, then
encoded as system prompts + few-shot examples.

## Features

- **Two authentic personas** — Hitesh (Hinglish, story-first, chai references) and
  Piyush (English-heavy, builder-first, under-the-hood explanations)
- **One-click persona switching** with fully isolated chat histories
- **Context-aware conversations** — sliding-window memory, persona never drifts
- **Markdown rendering** with syntax-styled code blocks and copy buttons
- **Persona-themed UI** — the whole interface re-lights (amber ↔ blue) on switch
- **Resilient backend** — multi-key Gemini failover, retry UI on errors
- **Responsive** — works on mobile, chat histories survive refresh (localStorage)

## Tech Stack

| Layer    | Tech                                        |
| -------- | ------------------------------------------- |
| Frontend | React 19 (Vite), react-markdown, plain CSS  |
| Backend  | Node.js, Express 5                          |
| LLM      | Google Gemini 2.5 Flash via `@google/genai` |
| Deploy   | Vercel (client) · Render (server)           |

## Architecture

```
[React UI] --POST /api/chat {personaId, messages[]}--> [Express]
                                                          |
                                          system prompt (pinned persona)
                                          + few-shot examples (voice)
                                          + trimmed history (last 20)
                                                          v
                                                 [Gemini 2.5 Flash]
                                                          |
[React UI] <-------------------- { reply } --------------+
```

The backend is stateless — the frontend owns conversation history and sends it with
every request. Personas are data files, not code: adding persona #3 means adding one
file in `server/personas/`.

## Run Locally

**Prerequisites:** Node.js 20+, a free Gemini API key from
[aistudio.google.com](https://aistudio.google.com)

```bash
git clone https://github.com/Ansh00711/persona-ai.git
cd persona-ai
```

**Backend** (terminal 1):

```bash
cd server
npm install
echo "GEMINI_API_KEY=your_key_here" > .env
npm run dev
# → ✅ Server running on http://localhost:3001
```

**Frontend** (terminal 2):

```bash
cd client
npm install
echo "VITE_API_URL=http://localhost:3001" > .env
npm run dev
# → open http://localhost:5173
```

## Environment Variables

| Variable         | Where  | Purpose                                                              |
| ---------------- | ------ | -------------------------------------------------------------------- |
| `GEMINI_API_KEY` | server | Gemini key(s). Comma-separated list enables automatic 429 failover.  |
| `CLIENT_URL`     | server | Allowed CORS origin(s) in production, comma-separated.               |
| `PORT`           | server | Optional, defaults to 3001 (hosting platforms inject their own).     |
| `VITE_API_URL`   | client | Backend base URL, baked in at build time.                            |


## Disclaimer

Educational project. AI personas for learning & fun — not affiliated with or endorsed
by the real educators.