const mongoose = require("mongoose");
const trackSchema = new mongoose.Schema({
  action: { type: String, enum: ["ADD", "WITHDRAW", "LEND", "BORROW"], required: true },
  bank: { type: Number, required: true, default: 0 },
  cash: { type: Number, required: true, default: 0 },
  fullfilled : { type: String, enum: ["YES", "NO"]},
  message: { type: String, default: "no message" },
  date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  time: { type: String, default: () => new Date().toTimeString().slice(0, 5) },
});
module.exports = mongoose.model('transaction', trackSchema);
