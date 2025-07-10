const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const authRoutes = require('./routes/auth');
const challengeRoutes = require('./routes/challenges');
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);

// HTTP + Socket Server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

// Emit leaderboard to all
const broadcastLeaderboard = async () => {
  const User = require('./models/User');
  const leaderboard = await User.find({}, 'username score').sort({ score: -1 }).limit(10);
  io.emit('leaderboard-update', leaderboard);
};

// Make accessible to route files
app.set('io', io);
app.set('broadcastLeaderboard', broadcastLeaderboard);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
