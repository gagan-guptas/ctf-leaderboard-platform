import React, { useState } from 'react';
import { API } from './api';

const Login = () => {
  const [form, setForm] = useState({ emailOrUsername: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email or Username" value={form.emailOrUsername} onChange={e => setForm({ ...form, emailOrUsername: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
