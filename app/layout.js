"use client";
import { useState } from "react";

export default function Home() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setOutput("Generating...");

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": file.type
      },
      body: file
    });

    const data = await res.json();
    setOutput(
