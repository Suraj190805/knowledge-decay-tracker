const LearningLog = require("../models/LearningLog");
const calculatePriority = require("../services/revisionService");
exports.getTodayRevisions = async (req, res) => {
  try {
    const logs = await LearningLog.find({ user: req.user.id });
    user: req.user.id


    const prioritized = logs
      .map(log => ({
        ...log._doc,
        priority: calculatePriority(log)
      }))
      .filter(log => log.priority >= 40)
      .sort((a, b) => b.priority - a.priority);

    res.json(prioritized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};