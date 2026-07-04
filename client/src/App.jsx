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

        <p className="legal">
          AI personas for learning & fun — not affiliated with the real educators
        </p>
      </div>
    </div>
  );
}