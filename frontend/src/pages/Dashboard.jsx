import { useState } from "react";
import authService from "../services/authService";

export default function Dashboard() {
  const user = authService.getUser();
  const [message, setMessage] = useState("");

  const changePassword = async () => {
    const currentPassword = window.prompt("Current password:");
    const newPassword = window.prompt("New password (8+ characters):");

    if (!currentPassword || !newPassword) return;

    try {
      const result = await authService.changePassword(
        currentPassword,
        newPassword
      );
      setMessage(result.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to change password.");
    }
  };

  const logout = async () => {
    await authService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Authentication Dashboard</h1>
          <p className="text-muted mb-0">
            This is a protected page for the authentication module.
          </p>
        </div>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow-sm">
        <div className="card-body">
          <h4>Logged-in User</h4>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>

          <button className="btn btn-primary" onClick={changePassword}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}