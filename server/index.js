import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.js"; // with the other imports

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.CLIENT_URL || "").split(","),
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// api routes
app.use("/api", chatRouter); // after app.use(express.json())

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`),
);
