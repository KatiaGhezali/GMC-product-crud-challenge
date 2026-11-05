require("dotenv").config();

const express = require("express");
const connectMongoDB = require("./config/mongodb");
const db = require("./config/mysql");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Product CRUD API is running",
  });
});

app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Check MariaDB connection
    await db.query("SELECT 1");
    console.log("MariaDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
