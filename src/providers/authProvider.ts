import type { AuthProvider } from 'react-admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await response.json();

    if (data.success && data.data?.token) {
      localStorage.setItem('admin_token', data.data.token);
      return Promise.resolve();
    }

    return Promise.reject(new Error(data.message || 'Invalid credentials'));
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem('admin_token');
    return token ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('admin_token');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve('admin'),

  getIdentity: () =>
    Promise.resolve({ id: 'admin', fullName: 'Administrator' }),
};