import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { PERSONAS } from "../personas.meta";

function Avatar({ personaId }) {
  const p = PERSONAS[personaId];
  return (
    <span className={`avatar mav av-${personaId[0]}`}>
      <img src={p.photo} alt="" onError={(e) => (e.target.style.display = "none")} />
      <span className="avfallback">{p.initials}</span>
    </span>
  );
}

function CodeBlock({ className, children }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "code";
  const code = String(children).replace(/\n$/, "");

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="codewrap">
      <div className="codehead">
        <span className="codelang">{lang}</span>
        <button className="btn0 copybtn" onClick={copy}>{copied ? "✓ copied" : "copy"}</button>
      </div>
      <pre className="codepre"><code>{code}</code></pre>
    </div>
  );
}

const mdComponents = {
  code({ inline, className, children }) {
    return inline
      ? <code className="ilc">{children}</code>
      : <CodeBlock className={className}>{children}</CodeBlock>;
  },
  pre: ({ children }) => <>{children}</>,   // CodeBlock brings its own <pre>
};

export default function Message({ msg, personaId, onRetry }) {
  const isUser = msg.role === "user";
  const hasCode = !isUser && msg.content.includes("```");

  if (msg.error) {
    return (
      <div className="Message them">
        <Avatar personaId={personaId} />
        <div className="bub errbub">
          <span className="errhead"><i className="erricon">!</i>Response nahi aa paya</span>
          <span className="errtxt">Server thoda busy lag raha hai. Aapka message safe hai — ek baar phir try karein.</span>
          <button className="btn0 retry" onClick={onRetry}>↻ Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`Message ${isUser ? "me" : "them"} ${hasCode ? "wide" : ""}`}>
      {!isUser && <Avatar personaId={personaId} />}
      <div className="bub">
        {isUser ? msg.content : <ReactMarkdown components={mdComponents}>{msg.content}</ReactMarkdown>}
      </div>
    </div>
  );
}