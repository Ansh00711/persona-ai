# Persona Research — How the Data Was Collected & Prepared

## Sources

### Primary: YouTube transcripts (10 videos, ~48,000 words)

The core persona data came from transcribing full videos from each educator's
channel — deliberately mixed formats (tutorials, announcements, live streams,
opinion pieces) so the personas capture how they *talk*, not just how they teach
one topic.

**Hitesh Choudhary (Chai aur Code):**

| # | Video | Type | Link |
|---|-------|------|------|
| 1 | Dokploy Self Hosting Final Boss | Tutorial/Review | https://youtu.be/1YzNl1tkAik |
| 2 | Agent-first testing for production applications | Opinion/Tutorial | https://youtu.be/hYIb2xs0vvk |
| 3 | Chai aur Books Live stream Announcement | Announcement | https://youtu.be/VCqiwPs8ISE |
| 4 | Common Table Expression (CTE) in SQL — master class | Tutorial | https://youtu.be/3OGrCtdnSFA |
| 5 | From One Connection to One Million WebSockets | Tutorial | https://youtu.be/GmK_yV9_ccY |

**Piyush Garg (@piyushgargdev):**

| # | Video | Type | Link |
|---|-------|------|------|
| 1 | You don't know about S3 as a Protocol | Tutorial | https://youtu.be/nomgFESEYZI |
| 2 | What is VoIP (Voice Over Internet Protocol) | Tutorial | https://youtu.be/rTO4rM3hXLY |
| 3 | What is Harness Engineering? | Explainer | https://youtu.be/IqQFaj3oO0Q |
| 4 | Redis for AI Agents | Tutorial | https://youtu.be/qhsVMiBjxM0 |
| 5 | Can AI Build a Real-Time Chess Game? | Build-along | https://youtu.be/u-oVTGSq4eE |

### Secondary: public web

- **piyushgarg.dev** — bio, Teachyst, course catalogue (Docker, Node.js, Java+DSA,
  Full Stack GenAI)
- **hitesh.ai** is a client-rendered VS Code-style site (no scrapeable text), so
  Hitesh's bio facts came from his channel descriptions, chaicode.com, and public
  interviews: LearnCodeOnline founder (acquired), ex-CTO iNeuron, ex-Senior
  Director Physics Wallah, 16+ years, retired from corporate, 45+ countries
- **chaicode.com** — cohort details; both educators co-teach the GenAI with JS cohort

## Preparation pipeline

1. **Transcription** — auto-captions exported per video into `.txt` files with
   Title/URL/Type headers. Captions come out in Devanagari script even for
   English words ("वेलकम बैक" = "welcome back").
2. **Extraction pass** — each transcript read for: greeting rituals, sign-off
   rituals, catchphrases, filler/tic words, analogy patterns, code-switching
   style (where Hindi ends and English begins), and opinions.
3. **Romanization** — chat users type "kaise ho", not "कैसे हो", so all evidence
   was converted to Roman-script Hinglish, and the system prompt instructs the
   model to reply in Roman script unless the user writes Devanagari.
4. **Encoding** — every trait became either a system-prompt line (rule) or a
   few-shot example (demonstration). Traits with exact wording went into
   few-shots; behavioral patterns went into prompt blocks.

## Extracted traits — Hitesh Choudhary

| Trait | Evidence from transcripts | Encoded as |
|-------|---------------------------|------------|
| Greeting ritual | "Haanji! Kaise hain aap sabhi? Swagat hai sabhi ka Chai aur Code mein" — opens videos 1, 3, 4, 5 | Prompt: greeting for new conversations; few-shot openers |
| Small-talk warmth | "Kahan se video dekh rahe hain? Mausam kaisa hai aapke wahan pe?" (video 5) | Prompt: occasional weather/location small talk |
| Philosophy one-liners | "Code ki fitrat hai fatna, aur code fat ke hi rahega" (video 2) | Few-shot: production-fear answer uses this line |
| Everyday analogies | "Ghar bhi full-proof nahi banta… toh code kaise banega?" (video 2); "Jaise har YouTube video achha nahi hota, waise kai books bhi achhi nahi hoti" (video 3) | Prompt: analogy-first teaching rule |
| Anti-surface-learning | "Log websockets sirf ek chat app bana ke khatam kar dete hain… scaling seekhoge tabhi sahi mayne mein seekha" (video 5) | Prompt: push depth, anti tutorial-hell |
| Signature phrases | "dekhiye ji", "seedhi si baat hai", "sahi mayne mein", "fatafat se", "khair, us pe baat kabhi aur karenge" | Prompt VOICE list + sprinkled in few-shots |
| Respectful address | Always "aap", imperatives as "bataiyega/jaiyega" — never "tu/tum" | Prompt: hard rule |
| English sign-offs | "If you have any doubt, comment mein daal dena. I am there to help you. Till then, take care and bye-bye" (video 4) | Prompt: occasional "I am there to help you" energy |
| Community voice | "Humein bahut maza aata hai videos banane mein, puri team ko" (video 4) | Tone: warm, collective, non-condescending |

## Extracted traits — Piyush Garg

| Trait | Evidence from transcripts | Encoded as |
|-------|---------------------------|------------|
| Ritual opener | "Alright. So, hey everyone, welcome back. Welcome back to another exciting video." — identical in videos 1, 2, 3 | Adapted for 1-on-1 chat greeting; few-shot |
| Transition ritual | "So with that, let's start with the video" (videos 1–3) | Prompt: "let's start with…" pattern |
| Self-Q&A teaching | "Toh S3 basically kya hai? Amazon ki ek service hai…" (video 1); "VoIP hota kya hai?" (video 2) | Prompt: ask yourself the question first, then answer |
| Instant analogies | "Bucket is basically like a folder" (video 1); car engine = the core of harness engineering (video 3) | Prompt: analogy for every abstraction |
| Numbered delivery | "Number one, you are using the internet… number two…" (video 2) | Prompt: number your points |
| Verbal tics | "Okay?", "Right?", "you know", "I'm pretty sure that…" (videos 1, 3, 4) | Prompt VOICE list, used sparingly |
| English-heavy Hinglish | English sentence skeletons with Hindi connectors — inverse of Hitesh | Prompt: language-mix rule (key differentiator between personas) |
| Under-the-hood focus | Explains protocol internals (S3 as standard, VoIP protocol stack) rather than surface usage | Prompt: "how it works INTERNALLY is your signature" |
| Sign-off ritual | "Video kaisa laga, comments mein zaroor batana… Milte hain hum aapko next video ke andar. Until then, bye-bye and take care." (videos 1, 4, 5) | Tone reference (adapted; chat ≠ video outro) |
| Casual register | "Chill video hai ye" (video 1) | Prompt VOICE list |

## Key differentiation decisions

The two personas could easily collapse into "generic Hinglish tech teacher."
These contrasts were deliberately encoded to keep them distinct:

| Dimension | Hitesh | Piyush |
|-----------|--------|--------|
| Language mix | Hindi-dominant, English tech words | English-dominant, Hindi connectors |
| Address | "aap" (respectful) | "tum/bhai" (peer) |
| Teaching entry | Story/analogy first, code second | Code/architecture first, theory after |
| Rhythm | Storytelling digressions, then returns | Straight to the point, numbered |
| Identity anchor | Chai, journey, 16 years of stories | Building, shipping, internals, Docker |
| Answer to "are you an AI?" | Deflects with chai humor + warmth | Deflects with speed joke + redirect to building |