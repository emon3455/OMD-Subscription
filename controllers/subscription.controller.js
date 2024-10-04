const Subscription = require("../models/subscription.model");

// Get all subscriptions with pagination
exports.getSubscriptions = async (req, res) => {
  try {
    // Get the page and limit from query parameters, default to 1 and 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Calculate the starting index for the current page
    const startIndex = (page - 1) * limit;

    // Get subscriptions with pagination
    const subscriptions = await Subscription.find()
      .limit(limit)
      .skip(startIndex);

    // Get the total count of subscriptions
    const totalSubscriptions = await Subscription.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(totalSubscriptions / limit);

    // Return response
    res.status(200).json({
      totalSubscriptions,
      totalPages,
      currentPage: page,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add new subscription
exports.addSubscription = async (req, res) => {
  const { provider, customer, source, created, amount, status } = req.body;
  try {
    const newSubscription = new Subscription({
      provider,
      customer,
      source,
      amount,
      status,
    });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: "Failed to add subscription", error });
  }
};

// Update subscription status
exports.updateSubscriptionStatus = async (req, res) => {
  const { id } = req.params; // Subscription ID from URL parameters
  const { status } = req.body; // New status from request body

  // Validate status input
  const validStatuses = ["Trialing", "Canceled", "Active"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // Find the subscription by ID and update the status
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    // If subscription not found
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Return the updated subscription
    res.status(200).json(subscription);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating subscription status", error });
  }
};
