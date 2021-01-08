const mongoose = require("mongoose");

const ConfirmationEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: "1m" },
  token: {
    type: String,
    required: true,
  },
});

module.exports = ConfirmationEmail = mongoose.model(
  "confirmationemail",
  ConfirmationEmailSchema
);
