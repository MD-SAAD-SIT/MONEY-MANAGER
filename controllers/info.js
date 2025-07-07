const balance = require("../models/balance");
const transaction = require("../models/transaction");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-errors");
require("dotenv").config();
const getBalance = asyncWrapper(async (req, res, next) => {
  const test = await balance.findOne();
  if (!test) {
    const bal = await balance.create({
      BALANCE: 0,
      BANK: 0,
      CASH: 0,
    });
    res.status(200).json(bal);
  }
  res.status(200).json(test);
});

const editBalance = asyncWrapper(async (req, res, next) => {
  const bal = await balance.findOneAndUpdate(
    { _id: process.env.balanceID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(bal);
});

const updations = asyncWrapper(async (req, res, next) => {
  const bal = await balance.findById(process.env.balanceID);
  if (req.body.action == ("ADD" || "BORROW")) {
    bal.BANK += req.body.bank;
    bal.CASH += req.body.cash;
    bal.BALANCE = bal.BANK + bal.CASH;
  } else {
    if (req.body.bank > bal.BANK || req.body.cash > bal.CASH) {
      return next(createCustomError(`Not enough balance`, 400));
    }
    bal.BANK -= req.body.bank;
    bal.CASH -= req.body.cash;
    bal.BALANCE = bal.BANK + bal.CASH;
  }
  const transactionPhase = await transaction.create(req.body);
  bal.save();
  res.status(200).send({ transactionPhase });
});

const fullfill = asyncWrapper(async (req, res, next) => {
  const { _id: transID } = req.body;

  const updatedTransaction = await transaction.findByIdAndUpdate(
    transID,
    { fullfilled: req.body.fullfilled },
    { new: true, runValidators: true }
  );
  
  if (!updatedTransaction) {
    return next(createCustomError(`Transaction not found`, 404));
  }
  const bal = await balance.findById(process.env.balanceID);
  if (req.body.action == "LEND") {
    bal.BANK += req.body.bank;
    bal.CASH += req.body.cash;
    bal.BALANCE = bal.BANK + bal.CASH;
  } else if (req.body.action == "BORROW") {
    bal.BANK -= req.body.bank;
    bal.CASH -= req.body.cash;
    bal.BALANCE = bal.BANK + bal.CASH;
    }
    bal.save();
  res.status(200).json({ updatedTransaction });
});

const deleteHistory = asyncWrapper(async (req, res, next) => {
  const deleteAll = await transaction.deleteMany({});

  if (!deleteAll.deletedCount) {
    return res.status(200).json({
      message: "No transactions to delete."
    });
  }

  res.status(200).json({
    message: 'Transactions deleted successfully.',
    deletedCount: deleteAll.deletedCount,
  });
});


module.exports = {
  getBalance,
  editBalance,
  updations,
  fullfill,
  deleteHistory
};
