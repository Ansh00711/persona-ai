import { PERSONAS } from "../personas.meta";

export default function PersonaSwitcher({ active, onSwitch }) {
  return (
    <nav className="PersonaSwitcher" aria-label="Choose persona">
      {Object.entries(PERSONAS).map(([id, p]) => (
        <button
          key={id}
          className={`btn0 pcard pcard-${id[0]} ${active === id ? "on" : ""}`}
          onClick={() => onSwitch(id)}
          aria-pressed={active === id}
        >
          <span className={`avatar av-${id[0]}`}>
            <img src={p.photo} alt={p.name} onError={(e) => (e.target.style.display = "none")} />
            <span className="avfallback">{p.initials}</span>
            <i className="abadge">{p.emoji}</i>
          </span>
          <span className="pinfo">
            <span className="pname">{p.name}</span>
            <span className="pdesc">{p.tagline}</span>
          </span>
          <span className="pon"></span>
        </button>
      ))}
    </nav>
  );
}