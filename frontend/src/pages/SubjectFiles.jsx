import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/dashNavbar";

export default function SubjectFiles() {
  const { subjectName } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/files/${subjectName}`)
      .then(res => res.json())
      .then(data => setFiles(data))
      .catch(err => console.error("Error fetching files:", err));
  }, [subjectName]);

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
                </li>
              ))}
            </ul>
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