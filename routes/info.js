const express = require('express');
const routes = express.Router();
const {
  getBalance,
  editBalance,
  updations,
  fullfill,
} = require("../controllers/info");

routes.route('/').get(getBalance).patch(editBalance);
routes.route('/process').post(updations);
routes.route('/process/:id').patch(fullfill);
module.exports = routes;