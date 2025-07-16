// ./db/connect.js

const mongoose = require("mongoose");

const connectDB = async (uri, retries = 5, delayMs = 5000) => {
  while (retries > 0) {
    try {
      await mongoose.connect(uri);
      console.log("✅ Connected to MongoDB");
      return;
    } catch (err) {
      console.log(`❌ MongoDB connection failed. Retries left: ${retries - 1}`);
      console.log(err.message);
      retries -= 1;

      if (retries === 0) {
        console.log("🚫 Could not connect to MongoDB after multiple attempts.");
        throw err;
      }

      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

module.exports = connectDB;
