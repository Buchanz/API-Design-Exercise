require("dotenv").config();

const connectDatabase = require("./config/db");
const Task = require("./models/task.model");

const tasks = [
  {
    title: "Finish API design exercise",
    description: "Create endpoints, sample payloads, and documentation.",
    status: "in_progress",
    priority: "high",
    dueDate: "2026-07-16"
  },
  {
    title: "Buy notebook",
    description: "Pick up a notebook for class notes.",
    status: "todo",
    priority: "low",
    dueDate: "2026-07-18"
  },
  {
    title: "Submit project reflection",
    description: "Write a short reflection about API design decisions.",
    status: "done",
    priority: "medium",
    dueDate: "2026-07-15"
  }
];

async function seed() {
  await connectDatabase();
  await Task.deleteMany({});
  await Task.insertMany(tasks);
  console.log("Sample tasks inserted");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

