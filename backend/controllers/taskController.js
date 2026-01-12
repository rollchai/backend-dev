const Task = require("../models/Task");

// Get Tasks (all for admin, user-specific for normal user)
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = req.user.role === "admin" ? 
      await Task.find() : 
      await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch(err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch(err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: "Task not found" });
    if(task.user.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch(err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne(); // ✅ FIX

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

