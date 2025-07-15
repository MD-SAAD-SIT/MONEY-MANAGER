const mongoose = require("mongoose");
const balance = require("../models/balance");
const transaction = require("../models/transaction");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-errors");

const getBalance = asyncWrapper(async (req, res, next) => {
  const bal =
    (await balance.findOne()) ??
    (await balance.create({
      BALANCE: 0,
      BANK: 0,
      CASH: 0,
    }));
  res.status(200).json({ bal });
});

const updateBalance = async ({ action, bank, cash }) => {
  const bal = await balance.findOne();

  if (["ADD", "BORROW"].includes(action)) {
    bal.BANK += bank;
    bal.CASH += cash;
  } else {
    if (bank > bal.BANK || cash > bal.CASH) {
      throw createCustomError(`Not enough money`, 400); // THROW instead of return next()
    }
    bal.BANK -= bank;
    bal.CASH -= cash;
  }
  bal.BALANCE = bal.BANK + bal.CASH;
  await bal.save();
  return bal;
};

const editBalance = asyncWrapper(async (req, res, next) => {
  const bal = await balance.findOne();
  Object.assign(bal, req.body);
  await bal.save();
  res.status(200).json(bal);
});

const getHistory = asyncWrapper(async (req, res, next) => {
  const getAll = await transaction.find({});
  res.status(200).json({ getAll });
});

const updations = asyncWrapper(async (req, res, next) => {
  const newBal = await updateBalance({
    action: req.body.action,
    bank: req.body.bank,
    cash: req.body.cash,
  });
  const transactionPhase = await transaction.create(req.body);
  res.status(200).json({ transactionPhase, newBal });
});

const editTransaction = asyncWrapper(async (req, res, next) => {
  const { id: transID } = req.params;
  const findTransaction = await transaction.findById(transID);
  if (!findTransaction) {
    return next(createCustomError(`Transaction not found`, 404));
  }
  const body = req.body;
  if (!body.bank && !body.cash && body.fullfilled == "YES") {
    findTransaction.fullfilled = "YES";
    const bal = await balance.findOne();
    if (findTransaction.action == "LEND") {
      bal.BANK += findTransaction.bank;
      bal.CASH += findTransaction.cash;
      bal.BALANCE = bal.BANK + bal.CASH;
    } else if (findTransaction.action == "BORROW") {
      bal.BANK -= findTransaction.bank;
      bal.CASH -= findTransaction.cash;
      bal.BALANCE = bal.BANK + bal.CASH;
    }
    await bal.save();
    await findTransaction.save();
  } else {
    await updateBalance({
      action: findTransaction.action,
      bank: body.bank - findTransaction.bank,
      cash: body.cash - findTransaction.cash,
    });
    findTransaction.bank = body.bank;
    findTransaction.cash = body.cash;
    await findTransaction.save();
  }
  res.status(200).json({ findTransaction });
});

const getTransactions = asyncWrapper(async (req, res, next) => {
  const transactions = await transaction.find({ action: req.query.action });
  res.status(200).json({ transactions });
});

const deleteHistory = asyncWrapper(async (req, res, next) => {
  const protectedTransactions = await transaction.find({
    action: { $in: ["LEND", "BORROW"] },
    fullfilled: "NO",
  });
  const deleteAll = await transaction.deleteMany({
    $nor: [
      {
        action: { $in: ["LEND", "BORROW"] },
        fullfilled: "NO",
      },
    ],
  });
  if (protectedTransactions.length > 0) {
    return next(createCustomError(`Unfulfilled transactions cannot be deleted`, 403));
  }
  res.status(200).json({
    message: "Transactions deleted successfully.",
    deletedCount: deleteAll.deletedCount,
  });
});

const deleteActionHistory = asyncWrapper(async (req, res, next) => {
  const { action } = req.params;
  const protectedTransactions = await transaction.find({
    action,
    fullfilled: "NO",
  });
  const deleteAll = await transaction.deleteMany({
    action,
    fullfilled: { $ne: "NO" },
  });
  if (protectedTransactions.length > 0) {
    return next(
      createCustomError(`Unfulfilled transactions cannot be deleted`, 403)
    );
  }
  res.status(200).json({
    message: "Transactions deleted successfully.",
    deletedCount: deleteAll.deletedCount,
  });
});

const deleteTransaction = asyncWrapper(async (req, res, next) => {
  const { id: transID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(transID)) {
    return next(createCustomError(`Invalid transaction ID format`, 400));
  }
  const deleteTrans = await transaction.findById(transID);
  if (!deleteTrans) {
    return next(createCustomError(`Transaction not found`, 404));
  }
  if (deleteTrans.fullfilled == "NO") {
    return next(createCustomError(`Unfullfilled transactions cannot be deleted`, 403));
  }
  await deleteTrans.deleteOne();
  res.status(200).json({ message: "Transaction deleted successfully" });
});

module.exports = {
  getBalance,
  editBalance,
  getHistory,
  updations,
  getTransactions,
  editTransaction,
  deleteHistory,
  deleteActionHistory,
  deleteTransaction,
};
