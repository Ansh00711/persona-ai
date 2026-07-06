const res = await fetch("http://localhost:3001/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    personaId: "hitesh",
    messages: [{ role: "user", content: "kall tak toh meri jarurat nahi padi, aaj pad gayi?" }],
  }),
});
console.log(await res.json());