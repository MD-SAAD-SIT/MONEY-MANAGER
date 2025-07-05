const balance = require('../models/balance');
const transaction = require('../models/transaction');

const getBalance = async (req, res) => {
    console.log('getting balance');
    res.send("getting balance");
}

const editBalance = async (req, res) => {
    console.log('editing balance');
    res.send("editing balance");
}

const updations = async (req, res) => {
    console.log('doing processes');
    res.send("processing transactions");

}

const fullfill = async (req, res) => {
    console.log('money fullfilled');
    res.send("fullfilled");
}

module.exports = { getBalance, editBalance, updations, fullfill };