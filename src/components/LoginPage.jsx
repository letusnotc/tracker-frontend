// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api";

// export default function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       onLogin(res.data.user);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "40px auto" }}>
//       <h2>Login</h2>
//       <form onSubmit={submit}>
//         <div>
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
//           Login
//         </button>
//       </form>
//       <p style={{ marginTop: 10 }}>
//         No account? <Link to="/register">Register</Link>
//       </p>
//     </div>
//   );
// }


// LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          width: 360,
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
          Welcome back 👋
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#7b6a9b",
            marginBottom: 18,
          }}
        >
          Log in to manage your BitTorrent tracker dashboard.
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                "linear-gradient(135deg,#ff7ad9,#ff5ca8,#ff4c93)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(255,92,168,0.5)",
            }}
          >
            Login
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
          No account?{" "}
          <Link to="/register" style={{ color: "#ec4899", fontWeight: 500 }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
