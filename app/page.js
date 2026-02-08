"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("summary");

  const generateContent = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, mode })
    });

    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>MAX AI Study System</h1>

      <textarea
        placeholder="Paste your notes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: 150 }}
      />

      <br /><br />

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="summary">Summary</option>
        <option value="quiz">Quiz</option>
        <option value="flashcards">Flashcards</option>
        <option value="mindmap">Mind Map</option>
        <option value="slides">Slide Deck</option>
      </select>

      <br /><br />

      <button onClick={generateContent}>
        Generate
      </button>

      <pre style={{ marginTop: 20 }}>
        {output}
      </pre>
    </div>
  );
}
