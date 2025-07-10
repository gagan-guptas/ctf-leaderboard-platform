import React, { useEffect, useState } from 'react';
import { API } from '../api';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const fetchContest = async () => {
      const { data } = await API.get('/contest/time');
      const endTime = new Date(data.endTime);

      const interval = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
          setTimeLeft("Contest Over");
          clearInterval(interval);
          return;
        }

        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }, 1000);
    };

    fetchContest();
  }, []);

  return <div>⏰ Contest Ends In: {timeLeft}</div>;
};

export default Timer;
