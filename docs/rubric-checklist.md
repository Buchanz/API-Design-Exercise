# Rubric Checklist

## Design the API

- Endpoints and HTTP methods are documented in `api-documentation.md`.
- Request and response payload examples are documented in `api-documentation.md`.
- The task data model includes title, description, status, priority, due date, and timestamps.
- OpenAPI documentation is available in `openapi.yaml`.

## Implement the API

- The working Express API is in the `src/` folder.
- MongoDB is used through Mongoose.
- CRUD endpoints are implemented for tasks.
- Sample seed data is available through `npm run seed`.
- A Postman collection is included in `postman-collection.json`.

## Document the API

- The overview and endpoint descriptions are in `api-documentation.md`.
- Status codes and error handling are documented in `api-documentation.md`.
- Authentication notes are included in `api-documentation.md`.
- Setup and quick testing instructions are in the project `README.md`.
