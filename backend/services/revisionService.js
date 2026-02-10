const calculatePriority = (log) => {
  const daysPassed =
    Math.floor((Date.now() - new Date(log.lastReviewedAt)) / (1000 * 60 * 60 * 24));

  return (
    (100 - log.strength) +
    daysPassed * log.decayRate * 10
  );
};

module.exports = calculatePriority;