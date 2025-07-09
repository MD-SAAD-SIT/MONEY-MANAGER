const express = require('express');
const routes = express.Router();
const {
  updations,
  getTransactions,
  editTransaction,
  deleteHistory,
} = require("../controllers/info");
routes.route("/").get(getTransactions).post(updations).delete(deleteHistory);
routes.route("/:id").patch(editTransaction);
module.exports = routes;
