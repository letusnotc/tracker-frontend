// import React from "react";

// export default function ActivityLog({ activity }) {
//   if (!activity || activity.length === 0) return <p>No activity yet.</p>;

//   return (
//     <div
//       style={{
//         maxHeight: 220,
//         overflowY: "auto",
//         border: "1px solid #ddd",
//         padding: 10,
//         borderRadius: 4
//       }}
//     >
//       {activity.map((a) => (
//         <div key={a._id} style={{ marginBottom: 6, fontSize: 13 }}>
//           <div style={{ color: "#555" }}>
//             {new Date(a.createdAt).toLocaleTimeString()} — {a.message}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// ActivityLog.jsx
import React from "react";

export default function ActivityLog({ activity }) {
  if (!activity || activity.length === 0)
    return (
      <p style={{ fontSize: 13, color: "#777" }}>No activity yet.</p>
    );

  return (
    <div
      style={{
        maxHeight: 210,
        overflowY: "auto",
        paddingRight: 4,
      }}
    >
      {activity.map((a) => (
        <div
          key={a._id}
          style={{
            marginBottom: 6,
            fontSize: 12,
            padding: "6px 10px",
            borderRadius: 999,
            background: "rgba(248, 240, 255, 0.9)",
            color: "#4b2b7b",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 10, opacity: 0.8 }}>•</span>
          <span style={{ opacity: 0.8 }}>
            {new Date(a.createdAt).toLocaleTimeString()} — {a.message}
          </span>
        </div>
      ))}
    </div>
  );
}
