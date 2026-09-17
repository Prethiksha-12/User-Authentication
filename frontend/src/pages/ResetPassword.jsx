import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ token: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await authService.resetPassword(
        form.token,
        form.newPassword
      );
      setMessage(result.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Reset Token</label>
          <textarea
            className="form-control mb-3"
            required
            value={form.token}
            onChange={(e) => setForm({ ...form, token: e.target.value })}
          />

          <label className="form-label">New Password</label>
          <input
            className="form-control mb-3"
            type="password"
            minLength="8"
            required
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
          />

          <button className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>

        <div className="mt-3 text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}