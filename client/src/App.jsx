import { useState } from "react";
import PersonaSwitcher from "./components/PersonaSwitcher";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

export default function App() {
  const [active, setActive] = useState(
    () => localStorage.getItem("activePersona") || "hitesh"
  );

  const switchPersona = (id) => {
    setActive(id);
    localStorage.setItem("activePersona", id);
  };

  return (
    <div className={`app ${active === "piyush" ? "persona-piyush" : ""}`}>
      <div className="ambwrap">
        <div className="amb amb-h"><i className="blob"></i><i className="blob b2"></i></div>
        <div className="amb amb-p"></div>
        <div className="tex-p"></div>
      </div>

      <div className="frame">
        <header className="TopBar">
          <span className="mark"><i className="dotA"></i><i className="dotB"></i></span>
          <h1 className="brand">Persona AI</h1>
          <span className="tagline">Chat with India's favourite tech mentors</span>
        </header>

        <PersonaSwitcher active={active} onSwitch={switchPersona} />
        <ChatWindow key={active} personaId={active} />

        <footer className="sitefoot">
          <div className="social">
            <a
              className="slink"
              href="https://www.linkedin.com/in/ansh-verma-833168362/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ansh Verma on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a
              className="slink"
              href="https://x.com/anshverma001"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ansh Verma on X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z" />
              </svg>
            </a>
          </div>
          <p className="legal">
            AI personas for learning & fun — not affiliated with the real educators
          </p>
        </footer>
      </div>
    </div>
  );
}