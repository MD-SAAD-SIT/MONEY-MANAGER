const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  acount: {
    type: Number,
    default: 0,
    required: true,
  },
  cash: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model('Balance', balanceSchema);
