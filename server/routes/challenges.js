// After a correct flag submission:
req.app.get('broadcastLeaderboard')();
const crypto = require('crypto');
const verifyAdmin = require('../middleware/verifyAdmin');

// Admin challenge upload
router.post('/admin/create', authMiddleware, verifyAdmin, async (req, res) => {
  const { title, description, category, flag, points } = req.body;
  const flagHash = crypto.createHash('sha256').update(flag).digest('hex');

  const challenge = new Challenge({
    title,
    description,
    category,
    points,
    flagHash
  });

  await challenge.save();
  res.json({ msg: 'Challenge added successfully' });
});
