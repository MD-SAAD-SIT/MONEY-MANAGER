const express = require("express");
const routes = express.Router();
const transactions = require('./transactions')
const {
  getBalance,
  editBalance,
} = require("../controllers/info");

routes.route("/").get(getBalance).patch(editBalance);
routes.use('/transactions', transactions);
module.exports = routes;
