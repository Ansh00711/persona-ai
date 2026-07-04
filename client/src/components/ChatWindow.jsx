import { useState, useRef, useEffect } from "react";
import { useChat } from "../hooks/useChat";
import { PERSONAS } from "../personas.meta";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ personaId }) {
  const { messages, loading, sendMessage, retry, clearChat } = useChat(personaId);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const p = PERSONAS[personaId];

  // Auto-scroll to the invisible div below the last message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    sendMessage(text);
  };

  return (
    <main className="ChatWindow">
      {messages.length > 0 && (
        <button className="btn0 newchat" onClick={clearChat}>
          <span className="nicon">↺</span>New chat
        </button>
      )}

      <div className="msgs">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className={`avatar wavatar av-${personaId[0]}`}>
              <img src={p.photo} alt={p.name} onError={(e) => (e.target.style.display = "none")} />
              <span className="avfallback">{p.initials}</span>
              <span className="steam">
                <i className="sline"></i>
                <i className="sline" style={{ height: 19, animationDelay: ".45s" }}></i>
                <i className="sline" style={{ animationDelay: ".9s" }}></i>
              </span>
              <span className="ping"></span>
              <i className="wbadge">{p.emoji}</i>
            </div>
            <h2 className="greet">{p.greeting}</h2>
            <p className="greetsub">{p.sub}</p>
            <span className="chipslabel">{p.emoji} · try asking</span>
            <div className="chips">
              {p.chips.map((c) => (
                <button key={c} className="btn0 chip" onClick={() => sendMessage(c)}>{c}</button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="daydiv">today</div>
            {messages.map((m, i) => (
              <Message key={i} msg={m} personaId={personaId} onRetry={retry} />
            ))}
          </>
        )}
        {loading && <TypingIndicator personaId={personaId} />}
        <div ref={bottomRef} />
      </div>

      <form className="composer" onSubmit={handleSend}>
        <div className="inwrap">
          <input
            className="cinput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={p.placeholder}
            aria-label="Message"
          />
          <button type="submit" className={`btn0 send ${loading || !input.trim() ? "off" : ""}`} aria-label="Send">↑</button>
        </div>
      </form>
    </main>
  );
}