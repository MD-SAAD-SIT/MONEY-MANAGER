const mongoose = require("mongoose");
const balanceSchema = new mongoose.Schema({
  BALANCE: {
    type: Number,
    default: 0,
    required: true,
  },
  BANK: {
    type: Number,
    default: 0,
    required: true,
  },
  CASH: {
    type: Number,
    default: 0,
    required: true,
  },
});
module.exports = mongoose.model('Balance', balanceSchema);
