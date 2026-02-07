export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "No text provided" });
  }

  // Temporary fake AI response
  const summary = "AI summary of: " + text.substring(0, 100);

  res.status(200).json({ result: summary });
}
