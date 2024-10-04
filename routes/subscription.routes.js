const express = require("express");
const router = express.Router();
const {
  addSubscription,
  updateSubscriptionStatus,
  getSubscriptions,
} = require("../controllers/subscription.controller");

// Get all subscriptions with pagination
router.get("/", getSubscriptions);

// Add a subscription
router.post("/add", addSubscription);

// Update subscription status
router.put("/update/:id/status", updateSubscriptionStatus);

module.exports = router;
