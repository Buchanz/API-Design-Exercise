# Task Management REST API

## Overview

The Task Management API lets a client application create, view, update, and delete tasks. It is designed for a simple to-do or class project task tracker where each task has a title, optional description, status, priority, and due date.

Base URL for mock API:

```text
https://mock.example.com/api/v1
```

For a Postman mock server, replace the base URL with the mock server URL that Postman generates after importing the included collection.

Base URL for the local MongoDB/Express API:

```text
http://localhost:3000/api/v1
```

## Data Model

### Task

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Unique task ID |
| `title` | string | Yes | Short task name |
| `description` | string | No | Longer task details |
| `status` | string | Yes | `todo`, `in_progress`, or `done` |
| `priority` | string | Yes | `low`, `medium`, or `high` |
| `dueDate` | string | No | Due date in `YYYY-MM-DD` format |
| `createdAt` | string | Yes | ISO 8601 timestamp when task was created |
| `updatedAt` | string | Yes | ISO 8601 timestamp when task was last updated |

Example task:

```json
{
  "id": "6876b4a9c96f2c5d12345671",
  "title": "Finish API design exercise",
  "description": "Create endpoints, sample payloads, and documentation.",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2026-07-16",
  "createdAt": "2026-07-14T10:00:00Z",
  "updatedAt": "2026-07-14T10:30:00Z"
}
```

## Authentication

No authentication is required for this mock API. In a production version, requests should use a bearer token:

```http
Authorization: Bearer <token>
```

## Endpoints

### Get All Tasks

Returns a list of tasks. Optional query parameters can filter the results.

```http
GET /tasks
```

Optional query parameters:

| Parameter | Example | Description |
| --- | --- | --- |
| `status` | `todo` | Filter by task status |
| `priority` | `high` | Filter by priority |

Example request:

```http
GET /tasks?status=in_progress&priority=high
```

Example response:

```json
{
  "data": [
    {
      "id": "6876b4a9c96f2c5d12345671",
      "title": "Finish API design exercise",
      "description": "Create endpoints, sample payloads, and documentation.",
      "status": "in_progress",
      "priority": "high",
      "dueDate": "2026-07-16",
      "createdAt": "2026-07-14T10:00:00Z",
      "updatedAt": "2026-07-14T10:30:00Z"
    }
  ]
}
```

Status codes:

| Code | Meaning |
| --- | --- |
| `200 OK` | Tasks returned successfully |

### Get Task by ID

Returns a single task by ID.

```http
GET /tasks/{id}
```

Example response:

```json
{
  "data": {
    "id": "6876b4a9c96f2c5d12345671",
    "title": "Finish API design exercise",
    "description": "Create endpoints, sample payloads, and documentation.",
    "status": "in_progress",
    "priority": "high",
    "dueDate": "2026-07-16",
    "createdAt": "2026-07-14T10:00:00Z",
    "updatedAt": "2026-07-14T10:30:00Z"
  }
}
```

Status codes:

| Code | Meaning |
| --- | --- |
| `200 OK` | Task returned successfully |
| `404 Not Found` | Task ID does not exist |

### Create Task

Creates a new task.

```http
POST /tasks
Content-Type: application/json
```

Request body:

```json
{
  "title": "Study for database quiz",
  "description": "Review MongoDB collections, documents, and CRUD operations.",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2026-07-20"
}
```

Example response:

```json
{
  "data": {
    "id": "6876b4a9c96f2c5d12345674",
    "title": "Study for database quiz",
    "description": "Review MongoDB collections, documents, and CRUD operations.",
    "status": "todo",
    "priority": "medium",
    "dueDate": "2026-07-20",
    "createdAt": "2026-07-14T18:00:00Z",
    "updatedAt": "2026-07-14T18:00:00Z"
  }
}
```

Status codes:

| Code | Meaning |
| --- | --- |
| `201 Created` | Task created successfully |
| `400 Bad Request` | Request body is missing required fields or has invalid values |

### Update Task

Updates an existing task. This endpoint supports partial updates, so the client only needs to send the fields that should change.

```http
PATCH /tasks/{id}
Content-Type: application/json
```

Request body:

```json
{
  "status": "done",
  "priority": "low"
}
```

Example response:

```json
{
  "data": {
    "id": "6876b4a9c96f2c5d12345671",
    "title": "Finish API design exercise",
    "description": "Create endpoints, sample payloads, and documentation.",
    "status": "done",
    "priority": "low",
    "dueDate": "2026-07-16",
    "createdAt": "2026-07-14T10:00:00Z",
    "updatedAt": "2026-07-14T18:15:00Z"
  }
}
```

Status codes:

| Code | Meaning |
| --- | --- |
| `200 OK` | Task updated successfully |
| `400 Bad Request` | Request body has invalid values |
| `404 Not Found` | Task ID does not exist |

### Delete Task

Deletes an existing task.

```http
DELETE /tasks/{id}
```

Example response:

```json
{
  "message": "Task deleted successfully."
}
```

Status codes:

| Code | Meaning |
| --- | --- |
| `200 OK` | Task deleted successfully |
| `404 Not Found` | Task ID does not exist |

## Error Handling

All errors use a consistent JSON structure.

Example validation error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required.",
    "details": [
      {
        "field": "title",
        "issue": "Task title cannot be empty."
      }
    ]
  }
}
```

Example not found error:

```json
{
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "No task was found with id 6876b4a9c96f2c5d12345999."
  }
}
```

## Design Notes

- The API uses plural resource names, such as `/tasks`.
- `GET` requests are read-only.
- `POST` creates a task.
- `PATCH` updates only the fields included in the request body.
- `DELETE` removes a task.
- Status and priority values are limited to a small list to keep the API predictable.
- The MongoDB implementation uses ObjectIds for real task IDs.
