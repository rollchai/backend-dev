import React from "react";
import TaskList from "./TaskList";
import { removeToken } from "../utils/auth";

const Dashboard = ({ onLogout }) => {
  const handleLogout = () => {
    removeToken();
    onLogout();
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>📊 Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📝 Your Tasks</h3>
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px 25px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    marginBottom: "25px",
  },
  title: {
    margin: 0,
    color: "#333",
  },
  logoutBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    marginBottom: "15px",
    color: "#444",
  },
};
