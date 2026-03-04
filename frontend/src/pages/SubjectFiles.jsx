import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/dashNavbar";
import api from "../api/api";
 export default function SubjectFiles() {

  const { subjectName } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await api.get(`/files/${subjectName}`);
        setFiles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, [subjectName]);

 const handleGenerateQuiz = async (file) => {
  try {
    const res = await api.post(
      `/files/generate-quiz/${file.filename}`
    );

    console.log("Quiz response:", res.data);

    navigate("/quiz", {
      state: {
        quiz: res.data.quiz,
        subjectName,
        pdfName: file.originalname,
      },
    });

  } catch (err) {
    console.error("Quiz error:", err);
  }
};
 
  
  const handleSubmitQuiz = () => {
  let correct = 0;

  quiz.forEach((q, index) => {
    if (selectedAnswers[index] === q.answer) {
      correct++;
    }
  });

  setScore(correct);
};

const handleDelete = async (filename) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this file?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/files/delete/${filename}`);

    // Refresh files list
    setFiles(files.filter((file) => file.filename !== filename));
  } catch (err) {
    console.error("Delete error:", err);
  }
};
const handleSummarize = async (filename, pdfName) => {
  try {
    const res = await api.post(`/files/summarize/${filename}`);

    navigate("/summary", {
      state: {
        summary: res.data.summary,
        subjectName,
        pdfName
      }
    });

  } catch (err) {
    console.error("Summary error:", err);
  }
};


  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          padding: "60px 20px",
          background: "#f8fafc",
          textAlign: "center",
        }}
      >
        {/* Subject Title */}
        <h1 style={{ marginBottom: "40px", fontSize: "32px" }}>
          {subjectName.toUpperCase()}
        </h1>

        {/* Files List */}
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0 }}>
              {files.map(file => (
                
                <li
                  key={file._id}
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {file.originalname}

                 <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

  {/* DELETE ICON */}
  <span
    onClick={() => handleDelete(file.filename)}
    style={{
      cursor: "pointer",
      fontSize: "18px",
      color: "red"
    }}
    title="Delete file"
  >
    🗑
  </span>

  {/* VIEW BUTTON */}
  <a
    href={`http://localhost:4000/uploads/${file.filename}`}
    target="_blank"
    rel="noreferrer"
    style={{
      padding: "6px 12px",
      background: "#111827",
      color: "#ffffff",
      borderRadius: "6px",
      textDecoration: "none",
      fontSize: "14px",
    }}
  >
    View
  </a>
    <button
  onClick={() => handleSummarize(file.filename, file.originalname)}
  style={{ marginLeft: "10px" }}
>
  Summarize
</button>
  {/* GENERATE QUIZ */}
  <button
    onClick={() => handleGenerateQuiz(file)}
    style={{ marginLeft: "10px" }}
  >
    Generate Quiz
  </button>

</div>
                </li>
              ))}
            </ul>
            {loadingQuiz && <p>Generating quiz...</p>}

{quiz.length > 0 && (
  <div style={{ marginTop: "30px" }}>
    <h2>Quiz</h2>

    {quiz.map((q, index) => (
      <div key={index} style={{ marginBottom: "20px" }}>
        <p><strong>Q{index + 1}:</strong> {q.question}</p>

        {q.options.map((option, i) => (
          <div key={i}>
            <label>
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
          </div>
        ))}
      </div>
    ))}

   <button
  onClick={() =>
    handleGenerateQuiz(file.filename, file.originalname)
  }
>
  Generate Quiz
</button>
    {score !== null && (
  <h3>Your Score: {score} / {quiz.length}</h3>
)}
  </div>
)}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "40px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </>
  );
}