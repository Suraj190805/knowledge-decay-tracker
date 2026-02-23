import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Register response:", data);

    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    alert("Account Created Successfully!");
    navigate("/login");

  } catch (err) {
    console.error("Register error:", err);
    alert(err.message);
  }
};

  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.title}>Create Account</h2>
      <p style={styles.subtitle}>
        Join us and start tracking your learning journey.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register Now
        </button>
      </form>

      <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#6C63FF", cursor: "pointer", fontWeight: "600" }}
        >
          Login here
        </span>
      </p>
    </div>
  </div>
);
}

const styles = {
 container: {
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #6C63FF, #8E2DE2)",
},

  card: {
    background: "#fff",
    padding: "50px",
    borderRadius: "15px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  title: {
    marginBottom: "10px",
  },

  subtitle: {
    marginBottom: "30px",
    color: "#666",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#f5f5f5",   // light grey
  color: "#000",                // black text
  fontSize: "14px",
  outline: "none",
},

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(to right, #6C63FF, #8E2DE2)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};