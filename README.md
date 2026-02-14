# Task Manager App (MERN Stack)

A production-style full-stack Task Management system built using:

-   MongoDB
-   Express.js
-   React (Vite)
-   Node.js

## Core Features

-   JWT Authentication
-   Role-Based Access Control (user, admin)
-   Ownership-based authorization
-   Task CRUD operations
-   Admin User Management
-   Filtering, Sorting, Pagination
-   React Context API for authentication state
-   Axios global token synchronization
-   Protected & Admin Routes

------------------------------------------------------------------------

## Roles & Permissions

  Feature            User   Admin
  ------------------ ------ -------
  Register / Login   ✅     ✅
  Create Task        ✅     ✅
  View Own Tasks     ✅     ✅
  View All Tasks     ❌     ✅
  Update Own Task    ✅     ✅
  Update Any Task    ❌     ✅
  Delete Own Task    ✅     ✅
  Delete Any Task    ❌     ✅
  Manage Users       ❌     ✅

------------------------------------------------------------------------

## Local Setup

### Backend

Create `backend/.env`:

MONGO_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=your_secret_key JWT_EXPIRES_IN=1d PORT=5000

Run:

npm install npm run dev

Backend runs at: http://localhost:5000

------------------------------------------------------------------------

### Frontend

Create `frontend/.env`:

VITE_API_BASE_URL=http://localhost:5000

Run:

npm install npm run dev

Frontend runs at: http://localhost:5173

------------------------------------------------------------------------

## Authentication Flow

1.  User logs in.
2.  Backend returns JWT token.
3.  Token stored in Context API.
4.  Axios sets Authorization header globally.
5.  ProtectedRoute checks authentication.
6.  AdminRoute checks role.
7.  Backend always enforces security.

------------------------------------------------------------------------

## Creating First Admin

1.  Register normally.
2.  Update role in MongoDB (mongosh or Compass):

db.users.updateOne( { email: "admin@example.com" }, { \$set: { role:
"admin" } } )

------------------------------------------------------------------------

## API Overview

### Auth

POST /auth/register POST /auth/login

### Tasks

GET /tasks POST /tasks GET /tasks/:id PUT /tasks/:id DELETE /tasks/:id

Supports: page, limit, status, priority, sortBy, order, userId (admin)

### Users (Admin Only)

GET /users POST /users PUT /users/:id DELETE /users/:id

------------------------------------------------------------------------

## License

Educational & training project.
