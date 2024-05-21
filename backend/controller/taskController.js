const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    assignedTo: req.user._id,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

module.exports = {
  getTasks,
  createTask,
};
