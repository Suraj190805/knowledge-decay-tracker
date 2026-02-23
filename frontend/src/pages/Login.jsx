import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
export default function Login() {



  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      identifier,
      password,
    });

    localStorage.setItem("token", res.data.token);

    navigate("/");
  } catch (err) {
    console.error(err);
    setError(
      err.response?.data?.message || "Invalid credentials"
    );
  }
};

  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:4000/api/auth/google";
};

const handleFacebookLogin = () => {
  window.location.href = "http://localhost:4000/api/auth/facebook";
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Side - Login Form */}
        <div style={styles.leftPanel}>
          <div style={styles.formWrapper}>
            <h1 style={styles.title}>LOGIN</h1>
            <p style={styles.subtitle}>Track smarter. Learn better. Remember longer.</p>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <svg
                  style={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="Username or Email "
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputWrapper}>
                <svg
                  style={styles.icon}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <button onClick={handleLogin} style={styles.loginButton}>
              Login Now
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerText}>	Or continue with</span>
            </div>

            <div style={styles.socialButtons}>
              <button onClick={handleGoogleLogin} style={styles.socialButton}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span style={styles.socialText}>
                  Login with <strong>google</strong>
                </span>
              </button>

              <button onClick={handleFacebookLogin} style={styles.socialButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span style={styles.socialText}>
                  Login with <strong>Facebook</strong>
                </span>
              </button>
              <div className="register-section">
  <p>
    Don't have an Account?{" "}
    <span
      onClick={() => navigate("/register")}
      style={{ color: "#6C63FF", cursor: "pointer", fontWeight: "600" }}
    >
      Create One
    </span>
  </p>
</div>
            </div>
          </div>
        </div>

        {/* Right Side - Promotional Card */}
        <div style={styles.rightPanel}>
          <div style={styles.promoCard}>
            <div style={styles.promoContent}>
              <h2 style={styles.promoTitle}>
                Track smarter. Learn better. Remember longer.!!!
              </h2>
              <div style={styles.sparkleIcon}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 5L22.5 15L20 25L17.5 15L20 5Z"
                    fill="#FFD700"
                  />
                  <path
                    d="M5 20L15 22.5L25 20L15 17.5L5 20Z"
                    fill="#FFD700"
                  />
                  <circle cx="20" cy="20" r="3" fill="#FFF" />
                </svg>
              </div>
            </div>
            <img
              src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop"
              alt="Professional woman with tablet"
              style={styles.promoImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "1200px",
    height: "700px",
    backgroundColor: "#fff",
    borderRadius: "24px",
    display: "flex",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },
  leftPanel: {
    flex: "1",
    backgroundColor: "#f8f9fc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "8px",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "40px",
  },
  error: {
    color: "#ef4444",
    fontSize: "14px",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fee2e2",
    borderRadius: "8px",
  },
  inputGroup: {
    marginBottom: "24px",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "16px",
  },
  icon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b7280",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 48px",
    fontSize: "15px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#e8ebf3",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
     caretColor: "#111827",
     color: "#111827",   
  },
  loginButton: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    marginBottom: "32px",
  },
  divider: {
    textAlign: "center",
    position: "relative",
    marginBottom: "24px",
  },
  dividerText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 20px",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "15px",
  },
  socialText: {
    color: "#374151",
  },
  rightPanel: {
    flex: "1",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    position: "relative",
    overflow: "hidden",
  },
  promoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "40px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  promoContent: {
    marginBottom: "30px",
    textAlign: "center",
  },
  promoTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1.3",
    marginBottom: "20px",
  },
  sparkleIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80px",
    height: "80px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
  promoImage: {
    width: "280px",
    height: "350px",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
  },
};
