const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/auth')
const { validate } = require('../validators/validator')
const { registerValidationRules, loginValidationRules } = require('../validators/authValidateRules')

router.post('/auth', registerValidationRules(), validate, register)
router.get('/auth', loginValidationRules(), validate, login)

module.exports = router