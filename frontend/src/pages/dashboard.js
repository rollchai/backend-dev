import React from "react";
import TaskList from "./TaskList";
import { removeToken } from "../utils/auth";

const Dashboard = ({ onLogout }) => {
  const handleLogout = () => {
    removeToken();
    onLogout();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <TaskList />
    </div>
  );
};

export default Dashboard;
