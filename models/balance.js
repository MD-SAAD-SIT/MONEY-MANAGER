const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  acount: {
    type: Number,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Balance', balanceSchema);
