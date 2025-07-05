const express = require('express');
const routes = express.Router();
const {
  getBalance,
  editBalance,
  updations,
  fullfill,
} = require("../controllers/info");

routes.route("/").get(getBalance).patch(editBalance).post(updations);;
routes.route('/:id').patch(fullfill);
module.exports = routes;