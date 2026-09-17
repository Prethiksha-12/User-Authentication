import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const authService = {
  async register(data) {
    const response = await axios.post(`${API_URL}/register`, data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(data) {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        `${API_URL}/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async me() {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async changePassword(currentPassword, newPassword) {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/change-password`,
      { currentPassword, newPassword },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async forgotPassword(email) {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  },

  async resetPassword(token, newPassword) {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getUser() {
    const value = localStorage.getItem("user");
    return value ? JSON.parse(value) : null;
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("token"));
  },
};

export default authService;