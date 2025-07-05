const balance = require('../models/balance');
const transaction = require('../models/transaction');

const getBalance = async (req, res) => {
    res.send("getting balance");
}

const editBalance = async (req, res) => {
    res.send("editing balance");
}

const updations = async (req, res) => {
    res.send("processing transactions");

}

const fullfill = async (req, res) => {
    res.send("fullfilled");
}

const deleteHistory = async (req, res) => {
    res.send("deleting history");
}

module.exports = { getBalance, editBalance, updations, fullfill, deleteHistory };