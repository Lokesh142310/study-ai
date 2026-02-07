import pdf from "pdf-parse";
import mammoth from "mammoth";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFile(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", async () => {
      const buffer = Buffer.concat(chunks);

      try {
        let text = "";

        if (req.headers["content-type"].includes("pdf")) {
          const data = await pdf(buffer);
          text = data.text;
        } else {
          const result = await mammoth.extractRawText({ buffer });
          text = result.value;
        }

        resolve(text);
      } catch (err) {
        reject(err);
      }
    });
  });
}

function generateExamContent(content) {
  return `
📘 SMART STUDY NOTES

${content.substring(0, 1500)}

----------------------------------------

🧠 IMPORTANT DEFINITIONS:
- Key concepts extracted from text
- Focus on exam keywords

----------------------------------------

❓ IMPORTANT QUESTIONS:
1. Explain the main concept in detail.
2. Define important terms.
3. Write short notes on core topics.
4. Give two differences related to topic.
5. Write long answer question from chapter.

----------------------------------------

📝 5 MCQs:
1. What is the main concept?
   A) Option 1
   B) Option 2
   C) Option 3
   D) Option 4

----------------------------------------

⚡ QUICK REVISION:
- 5 Bullet point rapid revision
`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const text = await parseFile(req);
    const output = generateExamContent(text);

    res.status(200).json({ result: output });
  } catch (error) {
    res.status(500).json({ error: "File processing failed" });
  }
}
