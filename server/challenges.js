const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get all challenges
router.get('/', async (req, res) => {
  const challenges = await Challenge.find({});
  res.json(challenges);
});

// Submit a flag
router.post('/submit', authMiddleware, async (req, res) => {
  const { challengeId, flag } = req.body;
  const user = await User.findById(req.user.id);
  const challenge = await Challenge.findById(challengeId);

  if (!challenge) return res.status(404).json({ msg: 'Challenge not found' });

  const alreadySolved = await user.solvedChallenges?.includes(challengeId);
  if (alreadySolved) return res.status(400).json({ msg: 'Already solved' });

  if (challenge.verifyFlag(flag)) {
    user.score += challenge.points;
    user.solvedChallenges = [...(user.solvedChallenges || []), challengeId];
    await user.save();

    challenge.solveCount += 1;
    await challenge.save();

    return res.json({ msg: 'Correct flag!', newScore: user.score });
  } else {
    return res.status(400).json({ msg: 'Incorrect flag' });
  }
});

module.exports = router;
