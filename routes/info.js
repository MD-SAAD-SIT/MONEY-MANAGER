const express = require("express");
const routes = express.Router();
const transactions = require('./transactions')
const {
  getBalance,
  editBalance,
  getHistory
} = require("../controllers/info");

routes.route("/").get(getBalance).patch(editBalance);
routes.route("/history").get(getHistory);
routes.use('/transactions', transactions);
module.exports = routes;
