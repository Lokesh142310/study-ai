export async function POST(req) {
  const { text, mode } = await req.json();

  let result = "";

  if (mode === "summary") {
    result = "Summary:\n\n" + text.slice(0, 300) + "...";
  }

  if (mode === "quiz") {
    result = "Quiz:\n\n1. What is the main idea?\n2. Explain key concepts.";
  }

  if (mode === "flashcards") {
    result = "Flashcards:\n\nQ: Key concept?\nA: Explanation.";
  }

  if (mode === "mindmap") {
    result = "Mindmap:\nMain Topic\n  ↳ Subtopic 1\n  ↳ Subtopic 2";
  }

  if (mode === "slides") {
    result = "Slide 1: Title\nSlide 2: Main Points\nSlide 3: Conclusion";
  }

  return Response.json({ result });
}
