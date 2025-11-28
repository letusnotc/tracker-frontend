// import React, { useEffect, useState } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";
// import TrackerDashboard from "./components/TrackerDashboard";
// import Navbar from "./components/Navbar";
// import ProfilePage from "./components/ProfilePage";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const raw = localStorage.getItem("user");
//     const theme = localStorage.getItem("theme");
//     if (raw) setUser(JSON.parse(raw));
//     if (theme === "dark") {
//       setDarkMode(true);
//       document.body.classList.add("dark");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const toggleTheme = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     if (newMode) {
//       document.body.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   return (
//     <div>
//       <Navbar
//         user={user}
//         onLogout={handleLogout}
//         darkMode={darkMode}
//         onToggleTheme={toggleTheme}
//       />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             user ? (
//               <TrackerDashboard user={user} />
//             ) : (
//               <LoginPage onLogin={setUser} />
//             )
//           }
//         />
//         <Route path="/login" element={<LoginPage onLogin={setUser} />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </div>
//   );
// }

// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TrackerDashboard from "./components/TrackerDashboard";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const theme = localStorage.getItem("theme");
    if (raw) setUser(JSON.parse(raw));
    if (theme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#1c1145 0%,#28146a 30%,#fcb8ff 100%)",
        fontFamily: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Top navbar only for auth / profile pages.
          Dashboard itself has its own full layout. */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <TrackerDashboard user={user} />
            ) : (
              <LoginPage onLogin={setUser} />
            )
          }
        />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
