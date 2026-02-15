const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn("MONGO_URI is missing in backend/.env. Running with local fallback data.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Atlas Connected");
    return true;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn("Running with local fallback data.");
    return false;
  }
};

module.exports = connectDB;
