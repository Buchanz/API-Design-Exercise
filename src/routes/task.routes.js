const express = require("express");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports = router;

