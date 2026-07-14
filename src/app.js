const cors = require("cors");
const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/tasks", taskRoutes);
app.use(errorHandler);

module.exports = app;
