const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTransactionList, getTransaction, createTransaction, updateTransaction, deleteTransaction, deleteAllTransaction } = require('../controllers/transaction')
const { validate } = require('../validators/validator')
const { transactionValidationRules } = require('../validators/transactionValidateRules')

router.get('/transaction', authMiddleware, getTransactionList)
router.get('/transaction/:id', authMiddleware, getTransaction)
router.post('/transaction', transactionValidationRules(), validate, authMiddleware, createTransaction)
router.put('/transaction/:id', transactionValidationRules(), validate, authMiddleware, updateTransaction)
router.delete('/transaction/:id', authMiddleware, deleteTransaction)
router.delete('/transaction/all', authMiddleware, deleteAllTransaction)

module.exports = router