# Task Management API

A simple RESTful API for managing tasks. Built with Node.js, Express, MongoDB Atlas, and Mongoose.

## What It Does

- Creates, reads, updates, and deletes tasks
- Stores task data in MongoDB
- Supports task status, priority, description, and due date
- Includes API documentation, an OpenAPI file, and a Postman collection

## Setup

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```bash
cp .env.example .env
```

Add your MongoDB password to `.env`, then seed and start the API:

```bash
npm run seed
npm start
```

The API runs at:

```text
http://localhost:3000
```

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/tasks` | Get all tasks |
| `GET` | `/api/v1/tasks/:id` | Get one task |
| `POST` | `/api/v1/tasks` | Create a task |
| `PATCH` | `/api/v1/tasks/:id` | Update a task |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task |

## Quick Test

```bash
curl http://localhost:3000/api/v1/tasks
```

## Documentation

Additional assignment documentation is in the `docs/` folder:

- `api-documentation.md`
- `openapi.yaml`
- `postman-collection.json`
- `sample-tasks.json`
- `submission-notes.md`
