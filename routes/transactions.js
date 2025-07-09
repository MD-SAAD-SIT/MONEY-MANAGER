const express = require('express');
const routes = express.Router();
const {
  updations,
  getTransactions,
  editTransaction,
    deleteHistory,
  deleteTransaction
} = require("../controllers/info");
routes.route("/").get(getTransactions).post(updations).delete(deleteHistory);
routes.route("/:id").patch(editTransaction).delete(deleteTransaction);
module.exports = routes;
