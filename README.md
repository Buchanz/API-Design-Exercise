# Task Management API

A small RESTful API for managing tasks, built with Node.js, Express, MongoDB Atlas, and Mongoose.

This project was created for an API design exercise. It includes a working backend, sample data, written API documentation, an OpenAPI file, and a Postman collection.

## Features

- Create, read, update, and delete tasks
- Store task data in MongoDB Atlas
- Validate task status and priority values
- Filter tasks by status or priority
- Return consistent JSON error responses
- Provide API documentation and Postman examples

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Postman
- OpenAPI

## Project Structure

```text
.
├── docs/                 API documentation, OpenAPI file, and Postman collection
├── src/                  Express API source code
│   ├── config/           MongoDB connection
│   ├── controllers/      Request handlers
│   ├── middleware/       Error handling
│   ├── models/           Mongoose task model
│   └── routes/           API routes
├── .env.example          Example environment variables
├── .gitignore            Files excluded from Git
├── package-lock.json     Locked dependency versions
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

Replace `<db_password>` with the password for the `xbuchanz` MongoDB database user.

Important: do not commit the real `.env` file. It is ignored by Git.

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

After starting the server, the API runs at:

```text
http://localhost:3000
```

Check the API status:

```bash
curl http://localhost:3000
```

Get all tasks:

```bash
curl http://localhost:3000/api/v1/tasks
```

Create a task:

```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test the API","description":"Create a task from curl","status":"todo","priority":"medium","dueDate":"2026-07-20"}'
```

Update a task:

```bash
curl -X PATCH http://localhost:3000/api/v1/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'
```

Delete a task:

```bash
curl -X DELETE http://localhost:3000/api/v1/tasks/<task_id>
```

You can also import `docs/postman-collection.json` into Postman and run the included requests.

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
