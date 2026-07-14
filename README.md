# Task Management API

A small RESTful task management app built with Node.js, Express, MongoDB, and Mongoose. It includes a simple browser interface for testing the API without needing Postman.

## Features

- Create, view, update, and delete tasks
- Store tasks in MongoDB Atlas
- Filter tasks by status or priority through the API
- Test the app through a basic browser UI
- Import the included Postman collection for mock/API testing

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- HTML, CSS, and JavaScript

## Project Structure

```text
.
├── docs/                 API documentation, OpenAPI file, and Postman collection
├── public/               Basic browser UI
├── src/                  Express API source code
│   ├── config/           MongoDB connection
│   ├── controllers/      Request handlers
│   ├── middleware/       Error handling
│   ├── models/           Mongoose task model
│   └── routes/           API routes
├── .env.example          Example environment variables
├── package.json          Project scripts and dependencies
└── README.md
```

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` with your MongoDB Atlas password:

```text
PORT=3000
MONGODB_URI=mongodb+srv://xbuchanz:<db_password>@xbuchanz-dev.rcutwd8.mongodb.net/task_management_api?appName=xbuchanz-dev
```

Replace `<db_password>` with the password for the `xbuchanz` MongoDB database user. Do not commit the real `.env` file.

Seed the database with sample tasks:

```bash
npm run seed
```

Start the server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## Testing

Open the browser UI:

```text
http://localhost:3000
```

Test the API directly:

```bash
curl http://localhost:3000/api/v1/tasks
```

Create a task with curl:

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test the API","description":"Create a task from curl","status":"todo","priority":"medium","dueDate":"2026-07-20"}'
```

Use Postman:

1. Open Postman.
2. Import `docs/postman-collection.json`.
3. Run the included requests against `http://localhost:3000/api/v1`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/tasks` | Get all tasks |
| `GET` | `/api/v1/tasks/:id` | Get one task by ID |
| `POST` | `/api/v1/tasks` | Create a task |
| `PATCH` | `/api/v1/tasks/:id` | Update a task |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task |

Optional filters:

```text
GET /api/v1/tasks?status=todo
GET /api/v1/tasks?priority=high
```

## Task Model

```json
{
  "title": "Finish API design exercise",
  "description": "Create endpoints, sample payloads, and documentation.",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2026-07-16"
}
```

Valid `status` values:

- `todo`
- `in_progress`
- `done`

Valid `priority` values:

- `low`
- `medium`
- `high`

## Documentation

- `docs/api-documentation.md`: written API documentation
- `docs/openapi.yaml`: OpenAPI specification
- `docs/postman-collection.json`: Postman collection
- `docs/sample-tasks.json`: sample task data
- `docs/submission-notes.md`: short notes for class submission
