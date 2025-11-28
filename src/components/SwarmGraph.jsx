// import React, { useEffect, useRef } from "react";
// import { Network } from "vis-network";
// import "vis-network/styles/vis-network.css";

// export default function SwarmGraph({ file, peers }) {
//   const containerRef = useRef(null);
//   const networkRef = useRef(null);

//   useEffect(() => {
//     if (!file || !containerRef.current) return;

//     const nodes = [
//       {
//         id: file._id,
//         label: file.name,
//         shape: "dot",
//         size: 25,
//         color: "#1976d2",
//       }
//     ];

//     const edges = [];

//     peers.forEach((p) => {
//       nodes.push({
//         id: p._id,
//         label: p.clientName,
//         shape: "dot",
//         size: p.status === "seeder" ? 18 : 15,
//         color: p.status === "seeder" ? "#43a047" : "#fb8c00",
//       });

//       edges.push({
//         from: p._id,
//         to: file._id,
//         color: "rgba(120,120,120,0.4)",
//       });
//     });

//     const data = { nodes, edges };

//     const options = {
//       height: "350px",
//       width: "100%",
//       physics: {
//         enabled: true,
//         solver: "forceAtlas2Based",
//         stabilization: true,
//       },
//       interaction: {
//         dragNodes: false,
//         dragView: false,
//         zoomView: false,
//         selectable: false,
//       },
//       edges: {
//         smooth: true,
//         width: 2,
//       }
//     };

//     if (networkRef.current) {
//       networkRef.current.destroy();
//     }

//     networkRef.current = new Network(containerRef.current, data, options);

//   }, [file, peers]);

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: 4,
//         background: "#fafafa",
//         padding: 5,
//       }}
//     >
//       {!file ? (
//         <p style={{ textAlign: "center" }}>Select a file to see swarm graph.</p>
//       ) : (
//         <div
//           ref={containerRef}
//           style={{ height: "350px", width: "100%" }}
//         ></div>
//       )}
//     </div>
//   );
// }
// SwarmGraph.jsx
import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

export default function SwarmGraph({ file, peers }) {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!file || !containerRef.current) return;

    const nodes = [
      {
        id: file._id,
        label: file.name,
        shape: "dot",
        size: 26,
        color: "#8b5cf6",
        font: { color: "#1e103a", size: 14 },
      },
    ];

    const edges = [];

    peers.forEach((p) => {
      nodes.push({
        id: p._id,
        label: p.clientName,
        shape: "dot",
        size: p.status === "seeder" ? 20 : 16,
        color: p.status === "seeder" ? "#5858e4ff" : "#ec4899",
        font: { color: "#2f174f", size: 12 },
      });

      edges.push({
        from: p._id,
        to: file._id,
        color: "rgba(120,120,160,0.4)",
      });
    });

    const data = { nodes, edges };

    const options = {
      height: "300px",
      width: "100%",
      physics: {
        enabled: true,
        solver: "forceAtlas2Based",
        stabilization: true,
      },
      interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false,
        selectable: false,
      },
      edges: {
        smooth: true,
        width: 2,
      },
      layout: {
        improvedLayout: true,
      },
    };

    if (networkRef.current) {
      networkRef.current.destroy();
    }

    networkRef.current = new Network(containerRef.current, data, options);
  }, [file, peers]);

  if (!file) {
    return (
      <p style={{ fontSize: 13, color: "#777" }}>
        Select a file to see swarm graph.
      </p>
    );
  }

  return (
    <div
      style={{
        borderRadius: 20,
        background:
          "radial-gradient(circle at top,#fbe8ff,#f4f0ff,#f2f6ff)",
        padding: 8,
      }}
    >
      <div
        ref={containerRef}
        style={{
          height: 300,
          width: "100%",
          borderRadius: 16,
          background: "#ffffff",
        }}
      ></div>
    </div>
  );
}
