import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { getToken } from '../utils/auth';

const Dashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [submission, setSubmission] = useState({});

  useEffect(() => {
    API.get('/challenges').then(res => setChallenges(res.data));
  }, []);

  const handleSubmit = async (id) => {
    try {
      const res = await API.post('/challenges/submit', {
        challengeId: id,
        flag: submission[id]
      }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      alert(res.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Challenges</h2>
      {challenges.map(ch => (
        <div key={ch._id}>
          <h4>{ch.title} ({ch.points} pts)</h4>
          <p>{ch.description}</p>
          <input
            placeholder="Enter flag"
            value={submission[ch._id] || ''}
            onChange={(e) => setSubmission({ ...submission, [ch._id]: e.target.value })}
          />
          <button onClick={() => handleSubmit(ch._id)}>Submit Flag</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
