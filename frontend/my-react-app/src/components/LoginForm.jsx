//NOT USED ANYMORE 

import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ closeModal }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', form);
      alert('Login successful!');
      closeModal();
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Login</h2>
      <input
        className="w-full mb-3 p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full mb-4 p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        type="submit"
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
