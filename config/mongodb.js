const mongoose = require("mongoose");

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
};

module.exports = connectMongoDB;
