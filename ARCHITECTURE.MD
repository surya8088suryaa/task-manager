# ARCHITECTURE DOCUMENTATION

This document explains the internal architecture and flow of the Task
Manager App.

------------------------------------------------------------------------

# Backend Architecture

## Layered Structure

Routes → Controllers → Services (Logic) → Models → Database

### Middleware Flow (Protected Routes)

1.  requireAuth
2.  authorizeRoles (if required)
3.  ownership check (for tasks)
4.  Controller execution
5.  Centralized error handler

------------------------------------------------------------------------

## Authentication Lifecycle

-   JWT contains: userId, email, role
-   Token expiration configurable
-   Passwords hashed using bcrypt
-   Token verified in requireAuth middleware

------------------------------------------------------------------------

## Authorization Strategy

### Role-Based Access Control

-   authorizeRoles("admin")

### Ownership-Based Control

-   Task queries restricted to userId unless admin

------------------------------------------------------------------------

## Task Query Design

Supports:

-   Pagination: page (default 1), limit (default 10, max 100)
-   Filtering: status, priority
-   Sorting: createdAt, dueDate, priority
-   Admin-only filter: userId

------------------------------------------------------------------------

# Frontend Architecture

## React Structure

BrowserRouter └── AuthProvider (Context API) └── App ├── Public Routes
├── ProtectedRoute │ └── AdminRoute └── NotFound

------------------------------------------------------------------------

## Routing Map

/ → Redirect /login /register /tasks /tasks/create /tasks/:id
/tasks/:id/edit /users (admin only)

------------------------------------------------------------------------

## Axios Token Synchronization

When login succeeds:

axios.defaults.headers.common\["Authorization"\] = Bearer token

On logout:

Authorization header removed

Prevents stale token usage and centralizes auth.

------------------------------------------------------------------------

# Security Principles

-   Frontend protected routes = UX guard
-   Backend = actual security enforcement
-   Role check + ownership check
-   Centralized error handling
-   JWT expiration control

------------------------------------------------------------------------

# Design Philosophy

-   Separation of concerns
-   Middleware-driven security
-   Clean routing architecture
-   Scalable RBAC pattern
-   Production-style query handling
