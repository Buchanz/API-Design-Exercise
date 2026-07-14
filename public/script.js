const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const statusMessage = document.querySelector("#statusMessage");
const refreshBtn = document.querySelector("#refreshBtn");

function setMessage(message) {
  statusMessage.textContent = message;
}

function formatLabel(value) {
  return value.replace("_", " ");
}

function formatDate(value) {
  if (!value) {
    return "No due date";
  }

  return new Date(value).toLocaleDateString();
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body.error?.message || "Request failed.";
    throw new Error(message);
  }

  return body;
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = '<div class="empty">No tasks yet. Create one above.</div>';
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("article");
    card.className = "task-card";
    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || "No description provided."}</p>
      <div class="meta-row">
        <span class="pill">Status: ${formatLabel(task.status)}</span>
        <span class="pill">Priority: ${task.priority}</span>
        <span class="pill">Due: ${formatDate(task.dueDate)}</span>
      </div>
      <div class="actions">
        <button class="secondary" data-action="progress" data-id="${task.id}">In Progress</button>
        <button class="secondary" data-action="done" data-id="${task.id}">Mark Done</button>
        <button class="danger" data-action="delete" data-id="${task.id}">Delete</button>
      </div>
    `;

    taskList.appendChild(card);
  });
}

async function loadTasks() {
  setMessage("Loading tasks...");
  const body = await requestJson("/api/v1/tasks");
  renderTasks(body.data);
  setMessage(`${body.data.length} task${body.data.length === 1 ? "" : "s"} loaded`);
}

async function createTask(event) {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate") || null
  };

  await requestJson("/api/v1/tasks", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  taskForm.reset();
  document.querySelector("#priority").value = "medium";
  document.querySelector("#status").value = "todo";
  await loadTasks();
}

async function handleTaskAction(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  if (action === "delete") {
    await requestJson(`/api/v1/tasks/${id}`, { method: "DELETE" });
  }

  if (action === "done") {
    await requestJson(`/api/v1/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "done" })
    });
  }

  if (action === "progress") {
    await requestJson(`/api/v1/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "in_progress" })
    });
  }

  await loadTasks();
}

taskForm.addEventListener("submit", (event) => {
  createTask(event).catch((error) => setMessage(error.message));
});

taskList.addEventListener("click", (event) => {
  handleTaskAction(event).catch((error) => setMessage(error.message));
});

refreshBtn.addEventListener("click", () => {
  loadTasks().catch((error) => setMessage(error.message));
});

loadTasks().catch((error) => setMessage(error.message));
