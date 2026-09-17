import { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setToken("");

    try {
      const result = await authService.forgotPassword(email);
      setMessage(result.message);
      if (result.developmentResetToken) {
        setToken(result.developmentResetToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Request failed.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="text-muted">Request a password reset.</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Email</label>
          <input
            className="form-control mb-3"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Request Reset
          </button>
        </form>

        {token && (
          <div className="mt-3">
            <small className="text-muted">
              Development only: copy this reset token into the reset page.
            </small>
            <textarea className="form-control mt-2" readOnly value={token} />
            <Link className="btn btn-outline-secondary w-100 mt-2" to="/reset-password">
              Go to Reset Password
            </Link>
          </div>
        )}

        <div className="mt-3 text-center">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}