const Transaction = require("../models/transaction");
const constant = require("../constant/errorMessgae");

exports.getTransactionList = async (req, res) => {
  try {
    let user = req.user;
    let transactionList = await Transaction.find({ userId: user.user.id });
    res.status(200).send(transactionList);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.getTransaction = async (req, res) => {
  try {
    let id = req.params.id;
    let transaction = await Transaction.findOne({ _id: id });
    if (!transaction) {
      return res.status(404).send(constant.RECORD_NOTFOUND);
    }

    res.status(200).send(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.createTransaction = async (req, res) => {
  try {
    let user = req.user;
    let transaction = new Transaction({
      ...req.body,
      userId: user.user.id,
    });

    await transaction.save();
    res.status(201).send(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    let id = req.params.id;

    let transactionUpdate = await Transaction.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!transactionUpdate) {
      return res.status(404).send(constant.RECORD_NOTFOUND);
    }

    res.status(200).send(transactionUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    let id = req.params.id;

    let transaction = await Transaction.findOne({_id: id})
    if (!transaction){
        return res.status(404).send(constant.RECORD_NOTFOUND)
    }

    await Transaction.deleteOne({_id: id})
    res.status(200).send("Delete transaction is successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.deleteAllTransaction = async (req, res) => {
  try {
    await Transaction.deleteMany();
    res.status(200).send("Delete all transactions is successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};