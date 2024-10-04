const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: String,
  provider: { type: String, default: "Authorize.Net" },
  customer: {
    name: String,
    email: String,
    phone: String,
  },
  source: { type: String, default: "OptimalMD - *LIVE*" },
  createdAt: { type: Date, default: Date.now },
  amount: Number,
  status: {
    type: String,
    enum: ["Trialing", "Canceled", "Active"],
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
