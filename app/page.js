"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generateContent = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "40px" }}>MAX AI Study System</h1>

      <textarea
        placeholder="Paste your notes..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "80%",
          height: "150px",
          padding: "15px",
          borderRadius: "15px",
          border: "none",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.1)",
          color: "white"
        }}
      />

      <br /><br />

      <button
        onClick={generateContent}
        style={{
          padding: "12px 25px",
          borderRadius: "12px",
          border: "none",
          background: "#00f5ff",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Generate AI Study Content
      </button>

      <div style={{
        marginTop: "30px",
        padding: "20px",
        width: "80%",
        marginInline: "auto",
        borderRadius: "15px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)"
      }}>
        {output}
      </div>
    </div>
  );
}
