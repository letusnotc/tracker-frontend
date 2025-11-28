// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [rollNumber, setRollNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await api.post("/auth/register", {
//         name,
//         rollNumber,
//         email,
//         password
//       });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "40px auto" }}>
//       <h2>Register</h2>
//       <form onSubmit={submit}>
//         <div>
//           <label>Name</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginTop: 10 }}>
//           <label>Roll Number (optional)</label>
//           <input
//             value={rollNumber}
//             onChange={(e) => setRollNumber(e.target.value)}
//           />
//         </div>
//         <div style={{ marginTop: 10 }}>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div style={{ marginTop: 10 }}>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && (
//           <div style={{ color: "red", marginTop: 10 }}>{error}</div>
//         )}
//         <button type="submit" style={{ marginTop: 15 }}>
//           Register
//         </button>
//       </form>
//       <p style={{ marginTop: 10 }}>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// }
// RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", {
        name,
        rollNumber,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 380,
          borderRadius: 28,
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 24px 50px rgba(10, 5, 35, 0.65)",
          padding: 26,
        }}
      >
        <h2
          style={{
            marginTop: 0,
            textAlign: "center",
            color: "#301553",
          }}
        >
          Create account ✨
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#7b6a9b",
            marginBottom: 18,
          }}
        >
          Register to start using the BitTorrent tracker dashboard.
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "#4b2b7b" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #e3d9ff",
                padding: "8px 12px",
                fontSize: 13,
                outline: "none",
                marginTop: 4,
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#4b2b7b" }}>
              Roll Number (optional)
            </label>
            <input
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #e3d9ff",
                padding: "8px 12px",
                fontSize: 13,
                outline: "none",
                marginTop: 4,
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#4b2b7b" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #e3d9ff",
                padding: "8px 12px",
                fontSize: 13,
                outline: "none",
                marginTop: 4,
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#4b2b7b" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                borderRadius: 999,
                border: "1px solid #e3d9ff",
                padding: "8px 12px",
                fontSize: 13,
                outline: "none",
                marginTop: 4,
              }}
            />
          </div>
          {error && (
            <div
              style={{
                color: "#dc2626",
                fontSize: 12,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              marginTop: 6,
              borderRadius: 999,
              border: "none",
              padding: "10px 14px",
              background:
                "linear-gradient(135deg,#8b5cf6,#6366f1,#ec4899)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: "0 10px 22px rgba(129, 140, 248,0.5)",
            }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            marginTop: 14,
            fontSize: 13,
            textAlign: "center",
            color: "#6b5c8a",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ec4899", fontWeight: 500 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
