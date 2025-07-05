const balance = require('../models/balance');
const transaction = require('../models/transaction');

const getBalance = async (req, res) => {
    console.log('getting balance');
}

const editBalance = async (req, res) => {
    console.log('editing balance');
}

const updations = async (req, res) => {
    console.log('doing processes')
}

const fullfill = async (req, res) => {
    console.log('money fullfilled')
}

module.exports = { getBalance, editBalance, updations, fullfill };