import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with deployed backend URL

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    socket.on('leaderboard-update', (data) => {
      setLeaders(data);
    });

    // Cleanup
    return () => socket.off('leaderboard-update');
  }, []);

  return (
    <div>
      <h2>Live Leaderboard 🏆</h2>
      <ul>
        {leaders.map((user, i) => (
          <li key={user._id}>
            {i + 1}. {user.username} - {user.score} pts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
