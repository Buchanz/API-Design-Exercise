const mongoose = require("mongoose");
const Task = require("../models/task.model");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getTasks(req, res, next) {
  try {
    const filters = {};

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.priority) {
      filters.priority = req.query.priority;
    }

    const tasks = await Task.find(filters).sort({ createdAt: -1 });
    res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
}

async function getTaskById(req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({
        error: {
          code: "TASK_NOT_FOUND",
          message: `No task was found with id ${req.params.id}.`
        }
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: {
          code: "TASK_NOT_FOUND",
          message: `No task was found with id ${req.params.id}.`
        }
      });
    }

    res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ data: task });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({
        error: {
          code: "TASK_NOT_FOUND",
          message: `No task was found with id ${req.params.id}.`
        }
      });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({
        error: {
          code: "TASK_NOT_FOUND",
          message: `No task was found with id ${req.params.id}.`
        }
      });
    }

    res.status(200).json({ data: task });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({
        error: {
          code: "TASK_NOT_FOUND",
          message: `No task was found with id ${req.params.id}.`
        }
      });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: {
          code: "TASK_NOT_FOUND",
          message: `No task was found with id ${req.params.id}.`
        }
      });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

