const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTransactionList, getTransaction, createTransaction, updateTransaction, deleteTransaction, deleteAllTransaction } = require('../controllers/transaction')

router.get('/transaction', authMiddleware, getTransactionList)
router.get('/transaction/:id', authMiddleware, getTransaction)
router.post('/transaction', authMiddleware, createTransaction)
router.put('/transaction/:id', authMiddleware, updateTransaction)
router.delete('/transaction/:id', authMiddleware, deleteTransaction)
router.delete('/transaction/all', authMiddleware, deleteAllTransaction)

module.exports = router