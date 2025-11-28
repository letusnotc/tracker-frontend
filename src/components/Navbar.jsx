// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar({ user, onLogout, darkMode, onToggleTheme }) {
//   return (
//     <nav
//       style={{
//         padding: "12px 20px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         backgroundColor: "var(--bg-nav)",
//         color: "var(--text-main)",
//         borderBottom: "1px solid var(--border-color)",
//         position: "sticky",
//         top: 0,
//         zIndex: 100,
//       }}
//     >
//       {/* Left: App Title */}
//       <div>
//         <Link
//           to="/"
//           style={{
//             textDecoration: "none",
//             color: "var(--text-main)",
//             fontSize: "18px",
//             fontWeight: "bold",
//           }}
//         >
//           Mini BitTorrent Tracker
//         </Link>
//       </div>

//       {/* Right side */}
//       <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
//         {/* Theme Toggle */}
//         <button
//           onClick={onToggleTheme}
//           style={{
//             padding: "6px 10px",
//             cursor: "pointer",
//             borderRadius: "6px",
//             border: "1px solid var(--border-color)",
//             backgroundColor: "var(--bg-nav)",
//             color: "var(--text-main)",
//           }}
//         >
//           {darkMode ? "☀️ Light" : "🌙 Dark"}
//         </button>

//         {/* Auth Links */}
//         {user ? (
//           <>
//             <Link
//               to="/profile"
//               style={{
//                 textDecoration: "none",
//                 color: "var(--text-main)",
//                 fontWeight: "500",
//               }}
//             >
//               {user.name}
//             </Link>

//             <button
//               onClick={onLogout}
//               style={{
//                 padding: "6px 10px",
//                 cursor: "pointer",
//                 borderRadius: "6px",
//                 border: "1px solid var(--border-color)",
//                 backgroundColor: "var(--bg-nav)",
//                 color: "var(--text-main)",
//               }}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               style={{
//                 textDecoration: "none",
//                 color: "var(--text-main)",
//                 marginRight: "10px",
//               }}
//             >
//               Login
//             </Link>

//             <Link
//               to="/register"
//               style={{
//                 textDecoration: "none",
//                 color: "var(--text-main)",
//               }}
//             >
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
// Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout, darkMode, onToggleTheme }) {
  const location = useLocation();

  // Hide navbar on the main dashboard when logged in (dashboard has its own header/sidebar)
  const isDashboard = user && location.pathname === "/";

  if (isDashboard) return null;

  return (
    <nav
      style={{
        padding: "10px 22px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Mini BitTorrent Tracker
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onToggleTheme}
          style={{
            padding: "6px 10px",
            cursor: "pointer",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.4)",
            background: "transparent",
            color: "#fff",
            fontSize: 12,
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {user ? (
          <>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {user.name}
            </Link>
            <button
              onClick={onLogout}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: 999,
                border: "none",
                background:
                  "linear-gradient(135deg,#ff7ad9,#ff5ca8)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#fff", marginRight: 10 }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
