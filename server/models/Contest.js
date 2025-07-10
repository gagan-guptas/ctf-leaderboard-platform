const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model('Contest', contestSchema);
