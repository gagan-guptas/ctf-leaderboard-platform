const mongoose = require('mongoose');
const crypto = require('crypto');

const challengeSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  points: Number,
  flagHash: String,
  solveCount: { type: Number, default: 0 },
});

challengeSchema.methods.verifyFlag = function (flag) {
  const hash = crypto.createHash('sha256').update(flag).digest('hex');
  return this.flagHash === hash;
};

module.exports = mongoose.model('Challenge', challengeSchema);
