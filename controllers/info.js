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

const fullfillLendMoney = async (req, res) => {
    console.log('lend money fullfilled')
}

const borrowMoney = async (req, res) => {
    console.log('borrowing money');
}

const fullfillBorrowMoney = async (req, res) => {
  console.log("borrow money fullfilled");
}

module.exports = { getBalance, editBalance,addMoney, withdrawMoney, lendMoney, fullfillLendMoney, borrowMoney, fullfillBorrowMoney };