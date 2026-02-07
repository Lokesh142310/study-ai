"use client";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!files.length) return alert("Upload files first");

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data.result || data.error);
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>AI Study Generator</h1>

      <input
        type="file"
        multiple
        accept=".pdf,.docx"
        onChange={(e) => setFiles([...e.target.files])}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {loading ? "Generating..." : "Generate Notes"}
      </button>

      <pre style={{ marginTop: 30, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </main>
  );
}
