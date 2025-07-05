const balance = require('../models/balance');
const transaction = require('../models/transaction');

const getBalance = async (req, res) => {
    console.log('getting balance');
}

const editBalance = async (req, res) => {
    console.log('editing balance');
}

const addMoney = async (req, res) => {
    console.log('adding money');
}

const withdrawMoney = async (req, res) => {
  console.log("withdrawing money");
};

const lendMoney = async (req, res) => {
    console.log('lending money');
}

const borrowMoney = async (req, res) => {
    console.log('borrowing money');
}

module.exports = { getBalance, editBalance,addMoney, withdrawMoney, lendMoney, borrowMoney };