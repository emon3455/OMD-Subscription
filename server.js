const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Import the Subscription routes
const subscriptionRoutes = require("./routes/subscription.routes");

// Connect to MongoDB using mongoose
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use the subscription routes under /api/subscription
app.use("/api/subscription", subscriptionRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running smoothly!");
});

// Start the server on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
