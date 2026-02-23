import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/dashNavbar";

export default function Dashboard() {
  const [learning, setLearning] = useState([]);
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [strength, setStrength] = useState(50);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadSubject, setUploadSubject] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
const [files, setFiles] = useState([]);
const [activeSubject, setActiveSubject] = useState(null);
 const fetchFiles = async (subject) => {
  try {
    const res = await fetch(`http://localhost:4000/api/files/${subject}`);
    const data = await res.json();

    setFiles(data);
    setActiveSubject(subject);
  } catch (err) {
    console.error("Error fetching files:", err);
  }
};
const handleFileChange = (e) => {
setSelectedFile(e.target.files[0]);
};

const handleDrop = (e) => {
  e.preventDefault();
  setSelectedFile(e.dataTransfer.files[0]);  // only first file
};
const handleDragOver = (e) => {
  e.preventDefault();
};

const handleUpload = async () => {
  if (!selectedFile || !uploadSubject) {
    alert("Please select subject and file");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("subject", uploadSubject);

  try {
    await api.post("/files", formData);

    alert("File uploaded successfully 🚀");

    setSelectedFile(null);   // reset file
    setUploadSubject("");    // reset subject
  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
  }
};

  const fetchLearning = async () => {
    try {
      const res = await api.get("/learning");
      setLearning(res.data);
    } catch {
      setError("Failed to load learning data");
    }
  };

  useEffect(() => {
    fetchLearning();
  }, []);

  const handleAddTopic = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");

    try {
      await api.post("/learning", {
        topic,
        strength,
        decayRate: 0.2,
      });

      setTopic("");
      setStrength(50);
      fetchLearning();
    } catch {
      setError("Failed to add topic");
    } finally {
      setLoading(false);
    }
  };
  


  const handleRevise = async (id) => {
    try {
      await api.post(`/revision/${id}`);
      fetchLearning();
    } catch {
      setError("Failed to revise topic");
    }
  };

  return (
    <>
      <Navbar />

      <main
        style={{
         padding: "110px 40px 40px 40px",
    minHeight: "100vh",
    width: "100%",
    background: "#f8fafc",
    boxSizing: "border-box",
        }}
        
      >
        
        {/* 🔥 CENTER WRAPPER ADDED HERE */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Centered Title */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              📚 Learning Dashboard
            </h1>

            <p style={{ color: "#6b7280" }}>
              Track your learning & fight knowledge decay
            </p>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          

          {/* Add Topic Card */}
          <section
            style={{
              maxWidth: "900px",
              margin: "0 auto 60px auto",
              borderRadius: "16px",
              padding: "28px",
              background: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >   
             
          {/* 🔥 ADD UPLOAD SECTION HERE */}
      <h3>Upload Study Material</h3>

      <input
        type="text"
        placeholder="Enter subject (e.g. python)"
        value={uploadSubject}

        onChange={(e) => setUploadSubject(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px" }}
      />
             <div
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onClick={() => document.getElementById("fileInput").click()}
  style={{
    border: "2px dashed #cbd5e1",
    borderRadius: "12px",
    padding: "40px",
    textAlign: "center",
    background: "#f8fafc",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  <div style={{ fontSize: "48px", marginBottom: "10px" }}>
    ☁️
  </div>

  <h3 style={{ margin: 0 }}>Upload Files</h3>
  <p style={{ color: "#94a3b8" }}>
    Select and upload your study material
  </p>

 {selectedFile && (
  <p style={{ marginTop: "15px", color: "#2563eb" }}>
    Selected: {selectedFile.name}
  </p>
)}

  <input
    id="fileInput"
  type="file"
  multiple
  style={{ display: "none" }}
  onChange={handleFileChange}
  />
  <button
  onClick={handleUpload}
  style={{
    marginTop: "15px",
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Upload File
</button>
</div>
          
            <h3 style={{ marginBottom: "16px", fontSize: "20px" }}>
              ➕ Add New Topic
            </h3>

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic name (e.g. Binary Search)"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "16px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />

            <label style={{ display: "block", marginBottom: "6px" }}>
              Initial Strength: <strong>{strength}</strong>
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={strength}
              onChange={(e) => setStrength(Number(e.target.value))}
              style={{ width: "100%" }}
            />

            <button
              onClick={handleAddTopic}
              disabled={loading}
              style={{
                marginTop: "18px",
                padding: "12px 20px",
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {loading ? "Adding..." : "Add Topic"}
            </button>
          </section>

          {/* Empty State */}
          {learning.length === 0 && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                background: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <h3>No topics yet 🚀</h3>
              <p style={{ color: "#6b7280" }}>
                Add your first topic to start tracking knowledge decay.
              </p>
            </div>
          )}

          {/* 3 Column Grid */}
          {learning.length > 0 && (
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "30px",
              }}
            >
              {learning.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "16px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <h3 style={{ marginBottom: "10px" }}>{item.topic}</h3>

                  <div
                    style={{
                      height: "10px",
                      background: "#e5e7eb",
                      borderRadius: "6px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.strength}%`,
                        height: "100%",
                        background: "#2563eb",
                        borderRadius: "6px",
                      }}
                    />
                  </div>

                  <p style={{ marginBottom: "4px" }}>
                    <strong>Strength:</strong> {item.strength}
                  </p>
                  <p style={{ marginBottom: "10px" }}>
                    <strong>Decay Score:</strong> {item.decayScore}
                  </p>

                  <button
                    onClick={() => handleRevise(item._id)}
                    style={{
                      padding: "8px 14px",
                      background: "#111827",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Revise 🔁
                  </button>
                <button
  onClick={() => navigate(`/subject/${item.topic}`)}
>
  View Files
</button>
{activeSubject === item.topic && files.length > 0 && (
  <ul style={{ marginTop: "10px" }}>
    {files.map((file) => (
      <li key={file._id}>
        {file.originalname}
        <a
          href={`http://localhost:4000/uploads/${file.filename}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "10px" }}
        >
          View
        </a>
      </li>
    ))}
  </ul>
)}
                </div>
              ))}
            </section>
          )}
        
        </div>
      </main>
    </>
  );
}