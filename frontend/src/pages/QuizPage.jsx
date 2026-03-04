import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
export default function QuizPage() {
  const location = useLocation();

  const quiz = location.state?.quiz || [];
  const subjectName = location.state?.subjectName || "";
  const pdfName = location.state?.pdfName || "";

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  // If quiz is missing or invalid
  if (!Array.isArray(quiz) || quiz.length === 0) {
    return <h2 style={{ padding: "40px" }}>No quiz data found.</h2>;
  }

 const handleSubmitQuiz = async () => {
  console.log("SUBMIT CLICKED");
  let correct = 0;

  quiz.forEach((q, index) => {
    if (selectedAnswers[index] === q.answer) {
      correct++;
    }
  });

  setScore(correct);

  try {
    console.log("Saving quiz attempt...");
    await api.post("/quiz/save", {
  subject: subjectName,
  pdfName,
  score: correct,
  totalQuestions: quiz.length,
});

    console.log("Quiz attempt saved");
  } catch (err) {
    console.error("Failed to save attempt", err);
  }
};

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      
      {/* SUBJECT TITLE */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
          {subjectName.toUpperCase()}
        </h1>

        <h3 style={{ color: "#666", marginTop: "10px" }}>
          {pdfName}
        </h3>
      </div>

      {/* QUESTIONS */}
      {quiz.map((q, index) => (
        <div key={index} style={{ marginBottom: "25px" }}>
          <p>
            <strong>Q{index + 1}:</strong> {q.question}
          </p>

          {q.options.map((option, i) => (
            <label key={i} style={{ display: "block" }}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() =>
                  setSelectedAnswers({
                    ...selectedAnswers,
                    [index]: option,
                  })
                }
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmitQuiz}>
  Submit Quiz
</button>

      {score !== null && (
        <h2 style={{ marginTop: "20px" }}>
          Your Score: {score} / {quiz.length}
        </h2>
      )}
    </div>
  );
}