// import React, { useEffect, useState } from "react";
// import api from "../api";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await api.get("/users/me");
//         setProfile(res.data);
//       } catch (err) {
//         setError("Failed to load profile");
//       }
//     };
//     load();
//   }, []);

//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!profile) return <p>Loading profile...</p>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>User Profile</h2>
//       <p>
//         <strong>Name:</strong> {profile.name}
//       </p>
//       <p>
//         <strong>Email:</strong> {profile.email}
//       </p>
//       {profile.rollNumber && (
//         <p>
//           <strong>Roll Number:</strong> {profile.rollNumber}
//         </p>
//       )}
//       <h3 style={{ marginTop: 20 }}>Stats</h3>
//       <ul>
//         <li>Files created: {profile.stats.filesCreated}</li>
//         <li>Peers simulated: {profile.stats.peersSimulated}</li>
//       </ul>
//     </div>
//   );
// }

// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/users/me");
        setProfile(res.data);
      } catch (err) {
        setError("Failed to load profile");
      }
    };
    load();
  }, []);

  if (error)
    return (
      <p style={{ color: "red", padding: 20 }}>
        {error}
      </p>
    );
  if (!profile) return <p style={{ padding: 20 }}>Loading profile...</p>;

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
          width: 420,
          borderRadius: 28,
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 24px 50px rgba(10, 5, 35, 0.65)",
          padding: 26,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%,#ffe6ff,#ff9cf2,#ff5ca8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#3b0b68",
            }}
          >
            {profile.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                color: "#301553",
              }}
            >
              {profile.name}
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: "#7b6a9b",
              }}
            >
              {profile.email}
            </p>
          </div>
        </div>

        {profile.rollNumber && (
          <p style={{ fontSize: 13, marginBottom: 10 }}>
            <strong>Roll Number:</strong> {profile.rollNumber}
          </p>
        )}

        <h3
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontSize: 15,
            color: "#3d1d6f",
          }}
        >
          Usage stats
        </h3>
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            fontSize: 13,
            color: "#5b418f",
          }}
        >
          <li>Files created: {profile.stats.filesCreated}</li>
          <li>Peers simulated: {profile.stats.peersSimulated}</li>
        </ul>
      </div>
    </div>
  );
}
