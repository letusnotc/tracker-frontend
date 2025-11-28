// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const COLORS = ["#4caf50", "#ff9800"]; // seeder / leecher

// export default function SeederChart({ seeders, leechers }) {
//   const data = [
//     { name: "Seeders", value: seeders || 0 },
//     { name: "Leechers", value: leechers || 0 }
//   ];

//   if (!seeders && !leechers) return <p>No peers yet.</p>;

//   return (
//     <div style={{ width: 320, height: 260 }}>
//       <PieChart width={320} height={260}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={90}
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// }
// SeederChart.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8b5cf6", "#ec4899"]; // seeder / leecher

export default function SeederChart({ seeders, leechers }) {
  const data = [
    { name: "Seeders", value: seeders || 0 },
    { name: "Leechers", value: leechers || 0 },
  ];

  if (!seeders && !leechers)
    return <p style={{ fontSize: 13, color: "#777" }}>No peers yet.</p>;

  return (
    <div
      style={{
        width: "100%",
        height: 220,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart width={260} height={220}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
