const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateQuizFromText(text) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You generate academic multiple choice quiz questions.

Rules:
- Generate exactly 5 questions.
- Each question must have 4 options.
- Provide correct answer.
- Respond ONLY in valid JSON format.
- Format:

[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "Correct option text"
  }
]
`
      },
      {
        role: "user",
        content: text.slice(0, 10000)
      }
    ],
    temperature: 0.3,
  });

  const content = response.choices[0].message.content;

  // Extract JSON safely
  const jsonStart = content.indexOf("[");
  const jsonEnd = content.lastIndexOf("]") + 1;

  const jsonString = content.substring(jsonStart, jsonEnd);

  return JSON.parse(jsonString);
}

module.exports = generateQuizFromText;