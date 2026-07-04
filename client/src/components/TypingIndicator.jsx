import { PERSONAS } from "../personas.meta";

export default function TypingIndicator({ personaId }) {
  const p = PERSONAS[personaId];
  return (
    <div className="TypingIndicator">
      <span className={`avatar mav av-${personaId[0]}`}>
        <img src={p.photo} alt="" onError={(e) => (e.target.style.display = "none")} />
        <span className="avfallback">{p.initials}</span>
      </span>
      <div className="dots">
        <i className="dot"></i>
        <i className="dot" style={{ animationDelay: ".16s" }}></i>
        <i className="dot" style={{ animationDelay: ".32s" }}></i>
      </div>
    </div>
  );
}

