const mongoose = require("mongoose");
const Destination = require("../models/Destination");
const defaultDestinations = require("../data/defaultDestinations");
const {
  calculateScore,
  sensitivityAnalysis,
} = require("../services/scoringService");

const normalizeDestination = (dest) => {
  if (!dest) return dest;

  return {
    ...dest,
    activities: Array.isArray(dest.activities) ? dest.activities : [],
    budgetMin: Number(dest.budgetMin) || 0,
    budgetMax: Number(dest.budgetMax) || 0,
    durationMin: Number(dest.durationMin) || 0,
    durationMax: Number(dest.durationMax) || 0,
  };
};

const getDestinations = async () => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    const dbItems = await Destination.find().lean();
    if (dbItems.length > 0) {
      return dbItems.map(normalizeDestination);
    }
  }

  return defaultDestinations.map(normalizeDestination);
};

exports.getRecommendation = async (req, res, next) => {
  try {
    const input = req.body;
    const destinations = await getDestinations();

    if (!destinations.length) {
      return res.status(500).json({
        message: "No destinations configured.",
      });
    }

    let bestDestination = destinations[0];
    let bestScore = calculateScore(bestDestination, input);

    destinations.forEach((dest) => {
      const score = calculateScore(dest, input);

      if (score > bestScore) {
        bestScore = score;
        bestDestination = dest;
      }
    });

    const analysis = sensitivityAnalysis(destinations, input, bestScore);

    return res.json({
      bestDestination,
      baseScore: bestScore,
      analysis: analysis.impacts,
      mainBottleneck: analysis.mainBottleneck,
      explanation: `Your trip quality is mainly limited by ${analysis.mainBottleneck}.`,
    });
  } catch (error) {
    return next(error);
  }
};
