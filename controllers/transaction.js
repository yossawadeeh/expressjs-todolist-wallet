const Transaction = require('../models/transaction')
const constant = require('../constant/errorMessgae')

exports.getTransactionList = async(req, res) => {
    try{
        let transactionList = await Transaction.find({})
        res.status(200).send(transactionList)
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}

exports.createTransaction = async (req, res) => {
    try{
        let user = req.user
        let transaction = new Transaction({
            ...req.body,
            userId: user.user.id
        })

        await transaction.save()
        res.status(201).send(transaction)
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}