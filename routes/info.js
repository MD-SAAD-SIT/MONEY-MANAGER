const express = require('express');
const routes = express.Router();
const {
    getBalance,
    editBalance,
    addMoney,
    withdrawMoney,
    lendMoney,
    borrowMoney
} = require('../controllers/info');

routes.route('/').get(getBalance);
routes.route('/edit').patch(editBalance)
routes.route('/add').put(addMoney)
routes.route('/withdraw').put(withdrawMoney)
routes.route('/lend').put(lendMoney)
routes.route('/borrow').put(borrowMoney)

