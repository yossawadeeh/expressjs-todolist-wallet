const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTransactionList, getTransaction, createTransaction, updateTransaction, deleteTransaction, deleteAllTransaction } = require('../controllers/transaction')
const { validate } = require('../validators/validator')
const { transactionValidationRules } = require('../validators/transactionValidateRules')
const { searchValidateRule } = require('../validators/commonValidateRule')

router.get('/transaction', authMiddleware, searchValidateRule(), validate, getTransactionList)
router.get('/transaction/:id', authMiddleware, getTransaction)
router.post('/transaction', authMiddleware, transactionValidationRules(), validate, createTransaction)
router.put('/transaction/:id', authMiddleware, transactionValidationRules(), validate, updateTransaction)
router.delete('/transaction/:id', authMiddleware, deleteTransaction)
router.delete('/transaction/all', authMiddleware, deleteAllTransaction)

module.exports = router