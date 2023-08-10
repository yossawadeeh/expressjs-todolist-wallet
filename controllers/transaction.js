const Transaction = require("../models/transaction");
const constant = require("../constant/errorMessgae");

exports.getTransactionList = async (req, res) => {
  try {
    let user = req.user;

    let startDate = req.query.startDate
    let endDate = req.query.endDate
    let type = req.query.type
    let page = parseInt(req.query.page) || 1
    let perPage = parseInt(req.query.perPage) || 10

    if(startDate != null && endDate == null){
      endDate = startDate
  }

    let query = Transaction.find()
    query.where({ userId: user.user.id })
    if (startDate != null) {
      query.where("transactionDate").gte(startDate).lte(endDate)
    }

    if (type != null){
      query.where("type", type)
    }
    
    let countQuery = query.clone(); // Clone the query for count
    let count = await countQuery.countDocuments().exec();
    let transactionList = await query.sort({transactionDate: -1}).skip((page-1) * perPage).limit(perPage).exec()

    let incomeTotal = 0
    let expenseTotal = 0

    transactionList.forEach(transaction => {
      if (transaction.type == "income"){
        incomeTotal += transaction.total
      }

      if (transaction.type == "expense"){
        expenseTotal += transaction.total
      }
    });

    let result = {
      items: transactionList,
      incomeTotal: incomeTotal,
      expenseTotal: expenseTotal,
      diffTotal: incomeTotal - expenseTotal,
      total: count,
    }

    res.status(200).json(result);
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

    let result = {
      item: transaction
    }
    res.status(200).json(result);
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
    let result = {
      item: transaction
    }

    res.status(200).json(result);
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

    let result = {
      item: transactionUpdate
    }

    res.status(200).json(result);
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