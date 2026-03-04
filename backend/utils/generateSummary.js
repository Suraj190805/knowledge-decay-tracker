const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateSummaryFromText(text) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You summarize academic content clearly. Provide:\n\n1) A short easy-to-understand summary\n2) Important key bullet points\n3) Keep it structured and clean."
      },
      {
        role: "user",
        content: text.slice(0, 12000)
      }
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
}

module.exports = generateSummaryFromText;