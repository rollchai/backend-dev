import React, { useState, useEffect } from "react";
import API from "../api/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    await API.post("/tasks", taskForm);
    setTaskForm({ title: "", description: "" });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h3>Your Tasks</h3>
      <input name="title" placeholder="Title" value={taskForm.title} onChange={handleChange} />
      <input name="description" placeholder="Description" value={taskForm.description} onChange={handleChange} />
      <button onClick={handleAdd}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <b>{t.title}</b> - {t.description} 
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
