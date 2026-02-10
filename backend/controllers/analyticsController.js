const LearningLog = require("../models/LearningLog");

const getWeeklyAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const logs = await LearningLog.find({ user: userId });

    const totalTopics = logs.length;

    let strong = 0;
    let medium = 0;
    let weak = 0;

    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    let revisedThisWeek = 0;
    const focusTopics = [];

    logs.forEach((log) => {
      if (log.strength >= 80) strong++;
      else if (log.strength >= 50) medium++;
      else {
        weak++;
        focusTopics.push(log.topic);
      }

      if (log.lastReviewedAt >= oneWeekAgo) {
        revisedThisWeek++;
      }
    });

    res.json({
      totalTopics,
      strengthBreakdown: {
        strong,
        medium,
        weak,
      },
      revisedThisWeek,
      focusTopics,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWeeklyAnalytics,
};