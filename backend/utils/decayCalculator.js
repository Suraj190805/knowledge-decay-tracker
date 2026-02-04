const calculateDecayScore = (learningLog) => {
  const now = new Date();
  const lastReviewed = new Date(learningLog.lastReviewedAt);

  const daysPassed =
    (now - lastReviewed) / (1000 * 60 * 60 * 24);

  let score =
    learningLog.strength -
    daysPassed * learningLog.decayRate * 100;

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  return Math.round(score);
};

module.exports = calculateDecayScore;