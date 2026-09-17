# Authentication API Documentation

Base URL:

`http://localhost:5000/api/auth`

## POST /register

Request:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "Password123"
}
```

Public registration creates an `EMPLOYEE` account.

## POST /login

Request:

```json
{
  "email": "rahul@example.com",
  "password": "Password123"
}
```

Returns a JWT token and user information.

## POST /logout

Requires:

`Authorization: Bearer <JWT>`

JWT is stateless in this implementation, so the client removes the token during logout.

## GET /me

Requires authentication.

Returns the current user's profile.

## PUT /change-password

Requires authentication.

Request:

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456"
}
```

## POST /forgot-password

Request:

```json
{
  "email": "rahul@example.com"
}
```

For local development, the response includes a temporary reset token. Production should send the token through an email reset link.

## POST /reset-password

Request:

```json
{
  "token": "RESET_TOKEN",
  "newPassword": "NewPassword456"
}
```

## GET /admin

Requires `ADMIN`.

## GET /manager

Requires `ADMIN` or `PROJECT_MANAGER`.

## GET /employee

Requires any authenticated project role.

## Error format

Typical errors:

```json
{
  "success": false,
  "message": "Description of the problem."
}
```
