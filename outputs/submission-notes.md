# Submission Notes

## What to Submit

Submit these files:

1. `task-api-documentation.md`
2. `task-api-postman-collection.json`
3. `openapi.yaml`
4. `mock-tasks.json`
5. The `src/` folder, `package.json`, `.env.example`, and `README.md` if the instructor wants the MongoDB implementation.

## How to Create the Postman Mock API

1. Open Postman.
2. Click **Import**.
3. Import `task-api-postman-collection.json`.
4. Open the imported collection.
5. Click the collection menu and choose **Mock collection**.
6. Let Postman generate a mock server URL.
7. Replace the placeholder base URL in the collection variable `baseUrl` with the generated Postman mock URL.
8. Test the included requests:
   - `GET /tasks`
   - `GET /tasks/tsk_001`
   - `POST /tasks`
   - `PATCH /tasks/tsk_001`
   - `DELETE /tasks/tsk_001`

## How to Run the MongoDB API

1. Install Node.js.
2. Create a MongoDB database using local MongoDB or MongoDB Atlas.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Add your MongoDB connection string to `MONGODB_URI`.
6. Run `npm run seed` to insert sample data.
7. Run `npm run dev` or `npm start`.
8. Test the API at `http://localhost:3000/api/v1/tasks`.

## Short Presentation Script

I designed and implemented a simple RESTful API for a task management application. The API uses Node.js, Express, MongoDB, and Mongoose. It supports creating, reading, updating, and deleting tasks. Each task has an ID, title, description, status, priority, due date, and timestamps.

The API uses standard HTTP methods:

- `GET` to read tasks
- `POST` to create a task
- `PATCH` to update a task
- `DELETE` to remove a task

I also included consistent status codes and error responses, such as `400 Bad Request` for validation errors and `404 Not Found` when a task ID does not exist. The API does not require authentication for the mock version, but a real production version could use bearer token authentication.
