# Task Management System REST API

A simple and robust REST API for managing tasks in a to-do application, built with Node.js, Express, and JavaScript. This API provides complete CRUD operations with additional features like pagination, filtering, search functionality, and comprehensive API documentation.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete tasks
- **Data Validation**: Input validation using Joi library
- **Pagination**: Efficient pagination for large datasets
- **Search & Filter**: Filter tasks by status and search by title
- **Statistics**: Get task statistics and counts
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Security**: Helmet.js for security headers, CORS protection
- **Error Handling**: Comprehensive error handling with standardized responses
- **Clean Architecture**: Well-organized code structure with separation of concerns
- **In-Memory Storage**: Fast in-memory database simulation (easily replaceable with real database)

## 📋 Task Object Structure

{
"id": "550e8400-e29b-41d4-a716-446655440000",
"title": "Complete project documentation",
"description": "Write comprehensive README and API documentation",
"status": "PENDING",
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-15T10:30:00.000Z"
}

text

### Task Status Options
- `PENDING` - Task is not yet started
- `IN_PROGRESS` - Task is currently being worked on
- `COMPLETED` - Task has been finished

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Validation**: Joi
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet.js, CORS
- **Logging**: Morgan
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

task-management-api/
├── src/
│ ├── controllers/ # Request handlers
│ │ └── taskController.js
│ ├── models/ # Data models
│ │ └── Task.js
│ ├── routes/ # API routes
│ │ └── taskRoutes.js
│ ├── services/ # Business logic
│ │ └── taskService.js
│ ├── middleware/ # Custom middleware
│ │ └── validation.js
│ ├── utils/ # Utility functions
│ │ └── database.js
│ ├── types/ # Type definitions and helpers
│ │ └── index.js
│ ├── swagger/ # API documentation
│ │ └── swagger.js
│ └── app.js # Application entry point
├── package.json
├── .eslintrc.js
├── .prettierrc
├── .env
├── .gitignore
└── README.md

text

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)

### Installation

1. **Clone or create the project directory:**
mkdir task-management-api
cd task-management-api

text

2. **Initialize the project and install dependencies:**
npm init -y
npm install express joi uuid cors helmet morgan swagger-jsdoc swagger-ui-express dotenv

text

3. **Install development dependencies:**
npm install -D eslint prettier nodemon

text

4. **Create the project structure and add all the source files** as provided in the implementation.

5. **Create environment file:**
Create .env file in project root
echo "PORT=3000
NODE_ENV=development
API_VERSION=v1" > .env

text

### Running the Application

#### Development Mode (with hot reload)
npm run dev

text

#### Production Mode
npm start

text

#### Code Quality
Run ESLint
npm run lint

Fix ESLint issues automatically
npm run lint:fix

Format code with Prettier
npm run format

text

### Verification

Once the server is running, you can verify the installation:

1. **Health Check**: http://localhost:3000/health
2. **API Documentation**: http://localhost:3000/api-docs
3. **API Base URL**: http://localhost:3000/api/v1/tasks

## 📚 API Documentation

### Base URL
http://localhost:3000/api/v1

text

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks (with pagination & filtering) |
| GET | `/tasks/:id` | Get a specific task by ID |
| PUT | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |
| GET | `/tasks/stats` | Get task statistics |

---

### 1. Create Task

**POST** `/api/v1/tasks`

Creates a new task in the system.

#### Request Body
{
"title": "Complete project documentation",
"description": "Write comprehensive README and API documentation",
"status": "PENDING"
}

text

#### Request Fields
- `title` (string, required): Task title (1-100 characters)
- `description` (string, required): Task description (1-500 characters)
- `status` (string, optional): Task status (default: "PENDING")

#### Example Request
curl -X POST http://localhost:3000/api/v1/tasks
-H "Content-Type: application/json"
-d '{
"title": "Complete project documentation",
"description": "Write comprehensive README and API documentation",
"status": "PENDING"
}'

text

#### Success Response (201 Created)
{
"success": true,
"message": "Task created successfully",
"data": {
"id": "550e8400-e29b-41d4-a716-446655440000",
"title": "Complete project documentation",
"description": "Write comprehensive README and API documentation",
"status": "PENDING",
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-15T10:30:00.000Z"
}
}

text

#### Error Response (400 Bad Request)
{
"success": false,
"message": "Validation error",
"error": "Title is required"
}

text

---

### 2. Get All Tasks

**GET** `/api/v1/tasks`

Retrieves all tasks with optional pagination, filtering, and search functionality.

#### Query Parameters
- `page` (number, optional): Page number for pagination (default: 1)
- `limit` (number, optional): Items per page (default: 10, max: 100)
- `status` (string, optional): Filter by task status (PENDING, IN_PROGRESS, COMPLETED)
- `title` (string, optional): Search tasks by title (case-insensitive)

#### Example Requests
Get all tasks with default pagination
curl "http://localhost:3000/api/v1/tasks"

Get tasks with custom pagination
curl "http://localhost:3000/api/v1/tasks?page=1&limit=5"

Filter by status
curl "http://localhost:3000/api/v1/tasks?status=PENDING"

Search by title
curl "http://localhost:3000/api/v1/tasks?title=documentation"

Combine filters
curl "http://localhost:3000/api/v1/tasks?page=1&limit=10&status=IN_PROGRESS&title=project"

text

#### Success Response (200 OK)
{
"success": true,
"message": "Tasks retrieved successfully",
"data": {
"data": [
{
"id": "550e8400-e29b-41d4-a716-446655440000",
"title": "Complete project documentation",
"description": "Write comprehensive README and API documentation",
"status": "PENDING",
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-15T10:30:00.000Z"
},
{
"id": "550e8400-e29b-41d4-a716-446655440001",
"title": "Review code changes",
"description": "Review and approve pending pull requests",
"status": "IN_PROGRESS",
"createdAt": "2024-01-15T11:00:00.000Z",
"updatedAt": "2024-01-15T11:30:00.000Z"
}
],
"pagination": {
"page": 1,
"limit": 10,
"total": 2,
"totalPages": 1,
"hasNext": false,
"hasPrev": false
}
}
}

text

---

### 3. Get Task by ID

**GET** `/api/v1/tasks/:id`

Retrieves a specific task by its unique ID.

#### Path Parameters
- `id` (string, required): Task UUID

#### Example Request
curl "http://localhost:3000/api/v1/tasks/550e8400-e29b-41d4-a716-446655440000"

text

#### Success Response (200 OK)
{
"success": true,
"message": "Task retrieved successfully",
"data": {
"id": "550e8400-e29b-41d4-a716-446655440000",
"title": "Complete project documentation",
"description": "Write comprehensive README and API documentation",
"status": "PENDING",
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-15T10:30:00.000Z"
}
}

text

#### Error Response (404 Not Found)
{
"success": false,
"message": "Task not found"
}

text

#### Error Response (400 Bad Request - Invalid UUID)
{
"success": false,
"message": "Invalid task ID format",
"error": "Task ID must be a valid UUID"
}

text

---

### 4. Update Task

**PUT** `/api/v1/tasks/:id`

Updates an existing task by its ID. You can update any combination of title, description, and status.

#### Path Parameters
- `id` (string, required): Task UUID

#### Request Body
{
"title": "Complete project documentation - Updated",
"description": "Write comprehensive README and API documentation with examples",
"status": "IN_PROGRESS"
}

text

#### Request Fields (all optional, but at least one required)
- `title` (string, optional): New task title (1-100 characters)
- `description` (string, optional): New task description (1-500 characters)
- `status` (string, optional): New task status

#### Example Requests
Update all fields
curl -X PUT http://localhost:3000/api/v1/tasks/550e8400-e29b-41d4-a716-446655440000
-H "Content-Type: application/json"
-d '{
"title": "Complete project documentation - Updated",
"description": "Write comprehensive README and API documentation with examples",
"status": "IN_PROGRESS"
}'

Update only status
curl -X PUT http://localhost:3000/api/v1/tasks/550e8400-e29b-41d4-a716-446655440000
-H "Content-Type: application/json"
-d '{
"status": "COMPLETED"
}'

text

#### Success Response (200 OK)
{
"success": true,
"message": "Task updated successfully",
"data": {
"id": "550e8400-e29b-41d4-a716-446655440000",
"title": "Complete project documentation - Updated",
"description": "Write comprehensive README and API documentation with examples",
"status": "IN_PROGRESS",
"createdAt": "2024-01-15T10:30:00.000Z",
"updatedAt": "2024-01-15T12:00:00.000Z"
}
}

text

#### Error Response (404 Not Found)
{
"success": false,
"message": "Task not found"
}

text

---

### 5. Delete Task

**DELETE** `/api/v1/tasks/:id`

Deletes a task by its ID.

#### Path Parameters
- `id` (string, required): Task UUID

#### Example Request
curl -X DELETE "http://localhost:3000/api/v1/tasks/550e8400-e29b-41d4-a716-446655440000"

text

#### Success Response (200 OK)
{
"success": true,
"message": "Task deleted successfully"
}

text

#### Error Response (404 Not Found)
{
"success": false,
"message": "Task not found"
}

text

---

### 6. Get Task Statistics

**GET** `/api/v1/tasks/stats`

Retrieves statistics about all tasks in the system.

#### Example Request
curl "http://localhost:3000/api/v1/tasks/stats"

text

#### Success Response (200 OK)
{
"success": true,
"message": "Statistics retrieved successfully",
"data": {
"total": 15,
"pending": 5,
"inProgress": 7,
"completed": 3
}
}

text

---

## 🔧 Additional Endpoints

### Health Check

**GET** `/health`

Check if the server is running properly.

#### Example Request
curl "http://localhost:3000/health"

text

#### Success Response (200 OK)
{
"success": true,
"message": "Server is running",
"timestamp": "2024-01-15T12:00:00.000Z",
"uptime": 3600.123
}

text

---

## 📖 Interactive API Documentation

This API includes interactive Swagger/OpenAPI documentation accessible at:

**URL**: http://localhost:3000/api-docs

The Swagger UI provides:
- Complete API specification
- Interactive request/response testing
- Schema definitions
- Example payloads
- Try-it-out functionality

You can also access the raw OpenAPI specification at:
**URL**: http://localhost:3000/api-docs.json

---

## 🎯 Example Usage Scenarios

### Scenario 1: Creating and Managing a Task

1. Create a new task
curl -X POST http://localhost:3000/api/v1/tasks
-H "Content-Type: application/json"
-d '{
"title": "Setup CI/CD Pipeline",
"description": "Configure GitHub Actions for automated testing and deployment"
}'

Response: Task created with ID (e.g., abc123...)
2. Update task status to in-progress
curl -X PUT http://localhost:3000/api/v1/tasks/abc123...
-H "Content-Type: application/json"
-d '{"status": "IN_PROGRESS"}'

3. Complete the task
curl -X PUT http://localhost:3000/api/v1/tasks/abc123...
-H "Content-Type: application/json"
-d '{"status": "COMPLETED"}'

text

### Scenario 2: Filtering and Searching Tasks

Get all pending tasks
curl "http://localhost:3000/api/v1/tasks?status=PENDING"

Search for tasks containing "documentation"
curl "http://localhost:3000/api/v1/tasks?title=documentation"

Get first 5 in-progress tasks
curl "http://localhost:3000/api/v1/tasks?status=IN_PROGRESS&limit=5&page=1"

text

### Scenario 3: Getting Overview of Work

Get task statistics
curl "http://localhost:3000/api/v1/tasks/stats"

Get recent tasks (first page)
curl "http://localhost:3000/api/v1/tasks?page=1&limit=10"

text

---

## 🔒 Error Handling

The API uses standardized error responses with appropriate HTTP status codes:

### Common HTTP Status Codes

- **200 OK**: Successful GET, PUT requests
- **201 Created**: Successful POST requests
- **400 Bad Request**: Validation errors, malformed requests
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server errors

### Error Response Format

{
"success": false,
"message": "Error description",
"error": "Detailed error message"
}

text

### Common Validation Errors

{
"success": false,
"message": "Validation error",
"error": "Title is required"
}

text
undefined
{
"success": false,
"message": "Validation error",
"error": "Title must not exceed 100 characters"
}

text

---

## 🚦 Rate Limiting & Security

The API includes several security measures:

- **Helmet.js**: Security headers
- **CORS**: Cross-origin request protection
- **Input Validation**: Joi schema validation
- **Request Size Limiting**: 10MB limit on request bodies
- **UUID Validation**: Proper UUID format validation

---



## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
Change port in .env file
PORT=3001

text

2. **ESLint errors**
Fix automatically
npm run lint:fix

text

3. **Module not found errors**
Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

text

### Getting Help

- Check the interactive API documentation at `/api-docs`
- Verify server health at `/health`
- Check server logs for detailed error messages
- Ensure all dependencies are properly installed

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Task Managing! 🎉**