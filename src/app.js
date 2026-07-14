const cors = require("cors");
const express = require("express");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Task Management API",
    docs: "/api/v1/tasks"
  });
});

app.use("/api/v1/tasks", taskRoutes);
app.use(errorHandler);

module.exports = app;

