import { useState, useEffect, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function useChat(personaId) {
  const storageKey = `chat_${personaId}`;   // separate history per persona

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  // One shared path to the backend for send + retry
  const deliver = useCallback(
    async (history) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ personaId, messages: history }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMessages([...history, { role: "assistant", content: data.reply }]);
      } catch {
        setMessages([...history, { role: "assistant", content: "", error: true }]);
      } finally {
        setLoading(false);
      }
    },
    [personaId]
  );

  const sendMessage = useCallback(
    (text) => {
      const next = [...messages, { role: "user", content: text }];
      setMessages(next);   // optimistic: user's bubble appears instantly
      deliver(next);
    },
    [messages, deliver]
  );

  // Remove the trailing error bubble and resend the same history
  const retry = useCallback(() => {
    const history = messages.filter((m, i) => !(m.error && i === messages.length - 1));
    setMessages(history);
    deliver(history);
  }, [messages, deliver]);

  const clearChat = () => setMessages([]);

  return { messages, loading, sendMessage, retry, clearChat };
}