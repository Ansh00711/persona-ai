# Context Management Approach

## The core problem

LLMs are stateless — every API call starts from zero. "Memory" is an illusion the
application creates by re-sending conversation history with each request. Done
naively, this causes three failures: token costs grow unbounded, requests
eventually exceed the context limit, and the persona drifts as its instructions
get diluted by a long conversation.

## Architecture decision: stateless backend

The **frontend owns all conversation state**. Every request carries the full
(trimmed) history:

```json
POST /api/chat
{
  "personaId": "hitesh",
  "messages": [
    { "role": "user",      "content": "Sir, DSA zaroori hai kya?" },
    { "role": "assistant", "content": "Haanji, dekhiye..." },
    { "role": "user",      "content": "Aur agar sirf web dev karna ho?" }
  ]
}
```

The server holds nothing between requests — no sessions, no database. Benefits:
horizontal scalability for free, no state-sync bugs, and the free-tier server can
restart (Render cold starts) without losing a single conversation.

## What the model actually receives (assembled per request)

```
┌──────────────────────────────────────────────┐
│ systemInstruction: persona prompt (PINNED)   │  ← never trimmed, re-sent every call
├──────────────────────────────────────────────┤
│ few-shot examples (5-6 Q→A pairs)            │  ← always prepended, lock the