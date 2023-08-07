const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTransactionList, createTransaction } = require('../controllers/transaction')

router.get('/transaction', authMiddleware, getTransactionList)
router.post('/transaction', authMiddleware, createTransaction)

module.exports = router