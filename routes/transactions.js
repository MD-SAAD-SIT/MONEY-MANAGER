const express = require('express');
const routes = express.Router();
const {
  updations,
  getTransactions,
  editTransaction,
  deleteHistory,
    deleteActionHistory,
  deleteTransaction
} = require("../controllers/info");
routes.route("/").get(getTransactions).post(updations).delete(deleteHistory);
routes.route("/:id").patch(editTransaction).delete(deleteTransaction);
routes.route("/action/:action").delete(deleteActionHistory);
module.exports = routes;
