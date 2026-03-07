const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB!");

    return db;
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    console.log(
      "Warning: Running without MongoDB. Some features may not work.",
    );
    console.log(
      "To enable full functionality, ensure MongoDB is running at:",
      config.MONGO_URI,
    );
    // Don't exit - allow server to run without MongoDB for development
    return null;
  }
};

module.exports = connectDB;
