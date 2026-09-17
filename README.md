# Employee Task & Project Management — User Authentication Module

## Responsibility

This module covers the individual User Authentication responsibility:

- User registration
- Login / logout
- Password hashing
- Change password
- Forgot/reset password flow
- JWT authentication
- Role-based access control

## Technology

- React.js
- Vite
- Bootstrap
- Node.js
- Express.js
- MySQL
- bcryptjs
- JSON Web Token (JWT)

## Prerequisites

Install:

1. Node.js
2. MySQL Server / MySQL Workbench
3. VS Code (recommended)

## 1. Database setup

Open MySQL Workbench and run:

`database/auth.sql`

Create the database named:

`employee_management`

## 2. Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Then edit `.env` and set your MySQL password and a strong JWT secret.

Start the backend:

```bash
npm run dev
```

Backend:

`http://localhost:5000`

Test:

`http://localhost:5000/`

## 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

`http://localhost:5173`

## API endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PUT /api/auth/change-password`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Role protected examples

- `GET /api/auth/admin`
- `GET /api/auth/manager`
- `GET /api/auth/employee`

Send the JWT as:

`Authorization: Bearer <token>`

## Important security notes

- Passwords are hashed using bcrypt.
- JWT contains the user's id, email and role.
- Public registration always creates an EMPLOYEE account. Privileged roles should be assigned by an authorized admin workflow.
- The forgot-password endpoint returns a reset token only for local development. For a real deployment, send a short-lived reset link by email and never expose the token in the API response.
- For production, consider HTTP-only secure cookies and refresh-token/session revocation rather than storing long-lived JWTs in localStorage.
