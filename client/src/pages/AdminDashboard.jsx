import React, { useState } from 'react';
import { API } from '../api';
import { getToken } from '../utils/auth';

const AdminDashboard = () => {
  const [form, setForm] = useState({ title: '', category: '', description: '', points: '', flag: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };

    try {
      await API.post('/challenges/admin/create', payload, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      alert('Challenge added successfully!');
    } catch (err) {
      alert('Failed to add challenge');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Challenge</h2>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
      <input placeholder="Points" type="number" onChange={e => setForm({ ...form, points: e.target.value })} />
      <input placeholder="Correct Flag" onChange={e => setForm({ ...form, flag: e.target.value })} />
      <button type="submit">Add Challenge</button>
    </form>
  );
};

export default AdminDashboard;
