const Contest = require('../models/Contest');

module.exports = async (req, res, next) => {
  const contest = await Contest.findOne({});
  const now = new Date();

  if (!contest) return res.status(500).json({ msg: 'Contest time not set' });
  if (now < contest.startTime) return res.status(403).json({ msg: 'Contest not started yet' });
  if (now > contest.endTime) return res.status(403).json({ msg: 'Contest has ended' });

  next();
};
