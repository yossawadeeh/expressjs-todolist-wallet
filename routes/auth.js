const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')

router.post('/auth', register)
router.get('/auth', login)

module.exports = router