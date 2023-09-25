const mongoose = require("mongoose");
const { Schema } = mongoose;

const incomeSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  is_monthly_income: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Income", incomeSchema);
