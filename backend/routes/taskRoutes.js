const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /api/tasks - fetch all tasks (most recent first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
});

// POST /api/tasks - create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
});

// PUT /api/tasks/:id - update a task (edit fields and/or toggle completed)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...(title !== undefined && { title }), ...(description !== undefined && { description }), ...(completed !== undefined && { completed }) },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
});

// DELETE /api/tasks/:id - delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
});

module.exports = router;
