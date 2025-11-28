

// // TrackerDashboard.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api";
// import SeederChart from "./SeederChart";
// import ActivityLog from "./ActivityLog";
// import SwarmGraph from "./SwarmGraph";

// const cardBase = {
//   borderRadius: 24,
//   background: "rgba(255,255,255,0.96)",
//   boxShadow: "0 18px 35px rgba(24, 10, 60, 0.22)",
//   padding: 18,
// };

// export default function TrackerDashboard({ user }) {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [newFileName, setNewFileName] = useState("");
//   const [newFileSize, setNewFileSize] = useState("");

//   const [showMineOnly, setShowMineOnly] = useState(false);

//   const [selectedFileId, setSelectedFileId] = useState("");
//   const [clientName, setClientName] = useState("Client-1");
//   const [status, setStatus] = useState("leecher");
//   const [peers, setPeers] = useState([]);
//   const [autoRefresh, setAutoRefresh] = useState(true);

//   const [activity, setActivity] = useState([]);

//   const fetchFiles = async () => {
//     try {
//       const res = await api.get("/tracker/files");
//       setFiles(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch files error", err);
//     }
//   };

//   const fetchPeers = async (fileId) => {
//     if (!fileId) return;
//     try {
//       const res = await api.get(`/tracker/peers/${fileId}`);
//       setPeers(res.data);
//     } catch (err) {
//       console.error("Fetch peers error", err);
//     }
//   };

//   const fetchActivity = async (fileId) => {
//     if (!fileId) return;
//     try {
//       const res = await api.get(`/tracker/activity/${fileId}?limit=50`);
//       setActivity(res.data);
//     } catch (err) {
//       console.error("Fetch activity error", err);
//     }
//   };

//   const tickSimulation = async () => {
//     try {
//       await api.post("/tracker/tick");
//     } catch (err) {
//       console.error("Tick error", err);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   useEffect(() => {
//     if (!selectedFileId) return;
//     fetchPeers(selectedFileId);
//     fetchActivity(selectedFileId);
//   }, [selectedFileId]);

//   useEffect(() => {
//     if (!autoRefresh) return;
//     const id = setInterval(() => {
//       tickSimulation();
//       fetchFiles();
//       if (selectedFileId) {
//         fetchPeers(selectedFileId);
//         fetchActivity(selectedFileId);
//       }
//     }, 2000);
//     return () => clearInterval(id);
//   }, [autoRefresh, selectedFileId]);

//   const createFile = async (e) => {
//     e.preventDefault();
//     if (!newFileName) return;
//     try {
//       await api.post("/tracker/file", {
//         name: newFileName,
//         sizeMB: Number(newFileSize) || 0,
//       });
//       setNewFileName("");
//       setNewFileSize("");
//       fetchFiles();
//     } catch (err) {
//       console.error("Create file error", err);
//     }
//   };

//   const joinSwarm = async (e) => {
//     e.preventDefault();
//     if (!selectedFileId || !clientName) return;
//     try {
//       await api.post("/tracker/join", {
//         fileId: selectedFileId,
//         clientName,
//         status,
//       });
//       fetchFiles();
//       fetchPeers(selectedFileId);
//       fetchActivity(selectedFileId);
//     } catch (err) {
//       console.error("Join swarm error", err);
//     }
//   };

//   const leaveSwarm = async (peerId) => {
//     try {
//       await api.post("/tracker/leave", { peerId });
//       fetchFiles();
//       fetchPeers(selectedFileId);
//       fetchActivity(selectedFileId);
//     } catch (err) {
//       console.error("Leave swarm error", err);
//     }
//   };

//   const selectedFile = files.find((f) => f._id === selectedFileId);

//   const visibleFiles = showMineOnly
//     ? files.filter((f) => f.createdBy === user.id)
//     : files;

//   const pieceVisualization = () => {
//     if (!selectedFile || !selectedFile.pieceCount) return null;

//     const pieceCount = selectedFile.pieceCount;
//     if (peers.length === 0) return <p>No peers, no pieces available.</p>;

//     const avgProgress =
//       peers.reduce((sum, p) => sum + (p.progress || 0), 0) / peers.length;

//     const piecesAvailable = Math.max(
//       0,
//       Math.min(pieceCount, Math.round((avgProgress / 100) * pieceCount))
//     );

//     const boxes = [];
//     for (let i = 0; i < pieceCount; i++) {
//       const filled = i < piecesAvailable;
//       boxes.push(
//         <div
//           key={i}
//           style={{
//             width: 14,
//             height: 14,
//             margin: 2,
//             borderRadius: 4,
//             backgroundColor: filled ? "#ff7ad9" : "#eee",
//           }}
//         />
//       );
//     }

//     return (
//       <div>
//         <p style={{ marginBottom: 8, fontSize: 13, color: "#555" }}>
//           Pieces: <strong>{pieceCount}</strong> — Estimated available:{" "}
//           <strong>{piecesAvailable}</strong> ({avgProgress.toFixed(0)}% avg)
//         </p>
//         <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 260 }}>
//           {boxes}
//         </div>
//       </div>
//     );
//   };

//   const totalSeeders = selectedFile ? selectedFile.seeders : 0;
//   const totalLeechers = selectedFile ? selectedFile.leechers : 0;
//   const totalPeers = totalSeeders + totalLeechers;

//   return (
//     <div
//       style={{
//         display: "flex",
//         padding: 24,
//         gap: 22,
//         color: "#1c123f",
//       }}
//     >
//       {/* LEFT SIDEBAR */}
//       {/* LEFT SIDEBAR */}
//       <aside
//         style={{
//           width: 230,
//           borderRadius: 26,
//           background:
//             "linear-gradient(180deg,#26144f 0%,#301a7b 40%,#fe52c0 100%)",
//           color: "#fff",
//           padding: 20,
//           boxShadow: "0 18px 35px rgba(11, 5, 30, 0.55)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 20,
//           height: "calc(100vh - 40px)",
//         }}
//       >
//         <div>
//           {/* Profile bubble */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: 30,
//             }}
//           >
//             <div
//               style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: "50%",
//                 background:
//                   "radial-gradient(circle at 30% 30%,#ffe6ff,#ff9cf2,#ff5ca8)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 32,
//                 fontWeight: 700,
//                 color: "#3b0b68",
//                 marginBottom: 10,
//               }}
//             >
//               {user.name?.[0]?.toUpperCase() || "U"}
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
//               <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>
//                 BitTorrent Tracker
//               </div>
//             </div>
//           </div>

//           {/* Menu */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {[
//               { label: "Dashboard", icon: "📊", scrollTo: "top-section" },
//               { label: "Files", icon: "📁", scrollTo: "files-section" },
//               { label: "Peers", icon: "👥", scrollTo: "peers-section" },
//               { label: "Activity", icon: "📝", scrollTo: "activity-section" },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 onClick={() =>
//                   document
//                     .getElementById(item.scrollTo)
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   padding: "10px 14px",
//                   borderRadius: 999,
//                   background: "rgba(255, 255, 255, 0.18)",
//                   cursor: "pointer",
//                   fontSize: 13,
//                   transition: "0.2s",
//                 }}
//               >
//                 <span style={{ fontSize: 16 }}>{item.icon}</span>
//                 <span>{item.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom controls */}
//         <div style={{ fontSize: 12, opacity: 0.9 }}>
//           <div style={{ marginBottom: 10, opacity: 0.8 }}>Auto Refresh</div>
//           <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
//             <input
//               type="checkbox"
//               checked={autoRefresh}
//               onChange={(e) => setAutoRefresh(e.target.checked)}
//             />
//             <span>Every 2 seconds</span>
//           </label>

//           {/* LOGOUT BUTTON */}
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("user");
//               window.location.href = "/login";
//             }}
//             style={{
//               marginTop: 20,
//               width: "100%",
//               borderRadius: 999,
//               padding: "10px 14px",
//               border: "none",
//               background: "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
//               color: "#fff",
//               fontWeight: 600,
//               cursor: "pointer",
//               boxShadow: "0 6px 12px rgba(255, 77, 77, 0.45)",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </aside>


//       {/* MAIN AREA */}
//       <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
//         {/* HEADER / SEARCH */}
//         <header
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: 6,
//           }}
//         >
//           <div>
//             <h2
//               style={{
//                 margin: 0,
//                 fontSize: 24,
//                 color: "#faf3ff",
//                 textShadow: "0 3px 6px rgba(0,0,0,0.3)",
//               }}
//             >
//               Tracker Dashboard
//             </h2>
//             <p
//               style={{
//                 margin: "4px 0 0",
//                 fontSize: 13,
//                 color: "#fbe3ff",
//                 opacity: 0.9,
//               }}
//             >
//               Monitor files, peers and swarm activity in real time.
//             </p>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 14,
//             }}
//           >
//             {/* Fake search bar like design */}
//             <div
//               style={{
//                 minWidth: 260,
//                 padding: "8px 14px",
//                 borderRadius: 999,
//                 background: "rgba(255,255,255,0.96)",
//                 boxShadow: "0 10px 22px rgba(26, 11, 66, 0.35)",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <span style={{ fontSize: 16, color: "#ff66c7" }}>🔍</span>
//               <input
//                 placeholder="Search file by name..."
//                 style={{
//                   border: "none",
//                   outline: "none",
//                   width: "100%",
//                   fontSize: 13,
//                   background: "transparent",
//                   color: "#3b145f",
//                 }}
//                 onChange={() => {}}
//               />
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 gap: 10,
//                 color: "#ffe5ff",
//                 fontSize: 20,
//               }}
//             >
//               <span>❤️</span>
//               <span>🔔</span>
//             </div>
//           </div>
//         </header>

//         {/* STATS CARDS */}
//         <section
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gap: 16,
//           }}
//         >
//           <div
//             style={{
//               ...cardBase,
//               background:
//                 "linear-gradient(135deg,#ffe4ff 0%,#ffb7ff 50%,#ff8fd1 100%)",
//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#7b2162" }}>
//               TOTAL FILES
//             </div>
//             <div
//               style={{
//                 fontSize: 32,
//                 fontWeight: 700,
//                 marginTop: 6,
//                 color: "#4c134d",
//               }}
//             >
//               {files.length}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 8, color: "#7b2162" }}>
//               All torrents being tracked by this instance.
//             </div>
//           </div>

//           <div
//             style={{
//               ...cardBase,
//               background:
//                 "linear-gradient(135deg,#e5e0ff 0%,#c3b8ff 40%,#8a7dff 100%)",
//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#251c68" }}>
//               ACTIVE PEERS
//             </div>
//             <div
//               style={{
//                 fontSize: 32,
//                 fontWeight: 700,
//                 marginTop: 6,
//                 color: "#26135a",
//               }}
//             >
//               {totalPeers}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 8, color: "#34247c" }}>
//               Seeders & leechers in the selected swarm.
//             </div>
//           </div>

//           <div
//             style={{
//               ...cardBase,
//               background:
//                 "linear-gradient(135deg,#ffe8d9 0%,#ffc0a3 40%,#ff9b7b 100%)",
//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#8a3511" }}>
//               AUTO REFRESH
//             </div>
//             <div
//               style={{
//                 marginTop: 10,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: 28,
//                   fontWeight: 700,
//                   color: autoRefresh ? "#c03c17" : "#ffb296",
//                 }}
//               >
//                 {autoRefresh ? "ON" : "OFF"}
//               </span>
//               <label
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 8,
//                   fontSize: 12,
//                   color: "#8a3511",
//                   cursor: "pointer",
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                 />
//                 <span>Refresh every 2s</span>
//               </label>
//             </div>
//           </div>
//         </section>

//         {/* TOP GRID: FILES TABLE + JOIN FORM */}
//         <section
//           style={{
//             display: "grid",
//             gridTemplateColumns: "2fr 1.1fr",
//             gap: 18,
//             marginTop: 6,
//           }}
//         >
//           {/* FILES CARD */}
//           <div style={cardBase}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 10,
//               }}
//             >
//               <h3
//                 style={{
//                   margin: 0,
//                   fontSize: 16,
//                   color: "#31145c",
//                   fontWeight: 600,
//                 }}
//               >
//                 Files / Swarms
//               </h3>
//               <label
//                 style={{
//                   fontSize: 12,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                   color: "#6a4c9f",
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={showMineOnly}
//                   onChange={(e) => setShowMineOnly(e.target.checked)}
//                 />
//                 Show only my files
//               </label>
//             </div>

//             {loading ? (
//               <p>Loading files...</p>
//             ) : visibleFiles.length === 0 ? (
//               <p>No files found.</p>
//             ) : (
//               <div
//                 style={{
//                   borderRadius: 16,
//                   overflow: "hidden",
//                   border: "1px solid #ece5ff",
//                 }}
//               >
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     fontSize: 12,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       background:
//                         "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
//                     }}
//                   >
//                     <tr>
//                       {[
//                         "Select",
//                         "Name",
//                         "Size (MB)",
//                         "InfoHash",
//                         "Pieces",
//                         "Seeders",
//                         "Leechers",
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           style={{
//                             padding: "8px 10px",
//                             textAlign: "left",
//                             color: "#5b418f",
//                             fontWeight: 600,
//                             borderBottom: "1px solid #e2d6ff",
//                           }}
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {visibleFiles.map((f, idx) => (
//                       <tr
//                         key={f._id}
//                         style={{
//                           backgroundColor:
//                             idx % 2 === 0 ? "#fff" : "#fbf7ff",
//                         }}
//                       >
//                         <td style={{ padding: "7px 10px" }}>
//                           <input
//                             type="radio"
//                             name="selectedFile"
//                             checked={selectedFileId === f._id}
//                             onChange={() => setSelectedFileId(f._id)}
//                           />
//                         </td>
//                         <td style={{ padding: "7px 10px" }}>{f.name}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.sizeMB}</td>
//                         <td
//                           style={{
//                             padding: "7px 10px",
//                             fontFamily: "monospace",
//                             fontSize: 11,
//                           }}
//                         >
//                           {f.infoHash}
//                         </td>
//                         <td style={{ padding: "7px 10px" }}>{f.pieceCount}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.seeders}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.leechers}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* CREATE FILE FORM */}
//             <form
//               onSubmit={createFile}
//               style={{
//                 marginTop: 14,
//                 display: "flex",
//                 gap: 10,
//                 alignItems: "center",
//               }}
//             >
//               <input
//                 placeholder="New file name"
//                 value={newFileName}
//                 onChange={(e) => setNewFileName(e.target.value)}
//                 style={{
//                   flex: 1,
//                   borderRadius: 999,
//                   border: "1px solid #e1d4ff",
//                   padding: "7px 12px",
//                   fontSize: 12,
//                   outline: "none",
//                 }}
//               />
//               <input
//                 placeholder="Size (MB)"
//                 value={newFileSize}
//                 onChange={(e) => setNewFileSize(e.target.value)}
//                 style={{
//                   width: 110,
//                   borderRadius: 999,
//                   border: "1px solid #e1d4ff",
//                   padding: "7px 12px",
//                   fontSize: 12,
//                   outline: "none",
//                 }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   borderRadius: 999,
//                   padding: "8px 16px",
//                   border: "none",
//                   background:
//                     "linear-gradient(135deg,#ff7ad9,#ff5ca8,#ff4c93)",
//                   color: "#fff",
//                   fontSize: 12,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   boxShadow: "0 8px 16px rgba(255, 92, 168, 0.4)",
//                 }}
//               >
//                 + Create
//               </button>
//             </form>
//           </div>

//           {/* JOIN SWARM + PIECES CARD */}
//           <div style={{ ...cardBase, background: "rgba(255,255,255,0.98)" }}>
//             <h3
//               style={{
//                 marginTop: 0,
//                 marginBottom: 8,
//                 fontSize: 16,
//                 color: "#31145c",
//               }}
//             >
//               Join Swarm (Simulate Peer)
//             </h3>

//             {!selectedFileId ? (
//               <p style={{ fontSize: 13, color: "#777" }}>
//                 Select a file in the table to add peers.
//               </p>
//             ) : (
//               <form
//                 onSubmit={joinSwarm}
//                 style={{
//                   display: "flex",
//                   gap: 8,
//                   marginBottom: 12,
//                   alignItems: "center",
//                 }}
//               >
//                 <input
//                   placeholder="Client Name"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   style={{
//                     flex: 1,
//                     borderRadius: 999,
//                     border: "1px solid #e1d4ff",
//                     padding: "7px 12px",
//                     fontSize: 12,
//                     outline: "none",
//                   }}
//                 />
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   style={{
//                     borderRadius: 999,
//                     border: "1px solid #e1d4ff",
//                     padding: "7px 10px",
//                     fontSize: 12,
//                     outline: "none",
//                     background: "#fdfbff",
//                   }}
//                 >
//                   <option value="leecher">Leecher</option>
//                   <option value="seeder">Seeder</option>
//                 </select>

//                 <button
//                   type="submit"
//                   style={{
//                     borderRadius: 999,
//                     padding: "8px 16px",
//                     border: "none",
//                     background:
//                       "linear-gradient(135deg,#8f7bff,#5b4bff)",
//                     color: "#fff",
//                     fontSize: 12,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     boxShadow: "0 8px 18px rgba(76, 64, 196, 0.45)",
//                   }}
//                 >
//                   Join
//                 </button>
//               </form>
//             )}

//             <div style={{ marginTop: 8 }}>
//               <h4
//                 style={{
//                   margin: "6px 0",
//                   fontSize: 13,
//                   color: "#4a2b85",
//                   fontWeight: 600,
//                 }}
//               >
//                 File Pieces
//               </h4>
//               {pieceVisualization()}
//             </div>
//           </div>
//         </section>

//         {/* LOWER GRID: PEERS + CHART + GRAPH + ACTIVITY */}
//         <section
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1.6fr 1.1fr",
//             gap: 18,
//             marginTop: 4,
//           }}
//         >
//           {/* LEFT: Peers table + Swarm graph */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <div style={cardBase}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Peers in Selected Swarm
//               </h3>

//               {!selectedFileId ? (
//                 <p>Select a file above.</p>
//               ) : peers.length === 0 ? (
//                 <p>No peers yet.</p>
//               ) : (
//                 <div
//                   style={{
//                     borderRadius: 16,
//                     overflow: "hidden",
//                     border: "1px solid #ece5ff",
//                   }}
//                 >
//                   <table
//                     style={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       fontSize: 12,
//                     }}
//                   >
//                     <thead
//                       style={{
//                         background:
//                           "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
//                       }}
//                     >
//                       <tr>
//                         {["Client", "Status", "Progress", "Joined At", "Leave"].map(
//                           (h) => (
//                             <th
//                               key={h}
//                               style={{
//                                 padding: "8px 10px",
//                                 textAlign: "left",
//                                 color: "#5b418f",
//                                 fontWeight: 600,
//                                 borderBottom: "1px solid #e2d6ff",
//                               }}
//                             >
//                               {h}
//                             </th>
//                           )
//                         )}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {peers.map((p, idx) => (
//                         <tr
//                           key={p._id}
//                           style={{
//                             backgroundColor:
//                               idx % 2 === 0 ? "#fff" : "#fbf7ff",
//                           }}
//                         >
//                           <td style={{ padding: "7px 10px" }}>
//                             {p.clientName}
//                           </td>
//                           <td style={{ padding: "7px 10px", textTransform: "capitalize" }}>
//                             {p.status}
//                           </td>
//                           <td style={{ padding: "7px 10px", minWidth: 150 }}>
//                             <div
//                               style={{
//                                 background: "#f2ebff",
//                                 borderRadius: 999,
//                                 overflow: "hidden",
//                                 height: 10,
//                                 marginBottom: 2,
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: `${p.progress || 0}%`,
//                                   height: "100%",
//                                   background:
//                                     p.status === "seeder"
//                                       ? "linear-gradient(90deg,#6ee7b7,#22c55e)"
//                                       : "linear-gradient(90deg,#fbbf24,#f97316)",
//                                 }}
//                               />
//                             </div>
//                             <span
//                               style={{
//                                 fontSize: 11,
//                                 color: "#6a4c9f",
//                               }}
//                             >
//                               {Math.round(p.progress || 0)}%
//                             </span>
//                           </td>
//                           <td style={{ padding: "7px 10px" }}>
//                             {new Date(p.createdAt).toLocaleTimeString()}
//                           </td>
//                           <td style={{ padding: "7px 10px" }}>
//                             <button
//                               onClick={() => leaveSwarm(p._id)}
//                               style={{
//                                 borderRadius: 999,
//                                 padding: "4px 10px",
//                                 border: "none",
//                                 background:
//                                   "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
//                                 color: "#fff",
//                                 fontSize: 11,
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Leave
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             <div style={cardBase}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Peer-to-Peer Swarm Graph
//               </h3>
//               <SwarmGraph file={selectedFile} peers={peers} />
//             </div>
//           </div>

//           {/* RIGHT: Pie chart + Activity */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <div
//               style={{
//                 ...cardBase,
//                 background:
//                   "linear-gradient(145deg,#fee9ff 0%,#f7e4ff 40%,#e6e5ff 100%)",
//               }}
//             >
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Seeder / Leecher Distribution
//               </h3>
//               <SeederChart seeders={totalSeeders} leechers={totalLeechers} />
//             </div>

//             <div style={{ ...cardBase, maxHeight: 280, overflow: "hidden" }}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Activity Log
//               </h3>
//               <ActivityLog activity={activity} />
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import api from "../api";
// import SeederChart from "./SeederChart";
// import ActivityLog from "./ActivityLog";
// import SwarmGraph from "./SwarmGraph";
// import AnimatedBackground from "./AnimatedBackground";


// const cardBase = {
//   borderRadius: 24,
//   background: "rgba(255,255,255,0.96)",
//   boxShadow: "0 18px 35px rgba(24, 10, 60, 0.22)",
//   padding: 18,
// };

// export default function TrackerDashboard({ user }) {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [newFileName, setNewFileName] = useState("");
//   const [newFileSize, setNewFileSize] = useState("");

//   const [showMineOnly, setShowMineOnly] = useState(false);

//   const [selectedFileId, setSelectedFileId] = useState("");
//   const [clientName, setClientName] = useState("Client-1");
//   const [status, setStatus] = useState("leecher");
//   const [peers, setPeers] = useState([]);
//   const [autoRefresh, setAutoRefresh] = useState(true);

//   const [activity, setActivity] = useState([]);

//   const fetchFiles = async () => {
//     try {
//       const res = await api.get("/tracker/files");
//       setFiles(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch files error", err);
//     }
//   };

//   const fetchPeers = async (fileId) => {
//     if (!fileId) return;
//     try {
//       const res = await api.get(`/tracker/peers/${fileId}`);
//       setPeers(res.data);
//     } catch (err) {
//       console.error("Fetch peers error", err);
//     }
//   };

//   const fetchActivity = async (fileId) => {
//     if (!fileId) return;
//     try {
//       const res = await api.get(`/tracker/activity/${fileId}?limit=50`);
//       setActivity(res.data);
//     } catch (err) {
//       console.error("Fetch activity error", err);
//     }
//   };

//   const tickSimulation = async () => {
//     try {
//       await api.post("/tracker/tick");
//     } catch (err) {
//       console.error("Tick error", err);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   useEffect(() => {
//     if (!selectedFileId) return;
//     fetchPeers(selectedFileId);
//     fetchActivity(selectedFileId);
//   }, [selectedFileId]);

//   useEffect(() => {
//     if (!autoRefresh) return;
//     const id = setInterval(() => {
//       tickSimulation();
//       fetchFiles();
//       if (selectedFileId) {
//         fetchPeers(selectedFileId);
//         fetchActivity(selectedFileId);
//       }
//     }, 2000);
//     return () => clearInterval(id);
//   }, [autoRefresh, selectedFileId]);

//   const createFile = async (e) => {
//     e.preventDefault();
//     if (!newFileName) return;
//     try {
//       await api.post("/tracker/file", {
//         name: newFileName,
//         sizeMB: Number(newFileSize) || 0,
//       });
//       setNewFileName("");
//       setNewFileSize("");
//       fetchFiles();
//     } catch (err) {
//       console.error("Create file error", err);
//     }
//   };

//   const joinSwarm = async (e) => {
//     e.preventDefault();
//     if (!selectedFileId || !clientName) return;
//     try {
//       await api.post("/tracker/join", {
//         fileId: selectedFileId,
//         clientName,
//         status,
//       });
//       fetchFiles();
//       fetchPeers(selectedFileId);
//       fetchActivity(selectedFileId);
//     } catch (err) {
//       console.error("Join swarm error", err);
//     }
//   };

//   const leaveSwarm = async (peerId) => {
//     try {
//       await api.post("/tracker/leave", { peerId });
//       fetchFiles();
//       fetchPeers(selectedFileId);
//       fetchActivity(selectedFileId);
//     } catch (err) {
//       console.error("Leave swarm error", err);
//     }
//   };

//   const selectedFile = files.find((f) => f._id === selectedFileId);

//   const visibleFiles =
//     showMineOnly ? files.filter((f) => f.createdBy === user.id) : files;

//   const pieceVisualization = () => {
//     if (!selectedFile || !selectedFile.pieceCount) return null;

//     const pieceCount = selectedFile.pieceCount;
//     if (peers.length === 0) return <p>No peers, no pieces available.</p>;

//     const avgProgress =
//       peers.reduce((sum, p) => sum + (p.progress || 0), 0) / peers.length;

//     const piecesAvailable = Math.max(
//       0,
//       Math.min(pieceCount, Math.round((avgProgress / 100) * pieceCount))
//     );

//     const boxes = [];
//     for (let i = 0; i < pieceCount; i++) {
//       const filled = i < piecesAvailable;
//       boxes.push(
//         <div
//           key={i}
//           style={{
//             width: 14,
//             height: 14,
//             margin: 2,
//             borderRadius: 4,
//             backgroundColor: filled ? "#ff7ad9" : "#eee",
//           }}
//         />
//       );
//     }

//     return (
//       <div>
//         <p style={{ marginBottom: 8, fontSize: 13, color: "#555" }}>
//           Pieces: <strong>{pieceCount}</strong> — Estimated available:{" "}
//           <strong>{piecesAvailable}</strong> ({avgProgress.toFixed(0)}% avg)
//         </p>
//         <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 260 }}>
//           {boxes}
//         </div>
//       </div>
//     );
//   };

//   const totalSeeders = selectedFile ? selectedFile.seeders : 0;
//   const totalLeechers = selectedFile ? selectedFile.leechers : 0;
//   const totalPeers = totalSeeders + totalLeechers;

//   return (
//     <div
//       style={{
//         display: "flex",
//         padding: 24,
//         gap: 22,
//         color: "#1c123f",
//         background:
//           "radial-gradient(circle at center, #f3e8ff 0%, #d8b4fe 20%, #a855f7 50%, #6b21a8 100%)",
//         minHeight: "100vh",
//       }}
//     >
//       {/* --------------------------- SIDEBAR --------------------------- */}
//       <aside
//         style={{
//           width: 230,
//           borderRadius: 26,
//           background: "#2d1268",
//           color: "#fff",
//           padding: 20,
//           boxShadow: "0 18px 35px rgba(11, 5, 30, 0.55)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 20,
//           height: "calc(100vh - 40px)",
//         }}
//       >
//         <div>
//           {/* Profile bubble */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: 30,
//             }}
//           >
//             <div
//               style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: "50%",
//                 background:
//                   "radial-gradient(circle at 30% 30%,#ffe6ff,#ff9cf2,#ff5ca8)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 32,
//                 fontWeight: 700,
//                 color: "#3b0b68",
//                 marginBottom: 10,
//               }}
//             >
//               {user.name?.[0]?.toUpperCase() || "U"}
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
//               <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>
//                 BitTorrent Tracker
//               </div>
//             </div>
//           </div>

//           {/* Sidebar menu */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {[
//               { label: "Dashboard", icon: "📊", scrollTo: "top-section" },
//               { label: "Files", icon: "📁", scrollTo: "files-section" },
//               { label: "Peers", icon: "👥", scrollTo: "peers-section" },
//               { label: "Activity", icon: "📝", scrollTo: "activity-section" },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 onClick={() =>
//                   document
//                     .getElementById(item.scrollTo)
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   padding: "10px 14px",
//                   borderRadius: 999,
//                   background: "rgba(255, 255, 255, 0.18)",
//                   cursor: "pointer",
//                   fontSize: 13,
//                   transition: "0.2s",
//                 }}
//               >
//                 <span style={{ fontSize: 16 }}>{item.icon}</span>
//                 <span>{item.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom controls */}
//         <div style={{ fontSize: 12, opacity: 0.9 }}>
//           <div style={{ marginBottom: 10, opacity: 0.8 }}>Auto Refresh</div>
//           <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
//             <input
//               type="checkbox"
//               checked={autoRefresh}
//               onChange={(e) => setAutoRefresh(e.target.checked)}
//             />
//             <span>Every 2 seconds</span>
//           </label>

//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("user");
//               window.location.href = "/login";
//             }}
//             style={{
//               marginTop: 20,
//               width: "100%",
//               borderRadius: 999,
//               padding: "10px 14px",
//               border: "none",
//               background: "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
//               color: "#fff",
//               fontWeight: 600,
//               cursor: "pointer",
//               boxShadow: "0 6px 12px rgba(255, 77, 77, 0.45)",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* --------------------------- MAIN AREA --------------------------- */}
//       <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>

//         {/* TOP-SECTION ANCHOR */}
//         <div id="top-section"></div>

//         {/* HEADER */}
//         <header
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: 6,
//           }}
//         >
//           <div>
//             <h2
//               style={{
//                 margin: 0,
//                 fontSize: 24,
//                 color: "#faf3ff",
//                 textShadow: "0 3px 6px rgba(0,0,0,0.3)",
//               }}
//             >
//               Tracker Dashboard
//             </h2>
//             <p
//               style={{
//                 margin: "4px 0 0",
//                 fontSize: 13,
//                 color: "#fbe3ff",
//                 opacity: 0.9,
//               }}
//             >
//               Monitor files, peers and swarm activity in real-time.
//             </p>
//           </div>

//           {/* Search bar */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 14,
//             }}
//           >
//             <div
//               style={{
//                 minWidth: 260,
//                 padding: "8px 14px",
//                 borderRadius: 999,
//                 background: "rgba(255,255,255,0.96)",
//                 boxShadow: "0 10px 22px rgba(26, 11, 66, 0.35)",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <span style={{ fontSize: 16, color: "#ff66c7" }}>🔍</span>
//               <input
//                 placeholder="Search file by name..."
//                 style={{
//                   border: "none",
//                   outline: "none",
//                   width: "100%",
//                   fontSize: 13,
//                   background: "transparent",
//                   color: "#3b145f",
//                 }}
//               />
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 gap: 10,
//                 color: "#ffe5ff",
//                 fontSize: 20,
//               }}
//             >
//               <span>❤️</span>
//               <span>🔔</span>
//             </div>
//           </div>
//         </header>

//         {/* --------------------------- STATS CARDS --------------------------- */}
//         <section
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gap: 16,
//           }}
//         >
//           {/* Total Files */}
//           <div
//             style={{
//               ...cardBase,
//               background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)",

//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#f4eaf1ff" }}>
//               TOTAL FILES
//             </div>
//             <div
//               style={{
//                 fontSize: 32,
//                 fontWeight: 700,
//                 marginTop: 6,
//                 color: "#f0ecf0ff",
//               }}
//             >
//               {files.length}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 8, color: "#ece8ebff" }}>
//               All torrents being tracked by this instance.
//             </div>
//           </div>

//           {/* Active Peers */}
//           <div
//             style={{
//               ...cardBase,
//               background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)",

//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#f8f4f7ff" }}>
//               ACTIVE PEERS
//             </div>
//             <div
//               style={{
//                 fontSize: 32,
//                 fontWeight: 700,
//                 marginTop: 6,
//                 color: "#faf8faff",
//               }}
//             >
//               {totalPeers}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 8, color: "#f5eef3ff" }}>
//               Seeders & leechers in the selected swarm.
//             </div>
//           </div>

//           {/* Auto Refresh */}
//           <div
//             style={{
//               ...cardBase,
//               background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)",

//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#d8d8d8ff" }}>
//               AUTO REFRESH
//             </div>
//             <div
//               style={{
//                 marginTop: 10,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: 28,
//                   fontWeight: 700,
//                   color: autoRefresh ? "#fafafaff" : "#f2e30bff",
//                 }}
//               >
//                 {autoRefresh ? "ON" : "OFF"}
//               </span>
//               <label
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 8,
//                   fontSize: 12,
//                   color: "#ece4eaff",
//                   cursor: "pointer",
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                 />
//                 <span>Refresh every 2s</span>
//               </label>
//             </div>
//           </div>
//         </section>

//         {/* --------------------------- FILES SECTION --------------------------- */}
//         {/* SCROLL TARGET */}
//         <section id="files-section"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "2fr 1.1fr",
//             gap: 18,
//             marginTop: 6,
//           }}
//         >

//           {/* Left: Files Table */}
//           <div style={cardBase}>
//             <h3
//               style={{
//                 margin: 0,
//                 marginBottom: 10,
//                 fontSize: 16,
//                 color: "#31145c",
//                 fontWeight: 600,
//               }}
//             >
//               Files / Swarms
//             </h3>

//             {loading ? (
//               <p>Loading files...</p>
//             ) : visibleFiles.length === 0 ? (
//               <p>No files found.</p>
//             ) : (
//               <div
//                 style={{
//                   borderRadius: 16,
//                   overflow: "hidden",
//                   border: "1px solid #ece5ff",
//                 }}
//               >
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     fontSize: 12,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       background:
//                         "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
//                     }}
//                   >
//                     <tr>
//                       {[
//                         "Select",
//                         "Name",
//                         "Size (MB)",
//                         "InfoHash",
//                         "Pieces",
//                         "Seeders",
//                         "Leechers",
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           style={{
//                             padding: "8px 10px",
//                             textAlign: "left",
//                             color: "#5b418f",
//                             fontWeight: 600,
//                             borderBottom: "1px solid #e2d6ff",
//                           }}
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {visibleFiles.map((f, idx) => (
//                       <tr
//                         key={f._id}
//                         style={{
//                           backgroundColor:
//                             idx % 2 === 0 ? "#fff" : "#fbf7ff",
//                         }}
//                       >
//                         <td style={{ padding: "7px 10px" }}>
//                           <input
//                             type="radio"
//                             name="selectedFile"
//                             checked={selectedFileId === f._id}
//                             onChange={() => setSelectedFileId(f._id)}
//                           />
//                         </td>
//                         <td style={{ padding: "7px 10px" }}>{f.name}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.sizeMB}</td>
//                         <td
//                           style={{
//                             padding: "7px 10px",
//                             fontFamily: "monospace",
//                             fontSize: 11,
//                           }}
//                         >
//                           {f.infoHash}
//                         </td>
//                         <td style={{ padding: "7px 10px" }}>{f.pieceCount}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.seeders}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.leechers}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Create File Form */}
//             <form
//               onSubmit={createFile}
//               style={{
//                 marginTop: 14,
//                 display: "flex",
//                 gap: 10,
//                 alignItems: "center",
//               }}
//             >
//               <input
//                 placeholder="New file name"
//                 value={newFileName}
//                 onChange={(e) => setNewFileName(e.target.value)}
//                 style={{
//                   flex: 1,
//                   borderRadius: 999,
//                   border: "1px solid #e1d4ff",
//                   padding: "7px 12px",
//                   fontSize: 12,
//                   outline: "none",
//                 }}
//               />
//               <input
//                 placeholder="Size (MB)"
//                 value={newFileSize}
//                 onChange={(e) => setNewFileSize(e.target.value)}
//                 style={{
//                   width: 110,
//                   borderRadius: 999,
//                   border: "1px solid #e1d4ff",
//                   padding: "7px 12px",
//                   fontSize: 12,
//                   outline: "none",
//                 }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   borderRadius: 999,
//                   padding: "8px 16px",
//                   border: "none",
//                   background:
//                     "linear-gradient(90deg, #ff7ad9, #ff5ca8, #ff4c93)",
//                   color: "#fff",
//                   fontSize: 12,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   boxShadow: "0 8px 16px rgba(255, 92, 168, 0.4)",
//                 }}
//               >
//                 + Create
//               </button>
//             </form>
//           </div>

//           {/* Right side — Join Swarm */}
//           <div style={cardBase}>
//             <h3
//               style={{
//                 marginTop: 0,
//                 marginBottom: 8,
//                 fontSize: 16,
//                 color: "#31145c",
//               }}
//             >
//               Join Swarm (Simulate Peer)
//             </h3>

//             {!selectedFileId ? (
//               <p style={{ fontSize: 13, color: "#777" }}>
//                 Select a file in the table to add peers.
//               </p>
//             ) : (
//               <form
//                 onSubmit={joinSwarm}
//                 style={{
//                   display: "flex",
//                   gap: 8,
//                   marginBottom: 12,
//                   alignItems: "center",
//                 }}
//               >
//                 <input
//                   placeholder="Client Name"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   style={{
//                     flex: 1,
//                     borderRadius: 999,
//                     border: "1px solid #e1d4ff",
//                     padding: "7px 12px",
//                     fontSize: 12,
//                     outline: "none",
//                   }}
//                 />
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   style={{
//                     borderRadius: 999,
//                     border: "1px solid #e1d4ff",
//                     padding: "7px 10px",
//                     fontSize: 12,
//                     outline: "none",
//                     background: "#fdfbff",
//                   }}
//                 >
//                   <option value="leecher">Leecher</option>
//                   <option value="seeder">Seeder</option>
//                 </select>

//                 <button
//                   type="submit"
//                   style={{
//                     borderRadius: 999,
//                     padding: "8px 16px",
//                     border: "none",
//                     background:
//                       "linear-gradient(90deg,#8f7bff,#5b4bff)",
//                     color: "#fff",
//                     fontSize: 12,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     boxShadow: "0 8px 18px rgba(76, 64, 196, 0.45)",
//                   }}
//                 >
//                   Join
//                 </button>
//               </form>
//             )}

//             {/* Pieces */}
//             <div style={{ marginTop: 8 }}>
//               <h4
//                 style={{
//                   margin: "6px 0",
//                   fontSize: 13,
//                   color: "#4a2b85",
//                   fontWeight: 600,
//                 }}
//               >
//                 File Pieces
//               </h4>
//               {pieceVisualization()}
//             </div>
//           </div>
//         </section>

//         {/* --------------------------- PEERS SECTION --------------------------- */}
//         {/* SCROLL TARGET */}
//         <section id="peers-section"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1.6fr 1.1fr",
//             gap: 18,
//             marginTop: 4,
//           }}
//         >
//           {/* LEFT: Peers + Swarm Graph */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {/* Peers Table */}
//             <div style={cardBase}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Peers in Selected Swarm
//               </h3>

//               {!selectedFileId ? (
//                 <p>Select a file above.</p>
//               ) : peers.length === 0 ? (
//                 <p>No peers yet.</p>
//               ) : (
//                 <div
//                   style={{
//                     borderRadius: 16,
//                     overflow: "hidden",
//                     border: "1px solid #ece5ff",
//                   }}
//                 >
//                   <table
//                     style={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       fontSize: 12,
//                     }}
//                   >
//                     <thead
//                       style={{
//                         background:
//                           "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
//                       }}
//                     >
//                       <tr>
//                         {["Client", "Status", "Progress", "Joined At", "Leave"].map(
//                           (h) => (
//                             <th
//                               key={h}
//                               style={{
//                                 padding: "8px 10px",
//                                 textAlign: "left",
//                                 color: "#5b418f",
//                                 fontWeight: 600,
//                                 borderBottom: "1px solid #e2d6ff",
//                               }}
//                             >
//                               {h}
//                             </th>
//                           )
//                         )}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {peers.map((p, idx) => (
//                         <tr
//                           key={p._id}
//                           style={{
//                             backgroundColor:
//                               idx % 2 === 0 ? "#fff" : "#fbf7ff",
//                           }}
//                         >
//                           <td style={{ padding: "7px 10px" }}>
//                             {p.clientName}
//                           </td>
//                           <td
//                             style={{
//                               padding: "7px 10px",
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             {p.status}
//                           </td>
//                           <td style={{ padding: "7px 10px", minWidth: 150 }}>
//                             <div
//                               style={{
//                                 background: "#f2ebff",
//                                 borderRadius: 999,
//                                 overflow: "hidden",
//                                 height: 10,
//                                 marginBottom: 2,
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: `${p.progress || 0}%`,
//                                   height: "100%",
//                                   background:
//                                     p.status === "seeder"
//                                       ? "linear-gradient(90deg,#6ee7b7,#22c55e)"
//                                       : "linear-gradient(90deg,#fbbf24,#f97316)",
//                                 }}
//                               />
//                             </div>
//                             <span
//                               style={{
//                                 fontSize: 11,
//                                 color: "#6a4c9f",
//                               }}
//                             >
//                               {Math.round(p.progress || 0)}%
//                             </span>
//                           </td>
//                           <td style={{ padding: "7px 10px" }}>
//                             {new Date(p.createdAt).toLocaleTimeString()}
//                           </td>
//                           <td style={{ padding: "7px 10px" }}>
//                             <button
//                               onClick={() => leaveSwarm(p._id)}
//                               style={{
//                                 borderRadius: 999,
//                                 padding: "4px 10px",
//                                 border: "none",
//                                 background:
//                                   "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
//                                 color: "#fff",
//                                 fontSize: 11,
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Leave
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Swarm Graph */}
//             <div style={cardBase}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Peer-to-Peer Swarm Graph
//               </h3>
//               <SwarmGraph file={selectedFile} peers={peers} />
//             </div>
//           </div>

//           {/* RIGHT: Chart + Activity */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {/* Seeder / Leecher Pie */}
//             <div
//               style={{
//                 ...cardBase,
//                 background:
//                   "linear-gradient(145deg,#fee9ff 0%,#f7e4ff 40%,#e6e5ff 100%)",
//               }}
//             >
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Seeder / Leecher Distribution
//               </h3>
//               <SeederChart seeders={totalSeeders} leechers={totalLeechers} />
//             </div>

//             {/* ---------------------- ACTIVITY SECTION ---------------------- */}
//             <div
//               id="activity-section"
//               style={{
//                 ...cardBase,
//                 maxHeight: 280,
//                 overflow: "hidden",
//               }}
//             >
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Activity Log
//               </h3>
//               <ActivityLog activity={activity} />
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


// /* FULL FIXED FILE — ONLY CHANGE ADDED IS THE TOGGLE ABOVE THE FILES TABLE */

// import React, { useEffect, useState } from "react";
// import api from "../api";
// import SeederChart from "./SeederChart";
// import ActivityLog from "./ActivityLog";
// import SwarmGraph from "./SwarmGraph";
// import AnimatedBackground from "./AnimatedBackground";

// const cardBase = {
//   borderRadius: 24,
//   background: "rgba(255,255,255,0.96)",
//   boxShadow: "0 18px 35px rgba(24, 10, 60, 0.22)",
//   padding: 18,
// };

// export default function TrackerDashboard({ user }) {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [newFileName, setNewFileName] = useState("");
//   const [newFileSize, setNewFileSize] = useState("");

//   const [showMineOnly, setShowMineOnly] = useState(false);

//   const [selectedFileId, setSelectedFileId] = useState("");
//   const [clientName, setClientName] = useState("Client-1");
//   const [status, setStatus] = useState("leecher");
//   const [peers, setPeers] = useState([]);
//   const [autoRefresh, setAutoRefresh] = useState(true);

//   const [activity, setActivity] = useState([]);

//   const fetchFiles = async () => {
//     try {
//       const res = await api.get("/tracker/files");
//       setFiles(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Fetch files error", err);
//     }
//   };

//   const fetchPeers = async (fileId) => {
//     if (!fileId) return;
//     try {
//       const res = await api.get(`/tracker/peers/${fileId}`);
//       setPeers(res.data);
//     } catch (err) {
//       console.error("Fetch peers error", err);
//     }
//   };

//   const fetchActivity = async (fileId) => {
//     if (!fileId) return;
//     try {
//       const res = await api.get(`/tracker/activity/${fileId}?limit=50`);
//       setActivity(res.data);
//     } catch (err) {
//       console.error("Fetch activity error", err);
//     }
//   };

//   const tickSimulation = async () => {
//     try {
//       await api.post("/tracker/tick");
//     } catch (err) {
//       console.error("Tick error", err);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   useEffect(() => {
//     if (!selectedFileId) return;
//     fetchPeers(selectedFileId);
//     fetchActivity(selectedFileId);
//   }, [selectedFileId]);

//   useEffect(() => {
//     if (!autoRefresh) return;
//     const id = setInterval(() => {
//       tickSimulation();
//       fetchFiles();
//       if (selectedFileId) {
//         fetchPeers(selectedFileId);
//         fetchActivity(selectedFileId);
//       }
//     }, 2000);
//     return () => clearInterval(id);
//   }, [autoRefresh, selectedFileId]);

//   const createFile = async (e) => {
//     e.preventDefault();
//     if (!newFileName) return;
//     try {
//       await api.post("/tracker/file", {
//         name: newFileName,
//         sizeMB: Number(newFileSize) || 0,
//       });
//       setNewFileName("");
//       setNewFileSize("");
//       fetchFiles();
//     } catch (err) {
//       console.error("Create file error", err);
//     }
//   };

//   const joinSwarm = async (e) => {
//     e.preventDefault();
//     if (!selectedFileId || !clientName) return;
//     try {
//       await api.post("/tracker/join", {
//         fileId: selectedFileId,
//         clientName,
//         status,
//       });
//       fetchFiles();
//       fetchPeers(selectedFileId);
//       fetchActivity(selectedFileId);
//     } catch (err) {
//       console.error("Join swarm error", err);
//     }
//   };

//   const leaveSwarm = async (peerId) => {
//     try {
//       await api.post("/tracker/leave", { peerId });
//       fetchFiles();
//       fetchPeers(selectedFileId);
//       fetchActivity(selectedFileId);
//     } catch (err) {
//       console.error("Leave swarm error", err);
//     }
//   };

//   const selectedFile = files.find((f) => f._id === selectedFileId);

//   const visibleFiles =
//     showMineOnly ? files.filter((f) => f.createdBy === user.id) : files;

//   const pieceVisualization = () => {
//     if (!selectedFile || !selectedFile.pieceCount) return null;

//     const pieceCount = selectedFile.pieceCount;
//     if (peers.length === 0) return <p>No peers, no pieces available.</p>;

//     const avgProgress =
//       peers.reduce((sum, p) => sum + (p.progress || 0), 0) / peers.length;

//     const piecesAvailable = Math.max(
//       0,
//       Math.min(pieceCount, Math.round((avgProgress / 100) * pieceCount))
//     );

//     const boxes = [];
//     for (let i = 0; i < pieceCount; i++) {
//       const filled = i < piecesAvailable;
//       boxes.push(
//         <div
//           key={i}
//           style={{
//             width: 14,
//             height: 14,
//             margin: 2,
//             borderRadius: 4,
//             backgroundColor: filled ? "#ff7ad9" : "#eee",
//           }}
//         />
//       );
//     }

//     return (
//       <div>
//         <p style={{ marginBottom: 8, fontSize: 13, color: "#555" }}>
//           Pieces: <strong>{pieceCount}</strong> — Estimated available:{" "}
//           <strong>{piecesAvailable}</strong> ({avgProgress.toFixed(0)}% avg)
//         </p>
//         <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 260 }}>
//           {boxes}
//         </div>
//       </div>
//     );
//   };

//   const totalSeeders = selectedFile ? selectedFile.seeders : 0;
//   const totalLeechers = selectedFile ? selectedFile.leechers : 0;
//   const totalPeers = totalSeeders + totalLeechers;

//   return (
//     <div
//       style={{
//         display: "flex",
//         padding: 24,
//         gap: 22,
//         color: "#1c123f",
//         background:
//           "radial-gradient(circle at center, #f3e8ff 0%, #d8b4fe 20%, #a855f7 50%, #6b21a8 100%)",
//         minHeight: "100vh",
//       }}
//     >
//       {/* --------------------------- SIDEBAR --------------------------- */}
//       <aside
//         style={{
//           width: 230,
//           borderRadius: 26,
//           background: "#2d1268",
//           color: "#fff",
//           padding: 20,
//           boxShadow: "0 18px 35px rgba(11, 5, 30, 0.55)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 20,
//           height: "calc(100vh - 40px)",
//         }}
//       >
//         <div>
//           {/* Profile bubble */}
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               marginBottom: 30,
//             }}
//           >
//             <div
//               style={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: "50%",
//                 background:
//                   "radial-gradient(circle at 30% 30%,#ffe6ff,#ff9cf2,#ff5ca8)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 32,
//                 fontWeight: 700,
//                 color: "#3b0b68",
//                 marginBottom: 10,
//               }}
//             >
//               {user.name?.[0]?.toUpperCase() || "U"}
//             </div>
//             <div style={{ textAlign: "center" }}>
//               <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
//               <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>
//                 BitTorrent Tracker
//               </div>
//             </div>
//           </div>

//           {/* Sidebar menu */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {[
//               { label: "Dashboard", icon: "📊", scrollTo: "top-section" },
//               { label: "Files", icon: "📁", scrollTo: "files-section" },
//               { label: "Peers", icon: "👥", scrollTo: "peers-section" },
//               { label: "Activity", icon: "📝", scrollTo: "activity-section" },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 onClick={() =>
//                   document
//                     .getElementById(item.scrollTo)
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 10,
//                   padding: "10px 14px",
//                   borderRadius: 999,
//                   background: "rgba(255, 255, 255, 0.18)",
//                   cursor: "pointer",
//                   fontSize: 13,
//                   transition: "0.2s",
//                 }}
//               >
//                 <span style={{ fontSize: 16 }}>{item.icon}</span>
//                 <span>{item.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom controls */}
//         <div style={{ fontSize: 12, opacity: 0.9 }}>
//           <div style={{ marginBottom: 10, opacity: 0.8 }}>Auto Refresh</div>
//           <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
//             <input
//               type="checkbox"
//               checked={autoRefresh}
//               onChange={(e) => setAutoRefresh(e.target.checked)}
//             />
//             <span>Every 2 seconds</span>
//           </label>

//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("user");
//               window.location.href = "/login";
//             }}
//             style={{
//               marginTop: 20,
//               width: "100%",
//               borderRadius: 999,
//               padding: "10px 14px",
//               border: "none",
//               background: "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
//               color: "#fff",
//               fontWeight: 600,
//               cursor: "pointer",
//               boxShadow: "0 6px 12px rgba(255, 77, 77, 0.45)",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* --------------------------- MAIN AREA --------------------------- */}
//       <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
//         <div id="top-section"></div>

//         {/* HEADER */}
//         <header
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: 6,
//           }}
//         >
//           <div>
//             <h2
//               style={{
//                 margin: 0,
//                 fontSize: 24,
//                 color: "#faf3ff",
//                 textShadow: "0 3px 6px rgba(0,0,0,0.3)",
//               }}
//             >
//               Tracker Dashboard
//             </h2>
//             <p
//               style={{
//                 margin: "4px 0 0",
//                 fontSize: 13,
//                 color: "#fbe3ff",
//                 opacity: 0.9,
//               }}
//             >
//               Monitor files, peers and swarm activity in real-time.
//             </p>
//           </div>

//           {/* Search bar */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 14,
//             }}
//           >
//             <div
//               style={{
//                 minWidth: 260,
//                 padding: "8px 14px",
//                 borderRadius: 999,
//                 background: "rgba(255,255,255,0.96)",
//                 boxShadow: "0 10px 22px rgba(26, 11, 66, 0.35)",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//               }}
//             >
//               <span style={{ fontSize: 16, color: "#ff66c7" }}>🔍</span>
//               <input
//                 placeholder="Search file by name..."
//                 style={{
//                   border: "none",
//                   outline: "none",
//                   width: "100%",
//                   fontSize: 13,
//                   background: "transparent",
//                   color: "#3b145f",
//                 }}
//               />
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 gap: 10,
//                 color: "#ffe5ff",
//                 fontSize: 20,
//               }}
//             >
//               <span>❤️</span>
//               <span>🔔</span>
//             </div>
//           </div>
//         </header>

//         {/* --------------------------- STATS CARDS --------------------------- */}
//         <section
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//             gap: 16,
//           }}
//         >
//           {/* Total Files */}
//           <div
//             style={{
//               ...cardBase,
//               background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)",
//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#f4eaf1ff" }}>
//               TOTAL FILES
//             </div>
//             <div
//               style={{
//                 fontSize: 32,
//                 fontWeight: 700,
//                 marginTop: 6,
//                 color: "#f0ecf0ff",
//               }}
//             >
//               {files.length}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 8, color: "#ece8ebff" }}>
//               All torrents being tracked by this instance.
//             </div>
//           </div>

//           {/* Active Peers */}
//           <div
//             style={{
//               ...cardBase,
//               background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)",
//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#f8f4f7ff" }}>
//               ACTIVE PEERS
//             </div>
//             <div
//               style={{
//                 fontSize: 32,
//                 fontWeight: 700,
//                 marginTop: 6,
//                 color: "#faf8faff",
//               }}
//             >
//               {totalPeers}
//             </div>
//             <div style={{ fontSize: 11, marginTop: 8, color: "#f5eef3ff" }}>
//               Seeders & leechers in the selected swarm.
//             </div>
//           </div>

//           {/* Auto Refresh */}
//           <div
//             style={{
//               ...cardBase,
//               background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)",
//             }}
//           >
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#d8d8d8ff" }}>
//               AUTO REFRESH
//             </div>
//             <div
//               style={{
//                 marginTop: 10,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <span
//                 style={{
//                   fontSize: 28,
//                   fontWeight: 700,
//                   color: autoRefresh ? "#fafafaff" : "#f2e30bff",
//                 }}
//               >
//                 {autoRefresh ? "ON" : "OFF"}
//               </span>
//               <label
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: 8,
//                   fontSize: 12,
//                   color: "#ece4eaff",
//                   cursor: "pointer",
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={autoRefresh}
//                   onChange={(e) => setAutoRefresh(e.target.checked)}
//                 />
//                 <span>Refresh every 2s</span>
//               </label>
//             </div>
//           </div>
//         </section>

//         {/* --------------------------- FILES SECTION --------------------------- */}
//         <section
//           id="files-section"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "2fr 1.1fr",
//             gap: 18,
//             marginTop: 6,
//           }}
//         >
//           {/* Left: Files Table */}
//           <div style={cardBase}>
//             {/* ✨ FIX INSERTED HERE — toggle added */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: 10,
//               }}
//             >
//               <h3
//                 style={{
//                   margin: 0,
//                   fontSize: 16,
//                   color: "#31145c",
//                   fontWeight: 600,
//                 }}
//               >
//                 Files / Swarms
//               </h3>

//               <label
//                 style={{
//                   fontSize: 12,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 6,
//                   color: "#6a4c9f",
//                 }}
//               >
//                 <input
//                   type="checkbox"
//                   checked={showMineOnly}
//                   onChange={(e) => setShowMineOnly(e.target.checked)}
//                 />
//                 Show only my files
//               </label>
//             </div>
//             {/* ✨ FIX ENDS HERE */}

//             {loading ? (
//               <p>Loading files...</p>
//             ) : visibleFiles.length === 0 ? (
//               <p>No files found.</p>
//             ) : (
//               <div
//                 style={{
//                   borderRadius: 16,
//                   overflow: "hidden",
//                   border: "1px solid #ece5ff",
//                 }}
//               >
//                 <table
//                   style={{
//                     width: "100%",
//                     borderCollapse: "collapse",
//                     fontSize: 12,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       background:
//                         "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
//                     }}
//                   >
//                     <tr>
//                       {[
//                         "Select",
//                         "Name",
//                         "Size (MB)",
//                         "InfoHash",
//                         "Pieces",
//                         "Seeders",
//                         "Leechers",
//                       ].map((h) => (
//                         <th
//                           key={h}
//                           style={{
//                             padding: "8px 10px",
//                             textAlign: "left",
//                             color: "#5b418f",
//                             fontWeight: 600,
//                             borderBottom: "1px solid #e2d6ff",
//                           }}
//                         >
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {visibleFiles.map((f, idx) => (
//                       <tr
//                         key={f._id}
//                         style={{
//                           backgroundColor:
//                             idx % 2 === 0 ? "#fff" : "#fbf7ff",
//                         }}
//                       >
//                         <td style={{ padding: "7px 10px" }}>
//                           <input
//                             type="radio"
//                             name="selectedFile"
//                             checked={selectedFileId === f._id}
//                             onClick={() => {
//                               if (selectedFileId === f._id) {
//                                 setSelectedFileId("");  // unselect
//                               } else {
//                                 setSelectedFileId(f._id); // select
//                               }
//                             }}
//                             readOnly
//                           />
//                         </td>
//                         <td style={{ padding: "7px 10px" }}>{f.name}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.sizeMB}</td>
//                         <td
//                           style={{
//                             padding: "7px 10px",
//                             fontFamily: "monospace",
//                             fontSize: 11,
//                           }}
//                         >
//                           {f.infoHash}
//                         </td>
//                         <td style={{ padding: "7px 10px" }}>{f.pieceCount}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.seeders}</td>
//                         <td style={{ padding: "7px 10px" }}>{f.leechers}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             {/* Create File Form */}
//             <form
//               onSubmit={createFile}
//               style={{
//                 marginTop: 14,
//                 display: "flex",
//                 gap: 10,
//                 alignItems: "center",
//               }}
//             >
//               <input
//                 placeholder="New file name"
//                 value={newFileName}
//                 onChange={(e) => setNewFileName(e.target.value)}
//                 style={{
//                   flex: 1,
//                   borderRadius: 999,
//                   border: "1px solid #e1d4ff",
//                   padding: "7px 12px",
//                   fontSize: 12,
//                   outline: "none",
//                 }}
//               />
//               <input
//                 placeholder="Size (MB)"
//                 value={newFileSize}
//                 onChange={(e) => setNewFileSize(e.target.value)}
//                 style={{
//                   width: 110,
//                   borderRadius: 999,
//                   border: "1px solid #e1d4ff",
//                   padding: "7px 12px",
//                   fontSize: 12,
//                   outline: "none",
//                 }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   borderRadius: 999,
//                   padding: "8px 16px",
//                   border: "none",
//                   background:
//                     "linear-gradient(90deg, #ff7ad9, #ff5ca8, #ff4c93)",
//                   color: "#fff",
//                   fontSize: 12,
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   boxShadow: "0 8px 16px rgba(255, 92, 168, 0.4)",
//                 }}
//               >
//                 + Create
//               </button>
//             </form>
//           </div>

//           {/* Right Side Join */}
//           <div style={cardBase}>
//             <h3
//               style={{
//                 marginTop: 0,
//                 marginBottom: 8,
//                 fontSize: 16,
//                 color: "#31145c",
//               }}
//             >
//               Join Swarm (Simulate Peer)
//             </h3>

//             {!selectedFileId ? (
//               <p style={{ fontSize: 13, color: "#777" }}>
//                 Select a file in the table to add peers.
//               </p>
//             ) : (
//               <form
//                 onSubmit={joinSwarm}
//                 style={{
//                   display: "flex",
//                   gap: 8,
//                   marginBottom: 12,
//                   alignItems: "center",
//                 }}
//               >
//                 <input
//                   placeholder="Client Name"
//                   value={clientName}
//                   onChange={(e) => setClientName(e.target.value)}
//                   style={{
//                     flex: 1,
//                     borderRadius: 999,
//                     border: "1px solid #e1d4ff",
//                     padding: "7px 12px",
//                     fontSize: 12,
//                     outline: "none",
//                   }}
//                 />
//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   style={{
//                     borderRadius: 999,
//                     border: "1px solid #e1d4ff",
//                     padding: "7px 10px",
//                     fontSize: 12,
//                     outline: "none",
//                     background: "#fdfbff",
//                   }}
//                 >
//                   <option value="leecher">Leecher</option>
//                   <option value="seeder">Seeder</option>
//                 </select>

//                 <button
//                   type="submit"
//                   style={{
//                     borderRadius: 999,
//                     padding: "8px 16px",
//                     border: "none",
//                     background:
//                       "linear-gradient(90deg,#8f7bff,#5b4bff)",
//                     color: "#fff",
//                     fontSize: 12,
//                     fontWeight: 600,
//                     cursor: "pointer",
//                     boxShadow: "0 8px 18px rgba(76, 64, 196, 0.45)",
//                   }}
//                 >
//                   Join
//                 </button>
//               </form>
//             )}

//             <div style={{ marginTop: 8 }}>
//               <h4
//                 style={{
//                   margin: "6px 0",
//                   fontSize: 13,
//                   color: "#4a2b85",
//                   fontWeight: 600,
//                 }}
//               >
//                 File Pieces
//               </h4>
//               {pieceVisualization()}
//             </div>
//           </div>
//         </section>

//         {/* --------------------------- PEERS SECTION --------------------------- */}
//         <section
//           id="peers-section"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1.6fr 1.1fr",
//             gap: 18,
//             marginTop: 4,
//           }}
//         >
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {/* Peers Table */}
//             <div style={cardBase}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Peers in Selected Swarm
//               </h3>

//               {!selectedFileId ? (
//                 <p>Select a file above.</p>
//               ) : peers.length === 0 ? (
//                 <p>No peers yet.</p>
//               ) : (
//                 <div
//                   style={{
//                     borderRadius: 16,
//                     overflow: "hidden",
//                     border: "1px solid #ece5ff",
//                   }}
//                 >
//                   <table
//                     style={{
//                       width: "100%",
//                       borderCollapse: "collapse",
//                       fontSize: 12,
//                     }}
//                   >
//                     <thead
//                       style={{
//                         background:
//                           "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
//                       }}
//                     >
//                       <tr>
//                         {["Client", "Status", "Progress", "Joined At", "Leave"].map(
//                           (h) => (
//                             <th
//                               key={h}
//                               style={{
//                                 padding: "8px 10px",
//                                 textAlign: "left",
//                                 color: "#5b418f",
//                                 fontWeight: 600,
//                                 borderBottom: "1px solid #e2d6ff",
//                               }}
//                             >
//                               {h}
//                             </th>
//                           )
//                         )}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {peers.map((p, idx) => (
//                         <tr
//                           key={p._id}
//                           style={{
//                             backgroundColor:
//                               idx % 2 === 0 ? "#fff" : "#fbf7ff",
//                           }}
//                         >
//                           <td style={{ padding: "7px 10px" }}>
//                             {p.clientName}
//                           </td>
//                           <td
//                             style={{
//                               padding: "7px 10px",
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             {p.status}
//                           </td>
//                           <td style={{ padding: "7px 10px", minWidth: 150 }}>
//                             <div
//                               style={{
//                                 background: "#f2ebff",
//                                 borderRadius: 999,
//                                 overflow: "hidden",
//                                 height: 10,
//                                 marginBottom: 2,
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: `${p.progress || 0}%`,
//                                   height: "100%",
//                                   background:
//                                     p.status === "seeder"
//                                       ? "linear-gradient(90deg,#6ee7b7,#22c55e)"
//                                       : "linear-gradient(90deg,#fbbf24,#f97316)",
//                                 }}
//                               />
//                             </div>
//                             <span
//                               style={{
//                                 fontSize: 11,
//                                 color: "#6a4c9f",
//                               }}
//                             >
//                               {Math.round(p.progress || 0)}%
//                             </span>
//                           </td>
//                           <td style={{ padding: "7px 10px" }}>
//                             {new Date(p.createdAt).toLocaleTimeString()}
//                           </td>
//                           <td style={{ padding: "7px 10px" }}>
//                             <button
//                               onClick={() => leaveSwarm(p._id)}
//                               style={{
//                                 borderRadius: 999,
//                                 padding: "4px 10px",
//                                 border: "none",
//                                 background:
//                                   "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
//                                 color: "#fff",
//                                 fontSize: 11,
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Leave
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>

//             {/* Swarm Graph */}
//             <div style={cardBase}>
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Peer-to-Peer Swarm Graph
//               </h3>
//               <SwarmGraph file={selectedFile} peers={peers} />
//             </div>
//           </div>

//           {/* Right: Chart + Activity */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <div
//               style={{
//                 ...cardBase,
//                 background:
//                   "linear-gradient(145deg,#fee9ff 0%,#f7e4ff 40%,#e6e5ff 100%)",
//               }}
//             >
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Seeder / Leecher Distribution
//               </h3>
//               <SeederChart seeders={totalSeeders} leechers={totalLeechers} />
//             </div>

//             <div
//               id="activity-section"
//               style={{
//                 ...cardBase,
//                 maxHeight: 280,
//                 overflow: "hidden",
//               }}
//             >
//               <h3
//                 style={{
//                   marginTop: 0,
//                   marginBottom: 6,
//                   fontSize: 16,
//                   color: "#31145c",
//                 }}
//               >
//                 Activity Log
//               </h3>
//               <ActivityLog activity={activity} />
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../api";
import SeederChart from "./SeederChart";
import ActivityLog from "./ActivityLog";
import SwarmGraph from "./SwarmGraph";

const cardBase = {
  borderRadius: 24,
  background: "rgba(255,255,255,0.96)",
  boxShadow: "0 18px 35px rgba(24, 10, 60, 0.22)",
  padding: 18,
};

export default function TrackerDashboard({ user }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newFileName, setNewFileName] = useState("");
  const [newFileSize, setNewFileSize] = useState("");

  const [showMineOnly, setShowMineOnly] = useState(false);

  const [selectedFileId, setSelectedFileId] = useState("");
  const [clientName, setClientName] = useState("Client-1");
  const [status, setStatus] = useState("leecher");
  const [peers, setPeers] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [activity, setActivity] = useState([]);

  // ⭐ NEW SEARCH STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await api.get("/tracker/files");
      setFiles(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch files error", err);
    }
  };

  const fetchPeers = async (fileId) => {
    if (!fileId) return;
    try {
      const res = await api.get(`/tracker/peers/${fileId}`);
      setPeers(res.data);
    } catch (err) {
      console.error("Fetch peers error", err);
    }
  };

  const fetchActivity = async (fileId) => {
    if (!fileId) return;
    try {
      const res = await api.get(`/tracker/activity/${fileId}?limit=50`);
      setActivity(res.data);
    } catch (err) {
      console.error("Fetch activity error", err);
    }
  };

  const tickSimulation = async () => {
    try {
      await api.post("/tracker/tick");
    } catch (err) {
      console.error("Tick error", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (!selectedFileId) return;
    fetchPeers(selectedFileId);
    fetchActivity(selectedFileId);
  }, [selectedFileId]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      tickSimulation();
      fetchFiles();
      if (selectedFileId) {
        fetchPeers(selectedFileId);
        fetchActivity(selectedFileId);
      }
    }, 2000);
    return () => clearInterval(id);
  }, [autoRefresh, selectedFileId]);

  const createFile = async (e) => {
    e.preventDefault();
    if (!newFileName) return;
    try {
      await api.post("/tracker/file", {
        name: newFileName,
        sizeMB: Number(newFileSize) || 0,
      });
      setNewFileName("");
      setNewFileSize("");
      fetchFiles();
    } catch (err) {
      console.error("Create file error", err);
    }
  };

  const joinSwarm = async (e) => {
    e.preventDefault();
    if (!selectedFileId || !clientName) return;
    try {
      await api.post("/tracker/join", {
        fileId: selectedFileId,
        clientName,
        status,
      });
      fetchFiles();
      fetchPeers(selectedFileId);
      fetchActivity(selectedFileId);
    } catch (err) {
      console.error("Join swarm error", err);
    }
  };

  const leaveSwarm = async (peerId) => {
    try {
      await api.post("/tracker/leave", { peerId });
      fetchFiles();
      fetchPeers(selectedFileId);
      fetchActivity(selectedFileId);
    } catch (err) {
      console.error("Leave swarm error", err);
    }
  };

  // ⭐ SEARCH LOGIC
  const handleSearch = (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const match = files.filter((f) =>
      f.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(match);
  };

  // ⭐ APPLY SEARCH FILTER
  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleFiles = showMineOnly
    ? filtered.filter((f) => f.createdBy === user.id)
    : filtered;

  const selectedFile = files.find((f) => f._id === selectedFileId);

  const pieceVisualization = () => {
    if (!selectedFile || !selectedFile.pieceCount) return null;

    const pieceCount = selectedFile.pieceCount;
    if (peers.length === 0) return <p>No peers, no pieces available.</p>;

    const avgProgress =
      peers.reduce((sum, p) => sum + (p.progress || 0), 0) / peers.length;

    const piecesAvailable = Math.max(
      0,
      Math.min(pieceCount, Math.round((avgProgress / 100) * pieceCount))
    );

    const boxes = [];
    for (let i = 0; i < pieceCount; i++) {
      const filled = i < piecesAvailable;
      boxes.push(
        <div
          key={i}
          style={{
            width: 14,
            height: 14,
            margin: 2,
            borderRadius: 4,
            backgroundColor: filled ? "#ff7ad9" : "#eee",
          }}
        />
      );
    }

    return (
      <div>
        <p style={{ marginBottom: 8, fontSize: 13, color: "#555" }}>
          Pieces: <strong>{pieceCount}</strong> — Estimated available:{" "}
          <strong>{piecesAvailable}</strong> ({avgProgress.toFixed(0)}% avg)
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 260 }}>
          {boxes}
        </div>
      </div>
    );
  };

  const totalSeeders = selectedFile ? selectedFile.seeders : 0;
  const totalLeechers = selectedFile ? selectedFile.leechers : 0;
  const totalPeers = totalSeeders + totalLeechers;

  return (
    <div
      style={{
        display: "flex",
        padding: 24,
        gap: 22,
        color: "#1c123f",
        background:
          "radial-gradient(circle at center, #f3e8ff 0%, #d8b4fe 20%, #a855f7 50%, #6b21a8 100%)",
        minHeight: "100vh",
      }}
    >
      {/* --------------------------- SIDEBAR --------------------------- */}
      <aside
        style={{
          width: 230,
          borderRadius: 26,
          background: "#2d1268",
          color: "#fff",
          padding: 20,
          boxShadow: "0 18px 35px rgba(11, 5, 30, 0.55)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "sticky",
          top: 20,
          height: "calc(100vh - 40px)",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%,#ffe6ff,#ff9cf2,#ff5ca8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: 700,
                color: "#3b0b68",
                marginBottom: 10,
              }}
            >
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{user.name}</div>
              <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>
                BitTorrent Tracker
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Dashboard", icon: "📊", scrollTo: "top-section" },
              { label: "Files", icon: "📁", scrollTo: "files-section" },
              { label: "Peers", icon: "👥", scrollTo: "peers-section" },
              { label: "Activity", icon: "📝", scrollTo: "activity-section" },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() =>
                  document
                    .getElementById(item.scrollTo)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 999,
                  background: "rgba(255, 255, 255, 0.18)",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, opacity: 0.9 }}>
          <div style={{ marginBottom: 10, opacity: 0.8 }}>Auto Refresh</div>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <span>Every 2 seconds</span>
          </label>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            style={{
              marginTop: 20,
              width: "100%",
              borderRadius: 999,
              padding: "10px 14px",
              border: "none",
              background: "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* --------------------------- MAIN AREA --------------------------- */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
        <div id="top-section"></div>

        {/* HEADER */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 24,
                color: "#faf3ff",
                textShadow: "0 3px 6px rgba(0,0,0,0.3)",
              }}
            >
              Tracker Dashboard
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: "#fbe3ff",
                opacity: 0.9,
              }}
            >
              Monitor files, peers and swarm activity in real-time.
            </p>
          </div>

          {/* ⭐ NEW SEARCH BAR WITH SUGGESTIONS */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                minWidth: 260,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.96)",
                boxShadow: "0 10px 22px rgba(26, 11, 66, 0.35)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16, color: "#ff66c7" }}>🔍</span>

              <input
                placeholder="Search file by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: 13,
                  background: "transparent",
                  color: "#3b145f",
                }}
              />
            </div>

            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "48px",
                  left: 0,
                  width: "100%",
                  background: "#ffffff",
                  borderRadius: 12,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
                  zIndex: 999,
                }}
              >
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedFileId(item._id);
                      setSearchTerm(item.name);
                      setSuggestions([]);
                    }}
                    style={{
                      padding: "10px 12px",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#3b145f",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* --------------------------- STATS CARDS --------------------------- */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          <div style={{ ...cardBase, background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f4eaf1ff" }}>
              TOTAL FILES
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                marginTop: 6,
                color: "#f0ecf0ff",
              }}
            >
              {files.length}
            </div>
          </div>

          <div style={{ ...cardBase, background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#f8f4f7ff" }}>
              ACTIVE PEERS
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                marginTop: 6,
                color: "#faf8faff",
              }}
            >
              {totalPeers}
            </div>
          </div>

          <div style={{ ...cardBase, background: "linear-gradient(90deg, #2d1268, #4b1c8c, #6d2fb5)" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#d8d8d8ff" }}>
              AUTO REFRESH
            </div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: autoRefresh ? "#fafafaff" : "#f2e30bff",
                }}
              >
                {autoRefresh ? "ON" : "OFF"}
              </span>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: "#ece4eaff",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span>Refresh every 2s</span>
              </label>
            </div>
          </div>
        </section>

        {/* --------------------------- FILES SECTION --------------------------- */}
        <section
          id="files-section"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.1fr",
            gap: 18,
            marginTop: 6,
          }}
        >
          <div style={cardBase}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  color: "#31145c",
                  fontWeight: 600,
                }}
              >
                Files / Swarms
              </h3>

              <label
                style={{
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#6a4c9f",
                }}
              >
                <input
                  type="checkbox"
                  checked={showMineOnly}
                  onChange={(e) => setShowMineOnly(e.target.checked)}
                />
                Show only my files
              </label>
            </div>

            {loading ? (
              <p>Loading files...</p>
            ) : visibleFiles.length === 0 ? (
              <p>No files found.</p>
            ) : (
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #ece5ff",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                  }}
                >
                  <thead
                    style={{
                      background:
                        "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
                    }}
                  >
                    <tr>
                      {[
                        "Select",
                        "Name",
                        "Size (MB)",
                        "InfoHash",
                        "Pieces",
                        "Seeders",
                        "Leechers",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "8px 10px",
                            textAlign: "left",
                            color: "#5b418f",
                            fontWeight: 600,
                            borderBottom: "1px solid #e2d6ff",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleFiles.map((f, idx) => (
                      <tr
                        key={f._id}
                        style={{
                          backgroundColor:
                            idx % 2 === 0 ? "#fff" : "#fbf7ff",
                        }}
                      >
                        <td style={{ padding: "7px 10px" }}>
                          <input
                            type="radio"
                            name="selectedFile"
                            checked={selectedFileId === f._id}
                            onClick={() => {
                              if (selectedFileId === f._id) {
                                setSelectedFileId("");
                              } else {
                                setSelectedFileId(f._id);
                              }
                            }}
                            readOnly
                          />
                        </td>
                        <td style={{ padding: "7px 10px" }}>{f.name}</td>
                        <td style={{ padding: "7px 10px" }}>{f.sizeMB}</td>
                        <td
                          style={{
                            padding: "7px 10px",
                            fontFamily: "monospace",
                            fontSize: 11,
                          }}
                        >
                          {f.infoHash}
                        </td>
                        <td style={{ padding: "7px 10px" }}>{f.pieceCount}</td>
                        <td style={{ padding: "7px 10px" }}>{f.seeders}</td>
                        <td style={{ padding: "7px 10px" }}>{f.leechers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <form
              onSubmit={createFile}
              style={{
                marginTop: 14,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <input
                placeholder="New file name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                style={{
                  flex: 1,
                  borderRadius: 999,
                  border: "1px solid #e1d4ff",
                  padding: "7px 12px",
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <input
                placeholder="Size (MB)"
                value={newFileSize}
                onChange={(e) => setNewFileSize(e.target.value)}
                style={{
                  width: 110,
                  borderRadius: 999,
                  border: "1px solid #e1d4ff",
                  padding: "7px 12px",
                  fontSize: 12,
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  borderRadius: 999,
                  padding: "8px 16px",
                  border: "none",
                  background:
                    "linear-gradient(90deg, #ff7ad9, #ff5ca8, #ff4c93)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                + Create
              </button>
            </form>
          </div>

          <div style={cardBase}>
            <h3
              style={{
                marginTop: 0,
                marginBottom: 8,
                fontSize: 16,
                color: "#31145c",
              }}
            >
              Join Swarm (Simulate Peer)
            </h3>

            {!selectedFileId ? (
              <p style={{ fontSize: 13, color: "#777" }}>
                Select a file in the table to add peers.
              </p>
            ) : (
              <form
                onSubmit={joinSwarm}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Client Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    border: "1px solid #e1d4ff",
                    padding: "7px 12px",
                    fontSize: 12,
                    outline: "none",
                  }}
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{
                    borderRadius: 999,
                    border: "1px solid #e1d4ff",
                    padding: "7px 10px",
                    fontSize: 12,
                    outline: "none",
                    background: "#fdfbff",
                  }}
                >
                  <option value="leecher">Leecher</option>
                  <option value="seeder">Seeder</option>
                </select>

                <button
                  type="submit"
                  style={{
                    borderRadius: 999,
                    padding: "8px 16px",
                    border: "none",
                    background:
                      "linear-gradient(90deg,#8f7bff,#5b4bff)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Join
                </button>
              </form>
            )}

            <div style={{ marginTop: 8 }}>
              <h4
                style={{
                  margin: "6px 0",
                  fontSize: 13,
                  color: "#4a2b85",
                  fontWeight: 600,
                }}
              >
                File Pieces
              </h4>
              {pieceVisualization()}
            </div>
          </div>
        </section>

        {/* --------------------------- PEERS SECTION --------------------------- */}
        <section
          id="peers-section"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1.1fr",
            gap: 18,
            marginTop: 4,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={cardBase}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 6,
                  fontSize: 16,
                  color: "#31145c",
                }}
              >
                Peers in Selected Swarm
              </h3>

              {!selectedFileId ? (
                <p>Select a file above.</p>
              ) : peers.length === 0 ? (
                <p>No peers yet.</p>
              ) : (
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid #ece5ff",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 12,
                    }}
                  >
                    <thead
                      style={{
                        background:
                          "linear-gradient(90deg,#f9e4ff,#f4e9ff,#e8f0ff)",
                      }}
                    >
                      <tr>
                        {["Client", "Status", "Progress", "Joined At", "Leave"].map(
                          (h) => (
                            <th
                              key={h}
                              style={{
                                padding: "8px 10px",
                                textAlign: "left",
                                color: "#5b418f",
                                fontWeight: 600,
                                borderBottom: "1px solid #e2d6ff",
                              }}
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {peers.map((p, idx) => (
                        <tr
                          key={p._id}
                          style={{
                            backgroundColor:
                              idx % 2 === 0 ? "#fff" : "#fbf7ff",
                          }}
                        >
                          <td style={{ padding: "7px 10px" }}>
                            {p.clientName}
                          </td>
                          <td
                            style={{
                              padding: "7px 10px",
                              textTransform: "capitalize",
                            }}
                          >
                            {p.status}
                          </td>
                          <td style={{ padding: "7px 10px", minWidth: 150 }}>
                            <div
                              style={{
                                background: "#f2ebff",
                                borderRadius: 999,
                                overflow: "hidden",
                                height: 10,
                                marginBottom: 2,
                              }}
                            >
                              <div
                                style={{
                                  width: `${p.progress || 0}%`,
                                  height: "100%",
                                  background:
                                    p.status === "seeder"
                                      ? "linear-gradient(90deg,#6ee7b7,#22c55e)"
                                      : "linear-gradient(90deg,#fbbf24,#f97316)",
                                }}
                              />
                            </div>
                            <span
                              style={{
                                fontSize: 11,
                                color: "#6a4c9f",
                              }}
                            >
                              {Math.round(p.progress || 0)}%
                            </span>
                          </td>
                          <td style={{ padding: "7px 10px" }}>
                            {new Date(p.createdAt).toLocaleTimeString()}
                          </td>
                          <td style={{ padding: "7px 10px" }}>
                            <button
                              onClick={() => leaveSwarm(p._id)}
                              style={{
                                borderRadius: 999,
                                padding: "4px 10px",
                                border: "none",
                                background:
                                  "linear-gradient(135deg,#ff7a7a,#ff4b4b)",
                                color: "#fff",
                                fontSize: 11,
                                cursor: "pointer",
                              }}
                            >
                              Leave
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div style={cardBase}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 6,
                  fontSize: 16,
                  color: "#31145c",
                }}
              >
                Peer-to-Peer Swarm Graph
              </h3>
              <SwarmGraph file={selectedFile} peers={peers} />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                ...cardBase,
                background:
                  "linear-gradient(145deg,#fee9ff 0%,#f7e4ff 40%,#e6e5ff 100%)",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 6,
                  fontSize: 16,
                  color: "#31145c",
                }}
              >
                Seeder / Leecher Distribution
              </h3>
              <SeederChart seeders={totalSeeders} leechers={totalLeechers} />
            </div>

            <div
              id="activity-section"
              style={{
                ...cardBase,
                maxHeight: 280,
                overflow: "hidden",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 6,
                  fontSize: 16,
                  color: "#31145c",
                }}
              >
                Activity Log
              </h3>
              <ActivityLog activity={activity} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
